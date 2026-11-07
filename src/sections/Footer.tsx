import { Link } from 'react-router-dom'

import { NAV_LINKS } from '@/lib/nav'

export function Footer() {
  return (
    <footer
      className="relative bg-white border-t border-black/10 overflow-hidden pt-20 pb-28 text-black"
    >
      {/* removed grain and ambient glow for pure white bg */}

      <div className="container-wise relative">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-2xl font-medium text-black">
              Her idea. Her enterprise.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-6 gap-y-3 md:justify-items-end">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="link-underline text-sm font-medium text-black/70 transition-colors hover:text-black"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/happenings"
              className="link-underline text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              Happenings
            </Link>
            <Link
              to="/faqs"
              className="link-underline text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              FAQs
            </Link>
            <a
              href="#careers"
              className="link-underline text-sm font-medium text-black/70 transition-colors hover:text-black"
            >
              Careers at WISE
            </a>
          </nav>
        </div>

        <div className="mt-16 space-y-1.5 border-t border-black/10 pt-8 text-sm text-black/55">
          <p>Under the vision of the Prime Minister of Pakistan.</p>
          <p>Designed & funded by the Ministry of IT & Telecom and Ignite National Technology Fund.</p>
          <p className="pt-1">
            <a
              href="https://wiselab.org.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[#FF8A65]"
            >
              wiselab.org.pk
            </a>
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 text-sm text-black/45 sm:flex-row sm:items-center">
          <p>© 2026 WISE Lab Women Innovation and Startup Empowerment Lab.</p>
          <p className="font-display italic text-black/60">From idea to impact.</p>
        </div>
      </div>
    </footer>
  )
}
