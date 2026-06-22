import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export async function GET() {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('capital_contributions')
    .select('*')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .order('date', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const { data, error } = await supabase
    .from('capital_contributions')
    .insert({ ...body, property_id: DEFAULT_PROPERTY_ID })
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
    .from('capital_contributions')
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

  const { error } = await supabase
    .from('capital_contributions')
    .delete()
    .eq('id', id)
    .eq('property_id', DEFAULT_PROPERTY_ID)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
