import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import type { HappeningsPost } from '@/lib/happenings/types'

const MotionLink = motion(Link)

interface HappeningsBlogCardProps {
  post: HappeningsPost
}

export function HappeningsBlogCard({ post }: HappeningsBlogCardProps) {
  // Try to use the first tag as the category, fallback to 'UPDATE'
  const category = post.tags?.[0]?.toUpperCase() || 'UPDATE'
  
  // Format the date if it exists
  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'dd MMM yyyy')
    : 'Unknown date'

  return (
    <MotionLink
      to={`/happenings/${post.slug}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group flex h-full min-h-[400px] flex-col overflow-hidden rounded-2xl bg-[#F8F7F4] p-6 shadow-sm ring-1 ring-inset ring-plum/10 transition-shadow hover:shadow-md hover:ring-plum/20"
    >
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-plum/50">
        <div className="h-1.5 w-1.5 rounded-full bg-teal" />
        {category}
      </div>
      
      <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-plum group-hover:text-black">
        {post.title}
      </h3>
      
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum/70 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="mt-8 flex items-center justify-between text-xs font-mono text-plum/50">
        <span>{formattedDate}</span>
        <span>{post.author}</span>
      </div>
    </MotionLink>
  )
}
