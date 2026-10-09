import { getSupabase } from '@/lib/supabase'
import type { SubmissionPayload } from './types'

const LOCAL_QUEUE_KEY = 'wiselab:queued-submissions'

function queueLocally(payload: SubmissionPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_QUEUE_KEY) ?? '[]')
    existing.push(payload)
    localStorage.setItem(LOCAL_QUEUE_KEY, JSON.stringify(existing))
  } catch {
    // localStorage unavailable (private mode, SSR, etc.) — swallow, submission
    // still "succeeds" from the user's point of view since there's no backend
    // to fail against anyway.
  }
}

/**
 * Submits a validated application payload.
 *
 * When Supabase isn't configured (no live project provisioned yet — see
 * TODO_FOR_HUMAN.md), this queues the submission to localStorage and
 * resolves successfully so the form UX still completes end-to-end. Once a
 * project exists and VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set,
 * this writes straight to the `submissions` table (see
 * supabase/migrations/0001_init.sql).
 */
export async function submitApplication(payload: SubmissionPayload): Promise<void> {
  const supabase = getSupabase()

  if (!supabase) {
    queueLocally(payload)
    return
  }

  // If this is the enterprise bootcamp form, insert into the new bootcamp-specific table.
  if (payload.track === 'enterprise') {
    const v = payload.values as Record<string, any>

    if (v.email) {
      const { data: existingApp } = await supabase
        .from('bootcamp_applications')
        .select('id')
        .eq('email', v.email)
        .maybeSingle()

      if (existingApp) {
        throw new Error('An application with this email address has already been submitted.\nاس ای میل ایڈریس سے پہلے ہی درخواست جمع کرائی جا چکی ہے۔')
      }
    }

    const { error: bootcampError } = await supabase.from('bootcamp_applications').insert({
      email: v.email,
      full_name: v.fullName,
      cnic: v.cnic,
      disability_cnic: v.disabilityCnic,
      minority: v.minority,
      dob: v.dob,
      mobile: v.mobile,
      whatsapp: v.whatsapp,
      marital_status: v.maritalStatus,
      education: v.education,
      city_preference: v.cityPreference,
      language: v.language,

      current_district: v.currentDistrict,
      current_address: v.currentAddress,

      permanent_district: v.permanentDistrict,
      urban_rural: v.urbanRural,
      permanent_address: v.permanentAddress,

      phone_access: v.phoneAccess,
      apps_used: v.appsUsed || [],

      business_name: v.businessName,
      business_duration: v.businessDuration,
      business_registration: v.businessRegistration,
      business_sector: v.businessSector,
      business_sector_other: v.businessSectorOther,
      average_earnings: v.averageEarnings,
      paid_workers: v.paidWorkers,
      unpaid_workers: v.unpaidWorkers,
      equipment_value: v.equipmentValue,
      sales_channel: v.salesChannel || [],
      record_keeping: v.recordKeeping,

      business_practices: v.businessPractices || [],
      business_description: v.businessDescription,
      business_difference: v.businessDifference,
      bootcamp_reason: v.bootcampReason,
      business_vision: v.businessVision,

      grant_use: v.grantUse,
      grant_expenses: v.grantExpenses,
      grant_need: v.grantNeed,

      source: v.source,
      source_other: v.sourceOther,

      declaration_consent: v.declarationConsent === true,

      submitted_at: payload.submittedAt,
      user_agent: payload.meta?.userAgent,
      locale: payload.meta?.locale,
    })

    if (bootcampError) throw bootcampError
  }

  // Still insert into the generic submissions table for backward compatibility / unified analytics
  const { error } = await supabase.from('submissions').insert({
    track: payload.track,
    values: payload.values,
    analytics: payload.analytics,
    submitted_at: payload.submittedAt,
    meta: payload.meta,
  })

  if (error) throw error
}

interface WiseConnectInquiry extends Record<string, unknown> {
  name: string
  email: string
  inquiryType: string
  message: string
}

/**
 * WISE Connect's contact form isn't a schema-driven /apply/:track
 * application, so it doesn't go through `submitApplication`/`SubmissionPayload`
 * — but it reuses the same `submissions` table (track = 'wise-connect', see
 * supabase/migrations/0004_wise_connect_track.sql) and the same
 * configured-vs-not fallback behavior.
 */
export async function submitWiseConnectInquiry(inquiry: WiseConnectInquiry): Promise<void> {
  const payload = {
    track: 'wise-connect' as const,
    values: inquiry,
    analytics: { inquiryType: inquiry.inquiryType },
    submittedAt: new Date().toISOString(),
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
    submitted_at: payload.submittedAt,
    meta: payload.meta,
  })

  if (error) throw error
}
