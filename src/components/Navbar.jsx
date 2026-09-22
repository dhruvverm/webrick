import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'
import { navLinks } from '../data/nav'
import { site } from '../data/site'
import useActiveSection from '../hooks/useActiveSection'
import useLockBody from '../hooks/useLockBody'
import { INTRO_DELAY } from '../intro'

const SECTION_IDS = navLinks.map((l) => l.href.slice(1))
const EASE = [0.2, 0.65, 0.3, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  useLockBody(open)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (y > 160 && y - last > 3) setHidden(true)
      else if (last - y > 3 || y < 160) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: hidden && !open ? '-100%' : 0 }}
        transition={{
          opacity: { duration: 0.8, delay: INTRO_DELAY + 0.3 },
          y: { duration: 0.45, ease: [0.2, 0.65, 0.2, 1] },
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'nav-solid' : ''}`}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between lg:h-[4.5rem]">
          <a href="#home" className="flex items-center" aria-label="Webrick home">
            <Logo size={26} />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`text-[0.9rem] transition-colors ${isActive ? 'text-text' : 'text-muted hover:text-text'}`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-5">
            <span className="label hidden items-center gap-2.5 normal-case tracking-normal xl:inline-flex">
              <span className="blink h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availability}
            </span>
            <Button href="#contact" className="btn-sm hidden sm:inline-flex" icon="diag">
              Start a Project
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-text lg:hidden"
            >
              <span className={`burger ${open ? 'open' : ''}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-1 lg:hidden"
          >
            <div className="container-x flex h-full flex-col pt-24 pb-8">
              <ul className="border-t border-line">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: EASE }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-4"
                    >
                      <span className="flex items-baseline gap-5">
                        <span className="mono text-xs text-accent">0{i + 1}</span>
                        <span className="display text-4xl">{link.label}</span>
                      </span>
                      <ArrowUpRight size={20} className="text-dim transition-colors group-hover:text-text" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-auto flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="label">Get in touch</span>
                  <a href={`mailto:${site.email}`} className="text-text">{site.email}</a>
                  <span className="text-sm text-muted">{site.availability}</span>
                </div>
                <Button href="#contact" onClick={() => setOpen(false)} className="w-full" icon="diag">
                  Start a Project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
