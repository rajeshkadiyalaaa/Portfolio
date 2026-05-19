# Rajesh Kadiyala — Portfolio

Personal portfolio site for **Rajesh Kadiyala**, showcasing AI/ML engineering work, product design, and professional background. Built as a fast, single-page React app with custom CSS, scroll animations, and interactive section effects.

## Overview

The site presents a cohesive narrative across five main areas: an animated hero introduction, an about section with skills, a projects gallery with live PDF previews, a background timeline for education and experience, and a contact form. Visual design uses a warm cream palette, ink-wash decorative artwork, and subtle water-ripple interactions on desktop.

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Name, rotating role titles, hero artwork, optional background video |
| **About** | Profile photo, bio, skill tags, mountain/sun and footer art |
| **Projects** | Project cards with PDF preview thumbnails and links |
| **Background** | Education & experience timelines with brush-style underlines |
| **Contact** | Form with animated shine border and social/resume links |

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — dev server and production builds
- **Custom CSS** — section themes, design tokens in `variables.css` (no Tailwind)
- **pdfjs-dist** — client-side PDF page rendering for project previews
- **lucide-react** — icons
- **react-type-animation** — hero title rotation
- **sharp** — optional WebP asset optimization (`npm run optimize:assets`)

## Project structure

```
├── public/                 # Static assets served as-is (images, PDFs, resume)
├── assets/source/          # High-res sources for optimize:assets script
├── scripts/
│   └── optimize-assets.mjs # Regenerate WebP files in public/
└── src/
    ├── components/
    │   ├── layout/         # Navbar, Footer
    │   ├── sections/       # Hero, About, Projects, Background, Contact
    │   ├── projects/       # PDF preview component
    │   └── ui/             # Shared UI (scroll reveal, water ripple, etc.)
    ├── data/               # Content: nav, projects, background timeline, contact
    ├── hooks/              # Hero video and PDF preview logic
    ├── lib/                # PDF rendering utilities
    └── styles/             # Global and per-section CSS themes
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
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run optimize:assets` | Regenerate WebP from `assets/source/` |

## Customization

- **Copy & links** — `src/data/` (`nav.ts`, `projects.ts`, `background.ts`, `contact.ts`, `skills.ts`)
- **Section layout** — `src/components/sections/`
- **Colors & spacing** — `src/styles/variables.css`
- **Resume** — replace `public/Kadiyala_Rajesh_Resume_2026.pdf`
- **Project PDFs** — add files under `public/project-previews/` and reference them in `projects.ts`

## Contact form setup (required for “Send Message”)

FormSubmit was replaced with [Web3Forms](https://web3forms.com) (more reliable for React sites).

1. Open [https://web3forms.com](https://web3forms.com)
2. Enter **rajeshkadiyalaaa@gmail.com** (or the inbox you want messages in)
3. Check that inbox for your **Access Key** (usually arrives within a minute)
4. Copy `.env.example` → `.env.local` and paste the key:
   ```bash
   cp .env.example .env.local
   ```
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_key_here
   ```
5. Restart the dev server: `npm run dev`
6. On **Vercel**: Project → Settings → Environment Variables → add `VITE_WEB3FORMS_ACCESS_KEY` → **Redeploy** (required)

### Contact form on Vercel (troubleshooting)

- **Value must be the real access key** from your Web3Forms email — a UUID like `a1b2c3d4-e5f6-...` (36 characters). Do not type the literal words `api key`.
- **Redeploy after saving the variable.** Vite embeds `VITE_*` variables at **build** time. Adding the env var without a new deploy leaves the live bundle without the key.
- **Environments:** enable **Production** (and Preview if you test preview URLs).
- **`*.vercel.app` domains:** Web3Forms sometimes blocks free platform subdomains. If the form works on `localhost` but fails on your Vercel URL, [contact Web3Forms](https://web3forms.com/contact) with your exact production URL, or add a custom domain in Vercel.
- On the live site, a yellow setup hint above the form means the key was not in the last build.

## Deploy

The app is a static Vite build. Deploy the `dist` folder to Vercel, Netlify, or any static host. `vercel.json` is included for Vercel deployments.

---

Built by [Kadiyala Rajesh](https://www.linkedin.com/in/rajesh-kadiyala).
