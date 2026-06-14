import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { HospitableClient, HospitableAuthError, mapReservation } from '@/lib/hospitable'
import { DEFAULT_PROPERTY_ID } from '@/lib/calculations'

export const maxDuration = 60

export async function POST() {
  const supabase = createServiceClient()

  // Fetch token from settings
  const { data: tokenRow } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'hospitable_token')
    .is('property_id', null)
    .maybeSingle()

  const token = tokenRow?.value
  if (!token) {
    return NextResponse.json({ error: 'Hospitable token not configured. Add it in Settings.' }, { status: 400 })
  }

  const client = new HospitableClient(token)

  try {
    // Discover Hospitable property ID
    const properties = await client.getProperties()
    if (properties.length === 0) {
      return NextResponse.json({ error: 'No properties found in Hospitable account.' }, { status: 404 })
    }

    // Use the first property (single-property v1)
    const hospProp = properties[0]

    // Pull all reservations (backfill from start)
    const reservations = await client.getReservations(hospProp.id)

    if (reservations.length === 0) {
      return NextResponse.json({ synced: 0, message: 'No reservations found.' })
    }

    // Upsert into DB
    const rows = reservations.map(r => mapReservation(r, DEFAULT_PROPERTY_ID))

    const { error } = await supabase
      .from('reservations')
      .upsert(rows, { onConflict: 'hospitable_id' })

    if (error) throw error

    // Auto-derive go_live_date from earliest confirmed reservation
    const confirmed = reservations
      .filter(r => r.status !== 'cancelled')
      .sort((a, b) => a.check_in.localeCompare(b.check_in))

    if (confirmed.length > 0) {
      await supabase
        .from('properties')
        .update({ go_live_date: confirmed[0].check_in })
        .eq('id', DEFAULT_PROPERTY_ID)
        .is('go_live_date', null) // only set once
    }

    return NextResponse.json({
      synced: rows.length,
      message: `Synced ${rows.length} reservation(s) from Hospitable.`,
    })
  } catch (err) {
    if (err instanceof HospitableAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 })
    }
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
