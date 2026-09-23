/** Lets other sections pre-select a project type in the contact form. */
export const PREFILL_EVENT = 'webrick:prefill'

export function prefillContact(type) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { type } }))
}

/** Map a portfolio category to the closest project-type chip. */
export const TYPE_BY_CATEGORY = {
  'E-commerce': 'E-commerce store',
  'Business Website': 'Website',
  SaaS: 'Web application',
  'Web Application': 'Web application',
  'Mobile App': 'Mobile app',
}
