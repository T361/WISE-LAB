import { MotionConfig } from 'framer-motion'
import { TrackProvider } from '@/lib/useTrackState'
import { HappeningsSectionsProvider } from '@/lib/happenings/useSectionPosts'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Nav } from '@/components/Nav'
import { PMBanner } from '@/components/PMBanner'
import { AnnouncementModal } from '@/components/AnnouncementModal'
import { Hero } from '@/sections/Hero'
import { WiseJourney } from '@/sections/WiseJourney'
import { EnterTheLab } from '@/sections/EnterTheLab'
import { FAQSection } from '@/sections/FAQSection'
import { Footer } from '@/sections/Footer'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TrackProvider>
        <HappeningsSectionsProvider>
          <SmoothScroll>
            <div className="sticky top-0 z-50">
              <Nav />
            </div>
            <AnnouncementModal />
            <PMBanner />
            <main>
              <Hero />
              <WiseJourney />
              <EnterTheLab />
              <FAQSection />
            </main>
            <Footer />
          </SmoothScroll>
        </HappeningsSectionsProvider>
      </TrackProvider>
    </MotionConfig>
  )
}

export default App
