# MindSync Landing Page Update Spec

**For**: Claude Code
**Repository**: MindSyncWeb/
**Date**: 2026-05-16
**Status**: Ready to implement

---

## Context

We are repositioning MindSyncKW from a multi-sector AI automation agency (clinics/restaurants/real-estate/etc.) to a **focused offering for all types of home businesses in Kuwait**.

The current 8 sector-specific bundles must be replaced with a **single all-inclusive package**: MindSync Complete.

---

## Brand Rules (must follow)

- Palette only: green `#153E2D`, gold `#BF8D38`, ivory `#FBFAF5`, ink `#0E1512`
- No founder personal name anywhere in public content
- Default contact email: `admin@mindsynckw.com`
- Bilingual: Arabic-first with full RTL support
- Prices in KWD only
- WhatsApp link ONLY in the floating `WhatsAppButton` — nowhere else
- Primary CTA across the site: `/discovery`
- Add-ons (website, mobile app, custom integrations) remain **quote-only** — never invent prices

---

## Change 1: Hero Section

### Current (to be replaced)

```
مشروعك يستاهل
يشتغل بدونك.

نبني ونعلم نظاماً خصصناه ببرمجيات وذكاء اصطناعي —
يرد، يحجز، يتابع، ويحلل.
من واتساب للوحة تحكم في ٧ أيام عمل.
```

### New (Arabic)

**Headline:**
```
بدأت مشروعك من البيت.
تبي مشروعك يكبر — حتى وأنت نايم.
```

**Subheadline:**
```
المنظومة الذكية اللي ترد، تحجز، تتابع، وتحلّل ٢٤/٧.
كأن عندك فريق كامل — بدون فريق.
```

**Eyebrow tag (above headline):**
```
منظومة ذكاء اصطناعي وأتمتة · للمشاريع المنزلية بالكويت
```

**CTAs:**
- Primary button: `ابدأ تجربتك المجانية ←` → links to `/discovery`
- Secondary button: `شوف شلون يشتغل` → scrolls to `#process` section

### New (English)

**Headline:**
```
You started your business from home.
You want it to grow — even while you sleep.
```

**Subheadline:**
```
The intelligent system that replies, books, follows up,
and analyzes — 24/7. Like having a full team, without one.
```

**Eyebrow tag:**
```
AI & Automation System · For Home Businesses in Kuwait
```

**CTAs:**
- Primary: `Start Your Free Trial ←` → `/discovery`
- Secondary: `See How It Works` → `#process`

---

## Change 2: Stats Section (under hero)

### Critical Bug Fix

The current stats display `0` for all values (counter animation issue). Fix by providing static fallback values that animate FROM near-final TO final, not from zero.

### Stats to display (Arabic / English)

| Number | Arabic Label | English Label |
| ----: | ----: | ----: |
| 7 | أيام ونخلص الإعداد | Days to launch |
| 1 | منظومة شاملة لكل مشروع | Complete system per project |
| 24/7 | وقت التشغيل | Uptime |
| 100% | البيانات تبقى لك | Data ownership |

**Remove**: the bottom row stats (`0+ عمل تجاري مؤتمت`, `0+ ساعة موفّرة أسبوعياً`, `0s متوسط وقت الرد`, `0% نسبة الاحتفاظ`) — replace with real numbers only when you have actual clients to back them up. Until then, hide them entirely.

---

## Change 3: "What We Build" Section

### Current

Lists 5 components (AI Agent, Dashboard, Workflow Automation, Websites & Apps, Monthly Maintenance) with individual prices.

### New (Keep the 5 components, change prices/positioning)

**Section title (AR):** `المنظومة اللي نبنيها لك`
**Section title (EN):** `The system we build for you`

**Component 1: وكيل ذكاء اصطناعي مخصص**
- Description: as-is, slight update
- ❌ Remove price `بناء · من 250 د.ك · تشغيل · من 130 د.ك / شهر`
- ✅ Replace with: `مشمول في MindSync Complete`

**Component 2: لوحة التحكم**
- Keep description
- Tag: `مشمول`

**Component 3: أتمتة سير العمل**
- Keep description
- Tag: `+10 سير عمل من اليوم الأول`

**Component 4: المواقع والتطبيقات**
- Keep description
- Tag (changed): `إضافة اختيارية · بعد استشارة`
- ❌ Remove `من 300 د.ك بناءً`

**Component 5: الصيانة الشهرية**
- Description update
- Tag: `مشمول · إعادة تدريب شهرية بناءً على receipts`
- ❌ Remove `من 130 د.ك / شهر`

---

## Change 4: Replace "Sector Bundles" Section Entirely

### Remove completely

