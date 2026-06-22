import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const sp = req.nextUrl.searchParams
  const from = sp.get('from')
  const to   = sp.get('to')
  const bucket = sp.get('bucket')

  let query = supabase
    .from('expenses')
    .select('*')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .order('date', { ascending: false })

  if (from)   query = query.gte('date', from)
  if (to)     query = query.lte('date', to)
  if (bucket) query = query.eq('bucket', bucket)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('expenses')
    .insert({ ...body, property_id: DEFAULT_PROPERTY_ID, source: 'manual' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { data, error } = await supabase
    .from('expenses')
    .update(updates)
    .eq('id', id)
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient()
  const { id } = await req.json()

  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)
    .eq('property_id', DEFAULT_PROPERTY_ID)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
