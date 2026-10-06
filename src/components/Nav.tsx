import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WiseMark } from './WiseLabLogo'

import { NAV_LINKS } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function Nav() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash.replace('#', '')
    }
    return 'hero'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', ...NAV_LINKS.map((l) => l.id), 'faqs', 'newsletter']
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Drawer: lock page scroll (Lenis drives window scroll, so hiding overflow
  // on the root is enough), close on Escape, and move focus into the panel.
  useEffect(() => {
    if (!menuOpen) return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      root.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  // The hero background is now always white, so we never need the white text variant
  // for the nav links over the hero section.
  const lightText = false
  const logoVariant = 'color'

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'transition-colors duration-500',
        scrolled
          ? 'border-b border-plum/10 bg-white/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-x-4 px-6 py-2 md:px-10 xl:py-2 2xl:gap-x-6">
        <div className="flex items-center gap-6 xl:gap-10">
          <a
            href="#hero"
            aria-label={t('nav.home')}
            className="flex items-center gap-3 shrink-0"
          >
            {/* smaller on phones/tablets now that links live in the drawer, not
                inline — no need to reserve the taller desktop header there.
                Steps back down at xl so the full link row + CTA fit on one
                line on a 1280px laptop; the drawer handles everything narrower. */}
            <WiseMark variant={logoVariant} className="h-[48px] -my-[6px] w-auto sm:h-[60px] sm:-my-[8px] xl:h-[75px] xl:-my-[9.5px] 2xl:h-[86px] 2xl:-my-[11px] origin-left" />
          </a>
  
          {/* Desktop links */}
          <div className="hidden xl:flex xl:items-center xl:flex-nowrap xl:gap-x-4 2xl:gap-x-5 mt-4">
            <div className="flex flex-nowrap gap-x-4 2xl:gap-x-5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  data-active={active === l.id}
                  className={cn(
                    'link-underline whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-medium transition-all duration-300',
                    lightText
                      ? 'text-white/85 hover:text-white hover:bg-white/10'
                      : 'text-plum/75 hover:text-plum hover:bg-plum/5',
                    active === l.id && (lightText ? 'text-white bg-white/20 shadow-sm' : 'text-plum bg-plum/10 shadow-sm')
                  )}
                >
                  {t(`nav.links.${l.id}`, l.label)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Logos + Mobile / tablet menu trigger */}
        <div className="flex items-center gap-3 sm:gap-4 xl:gap-6">
          <div className="flex items-center gap-4 sm:gap-5 xl:gap-6">
            <img src="/Ministry-03.png" alt="Ministry" className="h-[100px] sm:h-[123px] xl:h-[134px] 2xl:h-[156px] -my-[32px] sm:-my-[39px] xl:-my-[43px] 2xl:-my-[50px] w-auto object-contain max-w-none" />
            <div className={cn("w-[1.5px] h-5 sm:h-7 xl:h-9 rounded-full transition-colors", lightText ? "bg-white/30" : "bg-plum/20")} />
            <img src="/Ignite-06.png" alt="Ignite" className="h-[79px] sm:h-[97px] xl:h-[105px] 2xl:h-[123px] -my-[21px] sm:-my-[26px] xl:-my-[28px] 2xl:-my-[33px] w-auto object-contain max-w-none" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center transition-colors xl:hidden',
              lightText
                ? 'text-white'
                : 'text-plum'
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — portalled to <body> so it can't inherit the header's
          stacking/containing block (the header animates its own transform). */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <div className="xl:hidden">
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] bg-plum/50 backdrop-blur-sm"
            />
            <motion.div
              key="panel"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.home')}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[84%] max-w-sm flex-col border-l border-plum/10 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4">
                <WiseMark variant="color" className="h-16 w-auto" />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label={t('nav.closeMenu')}
                  className="flex h-11 w-11 shrink-0 items-center justify-center text-plum transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    data-active={active === l.id}
                    onClick={closeMenu}
                    className={cn(
                      'rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                      active === l.id
                        ? 'bg-plum/[0.06] text-plum'
                        : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                    )}
                  >
                    {t(`nav.links.${l.id}`, l.label)}
                  </a>
                ))}
              </div>

            </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  )
}
