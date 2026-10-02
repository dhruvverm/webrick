import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'framer-motion'
import { Page } from './App'

export { faq } from './data/faq'
export { site } from './data/site'
export { keywords, serviceAreas } from './data/seo'
import { services as serviceList } from './data/services'

export const services = serviceList.map(({ title, description, serviceType }) => ({ title, description, serviceType }))

/** Static HTML of the page for crawlers and no-JS visitors. */
export function render() {
  return renderToString(
    <MotionConfig reducedMotion="always">
      <Page />
    </MotionConfig>,
  )
}
