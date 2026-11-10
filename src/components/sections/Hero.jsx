import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import MaskedText from '../ui/MaskedText'
const BlockAssembly = lazy(() => import('../BlockAssembly'))
import { site } from '../../data/site'
import { INTRO_DELAY } from '../../intro'

const EASE = [0.2, 0.65, 0.2, 1]
const T = INTRO_DELAY
/** The whole job in four words: what we build, and what it is for. */
const FLOW = ['Website', 'Ads', 'Leads', 'Customers']

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

  // Desktop: the hero is pinned while the next section slides over it, and eases back as it is covered.
  const [pinned, setPinned] = useState({ on: false, vh: 900 })
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setPinned({ on: mq.matches, vh: window.innerHeight })
    sync()
    mq.addEventListener('change', sync)
    window.addEventListener('resize', sync)
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])
  const { scrollY } = useScroll()
  const coverOpacity = useTransform(scrollY, [0, pinned.vh * 0.9], [1, 0.2])
  const coverScale = useTransform(scrollY, [0, pinned.vh], [1, 0.94])

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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-bg-1 pt-24 pb-4 lg:sticky lg:top-0 lg:pt-28 lg:pb-8"
    >
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-48 right-[-8%] h-[44rem] w-[44rem] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: 'radial-gradient(closest-side, #e4632f, transparent 70%)' }}
      />

      <motion.div style={pinned.on ? { opacity: coverOpacity, scale: coverScale } : undefined} className="container-x relative">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.p {...fade(0.05)} className="label flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Digital marketing agency in India</span>
              <span className="hidden text-line-strong sm:inline">/</span>
              <span className="hidden sm:inline">Est. {site.founded}</span>
            </motion.p>

            <h1 className="display mt-6 max-w-[12ch] text-[3.1rem] xs:text-[3.7rem] sm:text-[4.6rem] lg:text-[4.9rem] xl:text-[5.7rem]">
              <MaskedText text="Websites, Ads & Social Media That Bring Customers." onMount delay={T + 0.15} stagger={0.055} accentDot />
            </h1>

            <motion.p {...fade(0.7)} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
              Webrick is a digital marketing agency. We build your website, run your ads, manage your social media and
              follow up every lead, start to end.
            </motion.p>
            <motion.div {...fade(0.8)} className="mt-6 flex flex-wrap gap-3">
              <Button href="#contact">Get a Free Quote</Button>
              <Button href="#process" variant="secondary" icon="diag">
                See How It Works
              </Button>
            </motion.div>
            <motion.ol {...fade(0.9)} aria-label="From a website to paying customers" className="mt-7 flex flex-wrap items-center gap-1.5 text-[0.72rem] sm:gap-2 sm:text-[0.8rem]">
              {FLOW.map((step, i) => (
                <li key={step} className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 sm:px-3 sm:py-1.5 ${
                      i === FLOW.length - 1 ? 'border-accent bg-accent font-medium text-bg-0' : 'border-line-strong text-muted'
                    }`}
                  >
                    {step}
                  </span>
                  {i < FLOW.length - 1 && <ArrowRight size={12} className="text-dim" aria-hidden="true" />}
                </li>
              ))}
            </motion.ol>
          </div>

          {/* Figure */}
          <motion.figure {...fade(0.35)} className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:col-span-5 lg:max-w-none">
            <div className="dots absolute -inset-10 lg:-inset-16" aria-hidden="true" />
            <div style={{ perspective: 1400 }}>
              <motion.div style={{ rotateX, rotateY, x: shiftX, transformStyle: 'preserve-3d' }}>
                {typeof window !== 'undefined' && (
                  <Suspense fallback={null}>
                    <BlockAssembly className="relative w-full" delay={T + 0.5} wave />
                  </Suspense>
                )}
              </motion.div>
            </div>
          </motion.figure>
        </div>

        <motion.dl
          {...fade(1.0)}
          className="mt-10 hidden gap-x-8 gap-y-6 border-t border-line pt-5 sm:grid-cols-[1fr_1fr_1fr_auto] lg:mt-10 lg:grid"
        >
          <div>
            <dt className="label">We do</dt>
            <dd className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Websites, paid ads, social media, branding, SEO and lead follow-up for growing businesses.
            </dd>
          </div>
          <div>
            <dt className="label">How we work</dt>
            <dd className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              One team from the first post to the paying customer. Fixed fees and weekly updates.
            </dd>
          </div>
          <div>
            <dt className="label">Where</dt>
            <dd className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              {site.location}. {site.availability}.
            </dd>
          </div>
          <a href="#services" className="label group hidden items-center gap-2 self-end sm:inline-flex" aria-label="Scroll to services">
            Scroll
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <ArrowDown size={13} className="text-accent" />
            </motion.span>
          </a>
        </motion.dl>
      </motion.div>
    </section>
  )
}
