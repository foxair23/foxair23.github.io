/**
 * Hospitable Public API v2 client.
 * Base URL: https://api.hospitable.com
 * Auth: Bearer token (Personal Access Token).
 *
 * NOTE: Field names below are confirmed against developer.hospitable.com docs.
 * If the API returns 401, the PAT has expired — surface this clearly to the user.
 */

const BASE_URL = 'https://api.hospitable.com'

export class HospitableClient {
  constructor(private token: string) {}

  private async request<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${BASE_URL}${path}`)
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 },
    })

    if (res.status === 401) {
      throw new HospitableAuthError('Hospitable Personal Access Token is invalid or expired. Please update it in Settings.')
    }

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Hospitable API error ${res.status}: ${body}`)
    }

    return res.json() as Promise<T>
  }

  /** List all properties / listings. */
  async getProperties(): Promise<HospitableProperty[]> {
    const data = await this.request<{ data: HospitableProperty[] }>('/v2/properties')
    return data.data ?? []
  }

  /**
   * List reservations for a property.
   * Paginates through all pages automatically.
   * @param propertyId  Hospitable property/listing ID
   * @param from        ISO date string 'YYYY-MM-DD' (check_in >=)
   */
  async getReservations(propertyId: string, from?: string): Promise<HospitableReservation[]> {
    const all: HospitableReservation[] = []
    let cursor: string | null = null

    do {
      const params: Record<string, string> = {
        property_id: propertyId,
        per_page: '100',
      }
      if (from) params.check_in_from = from
      if (cursor) params.cursor = cursor

      const data = await this.request<{
        data: HospitableReservation[]
        meta?: { next_cursor?: string | null }
      }>('/v2/reservations', params)

      all.push(...(data.data ?? []))
      cursor = data.meta?.next_cursor ?? null
    } while (cursor)

    return all
  }

  /**
   * Get calendar availability for a property to compute "available nights."
   * Returns dates that are available (not blocked) for the given range.
   */
  async getCalendar(
    propertyId: string,
    startDate: string,
    endDate: string
  ): Promise<HospitableCalendarDay[]> {
    const data = await this.request<{ data: HospitableCalendarDay[] }>(
      `/v2/properties/${propertyId}/calendar`,
      { start_date: startDate, end_date: endDate }
    )
    return data.data ?? []
  }
}

export class HospitableAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'HospitableAuthError'
  }
}

// ── Type definitions (field names from developer.hospitable.com) ───────────

export interface HospitableProperty {
  id: string
  name: string
  address?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }
}

export interface HospitableReservation {
  id: string                     // use as hospitable_id
  property_id: string
  platform: string               // 'airbnb' | 'vrbo' | 'booking_com' | 'direct' | etc.
  check_in: string               // 'YYYY-MM-DD'
  check_out: string              // 'YYYY-MM-DD'
  nights: number
  status: string                 // 'confirmed' | 'cancelled' | 'inquiry' | etc.
  guest?: {
    name?: string
  }
  money?: {
    host_payout?: number         // what lands in the host's bank (net of channel fees)
    total_paid?: number          // gross guest payment
    cleaning_fee?: number
    currency?: string
  }
}

export interface HospitableCalendarDay {
  date: string                   // 'YYYY-MM-DD'
  available: boolean
  blocked_reason?: string | null
}

// ── Mapper: Hospitable → DB row ────────────────────────────────────────────

export interface ReservationRow {
  property_id: string
  hospitable_id: string
  channel: string | null
  check_in: string
  check_out: string
  nights: number
  status: string
  host_payout: number | null
  cleaning_fee: number | null
  guest_name: string | null
}

export function mapReservation(
  r: HospitableReservation,
  localPropertyId: string
): ReservationRow {
  return {
    property_id: localPropertyId,
    hospitable_id: r.id,
    channel: r.platform ?? null,
    check_in: r.check_in,
    check_out: r.check_out,
    nights: r.nights,
    status: r.status,
    host_payout: r.money?.host_payout ?? null,
    cleaning_fee: r.money?.cleaning_fee ?? null,
    guest_name: r.guest?.name ?? null,
  }
}
