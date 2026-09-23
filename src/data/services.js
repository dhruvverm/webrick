import { Globe, AppWindow, ShoppingBag, PenTool, Smartphone, Workflow } from 'lucide-react'

export const services = [
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Modern, responsive and high-performing websites for businesses.',
    icon: Globe,
    tags: ['Marketing sites', 'Landing pages', 'CMS'],
    formType: 'Website',
  },
  {
    id: 'web-applications',
    title: 'Web Applications',
    description: 'Custom web applications designed around business requirements.',
    icon: AppWindow,
    tags: ['Dashboards', 'Portals', 'Internal tools'],
    formType: 'Web application',
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce',
    description: 'Scalable e-commerce websites that help businesses sell online.',
    icon: ShoppingBag,
    tags: ['Shopify', 'Headless', 'Payments'],
    formType: 'E-commerce store',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Development',
    description: 'Clean, intuitive and conversion-focused digital interfaces.',
    icon: PenTool,
    tags: ['Design systems', 'Prototypes', 'Conversion'],
    formType: 'UI/UX design',
  },
  {
    id: 'mobile-applications',
    title: 'Mobile Applications',
    description: 'Modern mobile applications for Android and iOS.',
    icon: Smartphone,
    tags: ['Flutter', 'iOS', 'Android'],
    formType: 'Mobile app',
  },
  {
    id: 'business-solutions',
    title: 'Business Solutions',
    description: 'Custom digital tools and software to solve real business problems.',
    icon: Workflow,
    tags: ['Automation', 'Integrations', 'APIs'],
    formType: 'Something else',
  },
]
