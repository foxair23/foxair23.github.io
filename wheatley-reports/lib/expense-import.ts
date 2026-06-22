/**
 * Parses CSV / XLSX expense files into expense rows.
 * The actual row-level parsing lives in expense-import-from-rows.ts
 * so both XLSX and Google Sheets sync share identical logic.
 */

import * as XLSX from 'xlsx'
import { rowsToObjects } from './google-sheets'
import { parseExpenseRows } from './expense-import-from-rows'
export type { ParsedExpense } from './expense-import-from-rows'

export function parseExpenseFile(buffer: ArrayBuffer, _batchId: string) {
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: false })
  const allParsed = []

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName]
    const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: null,
      raw: false,  // format all values as strings so date-fns can parse them
    })

    if (rawRows.length === 0) continue

    // Convert to the same string-keyed format rowsToObjects produces
    const objects = rawRows.map(row => {
      const out: Record<string, string | null> = {}
      for (const [k, v] of Object.entries(row)) {
        out[k] = v != null && String(v).trim() !== '' ? String(v).trim() : null
      }
      return out
    })

    const parsed = parseExpenseRows(objects)
    allParsed.push(...parsed)
  }

  return allParsed
}
