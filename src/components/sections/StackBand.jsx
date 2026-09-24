import Reveal from '../ui/Reveal'
import TechGlyph from '../TechGlyph'
import { techGroups } from '../../data/tech'

const CORE = ['react', 'nextjs', 'typescript', 'node', 'php', 'shopify', 'wordpress', 'flutter', 'aws', 'docker']
const items = techGroups.flatMap((g) => g.items).filter((t) => CORE.includes(t.key))

/** A single row of the core stack. The full grouped table lives in TechStack.jsx if you ever want it back. */
export default function StackBand() {
  return (
    <section id="stack" className="border-y border-line py-8 lg:py-10">
      <div className="container-x flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
        <Reveal y={0}>
          <span className="label whitespace-nowrap">Built with</span>
        </Reveal>
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {items.map((t, i) => (
            <Reveal key={t.key} as="li" delay={i * 0.03} className="group flex items-center gap-2.5 text-[0.95rem] text-muted transition-colors hover:text-text">
              <span className="text-dim transition-colors group-hover:text-accent"><TechGlyph name={t.key} /></span>
              {t.name}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
