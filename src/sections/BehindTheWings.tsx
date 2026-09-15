import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { LinkedinIcon } from '@/components/BrandIcons'
import { listVisibleTeamMembers } from '@/lib/team/api'
import type { TeamMember } from '@/lib/team/types'

export function BehindTheWings() {
  const { t } = useTranslation()
  const [members, setMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    listVisibleTeamMembers().then((data) => {
      setMembers(data)
    }).catch((err) => {
      console.error('Failed to load team members:', err)
    })
  }, [])

  return (
    <section
      id="behind-the-wings"
      className="relative overflow-hidden bg-white py-28 md:py-36"
    >
      <div className="container-wise relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{t('nav.links.behind-the-wings', 'Behind the Wings')}</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.03] text-black">
              {t('behindTheWings.title1', 'The team helping')}
              <br />
              {t('behindTheWings.title2', 'her take flight')}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-pretty leading-relaxed text-plum/70">
              {t(
                'behindTheWings.intro',
                'WISE Lab is led by a multidisciplinary team across incubation, entrepreneurship development, partnerships, communications, training, technology, and ecosystem engagement building the space where she can become a founder.'
              )}
            </p>
          </Reveal>
        </div>

        {/* Team Grid */}
        {members.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <Reveal
                key={member.id}
                delay={0.15 + i * 0.05}
                className="flex flex-col h-full"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  className="flex-1 w-full group flex flex-col overflow-hidden rounded-3xl border border-plum/10 shadow-card"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-plum/5">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col bg-white p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-bold text-plum">{member.name}</h3>
                        <p className="mt-1 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-teal">
                          {member.role}
                        </p>
                      </div>
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum transition-colors hover:border-teal hover:bg-teal hover:text-white"
                        >
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    {member.tagline && (
                      <p className="mt-3 text-[13px] leading-relaxed text-plum/65">
                        {member.tagline}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
