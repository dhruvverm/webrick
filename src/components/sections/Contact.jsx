import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Reveal, { EASE } from '../ui/Reveal'
import MaskedText from '../ui/MaskedText'
import { site } from '../../data/site'

const projectTypes = ['Website', 'Web application', 'E-commerce store', 'Mobile app', 'UI/UX design', 'Something else']
const budgets = ['Under $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Not sure yet']
const initial = { name: '', email: '', company: '', type: '', budget: '', message: '' }

const shake = { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } }

/** Underline text input or textarea with a focus line that draws in from the left. */
function TextField({ label, hint, name, error, textarea = false, index = 0, inputRef, ...props }) {
  const [focused, setFocused] = useState(false)
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <motion.label
      className="block"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      <motion.span animate={error ? shake : { x: 0 }} className="block">
        <span className={`label relative flex items-center gap-2 transition-colors duration-300 ${focused ? 'text-accent' : error ? 'text-accent-soft' : ''}`}>
          <motion.span
            aria-hidden="true"
            className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-[1px] bg-accent"
            animate={{ scale: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          />
          {label}
          {hint && <span className="normal-case tracking-normal">{hint}</span>}
        </span>
        <span className="relative block">
          <Tag
            ref={inputRef}
            name={name}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-invalid={!!error}
            className={`field mt-1 ${textarea ? 'min-h-[6rem] resize-y' : ''}`}
            {...props}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
            initial={false}
            animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </span>
      </motion.span>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 block text-xs text-accent-soft"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  )
}

/** Single-choice chips with a highlight that slides between options. */
function Chips({ label, name, options, value, onChange, error, index = 0 }) {
  return (
    <motion.div
      role="radiogroup"
      aria-label={label}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
    >
      <motion.div animate={error ? shake : { x: 0 }}>
        <span className={`label relative flex items-center gap-2 transition-colors ${value ? 'text-text' : error ? 'text-accent-soft' : ''}`}>
          <motion.span aria-hidden="true" className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-[1px] bg-accent" animate={{ scale: value ? 1 : 0 }} />
          {label}
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.map((o) => {
            const active = value === o
            return (
              <motion.button
                key={o}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(o)}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-[4px] border px-3.5 py-2 text-sm transition-colors duration-300 ${
                  active ? 'border-accent text-bg-0' : 'border-line text-muted hover:border-line-strong hover:text-text'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId={`chip-${name}`}
                    className="absolute inset-0 rounded-[3px] bg-accent"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{o}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 block text-xs text-accent-soft">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function validate(form) {
  const e = {}
  if (!form.name.trim()) e.name = 'Please tell us your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email address does not look right.'
  if (!form.type) e.type = 'Pick the closest match.'
  if (form.message.trim().length < 10) e.message = 'A sentence or two about the project helps us reply properly.'
  return e
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) }

  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }
  const update = (e) => set(e.target.name, e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    const first = ['name', 'email', 'type', 'message'].find((k) => found[k])
    if (first) {
      refs[first]?.current?.focus()
      return
    }
    setStatus('sending')
    // TODO: replace with a real request, e.g.
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    await new Promise((r) => setTimeout(r, 1100))
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

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="border-t border-line pt-8"
                >
                  <motion.span
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.1 }}
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-accent"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
                    />
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: EASE, delay: 0.35 }} />
                    </svg>
                  </motion.span>
                  <h3 className="display mt-6 text-3xl sm:text-4xl">
                    <MaskedText text="Message received." onMount delay={0.3} stagger={0.08} />
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="mt-3 max-w-md text-muted"
                  >
                    Thanks {form.name.trim().split(' ')[0] || 'there'}. We will reply to {form.email} within one business day.
                  </motion.p>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={() => {
                      setForm(initial)
                      setErrors({})
                      setStatus('idle')
                    }}
                    className="btn btn-secondary btn-sm mt-8"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
                >
                  <TextField label="Name" name="name" index={0} inputRef={refs.name} value={form.name} onChange={update} error={errors.name} placeholder="Jane Smith" autoComplete="name" />
                  <TextField label="Email" name="email" type="email" index={1} inputRef={refs.email} value={form.email} onChange={update} error={errors.email} placeholder="jane@company.com" autoComplete="email" />
                  <div className="sm:col-span-2">
                    <TextField label="Company" hint="(optional)" name="company" index={2} value={form.company} onChange={update} placeholder="Company name" autoComplete="organization" />
                  </div>
                  <div className="sm:col-span-2">
                    <Chips label="Project type" name="type" index={3} options={projectTypes} value={form.type} onChange={(v) => set('type', v)} error={errors.type} />
                  </div>
                  <div className="sm:col-span-2">
                    <Chips label="Budget" name="budget" index={4} options={budgets} value={form.budget} onChange={(v) => set('budget', v)} />
                  </div>
                  <div className="sm:col-span-2">
                    <TextField
                      label="About the project"
                      name="message"
                      textarea
                      rows={4}
                      index={5}
                      inputRef={refs.message}
                      value={form.message}
                      onChange={update}
                      error={errors.message}
                      placeholder="What are you building, who is it for, and when do you need it?"
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-5 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
                    <p className="text-xs text-dim">We never share your details. No newsletters, no spam.</p>
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: 0.97 }}
                      className="btn btn-primary relative disabled:opacity-80"
                    >
                      <span>{status === 'sending' ? 'Sending' : 'Send message'}</span>
                      <motion.span
                        className="btn-icon inline-flex"
                        animate={status === 'sending' ? { x: [0, 6, 0] } : { x: 0 }}
                        transition={status === 'sending' ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' } : {}}
                      >
                        <ArrowRight size={16} strokeWidth={2} />
                      </motion.span>
                      {status === 'sending' && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.1, ease: 'linear' }}
                        />
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
