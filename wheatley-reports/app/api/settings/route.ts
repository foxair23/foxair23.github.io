import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('settings')
    .select('key, value, property_id')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Redact token — only return whether it's set
  const safe = (data ?? []).map(row => ({
    ...row,
    value: row.key === 'hospitable_token' ? (row.value ? '***configured***' : null) : row.value,
  }))

  return NextResponse.json(safe)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { key, value, property_id = null } = body

  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

  const { data, error } = await supabase
    .from('settings')
    .upsert({ key, value, property_id, updated_at: new Date().toISOString() }, {
      onConflict: 'property_id,key',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true, id: data?.id })
}
