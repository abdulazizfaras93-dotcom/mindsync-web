# Services + Process 3D Upgrade — Design Spec
**Date:** 2026-05-02  
**Project:** MindSyncWeb (Next.js 14 landing page)  
**Source:** Cherry-picked from `landing-page-for-mindsync` design prototype

---

## Summary

Two changes to the live landing page at `https://www.mindsynckw.com`:

1. **Replace Demo section** with a new **Services section** — a "what we build" overview with prices, placed in the same position in the page.
2. **Upgrade Process section** — keep all existing step content but add a sticky 3D morphing canvas (left column) and hover-interactive step expansion (right column).

---

## Architecture

| Action | File |
|---|---|
| **New** | `src/components/sections/Services.tsx` |
| **New** | `src/components/canvas/ProcessMorph.tsx` |
| **Modified** | `src/components/sections/Process.tsx` |
| **Modified** | `src/app/page.tsx` — swap `<Demo />` → `<Services />` |
| **Untouched** | `Demo.tsx`, `DemoChat.tsx`, `PortalPreview.tsx` — left in place, removed from page only |

No new dependencies. Uses existing: `@react-three/fiber`, `@react-three/drei`, `three@0.170`, `framer-motion`, `next/dynamic`.

---

## 1. Services Section (`Services.tsx`)

### Position in page
Replaces `<Demo />` — same slot, immediately after `<Hero />`.

### Section header
- Eyebrow: `"What We Build"` / `"ما نبنيه"`
- H2: `"Four systems. One retainer."` / `"أربعة أنظمة. راتب واحد."`
- Sub: `"We design, ship, and run the operational layer your business is missing."` / `"نصمّم، نبني، وندير الطبقة التشغيلية التي يفتقدها مشروعك."`
- Framer Motion: `fadeUp`, `once: true`

### Layout

**Banner card — WhatsApp AI Receptionist (full width)**
- Background: `bg-ms-green-900`
- Eyebrow mono label: `01 / FLAGSHIP`
- Headline: `"WhatsApp AI Receptionist"` / `"المساعد الذكي على واتساب"`
- Description: `"Books appointments, answers FAQs, qualifies leads, and escalates real ones to your phone. Speaks fluent Kuwaiti dialect and English — handles your whole inbox, never sleeps."` / `"يحجز المواعيد، يجيب على الأسئلة، يصفّي العملاء، ويحوّل المهم منهم لهاتفك. يتكلم الكويتي والإنجليزي — يدير صندوق الرسائل كله، 24/7."`
- Price row (bottom, separated by border): `Build · from 250 KWD` · `Run · from 130 KWD / mo`  
  *(minimums from `data.ts`: Home Business build fee = 250, Smart tier min = 130)*
- Hover: `border-ms-gold-600` border highlight

**2×2 grid cards (white)**

| # | EN title | AR title | EN desc | AR desc | Price/note |
|---|---|---|---|---|---|
| 02 | Client Dashboard | لوحة التحكم | See bookings, messages, and revenue at a glance. We host, secure, and maintain it. | شوف حجوزاتك، رسائلك، وإيراداتك بلمحة. نحن نستضيفها ونؤمّنها. | Included |
| 03 | Workflow Automations | أتمتة سير العمل | Reminders, follow-ups, review requests, no-show recovery — all triggered automatically. | تذكيرات، متابعات، طلبات تقييم، واسترداد الغائبين — كلها تشتغل تلقائياً. | 10+ flows from day one |
| 04 | Website & App Builds | المواقع والتطبيقات | Bilingual marketing sites and apps that plug straight into your automation stack. | مواقع وتطبيقات ثنائية اللغة تتكامل مباشرة مع منظومة الأتمتة. | from 300 KWD build |
| 05 | Monthly Maintenance | الصيانة الشهرية | We monitor, debug, retrain, and grow the system every month. One account manager, not a ticket queue. | نراقب، نصلح، نعيد التدريب، وننمّي النظام كل شهر. مسؤول حساب واحد، لا قائمة انتظار. | from 130 KWD / mo |

Each white card: `bg-ms-white`, `border-ms-ink-200`, `border-radius: 14px`, mono eyebrow number, title, 1-line description, price/meta row at bottom separated by a hairline border.

Hover: `translateY(-2px)`, `border-ms-green-800`, `shadow-md`.

### Pricing source
All prices read from `data.ts` constants — never hardcoded in component. Use:
- `BUNDLES` min build fee (250) and min Smart tier (130) for the banner
- `WEBSITE_SERVICES[0].price` (300) for card 04
- `BUNDLES` min Smart tier (130) for card 05 maintenance

