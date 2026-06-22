'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts'
import { fmt$ } from '@/lib/calculations'
import type { MonthlyPnL } from '@/lib/calculations'

interface MonthlyChartProps {
  data: MonthlyPnL[]
}

const formatter = (v: unknown) => typeof v === 'number' ? fmt$(v) : String(v ?? '')

export function MonthlyChart({ data }: MonthlyChartProps) {
  const chartData = data.map(m => ({
    month: m.month.slice(5), // 'MM' from 'YYYY-MM'
    Revenue: Math.round(m.revenue),
    'Op. Expenses': Math.round(m.operatingExpenses),
    OCF: Math.round(m.operatingCashFlow),
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} width={48} />
        <Tooltip formatter={formatter} />
        <Legend />
        <ReferenceLine y={0} stroke="#888" />
        <Bar dataKey="Revenue"      fill="#3b82f6" radius={[3,3,0,0]} />
        <Bar dataKey="Op. Expenses" fill="#e2e8f0" radius={[3,3,0,0]} />
        <Bar dataKey="OCF"          fill="#10b981" radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
