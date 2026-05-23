# MindSync — Financial Model
**Date:** 2026-04-24 | **Phase:** 1 | **Currency:** KWD

---

## Revenue Model

### Income Streams
1. **Build fees** — one-time, paid upfront (200–340 KWD per bundle)
2. **Monthly maintenance retainers** — recurring, auto-bundled with every build (120–580 KWD/mo depending on tier)
3. **Add-on services** — Website Design + Mobile App (iOS/Android), quoted per project via WhatsApp
4. **Add-on modules** — social media management, Meta ads, extra agents (discussed during sales call)

---

## Pricing Architecture

Retainer shown is the Smart tier (entry). Pro = ~1.5x Smart, Full Auto = ~2x Smart.

| # | Bundle | Build Fee | Smart Retainer | Build Cost | Retainer Cost | Build Margin | Retainer Margin |
|---|---|---|---|---|---|---|---|
| 1 | Clinic AI Bundle | 400 KWD | 220 KWD/mo | ~150 KWD | ~65 KWD | 2.7x | 3.4x |
| 2 | Salon AI Bundle | 300 KWD | 160 KWD/mo | ~120 KWD | ~55 KWD | 2.5x | 2.9x |
| 3 | Spa AI Bundle | 300 KWD | 160 KWD/mo | ~120 KWD | ~55 KWD | 2.5x | 2.9x |
| 4 | Gym AI Bundle | 320 KWD | 170 KWD/mo | ~135 KWD | ~60 KWD | 2.4x | 2.8x |
| 5 | Garage AI Bundle | 300 KWD | 160 KWD/mo | ~130 KWD | ~57 KWD | 2.3x | 2.8x |
| 6 | Restaurant AI Bundle | 380 KWD | 200 KWD/mo | ~135 KWD | ~65 KWD | 2.8x | 3.1x |
| 7 | Real Estate AI Bundle | 450 KWD | 250 KWD/mo | ~160 KWD | ~70 KWD | 2.8x | 3.6x |
| 8 | Home Business AI Bundle | 250 KWD | 130 KWD/mo | ~100 KWD | ~45 KWD | 2.5x | 2.9x |

**Build cost basis:** 7 days × 8hrs × 20 KWD effective rate (template stack advantage).
**Retainer cost basis:** ~10–15 hrs/mo monitoring + infrastructure share (~45–70 KWD/client/mo).

---

## Unit Economics

- **Blended build fee:** 337 KWD (avg across 8 bundles)
- **Blended monthly retainer:** 181 KWD/mo (Smart tier)
- **LTV (24 months):** 337 + (181 × 24) = **4,681 KWD per client**
- **CAC (Phase 1):** ~30–50 KWD (time cost of outreach + demo, no paid ads)
- **LTV:CAC ratio:** ~94–156x

---

## Monthly Revenue Projections — Base Scenario (2 clients/month, blended)

| Month | New Clients | Active Clients | Build Revenue | MRR | Total Revenue | Net Profit |
|---|---|---|---|---|---|---|
| 1 | 2 | 2 | 1,146 KWD | 420 KWD | 1,566 KWD | ~1,266 KWD |
| 2 | 2 | 4 | 1,146 KWD | 840 KWD | 1,986 KWD | ~1,586 KWD |
| 3 | 2 | 6 | 1,146 KWD | 1,260 KWD | 2,406 KWD | ~2,006 KWD |
| 4 | 2 | 8 | 1,146 KWD | 1,680 KWD | 2,826 KWD | ~2,326 KWD |
| 5 | 1 | 9 | 573 KWD | 1,890 KWD | 2,463 KWD | ~2,063 KWD |
| 6 | 1 | 10 | 573 KWD | 2,100 KWD | 2,673 KWD | ~2,273 KWD |

**MRR target (10 clients):** ~2,100 KWD/mo
**Net profit at 10 clients:** ~2,100 − 200 (infra) − 300 (time) = **~1,600 KWD/mo recurring**
Plus build fees on new clients: +573 KWD avg per new client

---

## Conservative Scenario (1 client/month)

| Month | Active Clients | MRR | Cumulative Revenue |
|---|---|---|---|
| 1 | 1 | 210 | 783 |
| 2 | 2 | 420 | 1,776 |
| 3 | 3 | 630 | 3,339 |
| 4 | 4 | 840 | 5,325 |
| 5 | 5 | 1,050 | 7,734 |
| 6 | 6 | 1,260 | 10,566 |

**At this pace:** 2,100 KWD MRR hit at Month 10.

---

## Optimistic Scenario (3 clients/month, with referrals)

| Month | Active Clients | MRR | Cumulative Revenue |
|---|---|---|---|
| 1 | 3 | 630 | 2,349 |
| 2 | 6 | 1,260 | 6,069 |
| 3 | 9 | 1,890 | 11,079 |
| 4 | 12 | 2,520 | 17,418 |

**At this pace:** 2,100 KWD MRR hit at Month 4. Teaching exit at Month 4.

---

## Clinic-Wedge Specific Projection (Month 1)

Assumes 100 clinic WA outreach → 10% reply → 5% demo booked → 60% close rate.

| Stage | Count |
|---|---|
| Cold messages sent | 100 |
| Replies | 10 |
| Demo calls booked | 5 |
| Clients signed | 3 |
| Month 1 MRR (clinic Smart 220 × 3) | 660 KWD |
| Month 1 build revenue (400 × 3) | 1,200 KWD |
| **Month 1 total** | **1,860 KWD** |

Hitting this removes the "no case study" risk by Week 4.

---

## Cost Structure (Monthly)

| Cost | Amount (KWD/mo) | Notes |
|---|---|---|
| Claude API (Anthropic) | 30–80 | Scales with active clients |
| n8n Cloud | 20 | Current plan |
| Netlify | 5 | Hosting |
| Supabase | 0–25 | Free tier → paid with scale |
| Google Workspace | 8 | admin email |
| WhatsApp API | 15–40 | Meta conversation fees |
| Tools & misc | 20 | Apify, domains, etc. |
| **Total fixed** | **~100–200 KWD/mo** | Very low overhead |

**Target: 200 KWD/mo fixed costs** (conservative ceiling)

---

## Break-Even Analysis

- **Break-even:** Day 1 of first client (build fee alone = 2.5–3 months of infrastructure costs)
- **Cash flow:** Positive from first client. Build fees paid upfront.
- **Runway:** Infinite — no burn, bootstrapped.

---

## Financial Red Flags

- **[Red Flag]** Build fees are one-time — income is lumpy in early months. MRR smooths this by Month 3+.
- **[Yellow Flag]** No payment automation yet (MyFatoorah not fully active) — manual invoicing creates collection risk. Fix by Month 2.
- **[Yellow Flag]** At <5 clients, a single churn hits MRR significantly. Prioritize client success in first 90 days.
- **[Watch]** Retainer margins drop below 2.5x on Salon bundle. Consider nudging salon retainer to 180 KWD/mo after first 3 salon clients validate the market.
- **[Watch]** Real-estate retainer cost assumes 10–15 hrs/mo. Brokers with 500+ listings may push this to 20 hrs. Re-price if margin falls below 3x after client #2.
