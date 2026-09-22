/** Intro curtain: plays once per browser session. Hero timings offset by INTRO_DELAY. */
const KEY = 'webrick-intro-played'
let played = false
try {
  played = sessionStorage.getItem(KEY) === '1'
} catch {
  played = false
}

export const SHOW_INTRO = !played
export const INTRO_DELAY = SHOW_INTRO ? 1.3 : 0

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    /* private mode: ignore */
  }
}
