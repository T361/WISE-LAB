import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { HappeningsPost } from '@/lib/happenings/types'

const MotionLink = motion(Link)

interface HappeningsEventCardProps {
  post: HappeningsPost
}

export function HappeningsEventCard({ post }: HappeningsEventCardProps) {
  const images = post.galleryUrls?.length ? post.galleryUrls : (post.coverImageUrl ? [post.coverImageUrl] : [])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Format date for badge (e.g., "OCT 18")
  let month = 'TBD'
  let day = '--'
  if (post.publishedAt) {
    const date = new Date(post.publishedAt)
    month = format(date, 'MMM').toUpperCase()
    day = format(date, 'dd')
  }

  return (
    <MotionLink
      to={`/happenings/${post.slug}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl bg-[#F8F7F4] shadow-sm ring-1 ring-inset ring-plum/10 transition-shadow hover:shadow-md hover:ring-plum/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-plum/5">
        {/* Date Badge */}
        <div className="absolute left-4 top-4 z-20 flex flex-col items-center justify-center rounded-lg bg-[#F8F7F4] px-3 py-2 text-center shadow-sm">
          <span className="text-[10px] font-bold tracking-widest text-plum/60">{month}</span>
          <span className="text-xl font-display font-bold text-plum">{day}</span>
        </div>

        {/* Carousel Images */}
        {images.length > 0 ? (
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={post.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-plum/10 text-plum/30">
            No Image
          </div>
        )}

        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-plum backdrop-blur-sm transition-colors hover:bg-white md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-plum backdrop-blur-sm transition-colors hover:bg-white md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    idx === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-plum group-hover:text-black">
          {post.title}
        </h3>
        
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum/70 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </MotionLink>
  )
}
