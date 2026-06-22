'use client'

import { clsx } from 'clsx'
import { fmt$, fmtPct, UNDERWRITING_COC } from '@/lib/calculations'
import type { RoiMetrics } from '@/lib/calculations'

interface RoiProgressProps {
  roi: RoiMetrics
}

export function RoiProgress({ roi }: RoiProgressProps) {
  const pct = Math.min(roi.pctRecovered, 1)
  const isPositive = roi.netPosition >= 0

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>$0</span>
          <span className="font-medium text-gray-700">{fmt$(roi.totalInvestedCapital)} invested</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={clsx(
              'h-full rounded-full transition-all duration-700',
              isPositive ? 'bg-green-500' : 'bg-blue-500'
            )}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1.5">
          <span className="text-blue-600 font-medium">{fmt$(roi.cumulativeOcf)} recovered</span>
          <span className={clsx('font-medium', isPositive ? 'text-green-600' : 'text-gray-400')}>
            {fmtPct(roi.pctRecovered)} returned
          </span>
        </div>
      </div>

      {/* Numbers grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Net Position" value={fmt$(roi.netPosition)} positive={roi.netPosition >= 0} />
        <Stat
          label={`CoC Return (${roi.cocLabel})`}
          value={fmtPct(roi.cocReturn)}
          positive={roi.cocReturn > 0}
        />
        <Stat
          label="Projected Break-even"
          value={roi.breakEvenDate ?? (isPositive ? 'Achieved ✓' : '—')}
          positive={isPositive}
        />
        <Stat label="Months of Data" value={`${roi.monthsElapsed}`} positive={null} />
      </div>

      {/* CoC benchmarks */}
      <div className="border-t border-gray-100 pt-3">
        <div className="text-xs text-gray-500 mb-2 font-medium">Underwriting CoC benchmarks</div>
        <div className="flex gap-4 text-xs">
          <BenchmarkBar label="Low" pct={UNDERWRITING_COC.low}  actual={roi.cocReturn} />
          <BenchmarkBar label="Mid" pct={UNDERWRITING_COC.mid}  actual={roi.cocReturn} highlight />
          <BenchmarkBar label="High" pct={UNDERWRITING_COC.high} actual={roi.cocReturn} />
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, positive }: { label: string; value: string; positive: boolean | null }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <div className="text-xs text-gray-500">{label}</div>
      <div className={clsx(
        'font-semibold text-base',
        positive === true  ? 'text-green-700' :
        positive === false ? 'text-red-600'   : 'text-gray-800'
      )}>
        {value}
      </div>
    </div>
  )
}

function BenchmarkBar({ label, pct, actual, highlight }: {
  label: string; pct: number; actual: number; highlight?: boolean
}) {
  const isBeating = actual >= pct
  return (
    <div className={clsx('flex-1 rounded px-2 py-1.5', highlight ? 'bg-blue-50' : 'bg-gray-50')}>
      <div className={clsx('text-xs font-medium mb-0.5', highlight ? 'text-blue-700' : 'text-gray-600')}>
        {label} {fmtPct(pct)}
      </div>
      <div className={clsx('text-xs', isBeating ? 'text-green-600' : 'text-gray-400')}>
        {isBeating ? '↑ beating' : '↓ below'}
      </div>
    </div>
  )
}
