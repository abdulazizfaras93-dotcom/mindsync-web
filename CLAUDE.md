# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project

MindSync public landing page — Kuwait's first AI automation agency for SMBs. Bilingual AR/EN marketing site driving discovery form submissions and free trial requests.

- **Live:** https://www.mindsynckw.com (since 2026-04-25)
- **GitHub:** https://github.com/abdulazizfaras93-dotcom/mindsync-web (private, `main`)
- **Netlify site:** `mindsync-web` — auto-deploys on push to `main`, Node 20
- **Admin dashboard:** https://admin.mindsynckw.com (separate Vite repo)
- **Business doc:** `docs/mindsync-business.md` — source of truth for all business logic

---

## Stack

- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS 3 (brand tokens in `tailwind.config.ts` under `colors.ms.*`)
- Framer Motion — animations, `useScroll`/`useTransform` parallax, `useReducedMotion`
- Lenis — smooth scroll provider (`src/components/providers/SmoothScroll.tsx`)
- lucide-react
- `@react-three/fiber` + `@react-three/drei` + `three@0.170` — canvas components (not Hero)
- Deployed on Netlify via `@netlify/plugin-nextjs` (`netlify.toml`, Node 20)

---

## Commands

```bash
npm install
npm run dev        # Next dev server on :3000
npm run start      # serve built app
npx eslint .       # lint (no test script configured)
```

> ⚠️ `npm run build` **fails locally on Node 25.** Push to `main` and let Netlify CI build.

---

## Architecture

### Page composition — `src/app/page.tsx`

Section order (top → bottom):
```
Navbar
Hero               — mindsync.mp4 looping video background (autoPlay muted loop)
Demo               — canned + live chat, 8 industries
WhyNotBot          — comparison table (dark green plate)
Bundles            — 8 industries × 3 tiers + website/app services + free trial
ROICalculator      — interactive sliders
ReceptionistChat   — live n8n webhook chat
Process            — 5-step flow (includes free trial step)
BuiltOn            — integration marquee
TrustCluster       — trust badges
FAQ                — 8 Q&As including free trial + website-without-AI
CTA                — final CTA with KuwaitParticles
Footer
```

Global overlays: `WhatsAppButton` (floating corner) + `ExitIntent` (free trial offer on exit).

---

### Key files

#### `src/lib/data.ts` — Single source of truth

Exports:
- `BUNDLES: Bundle[]` — 8 industries, each with `tiers: BundleTier[]`
- `WEBSITE_SERVICES: WebsiteService[]` — 3 website tiers with real prices
- `APP_SERVICES: AppService[]` — 2 app tiers with real prices
- `FREE_TRIAL` — 1-week free trial copy (AR/EN)
- `CUSTOM_BUNDLE` — custom AI system CTA (AR/EN)
- `TIER_ORDER: TierId[]` — `['smart', 'pro', 'full-auto']`
- `TIER_LABELS` — display names per tier (AR/EN + description)
- `DEMO_CONVERSATIONS` — 8-turn canned scripts per industry (Kuwaiti dialect)
- `WHATSAPP_URL` — used only by `WhatsAppButton`, do not add to other components

**Tiers (v2):**
| ID | EN | AR | Description |
|---|---|---|---|
| `smart` | Smart | الذكي | 1 agent, 1–2 channels, focused tasks |
| `pro` | Pro | المتقدم | 1+ agents, multiple channels |
| `full-auto` | Full Auto | المؤتمت | Multiple agents, all channels, full automation |

**Bundle pricing (Build Fee / Smart / Pro / Full Auto — KWD/mo):**
| Industry | Build | Smart | Pro | Full Auto |
|---|---|---|---|---|
| Home Business | 250 | 130 | 200 | 280 |
| Salon | 300 | 160 | 240 | 330 |
| Spa | 300 | 160 | 240 | 330 |
| Gym | 320 | 170 | 260 | 360 |
| Garage | 300 | 160 | 240 | 330 |
| Restaurant | 380 | 200 | 300 | 420 |
| Clinic | 400 | 220 | 340 | 460 |
| Real Estate | 450 | 250 | 380 | 520 |

**Website prices:** Landing Page 300 KWD · Business Website 550 KWD · Advanced 900–1,400 KWD · maintenance 80 KWD/mo

**App prices:** Simple App 2,000–2,500 KWD · Advanced App 3,500–6,000 KWD · maintenance 150 KWD/mo

> After any pricing change: `node C:\tmp\update-agent-prompts.js` to sync n8n agents.

---

#### `src/lib/lang.tsx`

`LangProvider` client context. Toggles `lang` between `'en'|'ar'`, flips `dir` attribute + `font-arabic` class on `<html>`. Sections read `useLang()`. Keep all AR/EN strings inline per section: `const t = { key: { en: '...', ar: '...' } }`.

---

### Animation system

