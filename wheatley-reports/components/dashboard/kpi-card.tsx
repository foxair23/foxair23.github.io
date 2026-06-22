import { clsx } from 'clsx'
import { Card, CardContent } from '@/components/ui/card'

interface KpiCardProps {
  label: string
  value: string
  sub?: string
  subLabel?: string
  positive?: boolean | null  // null = neutral
  highlight?: boolean        // makes it the "headline" number
  tooltip?: string
}

export function KpiCard({ label, value, sub, subLabel, positive, highlight, tooltip }: KpiCardProps) {
  const valueColor =
    positive === true  ? 'text-green-600' :
    positive === false ? 'text-red-500'   :
    highlight          ? 'text-slate-900' :
    'text-slate-800'

  return (
    <Card className={clsx(highlight && 'ring-2 ring-blue-500 ring-offset-1')}>
      <CardContent className="py-5">
        <div className="flex items-start justify-between">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</div>
          {tooltip && (
            <span title={tooltip} className="text-gray-300 cursor-help text-xs">ⓘ</span>
          )}
        </div>
        <div className={clsx('mt-1 text-2xl font-bold tabular-nums', valueColor)}>
          {value}
        </div>
        {sub && (
          <div className="mt-1 text-xs text-gray-500">
            {subLabel && <span className="font-medium">{subLabel}: </span>}
            {sub}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