### Animations
- Section header: single `fadeUp`, `once: true`
- Banner card: `fadeUp`, delay 0.1s
- 2×2 grid: staggered `fadeUp`, 0.08s per card, starting at delay 0.2s
- All use `useReducedMotion()` guard — zero transforms when reduced motion preferred

### Bilingual / RTL
- `useLang()` hook for all strings
- All strings defined inline as `{ en: '...', ar: '...' }` objects (same pattern as existing sections)
- Price labels in mono font regardless of language

---

## 2. Process Section Upgrade (`Process.tsx` + new `ProcessMorph.tsx`)

### What stays the same
- All 5 step texts (EN + AR)
- Section background `bg-ms-green-900`
- Section header (eyebrow, H2, sub)
- Free Trial gold badge on step 02
- Footer footnote line
- Framer Motion entrance animations on header

### What changes
- Layout switches from single-column vertical list to **two-column grid**
- Thin `ProcessFlow` horizontal strip is **removed**
- Interactive hover behaviour added to steps
- New `ProcessMorph` canvas added as left column

### Layout

```
[ sticky canvas (left, 1fr) ] [ step list (right, 1fr) ]
```

- Canvas: `position: sticky; top: 100px`, square aspect ratio, `border-radius: 16px`, `bg-ms-green-950` with radial gold glow
- Mobile (`< 768px`): canvas sits above steps, not sticky, full width

### New canvas — `ProcessMorph.tsx`

**Tech:** `@react-three/fiber` + `useFrame`, loaded via `dynamic({ ssr: false })`. Matches the pattern of `BrainBackground.tsx` and `KuwaitParticles.tsx`.

**Geometry per step:**

| Step | Geometry | r3f constructor |
|---|---|---|
| 01 Discovery | TorusKnot | `<torusKnotGeometry args={[1, 0.32, 160, 32, 2, 3]}` |
| 02 Free Trial | Octahedron | `<octahedronGeometry args={[1.3, 0]}` |
| 03 Sign & Build | Icosahedron | `<icosahedronGeometry args={[1.2, 1]}` |
| 04 Review | Torus | `<torusGeometry args={[1.2, 0.34, 24, 80]}` |
| 05 Launch | Sphere | `<sphereGeometry args={[1.25, 48, 48]}` |

**Materials:**
- Main mesh: `MeshPhysicalMaterial`, color `#1C5038` (green-700), metalness 0.4, roughness 0.3, clearcoat 0.5
- Wireframe halo: same geometry scaled ×1.08, `MeshBasicMaterial`, color `#D4A048` (gold-500), wireframe, opacity 0.3
- Particle dust: 200 points, `PointsMaterial`, color `#E3B867` (gold-400), size 0.025, opacity 0.6

**Lights:**
- `AmbientLight` intensity 0.4
- `DirectionalLight` white, intensity 1.3, position `[3, 5, 4]`
- `PointLight` gold `#BF8D38`, intensity 1.6, distance 20, position `[-4, 2, 2]`

**Morph animation (step change):**
1. Scale current mesh out to 0 over 320ms (cubic ease-out)
2. Swap geometry ref to new step's geometry
3. Scale new mesh in from 0 to 1 over 380ms (cubic ease-out)

`activeStep` prop (number 0–4) passed from `Process.tsx` via `useState`. `ProcessMorph` watches it via `useEffect` to trigger the morph animation sequence.

**Continuous rotation:** mesh rotates on x/y axes via `useFrame`; halo counter-rotates; dust rotates slowly.

### Step interactivity (in `Process.tsx`)

- `useState<number>(0)` → `activeStep`, initialised to 0
- `onMouseEnter` on each step row sets `activeStep`
- Active step row:
  - Gold left border accent (`3px solid ms-gold-600`)
  - Step title: `text-ms-ivory-0` (was `text-white/55`)
  - Description: `max-height` transitions from `0` to `200px` (CSS transition, 320ms ease-out)
- Inactive steps: title muted `text-white/55`, description collapsed
- `activeStep` passed as prop to `<ProcessMorph activeStep={activeStep} />`

---

## Out of scope

- No changes to Navbar, Hero, WhyNotBot, Bundles, ROICalculator, ReceptionistChat, BuiltOn, TrustCluster, FAQ, CTA, Footer
- No changes to `data.ts` pricing
- No new pages or routes
- No changes to n8n workflows
- `Demo.tsx`, `DemoChat.tsx`, `PortalPreview.tsx` left in place (not deleted)
