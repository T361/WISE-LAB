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

    // Handle scroll to hash on initial load (accounting for layout shifts from async data)
    if (window.location.hash && window.location.hash !== '#') {
      const hash = window.location.hash
      
      const scrollToHash = () => {
        const el = document.querySelector(hash)
        if (el) {
          lenis.scrollTo(el as HTMLElement, { offset: -72, immediate: true })
        }
      }

      // Try immediately
      setTimeout(scrollToHash, 50)

      // Re-adjust if layout shifts (images loading, API data rendering)
      const ro = new ResizeObserver(() => {
        scrollToHash()
      })
      
      // Observe the body for height changes
      ro.observe(document.body)

      // Stop forcing scroll after 2.5 seconds so user can scroll freely
      setTimeout(() => {
        ro.disconnect()
      }, 2500)
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
