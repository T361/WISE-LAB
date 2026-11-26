import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lightbulb, Users, TrendingUp, Globe, Rocket, Award, Building2, Handshake } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema, courseSchema } from '@/lib/structuredData'
import { ApplicationsClosedModal } from '@/components/ApplicationsClosedModal'

const DESCRIPTION =
  'A structured six-month incubation for women-led, technology-enabled startups ready to validate, strengthen, launch, or scale.'

/* ─── Data ──────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '6', unit: 'Months', label: 'Structured Programme' },
  { value: '20', unit: 'Startups', label: 'Supported Annually' },
  { value: '100+', unit: 'Graduates', label: 'Over Five Years' },
  { value: 'PKR 2M', unit: 'Grant', label: 'Per Selected Startup' },
]

const JOURNEY_STEPS = [
  {
    num: '01',
    title: 'Apply',
    description:
      'Submit your online application. Shortlisted candidates are invited for an assessment with our selection panel of industry experts and ecosystem partners.',
  },
  {
    num: '02',
    title: 'Pitch Day',
    description:
      'Present your venture to WISE Lab management, investors, and industry stakeholders. Selected founders join the next cohort.',
  },
  {
    num: '03',
    title: 'Incubate',
    description:
      'Six months of structured mentorship, workshops, investor readiness training, market access, and hands-on support — all tailored to your startup\'s stage.',
  },
  {
    num: '04',
    title: 'Graduate',
    description:
      'Demo Day and investor summits connect you with angels, VCs, corporates, and strategic partners. High-performers may qualify for a PKR 2M startup grant.',
  },
]

const BENEFITS = [
  {
    icon: Lightbulb,
    color: '#2E7D7B',
    bg: '#E8F5F4',
    title: 'Structured Incubation',
    description:
      'Six-month journey covering business modelling, product validation, customer discovery, revenue planning, branding, financial management, and scale strategy.',
  },
  {
    icon: Users,
    color: '#4A2E3D',
    bg: '#F3EDF0',
    title: 'Real-Time Mentorship',
    description:
      'Direct access to experienced founders, sector specialists, investors, legal advisers, and financial professionals — aligned to your specific stage and sector.',
  },
  {
    icon: TrendingUp,
    color: '#2E7D7B',
    bg: '#E8F5F4',
    title: 'Investment Readiness',
    description:
      'Build investor-ready pitch decks, financial projections, valuation models, data rooms, and funding strategies with expert guidance.',
  },
  {
    icon: Rocket,
    color: '#4A2E3D',
    bg: '#F3EDF0',
    title: 'Demo Days & Summits',
    description:
      'Present to angel investors, VC firms, corporate innovation teams, development-sector funders, and diaspora investors at curated WISE Lab events.',
  },
  {
    icon: Globe,
    color: '#2E7D7B',
    bg: '#E8F5F4',
    title: 'Market Access',
    description:
      'B2B introductions, corporate pilot opportunities, product showcases, partnership matchmaking, and visibility through WISE Lab media platforms.',
  },
  {
    icon: Building2,
    color: '#4A2E3D',
    bg: '#F3EDF0',
    title: 'Technology & Digital Enablement',
    description:
      'Strengthen your digital product, technology adoption, online visibility, data use, cybersecurity awareness, and platform-based growth.',
  },
  {
    icon: Award,
    color: '#2E7D7B',
    bg: '#E8F5F4',
    title: 'Startup Grant Opportunity',
    description:
      'Up to five high-performing graduates may receive a PKR 2 million grant, subject to performance, innovation potential, and the designated selection committee.',
  },
  {
    icon: Handshake,
    color: '#4A2E3D',
    bg: '#F3EDF0',
    title: 'Ecosystem Exposure',
    description:
      'Join a community backed by MoITT, Ignite, Jazz, Mobilink Bank, Change Mechanics, universities, industry leaders, development partners, and investors.',
  },
]

const WHO_FOR = [
  'Have an innovative or technology-enabled business idea',
  'Are developing an MVP or prototype',
  'Have launched an early-stage startup',
  'Are generating early revenue and want to scale',
  'Need structured mentorship and business support',
  'Are seeking investment or strategic partnerships',
  'Want access to corporate, investor, government, and market networks',
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export function IncubationPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

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
    <>
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="grain" />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#86D2D5] pb-0 pt-4 md:pt-6">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#2E7D7B]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full bg-[#2E7D7B]/15 blur-3xl" />

        <div className="container-wise relative max-w-5xl pb-16 md:pb-24">
          <Reveal>
            <Link
              to="/"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-black/60 transition-colors hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to WISE Lab
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <span className="inline-block rounded-full border border-black/20 bg-black/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-black">
              Track One · Women-Led Startup Incubation
            </span>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.03] text-black">
              Incubation
            </h1>
            <p className="mt-4 max-w-xl font-display text-lg italic text-black md:text-xl">
              From an Early Idea to an Investment-Ready Enterprise
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-black">
              The WISE Lab Incubation Track is a structured six-month programme for women-led,
              technology-enabled startups seeking to validate, strengthen, launch, or scale their
              ventures.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#2E7D7B] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2E7D7B]/30 transition-all hover:bg-[#245f5d] hover:shadow-[#2E7D7B]/50 cursor-pointer"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#journey"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/30 px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-white/50"
              >
                See the Journey
              </a>
            </div>
          </Reveal>
        </div>

        {/* wave divider */}
        <div className="relative h-16 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-full w-full"
            fill="white"
          >
            <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <section className="border-b border-plum/8 bg-white py-12">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="group flex flex-col items-center gap-1 rounded-2xl border border-plum/8 bg-[#f8f4f1] px-4 py-6 text-center transition-shadow hover:shadow-card"
                >
                  <span className="font-display text-[2rem] font-bold leading-none text-[#2E7D7B]">
                    {s.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-plum/50">
                    {s.unit}
                  </span>
                  <span className="mt-1 text-[13px] text-plum/70">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow" style={{ color: '#2E7D7B' }}>
                  About the Programme
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-plum md:text-4xl">
                  Built for Women Who Build the Future
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[16px] leading-relaxed text-plum/75">
                <p>
                  The programme is designed for founders with an innovative idea, minimum viable
                  product, early-stage startup, or an existing venture ready for accelerated growth.
                </p>
                <p>
                  Over the five-year project period, WISE Lab will operate recurring incubation
                  cohorts supporting{' '}
                  <strong className="text-plum">20 successful startup graduates annually</strong> —
                  approximately 100 women-led startup graduates over five years — operating in
                  technology and technology-enabled sectors across Pakistan.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── JOURNEY STEPS ───────────────────────────────────────────── */}
      <section id="journey" className="bg-[#f8f4f1] py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow" style={{ color: '#2E7D7B' }}>
                Your Path to Investment-Ready
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                The Startup Journey
              </h2>
            </div>
          </Reveal>

          {/* steps — alternating layout on desktop */}
          <div className="relative">
            {/* vertical connector line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#2E7D7B]/30 via-[#2E7D7B]/60 to-[#2E7D7B]/10 md:block" />

            <div className="flex flex-col gap-10 md:gap-0">
              {JOURNEY_STEPS.map((step, i) => {
                const isEven = i % 2 === 0
                return (
                  <Reveal key={step.num} delay={i * 0.1}>
                    <div
                      className={`relative flex flex-col gap-6 md:flex-row md:items-center md:gap-0 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* card */}
                      <div className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                        <div className="rounded-2xl border border-plum/8 bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover">
                          <span className="font-display text-5xl font-bold leading-none text-[#2E7D7B]/20">
                            {step.num}
                          </span>
                          <h3 className="mt-3 font-display text-xl font-bold text-plum">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-[15px] leading-relaxed text-plum/65">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* centre dot */}
                      <div className="hidden md:flex md:w-20 md:shrink-0 md:items-center md:justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#2E7D7B] shadow-lg">
                          <span className="text-xs font-bold text-white">{step.num}</span>
                        </div>
                      </div>

                      {/* spacer on other side */}
                      <div className="hidden w-[calc(50%-40px)] md:block" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU RECEIVE (BENEFIT CARDS) ─────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow" style={{ color: '#2E7D7B' }}>
                What Selected Startups Will Receive
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                Full-Spectrum Support
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-plum/60">
                Every element is designed to take you from early idea to market-ready, funded, and
                connected startup.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon
              return (
                <Reveal key={b.title} delay={i * 0.06}>
                  <div className="group flex h-full flex-col rounded-2xl border border-plum/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: b.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: b.color }} />
                    </div>
                    <h3 className="font-display text-[15px] font-bold text-plum">{b.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-plum/60">
                      {b.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHO SHOULD APPLY ─────────────────────────────────────────── */}
      <section className="bg-[#86D2D5] py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <p className="eyebrow text-[#2E7D7B]">Who Should Apply?</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-black md:text-4xl">
                The Incubation Track is suited to women who…
              </h2>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2E7D7B] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2E7D7B]/30 transition-all hover:bg-[#245f5d] cursor-pointer"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2E7D7B]/30">
                      <span className="h-2 w-2 rounded-full bg-[#2E7D7B]" />
                    </span>
                    <span className="text-[15px] leading-snug text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OUTCOME / QUOTE ──────────────────────────────────────────── */}
      <section className="border-t border-plum/8 py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 md:items-center">
            <Reveal>
              <p className="eyebrow" style={{ color: '#2E7D7B' }}>
                The Outcome
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                What Graduation Looks Like
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-plum/70">
                By graduation, participating startups will have a clearer business model, stronger
                market validation, improved financial and operational systems, greater investment
                readiness, and a practical pathway towards revenue growth and scale.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0b2320] to-[#154a47] p-10">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[url('/grain.png')] opacity-10" />
                <span className="font-display text-6xl font-bold leading-none text-[#2E7D7B]/40">
                  "
                </span>
                <blockquote className="relative mt-2 font-display text-xl font-medium italic leading-snug text-white md:text-2xl">
                  Pakistan's next big founder may not look like a founder yet.
                </blockquote>
                <p className="mt-6 text-sm font-semibold text-[#7fc2bd]">WISE Lab · Incubation Track</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section className="bg-[#86D2D5] py-14 md:py-20">
        <div className="container-wise max-w-5xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-black md:text-4xl">
              Ready to Build Your Startup?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-black/75">
              Applications open to women-led, technology-enabled startups from across Pakistan.
              Join the next WISE Lab cohort.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#2E7D7B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2E7D7B]/30 transition-all hover:bg-[#245f5d] cursor-pointer"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/micro-entrepreneurship"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/40 px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/60"
              >
                Explore Micro-Entrepreneurship
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer />
    <ApplicationsClosedModal
      isOpen={isApplyModalOpen}
      onClose={() => setIsApplyModalOpen(false)}
      programName="Incubation Track"
    />
  </>
  )
}
