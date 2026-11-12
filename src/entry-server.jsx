import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'framer-motion'
import { Page } from './App'

export { faq } from './data/faq'
export { site } from './data/site'
export { keywords, serviceAreas } from './data/seo'
export { projects } from './data/projects'
export { servicePages } from './data/servicePages'
import { services as serviceList } from './data/services'

export const services = serviceList.map(({ title, description, serviceType }) => ({ title, description, serviceType }))
export const serviceCatalog = serviceList.map(({ id, title, description, serviceType, tags, formType }) => ({ id, title, description, serviceType, tags, formType }))

/** Static HTML of the page for crawlers and no-JS visitors. */
export function render() {
  return renderToString(
    <MotionConfig reducedMotion="always">
      <Page />
    </MotionConfig>,
  )
}
