import { createServiceClient } from '@/lib/supabase/server'
import { fmt$, DEFAULT_PROPERTY_ID } from '@/lib/calculations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format, parseISO, startOfMonth, subMonths, endOfMonth } from 'date-fns'

export const revalidate = 0

const CHANNEL_VARIANT: Record<string, 'info' | 'success' | 'warning' | 'neutral'> = {
  airbnb: 'success',
  vrbo: 'info',
  booking_com: 'warning',
  direct: 'neutral',
}

export default async function RevenuePage() {
  const supabase = createServiceClient()
  const now = new Date()
  const toDate   = endOfMonth(now)
  const fromDate = startOfMonth(subMonths(now, 11))

  const { data: reservations } = await supabase
    .from('reservations')
    .select('*')
    .eq('property_id', DEFAULT_PROPERTY_ID)
    .order('check_out', { ascending: false })

  const all = reservations ?? []
  const confirmed = all.filter(r => r.status !== 'cancelled')

  const totalRevenue   = confirmed.reduce((s, r) => s + (r.host_payout ?? 0), 0)
  const totalNights    = confirmed.reduce((s, r) => s + r.nights, 0)
  const totalBookings  = confirmed.length

  // Channel breakdown
  const channelMap: Record<string, { revenue: number; bookings: number; nights: number }> = {}
  for (const r of confirmed) {
    const ch = (r.channel ?? 'direct').toLowerCase()
    if (!channelMap[ch]) channelMap[ch] = { revenue: 0, bookings: 0, nights: 0 }
    channelMap[ch].revenue   += r.host_payout ?? 0
    channelMap[ch].bookings  += 1
    channelMap[ch].nights    += r.nights
  }

  // Monthly revenue
  const monthMap: Record<string, number> = {}
  for (const r of confirmed) {
    const mo = r.check_out?.slice(0, 7)
    if (mo) monthMap[mo] = (monthMap[mo] ?? 0) + (r.host_payout ?? 0)
  }
  const monthlyRevenue = Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>
        <p className="text-sm text-gray-500 mt-0.5">All reservations · recognized by check-out month</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Revenue</div>
            <div className="text-xl font-bold text-gray-900">{fmt$(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bookings</div>
            <div className="text-xl font-bold text-gray-900">{totalBookings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Booked Nights</div>
            <div className="text-xl font-bold text-gray-900">{totalNights}</div>
          </CardContent>
        </Card>
      </div>

      {/* Channel breakdown */}
      <Card>
        <CardHeader><CardTitle>Channel Breakdown</CardTitle></CardHeader>
        <CardContent>
          {Object.keys(channelMap).length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No reservations yet. Sync Hospitable to pull booking data.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium">Channel</th>
                  <th className="text-right py-2 px-3 font-medium">Revenue</th>
                  <th className="text-right py-2 px-3 font-medium">Share</th>
                  <th className="text-right py-2 px-3 font-medium">Bookings</th>
                  <th className="text-right py-2 pl-3 font-medium">Nights</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Object.entries(channelMap)
                  .sort((a, b) => b[1].revenue - a[1].revenue)
                  .map(([ch, s]) => (
                    <tr key={ch} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4">
                        <Badge variant={CHANNEL_VARIANT[ch] ?? 'default'}>{ch}</Badge>
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-medium">{fmt$(s.revenue)}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-gray-500">
                        {totalRevenue > 0 ? ((s.revenue / totalRevenue) * 100).toFixed(0) : 0}%
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-gray-500">{s.bookings}</td>
                      <td className="py-2.5 pl-3 text-right tabular-nums text-gray-500">{s.nights}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Monthly revenue */}
      <Card>
        <CardHeader><CardTitle>Revenue by Month</CardTitle></CardHeader>
        <CardContent>
          {monthlyRevenue.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No data yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left py-2 pr-4 font-medium">Month</th>
                  <th className="text-right py-2 pl-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {monthlyRevenue.map(([mo, rev]) => (
                  <tr key={mo} className="hover:bg-gray-50">
                    <td className="py-2.5 pr-4 font-medium text-gray-700">{mo}</td>
                    <td className="py-2.5 pl-3 text-right tabular-nums font-medium text-gray-800">{fmt$(rev)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Reservation list */}
      <Card>
        <CardHeader><CardTitle>All Reservations</CardTitle></CardHeader>
        <CardContent className="p-0">
          {all.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-sm">No reservations. Sync Hospitable first.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-medium">Check-in</th>
                    <th className="text-left px-4 py-3 font-medium">Check-out</th>
                    <th className="text-right px-4 py-3 font-medium">Nights</th>
                    <th className="text-left px-4 py-3 font-medium">Channel</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-right px-4 py-3 font-medium">Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {all.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{r.check_in}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{r.check_out}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-gray-500">{r.nights}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={CHANNEL_VARIANT[(r.channel ?? 'direct').toLowerCase()] ?? 'default'}>
                          {r.channel ?? 'direct'}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge variant={r.status === 'cancelled' ? 'danger' : 'success'}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-medium text-gray-800">
                        {r.host_payout != null ? fmt$(r.host_payout) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
