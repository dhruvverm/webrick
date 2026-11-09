import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import { processSteps } from '../../data/process'
import { EASE } from '../ui/Reveal'

const HEADER = {
  index: '02',
  label: 'How it works',
  meta: 'Start to end',
  title: 'From first post to paying customer.',
  lede: 'Five steps, one team. You know what is happening, what it costs and what came back at every step.',
}

/** The steps as a plain list: phones, tablets, and anyone who asks for reduced motion. */
function StepsList() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <div ref={ref} className="relative mt-8 lg:mt-10">
      <div className="rule" aria-hidden="true" />
      <motion.div style={{ scaleX }} className="absolute left-0 top-0 h-px w-full origin-left bg-accent" aria-hidden="true" />

      <ol className="grid gap-y-7 md:grid-cols-5 md:gap-x-6">
        {processSteps.map((s, i) => (
          <motion.li
            key={s.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            className="relative grid grid-cols-[3.5rem_1fr] gap-x-4 pt-5 md:block md:pt-6"
          >
            <span className="absolute -top-px left-0 h-px w-8 bg-text md:w-full md:bg-transparent" aria-hidden="true" />
            <span className="display text-[2.6rem] leading-none text-accent md:text-5xl">{s.number}</span>
            <div className="md:mt-6">
              <h3 className="display text-2xl">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-text/85">{s.description}</p>
              <p className="mt-3 hidden text-sm leading-relaxed text-muted md:block">{s.detail}</p>
              <ul className="mt-5 hidden space-y-1.5 md:block">
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
  )
}

/** Desktop: the section pins to the screen and the steps slide past sideways as you scroll down. */
function PinnedSteps() {
  const stage = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const edge = 'max(3rem, calc((100vw - 86rem) / 2 + 3rem))'

  return (
    <div ref={stage} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x">
          <div className="rule" />
          <div className="label flex items-center justify-between gap-4 py-3.5">
            <span>
              <span className="text-accent">({HEADER.index})</span>
              <span className="ml-3 text-muted">{HEADER.label}</span>
            </span>
            <span>{HEADER.meta}</span>
          </div>
          <div className="mt-4 flex items-end justify-between gap-10">
            <h2 className="display max-w-[18ch] text-[clamp(2.4rem,6.2vh,3.9rem)] leading-[1.02]">{HEADER.title}</h2>
            <p className="max-w-sm text-[1.02rem] leading-relaxed text-muted">{HEADER.lede}</p>
          </div>
        </div>

        <motion.ol ref={track} style={{ x, paddingLeft: edge, paddingRight: edge }} className="mt-[4vh] flex w-max gap-5">
          {processSteps.map((s, i) => (
            <li
              key={s.number}
              className="flex h-[min(21rem,44vh)] w-[27rem] shrink-0 flex-col rounded-2xl border border-line bg-[#151514] p-7 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-start justify-between">
                <span className="display text-6xl leading-none text-accent">{s.number}</span>
                <span className="label">
                  Step {i + 1} of {processSteps.length}
                </span>
              </div>
              <h3 className="display mt-auto text-[2rem] leading-tight">{s.title}</h3>
              <p className="mt-1.5 text-text/85">{s.description}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted [@media(max-height:760px)]:hidden">{s.detail}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.outputs.map((o) => (
                  <li key={o} className="tag">
                    {o}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </motion.ol>

        <div className="container-x mt-[4vh]">
          <div className="relative h-px bg-line">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-accent" />
          </div>
          <div className="label mt-3 flex justify-between">
            <span>Keep scrolling</span>
            <span>01 — 0{processSteps.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const reduce = useReducedMotion()
  return (
    <section id="process" className="scroll-mt-20">
      <div className={`section ${reduce ? '' : 'lg:hidden'}`}>
        <div className="container-x">
          <SectionHeader {...HEADER} />
          <StepsList />
        </div>
      </div>
      {!reduce && (
        <div className="hidden lg:block">
          <PinnedSteps />
        </div>
      )}
    </section>
  )
}
