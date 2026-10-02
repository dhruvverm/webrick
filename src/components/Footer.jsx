import { ArrowUp, ArrowUpRight, Mail, Phone } from 'lucide-react'
import { LogoMark } from './Logo'
import BrandIcon from './BrandIcon'
import MaskedText from './ui/MaskedText'
import { services } from '../data/services'
import { navLinks } from '../data/nav'
import { site } from '../data/site'

const channels = [
  { label: 'WhatsApp', icon: 'whatsapp', href: site.whatsapp },
  ...site.socials.filter((s) => s.href),
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="container-x pt-10 pb-5">
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-4">
            <LogoMark size={28} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Webrick is a website and software development company in India. We build fast, modern websites, online
              stores, web apps and mobile apps for businesses that want to grow.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-flex items-center gap-2 text-text transition-colors hover:text-accent-soft">
              {site.email} <ArrowUpRight size={15} strokeWidth={1.6} />
            </a>
          </div>

          <div className="hidden md:col-span-4 md:block lg:col-span-3 lg:col-start-5">
            <h4 className="label">Services</h4>
            <ul className="mt-4 space-y-2">
              {services.map((s) => (
                <li key={s.id}><a href="#services" className="text-sm text-muted transition-colors hover:text-text">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="hidden md:col-span-3 md:block lg:col-span-2">
            <h4 className="label">Company</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.slice(1).map((l) => (
                <li key={l.href}><a href={l.href} className="text-sm text-muted transition-colors hover:text-text">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 lg:col-span-3">
            <h4 className="label">Get in touch</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="group inline-flex items-center gap-2.5 text-muted transition-colors hover:text-text">
                  <Mail size={15} strokeWidth={1.6} className="text-dim transition-colors group-hover:text-accent-soft" aria-hidden="true" />
                  Email us
                </a>
              </li>
              <li>
                <a href={site.phoneHref} aria-label={`Call ${site.phone}`} className="group inline-flex items-center gap-2.5 whitespace-nowrap text-muted transition-colors hover:text-text">
                  <Phone size={15} strokeWidth={1.6} className="text-dim transition-colors group-hover:text-accent-soft" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2 lg:gap-1.5 xl:gap-2">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={c.label}
                    title={c.label}
                    className="grid h-10 w-10 place-items-center rounded-full border lg:h-9 lg:w-9 xl:h-10 xl:w-10 border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-bg-0"
                  >
                    <BrandIcon name={c.icon} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 whitespace-nowrap text-sm text-dim">{site.hours}</p>
          </div>
        </div>

        <div className="mt-10 select-none overflow-hidden" aria-hidden="true">
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
