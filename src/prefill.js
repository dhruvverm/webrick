/** Lets other sections pre-select a "what do you need" chip in the contact form. */
export const PREFILL_EVENT = 'webrick:prefill'

export function prefillContact(type) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { type } }))
}

/** Map a portfolio category to the closest chip. */
export const TYPE_BY_CATEGORY = {
  'E-commerce': 'Website',
  'Business Website': 'Website',
  SaaS: 'Something else',
  'Web Application': 'Something else',
  'Mobile App': 'Something else',
}
