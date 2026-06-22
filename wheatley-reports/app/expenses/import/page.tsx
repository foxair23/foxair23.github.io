'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Upload, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clsx } from 'clsx'

interface ImportResult {
  imported: number
  flagged: number
  warnings: string[]
  batchId: string
}

export default function ImportPage() {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) setFile(f)
  }

  async function handleImport() {
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)

    const fd = new FormData()
    fd.append('file', file)

    try {
      const res = await fetch('/api/expenses/import', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Import failed')
      } else {
        setResult(data)
      }
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/expenses" className="text-gray-400 hover:text-gray-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Import Expenses</h1>
          <p className="text-sm text-gray-500 mt-0.5">Upload your 2025 or 2026 cost spreadsheet (CSV or XLSX)</p>
        </div>
      </div>

      <Card>
        <CardContent className="py-6">
          {/* Drop zone */}
          <div
            className={clsx(
              'border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors',
              dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300',
              file && 'border-green-400 bg-green-50'
            )}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={e => setFile(e.target.files?.[0] ?? null)}
            />
            <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
            {file ? (
              <div>
                <p className="font-medium text-gray-800">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">{(file.size / 1024).toFixed(0)} KB · Click to change</p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-gray-700">Drop your CSV or XLSX here</p>
                <p className="text-sm text-gray-400 mt-1">or click to browse</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-5 bg-gray-50 rounded-xl px-5 py-4 text-sm text-gray-600 space-y-1.5">
            <p className="font-medium text-gray-700 mb-2">Expected columns</p>
            <p><code className="text-xs bg-white px-1 rounded">Date</code>, <code className="text-xs bg-white px-1 rounded">Amount</code>, <code className="text-xs bg-white px-1 rounded">Category</code>, <code className="text-xs bg-white px-1 rounded">Subcategory</code>, <code className="text-xs bg-white px-1 rounded">Notes</code>, <code className="text-xs bg-white px-1 rounded">Vendor</code>, <code className="text-xs bg-white px-1 rounded">Expect to incur again within 10 years?</code></p>
            <ul className="mt-2 space-y-1 text-gray-500 text-xs list-disc list-inside">
              <li>Both 2025 and 2026 sheets are supported (minor column differences tolerated)</li>
              <li>Negative amounts (refunds) are kept with their sign</li>
              <li>Rows with missing amounts are flagged for review, not dropped</li>
              <li>Bold/markdown formatting in category names is stripped automatically</li>
              <li>Import is additive — running it twice creates duplicates; remove the old batch first if re-importing</li>
            </ul>
          </div>

          <button
            onClick={handleImport}
            disabled={!file || loading}
            className="mt-5 w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Importing…' : 'Import'}
          </button>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Success */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Import complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-50 rounded-lg px-4 py-3">
                <div className="text-2xl font-bold text-green-700">{result.imported}</div>
                <div className="text-xs text-green-600">rows imported</div>
              </div>
              <div className="bg-amber-50 rounded-lg px-4 py-3">
                <div className="text-2xl font-bold text-amber-700">{result.flagged}</div>
                <div className="text-xs text-amber-600">flagged for review</div>
              </div>
            </div>

            {result.warnings.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Warnings ({result.warnings.length})</p>
                <div className="bg-amber-50 rounded-lg px-4 py-3 space-y-1 max-h-40 overflow-y-auto">
                  {result.warnings.map((w, i) => (
                    <p key={i} className="text-xs text-amber-800">{w}</p>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/expenses"
              className="mt-4 block text-center text-sm text-blue-600 hover:underline"
            >
              View expenses →
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
