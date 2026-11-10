# Webrick brand assets

The mark is a "W" laid from bricks in running bond. Two foundation bricks carry the terracotta accent.
The wordmark is Bricolage Grotesque SemiBold (optical size 96, letter-spacing -0.04em), converted to
outlines so these files need no fonts installed.

| File | Use |
| --- | --- |
| `webrick-logo-4096.png` / `.svg` | Horizontal logo, bone on transparent. For dark backgrounds. |
| `webrick-logo-dark-4096.png` / `.svg` | Horizontal logo, charcoal on transparent. For light backgrounds. |
| `webrick-logo-on-charcoal-4096.png` / `.svg` | Horizontal logo with charcoal background and padding. Social headers, decks. |
| `webrick-mark-2048.png` / `.svg` | Mark only, bone on transparent. |
| `webrick-mark-dark-2048.png` / `.svg` | Mark only, charcoal on transparent. |
| `webrick-mark-512.png` | Mark at 512px for avatars. |
| `webrick-app-icon-1024.png` / `webrick-mark-tile.svg` | Mark in a rounded charcoal tile. App icons, favicons, profile pictures. |

Colours: bone `#f2efe8`, charcoal `#111110`, tile `#171716`, accent `#e4632f`.
Keep clear space of at least one brick (the height of the mark ÷ 4) around the logo.

## Social kit (`social/`)

| File | Where | Notes |
| --- | --- | --- |
| `dp-1080.png` | Instagram + Facebook profile picture | Mark stacked over the wordmark, on charcoal. Fits inside the circular crop. |
| `dp-accent-1080.png` | Alternative profile picture | Same stacked lockup, charcoal on terracotta. |
| `profile-1080.png` | Mark-only profile picture | Mark on charcoal, sized for the circular crop. |
| `profile-accent-1080.png` | Alternative profile picture | Charcoal mark on terracotta. Stands out in feeds. |
| `facebook-cover-1640x624.png` | Facebook page cover | Logo kept inside the mobile-safe centre, so nothing is cropped on phones. |
| `instagram-post-1080.png` | Instagram / Facebook feed post | Brand announcement square. |
| `instagram-story-1080x1920.png` | Instagram / Facebook story, Reels cover | Content inside the story safe zone (clear of the top and bottom UI). |
| `og-image-1200x630.png` | Link previews | Also shipped as `public/og-image.png` and referenced by the site's Open Graph tags. |

All are also provided as SVG for edits. Text is outlined; no fonts required.

## Ad creatives (`ads/`)

Four concepts, each in 4:5 (`1080x1350`, feed) and 1:1 (`1080x1080`, feed/ad placements). Sources in `ads/src/`
(open an HTML in Chrome at 1080×1350; add `?sq=1` for the square). They share `ads/src/ads.css`.

| File | Concept |
| --- | --- |
| `ad-night-search-*` | "11:47 PM": someone searched for what you sell; a results list where your shop is "Not found". |
| `ad-lost-customer-*` | "One lost customer costs more than a website": ₹ ??? vs ₹3,999 on a light background. |
| `ad-whatsapp-photo-*` | "Still sending your price list as a WhatsApp photo?": blurry photo vs a clean menu page. |
| `ad-72-hours-*` | "72 hours": giant number with Day 1 / Day 2 / Day 3 cards. |
| `ad-not-technical-*` | For 25–65 owners without a site: "Don't know computers? Doesn't matter." What to send on WhatsApp, what you don't need. |
| `ad-goodwill-*` | "20 years of goodwill. 0 minutes on the internet." with a sample listing card (Gupta Tailors, fictional). |
| `ad-5-things-*` | "A website is just 5 things." A sample phone page next to the five items. |
| `ad-pay-once-*` | "₹3,999. Once. Not every month." Three reassurances and the domain/hosting note. |

## Instagram creatives (`social/instagram/`)

| File | Use |
| --- | --- |
| `carousel-01-cover` … `carousel-04-contact` (1080×1350) | Four-slide intro carousel: cover, what we build, how a project runs, contact. Post in order. |
| `post-now-live-1080` (1080×1080) | Single "Webrick is live" launch post. |
| `story-1080x1920` | Story / Reel cover with the same message. Add a link sticker to www.webrick.in. |
| `first-post-1080x1350.png` | First feed post: "Hello, world." over the brick wall. Post on its own. |
| `first-post-carousel-cover-1080x1350.png` | Same design marked `01 / 04` with a swipe cue. Use as the cover, followed by `carousel-02` … `carousel-04`. |
| `info-post-1080x1350.png` | Colourful explainer post: what we build, how it works, what it costs. |
| `info-reel-1080x1920.mp4` + `info-reel-cover-1080x1920.jpg` | 25-second Reel of the same content (no audio; add music in the app). Cover frame alongside. |
| `hook-post-1080x1350.png` | Attention post: "Still no website?" on terracotta with the live site on a phone and laptop. Source in `hook-post-src/`. |
| `vs-post-1080x1350.png` | Before/after post: a dated website vs the Webrick site, "Which one would you trust?". Source in `vs-post-src/` (`before.html` is the fake old site). |
| `chat-post-1080x1350.png` | Chat-story post: a client asks on Monday, site is live on Wednesday. Source in `chat-post-src/`. |
| `receipt-post-1080x1350.png` | "What ₹3,999 gets you" as a till receipt with every item ticked. Source in `receipt-post-src/`. |
| `story-reel-1080x1920.mp4` + `story-reel-cover-1080x1920.jpg` | 24-second client-story Reel, studio cut: a 3D phone in perspective that slowly orbits, flip-reveals from the old site to the new one, callouts anchored to real elements on the screen (pulse → line → label), word-by-word headline reveals, a 01/02/03 step tracker, ad cards flying in from depth, a light sweep on the rebuild, a circular wipe into a terracotta CTA with a tapped "DM FIX" button, and a loop back to frame one. Deep teal studio backdrop with a warm spotlight, vignette and grain; bone text, white UI cards; brand terracotta only on the finale. Result shown in the first 3 s ("0 customers" → "41 enquiries"). No pricing, no audio (add music in the app). "Sharma Furniture" and the numbers are a fictional example; swap in a real client's figures when you have them. Source in `story-reel-src/` (`before.html`/`after.html` are the two phone screens, `story-reel.html` the animation). Product photos in `story-reel-src/img/` are from Unsplash (free licence, commercial use allowed, no attribution required): sofa `photo-1691480152351-4b3f2c89ccff`, bed `photo-1633944095397-878622ebc01c`, dining `photo-1740759546813-6b58d44f5dce`, wardrobe `photo-1558997519-83ea9252edf8`, chair `photo-1774294067819-91abcd349372` (each at `https://images.unsplash.com/<id>`). `story-reel-dark.html` and `story-reel-slow.html` are earlier flat versions, kept for reference. |

SVG sources are alongside for edits; all text is outlined. The first post is built from `first-post.html`
(open it in Chrome at 1080×1350; add `?carousel=1` for the cover variant). It loads its fonts from Google Fonts.
The explainer post comes from `info-post.html` (1080×1350). The Reel is `info-reel.html`, a `seek(t)` animation rendered
frame by frame with `node info-reel-capture.mjs info-reel.html frames 1080 1920 30 25` and encoded with
`ffmpeg -framerate 30 -i frames/%04d.jpg -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart info-reel-1080x1920.mp4`.
The story Reel renders the same way from `story-reel-src/story-reel.html` with `… 1080 1920 30 21` (the slow version
from `story-reel-slow.html` with `… 30 36`); the phone screens are Chrome screenshots of `before.html` and `after.html`
at 390×844, 2× scale.
