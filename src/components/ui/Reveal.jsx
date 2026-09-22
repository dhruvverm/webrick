import { motion } from 'framer-motion'

const EASE = [0.2, 0.65, 0.3, 1]

/** Fade + rise into view once, when scrolled to. `as` picks the motion element (div, li, p…). */
export default function Reveal({ children, delay = 0, y = 18, duration = 0.7, className = '', once = true, as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-50px 0px -50px 0px' }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export { EASE }
