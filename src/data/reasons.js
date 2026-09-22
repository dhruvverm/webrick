import { Puzzle, Cpu, Smartphone, Gauge, Layers, Users } from 'lucide-react'

export const reasons = [
  {
    id: 'custom',
    title: 'Custom-built solutions',
    icon: Puzzle,
    description: 'No templates, no page builders. Every site and product is designed and coded around your business, your content and your customers.',
  },
  {
    id: 'modern',
    title: 'Modern technology',
    icon: Cpu,
    description: 'React, Node.js, Flutter and modern cloud infrastructure. A stack chosen for longevity, not for what happened to be convenient.',
  },
  {
    id: 'responsive',
    title: 'Responsive by default',
    icon: Smartphone,
    description: 'Designed and tested on real phones, tablets and desktops from day one. Not adapted for mobile at the end.',
  },
  {
    id: 'performance',
    title: 'Performance focused',
    icon: Gauge,
    description: 'Performance budgets on every build. Fast pages convert better, rank better and cost less to run.',
  },
  {
    id: 'scalable',
    title: 'Scalable architecture',
    icon: Layers,
    description: 'Clean structure, clear data models and infrastructure that grows with you, so the next feature is easier than the last.',
  },
  {
    id: 'client',
    title: 'Client-focused development',
    icon: Users,
    description: 'Weekly updates, a staging site you can watch progress on and a single point of contact from kickoff to launch.',
  },
]

/** Headline numbers. Placeholders — update to your real figures. */
export const stats = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 1.2, suffix: 's', label: 'Average page load', decimals: 1, prefix: '<' },
  { value: 6, suffix: '+', label: 'Years building' },
]
