# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project

MindSync public landing page — Kuwait's first AI automation agency for SMBs. Bilingual AR/EN marketing site driving discovery form submissions and free trial requests.

- **Live:** https://www.mindsynckw.com
- **GitHub:** `abdulazizfaras93-dotcom/mindsync-web` (private, `main`)
- **Netlify site:** `mindsync-web` — auto-deploys on push to `main`, Node 20
- **Admin dashboard:** https://admin.mindsynckw.com (separate Vite repo)

---

## Stack

- Next.js 14 App Router + React 18 + TypeScript
- Tailwind CSS 3 (brand tokens in `tailwind.config.ts` under `colors.ms.*`)
- Framer Motion — animations, `useScroll`/`useTransform` parallax, `useReducedMotion`
- Lenis — smooth scroll provider (`src/components/providers/SmoothScroll.tsx`)
- lucide-react, clsx, tailwind-merge (`src/lib/utils.ts` exports `cn()`)
- `@react-three/fiber` + `@react-three/drei` + `three@0.170` — canvas components
- Deployed on Netlify via `@netlify/plugin-nextjs` (`netlify.toml`, Node 20)

---

## Commands

```bash
npm install
npm run dev        # Next dev server on :3000
npx eslint .       # lint (no test script configured)
```

> ⚠️ `npm run build` **fails locally on Node 25.** Push to `main` and let Netlify CI build.

---

## Architecture

### Page composition — `src/app/page.tsx`

Section order (top → bottom):
```
Navbar
Hero               — herobackground.mp4 looping video + NeuralMesh R3F overlay + KineticText headline
StatsBar           — animated count-up stats grid
Services           — full-width flagship banner + 2×2 neo-brutalist card grid
IndustryResults    — scroll-parallax neo-brutalist cards (per-card Y spring offset)
Bundles            — single MindSync Complete pricing card (349 KWD + 159/mo) + WEBSITE_SERVICES + APP_SERVICES neo-brutalist grids
ReceptionistChat   — live n8n webhook chat (id="chat" — CTAFooter anchors here)
Process            — 5-step flow, sticky ProcessMorph canvas + interactive step list
FAQ                — accordion Q&As
CTA                — final CTA with KuwaitParticles
Footer
```

Global overlays: `WhatsAppButton` (floating corner) + `ExitIntent` (free trial offer on exit).

**Dormant section files** (exist in `sections/` but NOT imported in `page.tsx` — do not delete):
`WhyNotBot.tsx`, `BeforeAfter.tsx`, `ROICalculator.tsx`, `TrustCluster.tsx`, `Demo.tsx`, `ProductReveal.tsx`, `WhatsAppMockup.tsx`, `FreeTrialSpotlight.tsx`, `BuiltOn.tsx`, `Testimonials.tsx`

---

### Neo-brutalist card pattern

All card grids across the site use this consistent style:

```tsx
// Wrapper
<div className="relative group transition-all duration-300">
  {/* Shadow layer — animates on hover */}
  <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl
    shadow-[4px_4px_0px_0px] shadow-ms-ink-900
    transition-all duration-300
    group-hover:shadow-[8px_8px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />
  {/* Content sits on top */}
  <div className="relative p-6">...</div>
</div>
```

For cards on **dark backgrounds** (e.g. Testimonials on `bg-ms-green-900`), use gold shadow instead:
`shadow-[4px_4px_0px_0px_rgba(191,141,56,0.4)]` / `group-hover:shadow-[8px_8px_0px_0px_rgba(191,141,56,0.4)]`

Check icons inside cards use circular bordered badges, not plain tick marks:
```tsx
<span className="inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-ms-ink-900">
  <Check size={9} strokeWidth={2.5} className="text-ms-green-800" />
</span>
```

Popular/badge pills: absolute positioned, `rotate-12`, `border-2 border-ms-ink-900`, gold bg.

---

### Key files

#### `src/lib/data.ts` — Single source of truth

