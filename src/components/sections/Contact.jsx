import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal, { EASE } from '../ui/Reveal'
import { site } from '../../data/site'

const projectTypes = ['Website', 'Web application', 'E-commerce store', 'Mobile app', 'UI/UX design', 'Something else']
const budgets = ['Under $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Not sure yet']
const initial = { name: '', email: '', company: '', type: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // TODO: replace with a real request, e.g.
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 900))
    setStatus('sent')
  }

  const rows = [
    ['Email', site.email, `mailto:${site.email}`],
    ['Phone', site.phone, site.phoneHref],
    ['Location', site.location],
    ['Response', site.responseTime],
  ]

  return (
    <section id="contact" className="section scroll-mt-16">
      <div className="container-x">
        <SectionHeader
          index="07"
          label="Contact"
          meta={site.availability}
          title="Let’s build something that moves your business forward."
        />

        <div className="mt-14 grid gap-x-8 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-sm text-[1.02rem] leading-relaxed text-muted">
                Tell us about the project. We will come back with honest thoughts, a rough scope and a clear next step.
                No pressure, no sales script.
              </p>
            </Reveal>
            <dl className="mt-10 border-t border-line">
              {rows.map(([k, v, href], i) => (
                <Reveal key={k} delay={0.05 + i * 0.05} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label pt-0.5">{k}</dt>
                  <dd className="text-[0.95rem]">
                    {href ? <a href={href} className="text-text transition-colors hover:text-accent-soft">{v}</a> : <span className="text-text/90">{v}</span>}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal delay={0.12} className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border-t border-line pt-8"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                    <Check size={18} strokeWidth={2.5} />
                  </span>
                  <h3 className="display mt-6 text-3xl">Message received.</h3>
                  <p className="mt-3 max-w-md text-muted">
                    Thanks {form.name.split(' ')[0] || 'there'}. We will reply to {form.email} within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(initial); setStatus('idle') }}
                    className="btn btn-secondary btn-sm mt-8"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
                >
                  <label className="block">
                    <span className="label">Name</span>
                    <input name="name" value={form.name} onChange={update} required placeholder="Jane Smith" className="field mt-1" autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="label">Email</span>
                    <input name="email" type="email" value={form.email} onChange={update} required placeholder="jane@company.com" className="field mt-1" autoComplete="email" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="label">Company <span className="normal-case tracking-normal">(optional)</span></span>
                    <input name="company" value={form.company} onChange={update} placeholder="Company name" className="field mt-1" autoComplete="organization" />
                  </label>
                  <label className="block">
                    <span className="label">Project type</span>
                    <select name="type" value={form.type} onChange={update} required className="field mt-1">
                      <option value="" disabled>Select one</option>
                      {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="label">Budget</span>
                    <select name="budget" value={form.budget} onChange={update} className="field mt-1">
                      <option value="">Select a range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="label">About the project</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={update}
                      required
                      rows={4}
                      placeholder="What are you building, who is it for, and when do you need it?"
                      className="field mt-1 min-h-[6rem] resize-y"
                    />
                  </label>
                  <div className="flex flex-col justify-between gap-5 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
                    <p className="text-xs text-dim">We never share your details. No newsletters, no spam.</p>
                    <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-70">
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                      <ArrowRight size={16} strokeWidth={2} className="btn-icon" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
