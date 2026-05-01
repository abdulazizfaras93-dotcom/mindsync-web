# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MindSync public landing page (Kuwait AI automation agency). Bilingual AR/EN marketing site driving discovery form submissions.

- **Live:** https://www.mindsynckw.com (since 2026-04-25)
- **GitHub:** https://github.com/abdulazizfaras93-dotcom/mindsync-web (private, `main`)
- **Netlify site:** `mindsync-web` — auto-deploys on push to `main`, Node 20

Business context, brand tokens, and bundle pricing live in the sibling `MindSync/` repo — see `MindSync/CLAUDE.md` and `MindSync/brand-identity.md`. A local `brand-identity.md` mirror exists here. The canonical logo PNG is at `public/brand/logo.png` (mirror of `MindSync/assets/logo.png`).

## Stack

- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS 3 (brand tokens in `tailwind.config.ts` under `colors.ms.*`)
- Framer Motion, lucide-react
- Deployed on Netlify via `@netlify/plugin-nextjs` (`netlify.toml`, Node 20)

## Commands (from repo root)

- `npm install`
- `npm run dev` — Next dev server on :3000
- `npm run build` — **fails locally on Node 25.** Push to `main` and let Netlify CI build instead.
- `npm run start` — serve built app

No test or lint script is configured. ESLint config lives in `eslint.config.mjs` (run via `npx eslint .`).

## Architecture

- Single-page marketing site. Entry: `src/app/page.tsx` composes sections in order: Navbar → Hero → Demo → WhyNotBot → Bundles → ROICalculator → ReceptionistChat → Process → BuiltOn → FAQ → CTA → Footer. Global overlays: `WhatsAppButton` (floating corner, links to WhatsApp) + `ExitIntent`.
- `src/components/sections/` — one file per landing section. `src/components/layout/Navbar.tsx`. `src/components/ui/` — shared widgets (DemoChat, WhatsAppButton, ExitIntent, TiltCard). The old per-card `BundleCard.tsx` was deleted when Bundles moved to a 3-tier per-industry layout — do not recreate it; tier rendering lives inline in `Bundles.tsx`.
- `src/lib/data.ts` — single source of truth for **8** industry bundles (clinic, salon, spa, gym, garage, restaurant, real-estate, home-business) plus `ADDONS` (website-design, mobile-app — quote-only, never show a price). Each `Bundle` has `tiers: BundleTier[]` (Essential / Advanced / Full-Stack) with retainer + features, a `painStat`, and a `scenario` (pain headline, solution, per-tier task-elimination rows, tier CTAs). Edit pricing/copy here only. After any price change run `node C:\tmp\update-agent-prompts.js` to sync n8n agent prompts.
- **All CTAs link to `/discovery`** except `WhatsAppButton` (corner icon). `WHATSAPP_URL` is still exported from `data.ts` for that button only — do not add it back to other components.
- Brand logo PNGs: `public/brand/logo.png` (ivory bg) and `public/brand/logo-transparent.png` (Navbar uses transparent). Integration marquee logos: `public/brand/integrations/*.svg` (recolored to brand green); rest fetched from `cdn.simpleicons.org/{slug}/153E2D` at runtime.
- `src/lib/lang.tsx` — `LangProvider` client context wrapping the whole page. Toggles `lang` between `'en'|'ar'` and flips the `dir` attribute + `font-arabic` class on a wrapper div. Sections read `useLang()` and switch strings/layout accordingly. Keep all AR/EN strings inline in each section file as `const t = { key: { en: '...', ar: '...' } }`.
- `src/components/canvas/` — Three.js / WebGL components (`NeuralGlobe`, `KuwaitParticles`, `ChatBubbles`, `ProcessFlow`). Always loaded with `dynamic(..., { ssr: false })`.
- `src/app/api/demo/route.ts` — server-side proxy from `DemoChat.tsx` live phase to n8n. Requires `N8N_BASE` + `N8N_TOKEN` env vars (server-only). Without them it returns a placeholder reply.
- `ReceptionistChat.tsx` POSTs directly to `NEXT_PUBLIC_N8N_BASE/webhook/receptionist-website` with a 30 s timeout. On failure shows a `FallbackBubble` linking to `/discovery`.
- `DemoChat.tsx` — two-phase: (1) canned script from `src/lib/demo-scripts.ts` (no network), then (2) live questions proxy via `/api/demo`.
- `src/components/ui/PortalPreview.tsx` — UI mockup widget (not currently used in `page.tsx`). `TrustCluster.tsx` also exists but is not imported in `page.tsx` yet.
- `src/app/discovery/page.tsx` — standalone 10-step discovery form. Has its own local `LangCtx` (not using the page-level `LangProvider`) with a full `STRINGS` object for AR/EN. Submits to `https://ifaras911.app.n8n.cloud/webhook/client-discovery`.
- Path alias `@/*` → `src/*` (see `tsconfig.json`).
- `src/app/layout.tsx` — global metadata, fonts, favicon, viewport, and Google Ads tag `AW-18124307098` (injected via `next/script` with `strategy="afterInteractive"`).
- **Google Ads conversion tracking** — two conversion events wired up:
  - **Form submit** (`AW-18124307098/gB4kCNjQ3qUcEJr1q8JD`): fires in `discovery/page.tsx` inside `submit()` after `setStatus('success')` via `window.gtag?.('event', 'conversion', ...)`.
  - **WhatsApp click** (`AW-18124307098/aFj-CNvQ3qUcEJr1q8JD`): fires in `WhatsAppButton.tsx` via `reportConversion()` on click, with `event_callback` opening the URL in a new tab after the hit is sent.
- **Industry vertical pages** — deleted 2026-05-01. All 8 vertical dirs and `IndustryHero.tsx` removed. Sitemap has only 2 URLs: homepage + `/discovery`.

## Brand rules (inherited from MindSync)

Gulf Premium palette only — deep green `#153E2D`, gold `#BF8D38`, ivory `#FBFAF5`, ink `#0E1512`. Tokens exposed as `bg-ms-green-800`, `text-ms-gold-600`, etc. Never introduce navy/teal/indigo/purple. Arabic-first bilingual with full RTL; keep AR strings in `src/lib/data.ts` or the section file alongside EN.

## Deploy

Netlify builds with `npm run build`, publishes `.next/`. Do not commit `.next/` or `node_modules/`.

## Git & Deploy Rules

- **Never use `git add -A` or `git add .`** — always stage specific files by name (e.g., `git add src/app/page.tsx`). Using `-A` or `.` risks staging stray files from the parent `MindSync/` directory that OneDrive or Windows surfaces inside the repo working directory.
- Before every commit, run `git status` and review every staged file.
- Push to `main` → Netlify auto-builds. Never run `npm run build` locally (Node 25 breaks it).
