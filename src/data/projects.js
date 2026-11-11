/**
 * Portfolio projects.
 *
 * These are placeholders. Replace each entry with a real project — the UI
 * reads everything from this file. `mockup` picks a stylised preview layout
 * (storefront | business | dashboard | app | mobile | gallery) and `hue`
 * (0–360) tints it. Drop a real screenshot into `image` to replace the mockup.
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
    id: 'northwind-supply',
    name: 'Northwind Supply',
    category: 'E-commerce',
    tagline: 'A B2B storefront built for repeat industrial buyers.',
    description:
      'Northwind sells industrial consumables to trade customers. We rebuilt their store on Shopify with account-based pricing, quick reorder flows and a search that actually understands part numbers.',
    challenge:
      'The previous store was slow, hard to browse on mobile and forced trade customers to email in orders because pricing tiers could not be shown online.',
    solution:
      'A custom Shopify theme with tiered B2B pricing, a saved-list reorder system, structured product data for 4,000+ SKUs and a lightweight headless search layer.',
    results: [
      { value: '+64%', label: 'Online orders' },
      { value: '1.1s', label: 'Largest Contentful Paint' },
      { value: '3x', label: 'Mobile conversion' },
    ],
    tech: ['Shopify', 'Liquid', 'React', 'Node.js'],
    services: ['E-Commerce', 'UI/UX'],
    year: '2025',
    duration: '10 weeks',
    mockup: 'storefront',
    hue: 212,
    image: null,
    link: null,
  },
  {
    id: 'lumen-dental',
    name: 'Lumen Dental',
    category: 'Business Website',
    tagline: 'A calm, fast website for a multi-location dental group.',
    description:
      'Lumen runs four clinics and needed one website that could route patients to the right location, show real availability and rank locally for each practice.',
    challenge:
      'Four separate legacy sites, inconsistent branding and no way for patients to book without calling during office hours.',
    solution:
      'A single React site with location-aware pages, integrated online booking, structured data for local SEO and a content model the clinic staff can edit themselves.',
    results: [
      { value: '2.4x', label: 'Booking requests' },
      { value: '98', label: 'Lighthouse performance' },
      { value: '#1', label: 'Local ranking, 3 of 4 areas' },
    ],
    tech: ['React', 'Vite', 'Headless CMS', 'Vercel'],
    services: ['Website Development', 'UI/UX'],
    year: '2025',
    duration: '6 weeks',
    mockup: 'business',
    hue: 168,
    image: null,
    link: null,
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
  {
    id: 'fleetly',
    name: 'Fleetly',
    category: 'Web Application',
    tagline: 'Fleet maintenance tracking for a regional logistics company.',
    description:
      'Fleetly replaced a paper-and-WhatsApp process for tracking 140 vehicles, their service schedules, driver assignments and compliance documents.',
    challenge:
      'Missed service intervals were costing the business in breakdowns and fines. Data lived in three places and none of them agreed.',
    solution:
      'An internal web app with a vehicle timeline, automated service reminders, document expiry alerts and role-based access for drivers, mechanics and managers.',
    results: [
      { value: '-38%', label: 'Unplanned downtime' },
      { value: '140', label: 'Vehicles tracked' },
      { value: '0', label: 'Missed compliance renewals' },
    ],
    tech: ['React', 'Node.js', 'Redis', 'Docker'],
    services: ['Web Applications', 'Business Solutions'],
    year: '2024',
    duration: '12 weeks',
    mockup: 'app',
    hue: 32,
    image: null,
    link: null,
  },
  {
    id: 'kabin',
    name: 'Kabin',
    category: 'Mobile App',
    tagline: 'A booking app for boutique cabin stays.',
    description:
      'Kabin lets guests browse, book and check in to a network of independently owned cabins. We built the iOS and Android apps plus the owner dashboard.',
    challenge:
      'Owners were managing bookings through three different platforms, and guests had no single place to find availability or check-in details.',
    solution:
      'A Flutter app with offline-friendly booking details, secure payments, push notifications for check-in and a web dashboard for owners to manage calendars.',
    results: [
      { value: '4.8★', label: 'Average store rating' },
      { value: '30k+', label: 'Downloads in year one' },
      { value: '92%', label: 'Bookings completed in-app' },
    ],
    tech: ['Flutter', 'Firebase', 'Stripe', 'Node.js'],
    services: ['Mobile Applications', 'UI/UX'],
    year: '2025',
    duration: '4 months',
    mockup: 'mobile',
    hue: 340,
    image: null,
    link: null,
  },
  {
    id: 'ferro-and-sons',
    name: 'Ferro & Sons',
    category: 'Business Website',
    tagline: 'A portfolio-led website for a family construction firm.',
    description:
      'Ferro & Sons had 30 years of work and no way to show it. We built a WordPress site with a project gallery that lets the team publish new builds in minutes.',
    challenge:
      'Referrals were strong but the online presence was a single page from 2012. Prospects could not see the quality of past work before calling.',
    solution:
      'A custom WordPress theme with a filterable project gallery, quote request flow and an editorial experience simple enough for a non-technical office team.',
    results: [
      { value: '+120%', label: 'Quote requests' },
      { value: '45', label: 'Projects published' },
      { value: '2 min', label: 'To publish a new project' },
    ],
    tech: ['WordPress', 'PHP', 'JavaScript', 'GSAP'],
    services: ['Website Development'],
    year: '2024',
    duration: '5 weeks',
    mockup: 'gallery',
    hue: 196,
    image: null,
    link: null,
  },
]
