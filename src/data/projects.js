/**
 * Portfolio projects. The Work section and the project modal read everything from this file.
 *
 * `image` is the screenshot shown in the list preview and the modal (1600×846 webp in /public/work).
 * Without one, `mockup` picks a stylised preview (storefront | business | dashboard | app | mobile | gallery)
 * tinted by `hue` (0–360). `link` adds a "Visit live site" button. `duration` is optional.
 */
export const projects = [
  {
    id: 'ratedr',
    name: 'RatedR',
    category: 'E-commerce',
    tagline: 'A women’s fashion store for a D2C label: dresses, co-ords, jumpsuits and tops.',
    description:
      'RatedR sells its own line of dresses, co-ords, jumpsuits and tops across India. We built the store on Shopify so new drops go live in minutes and shoppers can browse by occasion, from best sellers to birthday outfits.',
    challenge:
      'A fashion label that launches new drops every few weeks needs a store that is quick to update, quick to load on a phone and makes it easy to buy on impulse.',
    solution:
      'A Shopify store with occasion-led collections, a video-first home page, a WhatsApp chat button for sizing questions, free shipping across India and a multi-language storefront.',
    results: [
      { value: 'Shopify', label: 'Store platform' },
      { value: '6', label: 'Collections, from Best Sellers to Birthday Outfit' },
      { value: 'WhatsApp', label: 'Chat for sizing and orders' },
    ],
    tech: ['Shopify', 'Liquid', 'JavaScript'],
    services: ['E-Commerce', 'UI/UX'],
    year: '2025',
    duration: null,
    mockup: 'storefront',
    hue: 160,
    image: '/work/ratedr.webp',
    link: 'https://ratedr.in',
  },
  {
    id: 'vedera',
    name: 'VedEra',
    category: 'E-commerce',
    tagline: 'A D2C store for handcrafted tech organisers and desk accessories.',
    description:
      'VedEra makes organisers and pouches that give every cable, charger and gadget a place. We built the Shopify store around large product photography and a short path from the home page to checkout.',
    challenge:
      'A new brand with a small catalogue needs the products, not the template, to do the talking, and a store that feels as considered as the product.',
    solution:
      'A clean Shopify storefront with full-bleed photography, a focused catalogue, a brand line on every page and chat support for questions before buying.',
    results: [
      { value: 'Shopify', label: 'Store platform' },
      { value: 'Photo-led', label: 'Full-bleed product storytelling' },
      { value: 'Chat', label: 'Support on every page' },
    ],
    tech: ['Shopify', 'Liquid', 'JavaScript'],
    services: ['E-Commerce', 'Branding'],
    year: '2025',
    duration: null,
    mockup: 'storefront',
    hue: 150,
    image: '/work/vedera.webp',
    link: 'https://vedera.in',
  },
  {
    id: 'meridian',
    name: 'Meridian',
    category: 'Business Website',
    tagline: 'A study-abroad consultancy site with a university finder and consultation booking.',
    description:
      'Meridian Education Advisory counsels students on courses, universities, scholarships and student visas across seven destinations. We designed and built a multi-page React site that explains each service plainly and turns readers into consultation bookings.',
    challenge:
      'Study-abroad advice is crowded with hype. Meridian wanted a site that reads as honest and independent, covers seven countries in depth, and still loads fast on a student’s phone.',
    solution:
      'A React and Vite site with pages for ten services and seven destinations, a university finder, scholarship guidance, FAQs, a consultation booking form and editorial typography that sets it apart from template consultancy sites.',
    results: [
      { value: '7', label: 'Destination guides' },
      { value: '10', label: 'Service pages' },
      { value: '1 form', label: 'Consultation booking' },
    ],
    tech: ['React', 'Vite', 'Framer Motion', 'React Router'],
    services: ['Website Development', 'UI/UX'],
    year: '2026',
    duration: null,
    mockup: 'business',
    hue: 215,
    image: '/work/meridian.webp',
    link: 'https://dhruvverm.github.io/Trial-web/',
  },
  {
    id: 'sabsera-crm',
    name: 'SabseraCRM',
    category: 'SaaS',
    tagline: 'Our own calling CRM, built for sales teams that live on the phone.',
    description:
      'SabseraCRM is a product built in-house at Webrick: a CRM designed around calls rather than forms. Leads, dialling, call logs, recordings and follow-ups sit on one screen, so a sales team can work through its pipeline without switching tools.',
    challenge:
      'Most CRMs treat calling as an afterthought. Teams end up dialling from personal phones, logging calls by hand and losing track of who needs a follow-up and when.',
    solution:
      'Click-to-call from any lead, automatic call logging with notes and recordings, follow-up reminders, lead assignment across a team, and a live dashboard of calls, connects and conversions per agent.',
    results: [
      { value: '1-tap', label: 'Click-to-call from any lead' },
      { value: 'Auto', label: 'Call logging, notes and recordings' },
      { value: 'Live', label: 'Per-agent call and conversion dashboard' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    services: ['Web Applications', 'Business Solutions'],
    year: '2025',
    duration: 'Ongoing',
    mockup: 'dashboard',
    hue: 262,
    image: '/work/sabsera-crm.webp',
    link: null,
  },
]
