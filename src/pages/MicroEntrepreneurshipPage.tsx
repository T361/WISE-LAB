import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Smartphone,
  Banknote,
  ShoppingBag,
  BarChart3,
  Globe,
  Handshake,
  GraduationCap,
  Wallet,
  Store,
  MapPin,
} from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/sections/Footer'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema, courseSchema, faqPageSchema } from '@/lib/structuredData'
import { BootcampFAQSection } from '@/components/BootcampFAQSection'
import { BOOTCAMP_FAQ_DATA } from '@/lib/data/bootcampFaqData'
import { ApplicationsClosedModal } from '@/components/ApplicationsClosedModal'

const DESCRIPTION =
  'A nationwide capacity-building programme for women running micro, small, home-based, or early-stage businesses.'

/* ─── Colour tokens for this track ──────────────────────────────────────── */
const C = {
  dark: '#2c1707',
  mid: '#7a3f12',
  primary: '#E8823C',
  deep: '#B85C1A',
  light: '#FFF4EB',
  muted: '#FFE8D6',
  pill: '#E8823C',
  pillBg: '#FFF4EB',
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '1,000', unit: 'Women', label: 'Will Be Trained Over 5 Years' },
  { value: '200', unit: 'Per Year', label: 'Participants Annually' },
  { value: 'All', unit: 'Regions', label: 'Urban, Rural & Remote' },
  { value: 'Free', unit: 'Programme', label: 'No Cost to Participants' },
]

const JOURNEY_STEPS = [
  {
    num: '01',
    title: 'Apply',
    description:
      'Fill in the online application form. Applications are open to women running micro, small, home-based, or informal businesses across Pakistan — urban and rural.',
  },
  {
    num: '02',
    title: 'Selection',
    description:
      'Shortlisted candidates are contacted by the WISE Lab team. Priority outreach goes to women from underserved and geographically diverse communities.',
  },
  {
    num: '03',
    title: 'Train',
    description:
      'Attend the structured bootcamp — in-person, hybrid, or online. Learn business planning, digital tools, financial literacy, branding, marketing, and more.',
  },
  {
    num: '04',
    title: 'Grow',
    description:
      'Walk away with stronger business practices, digital capabilities, and direct connections to markets, buyers, financial services, and ecosystem partners.',
  },
]

const WHAT_YOU_LEARN = [
  { icon: BookOpen, color: C.deep, bg: C.light, title: 'Business Planning', description: 'Build a solid business plan — covering your model, customers, pricing, costs, and growth roadmap.' },
  { icon: Banknote, color: C.deep, bg: C.light, title: 'Financial Literacy', description: 'Understand bookkeeping, cash-flow management, costing, pricing, and responsible borrowing.' },
  { icon: Smartphone, color: C.deep, bg: C.light, title: 'Digital Marketing', description: 'Reach more customers through social media, digital ads, online storefronts, and content.' },
  { icon: ShoppingBag, color: C.deep, bg: C.light, title: 'E-Commerce & Social Selling', description: 'List and sell on e-commerce platforms and social-commerce channels like Facebook, Instagram, and marketplaces.' },
  { icon: BarChart3, color: C.deep, bg: C.light, title: 'Branding & Packaging', description: 'Create a compelling brand identity and product packaging that attracts buyers and builds trust.' },
  { icon: Banknote, color: C.deep, bg: C.light, title: 'Digital Payments & Banking', description: 'Set up business bank accounts, digital wallets, and understand credit and microfinance products.' },
  { icon: Globe, color: C.deep, bg: C.light, title: 'Market Linkages', description: 'Connect with retailers, distributors, corporate buyers, trade bodies, and exhibition opportunities.' },
  { icon: Handshake, color: C.deep, bg: C.light, title: 'Business Formalisation', description: 'Register your business, understand legal basics, and prepare documentation needed for financing.' },
]

const SECTORS = [
  'Food & Beverages',
  'Fashion, Apparel & Textiles',
  'Beauty & Personal Care',
  'Handicrafts & Creative Products',
  'Education & Training',
  'Agriculture & Food Processing',
  'Retail & Commerce',
  'Home-Based Production',
  'Digital & Professional Services',
  'Community-Based Businesses',
  'Other Micro & Small Enterprises',
]

