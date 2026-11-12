/**
 * Intro curtain: plays once per browser session. The curtain is also part of the static HTML, so it is on
 * screen from the first paint; the inline script in index.html lifts that static copy once the fonts are in
 * (or after 2.5 s). If that has already happened when the app mounts, the app skips its own copy.
 */
const KEY = 'webrick-intro-played'
let played = false
try {
  played = sessionStorage.getItem(KEY) === '1'
} catch {
  played = false
}
const staticLifted = typeof document !== 'undefined' && document.documentElement.classList.contains('intro-lift')

export const SHOW_INTRO = !played && !staticLifted

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode: ignore */
  }
}
