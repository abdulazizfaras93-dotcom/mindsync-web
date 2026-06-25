# MindSyncWeb — Landing Page

Public marketing site for MindSync. Live at **[mindsynckw.com](https://www.mindsynckw.com)**.

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion + GSAP · Lenis · Sentry

---

## Commands

```bash
npm install
npm run dev      # localhost:3000
```

> **Do not run `npm run build` locally on Node 25 — it fails.**
> Push to `main` → Netlify auto-builds and deploys.

---

## Deploy

Push to `main` on `abdulazizfaras93-dotcom/mindsync-web` → Netlify CI builds on Node 20 and deploys automatically.

Netlify site: `mindsync-web` · Site ID referenced in root `CLAUDE.md`.

---

## Key Files

| File | Purpose |
|---|---|
| `src/lib/data.ts` | **Single source of truth** — all pricing, product data, demo conversations |
| `src/lib/lang.tsx` | `<LangProvider>` + `useLang()` hook — AR/EN toggle with RTL |
| `src/app/page.tsx` | Conversational landing (primary route `/`) |
| `src/app/classic/page.tsx` | Legacy static landing (`/classic`) |
| `src/app/discovery/page.tsx` | Discovery wizard (`/discovery`) |
| `src/app/sitemap.ts` | Auto-generates `/sitemap.xml` |
| `src/components/sections/` | All page sections |
| `src/components/chat/` | Conversational landing stages |
| `tailwind.config.ts` | Brand tokens under `colors.ms.*` |

---

## After Any Pricing Change

1. Update `src/lib/data.ts`
2. Run `node C:\tmp\update-agent-prompts.js` (syncs n8n agent prompts)
3. Push to `main`

---

## Brand

**Gulf Premium palette:**

| Token | Hex |
|---|---|
| Deep Green | `#153E2D` |
| Forest Night | `#0F2E22` |
| Desert Gold | `#BF8D38` |
| Warm Ivory | `#FBFAF5` |
| Ink | `#0E1512` |

Default language: **Arabic (RTL)**. `dir` attribute is set dynamically.

Never introduce: navy, teal, indigo, or purple.

---

## Routes

| Path | Purpose |
|---|---|
| `/` | Conversational landing (primary) |
| `/classic` | Legacy static landing |
| `/discovery` | Discovery form |
| `/services` | Services page |
| `/privacy` · `/terms` | Legal |
| `/api/demo-chat` | Chat demo API |