const SUPPORT_PILLARS = [
  {
    icon: GraduationCap,
    title: 'Expert Trainers',
    description: 'Trainers, business advisers, financial-literacy experts, digital specialists, and industry practitioners.',
  },
  {
    icon: Wallet,
    title: 'Financial Enablement',
    description: 'Guidance on business bank accounts, digital wallets, credit-readiness, microfinance, and responsible borrowing.',
  },
  {
    icon: Store,
    title: 'Market & Buyer Linkages',
    description: 'Connections to retailers, e-commerce platforms, corporate procurement networks, trade bodies, and exhibitions.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Reach',
    description: 'Priority outreach to Balochistan, Gilgit-Baltistan, AJK, rural Sindh, KPK, Punjab, and other underserved regions.',
  },
]

/* ─── Component ─────────────────────────────────────────────────────────── */

export function MicroEntrepreneurshipPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  useDocumentMeta({
    title: 'Micro-Entrepreneurship',
    description: DESCRIPTION,
    path: '/micro-entrepreneurship',
    structuredData: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Micro-Entrepreneurship', path: '/micro-entrepreneurship' },
      ]),
      courseSchema({ name: 'Micro-Entrepreneurship', description: DESCRIPTION, path: '/micro-entrepreneurship' }),
      faqPageSchema(
        BOOTCAMP_FAQ_DATA.flatMap((cat) =>
          cat.items.map((item) => ({ q: item.qEn, a: item.aEn }))
        )
      ),
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
      <section className="relative overflow-hidden pb-0 pt-4 md:pt-6" style={{ background: '#FFD1AD' }}>
        {/* decorative circles */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: `${C.primary}30` }}
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: `${C.deep}25` }}
        />

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
              Track Two · Micro-Entrepreneurship & MSME Training
            </span>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.03] text-black">
              Micro-Entrepreneurship
            </h1>
            <p className="mt-4 max-w-xl font-display text-lg italic text-black md:text-xl">
              Turning Skills, Home-Based Work and Small Businesses into Sustainable Enterprises
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-black">
              The WISE Lab Micro-Entrepreneurship Training Track is a nationwide capacity-building
              programme for women running micro, small, home-based, informal, or early-stage
              businesses across Pakistan.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
                style={{ background: C.deep, boxShadow: `0 8px 24px ${C.deep}44` }}
              >
                Apply Now / رابطہ کریں
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#bootcamp-faq"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/30 px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-white/50"
              >
                Bootcamp FAQs (37 Q&As)
                <span className="font-urdu text-xs" dir="rtl">اکثر پوچھے گئے سوالات</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* wave divider */}
        <div className="relative h-16 w-full overflow-hidden">
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-full w-full" fill="white">
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
                  <span className="font-display text-[2rem] font-bold leading-none" style={{ color: C.primary }}>
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
                <p className="eyebrow" style={{ color: C.primary }}>About the Programme</p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-plum md:text-4xl">
                  Built for Women Who Run the Real Economy
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[16px] leading-relaxed text-plum/75">
                <p>
                  This track will help women strengthen their existing enterprises, adopt digital
                  tools, formalise business practices, access financial services, and reach wider
                  markets — regardless of where in Pakistan they are based.
                </p>
                <p>
                  Across the five-year project period, WISE Lab aims to train{' '}
                  <strong className="text-plum">1,000 women entrepreneurs</strong> — approximately
                  200 women annually — from urban, rural, underserved, and geographically diverse
                  communities.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── JOURNEY STEPS ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: C.light }}>
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow" style={{ color: C.primary }}>Your Path Forward</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                How the Programme Works
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* vertical connector */}
            <div
              className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              style={{ background: `linear-gradient(to bottom, ${C.primary}30, ${C.primary}60, ${C.primary}10)` }}
            />

            <div className="flex flex-col gap-10 md:gap-0">
              {JOURNEY_STEPS.map((step, i) => {
                const isEven = i % 2 === 0
                return (
                  <Reveal key={step.num} delay={i * 0.1}>
                    <div
                      className={`relative flex flex-col gap-6 md:flex-row md:items-center md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                    >
                      {/* card */}
                      <div className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                        <div className="rounded-2xl border border-plum/8 bg-white p-7 shadow-card transition-shadow hover:shadow-card-hover">
                          <span className="font-display text-5xl font-bold leading-none" style={{ color: `${C.primary}25` }}>
                            {step.num}
                          </span>
                          <h3 className="mt-3 font-display text-xl font-bold text-plum">{step.title}</h3>
                          <p className="mt-2 text-[15px] leading-relaxed text-plum/65">{step.description}</p>
                        </div>
                      </div>

                      {/* centre dot */}
                      <div className="hidden md:flex md:w-20 md:shrink-0 md:items-center md:justify-center">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg"
                          style={{ background: C.primary }}
                        >
                          <span className="text-xs font-bold text-white">{step.num}</span>
                        </div>
                      </div>

                      <div className="hidden w-[calc(50%-40px)] md:block" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU LEARN (8 cards) ─────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow" style={{ color: C.primary }}>Curriculum</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                What Participants Will Learn
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-plum/60">
                Practical, hands-on training in the skills that move a small business forward — in
                a language and format accessible to all.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_YOU_LEARN.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="group flex h-full flex-col rounded-2xl border border-plum/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: item.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="font-display text-[15px] font-bold text-plum">{item.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-plum/60">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: '#FFD1AD' }}>
        <div className="container-wise max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <Reveal>
              <p className="eyebrow" style={{ color: C.deep }}>Who Is This Track For?</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-black md:text-4xl">
                Women working in sectors like…
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-black/70">
                If you run or want to grow a micro, small, or home-based business — this programme
                is for you, regardless of your education level or location.
              </p>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all cursor-pointer"
                style={{ background: C.deep, boxShadow: `0 8px 24px ${C.deep}44` }}
              >
                Apply Now / رابطہ کریں
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SECTORS.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.45)', border: `1px solid ${C.deep}25` }}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: C.deep }}
                    />
                    <span className="text-[14px] leading-snug text-black">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SUPPORT PILLARS ──────────────────────────────────────────── */}
      <section className="border-t border-plum/8 py-16 md:py-24">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="eyebrow" style={{ color: C.primary }}>Beyond the Bootcamp</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                Practical Mentorship & Access
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_PILLARS.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div
                    className="group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                    style={{ background: C.light, border: `1px solid ${C.primary}22` }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ color: C.deep }}
                    >
                      <Icon className="h-6 w-6" style={{ color: C.deep }} />
                    </div>
                    <h3 className="mt-5 font-display text-[16px] font-bold text-plum">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-plum/65">{p.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── OUTCOME + QUOTE ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: C.light }}>
        <div className="container-wise max-w-5xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <Reveal>
              <p className="eyebrow" style={{ color: C.primary }}>The Outcome</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-plum md:text-4xl">
                What Completion Looks Like
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-plum/70">
                Participants leave the programme with stronger financial understanding, improved
                business practices, increased digital capability, clearer growth plans, and better
                access to customers, finance, and markets.
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-plum/70">
                The objective is to help women move beyond one-time training and translate their
                learning into increased sales, improved visibility, better business systems, and
                wider customer access.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <div
                className="relative rounded-3xl p-10"
                style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.mid})` }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[url('/grain.png')] opacity-10" />
                <span
                  className="font-display text-6xl font-bold leading-none"
                  style={{ color: `${C.primary}50` }}
                >
                  "
                </span>
                <blockquote className="relative mt-2 font-display text-xl font-medium italic leading-snug text-white md:text-2xl">
                  Every woman who grows her business grows her community with her.
                </blockquote>
                <p className="mt-6 text-sm font-semibold" style={{ color: '#ffd9a8' }}>
                  WISE Lab · Micro-Entrepreneurship Track
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BOOTCAMP FAQ ─────────────────────────────────────────────── */}
      <section className="py-10 md:py-16">
        <div className="container-wise max-w-5xl">
          <Reveal>
            <BootcampFAQSection />
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ background: '#FFD1AD' }}>
        <div className="container-wise max-w-5xl text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-black md:text-4xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[16px] text-black/70">
              Applications are open to women entrepreneurs across Pakistan — urban and rural, any
              stage, any sector.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90 cursor-pointer"
                style={{ background: C.deep }}
              >
                Apply Now / رابطہ کریں
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/incubation"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/40 px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/60"
              >
                Explore Incubation
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
      programName="Micro-Entrepreneurship Track"
    />
  </>
  )
}
