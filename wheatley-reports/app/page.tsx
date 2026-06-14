import { createServiceClient } from '@/lib/supabase/server'
import { buildMonthlyPnL, computeRoi, fmt$, fmtPct, DEFAULT_PROPERTY_ID } from '@/lib/calculations'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { MonthlyChart } from '@/components/dashboard/monthly-chart'
import { MonthlyPnLTable } from '@/components/dashboard/monthly-pnl-table'
import { RoiProgress } from '@/components/dashboard/roi-progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { startOfMonth, subMonths, endOfMonth, parseISO, format } from 'date-fns'

export const revalidate = 0

export default async function DashboardPage() {
  const supabase = createServiceClient()
  const now = new Date()
  const toDate   = endOfMonth(now)
  const fromDate = startOfMonth(subMonths(now, 11))

  const [
    { data: property },
    { data: reservations },
    { data: expenses },
    { data: capitalContribs },
    { data: buildoutExpenses },
    { data: tokenRow },
  ] = await Promise.all([
    supabase.from('properties').select('*').eq('id', DEFAULT_PROPERTY_ID).single(),
    supabase.from('reservations').select('*').eq('property_id', DEFAULT_PROPERTY_ID)
      .gte('check_out', format(fromDate, 'yyyy-MM-dd'))
      .lte('check_out', format(toDate, 'yyyy-MM-dd')),
    supabase.from('expenses').select('*').eq('property_id', DEFAULT_PROPERTY_ID)
      .gte('date', format(fromDate, 'yyyy-MM-dd'))
      .lte('date', format(toDate, 'yyyy-MM-dd')),
    supabase.from('capital_contributions').select('amount').eq('property_id', DEFAULT_PROPERTY_ID),
    supabase.from('expenses').select('amount').eq('property_id', DEFAULT_PROPERTY_ID).eq('bucket', 'buildout'),
    supabase.from('settings').select('value').eq('key', 'hospitable_token').is('property_id', null).maybeSingle(),
  ])

  const hasToken = Boolean(tokenRow?.value)
  const mortgagePi = property?.mortgage_pi ?? property?.mortgage_total_monthly ?? 0

  const monthlyPnL = buildMonthlyPnL(
    reservations ?? [],
    expenses ?? [],
    mortgagePi,
    fromDate,
    toDate
  )

  const capitalTotal  = (capitalContribs ?? []).reduce((s: number, r: { amount: number | null }) => s + (r.amount ?? 0), 0)
  const buildoutTotal = (buildoutExpenses ?? []).reduce((s: number, r: { amount: number | null }) => s + (r.amount ?? 0), 0)
  const totalInvested = capitalTotal + buildoutTotal

  const goLive = property?.go_live_date ? parseISO(property.go_live_date) : fromDate
  const roi = computeRoi(monthlyPnL, totalInvested, goLive)

  const totalRevenue = monthlyPnL.reduce((s, m) => s + m.revenue, 0)
  const totalOpex    = monthlyPnL.reduce((s, m) => s + m.operatingExpenses, 0)
  const totalNoi     = monthlyPnL.reduce((s, m) => s + m.noi, 0)
  const totalOcf     = monthlyPnL.reduce((s, m) => s + m.operatingCashFlow, 0)
  const totalBooked  = monthlyPnL.reduce((s, m) => s + m.bookedNights, 0)
  const totalAvail   = monthlyPnL.reduce((s, m) => s + m.availableNights, 0)
  const occupancy    = totalAvail > 0 ? totalBooked / totalAvail : 0
  const adr          = totalBooked > 0 ? totalRevenue / totalBooked : 0

  // Channel breakdown from reservations
  const channelMap: Record<string, number> = {}
  for (const r of reservations ?? []) {
    if (r.status === 'cancelled') continue
    const ch = (r.channel ?? 'direct').toLowerCase()
    channelMap[ch] = (channelMap[ch] ?? 0) + (r.host_payout ?? 0)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {format(fromDate, 'MMM yyyy')} – {format(toDate, 'MMM yyyy')} · 82801 Wheatley Court, Indio CA
        </p>
      </div>

      {!hasToken && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800">
          <strong>Set up Hospitable sync</strong> — add your Personal Access Token in{' '}
          <a href="/settings" className="underline font-medium">Settings</a> to pull live revenue data.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Operating Cash Flow"
          value={fmt$(totalOcf)}
          sub={`NOI: ${fmt$(totalNoi)}`}
          positive={totalOcf >= 0}
          highlight
          tooltip="Revenue − operating costs − mortgage P&I. NOI excludes the mortgage."
        />
        <KpiCard
          label="Revenue (period)"
          value={fmt$(totalRevenue)}
          sub={Object.entries(channelMap).map(([k, v]) => `${k}: ${fmt$(v)}`).join(' · ') || undefined}
          positive={null}
        />
        <KpiCard
          label="Occupancy"
          value={fmtPct(occupancy)}
          sub={`${totalBooked} nights booked`}
          positive={occupancy > 0.6}
          tooltip="Booked nights ÷ available nights"
        />
        <KpiCard
          label="ADR"
          value={fmt$(adr)}
          sub={`Avg daily rate`}
          positive={null}
          tooltip="Room revenue ÷ booked nights"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue &amp; Cash Flow</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyPnL.some(m => m.revenue > 0 || m.operatingExpenses > 0) ? (
            <MonthlyChart data={monthlyPnL} />
          ) : (
            <EmptyState>No revenue or expense data yet. Import expenses and sync Hospitable.</EmptyState>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI / Break-even Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          {totalInvested > 0 ? (
            <RoiProgress roi={roi} />
          ) : (
            <EmptyState>
              Add your down payment and buildout costs in the{' '}
              <a href="/capital" className="text-blue-600 underline">Capital Ledger</a>{' '}
              to enable the ROI tracker.
            </EmptyState>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly P&amp;L — Last 12 Months</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="px-6 pb-4">
            <MonthlyPnLTable data={monthlyPnL} mortgagePi={mortgagePi} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center py-10 text-gray-400 text-sm">{children}</div>
  )
}
