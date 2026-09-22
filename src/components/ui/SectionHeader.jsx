import Reveal from './Reveal'
import MaskedText from './MaskedText'

/**
 * Editorial section opener: hairline, index + label row, then a large title
 * that rises out of its lines, with an optional lede offset to the right.
 */
export default function SectionHeader({ index, label, meta, title, lede, className = '' }) {
  return (
    <div className={className}>
      <div className="rule" />
      <Reveal y={0} duration={0.6} className="flex items-center justify-between gap-4 py-3.5 label">
        <span>
          <span className="text-accent">({index})</span>
          <span className="ml-3 text-muted">{label}</span>
        </span>
        {meta && <span className="hidden sm:inline">{meta}</span>}
      </Reveal>
      <div className="mt-8 grid items-end gap-x-8 gap-y-6 lg:mt-12 lg:grid-cols-12">
        <h2 className="display max-w-[16ch] text-[2.5rem] sm:text-5xl lg:text-[3.9rem] lg:col-span-8">
          <MaskedText text={title} stagger={0.04} />
        </h2>
        {lede && (
          <Reveal delay={0.25} className="lg:col-span-4">
            <p className="max-w-md text-[1.02rem] leading-relaxed text-muted">{lede}</p>
          </Reveal>
        )}
      </div>
    </div>
  )
}
