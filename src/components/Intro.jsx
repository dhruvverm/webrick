import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOGO_BLOCKS, LOGO_COLS, LOGO_ROWS } from './Logo'
import { SHOW_INTRO, markIntroPlayed } from '../intro'

/** Bricks assemble while the fonts load, then the curtain lifts to reveal the page (once per session). */
export default function Intro() {
  const [show, setShow] = useState(SHOW_INTRO)
  const ref = useRef(null)

  useEffect(() => {
    if (!SHOW_INTRO) return
    let t
    const fonts = document.fonts && document.fonts.load
      ? Promise.all([document.fonts.load('600 1em "Bricolage Grotesque"', 'Websites, Ads & Social Media That Bring Customers.'), document.fonts.load('400 1em Geist', 'Webrick is a digital marketing agency')]).catch(() => {})
      : Promise.resolve()
    const cap = new Promise((r) => setTimeout(r, 2500))
    Promise.race([fonts, cap]).then(() => {
      t = setTimeout(() => {
        setShow(false)
        markIntroPlayed()
      }, 600)
    })
    // Safety net: if animation frames are paused (background tab, throttled webview), never leave the curtain up.
    const hard = setTimeout(() => {
      if (ref.current) ref.current.style.display = 'none'
      markIntroPlayed()
    }, 4500)
    return () => {
      clearTimeout(t)
      clearTimeout(hard)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          key="intro"
          className="intro-curtain fixed inset-0 z-[100] flex items-center justify-center bg-bg-0"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 40 40" className="h-14 w-14">
            {LOGO_BLOCKS.map(([c, r, accent]) => (
              <motion.rect
                key={`${c}-${r}`}
                x={LOGO_COLS[c]}
                y={LOGO_ROWS[r]}
                width={6}
                height={6}
                rx={0.8}
                fill={accent ? '#e4632f' : '#f2efe8'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (3 - r) * 0.12 + c * 0.03, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
