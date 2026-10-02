import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { faq } from '../../data/faq'
import { EASE } from '../ui/Reveal'

const isServer = typeof window === 'undefined'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const MOBILE_COUNT = 6

  return (
    <section id="faq" className="section scroll-mt-20">
      <div className="container-x">
        <SectionHeader
          index="07"
          label="FAQ"
          meta="Common questions"
          title="Questions, answered."
          lede="What people ask before starting a website, app or software project with us."
        />

        <ul className="mt-14 border-t border-line lg:mt-20">
          {faq.map((item, i) => {
            const isOpen = isServer || open === i
            return (
              <li key={item.q} className={`border-b border-line ${i >= MOBILE_COUNT && !showAll ? 'hidden lg:block' : ''}`}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group row-hover flex w-full items-center justify-between gap-6 py-5 text-left lg:py-6"
                  >
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className={`mono text-xs transition-colors ${isOpen ? 'text-accent' : 'text-dim'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="display text-xl sm:text-2xl">{item.q}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-dim group-hover:text-text'}`}
                    >
                      <Plus size={20} strokeWidth={1.6} />
                    </motion.span>
                  </button>
                </h3>
                {isServer ? (
                  <div id={`faq-${i}`} className="pb-6 pl-10 pr-10 sm:pl-14">
                    <p className="max-w-2xl leading-relaxed text-muted">{item.a}</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pl-10 pr-10 leading-relaxed text-muted sm:pl-14">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            )
          })}
        </ul>
        {!showAll && faq.length > MOBILE_COUNT && (
          <button type="button" onClick={() => setShowAll(true)} className="btn btn-secondary mt-6 w-full lg:hidden">
            Show {faq.length - MOBILE_COUNT} more questions
          </button>
        )}
      </div>
    </section>
  )
}
