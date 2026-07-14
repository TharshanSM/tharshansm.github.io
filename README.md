# Ugatharshan Murugesu — Portfolio

Single-page, dark-themed portfolio. Pure HTML/CSS/JS — no build step, no
dependencies — deployed free on GitHub Pages.

**Live:** https://tharshansm.github.io
**Analytics:** https://tharshansm.goatcounter.com (GoatCounter, no cookies)

```
├── index.html      ← the site (all sections)
├── cv.html         ← the CV source → rendered to assets/…CV.pdf
├── styles.css      ← dark theme + copper accent
├── script.js       ← nav, scroll reveals, stat count-up, video lightbox
├── .nojekyll       ← skip GitHub's Jekyll build
└── assets/
    ├── Ugatharshan_Murugesu_CV.pdf      ← generated from cv.html (do not edit by hand)
    ├── profile.jpg, graduation-web.jpg  ← photos (web-optimised)
    ├── favicon.svg, favicon-32.png, apple-touch-icon.png
    ├── og-image.png                     ← link preview card (1200×630)
    └── ifs-debug-console-demo-v2.mp4    ← project demo + its poster
```

## Deploying

Push to `main` — GitHub Pages redeploys within a minute.

```powershell
git add .
git commit -m "Describe what changed"
git push
```

## The CV

`cv.html` is the source of truth. Edit it, then re-render the PDF with headless Edge:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 `
  --print-to-pdf="assets\Ugatharshan_Murugesu_CV.pdf" "file:///d:/Portfolio Website/cv.html"
```

Keep it to **two pages** — condense wording rather than letting it spill to a third.
The "Download CV" links serve this PDF, so the site updates automatically.

## Demo videos

⚠️ **Recordings of a real IFS environment must never be committed raw.** They expose the
customer hostname, and REST/Network views embed it inside scrolling response JSON. Raw
recordings are gitignored; only a reviewed, redacted clip is published.

The current demo was cut with ffmpeg from a raw recording: five safe segments concatenated,
with a blur over the panel header hostname, then verified frame-by-frame before publishing.

**When replacing a video, bump the filename** (`…-demo-v2.mp4` → `-v3`). Browsers and the
GitHub CDN cache video files aggressively; reusing a filename serves the old clip.

## Master files

Large originals (raw recordings, full-size photos, the pre-rebuild CV) live **outside**
this repo in `D:\Portfolio Masters` — keep them, they're the source for any future re-cut.

## Customising

- **Accent colour**: the `--accent*` variables at the top of `styles.css`.
- **Content**: all in `index.html`, plain commented HTML.
