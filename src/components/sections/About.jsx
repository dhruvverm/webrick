import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { site } from '../../data/site'

const principles = [
  { title: 'Clarity over complexity', text: 'Simple structures that the next developer, and your own team, can understand.' },
  { title: 'Ship, then improve', text: 'Real users beat perfect plans. We launch solid foundations and iterate on evidence.' },
  { title: 'Own the outcome', text: 'We measure our work by what it does for your business, not by the number of pages.' },
]

const facts = [
  ['Founded', String(site.founded)],
  ['Team', 'Designers and engineers, in one room'],
  ['Based', site.location],
  ['Working with', 'Startups, local businesses, founders and growing teams'],
  ['Currently', site.availability],
]

export default function About() {
  return (
    <section id="about" className="section scroll-mt-16">
      <div className="container-x">
        <SectionHeader index="06" label="About" meta={`Est. ${site.founded}`} title="A small studio with a builder’s mindset." />

        <div className="mt-14 grid gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="display max-w-[28ch] text-2xl font-medium leading-[1.25] text-text sm:text-[1.9rem]">
                Webrick started with a simple frustration: too many businesses were paying for websites that looked fine
                and did nothing.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-muted">
                We build the other kind. Sites and software with a job to do, built by people who care whether they do
                it. We are a compact team of designers and engineers, small enough that you talk to the people doing the
                work and experienced enough to take a product from a napkin sketch to production.
              </p>
            </Reveal>

            <ol className="mt-12 border-t border-line">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={0.1 + i * 0.06} as="li" className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:gap-x-6">
                  <span className="mono pt-1 text-xs text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="display text-xl">{p.title}</h3>
                    <p className="mt-1.5 max-w-lg text-[0.95rem] text-muted">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label pt-0.5">{k}</dt>
                  <dd className="text-[0.95rem] text-text/90">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
