import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import TechGlyph from '../TechGlyph'
import { techGroups, techNames } from '../../data/tech'
import { EASE } from '../ui/Reveal'

function Band() {
  const items = [...techNames, ...techNames]
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-line py-5" aria-hidden="true">
      <div className="marquee items-center gap-10 pr-10">
        {items.map((n, i) => (
          <span key={i} className="display flex items-center gap-10 whitespace-nowrap text-4xl text-text/80 sm:text-5xl">
            {n}
            <span className="h-2 w-2 rounded-[1px] bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Stack"
          meta="Chosen per project"
          title="Modern tools, chosen deliberately."
          lede="We pick the technology to fit the project, not the other way round. This is the core of what we build with."
        />
      </div>

      <div className="mt-14 lg:mt-20">
        <Band />
      </div>

      <div className="container-x">
        <dl className="mt-12 lg:mt-16">
          {techGroups.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: gi * 0.05 }}
              className="grid grid-cols-1 gap-y-3 border-b border-line py-6 sm:grid-cols-12 sm:gap-x-6 lg:py-7"
            >
              <dt className="label sm:col-span-3 sm:pt-2 lg:col-span-2">
                <span className="text-accent">0{gi + 1}</span>
                <span className="ml-3">{g.group}</span>
              </dt>
              <dd className="flex flex-wrap gap-x-10 gap-y-4 sm:col-span-9 lg:col-span-10">
                {g.items.map((t) => (
                  <span key={t.key} className="group flex items-center gap-3 text-lg text-text sm:text-xl">
                    <span className="text-dim transition-colors group-hover:text-accent">
                      <TechGlyph name={t.key} />
                    </span>
                    {t.name}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-8 max-w-xl text-sm text-dim">
          Plus TypeScript, PostgreSQL, Redis, Tailwind CSS, Firebase and whatever the project genuinely needs.
        </p>
      </div>
    </section>
  )
}
