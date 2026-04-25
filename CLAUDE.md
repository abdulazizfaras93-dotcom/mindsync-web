# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MindSync public landing page (Kuwait AI automation agency). Bilingual AR/EN marketing site driving WhatsApp demo bookings.

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

- Single-page marketing site. Entry: `src/app/page.tsx` composes sections in order: Navbar → Hero → Demo → Bundles → Process → BuiltOn → FAQ → CTA → Footer → WhatsAppButton.
- `src/components/sections/` — one file per landing section (including `BuiltOn.tsx`, the integrations marquee added after Process). `src/components/layout/Navbar.tsx`. `src/components/ui/` — shared widgets (DemoChat, PortalPreview, WhatsAppButton). The old per-card `BundleCard.tsx` was deleted when Bundles moved to a 3-tier per-industry layout — do not recreate it; tier rendering lives inline in `Bundles.tsx`.
- `src/lib/data.ts` — single source of truth for the 6 industry bundles. Each Bundle has `tiers: BundleTier[]` (Essential / Advanced / Full-Stack) with their own retainer + features, plus a `painStat` used by Demo and Bundles. Edit pricing/copy here, not inside components.
- Brand logo PNGs: `public/brand/logo.png` (ivory bg) and `public/brand/logo-transparent.png` (Navbar uses transparent). Integration marquee logos: `public/brand/integrations/*.svg` (recolored to brand green); rest fetched from `cdn.simpleicons.org/{slug}/153E2D` at runtime.
- `src/lib/lang.tsx` — `LangProvider` client context wrapping the whole page. Toggles `lang` between `'en'|'ar'` and flips the `dir` attribute + `font-arabic` class on a wrapper div. Sections read `useLang()` and switch strings/layout accordingly.
- Path alias `@/*` → `src/*` (see `tsconfig.json`).

## Brand rules (inherited from MindSync)

Gulf Premium palette only — deep green `#153E2D`, gold `#BF8D38`, ivory `#FBFAF5`, ink `#0E1512`. Tokens exposed as `bg-ms-green-800`, `text-ms-gold-600`, etc. Never introduce navy/teal/indigo/purple. Arabic-first bilingual with full RTL; keep AR strings in `src/lib/data.ts` or the section file alongside EN.

## Deploy

Netlify builds with `npm run build`, publishes `.next/`. Do not commit `.next/` or `node_modules/`.
