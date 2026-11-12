/**
 * Intro curtain: plays once per browser session. The curtain is also part of the static HTML, so it is on
 * screen from the first paint; CSS lifts that static copy after 1.2 s if the app has not mounted by then
 * (see index.css), in which case the app skips its own copy instead of playing the intro twice.
 */
const KEY = 'webrick-intro-played'
let played = false
try {
  played = sessionStorage.getItem(KEY) === '1'
} catch {
  played = false
}
const mountedEarly = typeof window === 'undefined' || typeof performance === 'undefined' || performance.now() - (window.__t0 || 0) < 1100

export const SHOW_INTRO = !played && mountedEarly

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode: ignore */
  }
}
