import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../data/site'

// WhatsApp glyph (Simple Icons, CC0)
const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

/** Floating WhatsApp chat button. Appears once the visitor scrolls past the hero. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="whatsapp"
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Webrick on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed right-5 z-30 flex items-center gap-3 sm:right-6"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        >
          <span className="pointer-events-none hidden translate-x-2 rounded-[6px] border border-line bg-bg-2/95 px-3 py-2 text-sm text-text opacity-0 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Chat on WhatsApp
          </span>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_36px_-10px_rgba(37,211,102,0.7)]">
            <span aria-hidden="true" className="absolute inset-0 animate-[wa-ring_3.2s_ease-out_infinite] rounded-full border-2 border-[#25D366]" />
            <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d={WA_PATH} />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
