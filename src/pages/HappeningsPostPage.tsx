import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { Reveal } from '@/components/Reveal'
import { getPostBySlug } from '@/lib/happenings/api'
import type { HappeningsPost } from '@/lib/happenings/types'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { articleSchema, breadcrumbSchema } from '@/lib/structuredData'

// ─── Gallery carousel ─────────────────────────────────────────────────────────
function Gallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <div className="mt-16 border-t border-plum/10 pt-12">
      <h2 className="mb-6 font-display text-2xl font-bold text-plum">Gallery</h2>
      <div className="relative overflow-hidden rounded-3xl bg-plum/5">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} gallery image ${current + 1}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="aspect-[16/9] w-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-plum shadow-lg backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-plum shadow-lg backdrop-blur-sm transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === current ? 'w-6 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative shrink-0 overflow-hidden rounded-xl transition-all ${
                i === current
                  ? 'ring-2 ring-[#FF8A65] ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${i + 1}`}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="mt-12 animate-pulse space-y-6">
      <div className="h-6 w-32 rounded-full bg-plum/10" />
      <div className="h-10 w-3/4 rounded-xl bg-plum/10" />
      <div className="h-4 w-1/2 rounded bg-plum/10" />
      <div className="aspect-[16/9] w-full rounded-3xl bg-plum/10" />
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-4 rounded bg-plum/10 ${i % 2 === 0 ? 'w-5/6' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}

