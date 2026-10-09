import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function AnnouncementModal() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Only show once per session so it doesn't annoy the user
    const hasSeenModal = sessionStorage.getItem('wise:seen-announcement')
    if (!hasSeenModal) {
      // Small delay so it pops up slightly after the initial page load
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('wise:seen-announcement', 'true')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-plum/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/50 p-2 text-plum/60 backdrop-blur-md transition-colors hover:bg-white/80 hover:text-plum"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Decorative Header */}
            <div className="bg-gradient-to-br from-[#FF8A65]/20 to-[#FF8A65]/5 px-8 pb-6 pt-10 text-center">
              <h2 className="font-display text-2xl font-bold tracking-tight text-plum md:text-3xl">
                Micro-Entrepreneurship Bootcamp
              </h2>
              <p className="mt-2 text-sm font-medium text-plum/70">
                A free one-month training programme for women-led small businesses.
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="mb-8 text-base leading-relaxed text-plum/80" dir="rtl" lang="ur" style={{ fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', sans-serif" }}>
                خواتین کے زیرِ انتظام چھوٹے اور گھریلو کاروبار کے لیے وائز لیب کا ایک ماہ کا مفت تربیتی پروگرام۔ ابھی اپلائی کریں!
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/apply/enterprise"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF8A65] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#FF8A65]/90 hover:shadow-lg hover:shadow-[#FF8A65]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF8A65]"
                >
                  Apply Now / ابھی اپلائی کریں
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold text-plum/60 transition-colors hover:bg-plum/5 hover:text-plum"
                >
                  {t('form.close', 'Close')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
