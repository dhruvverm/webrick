import { MotionConfig } from 'framer-motion'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import StackBand from './components/sections/StackBand'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Intro />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <Services />
        <Work />
        <Process />
        <StackBand />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
