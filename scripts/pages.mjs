/**
 * Generates the static service landing pages (/services/<slug>/) and case studies (/work/<id>/)
 * from the same data the app uses. Called from prerender.mjs after the main build.
 */
import fs from 'node:fs'
import path from 'node:path'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const MARK = '<svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="5.75" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="32" y="5.75" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="2" y="13.25" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="17" y="13.25" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="32" y="13.25" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="2" y="20.75" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="17" y="20.75" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="32" y="20.75" width="6" height="6" rx=".8" fill="#f2efe8"/><rect x="9.5" y="28.25" width="6" height="6" rx=".8" fill="#e4632f"/><rect x="24.5" y="28.25" width="6" height="6" rx=".8" fill="#e4632f"/></svg>'
const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>'
const WA_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.23 8.24m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28"/></svg>'

const wa = (phoneHref, text) => `https://wa.me/${phoneHref.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
const quoteHref = (formType) => `/?service=${encodeURIComponent(formType)}#contact`

function layout({ title, description, canonical, ogImage, ld, current, body }) {
  const nav = [['/', 'Home', 'home'], ['/#services', 'Services', 'services'], ['/#work', 'Work', 'work'], ['/#plans', 'Plans', 'plans'], ['/#contact', 'Contact', 'contact']]
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="#111110">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Webrick">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@WEBRICKINDIA">
<link rel="preload" href="/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/pages.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<div class="glow" aria-hidden="true"></div>
<header class="top">
  <div class="container row">
    <a class="brand" href="/" aria-label="Webrick home">${MARK}<span>Webrick</span></a>
    <nav class="nav" aria-label="Site">${nav.map(([h, l, k]) => `<a href="${h}"${k === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
    <a class="btn primary" href="/#contact">Get a Free Quote ${ARROW}</a>
  </div>
</header>
<main>
${body}
</main>
<footer class="foot">
  <div class="container row">
    <div>© ${new Date().getFullYear()} Webrick. All rights reserved.</div>
    <div class="links"><a href="/">Home</a><a href="/#services">Services</a><a href="/#work">Work</a><a href="/#contact">Contact</a><a href="/privacy-policy/">Privacy Policy</a></div>
  </div>
</footer>
</body>
</html>
`
}

const projectCard = (p) => `<a class="project" href="/work/${p.id}/">
  ${p.image ? `<img src="${p.image}" alt="${esc(p.name)} website screenshot" loading="lazy" width="1600" height="846">` : ''}
  <div class="pb"><small>${esc(p.category)} · ${esc(p.year)}</small><b>${esc(p.name)}</b><p>${esc(p.tagline)}</p></div>
</a>`

function servicePage({ page, service, projects, site, SITE, allPages }) {
  const url = `${SITE}services/${page.slug}/`
  const examples = projects.filter((p) => p.services.some((s) => page.matchServices.includes(s)))
  const others = allPages.filter((p) => p.slug !== page.slug)
  const waText = `Hi Webrick, I’m interested in ${page.title.toLowerCase()}. Can we discuss my requirements?`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': `${url}#service`, name: page.title, serviceType: service.serviceType, description: page.metaDescription, url,
        provider: { '@type': 'Organization', name: 'Webrick', url: SITE, '@id': `${SITE}#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
        hasOfferCatalog: { '@type': 'OfferCatalog', name: `${page.title}: what is included`, itemListElement: page.includes.map((i) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: i.title, description: i.text } })) },
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}#services` },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ] },
      { '@type': 'FAQPage', mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  }
  const body = `
<section class="hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><i>›</i><a href="/#services">Services</a><i>›</i><span>${esc(page.title)}</span></nav>
    <div class="label mono"><i></i>${esc(page.title)}</div>
    <h1>${esc(page.h1)}</h1>
    <p class="lede">${esc(service.description)}</p>
    <div class="acts">
      <a class="btn accent lg" href="${quoteHref(service.formType)}">Get a quote ${ARROW}</a>
      <a class="btn lg" href="${wa(site.phoneHref, waText)}" target="_blank" rel="noopener">${WA_ICON} WhatsApp us</a>
    </div>
    <div class="meta"><span class="chip"><b></b>Fixed quote before work</span><span class="chip">Reply within one business day</span><span class="chip">One point of contact</span></div>
  </div>
</section>

<section class="sec">
  <div class="container prose">
    ${page.intro.map((p, i) => `<p${i === 0 ? ' class="big"' : ''}>${esc(p)}</p>`).join('\n    ')}
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>01</div><h2>What’s included</h2></div><p>Everything below is part of the service, not an add-on.</p></div>
    <div class="cards three">
      ${page.includes.map((i, n) => `<div class="card"><span class="n">0${n + 1}</span><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>02</div><h2>Good for</h2></div><p>Businesses we see this work best for. If yours is different, ask; the answer is usually yes.</p></div>
    <ul class="tags">${page.goodFor.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>03</div><h2>How it works</h2></div><p>Fixed quote first, then the work, with one point of contact throughout.</p></div>
    <ol class="steps">
      ${page.steps.map((s) => `<li><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n      ')}
    </ol>
  </div>
</section>
${examples.length ? `
<section class="sec">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>04</div><h2>Examples of our work</h2></div><p>Live projects. Click through for the full case study or open the site itself.</p></div>
    <div class="projects">${examples.map(projectCard).join('')}</div>
  </div>
</section>` : ''}

<section class="sec">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>${examples.length ? '05' : '04'}</div><h2>Questions we get asked</h2></div><p>Straight answers. If yours is not here, message us.</p></div>
    <div class="faq">
      ${page.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec" style="border-bottom:0">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>More</div><h2>Other services</h2></div><p>Take one piece or hand us the whole thing.</p></div>
    <div class="cards three">
      ${others.map((o) => `<a class="card" href="/services/${o.slug}/"><h3>${esc(o.title)}</h3><p>${esc(o.h1)}</p></a>`).join('\n      ')}
    </div>
  </div>
</section>

<div class="container">
  <div class="band">
    <div><h2>${esc(page.cta.title)}</h2><p>${esc(page.cta.text)}</p></div>
    <div class="acts"><a class="btn accent lg" href="${quoteHref(service.formType)}">Get a quote ${ARROW}</a><a class="btn lg" href="${wa(site.phoneHref, waText)}" target="_blank" rel="noopener">${WA_ICON} WhatsApp</a></div>
  </div>
</div>`
  return layout({ title: page.metaTitle, description: page.metaDescription, canonical: url, ogImage: `${SITE}og-image.png`, ld, current: 'services', body })
}

function workPage({ p, projects, servicePages, site, SITE }) {
  const url = `${SITE}work/${p.id}/`
  const image = p.image ? `${SITE}${p.image.replace(/^\//, '')}` : `${SITE}og-image.png`
  const related = servicePages.filter((sp) => p.services.some((s) => sp.matchServices.includes(s)))
  const others = projects.filter((o) => o.id !== p.id)
  const title = `${p.name}: ${p.category} case study | Webrick`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': url, url, name: title, description: p.tagline, primaryImageOfPage: { '@type': 'ImageObject', url: image }, isPartOf: { '@id': `${SITE}#website` } },
      { '@type': 'CreativeWork', name: p.name, url: p.link || url, image, description: p.description, dateCreated: p.year, creator: { '@type': 'Organization', name: 'Webrick', url: SITE, '@id': `${SITE}#organization` }, keywords: [p.category, ...p.tech].join(', ') },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}#work` },
        { '@type': 'ListItem', position: 3, name: p.name, item: url },
      ] },
    ],
  }
  const body = `
<section class="hero">
  <div class="container">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><i>›</i><a href="/#work">Work</a><i>›</i><span>${esc(p.name)}</span></nav>
    <div class="label mono"><i></i>${esc(p.category)} · ${esc(p.year)}</div>
    <h1>${esc(p.name)}</h1>
    <p class="lede">${esc(p.tagline)}</p>
    <div class="acts">
      ${p.link ? `<a class="btn primary lg" href="${p.link}" target="_blank" rel="noopener">Visit live site ${ARROW}</a>` : ''}
      <a class="btn lg" href="${quoteHref(related[0] ? (related[0].serviceId === 'websites' ? 'Website' : related[0].serviceId === 'ads' ? 'Ads' : related[0].serviceId === 'social-media' ? 'Social media' : related[0].serviceId === 'branding' ? 'Branding' : 'Something else') : 'Something else')}">Start a similar project</a>
    </div>
    <div class="meta">${p.tech.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    ${p.image ? `<div class="shot"><img src="${p.image}" alt="${esc(p.name)} website screenshot" width="1600" height="846"></div>` : ''}
  </div>
</section>

<section class="sec">
  <div class="container cols">
    <div>
      <div class="block"><div class="idx mono"><i></i>Overview</div><h2>What ${esc(p.name)} needed</h2><p>${esc(p.description)}</p></div>
      <div class="block"><div class="idx mono"><i></i>Challenge</div><h2>The problem</h2><p>${esc(p.challenge)}</p></div>
      <div class="block"><div class="idx mono"><i></i>Solution</div><h2>What we built</h2><p>${esc(p.solution)}</p></div>
    </div>
    <aside class="aside">
      <div class="results">${p.results.map((r) => `<div><b>${esc(r.value)}</b><span>${esc(r.label)}</span></div>`).join('')}</div>
      <div class="facts"><h3>Stack</h3><ul>${p.tech.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div class="facts"><h3>Services</h3><ul>${p.services.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      ${related.length ? `<div class="facts"><h3>Related</h3><ul>${related.map((r) => `<li><a href="/services/${r.slug}/">${esc(r.title)}</a></li>`).join('')}</ul></div>` : ''}
    </aside>
  </div>
</section>
${others.length ? `
<section class="sec" style="border-bottom:0">
  <div class="container">
    <div class="sec-head"><div><div class="idx mono"><i></i>More work</div><h2>Other projects</h2></div><p>Every project is live. Open the site, judge it yourself.</p></div>
    <div class="projects">${others.map(projectCard).join('')}</div>
  </div>
