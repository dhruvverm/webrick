/** Platforms Webrick works on, grouped by job. Each item has a `key` matching a glyph in TechGlyph.jsx. */
export const techGroups = [
  {
    group: 'Advertising',
    items: [
      { key: 'meta', name: 'Meta Ads' },
      { key: 'googleads', name: 'Google Ads' },
    ],
  },
  {
    group: 'Social media',
    items: [
      { key: 'instagram', name: 'Instagram' },
      { key: 'facebook', name: 'Facebook' },
      { key: 'linkedin', name: 'LinkedIn' },
      { key: 'youtube', name: 'YouTube' },
    ],
  },
  {
    group: 'Websites',
    items: [
      { key: 'wordpress', name: 'WordPress' },
      { key: 'shopify', name: 'Shopify' },
      { key: 'woocommerce', name: 'WooCommerce' },
      { key: 'react', name: 'React' },
      { key: 'nextjs', name: 'Next.js' },
    ],
  },
  {
    group: 'Leads',
    items: [
      { key: 'whatsapp', name: 'WhatsApp Business' },
      { key: 'crm', name: 'SabseraCRM' },
      { key: 'forms', name: 'Lead forms' },
    ],
  },
  {
    group: 'Tracking',
    items: [
      { key: 'pixel', name: 'Meta Pixel' },
      { key: 'analytics', name: 'Google Analytics' },
      { key: 'search', name: 'Search Console' },
    ],
  },
]

export const techNames = techGroups.flatMap((g) => g.items.map((i) => i.name))