The 8 sector bundles section (`العيادة الذكية 400 د.ك`, `الصالون الذكي 300 د.ك`, etc.) must be **removed**.

### Replace with: Pricing Section

**Section eyebrow (AR):** `التسعير`
**Section title (AR):** `سعر واحد. كل شي شامل.`
**Section title (EN):** `One price. Everything included.`

**Single Pricing Card:**

```
┌────────────────────────────────────────────┐
│                                            │
│         MindSync Complete                  │
│                                            │
│   ٣٤٩ د.ك  +  ١٥٩ د.ك / شهر               │
│   إعداد       اشتراك شهري                 │
│                                            │
│   ──────────────────────────────────────  │
│                                            │
│   شامل بالكامل:                            │
│                                            │
│   ✓ كل البنية التحتية والـ AI APIs        │
│   ✓ Setup وتدريب كامل                     │
│   ✓ إدارة شهرية                           │
│   ✓ إعادة تدريب بناءً على receipts        │
│   ✓ لوحة تحكم احترافية                    │
│   ✓ ١٬٠٠٠ محادثة شهرياً مشمولة            │
│                                            │
│   ──────────────────────────────────────  │
│                                            │
│   الاستخدام الإضافي (Fair Use):           │
│   ١٬٠٠١ – ٢٬٠٠٠ محادثة:  +٣٠ د.ك / شهر   │
│   ٢٬٠٠١+ محادثة:        +٦٠ د.ك / شهر    │
│                                            │
│   ──────────────────────────────────────  │
│                                            │
│   [ابدأ تجربتك المجانية ←]                │
│                                            │
└────────────────────────────────────────────┘
```

### Below the pricing card

**Trial banner (keep existing concept):**

```
أسبوع تجربة مجانية

نبني نظامك الذكي الفعلي بناءً على مشروعك.
شغّله أسبوع — بدون أي دفع.
إذا عجبك، نفعّله. إذا لا، ما في أي تكلفة.

[اطلب تجربتك المجانية]
```

### Custom systems block (keep)

**Title:** `نظام ذكاء اصطناعي مخصص`
**Body:** `مشروعك يحتاج خصائص خارج نطاق MindSync Complete؟ نصمم ونبني نظام مخصص بعد مكالمة استشارة.`
**Tag:** `السعر يُحدد بعد مكالمة استشارة مجانية`
**CTA:** `احجز استشارة` → `/discovery`

---

## Change 5: "Industries" Section

### Current

6 industries with metrics (dental clinic, salon, gym, auto, restaurant, real estate) using `0` placeholder numbers.

### New Approach

**Option A** (recommended): Replace industries with **home business categories grid** (no fake metrics).

**Section title (AR):** `مشروعك من البيت؟ احنا له.`
**Section title (EN):** `Run a business from home? We've got you.`

**Grid of categories (icons + labels, no numbers):**

```
🍰 الأكل والمشروبات       💄 البيوتي والعطور
👗 الفاشن والإكسسوارات    🛍️ البيع والتجزئة
🚗 خدمات السيارات         📚 التعليم والتدريس
🎨 الإبداع والفنون        💪 الصحة واللياقة
🐾 الحيوانات والهوايات    👶 الأطفال والعائلة
🔧 الخدمات المنزلية       💼 الكوتشز والاستشارات
🛠️ التقنية                ✨ وأكثر
```

**Caption below:** `أي مشروع منزلي بالكويت — نبني له المنظومة المناسبة.`

### Hide metrics until real

Don't display `210+ موعد شهرياً`, `0 مكالمة فائتة`, etc. until you have actual client data to support them.

---

## Change 6: "Process" Section

Keep the 5 steps as-is. They are excellent. Just verify the copy still makes sense after the pricing changes.

Update Step 3 (التوقيع والبناء) to reflect new pricing:
- Before: `تدفع رسوم البناء`
- After: `تدفع رسوم البناء (٣٤٩ د.ك) ويبدأ الاشتراك (١٥٩ د.ك / شهر)`

---

## Change 7: Meta Tags

### `<title>`
```html
<title>MindSync — منظومة ذكاء اصطناعي للمشاريع المنزلية بالكويت</title>
```

### `<meta name="description">`
```html
<meta name="description" content="منظومة AI كاملة للمشاريع المنزلية بالكويت — ترد، تحجز، تتابع، وتحلّل 24/7. سعر شامل: 349 د.ك إعداد + 159 د.ك شهرياً. أسبوع تجربة مجاني." />
```

### `<meta name="keywords">`
Update to focus on home business keywords:
```html
<meta name="keywords" content="مشاريع منزلية الكويت,أتمتة المشاريع المنزلية,AI للمشاريع الصغيرة الكويت,نظام ذكي للأعمال,واتساب بوت الكويت,حجز تلقائي,MindSync,home business automation Kuwait,AI agent Kuwait" />
```

