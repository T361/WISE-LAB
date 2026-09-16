import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { listPublishedPosts } from '@/lib/happenings/api'
import type { HappeningsPost } from '@/lib/happenings/types'
import { isSupabaseConfigured } from '@/lib/supabase'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'
import { HappeningsBlogCard } from '@/components/happenings/HappeningsBlogCard'
import { HappeningsEventCard } from '@/components/happenings/HappeningsEventCard'

type TabType = 'blog' | 'events'

export function HappeningsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as TabType | null
  const [activeTab, setActiveTab] = useState<TabType>(tabParam === 'events' ? 'events' : 'blog')
  const [posts, setPosts] = useState<HappeningsPost[]>([])
  const [loading, setLoading] = useState(true)

  useDocumentMeta({
    title: activeTab === 'events' ? 'Events — WISE Lab' : 'Blog — WISE Lab',
    description:
      'Research notes, field reports, and the calendar of what is happening next — everything the lab has published, and everything still to come.',
    path: '/happenings',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'WISE Happenings', path: '/happenings' },
    ]),
  })

  // Sync tab from URL
  useEffect(() => {
    const t = searchParams.get('tab') as TabType | null
    if (t === 'events' || t === 'blog') setActiveTab(t)
  }, [searchParams])

  useEffect(() => {
    let alive = true
    listPublishedPosts().then((p) => {
      if (alive) {
        setPosts(p)
        setLoading(false)
      }
    })
    return () => { alive = false }
  }, [])

  const filteredPosts = posts.filter((post) =>
    activeTab === 'events' ? post.section === 'events' : post.section !== 'events'
  )

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white py-16 md:py-24">
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

          {/* Header */}
          <h1 className="mt-8 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]">
            {activeTab === 'blog' ? 'All Blog Posts' : 'All Events'}
          </h1>
        </Reveal>

        {/* Tabs */}
        <div className="mt-16 flex items-center justify-between border-b border-plum/10 pb-4">
          <div className="flex items-center gap-8 text-[13px] font-bold tracking-wider text-plum/50">
            <button
              onClick={() => handleTabChange('blog')}
              className={`relative pb-4 transition-colors hover:text-plum ${activeTab === 'blog' ? 'text-plum' : ''}`}
            >
              Blog
              {activeTab === 'blog' && (
                <motion.div
                  layoutId="list-tab-indicator"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#B85C38]"
                />
              )}
            </button>
            <button
              onClick={() => handleTabChange('events')}
              className={`relative pb-4 transition-colors hover:text-plum ${activeTab === 'events' ? 'text-plum' : ''}`}
            >
              Events
              {activeTab === 'events' && (
                <motion.div
                  layoutId="list-tab-indicator"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#B85C38]"
                />
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold tracking-widest text-plum/50 uppercase">
            <div className="h-1.5 w-1.5 rounded-full bg-plum/40" />
            UPDATED THIS WEEK
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-12">
          {!isSupabaseConfigured && (
            <p className="rounded-2xl border border-plum/10 bg-plum/5 p-6 text-sm text-plum/60">
              Supabase is not configured. Please set it up to view happenings.
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
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredPosts.length === 0 ? (
                  <p className="rounded-2xl border border-plum/10 bg-plum/5 p-6 text-sm text-plum/60">
                    No {activeTab} posts found yet.
                  </p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {filteredPosts.map((post) =>
                      activeTab === 'blog' ? (
                        <HappeningsBlogCard key={post.id} post={post} />
                      ) : (
                        <HappeningsEventCard key={post.id} post={post} />
                      )
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </main>
  )
}
