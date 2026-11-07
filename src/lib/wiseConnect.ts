import { getSupabase } from '@/lib/supabase'

export interface WiseConnectInquiry {
  name: string
  email: string
  inquiryType: string
  message: string
}

export interface StoredInquiry {
  id: string
  track: string
  values: WiseConnectInquiry
  submittedAt: string
  meta?: { userAgent: string; locale: string }
}

const LOCAL_QUEUE_KEY = 'wiselab:queued-wise-connect'

function queueLocally(payload: unknown) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_QUEUE_KEY) ?? '[]')
    existing.push(payload)
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(existing))
  } catch {
    // localStorage unavailable (private mode, SSR, etc.)
  }
}

/**
 * Submits an inquiry from the homepage WISE Connect contact form.
 * Writes to the `submissions` table (track = 'wise-connect') in Supabase,
 * or queues to localStorage if Supabase is offline/not yet configured.
 */
export async function submitWiseConnectInquiry(inquiry: WiseConnectInquiry): Promise<void> {
  const payload = {
    track: 'wise-connect',
    values: inquiry,
    analytics: { inquiryType: inquiry.inquiryType },
    submitted_at: new Date().toISOString(),
    meta: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      locale: typeof navigator !== 'undefined' ? navigator.language : 'en',
    },
  }

  const supabase = getSupabase()

  if (!supabase) {
    queueLocally(payload)
    return
  }

  const { error } = await supabase.from('submissions').insert({
    track: payload.track,
    values: payload.values,
    analytics: payload.analytics,
    submitted_at: payload.submitted_at,
    meta: payload.meta,
  })

  if (error) throw error
}

/**
 * Fetches all WISE Connect inquiries for the Admin portal, newest first.
 */
export async function listWiseConnectInquiries(): Promise<StoredInquiry[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('track', 'wise-connect')
    .order('submitted_at', { ascending: false })

  if (error || !data) return []

  return data.map((row: any) => ({
    id: row.id,
    track: row.track,
    values: (row.values ?? {}) as WiseConnectInquiry,
    submittedAt: row.submitted_at,
    meta: row.meta,
  }))
}

