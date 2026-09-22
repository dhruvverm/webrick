import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { services } from '../../data/services'
import { EASE } from '../ui/Reveal'

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-16">
      <div className="container-x">
        <SectionHeader
          index="01"
          label="Services"
          meta="Six disciplines"
          title="What We Build"
          lede="From a first website to a full product, we design and develop the digital tools a business runs on."
        />

        <ul className="mt-14 border-t border-line lg:mt-20">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                className="border-b border-line"
              >
                <a
                  href="#contact"
                  className="group row-hover grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6 sm:gap-x-6 lg:grid-cols-12 lg:items-baseline lg:py-8"
                >
                  <span className="mono pt-1 text-xs text-dim lg:col-span-1 lg:pt-0">0{i + 1}</span>

                  <div className="lg:col-span-4 lg:flex lg:items-baseline lg:gap-4">
                    <Icon size={16} strokeWidth={1.6} className="mb-3 text-dim transition-colors group-hover:text-accent lg:mb-0 lg:translate-y-0.5" />
                    <h3 className="display text-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.65,0.2,1)] group-hover:translate-x-1.5 lg:text-[2rem]">
                      {s.title}
                    </h3>
                  </div>

                  <p className="col-start-2 mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-auto lg:mt-0">
                    {s.description}
                  </p>

                  <ul className="col-start-2 mt-4 flex flex-wrap gap-1.5 lg:col-span-2 lg:col-start-auto lg:mt-0">
                    {s.tags.map((t) => (
                      <li key={t} className="tag">{t}</li>
                    ))}
                  </ul>

                  <span className="col-start-3 row-start-1 justify-self-end text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent lg:col-span-1 lg:col-start-auto lg:row-start-auto">
                    <ArrowUpRight size={20} strokeWidth={1.6} />
                  </span>
                </a>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
