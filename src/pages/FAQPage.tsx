import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Sparkles, HelpCircle, Layers, Search, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema, faqPageSchema } from '@/lib/structuredData'
import { InstagramIcon, FacebookIcon } from '@/components/BrandIcons'
import { SOCIAL_LINKS } from '@/lib/social'
import { BootcampFAQSection } from '@/components/BootcampFAQSection'
import { GeneralFAQSection } from '@/components/GeneralFAQSection'
import { BOOTCAMP_FAQ_DATA } from '@/lib/data/bootcampFaqData'
import { GENERAL_FAQ_DATA } from '@/lib/data/generalFaqData'

export function FAQPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const trackParam = searchParams.get('track')
  const [activeTrack, setActiveTrack] = useState<'all' | 'bootcamp' | 'general'>(() => {
    if (trackParam === 'bootcamp') return 'bootcamp'
    if (trackParam === 'general') return 'general'
    if (typeof window !== 'undefined' && window.location.hash.includes('bootcamp')) return 'bootcamp'
    if (typeof window !== 'undefined' && window.location.hash.includes('general')) return 'general'
    return 'all'
  })

  const [globalQuery, setGlobalQuery] = useState('')
  const [langMode, setLangMode] = useState<'both' | 'en' | 'ur'>('both')

  useEffect(() => {
    if (trackParam === 'bootcamp') {
      setActiveTrack('bootcamp')
    } else if (trackParam === 'general') {
      setActiveTrack('general')
    }
  }, [trackParam])

  const handleTrackChange = (track: 'all' | 'bootcamp' | 'general') => {
    setActiveTrack(track)
    if (track === 'bootcamp') {
      setSearchParams({ track: 'bootcamp' })
    } else if (track === 'general') {
      setSearchParams({ track: 'general' })
    } else {
      setSearchParams({})
    }
  }

  // Dynamic tab counts
  const bootcampCount = useMemo(() => BOOTCAMP_FAQ_DATA.reduce((s, c) => s + c.items.length, 0), [])
  const generalCount = useMemo(() => GENERAL_FAQ_DATA.reduce((s, c) => s + c.items.length, 0), [])
  const totalCount = bootcampCount + generalCount

  // Compute filtered result count for aria-live region
  const filteredCount = useMemo(() => {
    if (!globalQuery.trim()) return totalCount
    const q = globalQuery.toLowerCase()
    let count = 0
    if (activeTrack === 'all' || activeTrack === 'bootcamp') {
      BOOTCAMP_FAQ_DATA.forEach((cat) => {
        cat.items.forEach((item) => {
          if (
            item.qEn?.toLowerCase().includes(q) ||
            item.aEn?.toLowerCase().includes(q) ||
            item.qUr?.toLowerCase().includes(q) ||
            item.aUr?.toLowerCase().includes(q)
          ) {
            count++
          }
        })
      })
    }
    if (activeTrack === 'all' || activeTrack === 'general') {
      GENERAL_FAQ_DATA.forEach((cat) => {
        cat.items.forEach((item) => {
          if (
            item.qEn?.toLowerCase().includes(q) ||
            item.aEn?.toLowerCase().includes(q) ||
            item.qUr?.toLowerCase().includes(q) ||
            item.aUr?.toLowerCase().includes(q)
          ) {
            count++
          }
        })
      })
    }
    return count
  }, [globalQuery, activeTrack, totalCount])

  useDocumentMeta({
    title: 'FAQs – Frequently Asked Questions',
    description:
      'Answers to common questions about WISE Lab eligibility, programme support, grants, applications, and the Micro-Entrepreneurship Bootcamp.',
    path: '/faqs',
    structuredData: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'FAQs', path: '/faqs' },
      ]),
      faqPageSchema([
        ...GENERAL_FAQ_DATA.flatMap((cat) =>
          cat.items.map((item) => ({ q: item.qEn, a: item.aEn }))
        ),
        ...BOOTCAMP_FAQ_DATA.flatMap((cat) =>
          cat.items.map((item) => ({ q: item.qEn, a: item.aEn }))
        ),
      ]),
    ],
  })

  return (
    <main className="relative min-h-screen overflow-hidden bg-white py-16 pb-32 md:py-24 md:pb-32">
      {/* Decorative gradient top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#faf7f4] to-transparent"
      />

      <div className="container-wise relative max-w-4xl">
        {/* Back link */}
        <Reveal>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to WISE Lab
          </Link>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.05}>
          <div className="mt-10">
            <p className="eyebrow">Knowledge Base</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.03] text-black">
              Frequently Asked{' '}
              <span className="text-teal">Questions</span>
            </h1>

            {/* Track Switcher Tabs */}
            <div
              role="tablist"
              aria-label="FAQ Category"
              className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-plum/10 bg-plum/[0.03] p-1.5 sm:inline-flex"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'all'}
                onClick={() => handleTrackChange('all')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTrack === 'all'
                    ? 'bg-white text-plum shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>All FAQs ({totalCount} Questions)</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'bootcamp'}
                onClick={() => handleTrackChange('bootcamp')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTrack === 'bootcamp'
                    ? 'bg-[#B85C1A] text-white shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Micro-Entrepreneurship Bootcamp ({bootcampCount})</span>
                <span className="font-urdu hidden sm:inline" dir="rtl">
                  بوٹ کیمپ
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTrack === 'general'}
                onClick={() => handleTrackChange('general')}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  activeTrack === 'general'
                    ? 'bg-teal text-white shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>General &amp; Incubation ({generalCount})</span>
                <span className="font-urdu hidden sm:inline" dir="rtl">
                  انکیوبیشن
                </span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold text-plum/50 uppercase tracking-wide">Language:</span>
              {(['both', 'en', 'ur'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLangMode(mode)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    langMode === mode
                      ? 'bg-plum text-white shadow-sm'
                      : 'border border-plum/15 text-plum/60 hover:text-plum hover:border-plum/30'
                  }`}
                >
                  {mode === 'both' ? 'Both / دونوں' : mode === 'en' ? 'English' : 'اردو'}
                </button>
              ))}
            </div>

            {/* Global Search Bar */}
            <div className="mt-5 relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
              <input
                type="search"
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Search all questions…"
                dir={langMode === 'ur' ? 'rtl' : 'ltr'}
                className="w-full max-w-xl rounded-2xl border border-plum/15 bg-white py-3.5 pl-11 pr-10 text-sm shadow-sm placeholder:text-plum/40 focus:outline-none focus:ring-2 focus:ring-teal/40"
              />
              {globalQuery && (
                <button
                  type="button"
                  onClick={() => setGlobalQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-plum/40 hover:text-plum transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <span
                aria-live="polite"
                className="mt-1.5 block text-xs text-plum/50"
              >
                {globalQuery.trim()
                  ? `Found ${filteredCount} result${filteredCount !== 1 ? 's' : ''} across all tracks`
                  : null}
              </span>
            </div>
          </div>
        </Reveal>

        {/* FAQ Sections with animated track transitions */}
        <AnimatePresence mode="wait">
          {(activeTrack === 'bootcamp' || activeTrack === 'all') && (
            <motion.div
              key={`bootcamp-${activeTrack}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* Micro-Entrepreneurship Bootcamp FAQs */}
              <BootcampFAQSection
                langMode={langMode}
                onLangModeChange={setLangMode}
                externalQuery={globalQuery}
              />
            </motion.div>
          )}

          {(activeTrack === 'general' || activeTrack === 'all') && (
            <motion.div
              key={`general-${activeTrack}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {/* General & Startup Incubation FAQs */}
              <GeneralFAQSection
                langMode={langMode}
                externalQuery={globalQuery}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Contact CTA */}
        <Reveal delay={0.1}>
          <div className="mt-20 rounded-3xl border border-plum/10 bg-gradient-to-br from-[#faf7f4] to-white p-8 md:p-12">
            <p className="eyebrow">Still have questions?</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-black">
              We're here to help
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-plum/65">
              Can't find your answer? Reach out to the WISE Lab team directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="mailto:mahnoor.fatima@changemechanics.pk"
                id="faq-contact-email"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <span className="sm:hidden">Email Us</span>
                <span className="hidden sm:inline">mahnoor.fatima@changemechanics.pk</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.find((s) => s.label === 'Instagram')?.href ?? 'https://www.instagram.com/wise.labpk/'}
                id="faq-contact-instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum transition-colors hover:bg-plum/[0.04]"
              >
                <InstagramIcon className="h-4 w-4" />
                @wise.labpk
              </a>
              <a
                href={SOCIAL_LINKS.find((s) => s.label === 'Facebook')?.href ?? 'https://www.facebook.com'}
                id="faq-contact-facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-plum/20 px-6 py-3 text-sm font-semibold text-plum transition-colors hover:bg-plum/[0.04]"
              >
                <FacebookIcon className="h-4 w-4" />
                Facebook Page
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
