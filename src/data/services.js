import { Globe, Megaphone, Share2, Palette, Search, PhoneCall } from 'lucide-react'

/** What Webrick sells. `formType` must match a chip in the contact form (Contact.jsx). */
export const services = [
  {
    id: 'websites',
    title: 'Websites & Online Stores',
    description: 'A fast website or online store that turns visitors into enquiries. Live in 2–3 days, with a fixed quote up front.',
    serviceType: 'Website design and development',
    icon: Globe,
    tags: ['Business websites', 'Landing pages', 'Online stores'],
    formType: 'Website',
  },
  {
    id: 'ads',
    title: 'Paid Ads',
    description: 'Facebook, Instagram and Google ads that bring enquiries, with every rupee of spend tracked.',
    serviceType: 'Paid advertising management',
    icon: Megaphone,
    tags: ['Meta ads', 'Google ads', 'Lead forms'],
    formType: 'Ads',
  },
  {
    id: 'social-media',
    title: 'Social Media',
    description: 'Social media marketing: posts, reels and captions planned, designed and published for you every week.',
    serviceType: 'Social media marketing',
    icon: Share2,
    tags: ['Instagram', 'Facebook', 'Reels'],
    formType: 'Social media',
  },
  {
    id: 'branding',
    title: 'Branding & Creatives',
    description: 'Logo, colours, post designs and ad creatives that make a small business look established.',
    serviceType: 'Branding and creative design',
    icon: Palette,
    tags: ['Logo', 'Ad creatives', 'Post designs'],
    formType: 'Branding',
  },
  {
    id: 'seo',
    title: 'SEO',
    description: 'Search engine optimisation: pages built and written so people searching for what you sell find you.',
    serviceType: 'Search engine optimisation',
    icon: Search,
    tags: ['On-page SEO', 'Local search', 'Content'],
    formType: 'Something else',
  },
  {
    id: 'leads',
    title: 'Leads & Follow-up',
    description: 'Every enquiry reaches you on WhatsApp and lands in a CRM, so no lead is forgotten.',
    serviceType: 'Lead management and CRM',
    icon: PhoneCall,
    tags: ['WhatsApp', 'Lead tracking', 'SabseraCRM'],
    formType: 'Full package',
  },
]
