import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import WhyWebrick from './components/sections/WhyWebrick'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import TechStack from './components/sections/TechStack'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <>
      <Intro />
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <WhyWebrick />
        <Work />
        <Process />
        <TechStack />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
