import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { BecomeAMentor } from '@/sections/BecomeAMentor'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'

export function BecomeAMentorPage() {
  useDocumentMeta({
    title: 'Become a Mentor — WISE Lab',
    description:
      'Guide women entrepreneurs through practical, hands-on mentoring support. Share expertise, open your network, and shape Pakistan\'s startup ecosystem.',
    path: '/become-a-mentor',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Become a Mentor', path: '/become-a-mentor' },
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
        <BecomeAMentor />
      </main>
      <Footer />
    </>
  )
}
