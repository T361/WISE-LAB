import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema } from '@/lib/structuredData'

const GOALS = [
  'Incubate women-led technology startups through structured six-month cohorts.',
  'Support at least 20 startups to successfully graduate each year, subject to the approved cohort and programme structure.',
  'Build a five-year pipeline of approximately 100 women-led startup graduates.',
  'Train 1,000 women entrepreneurs and micro-enterprises nationwide, with a target of approximately 200 participants annually.',
  'Connect participants with experienced mentors, investors, corporations, financial institutions, government bodies, universities, and ecosystem partners.',
  'Create direct pathways to finance, markets, digital adoption, partnerships, and business growth.',
  'Increase the visibility and investment readiness of women-led enterprises through investor summits, demo days, showcases, and strategic networking platforms.',
]

export function MissionPage() {
  useDocumentMeta({
    title: 'Our Mission',
    description:
      "WISE Lab's mission: empowering women entrepreneurs, startups, and MSMEs with incubation, training, mentorship, and market access.",
    path: '/mission',
    structuredData: breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Our Mission', path: '/mission' },
    ]),
  })
  return (
    <main className="relative min-h-screen overflow-hidden bg-white py-16 pb-32 md:py-24 md:pb-32">
      <div className="container-wise relative max-w-3xl">
        <Reveal>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to WISE Lab
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="mt-10">
            <p className="eyebrow" style={{ color: '#E38470' }}>
              The WISE Way
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.05] text-black">
              Our Mission
            </h1>

            <div className="prose prose-plum mt-8 max-w-none space-y-6 text-[17px] leading-relaxed text-plum/80">
              <p>
                WISE Lab's mission is to identify, incubate, train, and empower women entrepreneurs through structured business development, technology enablement, mentorship, investment readiness, and access-to-market opportunities.
              </p>
              <p className="font-semibold text-black">
                Across its five-year mandate, WISE Lab will:
              </p>
              <ul className="list-disc space-y-3 pl-5 marker:text-coral">
                {GOALS.map((goal, i) => (
                  <li key={i}>{goal}</li>
                ))}
              </ul>
              <p>
                WISE Lab is designed to help women move beyond participation towards measurable enterprise growth, stronger revenues, sustainable employment, and long-term economic impact.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </main>
  )
}
