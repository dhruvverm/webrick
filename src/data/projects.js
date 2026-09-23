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
    image: null,
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
