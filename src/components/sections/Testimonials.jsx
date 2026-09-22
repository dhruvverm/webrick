import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Reveal, { EASE } from '../ui/Reveal'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const go = (d) => {
    setDir(d)
    setIndex((i) => (i + d + testimonials.length) % testimonials.length)
  }
  const t = testimonials[index]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), 7000)
    return () => clearInterval(id)
  }, [paused, index])

  return (
    <section
      className={`section pt-0 lg:pt-0 ${paused ? 'paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <div className="relative">
          <div className="rule" />
          <div key={index} className="progress-line absolute left-0 top-0 h-px w-full bg-accent" aria-hidden="true" />
        </div>
        <div className="flex items-center justify-between py-3.5 label">
          <span><span className="text-accent">(★)</span><span className="ml-3 text-muted">What clients say</span></span>
          <span className="mono">{String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
        </div>

        <Reveal className="mt-8 grid gap-x-8 gap-y-8 lg:mt-12 lg:grid-cols-12">
          <div className="relative min-h-[9rem] lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: dir * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -20 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="display max-w-[30ch] text-2xl font-medium leading-[1.2] sm:text-3xl lg:text-[2.5rem]">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-[0.95rem] text-text">{t.name}</span>
                  <span className="text-sm text-dim">{t.role}</span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex items-start gap-2 lg:col-span-3 lg:justify-end">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-text hover:text-text"
            >
              <ArrowLeft size={16} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-colors hover:border-text hover:text-text"
            >
              <ArrowRight size={16} strokeWidth={1.6} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
