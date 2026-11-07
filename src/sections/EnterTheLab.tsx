import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Rocket, Store, Compass, Network } from 'lucide-react'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

const MotionLink = motion(Link)

interface Pillar {
  title: string
  body: string
  cta: string
  color: string
  href: string
  Icon: typeof Rocket
}

const PILLARS: Pillar[] = [
  {
    title: 'Incubation',
    body: 'For women founders ready to move from an early idea to an investment-ready enterprise, through incubation, mentorship, and investor readiness.',
    cta: 'Take Flight',
    color: '#2E8C8A',
    href: '/incubation',
    Icon: Rocket,
  },
  {
    title: 'Micro-Entrepreneurship',
    body: 'For women running micro, small, or home-based businesses ready to grow through practical training, digital tools, and market access.',
    cta: 'Grow Your Enterprise',
    color: '#FF8A65',
    href: '/micro-entrepreneurship',
    Icon: Store,
  },
  {
    title: 'Guide Her Growth',
    body: 'For experts, founders, investors, trainers, and professionals who want to guide women entrepreneurs through practical support.',
    cta: 'Become a Mentor',
    color: '#2E8C8A',
    href: '/#wise-connect',
    Icon: Compass,
  },
  {
    title: 'Open the Ecosystem',
    body: 'For organizations ready to collaborate on women-led innovation, enterprise, access, and inclusive growth.',
    cta: 'Partner with WISE',
    color: '#FF8A65',
    href: '/#wise-connect',
    Icon: Network,
  },
]

export function EnterTheLab() {
  return (
    <section id="enter-the-lab" className="relative bg-white overflow-hidden py-28 md:py-36">
      {/* removed grain to keep background purely white */}
      <div className="container-wise relative">

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Enter the Lab</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.03] text-black">
              Your idea deserves
              <br />
              the right room
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-pretty leading-relaxed text-plum/70">
              Building a startup, growing a small business, mentoring founders, or partnering for impact your WISE journey starts here. If your idea has felt too early, too quiet, too small, or too unseen, this is your invitation to bring it into the room.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <RevealItem key={p.title}>
              <MotionLink
                to={p.href}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-[#FAFAFA] p-8 shadow-card transition-shadow duration-500 hover:shadow-card-hover md:p-9"
              >
                {/* top accent rail */}
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: p.color }}
                />
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-105"
                    style={{ background: `${p.color}14`, color: p.color }}
                  >
                    <p.Icon className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-black">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum/65">
                  {p.body}
                </p>
                <span
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ background: p.color, boxShadow: `0 14px 32px -14px ${p.color}` }}
                >
                  {p.cta}
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </MotionLink>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center font-display text-xl font-medium uppercase italic text-black">
            YOUR NEXT CHAPTER STARTS INSIDE THE LAB.
          </p>
        </Reveal>

      </div>
    </section>
  )
}