Key exports:
- `MINDSYNC_COMPLETE` — `{ buildFee: 349, retainer: 159, features, usageTiers }` (AR/EN). **The product.** Import this in any component showing pricing.
- `HOME_BUSINESS_CATEGORIES` — 14-entry `{ icon, en, ar }[]` for the discovery form business-type grid.
- `BUNDLES: Bundle[]` — 8 legacy industry bundles (each has `tiers: BundleTier[]`). Still used by `[industry]/page.tsx` routing; do not delete.
- `INDUSTRY_SLUGS` + `getBundleBySlug()` — maps URL slugs (`/clinics`) to bundle IDs.
- `WEBSITE_SERVICES`, `APP_SERVICES` — fixed prices, displayed as individual neo-brutalist cards.
- `FREE_TRIAL`, `CUSTOM_BUNDLE`, `DEMO_CONVERSATIONS` — AR/EN copy blocks.
- `WHATSAPP_URL` — used **only** by `WhatsAppButton`; do not add to other components.
- `TIER_ORDER: TierId[]` — `['smart', 'pro', 'full-auto']` (legacy, used by industry vertical data).

> After any pricing change: `node C:\tmp\update-agent-prompts.js` to sync n8n agent prompts.

---

#### `src/lib/lang.tsx`

`LangProvider` client context. Toggles `lang` between `'en'|'ar'`, flips `dir` + `font-arabic` class on `<html>`. Sections read `useLang()`. Keep all AR/EN strings inline per section as `const t = { key: { en: '...', ar: '...' } }`.

#### `src/lib/utils.ts`

Exports `cn(...inputs)` — clsx + tailwind-merge. Required by shadcn components.

---

### Component directories

#### `src/components/sections/`

- `Hero.tsx` — `herobackground.mp4` looping video + `NeuralMesh` R3F overlay. Mouse parallax: 3 layers driven by `useMotionValue + useSpring`. `KineticText` headline. Falls back to solid bg when `useReducedMotion()`.
- `Services.tsx` — Full-width flagship banner (dark green, `border-2 border-ms-ink-900 shadow-[6px_6px_0px_0px]`, no hover) + 2×2 neo-brutalist card grid with scroll-entrance stagger.
- `Bundles.tsx` — **Single MindSync Complete pricing card** (neo-brutalist offset shadow, features checklist, fair-use tiers) + separate neo-brutalist grids for `WEBSITE_SERVICES` and `APP_SERVICES` below. Imports `MINDSYNC_COMPLETE` from `data.ts`. No tier selection or bento grid.
- `IndustryResults.tsx` — 6 neo-brutalist cards with per-card scroll-driven Y parallax (`useScroll` + `useSpring`). Section bg `bg-ms-ivory-100`.
- `Testimonials.tsx` — **CSS marquee on `bg-ms-green-900`**. Cards use neo-brutalist style with gold-tinted border + shadow (ink shadow is invisible on dark bg). No hover interaction (marquee).
- `Process.tsx` — 5 steps, `useState(0)` drives `activeStep`. Sticky `ProcessMorph` canvas left + interactive step list right. `KineticText` headline. `scrollProgress` MotionValue passed to canvas.
- `ReceptionistChat.tsx` — POSTs to `NEXT_PUBLIC_N8N_BASE/webhook/receptionist-website` (30s timeout). Has `id="chat"` — CTAFooter "Try the Live Demo" anchors here.
- `FAQ.tsx` — Answer panel: `bg-ms-green-900/85 backdrop-blur-[12px] border border-ms-gold-600/[0.15]` + inset glow shadow. Active question: `w-[3px]` gold absolute left bar.
- `BuiltOn.tsx` — Dark green surface. Frosted glass logo tiles: `bg-white/[0.06] backdrop-blur-[6px] border border-white/[0.10]`. SimpleIcons CDN color `FBFAF5` for visibility on dark bg.
- `IndustryBundles.tsx` — **Pricing section for industry vertical pages**. Shows single MindSync Complete card (349/159) — same style as `Bundles.tsx`. Also shows pain scenario from the `bundle` prop. Imports `MINDSYNC_COMPLETE`. No tier cards.
- `IndustryHero.tsx` — Hero for industry vertical pages. Shows `MINDSYNC_COMPLETE.buildFee` (349) and `MINDSYNC_COMPLETE.retainer` (159) in the pricing quick-view bar.

