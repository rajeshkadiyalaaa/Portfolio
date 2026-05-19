# Rajesh Kadiyala — Portfolio

Personal portfolio for **Rajesh Kadiyala** — AI/ML engineering, product work, and background. Single-page React app with custom CSS, scroll animations, PDF project previews, a roaming page bird, and water-ripple effects.

**Live site:** [portfolio-rajeshkadiyalaaas-projects.vercel.app](https://portfolio-rajeshkadiyalaaas-projects.vercel.app/) (Vercel, deploys from `master`)

## Features

| Area | Highlights |
|------|------------|
| **Hero** | Rotating titles, hero art, desktop + mobile background video |
| **About** | Profile, skills, section ink-wash art |
| **Projects** | Carousel with focus card, lazy PDF previews |
| **Background** | Education & experience timeline |
| **Contact** | Web3Forms, shine border, social + resume links |
| **Effects** | Lottie page bird, water ripples (desktop + mobile), scroll reveals |

Mobile layout activates at **900px** (`MOBILE_LAYOUT_MQ` in `src/lib/layout.ts`).

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Custom CSS** — design tokens in `src/styles/variables.css` (no Tailwind)
- **pdfjs-dist** — client-side PDF previews
- **@lottiefiles/dotlottie-react** — page bird animation
- **lucide-react** — icons
- **react-type-animation** — hero title rotation
- **Web3Forms** — contact form delivery
- **sharp** / **ffmpeg-static** — dev-only asset tooling

## Project structure

```
├── public/                      # Static assets (images, videos, PDFs, Lottie)
│   ├── background/              # Section corner PNG art
│   └── project-previews/        # Project PDFs for carousel
├── assets/source/               # High-res sources for optimize:assets
├── scripts/
│   ├── optimize-assets.mjs      # Regenerate WebP in public/
│   └── generate-hero-mobile-poster.mjs
└── src/
    ├── components/
    │   ├── effects/             # PageBird, BirdThought
    │   ├── layout/              # Navbar, Footer
    │   ├── projects/            # ProjectCarousel, ProjectPdfPreview
    │   ├── sections/            # Hero, About, Projects, Background, Contact
    │   └── ui/                  # ScrollReveal, WaterRipple, ErrorBoundary, …
    ├── data/                    # Content (nav, projects, skills, social, bird copy)
    ├── hooks/                   # Bird, carousel, hero video, motion, PDF
    ├── lib/                     # Layout helpers, PDF render, contact submit, water engine
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
| Projects & PDF paths | `src/data/projects.ts` |
| Timeline (education / jobs) | `src/data/background.ts` |
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
