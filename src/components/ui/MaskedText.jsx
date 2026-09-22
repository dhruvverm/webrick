import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.2, 0.65, 0.2, 1]

/**
 * Text that rises out of a clipped line, word by word (or letter by letter).
 * Plays when the container scrolls into view by default; `onMount` plays it
 * immediately. The container is observed (not the translated glyphs), so it
 * also works for text sitting at the very bottom of the page.
 */
export default function MaskedText({
  text,
  letters = false,
  onMount = false,
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  accentDot = false,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const active = onMount || inView

  const clean = accentDot ? text.replace(/\.$/, '') : text
  const parts = letters ? clean.split('') : clean.split(' ')

  return (
    <span ref={ref} className={className}>
      {parts.map((p, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={active ? { y: 0 } : { y: '105%' }}
              transition={{ duration, ease: EASE, delay: active ? delay + i * stagger : 0 }}
            >
              {p === ' ' ? ' ' : p}
              {accentDot && i === parts.length - 1 && <span className="text-accent">.</span>}
            </motion.span>
          </span>
          {!letters && i < parts.length - 1 && ' '}
        </Fragment>
      ))}
    </span>
  )
}
