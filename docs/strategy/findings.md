# MindSync Upgrade — Research Findings
**Date:** 2026-05-02

---

## Codebase Audit Results

### Admin Dashboard (app/)
- **Stack:** Vite 5.4 + React 18.3 + TypeScript 5.6 + MUI v7 + TanStack Router v1.90 + TanStack Query v5.59 + Framer Motion v12.38
- **14 routes** — all built; Client Portal is the only missing surface
- **`portalToken` field** already defined in `Client` type in `src/types/index.ts` — portal auth mechanism is pre-planned
- **Hardcoded duplication:** `BUNDLES` array in `admin.clients.new.tsx` duplicates `data.ts` — 8 bundles with tiers and pricing hardcoded inline
- **Modules list duplicated** in both `admin.clients.new.tsx` and `admin.clients.$clientId.tsx`
- **Conversations feature:** `features/conversations/` has 5 subdirectories but implementation unclear — needs audit before building

### Landing Page (MindSyncWeb/)
- **Stack:** Next.js 14.2 + React 18.3 + TypeScript 5.9 + Tailwind 3.4 + Framer Motion v11
- **11 section components** in `src/components/sections/` — all large, well-built
- **TrustCluster.tsx** (4.0 KB) built but NOT imported in `page.tsx` — social proof section dormant
- **Vertical pages missing:** `/clinics`, `/salons`, `/gyms`, `/garages`, `/restaurants`, `/real-estate` — per CLAUDE.md "not yet built"
- **`/spa` and `/home-businesses`** exist but redirect to `/#bundles` — low-value redirects
- **`sitemap.ts`** exists (added 2026-04-28) — needs updating when vertical pages go live

### n8n Stack
- **16 workflows** — all live at `ifaras911.app.n8n.cloud`
- **No portal webhook** exists yet — needs `GET /webhook/portal/status?token=` 
- **Apify scraper** needs real API token (marked ⚠️ in CLAUDE.md)
- **Discovery form** live and sending emails to admin + client

### Business Status (from action-plan-30-days.md as of 2026-04-29)
- Day 4 of 30-day plan
- 0 paying clients
- WhatsApp Business API not activated (Week 1 blocker)
- Week 3 target: first paying client signed — **Client Portal needed by then**

---

## Skills Available (from search)

| Task | Best Skill | Installs | Install Command |
|------|-----------|----------|-----------------|
| TanStack Router (portal routes) | `tanstack-skills/tanstack-skills@tanstack-router` | 936 | `npx skills add tanstack-skills/tanstack-skills@tanstack-router -g -y` |
| Next.js landing pages | `jezweb/claude-skills@landing-page` | 643 | `npx skills add jezweb/claude-skills@landing-page -g -y` |
| n8n workflows | `vladm3105/aidoc-flow-framework@n8n` | 420 | `npx skills add vladm3105/aidoc-flow-framework@n8n -g -y` |
| Tailwind UI patterns | `mindrally/skills@tailwindcss` | 367 | `npx skills add mindrally/skills@tailwindcss -g -y` |
| Frontend design (already installed) | `frontend-design:frontend-design` | built-in | already available |
| React best practices (already installed) | `react-best-practices` | built-in | already available |
| Next.js best practices (already installed) | `nextjs-best-practices` | built-in | already available |

---

## Key Technical Notes

### Portal Route Architecture
- TanStack Router uses file-based routing: `portal.$portalToken.tsx` will auto-generate `/portal/:portalToken`
- Must be added **outside** the `admin.tsx` layout (which has `isAuthed()` guard)
- Token validation: the n8n webhook validates token and returns 404/empty if not found
- No separate auth state needed — token in URL is the session

### n8n Portal Webhook Pattern
- Reuse existing GET pattern: `GET /webhook/portal/status?token={portalToken}`
- Read Clients sheet, filter by `portalToken` column
- Return only public-safe fields: `business, industry, bundleName, tier, agentStatus, nextRenewal, modules`
- Use `alwaysOutputData: true` on Sheets read node (per CLAUDE.md gotcha)

### Vertical Page Strategy
- Use Next.js App Router: `src/app/[industry]/page.tsx`
- Data from `src/lib/data.ts` — BUNDLES array is source of truth
- Pattern per page: `<IndustryHero>` + `<BundleCard industry={id}>` + `<Process>` + `<CTA>`
- Reuse existing section components — minimal new code
- `generateMetadata()` for per-industry SEO

### framer-motion v11 → v12 (MindSyncWeb)
- Breaking change check: v12 removed `MotionConfig.reducedMotion` prop in some versions
- Safe upgrade: `npm install framer-motion@^12` — API is largely compatible
- Must test ReceptionistChat.tsx (largest animated component, 16.8 KB)
