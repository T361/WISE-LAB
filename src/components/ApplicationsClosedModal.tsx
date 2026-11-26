import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, BellRing, ArrowUpRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/social'

interface ApplicationsClosedModalProps {
  isOpen: boolean
  onClose: () => void
  programName?: string
}

export function ApplicationsClosedModal({
  isOpen,
  onClose,
  programName,
}: ApplicationsClosedModalProps) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="applications-closed-title"
            aria-describedby="applications-closed-desc"
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-plum/10 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Bar */}
            <div
              className="h-1.5 w-full"
              style={{ background: 'linear-gradient(90deg, #6C1D7A, #2E7D7B, #FF8A65)' }}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-plum/5 text-plum/70 hover:bg-plum/10 hover:text-plum transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Status Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-700">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-700 border border-rose-200/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse" />
                    Applications Closed
                  </span>
                  <h3
                    id="applications-closed-title"
                    className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-gray-950 font-display"
                  >
                    Applications Are Currently Closed
                  </h3>
                  {programName && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-plum/60 mt-0.5">
                      {programName}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5 space-y-3">
                <p
                  id="applications-closed-desc"
                  className="text-[15px] leading-relaxed text-gray-600"
                >
                  Applications for this cycle are currently closed. Please keep visiting our website or follow our social platforms for updates on upcoming cohorts and announcements.
                </p>

                <p
                  className="text-[14px] leading-relaxed text-gray-500 font-urdu"
                  dir="rtl"
                  lang="ur"
                >
                  درخواستیں فی الحال بند ہیں۔ آنے والے بیجز اور نئی اپڈیٹس کے لیے ہماری ویب سائٹ یا سوشل میڈیا پلیٹ فارمز وزٹ کرتے رہیں۔
                </p>
              </div>

              {/* Social Channels Callout */}
              <div className="mt-6 rounded-2xl bg-[#FAFAFA] border border-black/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-plum">
                  <BellRing className="h-3.5 w-3.5 text-[#2E7D7B]" />
                  <span>Stay updated on our social channels</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {SOCIAL_LINKS.filter((s) => s.label !== 'Linktree').map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-plum/80 shadow-xs transition-all hover:border-[#2E7D7B]/40 hover:bg-[#2E7D7B]/5 hover:text-[#2E7D7B]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{label}</span>
                      <ArrowUpRight className="h-3 w-3 text-plum/40" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-full bg-[#2E7D7B] px-7 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2E7D7B]/25 transition-all hover:bg-[#245f5d] cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
