/**
 * Vercel cron endpoint — runs daily at 3 AM UTC.
 * Configured via vercel.json crons.
 * Syncs both Hospitable reservations and Google Sheets expenses.
 */
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const headers = { 'Content-Type': 'application/json' }

  const [hospRes, sheetsRes] = await Promise.allSettled([
    fetch(`${base}/api/sync`,        { method: 'POST', headers }),
    fetch(`${base}/api/sync-sheets`, { method: 'POST', headers }),
  ])

  const hospData   = hospRes.status   === 'fulfilled' ? await hospRes.value.json()   : { error: String((hospRes as PromiseRejectedResult).reason) }
  const sheetsData = sheetsRes.status === 'fulfilled' ? await sheetsRes.value.json() : { error: String((sheetsRes as PromiseRejectedResult).reason) }

  return NextResponse.json({
    hospitable: hospData,
    sheets:     sheetsData,
  })
}
