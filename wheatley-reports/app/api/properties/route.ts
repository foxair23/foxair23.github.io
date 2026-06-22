import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export async function PATCH(req: NextRequest) {
  const supabase = createServiceClient()
  const body = await req.json()

  const allowed = [
    'mortgage_pi', 'mortgage_escrow', 'mortgage_total_monthly',
    'purchase_price', 'go_live_date', 'name', 'address',
  ]
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', DEFAULT_PROPERTY_ID)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
