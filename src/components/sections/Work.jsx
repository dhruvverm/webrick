import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import ProjectMockup from '../ProjectMockup'
import ProjectModal from '../ProjectModal'
import { projects } from '../../data/projects'
import { EASE } from '../ui/Reveal'

const PREVIEW_W = 400
const PREVIEW_H = 300

/** Inline preview for small screens. Reveals once when scrolled into view. */
function MobilePreview({ project: p }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mb-6 aspect-[16/10] overflow-hidden rounded-[6px] border border-line px-6 pt-6 lg:hidden"
      style={{ background: `radial-gradient(120% 90% at 50% 0%, hsl(${p.hue} 18% 32% / 0.5), transparent 70%), #141413` }}
    >
      <ProjectMockup variant={p.mockup} hue={p.hue} image={p.image} name={p.name} />
    </motion.div>
  )
}

/**
 * Project index. On desktop a preview follows the cursor over the hovered
 * row; on smaller screens each row carries its preview inline.
 */
export default function Work() {
  const [selected, setSelected] = useState(null)
  const [hovered, setHovered] = useState(null)
  const triggerRef = useRef(null)
  const close = useCallback(() => {
    setSelected(null)
    // hand keyboard focus back to the row that opened the dialog
    requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }))
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.5 })
  const y = useSpring(my, { stiffness: 220, damping: 28, mass: 0.5 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX + 28)
      my.set(e.clientY - PREVIEW_H / 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  const hoveredProject = hovered !== null ? projects[hovered] : null

  return (
    <section id="work" className="section scroll-mt-20">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Selected work"
          meta="2024 — 2025"
          title="Built for Real Businesses"
          lede="A selection of websites, platforms and products we have designed and built. Every one is custom, and every one is still in use."
        />

        <ul className="mt-14 border-t border-line lg:mt-20" onMouseLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.05 }}
              className="border-b border-line"
            >
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget
                  setSelected(p)
                }}
                onMouseEnter={() => setHovered(i)}
                className="group row-hover w-full py-6 text-left lg:py-7"
              >
                {/* inline preview, small screens only */}
                <MobilePreview project={p} />

                <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 sm:gap-x-6 lg:grid-cols-12">
                  <span className="mono text-xs text-dim lg:col-span-1">0{i + 1}</span>
                  <h3 className="display text-[1.75rem] transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.2,1)] group-hover:translate-x-1.5 sm:text-4xl lg:col-span-4 lg:text-[2.6rem]">
                    {p.name}
                  </h3>
                  <p className="col-start-2 mt-2 max-w-sm text-[0.95rem] leading-relaxed text-muted lg:col-span-3 lg:col-start-auto lg:mt-0">
                    {p.tagline}
                  </p>
                  <div className="col-start-2 mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm lg:col-span-3 lg:col-start-auto lg:mt-0 lg:flex-col lg:gap-y-1.5">
                    <span className="text-text/90">{p.category}</span>
                    <span className="mono text-[0.7rem] text-dim">{p.tech.slice(0, 3).join(' · ')}</span>
                  </div>
                  <span className="col-start-3 row-start-1 flex items-center gap-3 justify-self-end lg:col-span-1 lg:col-start-auto lg:row-start-auto">
                    <span className="mono hidden text-xs text-dim lg:inline">{p.year}</span>
                    <ArrowUpRight size={20} strokeWidth={1.6} className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* cursor-following preview, desktop only */}
      <motion.div
        style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        aria-hidden="true"
      >
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 overflow-hidden rounded-[6px] border border-line px-8 pt-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
              style={{
                background: `radial-gradient(120% 90% at 50% 0%, hsl(${hoveredProject.hue} 18% 32% / 0.55), transparent 70%), #141413`,
              }}
            >
              <ProjectMockup variant={hoveredProject.mockup} hue={hoveredProject.hue} image={hoveredProject.image} name={hoveredProject.name} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
