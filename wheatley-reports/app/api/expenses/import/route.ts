import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { parseExpenseFile } from '@/lib/expense-import'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()

  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
  }

  const buffer = await file.arrayBuffer()
  const batchId = `import_${Date.now()}`

  let parsed
  try {
    parsed = parseExpenseFile(buffer, batchId)
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to parse file: ${err instanceof Error ? err.message : String(err)}` },
      { status: 422 }
    )
  }

  if (parsed.length === 0) {
    return NextResponse.json({ error: 'No expense rows found in file.' }, { status: 422 })
  }

  const rows = parsed.map(({ _warnings, ...rest }) => ({
    ...rest,
    property_id: DEFAULT_PROPERTY_ID,
    import_batch_id: batchId,
  }))

  const warnings = parsed.flatMap(r => r._warnings)

  const { data, error } = await supabase
    .from('expenses')
    .insert(rows)
    .select('id')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    imported: data?.length ?? 0,
    flagged: rows.filter(r => r.flag_for_review).length,
    warnings,
    batchId,
  })
}
