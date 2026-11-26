import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin } from 'lucide-react'

import { WiseMark } from '@/components/WiseLabLogo'
import { SOCIAL_LINKS } from '@/lib/social'

const PROGRAM_LINKS = [
  { to: '/incubation', label: 'Incubation' },
  { to: '/micro-entrepreneurship', label: 'Micro-Entrepreneurship' },
  { to: '/vision', label: 'Our Vision' },
  { to: '/mission', label: 'Our Mission' },
] as const

const EXPLORE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/our-partners', label: 'Our Partners' },
  { to: '/behind-the-wings', label: 'Behind the Wings' },
  { to: '/become-a-mentor', label: 'Become a Mentor' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/faqs', label: 'FAQs' },
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-plum/10 bg-[#FAFAFA] text-plum">
      {/* Subtle top brand accent bar */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#6C1D7A] via-[#2C7A70] to-[#FF8A65]"
      />

      <div className="container-wise relative pt-16 pb-12 md:pt-20 md:pb-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.15fr] lg:gap-10">
          {/* Column 1: Brand & Socials */}
          <div>
            <Link to="/" aria-label="WISE Lab home" className="inline-block">
              <WiseMark variant="color" className="h-14 w-auto" />
            </Link>
            <p className="mt-4 font-display text-xl font-semibold text-black">
              Her idea. Her enterprise.
            </p>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-plum/65">
              Pakistan&apos;s premier physical incubation center designed exclusively for women building high-growth startups and sustainable MSMEs.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WISE Lab on ${label} (opens in a new tab)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-plum/15 bg-white text-plum/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF8A65] hover:bg-[#FF8A65] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2C7A70]">
              Programs
            </h3>
            <ul className="mt-5 space-y-3">
              {PROGRAM_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm font-medium text-plum/75 transition-colors hover:text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2C7A70]">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline text-sm font-medium text-plum/75 transition-colors hover:text-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2C7A70]">
              Connect
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-plum/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A65]" />
                <span>AIOU, Sector H-8, Islamabad</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#FF8A65]" />
                <a
                  href="mailto:info@wiselab.org.pk"
                  className="link-underline break-all transition-colors hover:text-plum"
                >
                  info@wiselab.org.pk
                </a>
              </li>
            </ul>

            <Link
              to="/connect"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF8A65] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#e67c5b] hover:shadow-md"
            >
              Start a Conversation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-2 border-t border-plum/10 pt-6 text-xs text-plum/45 sm:flex-row sm:items-center">
          <p>© 2026 Women Innovation and Startup Empowerment (WISE) Lab. All rights reserved.</p>
          <p className="font-display text-sm italic text-plum/60">From idea to impact.</p>
        </div>
      </div>
    </footer>
  )
}
