import { Puzzle, Share2, Smartphone, Gauge, Layers, Users } from 'lucide-react'

/** Ids map to the illustrated cards in WhyWebrick.jsx; keep them stable. */
export const reasons = [
  {
    id: 'custom',
    title: 'One team, start to end',
    icon: Puzzle,
    description: 'Website, ads, creatives and follow-up come from the same people. Nothing gets lost between an agency, a freelancer and a designer.',
  },
  {
    id: 'modern',
    title: 'The right channels, not every channel',
    icon: Share2,
    description: 'Instagram, Facebook, Google or WhatsApp: we start where your customers already are and add channels only when they pay back.',
  },
  {
    id: 'responsive',
    title: 'Made for the phone first',
    icon: Smartphone,
    description: 'Your customers are on their phones. Every page, form and ad is designed and tested there before anywhere else.',
  },
  {
    id: 'performance',
    title: 'Fast pages that convert',
    icon: Gauge,
    description: 'Ads are wasted on a slow page. Ours load in about a second, so more of the clicks you pay for become enquiries.',
  },
  {
    id: 'scalable',
    title: 'Start small, grow what works',
    icon: Layers,
    description: 'Begin with a website or a small ad budget. When something brings enquiries, we put more behind it.',
  },
  {
    id: 'client',
    title: 'Weekly updates you can read',
    icon: Users,
    description: 'A short update every week: what we posted, what the ads spent, how many enquiries came in and what we will change next.',
  },
]

/** Headline numbers. Placeholders — update to your real figures. */
export const stats = [
  { value: 2, suffix: '–3 days', label: 'Typical website, brief to live' },
  { value: 0, label: 'Hidden charges: fixed quote first' },
  { value: 1, label: 'Point of contact, start to end' },
  { value: 98, label: 'Lighthouse performance, this site (desktop)' },
]
