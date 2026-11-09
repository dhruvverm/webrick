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
          index="06"
          label="Platforms"
          meta="Chosen per business"
          title="The channels your customers already use."
          lede="We work on the platforms that matter for a growing business, and build on tools you can keep running yourself."
        />
      </div>

      <div className="mt-8 lg:mt-10">
        <Band />
      </div>

      <div className="container-x">
        <dl className="mt-6 hidden md:block lg:mt-8">
          {techGroups.map((g, gi) => (
            <motion.div
              key={g.group}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: gi * 0.05 }}
              className="grid grid-cols-1 gap-y-3 border-b border-line py-5 sm:grid-cols-12 sm:gap-x-6 lg:py-5"
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
        <p className="mt-6 hidden max-w-xl text-sm text-dim md:block">
          For web apps, mobile apps and custom software we also build with Node.js, Laravel, Flutter and React Native.
        </p>
      </div>
    </section>
  )
}
