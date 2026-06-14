'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface Setting {
  key: string
  value: string | null
  property_id: string | null
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [token, setToken]  = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]     = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)
  const [mortgagePi, setMortgagePi] = useState('')
  const [mortgageEscrow, setMortgageEscrow] = useState('')
  const [savingMortgage, setSavingMortgage] = useState(false)
  const [mortgageMsg, setMortgageMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  async function load() {
    const res = await fetch('/api/settings')
    const data = await res.json()
    setSettings(Array.isArray(data) ? data : [])

    // Load property mortgage split
    const propRes = await fetch('/api/dashboard')
    if (propRes.ok) {
      const d = await propRes.json()
      if (d.property) {
        setMortgagePi(d.property.mortgage_pi ?? '')
        setMortgageEscrow(d.property.mortgage_escrow ?? '')
      }
    }
  }

  useEffect(() => { load() }, [])

  const tokenConfigured = settings.some(s => s.key === 'hospitable_token' && s.value)

  async function saveToken() {
    setSaving(true)
    setMsg(null)
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'hospitable_token', value: token }),
    })
    const data = await res.json()
    if (res.ok) {
      setMsg({ type: 'ok', text: 'Token saved.' })
      setToken('')
      load()
    } else {
      setMsg({ type: 'err', text: data.error ?? 'Save failed' })
    }
    setSaving(false)
  }

  async function syncNow() {
    setSyncing(true)
    setSyncMsg(null)
    const res = await fetch('/api/sync', { method: 'POST' })
    const data = await res.json()
    setSyncMsg({ type: res.ok ? 'ok' : 'err', text: data.message ?? data.error ?? 'Error' })
    setSyncing(false)
  }

  async function saveMortgage() {
    setSavingMortgage(true)
    setMortgageMsg(null)
    const res = await fetch('/api/properties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mortgage_pi: parseFloat(mortgagePi),
        mortgage_escrow: parseFloat(mortgageEscrow),
      }),
    })
    if (res.ok) {
      setMortgageMsg({ type: 'ok', text: 'Mortgage split saved.' })
    } else {
      const d = await res.json()
      setMortgageMsg({ type: 'err', text: d.error ?? 'Save failed' })
    }
    setSavingMortgage(false)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure integrations and property details</p>
      </div>

      {/* Hospitable token */}
      <Card>
        <CardHeader><CardTitle>Hospitable API</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            {tokenConfigured ? (
              <><CheckCircle className="w-4 h-4 text-green-600" /><span className="text-green-700">Token configured</span></>
            ) : (
              <><AlertCircle className="w-4 h-4 text-amber-500" /><span className="text-amber-700">No token set — revenue sync won&apos;t work</span></>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Personal Access Token (PAT)
            </label>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={tokenConfigured ? 'Enter new token to replace…' : 'Paste your Hospitable PAT here'}
              value={token}
              onChange={e => setToken(e.target.value)}
            />
            <p className="mt-1 text-xs text-gray-400">
              Generate at hospitable.com → Account → API. PATs expire ~1 year — update here when it does.
            </p>
          </div>

          {msg && (
            <p className={`text-sm ${msg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{msg.text}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={saveToken}
              disabled={!token || saving}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Token'}
            </button>
            <button
              onClick={syncNow}
              disabled={syncing || !tokenConfigured}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing…' : 'Sync Now'}
            </button>
          </div>

          {syncMsg && (
            <p className={`text-sm ${syncMsg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>{syncMsg.text}</p>
          )}
        </CardContent>
      </Card>

      {/* Mortgage P&I / Escrow split */}
      <Card>
        <CardHeader><CardTitle>Mortgage P&amp;I / Escrow Split</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            The actual mortgage payment (<strong>$6,592.62/mo</strong>) bundles P&I + escrow (property tax + insurance).
            Enter the split from your mortgage statement so we don&apos;t double-count tax/insurance in operating expenses.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">P&amp;I (principal + interest)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mortgagePi}
                  onChange={e => setMortgagePi(e.target.value)}
                  placeholder="4812.75"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Escrow (tax + insurance)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={mortgageEscrow}
                  onChange={e => setMortgageEscrow(e.target.value)}
                  placeholder="1779.87"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Total = ${(parseFloat(mortgagePi || '0') + parseFloat(mortgageEscrow || '0')).toFixed(2)}/mo (should be $6,592.62).
            The escrow portion is reclassified as operating expenses automatically.
          </p>

          {mortgageMsg && (
            <p className={`text-sm ${mortgageMsg.type === 'ok' ? 'text-green-700' : 'text-red-600'}`}>
              {mortgageMsg.text}
            </p>
          )}

          <button
            onClick={saveMortgage}
            disabled={savingMortgage}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {savingMortgage ? 'Saving…' : 'Save Split'}
          </button>
        </CardContent>
      </Card>

      {/* What owner needs to provide */}
      <Card>
        <CardHeader><CardTitle>Setup Checklist</CardTitle></CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <CheckItem done={tokenConfigured} label="Hospitable Personal Access Token" />
            <CheckItem done={false} label="Mortgage statement: confirm P&I vs escrow split ($4,812.75 / $1,779.87 est.)" />
            <CheckItem done={false} label="2025 cost spreadsheet imported" />
            <CheckItem done={false} label="2026 cost spreadsheet imported" />
            <CheckItem done={false} label="Down payment entered in Capital Ledger ($124,500 per underwriting)" />
            <CheckItem done={false} label="Closing costs entered in Capital Ledger (~$11,000 per underwriting)" />
            <CheckItem done={false} label="Confirm Hospitable host_payout field (does it include cleaning fee?)" />
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function CheckItem({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-start gap-2.5">
      {done ? (
        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5" />
      )}
      <span className={done ? 'text-gray-500 line-through' : 'text-gray-700'}>{label}</span>
    </li>
  )
}