#### `src/components/canvas/`
All loaded with `dynamic(..., { ssr: false })`:
- `ProcessMorph.tsx` — sticky 3D canvas, 5 geometries per step. Read `scrollProgress.get()` inside `useFrame` only.
- `KuwaitParticles.tsx` — CTA section background.
- `ChatBubbles.tsx` — behind `ReceptionistChat`.
- `BrainBackground.tsx`, `NeuralGlobe.tsx`, `ProcessFlow.tsx` — dormant, do not delete.

#### `src/components/motion/`
- `GlassCard.tsx` — glassmorphism + cursor-tilt wrapper. **No active section currently imports it** (replaced by neo-brutalist pattern). Kept for potential reuse.
- `KineticText.tsx` — word-by-word staggered reveal (`whileInView`). Used in Hero + Process. Plain `<Tag>` when `useReducedMotion()`. Note: headless IntersectionObserver won't fire for in-viewport elements at mount — opacity stays 0 in headless tests; works in real browsers.
- `MagneticButton.tsx` — cursor-following magnetic CTA. Used in Hero.
- `NumberFlow.tsx` — re-export of `@number-flow/react`. Used in ROICalculator (dormant).

#### `src/components/ui/`
- `button.tsx` — shadcn Button (requires `@radix-ui/react-slot`, `class-variance-authority`)
- `creative-pricing.tsx` — neo-brutalist pricing card component (bilingual, KWD)
- `WhatsAppButton.tsx` — floating corner button. Uses `WHATSAPP_URL` from `data.ts` only.
- `ExitIntent.tsx` — exit-intent modal, 1-week free trial offer. Cookie: `ms_exit_shown`, 7-day expiry.
- `DemoChat.tsx`, `PortalPreview.tsx`, `TiltCard.tsx` — dormant, do not delete.

#### `src/components/providers/`
- `SmoothScroll.tsx` — Lenis smooth scroll. `duration: 1.15`, exponential easing. All Framer Motion `useScroll` hooks feed off this loop.

#### `src/components/chat/` — Conversational Landing

WhatsApp-style 5-stage chat flow. Entry point: `ConversationalLanding.tsx` (orchestrator). Rendered as an alternative to the default homepage sections.

Stage flow:
1. `Stage1Greeting` — opening message + language/greeting chips
2. `Stage2BusinessType` — 14-category business picker (from `HOME_BUSINESS_CATEGORIES`)
3. `Stage3PainPoints` — selects pain keys relevant to the chosen category
4. `Stage4Pricing` — shows MindSync Complete pricing card
5. `Stage5FAQ` — inline FAQ + final CTA

Supporting components: `AIBubble.tsx`, `SentMessage.tsx`, `TypingIndicator.tsx`, `ChipButton.tsx`, `SkipBar.tsx`, `ResumeBanner.tsx`, `ChatContainer.tsx` (auto-scroll, 80ms delay), `LiveDemoChat.tsx`, `AnimatedDemo.tsx`.

Types: `src/types/conversation.ts` — `ConversationState`, `BusinessCategory`, `PainKey`.
Persistence: `src/lib/conversation/storage.ts` — `loadState / saveState / clearState` (localStorage).
Analytics: `src/lib/conversation/analytics.ts` — `trackCategorySelected`, `trackPainSelected`, `trackStageReached`.

---

### Animation system

