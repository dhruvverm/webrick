/**
 * Webrick logo system.
 *
 * The mark is a "W" laid from bricks in a running-bond pattern —
 * "Web" + "brick": modular blocks that build up into something bigger.
 * Two foundation bricks carry the terracotta accent.
 *
 *   ■ · · · ■
 *   ■ · ■ · ■
 *   ■ · ■ · ■
 *   · ■ · ■ ·
 */

export const LOGO_COLS = [2, 9.5, 17, 24.5, 32]
export const LOGO_ROWS = [5.75, 13.25, 20.75, 28.25]
const COLS = LOGO_COLS
const ROWS = LOGO_ROWS
const CELL = 6

// [col, row, accent?]
export const LOGO_BLOCKS = [
  [0, 0], [4, 0],
  [0, 1], [2, 1], [4, 1],
  [0, 2], [2, 2], [4, 2],
  [1, 3, true], [3, 3, true],
]

export function LogoMark({ size = 32, tile = false, className = '', light = '#f2efe8', accent = '#e4632f' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {tile && (
        <>
          <rect x="0.5" y="0.5" width="39" height="39" rx="8" fill="#171716" />
          <rect x="0.5" y="0.5" width="39" height="39" rx="8" stroke="rgba(242,239,232,0.12)" />
        </>
      )}
      {LOGO_BLOCKS.map(([c, r, isAccent]) => (
        <rect
          key={`${c}-${r}`}
          x={COLS[c]}
          y={ROWS[r]}
          width={CELL}
          height={CELL}
          rx="0.8"
          fill={isAccent ? accent : light}
        />
      ))}
    </svg>
  )
}

export function Wordmark({ size = 22, className = '' }) {
  return (
    <span
      className={`display font-semibold text-text leading-none ${className}`}
      style={{ fontSize: size, letterSpacing: '-0.04em' }}
    >
      Webrick
    </span>
  )
}

export default function Logo({ size = 28, wordmark = true, tile = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} tile={tile} />
      {wordmark && <Wordmark size={size * 0.82} />}
    </span>
  )
}
