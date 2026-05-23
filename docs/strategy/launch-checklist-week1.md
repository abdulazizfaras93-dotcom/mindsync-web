# Launch Checklist — Week 1 (Sun 2026-04-26 → Thu 2026-04-30)

**Focus:** Dental + health clinics. 100 WhatsApp cold messages, 5+ demos booked, MindSyncWeb beta shipped.
**The One Rule:** 90 min outreach, 30 min build — every day.

---

## Weekend prep (Fri 2026-04-24 + Sat 2026-04-25)

- [x] Update `MindSyncWeb/src/lib/data.ts` — drop retail, add real-estate (680 / 260, `باقة العقارات الذكية`)
- [x] Receptionist: full bilingual-adaptive system prompt deployed (all dialect rules + complete pricing table from data.ts)
- [ ] Apify Google Maps Scraper: save query template for "dental clinic Kuwait" + "health clinic Kuwait"
- [x] Write Kuwaiti-dialect WA cold message Variant A (dental no-show anchor) + Variant B (general clinic overwhelm anchor) — templates in this file
- [ ] Native review: read A + B out loud to one Kuwaiti friend, fix anything that sounds "AI-ish"
- [ ] Google Calendar: create 15-min "MindSync Discovery" event template, Kuwait tz, Sun–Thu 10:00–20:00 availability
- [x] Deploy MindSyncWeb to production (`www.mindsynckw.com` — went live 2026-04-25, beta.mindsynckw.com skipped)

---

## Sunday 2026-04-26 — Day 1 ⚠️ BLOCKED — WhatsApp Business API not activated

**Outreach block (AM, 90 min):**
- [ ] ⚠️ BLOCKER: Activate Kuwait SIM with Meta WhatsApp Business API first
- [ ] Run Apify scrape → 100 clinic WA numbers, dedupe, split 60/40 dental/general, save to Google Sheet `clinic-outreach-w1`
- [ ] Send Variant A to 15 dental clinics (manual WA, spaced ~2 min apart)

**Build block (PM, 30 min):**
- [ ] MindSyncWeb: update Hero copy to pain-anchored Kuwaiti headline
- [x] Confirm WA Business API Kuwait SIM activation flow with Meta

**Admin:**
- [ ] End-of-day log in Google Sheet: sent / replied / typing / blocked

---

## Monday 2026-04-27 — Day 2

**Outreach (AM):**
- [ ] Send Variant A to 15 more dental clinics
- [ ] Reply to any Day-1 inbounds — route qualified to receptionist demo link

**Build (PM):**
- [x] MindSyncWeb: all 6 bundles live on Bundles section (including real-estate)
- [x] Admin dashboard: all 16 n8n webhooks built and active

---

## Tuesday 2026-04-28 — Day 3 (TODAY)

**Outreach (AM):**
- [ ] Send Variant B to 20 general clinics
- [ ] First touch-2 follow-up to Day-1 non-responders (single short nudge only)

**Build (PM):**
- [x] Agent prompts synced to data.ts (Manager + Receptionist both carry full pricing)
- [x] Sitemap + robots.txt added → GSC error fixed
- [x] Favicon updated to logo-transparent.png
- [x] Files reorganized (strategy/, brand/, screenshots/, legacy/)
- [ ] Add TrustCluster to page.tsx (1-line change — quick win)
- [ ] Focus rings + sticky WA button audit

---

## Wednesday 2026-04-29 — Day 4

**Outreach (AM):**
- [ ] Send Variant B to 20 more general clinics
- [ ] Run 1–2 first discovery calls if any booked

**Build (PM):**
- [ ] MindSyncWeb: `DemoChat` canned 3-turn flow per industry
- [ ] Wire `/api/demo` → n8n receptionist demo webhook (for "Ask your own" live mode)

---

## Thursday 2026-04-30 — Day 5

**Outreach (AM):**
- [ ] Touch-2 follow-up to Day-2/3/4 non-responders
- [ ] Finalize discovery-call bookings for Week 2

**Build (PM):**
- [ ] MindSyncWeb: FAQ JSON-LD + OG/Twitter tags in `layout.tsx` metadata
- [ ] Deploy beta — verify on iPhone Safari + Samsung Chrome (RTL + LTR both)

**Instagram (evening):**
- [ ] Post 1: Brand launch — logo + tagline, bilingual caption
- [ ] Post 2: "ما هي أتمتة الذكاء الاصطناعي؟" — 1 min carousel
- [ ] Post 3: Clinic use-case teaser — sample WhatsApp booking flow (mock)

