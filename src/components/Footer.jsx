import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { LogoMark } from './Logo'
import MaskedText from './ui/MaskedText'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x pt-14 pb-6">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMark size={28} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A web and software development studio. We build fast, modern and scalable websites and digital products
              for businesses that want to grow.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-flex items-center gap-2 text-text transition-colors hover:text-accent-soft">
              {site.email} <ArrowUpRight size={15} strokeWidth={1.6} />
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="label">Get in touch</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-text">Email us</a></li>
              <li><a href={site.phoneHref} className="text-muted transition-colors hover:text-text">Call {site.phone}</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-text">WhatsApp</a></li>
              {site.socials.filter((s) => s.href).map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-text">{s.label}</a></li>
              ))}
              <li className="text-dim">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 select-none overflow-hidden" aria-hidden="true">
          <span className="display -mb-[0.16em] block text-[22vw] leading-[0.85] tracking-[-0.05em] text-text md:text-[19vw]">
            <MaskedText text="Webrick" letters stagger={0.04} duration={1} />
          </span>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label normal-case tracking-normal">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span className="text-dim">Made in India</span>
            <a href="#home" className="group inline-flex items-center gap-1.5 transition-colors hover:text-text">
              Back to top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
