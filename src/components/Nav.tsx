import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { WiseMark } from './WiseLabLogo'

import { NAV_LINKS, PROGRAMS_DROPDOWN, ABOUT_US_DROPDOWN, HAPPENINGS_DROPDOWN } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function Nav() {
  const { pathname } = useLocation()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false)
  const [aboutUsOpen, setAboutUsOpen] = useState(false)
  const [mobileAboutUsOpen, setMobileAboutUsOpen] = useState(false)
  const [happeningsOpen, setHappeningsOpen] = useState(false)
  const [mobileHappeningsOpen, setMobileHappeningsOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const programsRef = useRef<HTMLDivElement>(null)
  const aboutUsRef = useRef<HTMLDivElement>(null)
  const happeningsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close programs dropdown on outside click
  useEffect(() => {
    if (!programsOpen) return
    const handler = (e: MouseEvent) => {
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [programsOpen])

  // Close happenings dropdown on outside click
  useEffect(() => {
    if (!happeningsOpen) return
    const handler = (e: MouseEvent) => {
      if (happeningsRef.current && !happeningsRef.current.contains(e.target as Node)) {
        setHappeningsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [happeningsOpen])

  // Close About Us dropdown on outside click
  useEffect(() => {
    if (!aboutUsOpen) return
    const handler = (e: MouseEvent) => {
      if (aboutUsRef.current && !aboutUsRef.current.contains(e.target as Node)) {
        setAboutUsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [aboutUsOpen])

  // Drawer: lock page scroll, close on Escape, move focus into panel.
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

  const lightText = false
  const logoVariant = 'color'

  /** True if this nav link's page-route matches the current pathname */
  function isActivePage(href: string | null) {
    if (!href || href === '/') return false
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'border-b border-[#2E8C8A] shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-xl'
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-x-4 px-6 py-2 md:px-10 xl:py-2 2xl:gap-x-6">
        {/* Left: Logo + Nav links */}
        <div className="flex items-center gap-6 xl:gap-10">
          <Link
            to="/"
            aria-label="WISE Lab home"
            className="flex items-center gap-3 shrink-0"
          >
            <WiseMark variant={logoVariant} className="h-[48px] -my-[6px] w-auto sm:h-[60px] sm:-my-[8px] xl:h-[75px] xl:-my-[9.5px] 2xl:h-[86px] 2xl:-my-[11px] origin-left" />
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex xl:items-center xl:flex-nowrap xl:gap-x-4 2xl:gap-x-5 mt-4">
            <div className="flex flex-nowrap gap-x-4 2xl:gap-x-5">
              {NAV_LINKS.map((l) => {
                // Home — always go to "/"
                if (l.id === 'home') {
                  return (
                    <Link
                      key={l.id}
                      to="/"
                      className={cn(
                        'link-underline whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-bold transition-all duration-300',
                        lightText
                          ? 'text-white/85 hover:text-white hover:bg-white/10'
                          : 'text-black hover:text-black hover:bg-black/5',
                        pathname === '/' && !window.location.hash &&
                          (lightText ? 'text-white bg-white/20 shadow-sm' : 'text-black bg-black/10 shadow-sm')
                      )}
                    >
                      {l.label}
                    </Link>
                  )
                }

                // Programs gets a dropdown
                if (l.id === 'programs') {
                  const isProgramsActive =
                    pathname.startsWith('/incubation') ||
                    pathname.startsWith('/micro-entrepreneurship')
                  return (
                    <div key="programs" ref={programsRef} className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setProgramsOpen((o) => !o)
                          setHappeningsOpen(false)
                          setAboutUsOpen(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setProgramsOpen(false)
                        }}
                        aria-haspopup="true"
                        aria-expanded={programsOpen}
                        className={cn(
                          'inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-bold transition-all duration-300',
                          lightText
                            ? 'text-white/85 hover:text-white hover:bg-white/10'
                            : 'text-black hover:text-black hover:bg-black/5',
                          (isProgramsActive || programsOpen) &&
                            (lightText
                              ? 'text-white bg-white/20 shadow-sm'
                              : 'text-black bg-black/10 shadow-sm')
                        )}
                      >
                        {l.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            programsOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {programsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute left-0 top-full mt-2 z-50 min-w-[210px] rounded-2xl border border-plum/10 bg-white p-1.5 shadow-xl shadow-plum/10"
                          >
                            {PROGRAMS_DROPDOWN.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setProgramsOpen(false)}
                                className={cn(
                                  "block rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-plum/5",
                                  pathname.startsWith(item.href) ? "text-[#FF8A65] bg-plum/5 font-semibold" : "text-plum"
                                )}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                // About Us gets a dropdown
                if (l.id === 'about-us') {
                  const isAboutUsActive =
                    pathname.startsWith('/behind-the-wings') ||
                    pathname.startsWith('/become-a-mentor') ||
                    pathname.startsWith('/connect')
                  return (
                    <div key="about-us" ref={aboutUsRef} className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setAboutUsOpen((o) => !o)
                          setProgramsOpen(false)
                          setHappeningsOpen(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setAboutUsOpen(false)
                        }}
                        aria-haspopup="true"
                        aria-expanded={aboutUsOpen}
                        className={cn(
                          'inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-bold transition-all duration-300',
                          lightText
                            ? 'text-white/85 hover:text-white hover:bg-white/10'
                            : 'text-black hover:text-black hover:bg-black/5',
                          (isAboutUsActive || aboutUsOpen) &&
                            (lightText
                              ? 'text-white bg-white/20 shadow-sm'
                              : 'text-black bg-black/10 shadow-sm')
                        )}
                      >
                        {l.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            aboutUsOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {aboutUsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute left-0 top-full mt-2 z-50 min-w-[200px] rounded-2xl border border-plum/10 bg-white p-1.5 shadow-xl shadow-plum/10"
                          >
                            {ABOUT_US_DROPDOWN.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setAboutUsOpen(false)}
                                className={cn(
                                  "block rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-plum/5",
                                  pathname.startsWith(item.href) ? "text-[#FF8A65] bg-plum/5 font-semibold" : "text-plum"
                                )}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                // Happenings gets a dropdown
                if (l.id === 'happenings') {
                  const isHappeningsActive =
                    pathname.startsWith('/events') ||
                    pathname.startsWith('/blog') ||
                    pathname.startsWith('/happenings')
                  return (
                    <div key="happenings" ref={happeningsRef} className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setHappeningsOpen((o) => !o)
                          setProgramsOpen(false)
                          setAboutUsOpen(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setHappeningsOpen(false)
                        }}
                        aria-haspopup="true"
                        aria-expanded={happeningsOpen}
                        className={cn(
                          'inline-flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-bold transition-all duration-300',
                          lightText
                            ? 'text-white/85 hover:text-white hover:bg-white/10'
                            : 'text-black hover:text-black hover:bg-black/5',
                          (isHappeningsActive || happeningsOpen) &&
                            (lightText
                              ? 'text-white bg-white/20 shadow-sm'
                              : 'text-black bg-black/10 shadow-sm')
                        )}
                      >
                        {l.label}
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-200',
                            happeningsOpen && 'rotate-180'
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {happeningsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute left-0 top-full mt-2 z-50 min-w-[190px] rounded-2xl border border-plum/10 bg-white p-1.5 shadow-xl shadow-plum/10"
                          >
                            {HAPPENINGS_DROPDOWN.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setHappeningsOpen(false)}
                                className={cn(
                                  "block rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors hover:bg-plum/5",
                                  pathname.startsWith(item.href) ? "text-[#FF8A65] bg-plum/5 font-semibold" : "text-plum"
                                )}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                // All other items are now dedicated pages
                const href = l.href as string
                const pageActive = isActivePage(href)
                return (
                  <Link
                    key={l.id}
                    to={href}
                    className={cn(
                      'link-underline whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] 2xl:text-sm font-bold transition-all duration-300',
                      lightText
                        ? 'text-white/85 hover:text-white hover:bg-white/10'
                        : 'text-black hover:text-black hover:bg-black/5',
                      pageActive && (lightText ? 'text-white bg-white/20 shadow-sm' : 'text-black bg-black/10 shadow-sm')
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
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
            aria-label="Open menu"
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

      {/* Mobile drawer — portalled to <body> */}
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
              aria-label="WISE Lab navigation"
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
                  aria-label="Close menu"
                  className="flex h-11 w-11 shrink-0 items-center justify-center text-plum transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4">
                {NAV_LINKS.map((l) => {
                  // Home
                  if (l.id === 'home') {
                    return (
                      <Link
                        key={l.id}
                        to="/"
                        onClick={closeMenu}
                        className={cn(
                          'rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                          pathname === '/'
                            ? 'bg-plum/[0.06] text-plum'
                            : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                        )}
                      >
                        {l.label}
                      </Link>
                    )
                  }

                  // Programs → accordion in mobile
                  if (l.id === 'programs') {
                    const isProgramsActive =
                      pathname.startsWith('/incubation') ||
                      pathname.startsWith('/micro-entrepreneurship')
                    return (
                      <div key="programs-mobile">
                        <button
                          type="button"
                          onClick={() => setMobileProgramsOpen((o) => !o)}
                          className={cn(
                            'w-full flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                            isProgramsActive || mobileProgramsOpen
                              ? 'bg-plum/[0.06] text-plum'
                              : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                          )}
                        >
                          {l.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200 text-plum/40',
                              mobileProgramsOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileProgramsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-0.5 pl-3 pt-1 pb-1">
                                {PROGRAMS_DROPDOWN.map((item) => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      "block rounded-xl px-3 py-2 text-[14px] font-medium transition-colors hover:bg-plum/[0.04]",
                                      pathname.startsWith(item.href)
                                        ? "text-[#FF8A65] font-semibold"
                                        : "text-plum/80 hover:text-plum"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  // About Us → accordion in mobile
                  if (l.id === 'about-us') {
                    const isAboutUsActive =
                      pathname.startsWith('/behind-the-wings') ||
                      pathname.startsWith('/become-a-mentor') ||
                      pathname.startsWith('/connect')
                    return (
                      <div key="about-us-mobile">
                        <button
                          type="button"
                          onClick={() => setMobileAboutUsOpen((o) => !o)}
                          className={cn(
                            'w-full flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                            isAboutUsActive || mobileAboutUsOpen
                              ? 'bg-plum/[0.06] text-plum'
                              : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                          )}
                        >
                          {l.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200 text-plum/40',
                              mobileAboutUsOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileAboutUsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-0.5 pl-3 pt-1 pb-1">
                                {ABOUT_US_DROPDOWN.map((item) => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      "block rounded-xl px-3 py-2 text-[14px] font-medium transition-colors hover:bg-plum/[0.04]",
                                      pathname.startsWith(item.href)
                                        ? "text-[#FF8A65] font-semibold"
                                        : "text-plum/80 hover:text-plum"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  // Happenings → accordion in mobile
                  if (l.id === 'happenings') {
                    const isHappeningsActive =
                      pathname.startsWith('/events') ||
                      pathname.startsWith('/blog') ||
                      pathname.startsWith('/happenings')
                    return (
                      <div key="happenings-mobile">
                        <button
                          type="button"
                          onClick={() => setMobileHappeningsOpen((o) => !o)}
                          className={cn(
                            'w-full flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                            isHappeningsActive || mobileHappeningsOpen
                              ? 'bg-plum/[0.06] text-plum'
                              : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                          )}
                        >
                          {l.label}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200 text-plum/40',
                              mobileHappeningsOpen && 'rotate-180'
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileHappeningsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-0.5 pl-3 pt-1 pb-1">
                                {HAPPENINGS_DROPDOWN.map((item) => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      "block rounded-xl px-3 py-2 text-[14px] font-medium transition-colors hover:bg-plum/[0.04]",
                                      pathname.startsWith(item.href)
                                        ? "text-[#FF8A65] font-semibold"
                                        : "text-plum/80 hover:text-plum"
                                    )}
                                  >
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  // Page-based links
                  const href = l.href as string
                  const pageActive = isActivePage(href)
                  return (
                    <Link
                      key={l.id}
                      to={href}
                      onClick={closeMenu}
                      className={cn(
                        'rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                        pageActive
                          ? 'bg-plum/[0.06] text-plum'
                          : 'text-plum/70 hover:bg-plum/[0.04] hover:text-plum'
                      )}
                    >
                      {l.label}
                    </Link>
                  )
                })}
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
