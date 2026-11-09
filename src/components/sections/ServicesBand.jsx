import VelocityMarquee from '../ui/VelocityMarquee'

const WORDS = ['Websites', 'Paid Ads', 'Social Media', 'Branding', 'SEO', 'Leads']

/** Eight bricks arranged as a burst; it turns slowly between the words. */
function Burst() {
  return (
    <svg viewBox="0 0 48 48" className="spin-slow mx-6 h-8 w-8 shrink-0 text-accent sm:mx-9 sm:h-11 sm:w-11" fill="currentColor" aria-hidden="true">
      {[0, 45, 90, 135].map((a) => (
        <rect key={a} x="21" y="2" width="6" height="44" rx="2" transform={`rotate(${a} 24 24)`} />
      ))}
    </svg>
  )
}

/** The six services as one moving line; it reacts to how fast and which way you scroll. */
export default function ServicesBand() {
  return (
    <div className="border-b border-line py-5 sm:py-7">
      <VelocityMarquee baseVelocity={-1.6}>
        {WORDS.map((w) => (
          <span key={w} className="display flex items-center text-[2.6rem] leading-none text-text sm:text-6xl lg:text-7xl">
            {w}
            <Burst />
          </span>
        ))}
      </VelocityMarquee>
    </div>
  )
}
