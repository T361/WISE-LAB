import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Minus, Phone, MessageSquare, Mail, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { BOOTCAMP_FAQ_DATA, type BootcampFAQCategory, type BootcampFAQItem } from '@/lib/data/bootcampFaqData'

type LanguageMode = 'both' | 'en' | 'ur'

export function BootcampFAQSection({
  langMode: externalLangMode,
  onLangModeChange,
  externalQuery = '',
}: {
  langMode?: 'both' | 'en' | 'ur'
  onLangModeChange?: (mode: 'both' | 'en' | 'ur') => void
  externalQuery?: string
} = {}) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [internalLangMode, setInternalLangMode] = useState<LanguageMode>('both')
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() => {
    // Open the first 3 questions by default
    return { 1: true, 2: true, 3: true }
  })

  // Resolved lang mode: external takes precedence
  const langMode = externalLangMode ?? internalLangMode

  // On mount: auto-open the question matching the URL hash (e.g. #q5)
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#q')) {
      const id = parseInt(hash.slice(2), 10)
      if (!isNaN(id)) {
        setOpenItems((prev) => ({ ...prev, [id]: true }))
      }
    }
  }, [])

  const setLangMode = (mode: LanguageMode) => {
    setInternalLangMode(mode)
    onLangModeChange?.(mode)
  }

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const wasOpen = prev[id] ?? false
      if (!wasOpen) {
        window.history.replaceState(null, '', `#q${id}`)
      }
      return { ...prev, [id]: !wasOpen }
    })
  }

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {}
    BOOTCAMP_FAQ_DATA.forEach((cat) => {
      cat.items.forEach((item) => {
        allOpen[item.id] = true
      })
    })
    setOpenItems(allOpen)
  }

  const collapseAll = () => {
    setOpenItems({})
  }

  // Effective search query: external takes priority over local
  const effectiveQuery = externalQuery || searchQuery

  // Filter categories and questions based on active category and search query
  const filteredCategories = useMemo(() => {
    const query = effectiveQuery.trim().toLowerCase()

    return BOOTCAMP_FAQ_DATA.map((cat) => {
      // If a specific category is selected and it doesn't match this category
      if (activeCategoryId !== 'all' && cat.id !== activeCategoryId) {
        return null
      }

      if (!query) {
        return cat
      }

      // Filter items within category matching query in English, Urdu, or Question ID
      const matchingItems = cat.items.filter((item) => {
        const idMatch = item.id.toString() === query || `q${item.id}` === query || `q ${item.id}` === query
        const enMatch = item.qEn.toLowerCase().includes(query) || item.aEn.toLowerCase().includes(query)
        const urMatch = item.qUr.includes(query) || item.aUr.includes(query)
        return idMatch || enMatch || urMatch
      })

      if (matchingItems.length === 0) return null

      return {
        ...cat,
        items: matchingItems,
      }
    }).filter(Boolean) as BootcampFAQCategory[]
  }, [activeCategoryId, effectiveQuery])

  const totalMatches = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)
  }, [filteredCategories])

  return (
    <section id="bootcamp-faq" className="mt-16 scroll-mt-10">
      {/* Section Header */}
      <div className="rounded-3xl border border-plum/10 bg-gradient-to-br from-[#FFF9F4] via-white to-[#F5F8F7] p-6 sm:p-8 md:p-10 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-plum/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8823C]/10 px-3 py-1 text-xs font-semibold text-[#B85C1A]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>WISE Lab Micro-Entrepreneurship Bootcamp</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 font-urdu text-lg sm:text-xl text-plum/80" dir="rtl" lang="ur">
              بوٹ کیمپ درخواست فارم: اکثر پوچھے جانے والے سوالات
            </p>
          </div>

          {/* Language Switcher — only shown when not controlled externally */}
          {!externalLangMode && (
            <div className="flex items-center self-start md:self-center gap-1 rounded-full border border-plum/15 bg-white p-1 text-xs font-medium shadow-sm">
              <button
                type="button"
                onClick={() => setLangMode('both')}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  langMode === 'both'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                Both / دونوں
              </button>
              <button
                type="button"
                onClick={() => setLangMode('en')}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  langMode === 'en'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLangMode('ur')}
                className={`rounded-full px-3 py-1.5 font-urdu text-sm transition-all ${
                  langMode === 'ur'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                اردو
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Expand/Collapse */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, number (e.g. Q28, 500,000, loan, قرض)..."
              className="w-full rounded-full border border-plum/20 bg-white py-2.5 pl-10 pr-4 text-sm text-plum placeholder:text-plum/40 focus:border-[#E8823C] focus:outline-none focus:ring-2 focus:ring-[#E8823C]/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-plum/50 hover:text-plum"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium self-end sm:self-center">
            {effectiveQuery && (
              <span className="text-xs text-plum/60 font-normal mr-2">
                Found {totalMatches} {totalMatches === 1 ? 'question' : 'questions'}
              </span>
            )}
            <button
              type="button"
              onClick={expandAll}
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3 py-2 text-plum/70 transition-colors hover:bg-plum/5 hover:text-plum"
            >
              <ChevronDown className="h-3.5 w-3.5" />
              Expand all
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="inline-flex items-center gap-1 rounded-full border border-plum/15 bg-white px-3 py-2 text-plum/70 transition-colors hover:bg-plum/5 hover:text-plum"
            >
              <ChevronUp className="h-3.5 w-3.5" />
              Collapse all
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategoryId('all')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeCategoryId === 'all'
                ? 'bg-[#B85C1A] text-white shadow-sm'
                : 'border border-plum/10 bg-white text-plum/70 hover:border-plum/30 hover:text-plum'
            }`}
          >
            <span>All Categories</span>
            <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">
              {BOOTCAMP_FAQ_DATA.reduce((s, c) => s + c.items.length, 0)}
            </span>
          </button>

          {BOOTCAMP_FAQ_DATA.map((cat) => {
            const isActive = activeCategoryId === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#B85C1A] text-white shadow-sm'
                    : 'border border-plum/10 bg-white text-plum/70 hover:border-plum/30 hover:text-plum'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.titleEn}</span>
                <span className="font-urdu ml-1 opacity-80" dir="rtl" lang="ur">
                  {cat.titleUr}
                </span>
                <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">
                  {cat.items.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="mt-8 space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-plum/20 bg-white p-12 text-center">
            <Filter className="mx-auto h-8 w-8 text-plum/40" />
            <p className="mt-3 text-base font-semibold text-plum">No matching questions found</p>
            <p className="mt-1 text-sm text-plum/60">
              Try searching for something else or reset your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setActiveCategoryId('all')
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#B85C1A] px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="scroll-mt-6" id={`category-${category.id}`}>
              {/* Category Header */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-plum/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{category.emoji}</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-black">
                    {category.titleEn}
                  </h3>
                  <span className="text-plum/40 font-normal">|</span>
                  <span className="font-urdu text-lg sm:text-xl font-bold text-plum" dir="rtl" lang="ur">
                    {category.titleUr}
                  </span>
                </div>
                <span className="text-xs font-semibold text-plum/50">
                  {category.items.length} questions
                </span>
              </div>

              {/* Items in this category */}
              <div className="space-y-4">
                {category.items.map((item) => (
                  <FAQCard
                    key={item.id}
                    item={item}
                    isOpen={openItems[item.id] ?? false}
                    onToggle={() => toggleItem(item.id)}
                    langMode={langMode}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Helpline Support Banner */}
      <div className="mt-12 rounded-3xl border border-[#E8823C]/30 bg-gradient-to-br from-[#FFF4EB] to-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#B85C1A]">
              Need Help With Your Application? / کیا آپ کو رہنمائی چاہیئے؟
            </p>
            <h4 className="mt-2 font-display text-xl sm:text-2xl font-bold text-black">
              Call or WhatsApp the Official Helpline
            </h4>
            <p className="mt-1 text-sm text-plum/70">
              Monday to Friday, 10:00 am to 6:00 pm. Our team will guide you through the form or help
              you fill it over the phone.
            </p>
            <p className="mt-1 font-urdu text-sm text-plum/80" dir="rtl" lang="ur">
              ہیلپ لائن: پیر سے جمعہ، صبح 10 بجے سے شام 6 بجے تک دستیاب ہے۔
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/923115999592"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp: +92 311 5999592</span>
            </a>
            <a
              href="tel:+923115999592"
              className="inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105"
            >
              <Phone className="h-4 w-4" />
              <span>Call Helpline</span>
            </a>
            <a
              href="mailto:imran.jamil@changemechanics.pk"
              className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-white px-4 py-2.5 text-sm font-semibold text-plum transition-colors hover:bg-plum/5"
            >
              <Mail className="h-4 w-4" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQCard({
  item,
  isOpen,
  onToggle,
  langMode,
}: {
  item: BootcampFAQItem
  isOpen: boolean
  onToggle: () => void
  langMode: LanguageMode
}) {
  return (
    <div
      id={`q${item.id}`}
      className={`rounded-2xl border transition-all duration-200 ${
        isOpen
          ? 'border-[#E8823C]/40 bg-white shadow-md ring-1 ring-[#E8823C]/10'
          : 'border-plum/10 bg-white hover:border-plum/20 shadow-sm'
      }`}
    >
      {/* Clickable Card Header */}
      <button
        type="button"
        id={`bootcamp-btn-${item.id}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`bootcamp-panel-${item.id}`}
        className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8823C]/60"
      >
        <div className="flex-1 space-y-2">
          {/* English Question */}
          {(langMode === 'both' || langMode === 'en') && (
            <h4 className="font-display text-[17px] sm:text-[18px] font-bold leading-snug text-black">
              {item.qEn}
            </h4>
          )}

          {/* Urdu Question (Right Aligned, Nastaliq) */}
          {(langMode === 'both' || langMode === 'ur') && (
            <p
              className="font-urdu text-right text-[17px] sm:text-[19px] font-bold leading-relaxed text-[#B85C1A]"
              dir="rtl"
              lang="ur"
            >
              {item.qUr}
            </p>
          )}
        </div>

        {/* Toggle Icon */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-[#B85C1A] text-white' : 'bg-plum/5 text-plum hover:bg-plum/10'
          }`}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      {/* Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`bootcamp-panel-${item.id}`}
            role="region"
            aria-labelledby={`bootcamp-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-plum/10 px-5 sm:px-6 pb-6 pt-4 space-y-4">
              {/* English Answer */}
              {(langMode === 'both' || langMode === 'en') && (
                <div className="text-left text-[15px] sm:text-[16px] leading-relaxed text-plum/85">
                  <p>{item.aEn}</p>
                </div>
              )}

              {/* Divider if both languages are visible */}
              {langMode === 'both' && (
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-plum/15" />
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase tracking-wider text-plum/40">
                    <span className="bg-white px-2 font-medium">اردو ترجمہ</span>
                  </div>
                </div>
              )}

              {/* Urdu Answer (Right Aligned, Nastaliq, Comfortably Spaced) */}
              {(langMode === 'both' || langMode === 'ur') && (
                <div
                  className="font-urdu text-right text-[16px] sm:text-[18px] leading-[2.1] text-plum/90"
                  dir="rtl"
                  lang="ur"
                >
                  <p>{item.aUr}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
