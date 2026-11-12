import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
const SmoothScroll = lazy(() => import('./components/SmoothScroll'))
const Cursor = lazy(() => import('./components/Cursor'))
import ServicesBand from './components/sections/ServicesBand'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import WhyWebrick from './components/sections/WhyWebrick'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import Plans from './components/sections/Plans'
import TechStack from './components/sections/TechStack'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import { testimonials } from './data/testimonials'
import Faq from './components/sections/Faq'
import Contact from './components/sections/Contact'

/** The page itself. Also rendered to static HTML at build time (see scripts/prerender.mjs). */
export function Page() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        {/* On desktop the hero stays put for one screen while the rest of the page slides up over it. */}
        <div className="relative z-[1]">
          <Hero />
          <div aria-hidden="true" className="hidden h-screen lg:block" />
        </div>
        <div className="relative z-[1] bg-bg-1 lg:-mt-[100vh] lg:rounded-[2rem] lg:border-t lg:border-line lg:shadow-[0_-30px_90px_rgba(0,0,0,0.6)]">
          <ServicesBand />
          <Services />
          <Process />
          <Plans />
          <WhyWebrick />
          <Work />
          <TechStack />
          <About />
          {testimonials.length > 0 && <Testimonials />}
          <Faq />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Suspense fallback={null}>
        <SmoothScroll />
        <Cursor />
      </Suspense>
      <Page />
      <WhatsAppButton />
    </MotionConfig>
  )
}
