import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'
import { site } from '../../data/site'

const principles = [
  { title: 'Custom-built, never templated', text: 'Designed and coded around your business.' },
  { title: 'Fast and responsive by default', text: 'Tested on real phones before launch.' },
  { title: 'One point of contact', text: 'Weekly updates from kickoff to launch.' },
]

const facts = [
  ['Founded', String(site.founded)],
  ['Based', site.location],
  ['Currently', site.availability],
]

export default function About() {
  return (
    <section id="about" className="section scroll-mt-20">
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
                We build the other kind: sites and software with a job to do, by a small team you talk to directly.
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
