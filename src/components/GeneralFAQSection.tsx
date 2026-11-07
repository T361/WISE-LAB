import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Minus, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { GENERAL_FAQ_DATA, type GeneralFAQCategory, type GeneralFAQItem } from '@/lib/data/generalFaqData'

type LanguageMode = 'both' | 'en' | 'ur'

export function GeneralFAQSection({
  langMode: externalLangMode,
  externalQuery = '',
}: {
  langMode?: LanguageMode
  externalQuery?: string
} = {}) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [internalLangMode, setInternalLangMode] = useState<LanguageMode>('both')
  const [openItems, setOpenItems] = useState<Record<number, boolean>>(() => {
    // Open the first 3 questions by default
    return { 1: true, 2: true, 3: true }
  })

  const langMode = externalLangMode ?? internalLangMode

  // Auto-open question from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#q')) {
      const id = parseInt(hash.slice(2), 10)
      if (!isNaN(id)) {
        setOpenItems((prev) => ({ ...prev, [id]: true }))
      }
    }
  }, [])

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const isCurrentlyOpen = prev[id]
      if (!isCurrentlyOpen) {
        window.history.replaceState(null, '', `#q${id}`)
      }
      return { ...prev, [id]: !isCurrentlyOpen }
    })
  }

  const expandAll = () => {
    const allOpen: Record<number, boolean> = {}
    GENERAL_FAQ_DATA.forEach((cat) => {
      cat.items.forEach((item) => {
        allOpen[item.id] = true
      })
    })
    setOpenItems(allOpen)
  }

  const collapseAll = () => {
    setOpenItems({})
  }

  // Effective search query: external takes priority
  const effectiveQuery = externalQuery || searchQuery

  // Filter categories and questions based on active category and search query
  const filteredCategories = useMemo(() => {
    const query = effectiveQuery.trim().toLowerCase()

    return GENERAL_FAQ_DATA.map((cat) => {
      if (activeCategoryId !== 'all' && cat.id !== activeCategoryId) {
        return null
      }

      if (!query) {
        return cat
      }

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
    }).filter(Boolean) as GeneralFAQCategory[]
  }, [activeCategoryId, effectiveQuery])

  const totalMatches = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0)
  }, [filteredCategories])

  return (
    <section id="general-faq" className="mt-16 scroll-mt-10">
      {/* Section Header */}
      <div className="rounded-3xl border border-plum/10 bg-gradient-to-br from-[#F4FAF9] via-white to-[#FDF8F4] p-6 sm:p-8 md:p-10 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-plum/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
              <Sparkles className="h-3.5 w-3.5" />
              <span>WISE Lab General &amp; Startup Incubation Track</span>
            </div>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              General &amp; Incubation FAQs
            </h2>
            <p className="mt-1 font-urdu text-lg sm:text-xl text-plum/80" dir="rtl" lang="ur">
              عمومی معلومات اور اسٹارٹ اپ انکیوبیشن: اکثر پوچھے جانے والے سوالات
            </p>
          </div>

          {/* Language Switcher — only shown when not externally controlled */}
          {!externalLangMode && (
            <div className="flex items-center self-start md:self-center gap-1 rounded-full border border-plum/15 bg-white p-1 text-xs font-medium shadow-sm">
              <button
                type="button"
                onClick={() => setInternalLangMode('both')}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  internalLangMode === 'both'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                Both / دونوں
              </button>
              <button
                type="button"
                onClick={() => setInternalLangMode('en')}
                className={`rounded-full px-3 py-1.5 transition-all ${
                  internalLangMode === 'en'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setInternalLangMode('ur')}
                className={`rounded-full px-3 py-1.5 font-urdu text-sm transition-all ${
                  internalLangMode === 'ur'
                    ? 'bg-plum text-white font-semibold shadow-sm'
                    : 'text-plum/70 hover:text-plum'
                }`}
              >
                اردو
              </button>
            </div>
          )}
        </div>

        {/* Search Bar & Expand/Collapse — hidden when external query is active */}
        {!externalQuery && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions in English or اردو..."
                className="w-full rounded-full border border-plum/20 bg-white py-2.5 pl-10 pr-4 text-sm text-plum placeholder:text-plum/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
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
              {searchQuery && (
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
        )}

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategoryId('all')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeCategoryId === 'all'
                ? 'bg-teal text-white shadow-sm'
                : 'border border-plum/10 bg-white text-plum/70 hover:border-plum/30 hover:text-plum'
            }`}
          >
            <span>All Categories</span>
            <span className="ml-1 rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">
              {GENERAL_FAQ_DATA.reduce((s, c) => s + c.items.length, 0)}
            </span>
          </button>

          {GENERAL_FAQ_DATA.map((cat) => {
            const isActive = activeCategoryId === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-teal text-white shadow-sm'
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
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Reset Search &amp; Filters
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
                  <span className="font-urdu text-lg sm:text-xl font-bold text-teal" dir="rtl" lang="ur">
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
    </section>
  )
}

function FAQCard({
  item,
  isOpen,
  onToggle,
  langMode,
}: {
  item: GeneralFAQItem
  isOpen: boolean
  onToggle: () => void
  langMode: LanguageMode
}) {
  return (
    <div
      id={`q${item.id}`}
      className={`rounded-2xl border transition-all duration-200 ${
        isOpen
          ? 'border-teal/40 bg-white shadow-md ring-1 ring-teal/10'
          : 'border-plum/10 bg-white hover:border-plum/20 shadow-sm'
      }`}
    >
      {/* Clickable Card Header */}
      <button
        type="button"
        id={`general-btn-${item.id}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`general-panel-${item.id}`}
        className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/60"
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
              className="font-urdu text-right text-[17px] sm:text-[19px] font-bold leading-relaxed text-teal"
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
            isOpen ? 'bg-teal text-white' : 'bg-plum/5 text-plum hover:bg-plum/10'
          }`}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      {/* Answer Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`general-panel-${item.id}`}
            role="region"
            aria-labelledby={`general-btn-${item.id}`}
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
