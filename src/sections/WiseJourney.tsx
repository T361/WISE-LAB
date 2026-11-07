import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'

export function WiseJourney() {
  return (
    <section id="home" className="relative bg-white overflow-hidden py-28 md:py-36">
      {/* removed grain to keep background purely white */}
      <div className="container-wise relative">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Journey</p>
              <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.02] text-black">
                From Idea
                <br />
                to Impact
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-plum/70">
                Pakistan's premier platform, exclusively for women-led ideas to find the room, the resources, and the recognition to become enterprises.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-pretty text-lg leading-relaxed text-plum/80">
                WISE Lab Women Innovation and Startup Empowerment Lab is a national flagship platform supporting women-led startups, entrepreneurs, and MSMEs across Pakistan. Built around the philosophy of transformation, it supports women at the most critical stages of their journey when ideas are still forming, businesses are still finding direction, and founders are ready to move from hidden potential to visible impact.
              </p>
            </Reveal>

            {/* Signature line */}
            <Reveal delay={0.15}>
              <blockquote className="my-12 border-l-2 border-coral pl-6">
                <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium italic leading-snug text-black">
                  She always had the wings.
                  <br />
                  <span className="text-[#FF8A65]">Now she has the space to fly.</span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-pretty text-lg leading-relaxed text-plum/80">
                Through incubation, MSME training, mentorship, market access, investor readiness, digital enablement, and ecosystem partnerships, WISE Lab helps women transform their ideas into sustainable businesses and their ambition into enterprise.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Vision + Mission */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-[#FAFAFA] border border-black/5 p-8 shadow-card transition-all duration-500 hover:shadow-card-hover md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-10 translate-x-10 rounded-full bg-teal/10 blur-2xl transition-transform duration-700 group-hover:translate-x-6" />
              <p className="eyebrow" style={{ color: '#2C7A70' }}>
                Programs
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-black">
                Our Vision
              </h3>
              <p className="mt-4 leading-relaxed text-plum/75">
                To become Pakistan's leading platform exclusively for women-led innovation and enterprise enabling women across the country to transform ideas into sustainable businesses, access the right spaces, and contribute to inclusive digital and economic growth.
              </p>
              <p className="mt-5 font-display text-lg font-medium italic text-teal">
                A future where she doesn't wait for opportunity she enters the room & builds it.
              </p>
              <Link
                to="/vision"
                className="link-underline relative mt-5 inline-block text-sm font-semibold text-teal"
              >
                Read more
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-[#FAFAFA] border border-black/5 p-8 shadow-card transition-all duration-500 hover:shadow-card-hover md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-10 translate-x-10 rounded-full bg-coral/10 blur-2xl transition-transform duration-700 group-hover:translate-x-6" />
              <p className="eyebrow" style={{ color: '#FF8A65' }}>
                The WISE Way
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-black">
                Our Mission
              </h3>
              <p className="mt-4 leading-relaxed text-plum/75">
                To empower women entrepreneurs, startups, and MSMEs with structured incubation, practical business training, mentorship, market linkages, investor readiness, digital tools, and ecosystem access from the cocoon stage of potential to the flight stage of enterprise.
              </p>
              <p className="mt-5 font-display text-lg font-medium italic text-[#FF8A65]">
                Nurture the idea. Expand the room. Launch the enterprise.
              </p>
              <Link
                to="/mission"
                className="link-underline relative mt-5 inline-block text-sm font-semibold text-[#FF8A65]"
              >
                Read more
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
