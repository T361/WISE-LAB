import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useSectionPosts } from '@/lib/happenings/useSectionPosts'

const MotionLink = motion(Link)

export function EventsHighlight() {
  const posts = useSectionPosts('events')
  
  // Just show the latest event for the highlight
  const latestEvent = posts[0]

  if (!latestEvent) return null

  return (
    <section className="relative mt-8 mb-16 overflow-hidden rounded-[2.5rem] bg-plum text-white shadow-xl">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      
      <div className="grid md:grid-cols-2 min-h-[400px]">
        {/* Text Content */}
        <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16 z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-teal backdrop-blur-md">
              <Calendar className="h-4 w-4" />
              <span>Upcoming Event</span>
            </div>
            
            <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {latestEvent.title}
            </h2>
            
            <p className="mt-6 text-lg leading-relaxed text-white/80 line-clamp-3">
              {latestEvent.excerpt}
            </p>
            
            <MotionLink
              to={`/happenings/${latestEvent.slug}`}
              whileHover={{ x: 5 }}
              className="mt-10 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-white transition-opacity hover:opacity-80"
            >
              <span className="border-b border-teal pb-0.5">Explore Event</span>
              <ArrowUpRight className="h-4 w-4 text-teal" />
            </MotionLink>
          </Reveal>
        </div>
        
        {/* Image */}
        {latestEvent.coverImageUrl ? (
          <div className="relative h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-plum to-transparent z-10" />
            <motion.img
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={latestEvent.coverImageUrl}
              alt={latestEvent.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="relative h-64 md:h-auto bg-white/5 flex items-center justify-center">
             <Calendar className="h-24 w-24 text-white/10" />
          </div>
        )}
      </div>
    </section>
  )
}
