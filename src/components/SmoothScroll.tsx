import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

/** Momentum smooth-scroll + smooth anchor navigation for hash links. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    // Handle scroll to hash on initial load
    if (window.location.hash && window.location.hash !== '#') {
      const el = document.querySelector(window.location.hash)
      if (el) {
        // Small delay to ensure layout is computed before jumping
        setTimeout(() => {
          lenis.scrollTo(el as HTMLElement, { offset: -72, immediate: true })
        }, 100)
      }
    }

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.3 })
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
