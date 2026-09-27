import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import TechGlyph from '../TechGlyph'
import { reasons, stats } from '../../data/reasons'
import { EASE } from '../ui/Reveal'

const byId = Object.fromEntries(reasons.map((r) => [r.id, r]))

/* ---------- shared card ---------- */
function Card({ id, className = '', children, index = 0 }) {
  const r = byId[id]
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-[#151514] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong ${className}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(242,239,232,0.05),transparent)]" />
      <div className="relative flex-1">{children}</div>
      <div className="relative border-t border-line p-6">
        <h3 className="display text-xl">{r.title}</h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{r.description}</p>
      </div>
    </motion.article>
  )
}

/* ---------- illustrations ---------- */

/** A wall that lays itself, brick by brick, then starts again. */
function WallLoop() {
  const rows = [3, 3, 3, 3]
  let i = 0
  return (
    <div className="flex h-56 items-end justify-center overflow-hidden px-6 pb-0 sm:h-64">
      <div className="flex w-[300px] flex-col-reverse gap-1.5">
        {rows.map((count, ri) => (
          <div key={ri} className={`flex gap-1.5 ${ri % 2 ? 'ml-[-49px]' : ''}`}>
            {Array.from({ length: count + (ri % 2) }).map((_, ci) => {
              const n = i++
              const accent = ri === 0 && ci === 1
              return (
                <motion.span
                  key={ci}
                  className="h-11 w-[92px] shrink-0 rounded-[3px] border"
                  style={{
                    background: accent ? '#e4632f' : '#232321',
                    borderColor: accent ? '#f0916b' : 'rgba(242,239,232,0.14)',
                  }}
                  animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, 0] }}
                  transition={{ duration: 6, times: [0, 0.08, 0.9, 1], repeat: Infinity, delay: n * 0.22, ease: 'easeOut' }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Lighthouse-style ring that fills to 98. */
function PerformanceRing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, 98, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView])
  const R = 54, C = 2 * Math.PI * R
  return (
    <div ref={ref} className="flex h-56 items-center justify-center gap-8 sm:h-64">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(242,239,232,0.08)" strokeWidth="8" />
          <motion.circle
            cx="64" cy="64" r={R} fill="none" stroke="#e4632f" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={inView ? { strokeDashoffset: C * (1 - 0.98) } : {}}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="display absolute inset-0 flex items-center justify-center text-4xl tabular-nums">{n}</span>
      </div>
      <div className="text-sm">
        <div className="label">Lighthouse</div>
        <div className="mt-1 text-text">Performance score</div>
        <div className="mt-4 label">Average load</div>
        <div className="mt-1 text-text">Under 1.2 s</div>
      </div>
    </div>
  )
}

/** Desktop, tablet and phone frames sharing the same layout. */
function Devices() {
  const frames = [
    { w: 132, h: 88, r: 6 },
    { w: 66, h: 88, r: 8 },
    { w: 40, h: 72, r: 9 },
  ]
  return (
    <div className="flex h-56 items-end justify-center gap-4 px-6 pb-8 sm:h-64">
      {frames.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.15 }}
          className="flex flex-col gap-1.5 border border-line-strong bg-bg-1 p-2"
          style={{ width: f.w, height: f.h, borderRadius: f.r }}
        >
          <span className="h-1.5 w-1/2 rounded-sm bg-accent/80" />
          <span className="h-1 w-4/5 rounded-sm bg-text/20" />
          <span className="h-1 w-3/5 rounded-sm bg-text/20" />
          <span className="mt-auto h-3 w-2/3 rounded-sm bg-text/10" />
        </motion.div>
      ))}
    </div>
  )
}

