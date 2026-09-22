# Webrick — company website

Editorial, dark marketing site for **Webrick**, a web and software development studio.
Built with React 19, Vite 7, Tailwind CSS 4, Framer Motion and Lucide icons.

Design system in one line: warm charcoal, bone-white type, one terracotta "brick" accent,
Bricolage Grotesque for display, Geist for body, Geist Mono for labels. Layouts are list-based
with hairline rules and numbered section openers rather than card grids.

## Run it

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Structure

```
public/
  favicon.svg          # tile version of the mark (browser tab / app icon)
  logo-icon.svg        # standalone mark, for dark backgrounds
  logo-full.svg        # mark + "Webrick" wordmark
src/
  index.css            # design tokens (@theme), surfaces, buttons, forms, animations
  App.jsx              # page composition + scroll progress bar
  components/
    Logo.jsx           # <LogoMark />, <Wordmark />, <Logo /> (React versions of the logo)
    BlockAssembly.jsx  # hero figure: the "W" as a standing wall of matte 3D bricks
    Navbar.jsx         # fixed navbar (solid on scroll) + full-screen mobile menu
    Footer.jsx
    ProjectMockup.jsx  # image-free project previews (six layouts, hue-tinted)
    ProjectModal.jsx   # project detail dialog
    TechGlyph.jsx      # minimal line glyphs for the tech stack
    ui/                # Button, SectionHeader (numbered section opener), Reveal (scroll-in)
    sections/          # Hero, Services, WhyWebrick, Work, Process, TechStack, About, Testimonials, Contact
  data/                # ALL copy and content lives here — edit these, not the components
  hooks/               # useActiveSection (nav highlight), useLockBody (menus/modals)
```

## Motion

Intro curtain (bricks assemble, curtain lifts) plays once per browser session via `sessionStorage`;
disable it by returning `false` for `SHOW_INTRO` in `src/intro.js`. Section titles rise out of their
lines (`ui/MaskedText.jsx`), the hero wall tilts with the cursor and sends a wave through the bricks,
the navbar hides on scroll down and returns on scroll up, list rows sweep a tint on hover, the
project index shows a cursor-following preview on desktop, and the footer wordmark rises letter by
letter. Everything respects `prefers-reduced-motion` where it is CSS-driven.

## Editing content

Everything the site displays comes from `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | Email, phone, location, availability line, social links |
| `nav.js` | Navbar and footer links |
| `services.js` | The six service cards (title, description, icon, tags) |
| `projects.js` | Portfolio projects and the detail modal |
| `process.js` | The five timeline steps |
| `tech.js` | Tech stack, grouped by layer (also feeds the marquee band) |
| `reasons.js` | "Why Webrick" bricks and the headline stats |
| `testimonials.js` | Client quotes |

### Replacing the placeholder projects

Each entry in `projects.js` has an `image` field (`null` by default). Set it to a screenshot path
(e.g. `/work/northwind.png` after dropping the file in `public/work/`) and the stylised mockup is
replaced automatically. `mockup` picks the placeholder layout (`storefront | business | dashboard |
app | mobile | gallery`) and `hue` (0–360) tints it. Add `link` to show a "Visit live site" button.

### Wiring the contact form

`src/components/sections/Contact.jsx` currently simulates a send. Replace the `TODO` in `onSubmit`
with a request to your backend, Formspree, EmailJS, etc. The form state object already has
`name, email, company, type, budget, message`.

### Brand tokens

Colours and fonts are defined once in `src/index.css` under `@theme`. Change `--color-accent`
to re-tint the whole site (the brick figure, mini wall and mockup CTAs read the same value).

## Logo

The mark is a "W" laid from bricks in a running-bond pattern (Web + brick). Two foundation bricks
carry the accent colour. It is available as a React component (`<LogoMark />`, with `tile` for the
app-icon version) and as static SVGs in `public/`.
