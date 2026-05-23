# CLAUDE.md

Guidance for Claude when working in this repo.

## Project

**MindSyncWeb** — public marketing/landing site for MindSync (Kuwait's AI automation agency for home businesses).
Live at **www.mindsynckw.com** · Hosted on Netlify.

Sister repos (do NOT edit from here):
- **MindSync Portal** — `portal.mindsynckw.com` (Vite/React/Supabase, customer-facing dashboard)
- **MindSync Admin** — `admin.mindsynckw.com` (Vite/React, internal ops)

---

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** 3.4 (config: `tailwind.config.ts`)
- **Framer Motion** 11 + **GSAP** 3.15 (motion)
- **@number-flow/react** for animated numerics
- **lucide-react** for icons
- **Lenis** for smooth scroll
- **Sentry** (`@sentry/nextjs` 10) — `sentry.{client,edge,server}.config.ts`
- **i18n**: custom lightweight `src/lib/lang.tsx` (NOT i18next). Bilingual AR/EN with RTL.

Fonts (loaded in `src/app/layout.tsx`): Space Grotesk (EN), Noto Kufi Arabic (AR), JetBrains Mono.

---

## Commands

```bash
npm install
npm run dev      # localhost:3000
npm run build    # next build  (⚠️ may fail locally on Node 25 — push to main, let Netlify build)
npm start        # production server
```

### Deploy

**Push to `main` → Netlify auto-builds.** Do not run local builds on Node 25.

Netlify config: `netlify.toml`. Sentry source maps wired in `next.config.mjs`.

### Env vars (`.env.local`, gitignored)

```
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
# Add others as routes/APIs need them
```

---

## Routes

| Path | File | Purpose |
| ----: | ----: | ----: |
| `/` | `src/app/page.tsx` | **ConversationalLanding** (dark chat-room landing — current primary) |
| `/classic` | `src/app/classic/page.tsx` | Legacy static landing (Hero + StatsBar + Services + Bundles + Process + FAQ + CTA) |
| `/services` | `src/app/services/page.tsx` | Services section + nav/footer |
| `/[industry]` | `src/app/[industry]/page.tsx` | Dynamic industry pages (clinic, salon, spa, gym, garage, restaurant…) |
| `/discovery` | `src/app/discovery/page.tsx` | Standalone discovery wizard |
| `/privacy`, `/terms` | `src/app/{privacy,terms}/page.tsx` | Legal |
| `/api/health` | `src/app/api/health/route.ts` | Healthcheck endpoint |
| `/api/demo` | `src/app/api/demo/route.ts` | Demo API |
| `/api/demo-chat` | `src/app/api/demo-chat/route.ts` | Chat demo API |

`global-error.tsx`, `robots.ts`, `sitemap.ts` at root of `src/app/`.

---

## Source of truth

**`src/lib/data.ts`** = pricing + bundles + scenarios. Single source of truth.
After any pricing change run: `node C:\tmp\update-agent-prompts.js` (syncs to agent prompts).

Other key files:
- `src/lib/lang.tsx` — `<LangProvider>`, `useLang()` hook → `{ lang: 'ar'|'en', setLang, t, isRTL }`
- `src/lib/demo-scripts.ts` — industry-specific demo scripts
- `src/lib/conversation/` — state + analytics for the conversational landing
- `src/lib/utils.ts` — shared helpers

---

## Bilingual / RTL pattern

All user-visible strings go through `useLang()`:

```tsx
const { lang, isRTL } = useLang()
const text = lang === 'ar' ? 'هلا' : 'Hello'
```

Or use `t()` helper for keyed lookups when data lives in `data.ts`:
```tsx
const { t } = useLang()
t({ en: 'Book now', ar: 'احجز الحين' })
```

Default lang: **AR** (RTL). Layout sets `dir` attribute dynamically.

---

## Components

- `src/components/sections/` — page sections (Hero, Bundles, FAQ, etc.)
- `src/components/chat/` — conversational landing (ConversationalLanding + Stage1..5)
- `src/components/motion/` — reusable motion primitives (AuroraPlate, MagneticButton, KineticText, NumberFlow)
- `src/components/ui/` — small UI atoms (WhatsAppButton, ExitIntent, PortalPreview, DemoChat, button)
- `src/components/layout/Navbar.tsx`
- `src/components/providers/SmoothScroll.tsx` — Lenis provider

---

## Brand

Gulf Premium palette — **never** introduce navy, teal, indigo, or purple.

| Token | Hex |
| ----: | ----: |
| Primary green | `#153E2D` |
| Dark green (hero bg) | `#0F2E22` |
| Gold accent | `#BF8D38` |
| Ivory canvas | `#FBFAF5` |
| Ink | `#0E1512` |

Tailwind tokens in `tailwind.config.ts`. Prices in **KWD** only. No founder name on site.

---

## Git rules

- **Never** `git add -A` or `git add .` — OneDrive can leak local-only files.
- Always stage explicitly: `git add <file>` or `git add -u`.
- Review staged files before commit: `git status` then `git diff --cached`.
- Pushes to `main` trigger Netlify production deploy.

---

## Strategy docs

Business strategy / validation markdown lives in `docs/strategy/` (not used by build). See `docs/strategy/README.md`.

Other docs in `docs/`:
- `LandingPage_Update_Spec.md` — landing iteration specs
- `mindsync-business.md`, `mindsync-kuwaiti-dialect.md`, `mindsync-n8n-workflows-prompt.md`
- `plans/`, `superpowers/` — iteration plans
