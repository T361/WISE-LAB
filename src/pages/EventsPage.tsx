import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { Reveal } from '@/components/Reveal'
import { listPublishedPosts } from '@/lib/happenings/api'
import type { HappeningsPost } from '@/lib/happenings/types'
import { isSupabaseConfigured } from '@/lib/supabase'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'
import { HappeningsEventCard } from '@/components/happenings/HappeningsEventCard'

export function EventsPage() {
  const [posts, setPosts] = useState<HappeningsPost[]>([])
  const [loading, setLoading] = useState(true)

  useDocumentMeta({
    title: 'Events — WISE Lab',
    description:
      'Upcoming and past events, cohort pitch days, workshops, and gatherings from the WISE Lab community.',
    path: '/events',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Events', path: '/events' },
    ]),
  })

  useEffect(() => {
    let alive = true
    listPublishedPosts().then((p) => {
      if (alive) {
        setPosts(p)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  const eventPosts = posts.filter((post) => post.section === 'events')

  return (
    <>
      <div className="sticky top-0 z-50">
        <Nav />
      </div>

      <main className="relative min-h-screen w-full overflow-hidden bg-white pt-4 pb-20 md:pt-6 md:pb-28">
        <div className="container-wise relative mx-auto max-w-6xl">
          <Reveal>
            {/* Back link */}
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to WISE Lab
            </Link>

            {/* Header row with switch to Blog */}
            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="eyebrow inline-flex items-center gap-1.5" style={{ color: '#2C7A70' }}>
                  <Calendar className="h-3.5 w-3.5" />
                  Happenings
                </span>
                <h1 className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]">
                  Events
                </h1>
                <p className="mt-3 max-w-xl text-base text-plum/70">
                  Workshops, pitch days, community meetups, and ecosystem showcases where women founders connect and grow.
                </p>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF8A65] transition-colors hover:text-[#e67c5b]"
              >
                Explore Blog Stories
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          {/* Events Grid */}
          <div className="mt-12">
            {!isSupabaseConfigured && (
              <p className="rounded-2xl border border-plum/10 bg-plum/5 p-6 text-sm text-plum/60">
                Supabase is not configured. Please set it up to view events.
              </p>
            )}

            {isSupabaseConfigured && loading && (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-plum/20 border-t-plum" />
              </div>
            )}

            {isSupabaseConfigured && !loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {eventPosts.length === 0 ? (
                    <div className="rounded-2xl border border-plum/10 bg-[#FAFAFA] p-10 text-center text-plum/60">
                      <p className="font-display text-lg font-medium text-plum">No events scheduled at the moment.</p>
                      <p className="mt-1.5 text-sm">Stay tuned or check our blog for recent announcements.</p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {eventPosts.map((post) => (
                        <HappeningsEventCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