---

## Clinic WA Cold Message Templates

### Variant A — Dental no-show anchor (Kuwaiti dialect)

```
السلام عليكم دكتور [اسم]
اسمي عزيز من MindSync، شركة كويتية جديدة متخصصة في أتمتة أعمال العيادات.

سؤال سريع: كم موعد يضيع عليك في الأسبوع بسبب المواعيد الفايتة
أو رسائل الواتساب اللي ما يرد عليها أحد؟

عندنا باقة كاملة للعيادات: بوت واتساب يرد ٢٤ ساعة،
يحجز المواعيد، يذكر المرضى، ويقلل الغيابات بنسبة ٤٠٪.

جاهزة في ٧ أيام، السعر ثابت، ولوحة تحكم تشوف فيها كل شي لايف.

تبي مكالمة ١٥ دقيقة أشرح لك كيف يشتغل؟
mindsynckw.com
```

### Variant B — General clinic overwhelm anchor (Kuwaiti dialect)

```
هلا دكتور [اسم]
عزيز من MindSync — شركة كويتية نبني أنظمة ذكاء اصطناعي للعيادات والأعمال.

لاحظت إن كثير عيادات في الكويت تستقبل ٥٠-١٠٠ رسالة واتساب باليوم،
أغلبها نفس السؤال: "متى الدكتور موجود؟" "كم سعر الكشف؟"
والموظفة تضيّع نص يومها في الرد.

عندنا حل كامل: بوت واتساب يرد على كل شي، يحجز، ويتابع.
العيادة تركز على المريض، والبوت يركز على الرسائل.

جاهز في ٧ أيام، ٤٠٠ دينار بناء + ٢٢٠ شهرياً صيانة (باقة Smart).
لا التزام طويل، تقدر تلغي أي شهر.

تبي تجرب ديمو مباشر؟ أرسل لك الرابط.
```

### English fallback (if prospect replies in English)

```
Hi Dr. [Name], Aziz from MindSync here — a Kuwait-based AI
automation agency built specifically for clinics here.

Quick question: how many WhatsApp messages does your reception
handle daily? And how many bookings leak because nobody replies
fast enough?

We build a WhatsApp AI receptionist tailored to your clinic in
7 business days — answers 24/7, books appointments, sends reminders,
cuts no-shows by ~40%.

Fixed price, live dashboard, cancel anytime.

Worth a 15-min call? mindsynckw.com
```

---

## Receptionist Agent — Test Script (before Day 1)

Run these 6 scenarios against the deployed receptionist webhook. It must respond in the same language + register as the input.

| # | Input (user) | Expected register |
|---|---|---|
| 1 | "هلا، كم سعر باقة العيادة؟" | Kuwaiti dialect reply |
| 2 | "السلام عليكم، أود الاستفسار عن الخدمات" | MSA reply |
| 3 | "Hey, what's included in the clinic bundle?" | English reply, warm |
| 4 | "أريد حجز مكالمة مع المؤسس" | MSA → book GCal slot, ask for WA number |
| 5 | "تبي تسوي تخفيض؟ ميزانيتي ٤٠٠ دينار بس" | Kuwaiti, polite refusal, no discount |
| 6 | "Can you build me a logo?" | Out-of-scope → polite redirect to Aziz |

Log pass/fail in a single Sheet. Any fail blocks the WA outreach launch — do not send cold messages until all 6 pass.

---

## Kill-switch rules for Week 1

Stop and reassess if any of these triggers:
- Reply rate < 3% after 60 messages sent → wedge is wrong, pivot to salons or brokers
- Zero demos booked by Thursday EOD → message copy is wrong, rewrite with native
- Receptionist fails any test 1–6 → pull from live until fixed, send manual replies in interim
- WhatsApp Business API rejection / number ban → switch to personal KW number with clear disclosure until resolved

---

## Week 1 Definition of Done

- [ ] 100 clinic messages sent, logged in Sheet with status column
- [ ] 5+ discovery calls on Aziz's Google Calendar for Week 2
- [x] `www.mindsynckw.com` live, mobile + desktop, AR + EN both tested (went to production directly)
- [ ] Receptionist passes all 6 scenarios (test script in this file)
- [ ] Instagram account live with 3 posts, ≥ 25 followers
- [ ] Sheet `clinic-outreach-w1` complete with reply-rate + booked-rate numbers for Week-2 decision