// ─── Blog post layout ─────────────────────────────────────────────────────────
function BlogPostLayout({ post }: { post: HappeningsPost }) {
  const category = post.tags?.[0]?.toUpperCase() || 'UPDATE'
  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'MMMM d, yyyy')
    : null

  return (
    <article className="mt-12">
      {/* Meta header */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-plum/60">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold tracking-widest text-teal uppercase">
          <Tag className="h-3 w-3" />
          {category}
        </span>
        {formattedDate && (
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {formattedDate}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {post.author}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#1A1A1A]">
        {post.title}
      </h1>

      {/* Excerpt / lede */}
      <p className="mt-5 text-xl leading-relaxed text-plum/70 border-l-4 border-[#FF8A65] pl-5">
        {post.excerpt}
      </p>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div className="mt-10 overflow-hidden rounded-3xl shadow-card">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 border-t border-plum/10" />
        <div className="h-2 w-2 rounded-full bg-[#FF8A65]" />
        <div className="flex-1 border-t border-plum/10" />
      </div>

      {/* Body content */}
      <div className="prose prose-lg max-w-none leading-relaxed text-plum/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-plum [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-plum [&_p]:text-[17px] [&_p]:leading-8 whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-plum/10 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-plum/15 bg-plum/5 px-4 py-1.5 text-xs font-semibold text-plum/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Gallery */}
      {post.galleryUrls && post.galleryUrls.length > 0 && (
        <Gallery images={post.galleryUrls} title={post.title} />
      )}
    </article>
  )
}

// ─── Event post layout ────────────────────────────────────────────────────────
function EventPostLayout({ post }: { post: HappeningsPost }) {
  const formattedDate = post.publishedAt
    ? format(new Date(post.publishedAt), 'EEEE, MMMM d, yyyy')
    : null
  const monthDay = post.publishedAt
    ? { month: format(new Date(post.publishedAt), 'MMM').toUpperCase(), day: format(new Date(post.publishedAt), 'd') }
    : null

  // All images: cover + gallery
  const allImages = [
    ...(post.coverImageUrl ? [post.coverImageUrl] : []),
    ...(post.galleryUrls ?? []),
  ]

  return (
    <article className="mt-12">
      {/* Hero image with overlay */}
      {allImages.length > 0 ? (
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <img
            src={allImages[0]}
            alt={post.title}
            className="aspect-[21/9] w-full object-cover"
          />
          {/* Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Date badge */}
          {monthDay && (
            <div className="absolute left-6 top-6 flex flex-col items-center rounded-xl bg-white/95 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-widest text-plum/60">{monthDay.month}</span>
              <span className="text-2xl font-display font-bold leading-none text-plum">{monthDay.day}</span>
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF8A65]/90 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm">
              <Calendar className="h-3 w-3" />
              Event
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight text-white drop-shadow-md">
              {post.title}
            </h1>
          </div>
        </div>
      ) : (
        /* No image — plain header */
        <div className="rounded-3xl bg-gradient-to-br from-plum to-plum/80 p-10 text-white">
          {monthDay && (
            <div className="mb-4 inline-flex flex-col items-center rounded-xl bg-white/20 px-4 py-3 text-center backdrop-blur-sm">
              <span className="text-[10px] font-bold tracking-widest text-white/70">{monthDay.month}</span>
              <span className="text-2xl font-display font-bold leading-none text-white">{monthDay.day}</span>
            </div>
          )}
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight">
            {post.title}
          </h1>
        </div>
      )}

      {/* Event meta strip */}
      <div className="mt-6 flex flex-wrap gap-4 rounded-2xl bg-[#F8F7F4] p-5 text-sm text-plum/70">
        {formattedDate && (
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#FF8A65]" />
            <span className="font-medium">{formattedDate}</span>
          </span>
        )}
        <span className="flex items-center gap-2">
          <User className="h-4 w-4 text-[#FF8A65]" />
          <span className="font-medium">{post.author}</span>
        </span>
        {post.tags?.[0] && (
          <span className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-[#FF8A65]" />
            <span className="font-medium capitalize">{post.tags[0]}</span>
          </span>
        )}
      </div>

      {/* Excerpt / lede */}
      <p className="mt-8 text-xl leading-relaxed text-plum/70 border-l-4 border-[#FF8A65] pl-5">
        {post.excerpt}
      </p>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="flex-1 border-t border-plum/10" />
        <div className="h-2 w-2 rounded-full bg-[#FF8A65]" />
        <div className="flex-1 border-t border-plum/10" />
      </div>

      {/* Body */}
      <div className="prose prose-lg max-w-none leading-relaxed text-plum/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-plum [&_p]:text-[17px] [&_p]:leading-8 whitespace-pre-wrap">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-plum/10 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-plum/15 bg-plum/5 px-4 py-1.5 text-xs font-semibold text-plum/70"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Gallery (all images after the hero) */}
      {allImages.length > 1 && (
        <Gallery images={allImages.slice(1)} title={post.title} />
      )}
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function HappeningsPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<HappeningsPost | null | undefined>(undefined)

  useDocumentMeta({
    title: post?.title,
    description: post?.excerpt,
    path: `/happenings/${slug ?? ''}`,
    structuredData: post
      ? [
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'WISE Happenings', path: '/happenings' },
            { name: post.title, path: `/happenings/${slug ?? ''}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt,
            path: `/happenings/${slug ?? ''}`,
            image: post.coverImageUrl ?? undefined,
            author: post.author,
            datePublished: post.publishedAt ?? undefined,
          }),
        ]
      : undefined,
  })

  useEffect(() => {
    if (!slug) return
    let alive = true
    getPostBySlug(slug).then((p) => {
      if (alive) setPost(p)
    })
    return () => { alive = false }
  }, [slug])

  if (post === null) return <Navigate to="/happenings" replace />

  const backLink = post?.section === 'events' ? '/happenings?tab=events' : '/happenings?tab=blog'
  const backLabel = post?.section === 'events' ? 'Back to Events' : 'Back to Blog'

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Top nav bar */}
      <div className="sticky top-0 z-30 border-b border-plum/8 bg-white/90 backdrop-blur-md">
        <div className="container-wise flex h-14 items-center justify-between">
          <Link
            to={backLink}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/70 transition-colors hover:text-plum"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {backLabel}
          </Link>

          {post?.tags?.[0] && (
            <span className="hidden text-xs font-bold tracking-widest text-plum/40 uppercase sm:block">
              {post.tags[0]}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container-wise max-w-3xl pb-24 pt-10">
        {post === undefined ? (
          <Skeleton />
        ) : (
          <Reveal delay={0.1}>
            {post.section === 'events' ? (
              <EventPostLayout post={post} />
            ) : (
              <BlogPostLayout post={post} />
            )}


          </Reveal>
        )}
      </div>
    </main>
  )
}
