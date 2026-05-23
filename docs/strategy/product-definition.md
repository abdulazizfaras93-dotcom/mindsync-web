# MindSync — Product Definition
**Date:** 2026-04-24 | **Phase:** 1

---

## Product Architecture

```
┌─────────────────────────────────────────────────────┐
│                  LANDING PAGE                        │
│  (MindSyncWeb — Next.js 14 App Router, canonical)   │
│  • 8 industry bundle showcase with live KWD pricing │
│  • Hybrid live demo: canned 3 turns → real LLM      │
│  • Vertical pages: /clinics, /salons, /gyms,        │
│    /garages, /restaurants, /real-estate             │
│  • Book a call / WhatsApp CTA                       │
│  • Bilingual AR/EN, Private-Bank × Engineering mood │
└─────────────────────────────────────────────────────┘
            ↓ client onboarded ↓
┌─────────────────────────────────────────────────────┐
│               CLIENT PORTAL                          │
│  (Token-based URL per client — private)             │
│  • Value Delivered hero panel (messages, bookings)  │
│  • Agent status + uptime                            │
│  • Conversation logs                                │
│  • Billing + subscription                           │
│  • Onboarding progress checklist                    │
└─────────────────────────────────────────────────────┘
            ↓ managed by ↓
┌─────────────────────────────────────────────────────┐
│               ADMIN DASHBOARD                        │
│  (admin.mindsynckw.com — Aziz only, SHA-256 auth)   │
│  • Live MRR counter + WhatsApp spotlight card       │
│  • Client pipeline + leads                          │
│  • Billing + invoicing                              │
│  • Agent monitoring · one-click triggers            │
└─────────────────────────────────────────────────────┘
            ↓ powered by ↓
┌─────────────────────────────────────────────────────┐
│               n8n BACKEND                            │
│  • Claude-powered AI agents (Haiku / Sonnet / Opus) │
│  • Google Sheets CRM                                │
│  • WhatsApp Business API                            │
│  • MyFatoorah payments                              │
│  • Bilingual-adaptive Receptionist Agent            │
└─────────────────────────────────────────────────────┘
```

---

## Product 1: Landing Page (MindSyncWeb)

### Purpose
Convert Kuwait SMB owners into booked discovery calls via WhatsApp or Google Calendar. Primary traffic: WA forwards from outreach, IG bio link, word of mouth.

### Visual Concept — Private Bank × Engineering Studio
Full-bleed warm-ivory canvas. Oversized Arabic-first headlines in Noto Kufi. Tiny gold step-numbers in JetBrains Mono. The only chromatic surface per page is the deep-green demo/CTA plate with gold scanline. Cursor-reactive motion only — zero parallax, zero autoplay. Reads like Emirates NBD Private × Linear.app.

### Key Sections (in order — v2, live as of 2026-05-02)
1. **Hero** — video background (mindsync.mp4), Arabic headline, EN sub-headline, primary CTA → `/discovery` form, WhatsApp floating button only
2. **Services** — "What We Build" 4-service overview (replaced Demo section)
3. **WhyNotBot** — credibility comparison section vs. bots/freelancers/enterprise
4. **Bundle Showcase** — 8 cards (Smart/Pro/Full Auto tiers), all prices in KWD front-and-center, 7-day delivery badge
5. **ROI Calculator** — interactive calculator showing automation ROI
6. **Receptionist Chat** — live AI receptionist demo (via n8n)
7. **Process** — 2-col layout with sticky ProcessMorph canvas (r3f), 5 interactive steps
8. **BuiltOn** — tech stack logos
9. **Trust Cluster** — Made-in-Kuwait · active-agent counter · MyFatoorah + Meta Business Partner logos
10. **FAQ** — Q&A, JSON-LD FAQPage schema
11. **CTA + Footer** — AR/EN toggle, legal name, WA link
12. **WhatsApp floating button** — mobile + desktop, gold outline on hover

> Note: Demo section removed from page (replaced by Services). Demo files still exist but are not rendered.

### Vertical Pages (Phase 1.5)
`/clinics` `/salons` `/gyms` `/garages` `/restaurants` `/real-estate` — shared shell, swap hero + testimonials + example bot transcript. `/clinics` ships first (Week 3).

