# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MindSync public landing page (Kuwait AI automation agency). Bilingual AR/EN marketing site driving WhatsApp demo bookings. Business context, brand tokens, and bundle pricing live in the sibling `MindSync/` repo — see `MindSync/CLAUDE.md` and `MindSync/brand-identity.md`. A local `brand-identity.md` mirror exists here.

## Stack

- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS 3 (brand tokens in `tailwind.config.ts` under `colors.ms.*`)
- Framer Motion, lucide-react
- Deployed on Netlify via `@netlify/plugin-nextjs` (`netlify.toml`, Node 20)

## Commands (from repo root)

- `npm install`
- `npm run dev` — Next dev server on :3000
- `npm run build` — production build
- `npm run start` — serve built app

No test or lint script is configured. ESLint config lives in `eslint.config.mjs` (run via `npx eslint .`).

## Architecture

- Single-page marketing site. Entry: `src/app/page.tsx` composes sections in order: Navbar → Hero → Demo → Bundles → Process → FAQ → CTA → Footer → WhatsAppButton.
- `src/components/sections/` — one file per landing section. `src/components/layout/Navbar.tsx`. `src/components/ui/` — shared widgets.
- `src/lib/data.ts` — single source of truth for the 6 industry bundles (id, EN/AR names, buildFee, retainer, features, icon, color). Edit here to change pricing/copy, not inside components.
- `src/lib/lang.tsx` — `LangProvider` client context wrapping the whole page. Toggles `lang` between `'en'|'ar'` and flips the `dir` attribute + `font-arabic` class on a wrapper div. Sections read `useLang()` and switch strings/layout accordingly.
- Path alias `@/*` → `src/*` (see `tsconfig.json`).

## Brand rules (inherited from MindSync)

Gulf Premium palette only — deep green `#153E2D`, gold `#BF8D38`, ivory `#FBFAF5`, ink `#0E1512`. Tokens exposed as `bg-ms-green-800`, `text-ms-gold-600`, etc. Never introduce navy/teal/indigo/purple. Arabic-first bilingual with full RTL; keep AR strings in `src/lib/data.ts` or the section file alongside EN.

## Deploy

Netlify builds with `npm run build`, publishes `.next/`. Do not commit `.next/` or `node_modules/`.
