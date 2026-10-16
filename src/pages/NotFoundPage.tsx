import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta({
    title: 'Page Not Found — WISE Lab',
    description: 'The page you are looking for does not exist.',
    path: '/404',
  })

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-plum/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-coral/10 blur-2xl"
      />

      <div className="relative z-10 max-w-lg">
        {/* Big 404 */}
        <Reveal>
          <p className="font-display text-[clamp(6rem,20vw,10rem)] font-bold leading-none tracking-tight text-plum/10 select-none">
            404
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight text-black">
            This page doesn't exist.
          </h1>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 text-[17px] leading-relaxed text-plum/60">
            The URL you typed or followed isn't part of the WISE Lab website.
            Head back and explore what we have for you.
          </p>
        </Reveal>

        {/* Actions */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              id="not-found-go-home"
              className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-plum/90 hover:shadow-md active:scale-95"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
