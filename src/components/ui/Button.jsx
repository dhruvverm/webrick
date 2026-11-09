import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

/**
 * Button — `as` can be 'a' (default) or 'button'.
 * variants: primary | secondary | ghost
 * icon: 'arrow' | 'diag' | null
 * With a mouse the button leans a little towards the pointer ("magnetic").
 */
export default function Button({
  as = 'a',
  variant = 'primary',
  icon = 'arrow',
  className = '',
  children,
  ...rest
}) {
  const Comp = as === 'button' ? motion.button : motion.a
  const Icon = icon === 'diag' ? ArrowUpRight : icon === 'arrow' ? ArrowRight : null
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Comp ref={ref} style={{ x: sx, y: sy }} onPointerMove={onPointerMove} onPointerLeave={reset} className={`btn btn-${variant} ${className}`} {...rest}>
      <span className="relative z-10">{children}</span>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={2.2}
          className={`relative z-10 btn-icon ${icon === 'diag' ? 'btn-icon-diag' : ''}`}
        />
      )}
    </Comp>
  )
}
