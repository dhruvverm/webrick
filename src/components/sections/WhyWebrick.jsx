import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import Reveal, { EASE } from '../ui/Reveal'
import { reasons, stats } from '../../data/reasons'

function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  )
}

/** Six bricks in running bond. The brick for the hovered reason fills with the accent. */
const BRICKS = [
  [0, 0], [94, 0],
  [47, 34], [141, 34],
  [0, 68], [94, 68],
]
function MiniWall({ active }) {
  return (
    <svg viewBox="-2 -2 240 100" className="h-auto w-full max-w-[300px]" aria-hidden="true">
      {BRICKS.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width={90}
          height={28}
          rx={1}
          initial={false}
          animate={{
            fill: i === active ? '#e4632f' : 'rgba(242,239,232,0.04)',
            stroke: i === active ? '#e4632f' : 'rgba(242,239,232,0.18)',
          }}
          transition={{ duration: 0.3 }}
          strokeWidth={1}
        />
      ))}
    </svg>
  )
}

export default function WhyWebrick() {
  const [active, setActive] = useState(0)

  return (
    <section id="why" className="section">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Why Webrick"
          meta="Six reasons"
          title="Built properly. Built to last."
          lede="Most agencies ship a template with your logo on it. We build the thing your business actually needs, on a foundation that will still make sense in five years."
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <MiniWall active={active} />
              </Reveal>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={0.08 + i * 0.06}>
                    <dd className="display text-4xl lg:text-[2.8rem]">
                      <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </dd>
                    <dt className="mt-2 text-sm text-dim">{s.label}</dt>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>

          <ol className="border-t border-line lg:col-span-7" onMouseLeave={() => setActive(0)}>
            {reasons.map((r, i) => (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className="row-hover grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6 sm:gap-x-6 lg:py-7"
              >
                <span className={`mono pt-1.5 text-xs transition-colors ${active === i ? 'text-accent' : 'text-dim'}`}>0{i + 1}</span>
                <div>
                  <h3 className="display text-2xl lg:text-[1.75rem]">{r.title}</h3>
                  <p className="mt-2 max-w-lg text-[0.95rem] leading-relaxed text-muted">{r.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
