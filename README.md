# Ugatharshan Murugesu — Portfolio

A modern, single-page, dark-themed portfolio website. Pure HTML/CSS/JS — no build
step, no dependencies — so it hosts for free on GitHub Pages.

```
├── index.html      ← all the content/sections
├── styles.css      ← dark theme + copper accent
├── script.js       ← nav, scroll animations, mobile menu
└── assets/
    ├── Ugatharshan_Murugesu_CV.pdf   ← add this (the CV download links to it)
    └── profile.jpg                    ← optional photo
```

## Before you publish

1. **Add your CV**: copy your PDF into `assets/` and name it
   `Ugatharshan_Murugesu_CV.pdf` (or rename it and update the two "Download CV"
   links in `index.html`).
2. **Add your photo** (optional): drop `profile.jpg` into `assets/` and swap the
   monogram for an `<img>` — see `assets/README.txt` for the exact line.

## Preview locally

Just double-click `index.html`, or from this folder run:

```powershell
python -m http.server 8000
# then open http://localhost:8000
```

---

## Host it on GitHub Pages (free)

### One-time setup

1. Create a **free GitHub account** at https://github.com (if you don't have one).
2. Create a **new repository**. To get the nicest URL, name it exactly:
   **`tharshansm.github.io`** (replace `tharshansm` with *your* GitHub username).
   Keep it **Public**. Don't add a README (this folder already has one).

### Push this folder (run in PowerShell, from `d:\Portfolio Website`)

```powershell
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/tharshansm/tharshansm.github.io.git
git push -u origin main
```

> Replace `tharshansm` with your GitHub username in the remote URL.
> On the first push GitHub will ask you to sign in (a browser window pops up).

### Turn on Pages

1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)** → **Save**.
4. Wait ~1 minute, then visit:

   **https://tharshansm.github.io**

   (If you named the repo something else, e.g. `portfolio`, the URL will be
   `https://tharshansm.github.io/portfolio/` instead.)

### Updating the site later

Any time you change a file:

```powershell
git add .
git commit -m "Describe what changed"
git push
```

GitHub Pages redeploys automatically within a minute or so.

---

## Customising

- **Accent colour**: edit the `--accent`, `--accent-2`, `--accent-3` variables at
  the top of `styles.css`.
- **Text/sections**: everything lives in `index.html` — plain, well-commented HTML.
