# MindSync Upgrade Task Plan
**Created:** 2026-05-02  
**Last updated:** 2026-05-03  
**Status:** In Progress  
**Goal:** Execute all outstanding upgrades across admin dashboard, landing page, n8n stack, and tech debt — to unblock Week 3 client onboarding and accelerate sales.

---

## Phase Overview

| # | Phase | Priority | Status | Deadline |
|---|-------|----------|--------|----------|
| 1 | Client Portal (new product surface) | 🔴 CRITICAL | **pending** | Week 3 (May 10–14) |
| 2 | Landing Page — Vertical Pages | 🔴 HIGH | ✅ **done** — `[industry]/page.tsx` dynamic route built | Week 2 (May 3–7) |
| 3 | Landing Page — TrustCluster activation | 🟡 MEDIUM | ✅ **done** — `<TrustCluster />` in `page.tsx` between BuiltOn and FAQ | Week 2 |
| 4 | Admin Dashboard — Tech Debt | 🟡 MEDIUM | pending | Week 2 |
| 5 | n8n — Complete Conversations feature | 🟡 MEDIUM | pending | Week 2 |
| 6 | Dependency / version consistency | 🟢 LOW | pending | Any time |

---

## Phase 1 — Client Portal (CRITICAL BLOCKER)

**Why:** First paying client is targeted for Week 3 (May 10–14). The portal is the client-facing value proof — without it the onboarding experience is incomplete.

**What needs to be built:**
- [ ] Token-based URL route: `/portal/:portalToken`
- [ ] Portal layout (separate from admin, no auth wall — token IS the auth)
- [ ] Sections: Agent Status card, Next Renewal, MRR paid, Active Modules list, Contact Us
- [ ] Fetch: `GET /webhook/portal/status?token={portalToken}` (n8n webhook to build)
- [ ] n8n webhook: `portal-status` — reads Clients sheet by `portalToken`, returns public-safe fields
- [ ] Generate portalToken on client creation (UUID, save to sheet)
- [ ] Admin: show portal URL on client detail page (`/portal/{token}`)
- [ ] Brand: Gulf Premium palette, bilingual AR/EN, Space Grotesk font
- [ ] Mobile-first (clients view on phone)

**Skills to use:** `tanstack-skills/tanstack-skills@tanstack-router` (936 installs), built-in `frontend-design:frontend-design`

**Files to create/modify:**
- `app/src/routes/portal.$portalToken.tsx` (new)
- `app/src/routes/__root.tsx` (add portal route outside admin guard)
- `app/src/lib/n8n.ts` (add `portalStatus` endpoint)
- n8n: new workflow or webhook in admin stack

---

## Phase 2 — Landing Page Vertical Pages

**Why:** 6 of 8 industry verticals have no dedicated page. Vertical pages improve SEO and conversion for targeted industries.

**What needs to be built:**
- [ ] `/clinics` — Clinic AI page
- [ ] `/salons` — Salon AI page
- [ ] `/gyms` — Gym AI page
- [ ] `/garages` — Garage AI page
- [ ] `/restaurants` — Restaurant AI page
- [ ] `/real-estate` — Real Estate AI page
- [ ] Pattern: Hero (industry-specific copy) + relevant bundle cards + Process + CTA
- [ ] Update `sitemap.ts` to include new routes
- [ ] `/spa` and `/home-businesses` already exist (redirect to `/#bundles`) — upgrade to real pages

**Files to create/modify:**
- `MindSyncWeb/src/app/clinics/page.tsx` (new)
- `MindSyncWeb/src/app/salons/page.tsx` (new)
- `MindSyncWeb/src/app/gyms/page.tsx` (new)
- `MindSyncWeb/src/app/garages/page.tsx` (new)
- `MindSyncWeb/src/app/restaurants/page.tsx` (new)
- `MindSyncWeb/src/app/real-estate/page.tsx` (new)
- `MindSyncWeb/src/app/sitemap.ts` (update)

---

## Phase 3 — Landing Page: TrustCluster Activation

**Why:** `TrustCluster.tsx` is built but never imported into `page.tsx`. Social proof is a high-conversion lever — blocking CTA decisions.

**What to do:**
- [ ] Read `TrustCluster.tsx` to understand what props/data it needs
- [ ] Add real or placeholder trust data (client count, industries served, uptime stat)
- [ ] Import into `src/app/page.tsx` — insert between `ROICalculator` and `ReceptionistChat`
- [ ] Test bilingual rendering (AR/EN toggle)

**Files to modify:**
- `MindSyncWeb/src/app/page.tsx`
- `MindSyncWeb/src/components/sections/TrustCluster.tsx` (possibly update data)

---

## Phase 4 — Admin Dashboard: Tech Debt

**Why:** Hardcoded data creates drift risk when pricing changes (already happened once).

**What to do:**
- [ ] Extract `BUNDLES` constant from `admin.clients.new.tsx` into `app/src/lib/bundles.ts` (mirroring `data.ts` shape)
- [ ] Extract `MODULES` array from both `admin.clients.new.tsx` and `admin.clients.$clientId.tsx` into shared `bundles.ts`
- [ ] Import shared constant in both route files — eliminate duplication
- [ ] Verify no regressions in new-client form or edit form

**Files to modify:**
- `app/src/lib/bundles.ts` (new shared file)
- `app/src/routes/admin.clients.new.tsx`
- `app/src/routes/admin.clients.$clientId.tsx`

---

## Phase 5 — n8n: Conversations Feature

**Why:** `app/src/features/conversations/` directory exists with api/components/hooks/types subdirs but is incomplete. The Conversations page route (`admin.conversations.tsx`) exists — unclear if it renders real data.

**What to do:**
- [ ] Read `admin.conversations.tsx` to understand current state
- [ ] Read `features/conversations/` to assess what's built vs missing
- [ ] Identify if there's a corresponding n8n webhook (`/webhook/admin/conversations`)
- [ ] If webhook missing: build n8n workflow to read conversations from Google Sheets
- [ ] Complete React components if needed

---

## Phase 6 — Dependency Consistency

**What to do:**
- [ ] Align `framer-motion`: app has v12.38.0, web has v11.0.0 — upgrade web to v12
- [ ] Align `typescript`: app has 5.6.3, web has 5.9.3 — upgrade app to 5.9.x
- [ ] Check for any `npm audit` vulnerabilities in both projects

**Files to modify:**
- `MindSyncWeb/package.json`
- `app/package.json`

---

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|

---

## Decisions Log
| Decision | Rationale |
|----------|-----------|
| Client Portal in TanStack Router (not Next.js) | Portal is part of admin app; token-based auth fits the existing pattern |
| Vertical pages in Next.js App Router | SEO requires SSR; landing page is already Next.js |
| Shared `bundles.ts` (not importing from MindSyncWeb) | Two separate repos/build systems; duplication is acceptable, drift risk is not |
