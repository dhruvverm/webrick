/**
 * The production build ships the page as static HTML that is visible immediately. When the app mounts
 * over it, above-the-fold entrance animations are skipped so the content does not vanish and fade back
 * in. In dev (no pre-rendered HTML) the entrances play as designed. Evaluated before main.jsx removes
 * the attribute, because this module is imported by the components first.
 */
export const STATIC_SHOWN = typeof document !== 'undefined' && !!document.getElementById('root')?.hasAttribute('data-prerendered')
