import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], [role="radio"], summary, label, select, .cursor-pointer, [data-cursor]'
const TEXT_ENTRY = 'input, textarea, [contenteditable="true"]'
const REST = 0.22 // the dot at rest, as a fraction of its 48px hover size

/**
 * Custom pointer for mouse users: a small dot that follows with a little lag, stretches in the
 * direction it moves, grows over anything clickable, and turns into a scrolling label over
 * elements that carry `data-cursor-text`. Touch and keyboard users never see it.
 */
export default function Cursor() {
  const root = useRef(null)
  const stretch = useRef(null)
  const dot = useRef(null)
  const label = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const html = document.documentElement
    html.classList.add('has-cursor')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...mouse }
    const lab = { ...mouse }
    let scale = REST
    let target = REST
    let current = ''
    let shown = false
    let down = false
    let raf = 0

    const show = (on) => {
      shown = on
      if (root.current) root.current.style.opacity = on ? '1' : '0'
    }
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!shown) {
        pos.x = lab.x = mouse.x
        pos.y = lab.y = mouse.y
        show(true)
      }
      const t = e.target instanceof Element ? e.target : null
      const labelled = t?.closest('[data-cursor-text]')
      const next = labelled?.getAttribute('data-cursor-text') || ''
      if (next !== current) {
        current = next
        setText(next)
      }
      const hit = t?.closest(INTERACTIVE)
      if (t?.closest(TEXT_ENTRY) || next) target = 0
      else if (hit && !hit.classList.contains('cursor-default') && !hit.classList.contains('btn')) target = 1
      else target = REST
    }
    const onDown = () => (down = true)
    const onUp = () => (down = false)
    const onLeave = () => show(false)

    const tick = () => {
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y
      pos.x += dx * (reduce ? 1 : 0.24)
      pos.y += dy * (reduce ? 1 : 0.24)
      lab.x += (mouse.x - lab.x) * (reduce ? 1 : 0.16)
      lab.y += (mouse.y - lab.y) * (reduce ? 1 : 0.16)
      scale += ((down ? target * 0.8 : target) - scale) * 0.2
      const speed = reduce ? 0 : Math.min(Math.hypot(dx, dy) / 70, 0.55)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      if (root.current) root.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (stretch.current) stretch.current.style.transform = `rotate(${angle}deg) scale(${1 + speed}, ${1 - speed * 0.45})`
      if (dot.current) dot.current.style.transform = `scale(${scale})`
      if (label.current) label.current.style.transform = `translate3d(${lab.x}px, ${lab.y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    html.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      html.removeEventListener('mouseleave', onLeave)
      html.classList.remove('has-cursor')
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={root} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0 mix-blend-difference transition-opacity duration-200">
        <div ref={stretch} className="absolute -left-6 -top-6 h-12 w-12">
          <div ref={dot} className="h-full w-full rounded-full bg-text" style={{ transform: `scale(${REST})` }} />
        </div>
      </div>
      <div
        ref={label}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[301] transition-opacity duration-200 ${text ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex w-[8.5rem] items-center overflow-hidden rounded-full bg-accent py-2 text-[0.8rem] font-medium text-bg-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="cursor-label-track flex shrink-0">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="mr-4 shrink-0 whitespace-nowrap">
                {text || ' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
