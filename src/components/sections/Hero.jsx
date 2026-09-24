import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Button from '../ui/Button'
import MaskedText from '../ui/MaskedText'
import BlockAssembly from '../BlockAssembly'
import { site } from '../../data/site'
import { INTRO_DELAY } from '../../intro'

const EASE = [0.2, 0.65, 0.2, 1]
const T = INTRO_DELAY

const fade = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay: T + delay },
})

export default function Hero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const rotateY = useTransform(sx, [-1, 1], [-7, 7])
  const rotateX = useTransform(sy, [-1, 1], [5, -5])
  const shiftX = useTransform(sx, [-1, 1], [-10, 10])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="home"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-8 lg:pt-28 lg:pb-10"
    >
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-48 right-[-8%] h-[44rem] w-[44rem] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: 'radial-gradient(closest-side, #e4632f, transparent 70%)' }}
      />

      <div className="container-x relative">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.p {...fade(0.05)} className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Web &amp; software development studio</span>
              <span className="hidden text-line-strong sm:inline">/</span>
              <span className="hidden sm:inline">Est. {site.founded}</span>
            </motion.p>

            <h1 className="display mt-6 max-w-[12ch] text-[3.1rem] xs:text-[3.7rem] sm:text-[4.6rem] lg:text-[4.9rem] xl:text-[5.7rem]">
              <MaskedText text="We Build Digital Experiences That Move Businesses Forward." onMount delay={T + 0.15} stagger={0.055} accentDot />
            </h1>

            <motion.p {...fade(0.7)} className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-muted">
              Webrick helps businesses turn ideas into fast, modern and scalable websites and digital products.
            </motion.p>
            <motion.div {...fade(0.8)} className="mt-7 flex flex-wrap gap-3">
              <Button href="#contact">Start a Project</Button>
              <Button href="#work" variant="secondary" icon="diag">
                Explore Our Work
              </Button>
            </motion.div>
          </div>

          {/* Figure */}
          <motion.figure {...fade(0.35)} className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:col-span-5 lg:max-w-none">
            <div className="dots absolute -inset-10 lg:-inset-16" aria-hidden="true" />
            <div style={{ perspective: 1400 }}>
              <motion.div style={{ rotateX, rotateY, x: shiftX, transformStyle: 'preserve-3d' }}>
                <BlockAssembly className="relative w-full" delay={T + 0.5} wave />
              </motion.div>
            </div>
            <figcaption className="label relative mt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span>Fig. 01 — The Webrick mark</span>
              <span className="sm:text-right">Twenty bricks, stack bond</span>
            </figcaption>
          </motion.figure>
        </div>

      </div>
    </section>
  )
}
