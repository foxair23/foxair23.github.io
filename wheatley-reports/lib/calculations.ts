/**
 * Core financial calculations for Wheatley STR Reporting.
 * All monetary values in USD. All rates as decimals (0.20 = 20%).
 */

import { startOfMonth, endOfMonth, eachMonthOfInterval, format, isWithinInterval, parseISO } from 'date-fns'

export const DEFAULT_PROPERTY_ID = '00000000-0000-0000-0000-000000000001'

// ── Revenue ────────────────────────────────────────────────────────────────

/**
 * "Room revenue" = host_payout minus cleaning_fee (if included).
 * Used for ADR and RevPAR calculations only; OCF uses raw host_payout.
 */
export function roomRevenue(hostPayout: number, cleaningFee: number | null): number {
  return hostPayout - (cleaningFee ?? 0)
}

// ── Monthly P&L ────────────────────────────────────────────────────────────

export interface MonthlyPnL {
  month: string           // 'YYYY-MM'
  revenue: number         // sum of host_payout for reservations checking out this month
  operatingExpenses: number
  noi: number             // revenue - operating expenses
  mortgagePi: number
  operatingCashFlow: number  // noi - mortgage P&I (= revenue - operating - mortgage)
  bookings: number
  bookedNights: number
  availableNights: number
  occupancyPct: number
  adr: number
  revpar: number
}

export interface Reservation {
  check_out: string
  check_in: string
  nights: number
  status: string
  host_payout: number | null
  cleaning_fee: number | null
  channel: string | null
}

export interface Expense {
  date: string
  amount: number
  bucket: 'operating' | 'buildout' | 'debt_service'
  category: string
  subcategory: string | null
}

export function buildMonthlyPnL(
  reservations: Reservation[],
  expenses: Expense[],
  mortgagePi: number,
  startDate: Date,
  endDate: Date
): MonthlyPnL[] {
  const months = eachMonthOfInterval({ start: startDate, end: endDate })

  return months.map(monthStart => {
    const monthEnd = endOfMonth(monthStart)
    const monthKey = format(monthStart, 'yyyy-MM')
    const daysInMonth = monthEnd.getDate()

    // Revenue: reservations where check_out falls in this month, status != cancelled
    const monthReservations = reservations.filter(r => {
      if (r.status === 'cancelled') return false
      const co = parseISO(r.check_out)
      return isWithinInterval(co, { start: monthStart, end: monthEnd })
    })

    const revenue = monthReservations.reduce((sum, r) => sum + (r.host_payout ?? 0), 0)
    const bookedNights = monthReservations.reduce((sum, r) => sum + r.nights, 0)
    const totalRoomRevenue = monthReservations.reduce(
      (sum, r) => sum + roomRevenue(r.host_payout ?? 0, r.cleaning_fee),
      0
    )

    // Operating expenses for this month (bucket = 'operating')
    const monthExpenses = expenses.filter(e => {
      const d = parseISO(e.date)
      return e.bucket === 'operating' && isWithinInterval(d, { start: monthStart, end: monthEnd })
    })
    const operatingExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0)

    const noi = revenue - operatingExpenses
    const operatingCashFlow = noi - mortgagePi

    const availableNights = daysInMonth
    const occupancyPct = availableNights > 0 ? bookedNights / availableNights : 0
    const adr = bookedNights > 0 ? totalRoomRevenue / bookedNights : 0
    const revpar = availableNights > 0 ? totalRoomRevenue / availableNights : 0

    return {
      month: monthKey,
      revenue,
      operatingExpenses,
      noi,
      mortgagePi,
      operatingCashFlow,
      bookings: monthReservations.length,
      bookedNights,
      availableNights,
      occupancyPct,
      adr,
      revpar,
    }
  })
}

// ── ROI / Break-even ───────────────────────────────────────────────────────

export interface RoiMetrics {
  totalInvestedCapital: number
  cumulativeOcf: number         // from go-live to end of last complete month
  netPosition: number           // cumulative OCF - total invested (negative until break-even)
  pctRecovered: number          // cumulative OCF / total invested
  breakEvenDate: string | null  // projected 'YYYY-MM' or null if not foreseeable
  cocReturn: number             // annualized CoC as decimal
  cocLabel: string              // "annualized from N months" or "TTM"
  monthsElapsed: number
}

export function computeRoi(
  monthlyPnL: MonthlyPnL[],
  totalInvestedCapital: number,
  goLiveDate: Date
): RoiMetrics {
  const now = new Date()
  const completedMonths = monthlyPnL.filter(m => {
    const monthEnd = endOfMonth(parseISO(m.month + '-01'))
    return monthEnd < now
  })

  const cumulativeOcf = completedMonths.reduce((sum, m) => sum + m.operatingCashFlow, 0)
  const netPosition = cumulativeOcf - totalInvestedCapital
  const pctRecovered = totalInvestedCapital > 0 ? cumulativeOcf / totalInvestedCapital : 0
  const monthsElapsed = completedMonths.length

  // Cash-on-Cash return
  let cocReturn = 0
  let cocLabel = ''
  if (monthsElapsed >= 12) {
    // TTM: last 12 months
    const ttm = completedMonths.slice(-12).reduce((sum, m) => sum + m.operatingCashFlow, 0)
    cocReturn = totalInvestedCapital > 0 ? ttm / totalInvestedCapital : 0
    cocLabel = 'TTM'
  } else if (monthsElapsed > 0) {
    const avgMonthly = cumulativeOcf / monthsElapsed
    cocReturn = totalInvestedCapital > 0 ? (avgMonthly * 12) / totalInvestedCapital : 0
    cocLabel = `annualized from ${monthsElapsed} month${monthsElapsed !== 1 ? 's' : ''}`
  }

  // Project break-even by extrapolating recent trend (last 3 months avg)
  let breakEvenDate: string | null = null
  const recentMonths = completedMonths.slice(-3)
  if (recentMonths.length > 0) {
    const avgMonthly = recentMonths.reduce((sum, m) => sum + m.operatingCashFlow, 0) / recentMonths.length
    if (avgMonthly > 0 && netPosition < 0) {
      const monthsToBreakEven = Math.ceil(Math.abs(netPosition) / avgMonthly)
      const projected = new Date()
      projected.setMonth(projected.getMonth() + monthsToBreakEven)
      breakEvenDate = format(projected, 'yyyy-MM')
    } else if (netPosition >= 0) {
      // Already at break-even — find the actual month
      const beMonth = completedMonths.find((_, i) => {
        const partial = completedMonths.slice(0, i + 1).reduce((s, m) => s + m.operatingCashFlow, 0)
        return partial >= totalInvestedCapital
      })
      breakEvenDate = beMonth?.month ?? null
    }
  }

  return {
    totalInvestedCapital,
    cumulativeOcf,
    netPosition,
    pctRecovered,
    breakEvenDate,
    cocReturn,
    cocLabel,
    monthsElapsed,
  }
}

// ── Cap rate ────────────────────────────────────────────────────────────────

export function capRate(annualNoi: number, purchasePrice: number): number {
  return purchasePrice > 0 ? annualNoi / purchasePrice : 0
}

// ── Underwriting benchmarks (from PRD §9b) ────────────────────────────────

export const UNDERWRITING_COC = {
  low:  0.1206,
  mid:  0.2027,
  high: 0.2519,
}

export const UNDERWRITING_TOTAL_INVESTED = 295400

// ── Formatting helpers ─────────────────────────────────────────────────────

export function fmt$(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export function fmtPct(n: number, decimals = 1): string {
  return (n * 100).toFixed(decimals) + '%'
}
