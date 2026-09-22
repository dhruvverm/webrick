/** Grouped by layer. Each item has a `key` matching a glyph in TechGlyph.jsx. */
export const techGroups = [
  { group: 'Frontend', items: [{ key: 'react', name: 'React' }, { key: 'javascript', name: 'JavaScript' }] },
  { group: 'Backend', items: [{ key: 'node', name: 'Node.js' }, { key: 'php', name: 'PHP' }] },
  { group: 'Platforms', items: [{ key: 'shopify', name: 'Shopify' }, { key: 'wordpress', name: 'WordPress' }] },
  { group: 'Mobile', items: [{ key: 'flutter', name: 'Flutter' }] },
  { group: 'Infrastructure', items: [{ key: 'aws', name: 'AWS' }, { key: 'docker', name: 'Docker' }, { key: 'git', name: 'Git' }] },
]

export const techNames = techGroups.flatMap((g) => g.items.map((i) => i.name))
