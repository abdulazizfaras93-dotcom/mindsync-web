# MindSync — 30-Day Action Plan
**Plan date:** 2026-04-24 (Fri) | **Day 1 of real outreach:** 2026-04-26 (Sun) | **Target:** 3 paying clinic clients + MindSyncWeb canonical

---

> **Status as of 2026-04-29** — Infrastructure complete. Sales at Day 4 with 0 outreach sent yet.
> - ✅ **Admin Dashboard live** at https://admin.mindsynckw.com — 10 pages, 16 n8n webhooks, all active.
> - ✅ **MindSyncWeb live** at https://www.mindsynckw.com — canonical Next.js landing, all sections deployed, bilingual AR/EN.
> - ✅ **Agent prompts unified** — Manager Agent + Receptionist both carry the full pricing table from data.ts + ADD-ON SERVICES block.
> - ✅ **Sitemap + robots.txt live** — Google Search Console error fixed.
> - ✅ **Legacy index.html retired** — moved to legacy/. www.mindsynckw.com is now Next.js only.
> - ✅ **Add-on services live** — Website Design + Mobile App shown on landing page (Bundles section), wired to WhatsApp quote CTA. Both agents briefed. Admin dashboard supports addon field on client records.
> - ✅ **Discovery form live** at /discovery — 10-section client questionnaire. Sends branded confirmation email to client + notification to admin@mindsynckw.com. Receptionist sends the link after pricing discussed + prospect signals intent.
> - 🔴 **Zero paying clients.** Month 1 target: 3 clinic clients.
> - 🔴 **Outreach not started.** WhatsApp Business API (Meta KW SIM) not activated. This is the blocker.
> - 🟡 **Client Portal not built.** Needed before first client goes live (Week 3).
> - 🟡 **TrustCluster section** — component built, not yet added to page.tsx.
> - 🔴 **Instagram @mindsync.kw** — account not created.
> - ✅ **Home-business permit issued (Apr 2026).** Legal name on all contracts: *مايند سينك لتصميم وبرمجة البرمجيات الخاصة*.

**Niche strategy:** Catalog of 8 bundles on the website, WhatsApp outreach focused 100% on **dental + health clinics** for Month 1. Expand to salons (Week 2), gyms (Week 3), rest (Week 4+) based on reply-rate data.

---

## Week 1 — Clinic Wedge (Sun 2026-04-26 → Thu 2026-04-30)

**Goal:** 100 clinic outreach messages sent, 5+ discovery calls booked, MindSyncWeb hero/bundles/process shipped to beta.

| # | Task | Tool | Owner | Due |
|---|---|---|---|---|
| 1 | Scrape 100 dental + health clinic WhatsApp numbers in Kuwait (governorate split: Hawalli, Farwaniya, Capital, Ahmadi) | Apify + Google Maps | Aziz | Sun |
| 2 | Activate Kuwait SIM for WhatsApp Business API (Meta) | Meta Developer + n8n | Aziz | Sun |
| 3 | Test bilingual-adaptive Receptionist Agent end-to-end (KW dialect + MSA + EN scenarios) | n8n chat interface | Aziz | Sun |
| 4 | Write 2 clinic WA cold outreach variants (dental pain-anchor + general clinic no-show anchor), Kuwaiti dialect primary | Claude + native review | Aziz | Sun |
| 5 | Send Variant A to 30 dental clinics (Sun–Mon) | WhatsApp manual | Aziz | Mon |
| 6 | MindSyncWeb: update `data.ts` (drop retail, add real-estate 680/260) | Next.js code | Aziz | Mon |
| 7 | MindSyncWeb: build `BundleCard` + `TrustCluster` + hero pain-anchor copy | Next.js + Tailwind | Aziz | Tue |
| 8 | Send Variant B to 30 general clinics (Tue–Wed) | WhatsApp manual | Aziz | Wed |
| 9 | MindSyncWeb: build `DemoChat` (canned 3-turn → real LLM via `/api/demo`) | Next.js + n8n | Aziz | Wed |
| 10 | Set up MindSync Instagram (@mindsync.kw), 3 launch posts (brand + "what is AI automation" + clinic use-case) | Canva + phone | Aziz | Thu |
| 11 | Deploy MindSyncWeb to `beta.mindsynckw.com` | Netlify | Aziz | Thu |
| 12 | Follow up all 60 Variant A/B contacts with single second touch | WhatsApp manual | Aziz | Thu |

