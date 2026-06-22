'use client'

import { useState, useEffect } from 'react'
import { fmt$ } from '@/lib/calculations'
import { UNDERWRITING_TOTAL_INVESTED } from '@/lib/calculations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2 } from 'lucide-react'

type ContribType = 'down_payment' | 'closing_costs' | 'buildout' | 'other'

interface Contribution {
  id: string
  date: string
  amount: number
  type: ContribType
  notes: string | null
  source: 'manual' | 'expense_sync'
}

const TYPE_LABELS: Record<ContribType, string> = {
  down_payment:  'Down Payment',
  closing_costs: 'Closing Costs',
  buildout:      'Buildout / Setup',
  other:         'Other',
}

const TYPE_VARIANT: Record<ContribType, 'info' | 'success' | 'warning' | 'neutral'> = {
  down_payment:  'info',
  closing_costs: 'warning',
  buildout:      'success',
  other:         'neutral',
}

export default function CapitalPage() {
  const [contribs, setContribs] = useState<Contribution[]>([])
  const [buildoutExpenses, setBuildoutExpenses] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Contribution | null>(null)
  const [form, setForm] = useState<Partial<Contribution>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const [capRes, expRes] = await Promise.all([
      fetch('/api/capital'),
      fetch('/api/expenses?bucket=buildout'),
    ])
    const capData = await capRes.json()
    const expData = await expRes.json()
    setContribs(Array.isArray(capData) ? capData : [])
    if (Array.isArray(expData)) {
      setBuildoutExpenses(expData.reduce((s: number, e: { amount: number }) => s + (e.amount ?? 0), 0))
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm({ date: new Date().toISOString().split('T')[0], type: 'other' })
    setShowForm(true)
  }

  function openEdit(c: Contribution) {
    setEditing(c)
    setForm(c)
    setShowForm(true)
  }

  async function save() {
    setSaving(true)
    setError('')
    try {
      const method = editing ? 'PUT' : 'POST'
      const body = editing ? { ...form, id: editing.id } : form
      const res = await fetch('/api/capital', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Save failed')
        return
      }
      setShowForm(false)
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm('Remove this entry?')) return
    await fetch('/api/capital', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  const capitalTotal = contribs.reduce((s, c) => s + (c.amount ?? 0), 0)
  const totalInvested = capitalTotal + buildoutExpenses

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Capital Contributions</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Tracks Total Invested Capital for the ROI / break-even tracker
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </div>

      {/* Total invested summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Capital Ledger</div>
            <div className="text-xl font-bold text-gray-900">{fmt$(capitalTotal)}</div>
            <div className="text-xs text-gray-400 mt-1">Down payment, closing costs, etc.</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Buildout Expenses</div>
            <div className="text-xl font-bold text-gray-900">{fmt$(buildoutExpenses)}</div>
            <div className="text-xs text-gray-400 mt-1">From expense sheet (buildout bucket)</div>
          </CardContent>
        </Card>
        <Card className="ring-2 ring-blue-500 ring-offset-1">
          <CardContent className="py-4">
            <div className="text-xs text-blue-600 uppercase tracking-wide mb-1 font-semibold">Total Invested Capital</div>
            <div className="text-xl font-bold text-gray-900">{fmt$(totalInvested)}</div>
            <div className="text-xs text-gray-400 mt-1">
              Underwriting estimate: {fmt$(UNDERWRITING_TOTAL_INVESTED)}
              {' '}
              <span className={totalInvested > UNDERWRITING_TOTAL_INVESTED ? 'text-red-500' : 'text-green-600'}>
                ({totalInvested > UNDERWRITING_TOTAL_INVESTED ? '+' : ''}{fmt$(totalInvested - UNDERWRITING_TOTAL_INVESTED)})
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding items needed */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-800">
        <p className="font-medium mb-1">Owner action needed</p>
        <ul className="space-y-1 text-blue-700 list-disc list-inside text-xs">
          <li>Enter down payment ({fmt$(124500)} per underwriting) if not already in the expense sheets</li>
          <li>Enter closing costs (~{fmt$(11000)} per underwriting)</li>
          <li>Provide mortgage statement to confirm P&I vs escrow split ($4,812.75 / $1,779.87 est.)</li>
        </ul>
      </div>

      {/* Contributions ledger */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Capital Ledger</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-10 text-center text-gray-400 text-sm">Loading…</div>
          ) : contribs.length === 0 ? (
            <div className="py-10 text-center text-gray-400 text-sm">
              No entries yet. Add your down payment and closing costs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-right px-4 py-3 font-medium">Amount</th>
                    <th className="text-left px-4 py-3 font-medium">Notes</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contribs.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{c.date}</td>
                      <td className="px-4 py-2.5">
                        <Badge variant={TYPE_VARIANT[c.type]}>{TYPE_LABELS[c.type]}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-gray-800">
                        {fmt$(c.amount)}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs">{c.notes ?? ''}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <button onClick={() => openEdit(c)} className="p-1 text-gray-400 hover:text-gray-700">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => remove(c.id)} className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editing ? 'Edit Entry' : 'Add Capital Contribution'}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input type="date" className={inp} value={form.date ?? ''} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Amount</label>
                  <input type="number" step="0.01" className={inp} value={form.amount ?? ''} onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) }))} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                  <select className={inp} value={form.type ?? 'other'} onChange={e => setForm(f => ({ ...f, type: e.target.value as ContribType }))}>
                    <option value="down_payment">Down Payment</option>
                    <option value="closing_costs">Closing Costs</option>
                    <option value="buildout">Buildout / Setup</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
                <input className={inp} value={form.notes ?? ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={save} disabled={saving} className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inp = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
