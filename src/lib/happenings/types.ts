export type HappeningsSection = 'happenings' | 'events' | 'testimonials'

export interface HappeningsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImageUrl: string | null
  author: string
  publishedAt: string | null
  status: 'draft' | 'published'
  tags: string[]
  galleryUrls: string[]
  section: HappeningsSection | null
}
