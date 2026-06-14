'use client'

import { clsx } from 'clsx'
import { fmt$ } from '@/lib/calculations'
import type { MonthlyPnL } from '@/lib/calculations'

interface PnLTableProps {
  data: MonthlyPnL[]
  mortgagePi: number
}

export function MonthlyPnLTable({ data, mortgagePi }: PnLTableProps) {
  if (data.length === 0) return <p className="text-sm text-gray-400 py-4">No data yet.</p>

  const totals = data.reduce(
    (acc, m) => ({
      revenue: acc.revenue + m.revenue,
      opex: acc.opex + m.operatingExpenses,
      noi: acc.noi + m.noi,
      ocf: acc.ocf + m.operatingCashFlow,
      bookedNights: acc.bookedNights + m.bookedNights,
    }),
    { revenue: 0, opex: 0, noi: 0, ocf: 0, bookedNights: 0 }
  )

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left py-2 pr-4 font-medium">Month</th>
            <th className="text-right py-2 px-3 font-medium">Revenue</th>
            <th className="text-right py-2 px-3 font-medium">Op. Costs</th>
            <th className="text-right py-2 px-3 font-medium">NOI</th>
            <th className="text-right py-2 px-3 font-medium">Mortgage P&I</th>
            <th className="text-right py-2 px-3 font-medium">Cash Flow</th>
            <th className="text-right py-2 pl-3 font-medium">Occ. %</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map(m => (
            <tr key={m.month} className="hover:bg-gray-50 transition-colors">
              <td className="py-2 pr-4 font-medium text-gray-700">{m.month}</td>
              <td className="py-2 px-3 text-right tabular-nums">{fmt$(m.revenue)}</td>
              <td className="py-2 px-3 text-right tabular-nums text-gray-500">{fmt$(m.operatingExpenses)}</td>
              <td className={clsx('py-2 px-3 text-right tabular-nums font-medium', m.noi >= 0 ? 'text-blue-700' : 'text-red-500')}>
                {fmt$(m.noi)}
              </td>
              <td className="py-2 px-3 text-right tabular-nums text-gray-500">{fmt$(mortgagePi)}</td>
              <td className={clsx('py-2 px-3 text-right tabular-nums font-semibold', m.operatingCashFlow >= 0 ? 'text-green-700' : 'text-red-600')}>
                {fmt$(m.operatingCashFlow)}
              </td>
              <td className="py-2 pl-3 text-right tabular-nums text-gray-500">
                {(m.occupancyPct * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t-2 border-gray-200">
          <tr className="font-semibold text-gray-800 bg-gray-50">
            <td className="py-2 pr-4">Total</td>
            <td className="py-2 px-3 text-right tabular-nums">{fmt$(totals.revenue)}</td>
            <td className="py-2 px-3 text-right tabular-nums text-gray-500">{fmt$(totals.opex)}</td>
            <td className={clsx('py-2 px-3 text-right tabular-nums', totals.noi >= 0 ? 'text-blue-700' : 'text-red-500')}>
              {fmt$(totals.noi)}
            </td>
            <td className="py-2 px-3 text-right tabular-nums text-gray-500">
              {fmt$(mortgagePi * data.length)}
            </td>
            <td className={clsx('py-2 px-3 text-right tabular-nums', totals.ocf >= 0 ? 'text-green-700' : 'text-red-600')}>
              {fmt$(totals.ocf)}
            </td>
            <td className="py-2 pl-3 text-right tabular-nums text-gray-500">—</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
