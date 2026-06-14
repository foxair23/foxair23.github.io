import { createServiceClient } from '@/lib/supabase/server'
import {
  buildMonthlyPnL, computeRoi, fmt$, fmtPct,
  DEFAULT_PROPERTY_ID, UNDERWRITING_COC, UNDERWRITING_TOTAL_INVESTED
} from '@/lib/calculations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RoiProgress } from '@/components/dashboard/roi-progress'
import { MonthlyPnLTable } from '@/components/dashboard/monthly-pnl-table'
import { startOfMonth, subMonths, endOfMonth, parseISO, format } from 'date-fns'

export const revalidate = 0

export default async function RoiPage() {
  const supabase = createServiceClient()
  const now = new Date()
  const toDate   = endOfMonth(now)
  const fromDate = startOfMonth(subMonths(now, 23)) // 24 months of history

  const [
    { data: property },
    { data: reservations },
    { data: expenses },
    { data: capitalContribs },
    { data: buildoutExpenses },
  ] = await Promise.all([
    supabase.from('properties').select('*').eq('id', DEFAULT_PROPERTY_ID).single(),
    supabase.from('reservations').select('*').eq('property_id', DEFAULT_PROPERTY_ID),
    supabase.from('expenses').select('*').eq('property_id', DEFAULT_PROPERTY_ID),
    supabase.from('capital_contributions').select('amount, type').eq('property_id', DEFAULT_PROPERTY_ID),
    supabase.from('expenses').select('amount').eq('property_id', DEFAULT_PROPERTY_ID).eq('bucket', 'buildout'),
  ])

  const mortgagePi = property?.mortgage_pi ?? property?.mortgage_total_monthly ?? 0

  const monthlyPnL = buildMonthlyPnL(
    reservations ?? [],
    expenses ?? [],
    mortgagePi,
    fromDate,
    toDate
  )

  const capitalTotal  = (capitalContribs ?? []).reduce((s: number, r: { amount: number }) => s + (r.amount ?? 0), 0)
  const buildoutTotal = (buildoutExpenses ?? []).reduce((s: number, r: { amount: number }) => s + (r.amount ?? 0), 0)
  const totalInvested = capitalTotal + buildoutTotal

  const goLive = property?.go_live_date ? parseISO(property.go_live_date) : fromDate
  const roi = computeRoi(monthlyPnL, totalInvested, goLive)

  const annualNoi = monthlyPnL.reduce((s, m) => s + m.noi, 0)
  const purchasePrice = property?.purchase_price ?? 830000
  const capRateVal = purchasePrice > 0 ? annualNoi / purchasePrice : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ROI &amp; Break-even</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Cash-on-cash break-even — when cumulative operating cash flow ≥ total invested capital
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 text-sm text-blue-800">
        <strong>What "ROI-positive" means here:</strong> This tracks cash-on-cash break-even — when the property has returned the actual cash invested.
        It does <em>not</em> count equity built from mortgage principal paydown or appreciation.
      </div>

      {/* ROI tracker */}
      <Card>
        <CardHeader><CardTitle>Break-even Progress</CardTitle></CardHeader>
        <CardContent>
          {totalInvested > 0 ? (
            <RoiProgress roi={roi} />
          ) : (
            <p className="text-sm text-gray-400 text-center py-6">
              No invested capital recorded. Add entries in the{' '}
              <a href="/capital" className="text-blue-600 underline">Capital Ledger</a>.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Invested Capital"
          value={fmt$(totalInvested)}
          sub={`Underwriting: ${fmt$(UNDERWRITING_TOTAL_INVESTED)}`}
        />
        <MetricCard
          label="Cumulative OCF"
          value={fmt$(roi.cumulativeOcf)}
          sub={`${roi.monthsElapsed} months of data`}
          positive={roi.cumulativeOcf >= 0}
        />
        <MetricCard
          label={`CoC Return (${roi.cocLabel})`}
          value={fmtPct(roi.cocReturn)}
          sub={`Mid underwriting: ${fmtPct(UNDERWRITING_COC.mid)}`}
          positive={roi.cocReturn >= UNDERWRITING_COC.low}
        />
        <MetricCard
          label="Cap Rate"
          value={fmtPct(capRateVal)}
          sub={`On ${fmt$(purchasePrice)} purchase price`}
          positive={capRateVal > 0}
        />
      </div>

      {/* CoC benchmarks detail */}
      <Card>
        <CardHeader><CardTitle>CoC vs Underwriting Scenarios</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium">Scenario</th>
                <th className="text-right py-2 px-3 font-medium">Projected CoC</th>
                <th className="text-right py-2 px-3 font-medium">Actual CoC</th>
                <th className="text-right py-2 pl-3 font-medium">vs Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {([
                { label: 'Low',  pct: UNDERWRITING_COC.low,  highlight: false },
                { label: 'Mid',  pct: UNDERWRITING_COC.mid,  highlight: true },
                { label: 'High', pct: UNDERWRITING_COC.high, highlight: false },
              ] as const).map(row => {
                const delta = roi.cocReturn - row.pct
                return (
                  <tr key={row.label} className={row.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="py-2.5 pr-4 font-medium text-gray-700">
                      {row.label} {row.highlight && <span className="text-xs text-blue-500">(default)</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{fmtPct(row.pct)}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-medium">
                      {roi.monthsElapsed > 0 ? fmtPct(roi.cocReturn) : '—'}
                    </td>
                    <td className={`py-2.5 pl-3 text-right tabular-nums font-medium ${delta >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {roi.monthsElapsed > 0 ? `${delta >= 0 ? '+' : ''}${fmtPct(delta)}` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-3">{roi.cocLabel && `CoC calculated: ${roi.cocLabel}`}</p>
        </CardContent>
      </Card>

      {/* Monthly P&L table */}
      <Card>
        <CardHeader><CardTitle>Monthly P&amp;L (All History)</CardTitle></CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="px-6 pb-4">
            <MonthlyPnLTable data={monthlyPnL} mortgagePi={mortgagePi} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({ label, value, sub, positive }: { label: string; value: string; sub?: string; positive?: boolean }) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
        <div className={`text-xl font-bold ${positive === true ? 'text-green-700' : positive === false ? 'text-red-600' : 'text-gray-900'}`}>
          {value}
        </div>
        {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
      </CardContent>
    </Card>
  )
}
