# Rajesh Kadiyala — Portfolio

Personal portfolio for **Rajesh Kadiyala** — AI/ML engineering, product work, and background. Single-page React app with custom CSS, scroll animations, PNG project previews, a roaming page bird, and water-ripple effects.

**Live site:** [portfolio-rajeshkadiyalaaas-projects.vercel.app](https://portfolio-rajeshkadiyalaaas-projects.vercel.app/) (Vercel, deploys from `master`)

## Features

| Area | Highlights |
|------|------------|
| **Hero** | Rotating titles, hero art, desktop + mobile background video |
| **About** | Profile, skills, section ink-wash art |
| **Projects** | Carousel with focus card and PNG preview images |
| **Background** | Alternating career timeline |
| **Contact** | Web3Forms, shine border, social + resume links |
| **Effects** | Lottie page bird, water ripples (desktop + mobile), scroll reveals |

Mobile layout activates at **900px** (`MOBILE_LAYOUT_MQ` in `src/lib/layout.ts`).

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Custom CSS** — design tokens in `src/styles/variables.css` (no Tailwind)
- **@lottiefiles/dotlottie-react** — page bird animation
- **lucide-react** — icons
- **react-type-animation** — hero title rotation
- **Web3Forms** — contact form delivery
- **sharp** / **ffmpeg-static** — dev-only asset tooling

## Project structure

```
├── public/                      # Static assets (images, videos, Lottie, resume)
│   ├── background/              # Section corner PNG art
│   └── Project_Images/          # Project card preview PNGs
├── assets/source/               # High-res sources for optimize:assets
├── docs/                        # Content reference (optional)
├── scripts/
│   ├── optimize-assets.mjs      # Regenerate WebP in public/
│   └── generate-hero-mobile-poster.mjs
└── src/
    ├── components/
    │   ├── background/          # CareerAlternatingTimeline
    │   ├── effects/             # PageBird, BirdThought
    │   ├── layout/              # Navbar, Footer
    │   ├── projects/            # ProjectCarousel
    │   ├── sections/            # Hero, About, Projects, Background, Contact
    │   └── ui/                  # ScrollReveal, WaterRipple, ErrorBoundary, …
    ├── data/                    # Content (nav, projects, skills, social, bird copy)
    ├── hooks/                   # Bird, carousel, hero video, motion
    ├── lib/                     # Layout helpers, contact submit, water engine, preload
    └── styles/                  # Global + per-section themes
```

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run optimize:assets` | WebP from `assets/source/` → `public/` |
| `npm run hero:mobile-poster` | Regenerate `public/hero-mobile-poster.webp` from mobile hero video |

## Customization

| What | Where |
|------|--------|
| Nav links | `src/data/nav.ts` |
| Projects & preview images | `src/data/projects.ts` |
| Career timeline | `src/data/background.ts` |
| Skills | `src/data/skills.ts` |
| Email, GitHub, contact row, resume | `src/data/social.ts` |
| Bird speech lines | `src/data/bird-thoughts.ts` |
| Section layout | `src/components/sections/` |
| Colors & spacing | `src/styles/variables.css` |
| Resume PDF | `public/Kadiyala_Rajesh_Resume_2026.pdf` |

## Contact form (Web3Forms)

1. Sign up at [web3forms.com](https://web3forms.com) with **rajeshkadiyalaaa@gmail.com**
2. Copy the **Access Key** from your inbox (36-character UUID)
3. Local: `cp .env.example .env.local` → set `VITE_WEB3FORMS_ACCESS_KEY` → restart `npm run dev`
4. Vercel: **Settings → Environment Variables** → same key → **Redeploy** (Vite bakes env at build time)

### Troubleshooting on Vercel

- Use the real UUID key, not the words `api key`
- **Redeploy** after adding the variable
- Enable **Production** (and **Preview** if testing preview URLs)
- If it works on `localhost` but not on `*.vercel.app`, [contact Web3Forms](https://web3forms.com/contact) to allow your domain, or add a custom domain
- Yellow setup hint above the form = key missing from the last build

## Deploy

Static Vite build. `vercel.json` configures SPA rewrites and long-cache headers for media.

```bash
npm run build
```

Deploy `dist/` to Vercel, Netlify, or any static host. Pushes to `master` auto-deploy when the repo is linked to Vercel.

---

Built by [Kadiyala Rajesh](https://www.linkedin.com/in/rajesh-kadiyala).