### Open Graph

- `og:title`: `MindSync — منظومة ذكاء اصطناعي للمشاريع المنزلية بالكويت`
- `og:description`: same as meta description
- `og:locale`: `ar_KW` (keep)
- Update OG images if they reference old positioning

---

## Change 8: FAQ Section

Keep all 8 questions. Update answers to reflect new pricing and positioning.

### Question 4 update: `شنو يشمل الاشتراك الشهري؟`

**New answer:**
```
الاشتراك الشهري (159 د.ك) يشمل بالكامل:
• كل تكاليف الـ AI APIs والـ infrastructure
• 1000 محادثة شهرياً مشمولة
• مراقبة 24/7 وإصلاح أي عطل
• إعادة تدريب الـ AI شهرياً بناءً على receipts ومستجدات مشروعك
• Account manager مخصص
• تحديثات وتحسينات دورية

لو تجاوزت 1000 محادثة، الرسوم الإضافية: +30 د.ك لكل 500 محادثة إضافية.
```

### Add new question 9 (optional): `شلون تنحسب المحادثة؟`

```
المحادثة = مجموعة رسائل مع عميل واحد خلال 24 ساعة.
سواء كانت رسالة وحدة أو 50 رسالة — تنحسب كمحادثة واحدة.
هذا يطابق طريقة Meta لاحتساب رسوم WhatsApp Business API.
```

---

## Change 9: Footer

### Brand description (AR)
```
منظومة ذكاء اصطناعي وأتمتة كاملة للمشاريع المنزلية بالكويت.
```

### Brand description (EN)
```
Complete AI & automation system for home businesses in Kuwait.
```

---

## File Targets (per project structure)

Based on existing project context, the following files likely need changes:

| File | What Changes |
| ----: | ----: |
| `MindSyncWeb/src/lib/data.ts` | Replace 8 sector bundles with single `MindSync Complete` bundle. Update prices. Update categories list. |
| `MindSyncWeb/src/app/page.tsx` (or hero component) | Hero copy, eyebrow tag, CTA labels |
| `MindSyncWeb/src/components/Stats.tsx` (or similar) | Fix counter animation, use new static values |
| `MindSyncWeb/src/components/Pricing.tsx` (or similar) | Complete rebuild — single pricing card |
| `MindSyncWeb/src/components/Industries.tsx` | Replace with home business categories grid |
| `MindSyncWeb/src/components/FAQ.tsx` | Update Q4 answer, optionally add Q9 |
| `MindSyncWeb/src/app/layout.tsx` (or metadata) | Update title, description, keywords, OG tags |
| `MindSyncWeb/public/og/*.png` | Generate new OG images reflecting "home business" positioning |

### Reminders for Claude Code

1. **Don't run `npm run build` locally** — pushes to main and lets Netlify CI build (Node 25 fails locally).
2. **Update `data.ts` first** since it's the single source of truth for pricing/bundles.
3. **After data.ts changes, run** `C:\tmp\update-agent-prompts.js` to sync n8n agent prompts.
4. **Then push to main** and let Netlify deploy.

---

## Acceptance Criteria

Before considering the update complete, verify:

- [ ] New hero copy renders correctly in both Arabic (RTL) and English (LTR)
- [ ] Stats no longer show `0` — they show static values or proper animation
- [ ] Pricing section shows ONLY `MindSync Complete` (no 8 bundles)
- [ ] All references to old sector prices are removed
- [ ] Industries section shows home business categories (no fake metrics)
- [ ] FAQ Q4 reflects new pricing structure
- [ ] Meta tags updated for new positioning
- [ ] WhatsApp link still appears only in the floating button
- [ ] Primary CTA across all sections links to `/discovery`
- [ ] Add-ons (websites/apps) still show "quote-only" — no invented prices
- [ ] Brand palette compliance (green #153E2D, gold #BF8D38, ivory #FBFAF5, ink #0E1512)
- [ ] No founder personal name anywhere
- [ ] Contact email is `admin@mindsynckw.com`
- [ ] Mobile responsive + RTL still working
- [ ] Performance: LCP < 2.5s, no regression

---

## Out of Scope (Do NOT do)

- Don't redesign the visual style — keep current Gulf Premium aesthetic
- Don't add new sections beyond what's specified
- Don't change the process section structure (just minor copy update if needed)
- Don't add the WhatsApp link to any new CTA
- Don't add fake metrics or testimonials
- Don't touch the n8n workflows or admin dashboard
- Don't modify the `/discovery` route — only link to it
