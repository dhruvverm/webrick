/** Service id → landing page path. Kept tiny so the client bundle does not carry the page content. */
export const SERVICE_SLUGS = {
  websites: 'website-design',
  ads: 'paid-ads',
  'social-media': 'social-media-marketing',
  branding: 'branding-and-creatives',
  seo: 'seo',
  leads: 'leads-and-follow-up',
}

export const servicePath = (serviceId) => (SERVICE_SLUGS[serviceId] ? `/services/${SERVICE_SLUGS[serviceId]}/` : '/#services')
