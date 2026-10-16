// Renders a deterministic HTML animation (window.seek(t)) to JPEG frames through Chrome's DevTools protocol.
// usage: node capture.mjs <html> <framesDir> <width> <height> <fps> <seconds>
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const [html, framesDir, W, H, FPS, SECS] = [process.argv[2], process.argv[3], +process.argv[4], +process.argv[5], +process.argv[6], +process.argv[7]]
const port = 9333 + Math.floor(Math.random() * 500)
const profile = path.join(path.dirname(framesDir), 'cdp-profile')
fs.mkdirSync(framesDir, { recursive: true })
for (const f of fs.readdirSync(framesDir)) fs.unlinkSync(path.join(framesDir, f))

const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, '--hide-scrollbars', '--force-device-scale-factor=1', `--window-size=${W},${H}`, 'about:blank',
], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let page
for (let i = 0; i < 150 && !page; i++) {
  try { page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((p) => p.type === 'page') } catch {}
  if (!page) await sleep(200)
}
if (!page) { chrome.kill(); throw new Error('Chrome did not start') }

const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id) } }
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evalJs = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value

await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: 'file://' + html })
for (let i = 0; i < 200; i++) { if (await evalJs('document.readyState === "complete"')) break; await sleep(100) }
await evalJs('(window.preload ? window.preload() : document.fonts.ready).then(() => true)')
const fontsOk = await evalJs('[...document.fonts].filter(f => f.status === "loaded").map(f => f.family + " " + f.weight).join(", ")')
console.log('fonts:', fontsOk)

const total = Math.round(FPS * SECS)
const t0 = Date.now()
for (let f = 0; f < total; f++) {
  await evalJs(`seek(${(f / FPS).toFixed(5)}); true`)
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 93 })
  fs.writeFileSync(path.join(framesDir, String(f).padStart(4, '0') + '.jpg'), Buffer.from(shot.result.data, 'base64'))
  if (f % 60 === 0) console.log(`frame ${f}/${total}`)
}
console.log(`captured ${total} frames in ${((Date.now() - t0) / 1000).toFixed(1)}s`)
ws.close(); chrome.kill()