Always guard parallax with `const prefersReduced = useReducedMotion()` and fall back to `['0%','0%']`.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['-8%', '8%'])
```

**Navbar** hides on scroll-down past 120 px, reappears on scroll-up — `lastScrollY` ref + `motion.nav animate={{ y: visible ? 0 : -80 }}`.

---

### Pages

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Main landing |
| `/[industry]` | `src/app/[industry]/page.tsx` | 8 industry verticals via `INDUSTRY_SLUGS` |
| `/services` | `src/app/services/page.tsx` | Services overview |
| `/discovery` | `src/app/discovery/page.tsx` | 5-step form → n8n webhook. Has own `LangCtx`. Step 2: 14 home-business categories from `HOME_BUSINESS_CATEGORIES`. Step 4: MindSync Complete card (no tier selection). Google Ads conversion on submit. |
| `/privacy` | `src/app/privacy/page.tsx` | Bilingual AR/EN privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Bilingual AR/EN terms of service |

Sitemap auto-generates via `src/app/sitemap.ts`. Covers `/`, `/discovery`, `/services`, `/privacy`, `/terms`, all 8 industry slugs.

---

### n8n Agents

| Agent | Webhook | Status |
|---|---|---|
| Receptionist Agent | `/webhook/receptionist-website` | ✅ Live |
| Discovery Form | `/webhook/client-discovery` | ✅ Live |
| PDF Generator | `/webhook/generate-pdf` | ✅ Live |

> **Never edit n8n workflows via MCP `update_workflow`.** Always GET → mutate → PUT via REST API.

---

### Sentry

Error tracking is configured for all three Next.js runtimes:
- `sentry.client.config.ts` — browser (replay integration, 10% session / 100% error capture)
- `sentry.server.config.ts` — Node server
- `sentry.edge.config.ts` — edge runtime
- `src/instrumentation.ts` — Next.js instrumentation hook, imports Sentry server/edge init
- `src/instrumentation-client.ts` — client-side instrumentation entry

DSN and org slug are set via `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_ORG` / `SENTRY_PROJECT` env vars. Sentry releases are created automatically by `@sentry/nextjs` during Netlify builds via `withSentryConfig` in `next.config.ts`.

---

## Brand rules

Gulf Premium palette — **never** introduce navy, teal, indigo, or purple.

| Token | Hex | Tailwind |
|---|---|---|
| Deep Green (primary) | `#153E2D` | `bg-ms-green-800` |
| Dark Green (hero/section bg) | `#0F2E22` | `bg-ms-green-900` |
| Gold (accent) | `#BF8D38` | `text-ms-gold-600` |
| Ivory (canvas) | `#FBFAF5` | `bg-ms-ivory-0` |
| Ink (borders/text) | `#0E1512` | `text-ms-ink-900` |

Fonts: Space Grotesk (EN, `font-grotesk`) · Noto Kufi Arabic (AR, `font-arabic`) · JetBrains Mono (`font-mono`).

**Tailwind token gotcha:** `ms-ink-*` only goes down to `ink-400` (`#8C9590`). No `ink-200` or lighter. For light borders on ivory backgrounds use `ms-ivory-200`, not `ms-ink-200`.

Arabic-first bilingual with full RTL. All CTAs link to `/discovery` except `WhatsAppButton`.

Logos: `public/brand/logo.png` (ivory bg) · `public/brand/logo-transparent.png` (Navbar + favicon).
Integration logos: `public/brand/integrations/*.svg` or runtime `cdn.simpleicons.org/{slug}/FBFAF5`.

---

## Git & Deploy rules

```bash
# Always stage specific files — never git add -A or git add .
git add src/lib/data.ts src/components/sections/Bundles.tsx
git status   # review every staged file before committing
git commit -m "feat: ..."
git push origin main   # Netlify auto-builds (MindSyncWeb only)
```

> OneDrive can surface MindSync parent directory files inside the repo — `-A` will accidentally stage them (happened in Apr 2026, leaked PDFs to public repo).

**Admin dashboard** (`admin.mindsynckw.com`, Netlify site `83d10da9-db73-4aa3-9421-7c36ad8cf77a`) does **NOT** auto-deploy on git push. It lives in `C:\Users\iAbdu\OneDrive\Desktop\MindSync\app\` and deploys via CLI:

```bash
# Run from C:\Users\iAbdu\OneDrive\Desktop\MindSync\app\
npm run build
cp -r dist /c/tmp/admin-dist   # copy out of OneDrive before deploy (OneDrive reverts dist/)
netlify deploy --no-build --prod --site 83d10da9-db73-4aa3-9421-7c36ad8cf77a --dir /c/tmp/admin-dist
```

---

## Pricing change workflow

1. Edit prices in `src/lib/data.ts`
2. Run `node C:\tmp\update-agent-prompts.js`
3. `git add src/lib/data.ts` → commit → push
