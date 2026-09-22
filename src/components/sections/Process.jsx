import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { processSteps } from '../../data/process'
import { EASE } from '../ui/Reveal'

export default function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <section id="process" className="section scroll-mt-16">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Process"
          meta="Five stages"
          title="From idea to launch, without surprises."
          lede="You know what is happening, what comes next and what you will receive at every step."
        />

        <div ref={ref} className="relative mt-14 lg:mt-20">
          <div className="rule" aria-hidden="true" />
          <motion.div
            style={{ scaleX }}
            className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
            aria-hidden="true"
          />

          <ol className="grid gap-y-10 md:grid-cols-5 md:gap-x-6">
            {processSteps.map((s, i) => (
              <motion.li
                key={s.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                className="relative grid grid-cols-[3.5rem_1fr] gap-x-4 pt-6 md:block md:pt-7"
              >
                <span className="absolute -top-px left-0 h-px w-8 bg-text md:w-full md:bg-transparent" aria-hidden="true" />
                <span className="display text-[2.6rem] leading-none text-accent md:text-5xl">{s.number}</span>
                <div className="md:mt-10">
                  <h3 className="display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-text/85">{s.description}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.detail}</p>
                  <ul className="mt-5 space-y-1.5">
                    {s.outputs.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-xs text-dim">
                        <span className="h-px w-3 bg-line-strong" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
