import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { LogoMark } from './Logo'
import BrandIcon from './BrandIcon'
import { site } from '../data/site'

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return <BrandIcon name="whatsapp" className={className} />
}

const SEEN_KEY = 'webrick-wa-seen'
const EASE = [0.2, 0.65, 0.2, 1]

/**
 * Floating WhatsApp chat widget. Appears after the hero, steps aside while the
 * footer is on screen, and opens a small chat card with a "Start chat" action.
 */
export default function WhatsAppButton() {
  const [pastHero, setPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(() => {
    try { return sessionStorage.getItem(SEEN_KEY) === '1' } catch { return false }
  })
  const rootRef = useRef(null)

  // Show after the hero; hide while the footer (which has its own WhatsApp link) is on screen,
  // so the widget never covers "Back to top".
  useEffect(() => {
    const footer = document.querySelector('footer')
    const update = () => {
      setPastHero(window.scrollY > 240)
      if (footer) setFooterVisible(footer.getBoundingClientRect().top < window.innerHeight - 24)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onClick = (e) => rootRef.current && !rootRef.current.contains(e.target) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  const toggle = () => {
    setOpen((v) => !v)
    if (!seen) {
      setSeen(true)
      try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* ignore */ }
    }
  }

  const show = pastHero && !footerVisible

  return (
    <div ref={rootRef} className={`fixed right-5 z-30 flex flex-col items-end gap-3 sm:right-6 ${show ? '' : 'pointer-events-none'}`} style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}>
      <AnimatePresence>
        {show && open && (
          <motion.div
            key="card"
            role="dialog"
            aria-label="Chat with Webrick on WhatsApp"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ transformOrigin: 'bottom right' }}
            className="w-[calc(100vw-2.5rem)] max-w-[330px] overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line bg-[#0f2a1e] px-4 py-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bg-1">
                <LogoMark size={22} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f2a1e] bg-[#25D366]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-text">Webrick</div>
                <div className="text-xs text-emerald-300/90">Online · usually replies in minutes</div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="-mr-1 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-text">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3 p-4">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.35, ease: EASE }}
                className="relative max-w-[88%] rounded-2xl rounded-tl-sm bg-bg-3 px-3.5 py-2.5 text-sm leading-relaxed text-text"
              >
                Hi 👋 Tell us what you&apos;re building and we&apos;ll reply on WhatsApp with next steps.
                <span className="mt-1 block text-[0.65rem] text-dim">just now</span>
              </motion.div>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] text-sm font-medium text-[#062b17] transition-colors hover:bg-[#2ee07a]"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" /> Start chat <ArrowUpRight size={15} strokeWidth={2.2} />
              </a>
              <p className="text-center text-[0.7rem] text-dim">{site.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The button animates in place (no unmount), so it becomes non-interactive the instant it starts hiding. */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with Webrick on WhatsApp'}
        aria-expanded={open}
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.6, y: show ? 0 : 16 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        whileHover={show ? { scale: 1.05 } : undefined}
        whileTap={show ? { scale: 0.94 } : undefined}
        style={{ pointerEvents: show ? 'auto' : 'none' }}
        className="group relative flex items-center gap-3"
      >
        {!open && (
          <span className="pointer-events-none hidden translate-x-2 rounded-lg border border-line bg-bg-2/95 px-3 py-2 text-sm text-text opacity-0 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Chat on WhatsApp
          </span>
        )}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-10px_rgba(37,211,102,0.7)]">
          {!open && show && <span aria-hidden="true" className="absolute inset-0 animate-[wa-ring_3.2s_ease-out_infinite] rounded-full border-2 border-[#25D366]" />}
          <motion.span
            className="relative flex items-center justify-center"
            animate={{ rotate: open ? 90 : 0, scale: open ? 0.9 : 1 }}
            transition={{ duration: 0.25 }}
          >
            {open ? <X size={26} strokeWidth={2.2} /> : <WhatsAppIcon className="h-7 w-7" />}
          </motion.span>
          {!seen && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: show ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.6 }}
              className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-bg-1 bg-accent px-1 text-[0.65rem] font-semibold text-white"
            >
              1
            </motion.span>
          )}
        </span>
      </motion.button>
    </div>
  )
}
