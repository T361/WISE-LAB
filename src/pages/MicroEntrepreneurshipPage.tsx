import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowDown } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { useDocumentMeta } from '@/lib/useDocumentMeta'
import { breadcrumbSchema, courseSchema, faqPageSchema } from '@/lib/structuredData'
import { BootcampFAQSection } from '@/components/BootcampFAQSection'
import { BOOTCAMP_FAQ_DATA } from '@/lib/data/bootcampFaqData'

const DESCRIPTION =
  'A nationwide capacity-building programme for women running micro, small, home-based, or early-stage businesses.'

export function MicroEntrepreneurshipPage() {
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
    <main
      className="relative min-h-screen overflow-hidden bg-white py-16 pb-32 md:py-24 md:pb-32"
    >
      <div className="grain" />
      <div className="container-wise relative max-w-4xl">
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
            <p className="eyebrow" style={{ color: '#E8823C' }}>
              {'Track Two · Micro-Entrepreneurship and MSME Training'}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.05] text-black">
              {'Micro-Entrepreneurship'}
            </h1>
            <p className="mt-3 font-display text-xl italic text-plum/70">
              {'Turning Skills, Home-Based Work and Small Businesses into Sustainable Enterprises'}
            </p>

            {/* Quick jump to FAQs & Apply */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#bootcamp-faq"
                className="inline-flex items-center gap-2 rounded-full border border-[#E8823C]/30 bg-[#FFF4EB] px-4 py-2 text-xs font-semibold text-[#B85C1A] transition-colors hover:bg-[#FFE8D6]"
              >
                <span>Bootcamp FAQs (37 Q&As)</span>
                <span className="font-urdu" dir="rtl">اکثر پوچھے گئے سوالات</span>
                <ArrowDown className="h-3 w-3" />
              </a>
              <Link
                to="/#wise-connect"
                className="inline-flex items-center gap-2 rounded-full bg-[#B85C1A] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Apply Now / رابطہ کریں
              </Link>
            </div>

            <div className="prose prose-plum mt-8 max-w-none space-y-6 text-[17px] leading-relaxed text-plum/80">
              <p>
                {'The WISE Lab Micro-Entrepreneurship Training Track is a nationwide capacity-building programme designed for women running micro, small, home-based, informal, or early-stage businesses.'}
              </p>
              <p>
                {'The track will help women strengthen their existing enterprises, adopt digital tools, formalise business practices, access financial services, and reach wider markets.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Programme Scale'}
              </h2>
              <p>{'Across the five-year project period, WISE Lab aims to train:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-coral">
                <li>{'1,000 women entrepreneurs'}</li>
                <li>{'Approximately 200 women annually'}</li>
                <li>{'Participants from urban, rural, underserved, and geographically diverse communities across Pakistan'}</li>
              </ul>
              <p>
                {'Priority outreach may include women entrepreneurs from Balochistan, Gilgit-Baltistan, Azad Jammu and Kashmir, rural Sindh, Khyber Pakhtunkhwa, Punjab, and other underserved regions.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'What Participants Will Learn'}
              </h2>
              <p>{'The programme may include practical training in:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-coral columns-1 sm:columns-2">
                <li>{'Business planning'}</li>
                <li>{'Costing and pricing'}</li>
                <li>{'Bookkeeping and cash-flow management'}</li>
                <li>{'Customer identification'}</li>
                <li>{'Branding and packaging'}</li>
                <li>{'Digital marketing'}</li>
                <li>{'Social-commerce selling'}</li>
                <li>{'E-commerce and marketplace onboarding'}</li>
                <li>{'Financial literacy'}</li>
                <li>{'Digital payments'}</li>
                <li>{'Access to banking and credit'}</li>
                <li>{'Product development'}</li>
                <li>{'Quality assurance'}</li>
                <li>{'Business registration and formalisation'}</li>
                <li>{'Sales and negotiation'}</li>
                <li>{'Market linkage and growth planning'}</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Who Is This Track For?'}
              </h2>
              <p>{'The Micro-Entrepreneurship Track is suitable for women working in areas such as:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-coral columns-1 sm:columns-2">
                <li>{'Food and beverages'}</li>
                <li>{'Fashion, apparel and textiles'}</li>
                <li>{'Beauty and personal care'}</li>
                <li>{'Handicrafts and creative products'}</li>
                <li>{'Education and training'}</li>
                <li>{'Agriculture and food processing'}</li>
                <li>{'Retail and commerce'}</li>
                <li>{'Home-based production'}</li>
                <li>{'Digital and professional services'}</li>
                <li>{'Community-based businesses'}</li>
                <li>{'Other micro and small enterprises with growth potential'}</li>
              </ul>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Practical Mentorship and Advisory Support'}
              </h2>
              <p>
                {'Participants will gain access to trainers, business advisers, financial-literacy experts, digital specialists, industry practitioners, and relevant ecosystem partners.'}
              </p>
              <p>
                {'Mentorship will focus on solving real business challenges, including pricing products, reaching customers, managing finances, improving packaging, setting up digital storefronts, and preparing for financing.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Financial Enablement'}
              </h2>
              <p>
                {"Through WISE Lab's consortium and financial-sector relationships, eligible participants may receive guidance on:"}
              </p>
              <ul className="list-disc space-y-2 pl-5 marker:text-coral">
                <li>{'Business bank accounts'}</li>
                <li>{'Digital wallets and payments'}</li>
                <li>{'Credit-readiness'}</li>
                <li>{'Microfinance products'}</li>
                <li>{'Savings and financial planning'}</li>
                <li>{'Documentation required for financing'}</li>
                <li>{'Responsible borrowing'}</li>
                <li>{'Government or partner-supported funding opportunities'}</li>
              </ul>
              <p className="text-plum/60">
                {'Eligible participants may be connected with relevant grants, financing facilities, microfinance products, digital banking solutions, or partner-supported opportunities, subject to applicable criteria and availability.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'Market and Buyer Linkages'}
              </h2>
              <p>{'Participants may be connected with:'}</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-coral">
                <li>{'Retailers and distributors'}</li>
                <li>{'E-commerce platforms'}</li>
                <li>{'Corporate procurement networks'}</li>
                <li>{'Trade bodies and chambers'}</li>
                <li>{'Exhibitions and product showcases'}</li>
                <li>{'Export-development platforms'}</li>
                <li>{'Digital marketplaces'}</li>
                <li>{'Women-focused business networks'}</li>
                <li>{'Financial institutions'}</li>
                <li>{'Relevant government support programmes'}</li>
              </ul>
              <p>
                {'The objective is to help women move beyond one-time training and translate their learning into increased sales, improved visibility, better business systems, and wider customer access.'}
              </p>

              <h2 className="font-display text-2xl font-bold text-black">
                {'The Outcome'}
              </h2>
              <p>
                {'Participants should leave the programme with stronger financial understanding, improved business practices, increased digital capability, clearer growth plans, and better access to customers, finance, and markets.'}
              </p>
            </div>
          </article>
        </Reveal>

        {/* 37 Micro-Entrepreneurship Bootcamp FAQs */}
        <Reveal delay={0.15}>
          <BootcampFAQSection />
        </Reveal>
      </div>
    </main>
  )
}