/** Floating glyphs of the core stack. */
function TechFloat() {
  const keys = ['react', 'node', 'flutter', 'shopify', 'aws', 'docker']
  return (
    <div className="flex h-56 items-center justify-center sm:h-64">
      <div className="grid grid-cols-3 gap-3">
      {keys.map((k, i) => (
        <motion.span
          key={k}
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-line bg-bg-1 text-muted transition-colors group-hover:text-text"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2 + (i % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
        >
          <TechGlyph name={k} />
        </motion.span>
      ))}
      </div>
    </div>
  )
}

/** Isometric plates stacking up: a new layer arrives on a loop. */
function Layers() {
  const plates = [0, 1, 2, 3]
  return (
    <div className="flex h-56 items-center justify-center sm:h-64">
      <div className="relative h-40 w-40" style={{ transform: 'rotateX(56deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
        {plates.map((p) => (
          <motion.span
            key={p}
            className="absolute inset-4 rounded-lg border"
            style={{
              borderColor: p === 3 ? '#f0916b' : 'rgba(242,239,232,0.18)',
              background: p === 3 ? 'rgba(228,99,47,0.55)' : 'rgba(242,239,232,0.05)',
              translateZ: `${p * 22}px`,
            }}
            animate={p === 3 ? { opacity: [0, 1, 1, 0], z: [90, 66, 66, 66] } : {}}
            transition={p === 3 ? { duration: 4, times: [0, 0.25, 0.85, 1], repeat: Infinity, ease: 'easeOut' } : {}}
          />
        ))}
      </div>
    </div>
  )
}

/** Weekly-update timeline with a status card. */
function Timeline() {
  const weeks = ['Kickoff', 'Design', 'Build', 'Test', 'Launch']
  return (
    <div className="flex h-56 flex-col justify-center px-6 sm:h-64 sm:px-8">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[7px] h-px bg-line" />
        <motion.div
          className="absolute left-0 top-[7px] h-px origin-left bg-accent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
        />
        <ul className="relative flex justify-between">
          {weeks.map((w, i) => (
            <li key={w} className="flex flex-col items-center gap-3">
              <motion.span
                className={`h-[15px] w-[15px] rounded-full border-2 ${i <= 2 ? 'border-accent bg-accent' : 'border-line-strong bg-bg-1'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.3 + i * 0.12 }}
              />
              <span className="mono text-[0.62rem] uppercase tracking-[0.1em] text-dim">{w}</span>
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 1 }}
        className="mt-7 flex items-center justify-between rounded-xl border border-line bg-bg-1 px-4 py-3"
      >
        <div>
          <div className="text-sm text-text">Weekly update · Week 3</div>
          <div className="mt-0.5 text-xs text-muted">Staging link, progress and next steps</div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> On track
        </span>
      </motion.div>
    </div>
  )
}

function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setN })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref} className="tabular-nums">{prefix}{n.toFixed(decimals)}{suffix}</span>
}

function StatsCard({ index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      className="relative overflow-hidden rounded-2xl border border-accent/40 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(228,99,47,0.28),rgba(21,21,20,1)_60%)] p-6 sm:p-7"
    >
      <span className="label text-accent-soft">In numbers</span>
      <ul className="mt-6 divide-y divide-line">
        {stats.map((s) => (
          <li key={s.label} className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
            <span className="display text-3xl sm:text-4xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            </span>
            <span className="text-right text-sm text-muted">{s.label}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/* ---------- section ---------- */
export default function WhyWebrick() {
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

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          <Card id="custom" index={0} className="lg:col-span-7"><WallLoop /></Card>
          <Card id="performance" index={1} className="lg:col-span-5"><PerformanceRing /></Card>
          <Card id="responsive" index={2} className="lg:col-span-4"><Devices /></Card>
          <Card id="modern" index={3} className="lg:col-span-4"><TechFloat /></Card>
          <Card id="scalable" index={4} className="lg:col-span-4"><Layers /></Card>
          <Card id="client" index={5} className="sm:col-span-2 lg:col-span-8"><Timeline /></Card>
          <div className="sm:col-span-2 lg:col-span-4"><StatsCard index={6} /></div>
        </div>
      </div>
    </section>
  )
}
