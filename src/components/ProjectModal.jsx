import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import ProjectMockup from './ProjectMockup'
import Button from './ui/Button'
import useLockBody from '../hooks/useLockBody'
import { EASE } from './ui/Reveal'
import { prefillContact, TYPE_BY_CATEGORY } from '../prefill'

export default function ProjectModal({ project: p, onClose }) {
  const closeRef = useRef(null)
  useLockBody(true)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-bg-0/85 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-t-[8px] border border-line bg-bg-1 sm:rounded-[8px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-1/90 px-5 py-3 backdrop-blur-md sm:px-8">
          <span className="label">
            <span className="text-accent">({p.category})</span>
            <span className="ml-3">{p.year} · {p.duration}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="-mr-2 flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-text"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        <div
          className="relative h-64 overflow-hidden px-8 pt-10 sm:h-96 sm:px-20 sm:pt-16"
          style={{ background: `radial-gradient(120% 90% at 50% 0%, hsl(${p.hue} 18% 32% / 0.5), transparent 65%), #141413` }}
        >
          <ProjectMockup variant={p.mockup} hue={p.hue} image={p.image} name={p.name} />
        </div>

        <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <h3 id="project-title" className="display text-4xl sm:text-5xl">{p.name}</h3>
          <p className="mt-3 max-w-xl text-lg text-muted">{p.tagline}</p>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {[
                ['Overview', p.description],
                ['The challenge', p.challenge],
                ['What we built', p.solution],
              ].map(([h, body]) => (
                <div key={h} className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <h4 className="label pt-1">{h}</h4>
                  <p className="leading-relaxed text-muted">{body}</p>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <h4 className="label border-t border-line pt-5">Results</h4>
              <ul className="mt-2">
                {p.results.map((r) => (
                  <li key={r.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span className="display text-3xl">{r.value}</span>
                    <span className="text-right text-xs text-muted">{r.label}</span>
                  </li>
                ))}
              </ul>
              <h4 className="label mt-8">Technologies</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
              <h4 className="label mt-6">Services</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.services.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </aside>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
            <Button
              href="#contact"
              onClick={() => {
                prefillContact(TYPE_BY_CATEGORY[p.category])
                onClose()
              }}
            >
              Start a similar project
            </Button>
            {p.link && (
              <Button href={p.link} target="_blank" rel="noreferrer" variant="secondary" icon="diag">
                Visit live site
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