</section>` : ''}

<div class="container">
  <div class="band">
    <div><h2>Want something like this for your business?</h2><p>Tell us what you do and we reply with a fixed quote within one business day.</p></div>
    <div class="acts"><a class="btn accent lg" href="/#contact">Get a quote ${ARROW}</a><a class="btn lg" href="${wa(site.phoneHref, `Hi Webrick, I saw the ${p.name} project. Can we discuss my requirements?`)}" target="_blank" rel="noopener">${WA_ICON} WhatsApp</a></div>
  </div>
</div>`
  return layout({ title, description: `${p.tagline} ${p.description}`.slice(0, 300), canonical: url, ogImage: image, ld, current: 'work', body })
}

/** Writes every page under dist/ and returns their sitemap entries. */
export function writePages({ projects, servicePages, serviceCatalog, site, SITE, dist = 'dist' }) {
  const urls = []
  for (const page of servicePages) {
    const service = serviceCatalog.find((s) => s.id === page.serviceId)
    if (!service) throw new Error(`pages: no service for ${page.serviceId}`)
    const dir = path.join(dist, 'services', page.slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), servicePage({ page, service, projects, site, SITE, allPages: servicePages }))
    urls.push({ loc: `${SITE}services/${page.slug}/`, changefreq: 'monthly', priority: '0.8' })
  }
  for (const p of projects) {
    const dir = path.join(dist, 'work', p.id)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), workPage({ p, projects, servicePages, site, SITE }))
    urls.push({ loc: `${SITE}work/${p.id}/`, changefreq: 'monthly', priority: '0.6' })
  }
  return urls
}
