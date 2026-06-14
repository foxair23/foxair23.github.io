/**
 * Vercel cron endpoint — runs daily at 3 AM UTC.
 * Configured via vercel.json crons.
 */
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(req: Request) {
  // Verify cron secret to prevent abuse
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Delegate to the sync endpoint
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const res = await fetch(`${base}/api/sync`, { method: 'POST' })
  const data = await res.json()

  return NextResponse.json(data, { status: res.status })
}
