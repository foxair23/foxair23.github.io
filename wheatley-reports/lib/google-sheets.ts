/**
 * Google Sheets API v4 client using a Service Account.
 *
 * Setup (one-time):
 * 1. In Google Cloud Console, create a Service Account and download the JSON key.
 * 2. Copy GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY to your env.
 * 3. Share the expense Google Sheet with the service account email (Viewer is enough).
 * 4. Store the Sheet ID in Settings (the long ID in the sheet URL).
 *
 * The Sheet ID is the portion between /d/ and /edit in the URL:
 *   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 */

import { JWT } from 'google-auth-library'

const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets'
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

function getJwt(): JWT {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key   = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !key) {
    throw new Error(
      'Google Sheets not configured. Add GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY to your environment variables.'
    )
  }

  return new JWT({ email, key, scopes: SCOPES })
}

async function getAccessToken(): Promise<string> {
  const jwt = getJwt()
  const token = await jwt.getAccessToken()
  if (!token.token) throw new Error('Failed to obtain Google access token')
  return token.token
}

export interface SheetRow {
  values: (string | null)[]
}

/**
 * Fetch all values from a named range or entire sheet tab.
 * Returns rows as arrays of string values (empty cells are null).
 *
 * @param spreadsheetId  The Sheet ID from the URL
 * @param range          e.g. "2025!A:Z" or "2026 Expenses!A:Z" or just "A:Z"
 */
export async function fetchSheetRange(
  spreadsheetId: string,
  range: string
): Promise<SheetRow[]> {
  const token = await getAccessToken()

  const url = `${SHEETS_BASE}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 403) {
    throw new Error(
      'Access denied to Google Sheet. Make sure you shared the sheet with the service account email.'
    )
  }
  if (res.status === 404) {
    throw new Error(
      `Sheet or range not found: "${range}". Check the Sheet ID and tab name.`
    )
  }
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Google Sheets API error ${res.status}: ${body}`)
  }

  const data = await res.json() as { values?: string[][] }
  const rows = data.values ?? []

  return rows.map(row => ({
    values: row.map(cell => (cell?.trim() === '' ? null : cell?.trim() ?? null)),
  }))
}

/**
 * List all sheet/tab names in a spreadsheet.
 * Useful so the sync can discover "2025" and "2026" tabs automatically.
 */
export async function listSheetTabs(spreadsheetId: string): Promise<string[]> {
  const token = await getAccessToken()

  const url = `${SHEETS_BASE}/${encodeURIComponent(spreadsheetId)}?fields=sheets.properties.title`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Google Sheets API error ${res.status}: ${body}`)
  }

  const data = await res.json() as { sheets?: { properties?: { title?: string } }[] }
  return (data.sheets ?? []).map(s => s.properties?.title ?? '').filter(Boolean)
}

/**
 * Convert sheet rows (first row = headers) into objects.
 */
export function rowsToObjects(rows: SheetRow[]): Record<string, string | null>[] {
  if (rows.length < 2) return []
  const headers = rows[0].values.map(v => v ?? '')
  return rows.slice(1).map(row => {
    const obj: Record<string, string | null> = {}
    headers.forEach((h, i) => {
      obj[h] = row.values[i] ?? null
    })
    return obj
  })
}
