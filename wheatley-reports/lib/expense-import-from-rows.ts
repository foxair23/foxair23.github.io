/**
 * Shared row-to-expense converter used by both the XLSX importer and
 * the Google Sheets sync. Accepts rows already converted to key-value objects
 * so both sources use identical parsing/bucketing logic.
 */

import { parse as dateParse } from 'date-fns'
import { inferBucket, normalizeCategoryText, findTaxonomyEntry, Bucket } from './taxonomy'

export interface ExpenseRowInput {
  Date?: string | null
  Amount?: string | null
  Category?: string | null
  Subcategory?: string | null
  Notes?: string | null
  Vendor?: string | null
  'Replacing existing asset?'?: string | null
  'Expect to incur the expense again within next 10 years?'?: string | null
  'Expect to incur again within 10 years?'?: string | null
  [key: string]: string | null | undefined  // tolerate extra columns
}

export interface ParsedExpense {
  date: string
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

function parseDate(raw: string | null | undefined): string | null {
  if (!raw) return null
  const str = raw.trim()
  const formats = ['M/d/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'M-d-yyyy', 'd/M/yyyy']
  for (const fmt of formats) {
    try {
      const parsed = dateParse(str, fmt, new Date())
      if (!isNaN(parsed.getTime())) return parsed.toISOString().split('T')[0]
    } catch { /* try next */ }
  }
  return null
}

function parseAmount(raw: string | null | undefined): number | null {
  if (!raw) return null
  const str = raw.replace(/[$,\s]/g, '')
  const n = parseFloat(str)
  return isNaN(n) ? null : n
}

// Finds the "expect to recur" column regardless of exact header spelling
function getRecurring(row: ExpenseRowInput): string | null {
  return (
    row['Expect to incur the expense again within next 10 years?'] ??
    row['Expect to incur again within 10 years?'] ??
    row['Recurring?'] ??
    row['Recurring'] ??
    null
  )
}

export function parseExpenseRows(
  rows: Record<string, string | null>[],
  rowOffset = 2  // for warning row numbers (spreadsheet row = offset + i)
): ParsedExpense[] {
  const results: ParsedExpense[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] as ExpenseRowInput
    const warnings: string[] = []

    const rawDate    = row.Date
    const rawAmount  = row.Amount
    const rawCat     = row.Category
    const rawSub     = row.Subcategory
    const rawNotes   = row.Notes
    const rawVendor  = row.Vendor
    const rawRecurr  = getRecurring(row)

    // Skip blank rows
    if (!rawDate && !rawAmount && !rawCat) continue

    const dateStr = parseDate(rawDate)
    if (!dateStr) {
      warnings.push(`Row ${rowOffset + i}: unparseable date "${rawDate}"`)
    }

    const amount = parseAmount(rawAmount)
    let flagForReview = false
    if (amount == null) {
      warnings.push(`Row ${rowOffset + i}: blank or invalid amount — flagged for review`)
      flagForReview = true
    }

    const category    = normalizeCategoryText(String(rawCat ?? '').trim() || 'Uncategorized')
    const subcategory = rawSub ? normalizeCategoryText(rawSub.trim()) : null
    const vendor      = rawVendor?.trim() || null
    const notes       = rawNotes?.trim()  || null

    const bucket      = inferBucket(category, subcategory, rawRecurr)
    const isRecurring = bucket === 'operating'
    const taxEntry    = findTaxonomyEntry(category, subcategory)

    results.push({
      date:           dateStr ?? '1900-01-01',
      amount:         amount ?? 0,
      category,
      subcategory,
      vendor,
      notes,
      bucket,
      is_recurring:   isRecurring,
      tax_deductible: taxEntry?.taxDeductible ?? null,
      source:         'import',
      flag_for_review: flagForReview || !dateStr,
      _warnings:      warnings,
    })
  }

  return results
}
