import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { LOGO_BLOCKS } from './Logo'

/**
 * The Webrick "W" as a standing wall of real 3D bricks (CSS transforms,
 * six faces each) viewed in a dimetric projection. Bricks drop in from the
 * bottom row up, a slow wave travels through the wall, and hovering or
 * tapping a brick turns it a full 360° about its vertical axis in one second.
 *
 * Browsers do not hit-test 3D-transformed faces reliably, so pointer
 * position is matched against each brick's on-screen rectangle by hand.
 * Sizes are in `cqw` so the figure scales with its container width.
 */

const W = 17 // brick length
const H = 8 // brick height
const D = 8 // brick depth
const PX = 21 // column pitch
const PY = 10 // row pitch (brick height + mortar gap)
const LEVELS = 8 // each logo cell is two stacked bricks
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
  ['front', `translateZ(${u(D / 2)})`, W, H],
  ['back', `rotateY(180deg) translateZ(${u(D / 2)})`, W, H],
  ['right', `rotateY(90deg) translateZ(${u(W / 2)})`, D, H],
  ['left', `rotateY(-90deg) translateZ(${u(W / 2)})`, D, H],
  ['top', `rotateX(90deg) translateZ(${u(H / 2)})`, W, D],
  ['bottom', `rotateX(-90deg) translateZ(${u(H / 2)})`, W, D],
]

function Brick({ id, pal, register }) {
  const ref = useRef(null)
  const [turns, setTurns] = useState(0)
  const busy = useRef(false)

  const spin = useCallback(() => {
    if (busy.current) return
    busy.current = true
    setTurns((n) => n + 1)
    setTimeout(() => { busy.current = false }, 1050)
  }, [])

  useEffect(() => {
    register(id, { el: ref.current, spin })
    return () => register(id, null)
  }, [id, register, spin])

  return (
    <motion.div
      ref={ref}
      animate={{ rotateY: turns * 360 }}
      transition={{ duration: 1, ease: [0.45, 0, 0.2, 1] }}
      className="relative"
      style={{ width: u(W), height: u(H), transformStyle: 'preserve-3d' }}
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
  const registry = useRef(new Map())
  const lastHit = useRef(null)
  const [overBrick, setOverBrick] = useState(false)

  const register = useCallback((id, entry) => {
    if (entry) registry.current.set(id, entry)
    else registry.current.delete(id)
  }, [])

  // Which brick's projected rectangle is under the pointer? Later bricks win ties (they are drawn in front).
  const hitTest = (x, y) => {
    let hit = null
    for (const [id, { el }] of registry.current) {
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) hit = id
    }
    return hit
  }

  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return
    const id = hitTest(e.clientX, e.clientY)
    setOverBrick(!!id)
    if (id && id !== lastHit.current) registry.current.get(id)?.spin()
    lastHit.current = id
  }
  const onPointerLeave = () => {
    lastHit.current = null
    setOverBrick(false)
  }
  const onPointerDown = (e) => {
    const id = hitTest(e.clientX, e.clientY)
    if (id) registry.current.get(id)?.spin()
  }

  // Two bricks per logo cell: logo row r (0 = top) becomes levels (3-r)*2+1 and (3-r)*2 (0 = bottom).
  const bricks = LOGO_BLOCKS.flatMap(([c, r, accent]) =>
    [1, 0].map((k) => ({ c, level: (3 - r) * 2 + k, accent: !!accent, key: `${c}-${r}-${k}` })),
  )
  const wallW = 4 * PX + W
  const wallH = (LEVELS - 1) * PY + H

  return (
    <div
      className={`${className} ${overBrick ? 'cursor-pointer' : ''}`}
      style={{ containerType: 'inline-size', touchAction: 'pan-y' }}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
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
            const enter = delay + b.level * 0.06 + b.c * 0.03
            return (
              <motion.div
                key={b.key}
                className="absolute"
                style={{ left: u(b.c * PX), top: u((LEVELS - 1 - b.level) * PY), width: u(W), height: u(H), transformStyle: 'preserve-3d' }}
                initial={{ y: '-120%', scale: 0.5 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: enter, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={wave ? { y: ['0%', '-12%', '0%'] } : undefined}
                  transition={
                    wave
                      ? { duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.6, delay: enter + 1.6 + (b.c + b.level * 0.5) * 0.11 }
                      : undefined
                  }
                >
                  <Brick id={b.key} pal={pal} register={register} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
