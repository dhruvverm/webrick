import { useState } from 'react'
import { motion } from 'framer-motion'
import { LOGO_BLOCKS } from './Logo'

/**
 * The Webrick "W" as a standing wall of real 3D bricks (CSS transforms,
 * six faces each) viewed in a dimetric projection. Bricks drop in from the
 * bottom row up, a slow wave travels through the wall, and hovering or
 * tapping a brick turns it a full 360° about its vertical axis in one second.
 *
 * Sizes are in `cqw` so the figure scales with its container width.
 */

const S = 16 // brick width and height
const D = 10.5 // brick depth
const P = 21.5 // pitch between bricks
const u = (n) => `${n}cqw`

const PALETTE = {
  base: {
    front: '#1a1a18', back: '#141412', right: '#222220', left: '#161614', top: '#2b2b28', bottom: '#111110',
    border: 'rgba(242,239,232,0.16)',
  },
  accent: {
    front: '#a63f18', back: '#7d2f10', right: '#d5592a', left: '#8f3512', top: '#f0916b', bottom: '#6b2a0e',
    border: 'rgba(242,239,232,0.3)',
  },
}

// Each face is centred in the brick box, then pushed out along its axis.
const FACES = [
  ['front', `translateZ(${u(D / 2)})`, S, S],
  ['back', `rotateY(180deg) translateZ(${u(D / 2)})`, S, S],
  ['right', `rotateY(90deg) translateZ(${u(S / 2)})`, D, S],
  ['left', `rotateY(-90deg) translateZ(${u(S / 2)})`, D, S],
  ['top', `rotateX(90deg) translateZ(${u(S / 2)})`, S, D],
  ['bottom', `rotateX(-90deg) translateZ(${u(S / 2)})`, S, D],
]

function Brick({ pal }) {
  const [turns, setTurns] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setTurns((n) => n + 1)
  }
  return (
    <motion.div
      onHoverStart={spin}
      onTap={spin}
      animate={{ rotateY: turns * 360 }}
      transition={{ duration: 1, ease: [0.45, 0, 0.2, 1] }}
      onAnimationComplete={() => setSpinning(false)}
      className="relative cursor-pointer"
      style={{ width: u(S), height: u(S), transformStyle: 'preserve-3d' }}
    >
      {FACES.map(([name, transform, w, h]) => (
        <div
          key={name}
          className="absolute left-1/2 top-1/2"
          style={{
            width: u(w),
            height: u(h),
            marginLeft: u(-w / 2),
            marginTop: u(-h / 2),
            transform,
            background: pal[name],
            boxShadow: `inset 0 0 0 1px ${pal.border}`,
            backfaceVisibility: 'visible',
          }}
        />
      ))}
    </motion.div>
  )
}

export default function BlockAssembly({ className = '', delay = 0.5, wave = false }) {
  const bricks = LOGO_BLOCKS.map(([c, r, accent]) => ({ c, level: 3 - r, accent: !!accent, key: `${c}-${r}` }))
  const wallW = 4 * P + S
  const wallH = 3 * P + S

  return (
    <div className={className} style={{ containerType: 'inline-size' }} aria-hidden="true">
      <div className="relative flex items-center justify-center" style={{ height: u(96) }}>
        {/* the scene: rotated as a whole to give the dimetric view */}
        <div
          className="relative"
          style={{
            width: u(wallW),
            height: u(wallH),
            transformStyle: 'preserve-3d',
            transform: 'translateY(5cqw) rotateX(-24deg) rotateY(-34deg)',
          }}
        >
          {bricks.map((b, i) => {
            const pal = b.accent ? PALETTE.accent : PALETTE.base
            const enter = delay + b.level * 0.12 + b.c * 0.04
            return (
              <motion.div
                key={b.key}
                className="absolute"
                style={{ left: u(b.c * P), top: u((3 - b.level) * P), width: u(S), height: u(S), transformStyle: 'preserve-3d' }}
                initial={{ y: '-80%', scale: 0.4 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: enter, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={wave ? { y: ['0%', '-12%', '0%'] } : undefined}
                  transition={
                    wave
                      ? { duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.6, delay: enter + 1.6 + (b.c + b.level) * 0.11 }
                      : undefined
                  }
                >
                  <Brick pal={pal} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
