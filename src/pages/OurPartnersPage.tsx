import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { PowerCircle } from '@/sections/PowerCircle'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'

export function OurPartnersPage() {
  useDocumentMeta({
    title: 'Our Partners — WISE Lab',
    description:
      'Meet the consortium of partners powering WISE Lab: JazzWorld, Mobilink Bank, Change Mechanics, MoITT, and Ignite.',
    path: '/our-partners',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Our Partners', path: '/our-partners' },
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
        <PowerCircle />
      </main>
      <Footer />
    </>
  )
}
