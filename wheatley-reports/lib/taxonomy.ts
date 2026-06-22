/** Reference taxonomy for auto-classifying imported expense rows. */

export type Bucket = 'operating' | 'buildout' | 'debt_service'

export interface TaxonomyEntry {
  subcategory: string
  parentCategory: string
  defaultBucket: Bucket
  taxDeductible: boolean | null
}

export const TAXONOMY: TaxonomyEntry[] = [
  { subcategory: 'Maintenance & Repairs',                          parentCategory: 'Property Operations',  defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Cleaning & Turnover',                            parentCategory: 'Property Operations',  defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Utility Contracts (pool/pest/landscape)',         parentCategory: 'Recurring Services',   defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Essential Utilities',                            parentCategory: 'Utilities & Services', defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Internet & Media',                               parentCategory: 'Utilities & Services', defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Consumables & Supplies',                         parentCategory: 'Guest Amenities',      defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Platform Fees & Commissions',                    parentCategory: 'Marketing & Bookings', defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Insurance',                                      parentCategory: 'Financial & Legal',    defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Property Taxes & Fees (incl. TOT/TBID, STR permit)', parentCategory: 'Financial & Legal', defaultBucket: 'operating', taxDeductible: true },
  { subcategory: 'Management Fees',                                parentCategory: 'Management',           defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Transportation / Meals / Lodging / Admin',       parentCategory: 'Owner Travel & Admin', defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Taxes (LLC, state)',                             parentCategory: 'Taxes',                defaultBucket: 'operating',     taxDeductible: true },
  { subcategory: 'Mortgage',                                       parentCategory: 'Mortgage',             defaultBucket: 'debt_service',  taxDeductible: null },
  { subcategory: 'Major Construction/Remodel',                     parentCategory: 'Capital Improvements', defaultBucket: 'buildout',      taxDeductible: false },
  { subcategory: 'Property Upgrades',                              parentCategory: 'Capital Improvements', defaultBucket: 'buildout',      taxDeductible: false },
  { subcategory: 'Interior Design/Consulting',                     parentCategory: 'Design & Staging',     defaultBucket: 'buildout',      taxDeductible: true },
  { subcategory: 'Furniture & Decor',                              parentCategory: 'Design & Staging',     defaultBucket: 'buildout',      taxDeductible: null },
]

// Category names that always map to buildout
const BUILDOUT_CATEGORIES = new Set(['Capital Improvements', 'Design & Staging', 'Major Construction'])

// Subcategory patterns → bucket overrides
const DEBT_SERVICE_PATTERNS = [/mortgage/i, /guild\s*mortgage/i]

export function inferBucket(
  category: string,
  subcategory: string | null,
  recurringAnswer: string | null
): Bucket {
  // Explicit debt-service signals
  const cat = (category ?? '').toLowerCase()
  const sub = (subcategory ?? '').toLowerCase()
  if (DEBT_SERVICE_PATTERNS.some(p => p.test(cat) || p.test(sub))) return 'debt_service'
  if (cat === 'mortgage' || sub === 'mortgage') return 'debt_service'

  // Category backstop for buildout
  if (BUILDOUT_CATEGORIES.has(category)) return 'buildout'
  if (BUILDOUT_CATEGORIES.has(subcategory ?? '')) return 'buildout'

  // Use the "expect to incur again" field
  if (recurringAnswer != null) {
    const answer = recurringAnswer.toLowerCase().trim()
    if (answer === 'no' || answer === 'n' || answer === 'false') return 'buildout'
    if (answer === 'yes' || answer === 'y' || answer === 'true') return 'operating'
  }

  // Look up taxonomy
  const entry = TAXONOMY.find(t =>
    t.subcategory.toLowerCase() === sub ||
    t.parentCategory.toLowerCase() === cat
  )
  if (entry) return entry.defaultBucket

  return 'operating' // safe default
}

export function normalizeCategoryText(text: string): string {
  // Strip markdown bold artifacts like **Category**
  return text.replace(/\*\*/g, '').trim()
}

export function findTaxonomyEntry(category: string, subcategory: string | null): TaxonomyEntry | undefined {
  const normCat = normalizeCategoryText(category).toLowerCase()
  const normSub = normalizeCategoryText(subcategory ?? '').toLowerCase()

  return TAXONOMY.find(t => {
    const tCat = t.parentCategory.toLowerCase()
    const tSub = t.subcategory.toLowerCase()
    if (normSub && tSub === normSub) return true
    if (!normSub && tCat === normCat) return true
    return false
  })
}
