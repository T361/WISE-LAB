import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { BehindTheWings } from '@/sections/BehindTheWings'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'

export function BehindTheWingsPage() {
  useDocumentMeta({
    title: 'Behind the Wings — WISE Lab',
    description:
      'Meet the multidisciplinary WISE Lab team driving incubation, entrepreneurship development, partnerships, communications, and ecosystem engagement.',
    path: '/behind-the-wings',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Behind the Wings', path: '/behind-the-wings' },
    ]),
  })

  return (
    <>
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <main className="relative min-h-screen bg-white">
        <div className="container-wise pt-4 md:pt-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to WISE Lab
          </Link>
        </div>
        <BehindTheWings />
      </main>
      <Footer />
    </>
  )
}