### Tech Stack
- **Framework:** Next.js 14 App Router + React 18 + TypeScript
- **Styling:** Tailwind CSS 3 (tokens in `tailwind.config.ts` `colors.ms.*`)
- **Animation:** Framer Motion (cursor-reactive only)
- **Forms → n8n:** Webhook triggers Receptionist Agent on submit
- **Calendar:** Google Calendar embed (15-min discovery, Kuwait tz)
- **WhatsApp:** `wa.me` link + receptionist webhook
- **Hosting:** Netlify via `@netlify/plugin-nextjs`, Node 20

### MVP Priority (Week 1–2)
1. 🔜 Hero + Bundles + Process (Sat 2026-04-25)
2. 🔜 Hybrid live demo (Sun–Mon 2026-04-26/27)
3. 🔜 FAQ + Trust Cluster + Sticky WA (Tue 2026-04-28)
4. 🔜 Beta deploy to beta.mindsynckw.com (Wed 2026-04-29)
5. 🔜 Cut over `mindsynckw.com` → MindSyncWeb (Week 3, after 1st discovery call cohort)
6. 🔜 `/clinics` vertical page (Week 3, post first signed client)
7. ⏳ Case studies section (Phase 2 — after first client goes live)
8. ⏳ Meta Pixel + PostHog (Phase 2 — before paid ads)

### MindSyncWeb Component Plan
```
src/app/
  page.tsx                    (composes all sections)
  layout.tsx
  clinics/page.tsx            (Week 3)
  salons/page.tsx             (Week 4+)
  gyms/page.tsx               (Week 4+)
  garages/page.tsx            (Week 5+)
  restaurants/page.tsx        (Week 5+)
  real-estate/page.tsx        (Week 5+)
  api/demo/route.ts           (proxy to n8n receptionist demo webhook)

src/components/
  layout/Navbar.tsx           (done — needs lang toggle polish)
  sections/Hero.tsx           (done — needs pain-anchored rewrite)
  sections/Demo.tsx           (rewrite for hybrid canned→real)
  sections/Bundles.tsx        (done — needs real-estate row + "Highest Value" tag)
  sections/Process.tsx        (done)
  sections/FAQ.tsx            (done)
  sections/CTAFooter.tsx      (done — add trust cluster above CTA)
  sections/TrustCluster.tsx   (NEW — live agent count + badges)
  ui/WhatsAppButton.tsx       (done)
  ui/BundleCard.tsx           (NEW — shared between home + vertical pages)
  ui/PortalPreview.tsx        (NEW — shown after demo completes)
  ui/DemoChat.tsx             (NEW — typing indicator, canned+live)

src/lib/
  data.ts                     (update: drop retail, add real-estate 680/260)
  lang.tsx                    (done)
  demo-scripts.ts             (NEW — per-industry canned 3-turn scripts AR + EN)
```

---

## Product 2: Client Portal

### Purpose
Give each client visibility into their automation — builds trust, reduces support tickets, sells the retainer every time they open it.

### Hero Panel — "Value Delivered" (top of screen, always)
Single big-number card, localized:
> **"بوتك رد على ٢٣٤ رسالة هالشهر · حجز ٤١ موعد · ٠ رسالة ضايعة"**
> "Your bot replied to 234 messages this month · booked 41 appointments · 0 missed"

Below: secondary tiles for uptime %, next invoice date, onboarding checklist progress.

### Other Features
- **Token-based login** — unique URL per client, no password
- **Conversation logs** — last 20 anonymized, search + filter by day
- **Billing panel** — current plan, next invoice, payment history, MyFatoorah link
- **Onboarding checklist** — step-by-step (WA setup → live agent)
- **Support form** — submits to Aziz's n8n Support Agent

### UX Principles
- Mobile-first — Kuwait SMB owners view on phone
- Arabic-first — AR default, EN toggle
- No login friction — single token URL = full access
- Data they care about, in priority order: money-in → uptime → next-invoice → logs

---

## Product 3: Admin Dashboard

### Purpose
Aziz's command center — already live at `admin.mindsynckw.com`, SHA-256 auth, 13 n8n webhooks wired. Status: **complete, not rebuilding**. Adding 2 things only:

