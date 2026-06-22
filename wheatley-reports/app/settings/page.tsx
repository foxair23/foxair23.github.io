'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react'

interface Setting {
  key: string
  value: string | null
  property_id: string | null
}

interface SyncResult {
  synced?: number
  flagged?: number
  tabs?: string[]
  message?: string
  error?: string
}

export default function SettingsPage() {
  const [settings, setSettings]           = useState<Setting[]>([])
  const [token, setToken]                 = useState('')
  const [savingToken, setSavingToken]     = useState(false)
  const [tokenMsg, setTokenMsg]           = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [syncingHosp, setSyncingHosp]     = useState(false)
  const [hospSyncMsg, setHospSyncMsg]     = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const [sheetId, setSheetId]             = useState('')
  const [savingSheet, setSavingSheet]     = useState(false)
  const [sheetMsg, setSheetMsg]           = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [syncingSheets, setSyncingSheets] = useState(false)
  const [sheetsSyncMsg, setSheetsSyncMsg] = useState<SyncResult | null>(null)

  const [mortgagePi, setMortgagePi]       = useState('')
  const [mortgageEscrow, setMortgageEscrow] = useState('')
  const [savingMortgage, setSavingMortgage] = useState(false)
  const [mortgageMsg, setMortgageMsg]     = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  async function load() {
    const [settingsRes, propRes] = await Promise.all([
      fetch('/api/settings'),
      fetch('/api/dashboard'),
    ])
    const settingsData = await settingsRes.json()
    setSettings(Array.isArray(settingsData) ? settingsData : [])

    const sheetIdRow = Array.isArray(settingsData)
      ? settingsData.find((s: Setting) => s.key === 'google_sheet_id')
      : null
    if (sheetIdRow?.value && sheetIdRow.value !== '***configured***') {
      setSheetId(sheetIdRow.value)
    }

    if (propRes.ok) {
      const d = await propRes.json()
      if (d.property) {
        setMortgagePi(d.property.mortgage_pi ?? '')
        setMortgageEscrow(d.property.mortgage_escrow ?? '')
      }
    }
  }

  useEffect(() => { load() }, []) // eslint-disable-line

  const tokenConfigured = settings.some(s => s.key === 'hospitable_token' && s.value)
  const sheetConfigured = settings.some(s => s.key === 'google_sheet_id'  && s.value)

  async function saveSetting(key: string, value: string) {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
    return res.ok
  }

  async function saveToken() {
    setSavingToken(true)
    setTokenMsg(null)
    const ok = await saveSetting('hospitable_token', token)
    setTokenMsg(ok ? { type: 'ok', text: 'Token saved.' } : { type: 'err', text: 'Save failed.' })
    if (ok) { setToken(''); load() }
    setSavingToken(false)
  }

  async function syncHospitable() {
    setSyncingHosp(true)
    setHospSyncMsg(null)
    const res  = await fetch('/api/sync', { method: 'POST' })
    const data = await res.json()
    setHospSyncMsg({ type: res.ok ? 'ok' : 'err', text: data.message ?? data.error ?? 'Error' })
    setSyncingHosp(false)
  }

  async function saveSheetId() {
    setSavingSheet(true)
    setSheetMsg(null)
    const ok = await saveSetting('google_sheet_id', sheetId.trim())
    setSheetMsg(ok ? { type: 'ok', text: 'Sheet ID saved.' } : { type: 'err', text: 'Save failed.' })
    if (ok) load()
    setSavingSheet(false)
  }

  async function syncSheets() {
    setSyncingSheets(true)
    setSheetsSyncMsg(null)
    const res  = await fetch('/api/sync-sheets', { method: 'POST' })
    const data = await res.json()
    setSheetsSyncMsg(data)
    setSyncingSheets(false)
  }

  async function saveMortgage() {
    setSavingMortgage(true)
    setMortgageMsg(null)
    const res = await fetch('/api/properties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mortgage_pi:     parseFloat(mortgagePi),
        mortgage_escrow: parseFloat(mortgageEscrow),
      }),
    })
    setMortgageMsg(res.ok
      ? { type: 'ok', text: 'Mortgage split saved.' }
      : { type: 'err', text: (await res.json()).error ?? 'Save failed' }
    )
    setSavingMortgage(false)
  }

  const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure integrations and property details</p>
      </div>

      {/* ── Hospitable ── */}
      <Card>
        <CardHeader><CardTitle>Hospitable API</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <StatusLine ok={tokenConfigured} okText="Token configured" badText="No token — revenue sync won't work" />

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Personal Access Token (PAT)</label>
            <input
              type="password"
              className={inp}
              placeholder={tokenConfigured ? 'Enter new token to replace…' : 'Paste your Hospitable PAT here'}
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-400">
              Generate at hospitable.com → Account → API. PATs expire ~1 year — update here when needed.
            </p>
          </div>

          <MsgLine msg={tokenMsg} />

          <div className="flex gap-3">
            <button onClick={saveToken} disabled={!token || savingToken}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {savingToken ? 'Saving…' : 'Save Token'}
            </button>
            <button onClick={syncHospitable} disabled={syncingHosp || !tokenConfigured}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${syncingHosp ? 'animate-spin' : ''}`} />
              {syncingHosp ? 'Syncing…' : 'Sync Now'}
            </button>
          </div>
          <MsgLine msg={hospSyncMsg} />
        </CardContent>
      </Card>

      {/* ── Google Sheets ── */}
      <Card>
        <CardHeader><CardTitle>Google Sheets — Expense Sync</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <StatusLine ok={sheetConfigured} okText="Sheet connected" badText="Sheet not configured" />

          {/* Setup instructions */}
          <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs text-blue-800 space-y-1.5">
            <p className="font-semibold text-blue-900 text-sm">One-time setup</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>
                In Google Cloud Console, create a Service Account and enable the Sheets API.{' '}
                <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline">
                  Open Console <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Download the JSON key. Add two env vars to Vercel:
                <code className="block mt-1 ml-4 bg-white px-2 py-1 rounded text-blue-700">
                  GOOGLE_SERVICE_ACCOUNT_EMAIL=…<br/>
                  GOOGLE_PRIVATE_KEY=…
                </code>
              </li>
              <li>
                Share your expense Google Sheet with the service account email
                (Viewer permission is enough).
              </li>
              <li>Paste the Sheet ID below. It&apos;s the long ID in the URL:<br/>
                <code className="ml-4 text-blue-700">
                  docs.google.com/spreadsheets/d/<strong>[SHEET_ID]</strong>/edit
                </code>
              </li>
            </ol>
            <p className="text-blue-700 mt-2">
              The sync discovers all tabs automatically — any tab name containing a 4-digit year
              or the word "expense" / "cost" is pulled. Each daily sync replaces the previous
              sheet data, so edits and new rows in Google Sheets appear automatically.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Google Sheet ID</label>
            <input
              className={inp}
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
              value={sheetId}
              onChange={e => setSheetId(e.target.value)}
            />
          </div>

          <MsgLine msg={sheetMsg} />

          <div className="flex gap-3">
            <button onClick={saveSheetId} disabled={!sheetId.trim() || savingSheet}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {savingSheet ? 'Saving…' : 'Save Sheet ID'}
            </button>
            <button onClick={syncSheets} disabled={syncingSheets || !sheetConfigured}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${syncingSheets ? 'animate-spin' : ''}`} />
              {syncingSheets ? 'Syncing…' : 'Sync Sheets Now'}
            </button>
          </div>

          {/* Sheets sync result */}
          {sheetsSyncMsg && (
            <div className={`rounded-xl px-4 py-3 text-sm ${sheetsSyncMsg.error ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
              {sheetsSyncMsg.error ? (
                sheetsSyncMsg.error
              ) : (
                <>
                  <p className="font-medium">{sheetsSyncMsg.message}</p>
                  {sheetsSyncMsg.flagged ? (
                    <p className="text-xs mt-1 text-amber-700">{sheetsSyncMsg.flagged} rows flagged for review</p>
                  ) : null}
                  {sheetsSyncMsg.tabs && (
                    <p className="text-xs mt-1 text-green-700">Tabs: {sheetsSyncMsg.tabs.join(', ')}</p>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Mortgage split ── */}
      <Card>
        <CardHeader><CardTitle>Mortgage P&amp;I / Escrow Split</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            The actual payment (<strong>$6,592.62/mo</strong>) bundles P&I + escrow. Enter the
            split from your mortgage statement so tax/insurance aren&apos;t double-counted.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">P&amp;I (principal + interest)</label>
              <DollarInput value={mortgagePi} onChange={setMortgagePi} placeholder="4812.75" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Escrow (tax + insurance)</label>
              <DollarInput value={mortgageEscrow} onChange={setMortgageEscrow} placeholder="1779.87" />
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Total = ${(parseFloat(mortgagePi || '0') + parseFloat(mortgageEscrow || '0')).toFixed(2)}/mo
            (should be $6,592.62)
          </p>
          <MsgLine msg={mortgageMsg} />
          <button onClick={saveMortgage} disabled={savingMortgage}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {savingMortgage ? 'Saving…' : 'Save Split'}
          </button>
        </CardContent>
      </Card>

      {/* ── Setup checklist ── */}
      <Card>
        <CardHeader><CardTitle>Setup Checklist</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <CheckItem done={tokenConfigured}   label="Hospitable Personal Access Token" />
            <CheckItem done={sheetConfigured}   label="Google Sheet ID saved (expense spreadsheet)" />
            <CheckItem done={false}             label="GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY in Vercel env" />
            <CheckItem done={false}             label="Mortgage statement: confirm P&I vs escrow split" />
            <CheckItem done={false}             label="Down payment entered in Capital Ledger ($124,500 per underwriting)" />
            <CheckItem done={false}             label="Closing costs entered in Capital Ledger (~$11,000 per underwriting)" />
            <CheckItem done={false}             label="Confirm Hospitable host_payout field (does it include cleaning fee?)" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function StatusLine({ ok, okText, badText }: { ok: boolean; okText: string; badText: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok
        ? <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-green-700">{okText}</span></>
        : <><AlertCircle className="w-4 h-4 text-amber-500" /><span className="text-amber-700">{badText}</span></>
      }
    </div>
  )
}

function MsgLine({ msg }: { msg: { type: 'ok' | 'err'; text: string } | null }) {
  if (!msg) return null
  return <p className={`text-sm ${msg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{msg.text}</p>
}

function DollarInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
      <input
        type="number" step="0.01"
        className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      />
    </div>
  )
}

function CheckItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-start gap-2.5">
      {done
        ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
        : <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
      }
      <span className={done ? 'text-gray-500 line-through' : 'text-gray-700'}>{label}</span>
    </li>
  )
}