---

## Week 2 — Book Demos + Expand Outreach (Sun May 3 → Thu May 7)

**Goal:** 10+ discovery calls completed, 3+ proposals out, MindSyncWeb on production domain alias.

| # | Task | Tool |
|---|---|---|
| 1 | Remaining 40 clinic outreach (Variant A/B alternating) | WhatsApp |
| 2 | 30 salon outreach — niche #2 reply-rate test | WhatsApp |
| 3 | Run 5+ discovery calls (Zoom/WA video, 15 min each) | Google Calendar |
| 4 | Send first 3 proposals via Proposal Writer Agent | n8n + Gmail |
| 5 | MindSyncWeb polish: reduced-motion, focus rings, OG/Twitter tags, JSON-LD | Next.js | 
| 6 | Submit sitemap to Google Search Console + Bing | GSC |
| 7 | Instagram: 3 more posts (process video, 7-day delivery explainer, hero clinic demo clip) | Canva |
| 8 | Test MyFatoorah sandbox end-to-end | MyFatoorah |

---

## Week 3 — Close + Cutover (Sun May 10 → Thu May 14)

**Goal:** First paying client signed + build started. MindSyncWeb replaces `index.html` on the apex domain.

| # | Task | Tool |
|---|---|---|
| 1 | Close first client — contract + payment link | Contract agent + MyFatoorah |
| 2 | Run Client Builder workflow → onboard to portal | n8n + Dashboard |
| 3 | Begin build: Client #1 (7-day SLA starts) | n8n + Claude Code |
| 4 | Cut over `mindsynckw.com` → MindSyncWeb; retire `index.html` (archive to `/legacy/`) | Netlify |
| 5 | Publish `/clinics` vertical page (shared shell, clinic pain + dental demo clip) | Next.js |
| 6 | 30 gym outreach — niche #3 reply-rate test | WhatsApp |
| 7 | Close second client (if pipeline allows) | — |
| 8 | Instagram: 3 posts (the real build behind-the-scenes, client-language quotes) | Canva |

---

## Week 4 — Deliver + Activate Referral Loop (Sun May 17 → Thu May 21)

**Goal:** Client #1 goes live, case study published, Client #3 signed.

| # | Task | Tool |
|---|---|---|
| 1 | Go-live: Client #1 — agent deployed, portal active, staff trained | n8n + Client Portal |
| 2 | Request testimonial + permission to publish at go-live | WhatsApp personal |
| 3 | Publish first case study on IG + `/clinics` page | Canva + Next.js |
| 4 | Close Client #3 | — |
| 5 | Begin build: Client #2 | n8n + Claude Code |
| 6 | Referral ask to Client #1: "Who else runs a clinic that you trust?" | WhatsApp |
| 7 | 30 garage + 30 restaurant outreach — niches #4 and #5 reply-rate test | WhatsApp |
| 8 | Review kill criteria: any triggered? Adjust wedge if clinic reply rate <5% | kill-criteria.md |

---

## Month 1 Success Metrics

| Metric | Target | Actual |
|---|---|---|
| Outreach contacts reached (clinics primary) | 150+ | — |
| Outreach across all niches (Weeks 2–4) | 90+ | — |
| Demo calls completed | 10+ | — |
| Proposals sent | 5+ | — |
| Clients signed | 3 | — |
| Clients live | 1 | — |
| MRR at end of Month 1 | 660 KWD (3 × 220 clinic Smart) | — |
| Instagram followers | 100+ | — |
| MindSyncWeb canonical on apex domain | ✅ by Week 3 | — |
| First vertical page (/clinics) published | ✅ by Week 4 | — |

---

## The One Rule

> **If you have 2 hours today, spend 90 minutes on outreach and 30 minutes on the landing page. Not the reverse.**

Infrastructure without clients is overhead. Revenue validates everything else.
