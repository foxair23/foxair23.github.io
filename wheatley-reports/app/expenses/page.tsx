'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { fmt$ } from '@/lib/calculations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

type Bucket = 'operating' | 'buildout' | 'debt_service'

interface Expense {
  id: string
  date: string
  amount: number
  category: string
  subcategory: string | null
  vendor: string | null
  notes: string | null
  bucket: Bucket
  is_recurring: boolean
  tax_deductible: boolean | null
  flag_for_review: boolean
  source: 'import' | 'manual'
}

const BUCKET_LABELS: Record<Bucket, string> = {
  operating:    'Operating',
  buildout:     'Buildout',
  debt_service: 'Mortgage',
}

const BUCKET_VARIANT: Record<Bucket, 'success' | 'info' | 'warning'> = {
  operating:    'success',
  buildout:     'info',
  debt_service: 'warning',
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [bucketFilter, setBucketFilter] = useState<Bucket | ''>('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)
  const [form, setForm] = useState<Partial<Expense>>({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (bucketFilter) params.set('bucket', bucketFilter)
    const res = await fetch(`/api/expenses?${params}`)
    const data = await res.json()
    setExpenses(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [bucketFilter]) // eslint-disable-line

  function openNew() {
    setEditing(null)
    setForm({ date: new Date().toISOString().split('T')[0], bucket: 'operating', is_recurring: true, source: 'manual' })
    setShowForm(true)
  }

  function openEdit(e: Expense) {
    setEditing(e)
    setForm(e)
    setShowForm(true)
  }

  async function saveExpense() {
    setSaving(true)
    setError('')
    try {
      const method = editing ? 'PUT' : 'POST'
      const body = editing ? { ...form, id: editing.id } : form
      const res = await fetch('/api/expenses', {
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

  async function deleteExpense(id: string) {
    if (!confirm('Delete this expense?')) return
    await fetch('/api/expenses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  const byBucket = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.bucket] = (acc[e.bucket] ?? 0) + e.amount
    return acc
  }, {})

  const flagged = expenses.filter(e => e.flag_for_review)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-0.5">{expenses.length} records</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/expenses/import"
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4" /> Import CSV/XLSX
          </Link>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      {/* Bucket summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {(Object.keys(BUCKET_LABELS) as Bucket[]).map(b => (
          <Card key={b} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setBucketFilter(bucketFilter === b ? '' : b)}>
            <CardContent className="py-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{BUCKET_LABELS[b]}</div>
              <div className="text-xl font-bold text-gray-900">{fmt$(byBucket[b] ?? 0)}</div>
              {bucketFilter === b && <div className="mt-1 text-xs text-blue-600">● filtered</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flagged warnings */}
      {flagged.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {flagged.length} expense{flagged.length !== 1 ? 's' : ''} flagged for review (missing date or amount)
        </div>
      )}

      {/* Expense table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {bucketFilter ? `${BUCKET_LABELS[bucketFilter]} expenses` : 'All expenses'}
          </CardTitle>
          {bucketFilter && (
            <button onClick={() => setBucketFilter('')} className="text-xs text-blue-600 hover:underline">
              Clear filter
            </button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 text-center text-gray-400 text-sm">Loading…</div>
          ) : expenses.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-sm">
              No expenses yet. Import a CSV/XLSX or add one manually.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                    <th className="text-left px-4 py-3 font-medium">Category</th>
                    <th className="text-left px-4 py-3 font-medium">Vendor</th>
                    <th className="text-right px-4 py-3 font-medium">Amount</th>
                    <th className="text-left px-4 py-3 font-medium">Bucket</th>
                    <th className="text-left px-4 py-3 font-medium">Notes</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {expenses.map(e => (
                    <tr key={e.id} className={clsx('hover:bg-gray-50 transition-colors', e.flag_for_review && 'bg-amber-50')}>
                      <td className="px-4 py-2.5 font-mono text-xs text-gray-600">{e.date}</td>
                      <td className="px-4 py-2.5">
                        <div className="font-medium text-gray-800">{e.category}</div>
                        {e.subcategory && <div className="text-xs text-gray-400">{e.subcategory}</div>}
                      </td>
                      <td className="px-4 py-2.5 text-gray-500">{e.vendor ?? '—'}</td>
                      <td className={clsx('px-4 py-2.5 text-right tabular-nums font-medium', e.amount < 0 ? 'text-green-600' : 'text-gray-800')}>
                        {fmt$(e.amount)}
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge variant={BUCKET_VARIANT[e.bucket]}>{BUCKET_LABELS[e.bucket]}</Badge>
                      </td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs max-w-xs truncate">{e.notes ?? ''}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <button onClick={() => openEdit(e)} className="p-1 text-gray-400 hover:text-gray-700 transition-colors">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => deleteExpense(e.id)} className="p-1 text-gray-400 hover:text-red-600 transition-colors">
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editing ? 'Edit Expense' : 'Add Expense'}
            </h2>
            <div className="space-y-3">
              <Field label="Date">
                <input type="date" className={input} value={form.date ?? ''} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Amount">
                  <input type="number" step="0.01" className={input} value={form.amount ?? ''} onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) }))} />
                </Field>
                <Field label="Bucket">
                  <select className={input} value={form.bucket ?? 'operating'} onChange={e => setForm(f => ({ ...f, bucket: e.target.value as Bucket }))}>
                    <option value="operating">Operating</option>
                    <option value="buildout">Buildout</option>
                    <option value="debt_service">Mortgage</option>
                  </select>
                </Field>
              </div>
              <Field label="Category">
                <input className={input} value={form.category ?? ''} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Subcategory">
                  <input className={input} value={form.subcategory ?? ''} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))} />
                </Field>
                <Field label="Vendor">
                  <input className={input} value={form.vendor ?? ''} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} />
                </Field>
              </div>
              <Field label="Notes">
                <input className={input} value={form.notes ?? ''} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </Field>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={saveExpense} disabled={saving} className="flex-1 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}
