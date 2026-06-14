/**
 * Parses CSV / XLSX expense spreadsheets and normalises rows for import.
 * Handles 2025 and 2026 sheets with minor column variations.
 */

import * as XLSX from 'xlsx'
import { parse as dateParse } from 'date-fns'
import { inferBucket, normalizeCategoryText, findTaxonomyEntry, Bucket } from './taxonomy'

export interface RawExpenseRow {
  date: string | null
  amount: number | null
  category: string | null
  subcategory: string | null
  notes: string | null
  vendor: string | null
  replacingExisting: string | null
  recurringAnswer: string | null
  flagForReview: boolean
  parseWarnings: string[]
}

export interface ParsedExpense {
  date: string             // ISO 'YYYY-MM-DD'
  amount: number
  category: string
  subcategory: string | null
  vendor: string | null
  notes: string | null
  bucket: Bucket
  is_recurring: boolean
  tax_deductible: boolean | null
  source: 'import'
  flag_for_review: boolean
  _warnings: string[]
}

// Flexible column name aliases (handles renamed columns between 2025/2026 sheets)
const COL_ALIASES: Record<string, string[]> = {
  date:       ['Date', 'date', 'DATE'],
  amount:     ['Amount', 'amount', 'AMOUNT', 'Cost', 'cost'],
  category:   ['Category', 'category', 'CATEGORY'],
  subcategory: ['Subcategory', 'subcategory', 'Sub Category', 'Sub-Category'],
  notes:      ['Notes', 'notes', 'NOTES', 'Description', 'description'],
  vendor:     ['Vendor', 'vendor', 'VENDOR', 'Payee', 'payee'],
  replacingExisting: ['Replacing existing asset?', 'Replacing Existing Asset?', 'Replacing existing asset', 'Replace existing'],
  recurringAnswer: [
    'Expect to incur the expense again within next 10 years?',
    'Expect to incur again within 10 years?',
    'Recurring?',
    'Recurring',
    'recurring',
    'Will Recur',
  ],
}

function findCol(headers: string[], field: string): string | null {
  const aliases = COL_ALIASES[field] ?? [field]
  const normalized = headers.map(h => h?.toString().trim())
  for (const alias of aliases) {
    const idx = normalized.findIndex(h => h?.toLowerCase() === alias.toLowerCase())
    if (idx !== -1) return headers[idx]
  }
  return null
}

function parseDate(raw: string | number | null | undefined): string | null {
  if (raw == null || raw === '') return null

  // Excel serial date number
  if (typeof raw === 'number') {
    const date = XLSX.SSF.parse_date_code(raw)
    if (date) {
      const d = new Date(Date.UTC(date.y, date.m - 1, date.d))
      return d.toISOString().split('T')[0]
    }
  }

  const str = String(raw).trim()
  // Try common formats
  const formats = ['M/d/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'M-d-yyyy', 'd/M/yyyy']
  for (const fmt of formats) {
    try {
      const parsed = dateParse(str, fmt, new Date())
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0]
      }
    } catch { /* try next */ }
  }
  return null
}

function parseAmount(raw: string | number | null | undefined): number | null {
  if (raw == null || raw === '') return null
  if (typeof raw === 'number') return raw

  const str = String(raw).replace(/[$,\s]/g, '')
  const n = parseFloat(str)
  return isNaN(n) ? null : n
}

export function parseExpenseFile(buffer: ArrayBuffer, batchId: string): ParsedExpense[] {
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: false })
  const results: ParsedExpense[] = []

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName]
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: null,
      raw: true,
    })

    if (rows.length === 0) continue

    const headers = Object.keys(rows[0])

    const colDate    = findCol(headers, 'date')
    const colAmount  = findCol(headers, 'amount')
    const colCat     = findCol(headers, 'category')
    const colSub     = findCol(headers, 'subcategory')
    const colNotes   = findCol(headers, 'notes')
    const colVendor  = findCol(headers, 'vendor')
    const colRecurr  = findCol(headers, 'recurringAnswer')

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const warnings: string[] = []

      const rawDate   = colDate   ? row[colDate]   : null
      const rawAmount = colAmount ? row[colAmount]  : null
      const rawCat    = colCat    ? row[colCat]     : null
      const rawSub    = colSub    ? row[colSub]     : null
      const rawNotes  = colNotes  ? row[colNotes]   : null
      const rawVendor = colVendor ? row[colVendor]  : null
      const rawRecurr = colRecurr ? row[colRecurr]  : null

      // Skip completely blank rows
      if (!rawDate && !rawAmount && !rawCat) continue

      const dateStr = parseDate(rawDate as string | number)
      if (!dateStr) {
        warnings.push(`Row ${i + 2} (${sheetName}): unparseable date "${rawDate}"`)
      }

      const amount = parseAmount(rawAmount as string | number)
      let flagForReview = false
      if (amount == null) {
        warnings.push(`Row ${i + 2} (${sheetName}): blank or invalid amount — flagged for review`)
        flagForReview = true
      }

      const category    = normalizeCategoryText(String(rawCat ?? '').trim() || 'Uncategorized')
      const subcategory = rawSub ? normalizeCategoryText(String(rawSub).trim()) : null
      const vendor      = rawVendor ? String(rawVendor).trim() : null
      const notes       = rawNotes  ? String(rawNotes).trim()  : null
      const recurringStr = rawRecurr ? String(rawRecurr).trim() : null

      const bucket = inferBucket(category, subcategory, recurringStr)
      const isRecurring = bucket === 'operating'

      const taxEntry = findTaxonomyEntry(category, subcategory)

      const parsed: ParsedExpense = {
        date: dateStr ?? '1900-01-01',
        amount: amount ?? 0,
        category,
        subcategory,
        vendor,
        notes,
        bucket,
        is_recurring: isRecurring,
        tax_deductible: taxEntry?.taxDeductible ?? null,
        source: 'import',
        flag_for_review: flagForReview || !dateStr,
        _warnings: warnings,
      }

      results.push(parsed)
    }
  }

  return results
}
