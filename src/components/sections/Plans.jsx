import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { plans, planNotes } from '../../data/plans'
import { EASE } from '../ui/Reveal'
import { prefillContact } from '../../prefill'

/** Three ways to start: a website, a website with ads, or everything handled. */
export default function Plans() {
  return (
    <section id="plans" className="section scroll-mt-20">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Plans"
          meta="Pick where to start"
          title="Three ways to start."
          lede="Take one piece or hand us the whole thing. Every plan starts with a fixed quote, so you know the cost before we begin."
        />

        <ul className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 ${
                p.highlight
                  ? 'border-accent/50 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(228,99,47,0.22),rgba(21,21,20,1)_60%)]'
                  : 'border-line bg-[#151514]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="label">
                  <span className="text-accent">0{i + 1}</span>
                  <span className="ml-3">{p.period}</span>
                </span>
                {p.highlight && <span className="rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-medium text-bg-0">Recommended</span>}
              </div>

              <h3 className="display mt-5 text-[1.75rem] leading-tight">{p.name}</h3>
              <p className="display mt-2 text-4xl text-text">{p.price}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.blurb}</p>

              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.95rem]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-text/90">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => prefillContact(p.formType)}
                className={`btn mt-7 w-full ${p.highlight ? 'btn-primary' : 'btn-secondary'}`}
              >
                {p.cta} <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-5 max-w-2xl text-sm text-dim">{planNotes}</p>
      </div>
    </section>
  )
}
