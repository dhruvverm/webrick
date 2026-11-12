/**
 * Post-build step: writes the fully rendered page into dist/index.html so the HTML that
 * crawlers download already contains every heading, paragraph and link, and adds
 * FAQ + service structured data generated from the same data the page uses.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { writePages } from './pages.mjs'

const root = process.cwd()
const { render, faq, services, serviceCatalog, projects, servicePages, site, keywords, serviceAreas } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

// Animation start states (opacity 0, off-screen transforms) make no sense in static HTML: strip them.
const clean = (html) =>
  html.replace(/ style="([^"]*)"/g, (_, s) => {
    const kept = s
      .split(';')
      .map((d) => d.trim())
      .filter((d) => d && !/^(opacity|transform|clip-path|will-change|transform-origin)\s*:/i.test(d))
    return kept.length ? ` style="${kept.join(';')}"` : ''
  })

const app = clean(render())
let html = fs.readFileSync('dist/index.html', 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('prerender: #root placeholder not found')
html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${app}</div>`)

const SITE = 'https://www.webrick.in/'
const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE}#service`,
      name: 'Webrick',
      url: SITE,
      image: `${SITE}og-image.png`,
      logo: `${SITE}icon-512.png`,
      email: site.email,
      telephone: site.phoneHref.replace('tel:', ''),
      description:
        'Webrick is a digital marketing agency in India. It builds websites, runs Facebook, Instagram and Google ads, manages social media, designs branding and creatives, and sets up lead follow-up for small and growing businesses.',
      slogan: 'Websites, ads and social media that bring customers.',
      keywords: keywords.join(', '),
      knowsAbout: services.map((s) => s.serviceType),
      priceRange: 'Quote on request',
      areaServed: [{ '@type': 'Country', name: 'India' }, ...serviceAreas.map((name) => ({ '@type': 'City', name }))],
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital marketing services',
        itemListElement: serviceCatalog.map((s) => ({
          '@type': 'Offer',
          url: `${SITE}services/${servicePages.find((p) => p.serviceId === s.id)?.slug}/`,
          itemOffered: {
            '@type': 'Service',
            name: s.title,
            url: `${SITE}services/${servicePages.find((p) => p.serviceId === s.id)?.slug}/`,
            serviceType: s.serviceType,
            description: s.description,
            areaServed: { '@type': 'Country', name: 'India' },
            provider: { '@id': `${SITE}#organization` },
          },
        })),
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE}#sabseracrm`,
      name: 'SabseraCRM',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Calling CRM',
      operatingSystem: 'Web',
      description:
        'SabseraCRM is a calling CRM for sales teams built by Webrick. It brings leads, click-to-call, call logs, recordings and follow-up reminders into one screen, with a live dashboard for each agent.',
      featureList: ['Click-to-call', 'Automatic call logging', 'Call recordings', 'Follow-up reminders', 'Lead assignment', 'Agent and team reports'],
      publisher: { '@id': `${SITE}#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE}#faq`,
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
}
html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`)
// Keywords meta tag from the same list. Google ignores it; some other engines and tools still read it.
html = html.replace('<link rel="canonical"', `<meta name="keywords" content="${keywords.join(', ')}" />\n    <link rel="canonical"`)
fs.writeFileSync('dist/index.html', html)

// Static service pages and case studies, then a sitemap that lists every page.
const pageUrls = writePages({ projects, servicePages, serviceCatalog, site, SITE })
const today = new Date().toISOString().slice(0, 10)
const entries = [
  { loc: SITE, changefreq: 'weekly', priority: '1.0' },
  ...pageUrls,
  { loc: `${SITE}privacy-policy/`, changefreq: 'yearly', priority: '0.3' },
]
fs.writeFileSync(
  path.join('dist', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>\n`,
)

fs.rmSync('dist-ssr', { recursive: true, force: true })
const words = app.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
console.log(`prerendered: ${(app.length / 1024).toFixed(0)} KB of HTML, ~${words} words, ${faq.length} FAQs, ${services.length} services, ${pageUrls.length} static pages`)
