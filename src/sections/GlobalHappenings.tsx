import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { listPublishedPosts } from '@/lib/happenings/api'
import type { HappeningsPost } from '@/lib/happenings/types'
import { HappeningsBlogCard } from '@/components/happenings/HappeningsBlogCard'
import { HappeningsEventCard } from '@/components/happenings/HappeningsEventCard'

type TabType = 'blog' | 'events'

export function GlobalHappenings() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('blog')
  const [posts, setPosts] = useState<HappeningsPost[]>([])
  const [loading, setLoading] = useState(true)

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

  const filteredPosts = posts.filter((post) => 
    activeTab === 'events' ? post.section === 'events' : post.section !== 'events'
  ).slice(0, 4) // Show top 4 posts

  return (
    <section id="happenings" className="relative overflow-hidden bg-white py-24 md:py-32 border-t border-plum/10">
      <div className="container-wise relative mx-auto max-w-6xl">
        <Reveal>
          {/* Breadcrumb & Title row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{t('journal.latestFrom', 'Happenings')}</p>
              <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[#1A1A1A]">
                Latest updates
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Tabs Row */}
        <div className="mt-16 flex items-center justify-between border-b border-plum/10 pb-4">
          <div className="flex items-center gap-8 text-[13px] font-bold tracking-wider text-plum/50">
            <button
              onClick={() => setActiveTab('blog')}
              className={`relative pb-4 transition-colors hover:text-plum ${
                activeTab === 'blog' ? 'text-plum' : ''
              }`}
            >
              Blog
              {activeTab === 'blog' && (
                <motion.div
                  layoutId="global-tab-indicator"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#B85C38]"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`relative pb-4 transition-colors hover:text-plum ${
                activeTab === 'events' ? 'text-plum' : ''
              }`}
            >
              Events
              {activeTab === 'events' && (
                <motion.div
                  layoutId="global-tab-indicator"
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

        {/* Content Area */}
        <div className="mt-12">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-plum/20 border-t-plum" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredPosts.length === 0 ? (
                  <p className="rounded-2xl border border-plum/10 bg-white/60 p-6 text-sm text-plum/60">
                    No {activeTab} posts found.
                  </p>
                ) : (
                  <>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {filteredPosts.map((post) =>
                        activeTab === 'blog' ? (
                          <HappeningsBlogCard key={post.id} post={post} />
                        ) : (
                          <HappeningsEventCard key={post.id} post={post} />
                        )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex justify-center">
            <Link
              to={activeTab === 'blog' ? '/happenings?tab=blog' : '/happenings?tab=events'}
              className="group flex items-center gap-2 rounded-full bg-[#FF8A65] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E67C5B]"
            >
              {activeTab === 'blog' ? 'Browse all Blog' : 'Browse all Events'}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
