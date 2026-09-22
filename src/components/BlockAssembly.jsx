import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { LOGO_BLOCKS } from './Logo'

/**
 * The Webrick "W" as a standing wall of bricks, drawn in a dimetric
 * projection. Bricks drop in from the bottom row up, then a slow wave
 * travels through the wall every few seconds. Bricks lift on hover.
 */

const S = 44
const F = 0.74
const D = 0.5
const AX = (14 * Math.PI) / 180
const AY = (56 * Math.PI) / 180

const project = (x, y, z) => [
  x * Math.cos(AX) * S - y * Math.cos(AY) * S,
  x * Math.sin(AX) * S + y * Math.sin(AY) * S - z * S,
]
const pts = (arr) => arr.map((p) => p.join(',')).join(' ')

function brickFaces(c, l) {
  const x0 = c, x1 = c + F, z0 = l, z1 = l + F
  return {
    top: [project(x0, 0, z1), project(x1, 0, z1), project(x1, D, z1), project(x0, D, z1)],
    front: [project(x0, D, z1), project(x1, D, z1), project(x1, D, z0), project(x0, D, z0)],
    side: [project(x1, 0, z1), project(x1, D, z1), project(x1, D, z0), project(x1, 0, z0)],
  }
}

const PALETTE = {
  base: { top: '#2b2b28', front: '#1a1a18', side: '#222220', stroke: 'rgba(242,239,232,0.16)' },
  accent: { top: '#f0916b', front: '#a63f18', side: '#d5592a', stroke: 'rgba(242,239,232,0.28)' },
}

export default function BlockAssembly({ className = '', delay = 0.5, wave = false }) {
  const { bricks, viewBox } = useMemo(() => {
    const list = LOGO_BLOCKS.map(([c, r, accent]) => {
      const level = 3 - r
      return { c, level, accent: !!accent, faces: brickFaces(c, level), key: `${c}-${level}` }
    }).sort((a, b) => a.c + a.level - (b.c + b.level))

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const b of list) for (const face of Object.values(b.faces)) for (const [x, y] of face) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x)
      minY = Math.min(minY, y); maxY = Math.max(maxY, y)
    }
    const pad = 14
    return { bricks: list, viewBox: `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}` }
  }, [])

  return (
    <svg viewBox={viewBox} className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {bricks.map((b) => {
        const pal = b.accent ? PALETTE.accent : PALETTE.base
        const enter = delay + b.level * 0.12 + b.c * 0.04
        return (
          <motion.g
            key={b.key}
            initial={{ opacity: 0, y: -46 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: enter, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.g
              animate={wave ? { y: [0, -7, 0] } : undefined}
              transition={
                wave
                  ? { duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3.6, delay: enter + 1.6 + (b.c + b.level) * 0.11 }
                  : undefined
              }
            >
              <motion.g whileHover={{ y: -9 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <polygon points={pts(b.faces.front)} fill={pal.front} stroke={pal.stroke} strokeWidth="0.8" strokeLinejoin="round" />
                <polygon points={pts(b.faces.side)} fill={pal.side} stroke={pal.stroke} strokeWidth="0.8" strokeLinejoin="round" />
                <polygon points={pts(b.faces.top)} fill={pal.top} stroke={pal.stroke} strokeWidth="0.8" strokeLinejoin="round" />
              </motion.g>
            </motion.g>
          </motion.g>
        )
      })}
    </svg>
  )
}
