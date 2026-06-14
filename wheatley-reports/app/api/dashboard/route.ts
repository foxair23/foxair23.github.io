import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { buildMonthlyPnL, computeRoi, DEFAULT_PROPERTY_ID } from '@/lib/calculations'
import { parseISO, startOfMonth, subMonths, endOfMonth, format } from 'date-fns'

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const sp = req.nextUrl.searchParams

  // Default: last 12 months
  const toDate   = sp.get('to')   ? parseISO(sp.get('to')!)   : endOfMonth(new Date())
  const fromDate = sp.get('from') ? parseISO(sp.get('from')!) : startOfMonth(subMonths(toDate, 11))

  // Fetch property info
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('id', DEFAULT_PROPERTY_ID)
    .single()

  if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })

  // Fetch all reservations in range (by check_out date)
  const { data: reservations } = await supabase
    .from('reservations')
    .select('*')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .gte('check_out', format(fromDate, 'yyyy-MM-dd'))
    .lte('check_out', format(toDate, 'yyyy-MM-dd'))

  // Fetch operating expenses in range
  const { data: expenses } = await supabase
    .from('expenses')
    .select('*')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .gte('date', format(fromDate, 'yyyy-MM-dd'))
    .lte('date', format(toDate, 'yyyy-MM-dd'))

  // Fetch capital contributions (for ROI total)
  const { data: capitalContribs } = await supabase
    .from('capital_contributions')
    .select('amount')
    .eq('property_id', DEFAULT_PROPERTY_ID)

  // Buildout expenses also contribute to total invested
  const { data: buildoutExpenses } = await supabase
    .from('expenses')
    .select('amount')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .eq('bucket', 'buildout')

  const mortgagePi = property.mortgage_pi ?? property.mortgage_total_monthly ?? 0

  const monthlyPnL = buildMonthlyPnL(
    reservations ?? [],
    expenses ?? [],
    mortgagePi,
    fromDate,
    toDate
  )

  // Total invested capital
  const capitalTotal = (capitalContribs ?? []).reduce((s, r) => s + (r.amount ?? 0), 0)
  const buildoutTotal = (buildoutExpenses ?? []).reduce((s, r) => s + (r.amount ?? 0), 0)
  const totalInvestedCapital = capitalTotal + buildoutTotal

  // ROI from go-live
  const goLive = property.go_live_date ? parseISO(property.go_live_date) : fromDate
  const roi = computeRoi(monthlyPnL, totalInvestedCapital, goLive)

  // Summary for current period
  const totalRevenue         = monthlyPnL.reduce((s, m) => s + m.revenue, 0)
  const totalOpex            = monthlyPnL.reduce((s, m) => s + m.operatingExpenses, 0)
  const totalNoi             = monthlyPnL.reduce((s, m) => s + m.noi, 0)
  const totalOcf             = monthlyPnL.reduce((s, m) => s + m.operatingCashFlow, 0)
  const totalBookedNights    = monthlyPnL.reduce((s, m) => s + m.bookedNights, 0)
  const totalAvailableNights = monthlyPnL.reduce((s, m) => s + m.availableNights, 0)
  const avgOccupancy = totalAvailableNights > 0 ? totalBookedNights / totalAvailableNights : 0

  // Channel breakdown
  const channelMap: Record<string, number> = {}
  for (const r of reservations ?? []) {
    if (r.status === 'cancelled') continue
    const ch = r.channel ?? 'unknown'
    channelMap[ch] = (channelMap[ch] ?? 0) + (r.host_payout ?? 0)
  }

  return NextResponse.json({
    property,
    summary: {
      revenue: totalRevenue,
      operatingExpenses: totalOpex,
      noi: totalNoi,
      operatingCashFlow: totalOcf,
      bookedNights: totalBookedNights,
      availableNights: totalAvailableNights,
      occupancyPct: avgOccupancy,
    },
    monthlyPnL,
    roi,
    channelBreakdown: channelMap,
  })
}
