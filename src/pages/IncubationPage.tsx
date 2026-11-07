import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema, courseSchema } from '@/lib/structuredData'

const DESCRIPTION =
  'A structured six-month incubation for women-led, technology-enabled startups ready to validate, strengthen, launch, or scale.'

export function IncubationPage() {
  useDocumentMeta({
    title: 'Incubation',
    description: DESCRIPTION,
    path: '/incubation',
    structuredData: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Incubation', path: '/incubation' },
      ]),
      courseSchema({ name: 'Incubation', description: DESCRIPTION, path: '/incubation' }),
    ],
  })
  return (
    <main
      className="relative min-h-screen overflow-hidden bg-white py-16 pb-32 md:py-24 md:pb-32"
    >
      <div className="grain" />
      <div className="container-wise relative max-w-3xl">
        <Reveal>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-plum/60 transition-colors hover:text-plum"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {'Back to WISE Lab'}
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="mt-10">
            <p className="eyebrow" style={{ color: '#2E7D7B' }}>
              {'Track One · Women-Led Startup Incubation'}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.05] text-black">
              {'Incubation'}
            </h1>
            <p className="mt-3 font-display text-xl italic text-plum/70">
              {'From an Early Idea to an Investment-Ready Enterprise'}
            </p>

            <div className="prose prose-plum mt-8 max-w-none space-y-6 text-[17px] leading-relaxed text-plum/80">
              <p>
                {'The WISE Lab Incubation Track is a structured six-month programme for women-led, technology-enabled startups seeking to validate, strengthen, launch, or scale their ventures.'}
              </p>
              <p>
                {'The programme is designed for founders with an innovative idea, minimum viable product, early-stage startup, or an existing venture ready for accelerated growth.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Programme Scale'}
              </h2>
              <p>{'Over the five-year project period, WISE Lab will operate recurring incubation cohorts with the mandate to support:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'20 successful startup graduates annually'}</li>
                <li>{'Approximately 100 women-led startup graduates over five years'}</li>
                <li>{'Startups operating in technology and technology-enabled sectors'}</li>
                <li>{'Founders from Islamabad and across Pakistan, including eligible diaspora-led ventures where applicable'}</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-black">
                {'What Selected Startups Will Receive'}
              </h2>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Structured Incubation'}
              </h3>
              <p>
                {'A focused six-month growth journey covering business modelling, product validation, customer discovery, operations, revenue planning, branding, financial management, governance, and scale strategy.'}
              </p>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Real-Time Mentorship'}
              </h3>
              <p>
                {'Direct access to experienced founders, sector specialists, technology experts, business leaders, investors, legal advisers, financial professionals, and ecosystem practitioners.'}
              </p>
              <p>
                {"Mentorship will be aligned with each startup's stage, sector, challenges, and growth objectives rather than delivered as generic classroom instruction."}
              </p>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Investment Readiness'}
              </h3>
              <p>{'Support in developing:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'Investor-ready pitch decks'}</li>
                <li>{'Financial projections and valuation fundamentals'}</li>
                <li>{'Business and revenue models'}</li>
                <li>{'Data rooms and due-diligence documentation'}</li>
                <li>{'Investment narratives'}</li>
                <li>{'Funding strategies'}</li>
                <li>{'Negotiation and pitching skills'}</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Investor Summits and Demo Days'}
              </h3>
              <p>
                {'Graduating startups will receive opportunities to present their businesses through WISE Lab investor summits, demo days, startup showcases, and curated pitching sessions.'}
              </p>
              <p>{'These platforms will bring together:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'Angel investors'}</li>
                <li>{'Venture capital firms'}</li>
                <li>{'Corporate innovation teams'}</li>
                <li>{'Banks and financial institutions'}</li>
                <li>{'Development-sector funders'}</li>
                <li>{'Government stakeholders'}</li>
                <li>{'Diaspora investors'}</li>
                <li>{'Industry leaders and strategic partners'}</li>
              </ul>
              <p>
                {'The objective is to help startups attract investment, secure strategic partnerships, identify pilot opportunities, and strengthen their market credibility.'}
              </p>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Startup Grant Opportunity'}
              </h3>
              <p>
                {'Under the approved programme framework, selected high-performing graduates may become eligible for startup grant support.'}
              </p>
              <p>{'Subject to confirmation from the final RFP and approved grant mechanism:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'Up to five startups from the eligible graduating cohort may receive a grant of PKR 2 million each.'}</li>
                <li>{'Grant selection may be based on performance, innovation potential, commercial viability, programme participation, investment readiness, and evaluation by the designated selection committee.'}</li>
                <li>{'Graduation from incubation will not automatically guarantee grant funding.'}</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Market Access'}
              </h3>
              <p>
                {'Startups will be connected with relevant corporations, distribution networks, universities, government institutions, industry associations, digital platforms, and commercial partners.'}
              </p>
              <p>{'Market-access support may include:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'Business-to-business introductions'}</li>
                <li>{'Corporate pilot opportunities'}</li>
                <li>{'Product showcases'}</li>
                <li>{'Partnership matchmaking'}</li>
                <li>{'Procurement-readiness support'}</li>
                <li>{'Customer discovery opportunities'}</li>
                <li>{'Access to national and regional events'}</li>
                <li>{"Visibility through WISE Lab's communication and media platforms"}</li>
              </ul>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Technology and Digital Enablement'}
              </h3>
              <p>
                {'Participants will receive support in strengthening their digital products, technology adoption, online visibility, data use, cybersecurity awareness, digital marketing, and platform-based growth.'}
              </p>

              <h3 className="font-display text-lg font-semibold text-black">
                {'Ecosystem Exposure'}
              </h3>
              <p>
                {'Founders will become part of a wider entrepreneurial community supported by MoITT, Ignite, Jazz, Mobilink Bank, Change Mechanics, universities, industry leaders, development partners, mentors, and investors.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Who Should Apply?'}
              </h2>
              <p>{'The Incubation Track is suited to women who:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-teal">
                <li>{'Have an innovative or technology-enabled business idea'}</li>
                <li>{'Are developing an MVP or prototype'}</li>
                <li>{'Have launched an early-stage startup'}</li>
                <li>{'Are generating early revenue and want to scale'}</li>
                <li>{'Need structured mentorship and business support'}</li>
                <li>{'Are seeking investment or strategic partnerships'}</li>
                <li>{'Want access to corporate, investor, government, and market networks'}</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-black">
                {'The Outcome'}
              </h2>
              <p>
                {'By graduation, participating startups should have a clearer business model, stronger market validation, improved financial and operational systems, greater investment readiness, and a practical pathway towards revenue growth and scale.'}
              </p>

              <blockquote className="border-l-2 border-teal pl-6 font-display text-xl font-medium italic text-plum">
                {'Pakistan’s next big founder may not look like a founder yet.'}
              </blockquote>
            </div>
          </article>
        </Reveal>
      </div>
    </main>
  )
}