Lenis initializes in `SmoothScroll.tsx` and drives a `requestAnimationFrame` loop — all Framer Motion `useScroll` hooks feed off this. Pattern used in parallax sections:

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-8%', '8%'])
```

Always guard parallax values with `const prefersReduced = useReducedMotion()` and return `['0%','0%']` when true.

**Navbar** (`src/components/layout/Navbar.tsx`) hides on scroll-down past 120 px, reappears on scroll-up — uses `lastScrollY` ref + `motion.nav animate={{ y: visible ? 0 : -80 }}`.

---

### Component directories

#### `src/components/sections/`
One file per section. Key notes:
- `Hero.tsx` — video background: `<video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">`. Two gradient overlays (`left fade` + `bottom fade`) keep text readable. `brainY` parallax still applied to video container. Falls back to solid `bg-ms-green-900` when `useReducedMotion()` is true.
- `Bundles.tsx` — renders `TIER_ORDER` (`smart/pro/full-auto`). The `isPro` flag highlights the middle card. `WEBSITE_SERVICES` and `APP_SERVICES` render as separate grids below the AI bundles.
- `Process.tsx` — 5 steps. Step 02 has `trial: true` — gold "Free" badge. Steps alternate slide-in direction (`x: i % 2 === 0 ? -20 : 20`).
- `WhyNotBot.tsx` — parallax background pattern via `useScroll`/`useTransform`. `fadeUp` variant with custom delay drives staggered reveals.
- `TrustCluster.tsx` — placed between `BuiltOn` and `FAQ`.
- `ReceptionistChat.tsx` — POSTs to `NEXT_PUBLIC_N8N_BASE/webhook/receptionist-website` (30s timeout). Fallback bubble links to `/discovery`.

#### `src/components/canvas/`
All loaded with `dynamic(..., { ssr: false })`:
- `BrainBackground.tsx` — 3D brain canvas. **No longer used in Hero** (replaced by video). Do not delete — may be reused.
- `KuwaitParticles.tsx` — used in CTA section background.
- `ChatBubbles.tsx` — floating bubbles behind `ReceptionistChat`.
- `ProcessFlow.tsx` — animated flow line in `Process`.
- `NeuralGlobe.tsx` — legacy, not used. Do not delete.

#### `src/components/providers/`
- `SmoothScroll.tsx` — Lenis smooth scroll client component. Wraps all children in `layout.tsx`. Initializes with `duration: 1.15`, exponential easing. Cleans up on unmount.

#### `src/components/ui/`
- `DemoChat.tsx` — Phase 1: canned script (no network). Phase 2: live input → `/api/demo` proxy → n8n.
- `PortalPreview.tsx` — UI mockup panel shown next to DemoChat.
- `WhatsAppButton.tsx` — floating corner button. Uses `WHATSAPP_URL` from `data.ts` only.
- `ExitIntent.tsx` — exit-intent modal. Offers **1-week free trial** (v2 copy). Cookie: `ms_exit_shown`, 7-day expiry.
- `TiltCard.tsx` — 3D tilt wrapper used in `Bundles.tsx`.

---

### API routes

#### `src/app/api/demo/route.ts`
Server-side proxy from `DemoChat` live phase to n8n. Requires env vars:
- `N8N_BASE` — n8n instance base URL
- `N8N_TOKEN` — n8n API token

Without them returns a placeholder reply (graceful degradation).

#### `src/app/discovery/page.tsx`
Standalone 10-step discovery form. Has its own `LangCtx` (not page-level `LangProvider`). Submits to `https://ifaras911.app.n8n.cloud/webhook/client-discovery`. Google Ads conversion fires on submit: `AW-18124307098/gB4kCNjQ3qUcEJr1q8JD`.

---

### n8n Agents

| Agent | Workflow ID | Status |
|---|---|---|
| Receptionist Agent | FCHNxYk7OOGdJypu | ✅ Live |
| Manager Agent | MxaAZGBQNw7D6osB | ✅ Live |
| PDF Generator | 9TI7ugHc06xfnUQA | ✅ Live |
| Discovery Form | u6J8mUam8Jy3UCju | ✅ Live |

> **Never edit n8n workflows via MCP `update_workflow`.** Always GET → mutate → PUT via REST API.
> After pricing changes, run `node C:\tmp\update-agent-prompts.js` to patch agent system prompts.

---

### SEO & tracking (`src/app/layout.tsx`)

- Meta description: references "AI automation systems, websites & apps" — not "WhatsApp bots"
- JSON-LD: `LocalBusiness`, phone `+96599539006`, Instagram `mindsync.kw`
- Google Ads tag: `AW-18124307098` (via `next/script`, `afterInteractive`)
- WhatsApp click conversion: `AW-18124307098/aFj-CNvQ3qUcEJr1q8JD` in `WhatsAppButton.tsx`

---

## Brand rules

Gulf Premium palette — **never** introduce navy, teal, indigo, or purple.

| Token | Hex | Tailwind |
|---|---|---|
| Deep Green (primary) | `#153E2D` | `bg-ms-green-800` |
| Dark Green (hero bg) | `#0F2E22` | `bg-ms-green-900` |
| Gold (accent) | `#BF8D38` | `text-ms-gold-600` |
| Ivory (canvas) | `#FBFAF5` | `bg-ms-ivory-0` |
| Ink | `#0E1512` | `text-ms-ink-900` |

Fonts: Space Grotesk (EN) · Noto Kufi Arabic (AR) · JetBrains Mono (mono/data).

Arabic-first bilingual with full RTL. All CTAs link to `/discovery` except `WhatsAppButton`.

Logos: `public/brand/logo.png` (ivory bg) · `public/brand/logo-transparent.png` (Navbar).
Integration logos: `public/brand/integrations/*.svg` · runtime: `cdn.simpleicons.org/{slug}/153E2D`.

---

## Git & Deploy rules

```bash
# Always stage specific files — never git add -A or git add .
git add src/lib/data.ts src/components/sections/Bundles.tsx
git status   # review every staged file before committing
git commit -m "feat: ..."
git push origin main   # Netlify auto-builds
```

> OneDrive can surface MindSync parent directory files inside the repo. `-A` will accidentally stage them.
> Never run `npm run build` locally on Node 25 — push to `main` and let Netlify CI handle it.

---

## Pricing change workflow

1. Edit prices in `src/lib/data.ts`
2. Run `node C:\tmp\update-agent-prompts.js` (requires `N8N_API_KEY` env var)
3. `git add src/lib/data.ts` → commit → push
