import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload, ImageIcon, X } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { listAllPostsForAdmin, upsertPost } from '@/lib/happenings/api'
import type { HappeningsPost } from '@/lib/happenings/types'
import { getSupabase } from '@/lib/supabase'

const STORAGE_BUCKET = 'happenings-images'

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const EMPTY: Omit<HappeningsPost, 'id'> = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  coverImageUrl: null,
  author: '',
  publishedAt: null,
  status: 'draft',
  tags: [],
  galleryUrls: [],
  section: 'happenings',
}

export function AdminHappeningsEditorPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'new'
  const [post, setPost] = useState<Omit<HappeningsPost, 'id'> & { id?: string }>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadGalleryError, setUploadGalleryError] = useState<string | null>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isNew) return
    listAllPostsForAdmin().then((posts) => {
      const found = posts.find((p) => p.id === id)
      if (found) setPost({ ...EMPTY, ...found }) // ensure galleryUrls exists if missing from old records
      setLoading(false)
    })
  }, [id, isNew])

  const onSave = async (status: 'draft' | 'published') => {
    setSaving(true)
    try {
      const slug = post.slug || slugify(post.title)
      await upsertPost({ ...post, slug, status })
      navigate('/admin/happenings')
    } finally {
      setSaving(false)
    }
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase is not configured.')

      const ext = file.name.split('.').pop() ?? 'jpg'
      const base = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .toLowerCase()
      const filename = `${base}-${Date.now()}.${ext}`

      const { error: uploadErr } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filename, file, { upsert: true, contentType: file.type })

      if (uploadErr) throw uploadErr

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filename)
      setPost((p) => ({ ...p, coverImageUrl: data.publicUrl }))
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : 'Upload failed. Please try again.'
      )
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const onGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    setUploadingGallery(true)
    setUploadGalleryError(null)

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase is not configured.')

      const uploadedUrls: string[] = []

      for (const file of files) {
        const ext = file.name.split('.').pop() ?? 'jpg'
        const base = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9_-]/g, '-')
          .toLowerCase()
        const filename = `${base}-${Date.now()}.${ext}`

        const { error: uploadErr } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filename, file, { upsert: true, contentType: file.type })

        if (uploadErr) throw uploadErr

        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filename)
        uploadedUrls.push(data.publicUrl)
      }

      setPost((p) => ({ ...p, galleryUrls: [...p.galleryUrls, ...uploadedUrls] }))
    } catch (err) {
      setUploadGalleryError(
        err instanceof Error ? err.message : 'Upload failed. Please try again.'
      )
    } finally {
      setUploadingGallery(false)
      if (galleryInputRef.current) galleryInputRef.current.value = ''
    }
  }

  const isEvent = post.section === 'events'

  if (loading) return <p className="text-plum/50">Loading…</p>

  return (
    <Reveal className="max-w-2xl pb-24">
      <h1 className="font-display text-2xl font-bold text-plum sm:text-3xl">
        {isNew ? 'New post' : 'Edit post'}
      </h1>

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="section">Category / Section</Label>
          <Select
            value={post.section ?? 'happenings'}
            onValueChange={(value) =>
              setPost({ ...post, section: value as HappeningsPost['section'] })
            }
          >
            <SelectTrigger id="section">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="happenings">Standard Happenings Post</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-plum/50">
            Categorize your post. Events have simplified fields and support image galleries.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">{isEvent ? 'Event Title' : 'Title'}</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder={isEvent ? 'e.g. Annual Founders Summit' : ''}
          />
        </div>
        
        {!isEvent && (
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })}
              placeholder={slugify(post.title) || 'auto-generated-from-title'}
            />
          </div>
        )}
        
        {!isEvent && (
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={post.author}
              onChange={(e) => setPost({ ...post, author: e.target.value })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Cover image {isEvent ? '(Main Event Photo)' : ''}</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start mt-2">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-plum/10 bg-plum/5">
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt="Preview"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <ImageIcon className="h-6 w-6 text-plum/30" />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  id="photo-upload"
                  onChange={onFileChange}
                  disabled={uploading}
                />
                <label
                  htmlFor="photo-upload"
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                    uploading
                      ? 'border-plum/10 bg-plum/5 text-plum/40 cursor-wait'
                      : 'border-plum/20 bg-white text-plum hover:border-teal hover:bg-teal/5 hover:text-teal'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? 'Uploading…' : 'Upload Cover Photo'}
                </label>
              </div>

              {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}

              <Input
                value={post.coverImageUrl ?? ''}
                onChange={(e) => setPost({ ...post, coverImageUrl: e.target.value || null })}
                placeholder="Or paste a URL..."
                className="text-xs"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Image Gallery {isEvent ? '(Additional Event Photos)' : ''}</Label>
          <div className="flex flex-col gap-3 mt-2">
            
            <div className="flex items-center gap-2">
              <input
                ref={galleryInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                id="gallery-upload"
                onChange={onGalleryFileChange}
                disabled={uploadingGallery}
              />
              <label
                htmlFor="gallery-upload"
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                  uploadingGallery
                    ? 'border-plum/10 bg-plum/5 text-plum/40 cursor-wait'
                    : 'border-plum/20 bg-white text-plum hover:border-teal hover:bg-teal/5 hover:text-teal'
                }`}
              >
                <Upload className="h-4 w-4" />
                {uploadingGallery ? 'Uploading…' : 'Upload Gallery Photos'}
              </label>
            </div>

            {uploadGalleryError && <p className="text-xs text-destructive">{uploadGalleryError}</p>}

            {/* Gallery Preview */}
            {post.galleryUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {post.galleryUrls.map((url, i) => (
                  <div key={i} className="relative group aspect-square rounded-2xl overflow-hidden border border-plum/10 bg-plum/5">
                    <img src={url} alt="Gallery item" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPost(p => ({ ...p, galleryUrls: p.galleryUrls.filter((_, index) => index !== i) }))}
                      className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>


        <div className="space-y-2">
          <Label htmlFor="excerpt">{isEvent ? 'Description (Excerpt)' : 'Excerpt'}</Label>
          <Textarea
            id="excerpt"
            value={post.excerpt}
            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            placeholder={isEvent ? 'A short description of the event to show on the highlight...' : ''}
          />
        </div>
        
        {!isEvent && (
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="min-h-[320px]"
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button onClick={() => onSave('draft')} disabled={saving || uploading || uploadingGallery} variant="outline">
            Save draft
          </Button>
          <Button onClick={() => onSave('published')} disabled={saving || uploading || uploadingGallery}>
            Publish
          </Button>
        </div>
      </div>
    </Reveal>
  )
}
