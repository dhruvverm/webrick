import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LOGO_BLOCKS, LOGO_COLS, LOGO_ROWS } from './Logo'
import { SHOW_INTRO, markIntroPlayed } from '../intro'

/** Bricks assemble, then the curtain lifts to reveal the page. */
export default function Intro() {
  const [show, setShow] = useState(SHOW_INTRO)

  useEffect(() => {
    if (!SHOW_INTRO) return
    const t = setTimeout(() => {
      setShow(false)
      markIntroPlayed()
    }, 1150)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-0"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
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