### New — Live MRR Counter (Home tile)
Top-left card on the dashboard home: current MRR (sum of active retainers), delta vs. last month, forecast end-of-month based on pipeline. Pulled from `/webhook/admin/mrr/current`.

### New — WhatsApp Spotlight Card
Live stream of the last 5 real WA messages received across all clients' agents, anonymized (name→initials, phone→masked). Lets Aziz spot agent issues in 3 seconds without clicking into individual clients. Pulled from `/webhook/admin/wa/recent`.

### Existing Features (unchanged)
- Pipeline view — Leads → Demo Booked → Proposal Sent → Active Client
- Client cards — bundle type, agent status, portal token, retainer amount
- Add/Edit Client
- Billing overview — MRR, upcoming renewals, overdue invoices
- One-click triggers — onboarding agent, contract, invoice
- SHA-256 auth + 12h localStorage session

---

## Product 4: AI Agent Stack

| Agent Type | Use Case | Claude Model | Delivery |
|---|---|---|---|
| Basic FAQ Bot | Static FAQ, hours, menu, prices | Haiku | 2 days |
| Standard Booking Agent | Booking + reminders + 1–2 integrations | Sonnet | 5 days |
| Advanced CRM Agent | Live data + human handoff + complex flows | Sonnet | 7 days |
| WhatsApp Broadcast | Campaign messaging (Ramadan, Eid, promos) | Haiku | 1 day |
| Receptionist Agent | Bilingual-adaptive, landing + WA inbound, books calls | Haiku | Internal |

**Platform:** n8n cloud (`ifaras911.app.n8n.cloud`)
**Channels:** WhatsApp Business API (Meta), web chat widget, Instagram DM
**Receptionist persona:** see `brand-identity.md` → "Receptionist Agent Persona"

---

## Bundle Feature Matrix

| Feature | Clinic | Salon | Gym | Garage | Restaurant | Real Estate |
|---|---|---|---|---|---|---|
| WhatsApp AI Agent | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Appointment / Booking | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ (viewings) |
| Automated Reminders | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ (follow-up) |
| CRM Setup | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Client Portal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Staff Training | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Job / Order Tracking | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| Membership / Renewal | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Menu / Catalogue Bot | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ (listings) |
| Lead Qualification | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (budget/area) |
| Broadcast Campaigns | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (new listings) |

---

## Phase Roadmap

### Phase 1 (Apr 26 – Jun 30, 2026): Foundation
- [x] Admin dashboard live (`admin.mindsynckw.com`)
- [x] n8n agent stack live (Manager, Receptionist, PDF Generator, Discovery Form)
- [x] MindSyncWeb canonical landing live (www.mindsynckw.com, v2 launched 2026-05-02)
- [ ] Client Portal — NOT YET BUILT (token field exists on Client type; planned for Week 3)
- [ ] WhatsApp Business API activation (Week 1 blocker)
- [x] Bilingual-adaptive receptionist live on website
- [ ] First 3 clinic clients signed

### Phase 2 (Jul – Sep 2026): Growth
- [ ] All 8 vertical pages live
- [ ] Case study section on landing (3+ studies)
- [ ] Meta ads activated
- [ ] Google Calendar public booking widget
- [ ] Recurring billing automation (MyFatoorah)

### Phase 3 (Oct – Dec 2026): Scale
- [ ] GCC landing variant (UAE/KSA)
- [ ] White-label option for resellers
- [ ] Multi-tenant client portal

---

## Critical Build Priority (Week 1, Sun 2026-04-26 → Thu 2026-04-30)

| Priority | Task | Tool | Est. Time |
|---|---|---|---|
| 1 | Clinic outreach: 100 WhatsApp messages, 2 variants | n8n + WA + Apify | Daily |
| 2 | MindSyncWeb hero + bundles + process to beta | Next.js + Tailwind | 2 days |
| 3 | WhatsApp Business API activation on Kuwait SIM | Meta + n8n | 1 day |
| 4 | Receptionist bilingual-adaptive live test end-to-end | n8n + Claude | 0.5 day |
| 5 | Instagram account setup + first 3 posts | Canva | 0.5 day |
| 6 | Apify: scrape 100 clinic WA numbers in Kuwait | Apify + Sheets | 0.5 day |
