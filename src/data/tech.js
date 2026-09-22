/** Grouped by layer. Each item has a `key` matching a glyph in TechGlyph.jsx. */
export const techGroups = [
  {
    group: 'Frontend',
    items: [
      { key: 'react', name: 'React' },
      { key: 'nextjs', name: 'Next.js' },
      { key: 'typescript', name: 'TypeScript' },
      { key: 'javascript', name: 'JavaScript' },
      { key: 'tailwind', name: 'Tailwind CSS' },
      { key: 'html', name: 'HTML & CSS' },
    ],
  },
  {
    group: 'Backend',
    items: [
      { key: 'node', name: 'Node.js' },
      { key: 'express', name: 'Express' },
      { key: 'php', name: 'PHP' },
      { key: 'laravel', name: 'Laravel' },
      { key: 'python', name: 'Python' },
    ],
  },
  {
    group: 'Databases',
    items: [
      { key: 'postgresql', name: 'PostgreSQL' },
      { key: 'mysql', name: 'MySQL' },
      { key: 'mongodb', name: 'MongoDB' },
      { key: 'redis', name: 'Redis' },
      { key: 'firebase', name: 'Firebase' },
    ],
  },
  {
    group: 'Platforms',
    items: [
      { key: 'shopify', name: 'Shopify' },
      { key: 'wordpress', name: 'WordPress' },
      { key: 'woocommerce', name: 'WooCommerce' },
    ],
  },
  {
    group: 'Mobile',
    items: [
      { key: 'flutter', name: 'Flutter' },
      { key: 'reactnative', name: 'React Native' },
      { key: 'swift', name: 'Swift' },
      { key: 'kotlin', name: 'Kotlin' },
    ],
  },
  {
    group: 'Infrastructure',
    items: [
      { key: 'aws', name: 'AWS' },
      { key: 'docker', name: 'Docker' },
      { key: 'vercel', name: 'Vercel' },
      { key: 'nginx', name: 'Nginx' },
      { key: 'git', name: 'Git' },
    ],
  },
]

export const techNames = techGroups.flatMap((g) => g.items.map((i) => i.name))
