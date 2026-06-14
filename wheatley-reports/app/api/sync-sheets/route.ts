/**
 * POST /api/sync-sheets
 *
 * Pulls expense rows from the configured Google Sheet, re-imports them
 * into the expenses table. This is a full replace of sheet-sourced rows
 * (any row with import_batch_id starting with 'gsheets_') so edits and
 * deletions in the sheet are reflected on the next sync.
 */

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { fetchSheetRange, listSheetTabs, rowsToObjects } from '@/lib/google-sheets'
import { parseExpenseRows } from '@/lib/expense-import-from-rows'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export const maxDuration = 60

export async function POST() {
  const supabase = createServiceClient()

  // Get Sheet ID from settings
  const { data: sheetRow } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'google_sheet_id')
    .is('property_id', null)
    .maybeSingle()

  const sheetId = sheetRow?.value?.trim()
  if (!sheetId) {
    return NextResponse.json(
      { error: 'Google Sheet ID not configured. Add it in Settings.' },
      { status: 400 }
    )
  }

  // Discover tabs — sync all tabs that look like expense years/sheets
  let tabs: string[]
  try {
    tabs = await listSheetTabs(sheetId)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }

  // Accept any tab whose name contains a 4-digit year or common expense-sheet names
  const expenseTabs = tabs.filter(t =>
    /20\d{2}/.test(t) ||
    /expense/i.test(t) ||
    /cost/i.test(t)
  )

  if (expenseTabs.length === 0) {
    // Fall back: sync all tabs
    expenseTabs.push(...tabs)
  }

  const batchId = `gsheets_${Date.now()}`
  let totalImported = 0
  let totalFlagged  = 0
  const allWarnings: string[] = []

  for (const tab of expenseTabs) {
    let rows
    try {
      rows = await fetchSheetRange(sheetId, `${tab}!A:Z`)
    } catch (err) {
      allWarnings.push(`Tab "${tab}": ${err instanceof Error ? err.message : String(err)}`)
      continue
    }

    if (rows.length < 2) continue // header only, skip

    const objects  = rowsToObjects(rows)
    const parsed   = parseExpenseRows(objects)

    if (parsed.length === 0) continue

    const dbRows = parsed.map(({ _warnings, ...rest }) => ({
      ...rest,
      property_id:     DEFAULT_PROPERTY_ID,
      import_batch_id: batchId,
    }))

    allWarnings.push(...parsed.flatMap(r => r._warnings))
    totalFlagged += dbRows.filter(r => r.flag_for_review).length

    const { error } = await supabase.from('expenses').insert(dbRows)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    totalImported += dbRows.length
  }

  // Remove previous gsheets rows AFTER new ones are inserted (no gap in data)
  await supabase
    .from('expenses')
    .delete()
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .like('import_batch_id', 'gsheets_%')
    .not('import_batch_id', 'eq', batchId)

  return NextResponse.json({
    synced: totalImported,
    flagged: totalFlagged,
    tabs: expenseTabs,
    warnings: allWarnings,
    batchId,
    message: `Synced ${totalImported} expense rows from ${expenseTabs.length} sheet tab(s).`,
  })
}
