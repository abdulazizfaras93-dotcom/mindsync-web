# Services + Process 3D Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Demo section with a Services overview, and upgrade the Process section with a sticky Three.js morph canvas driven by hover-interactive steps.

**Architecture:** Two new components (`Services.tsx`, `ProcessMorph.tsx`) and one modified component (`Process.tsx`). All state flows down via props — `Process.tsx` owns `activeStep` state and passes it to `ProcessMorph`. No new dependencies; uses existing `@react-three/fiber`, `framer-motion`, and `data.ts`.

**Tech Stack:** Next.js 14 App Router · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · @react-three/fiber · three@0.170

**Spec:** `docs/superpowers/specs/2026-05-02-services-process-upgrade-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/sections/Services.tsx` | Create | "What We Build" section — banner + 2×2 grid |
| `src/components/canvas/ProcessMorph.tsx` | Create | r3f canvas — morphing geometry keyed to active step |
| `src/components/sections/Process.tsx` | Modify | Add 2-col layout, activeStep state, hover interactivity, remove ProcessFlow |
| `src/app/page.tsx` | Modify | Swap `<Demo />` → `<Services />` |

---

## Task 1: Create `Services.tsx`

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1.1 — Write `Services.tsx`**

```tsx
// src/components/sections/Services.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { BUNDLES, WEBSITE_SERVICES } from '@/lib/data'

const minBuildFee = Math.min(...BUNDLES.map(b => b.buildFee))
const minSmart    = Math.min(...BUNDLES.map(b => b.tiers.find(t => t.id === 'smart')!.retainer))
const minWebsite  = (() => {
  const p = WEBSITE_SERVICES[0].price
  return Array.isArray(p) ? p[0] : p
})()

const t = {
  eyebrow: { en: 'What We Build', ar: 'ما نبنيه' },
  h2:      { en: 'Four systems. One retainer.', ar: 'أربعة أنظمة. راتب واحد.' },
  sub: {
    en: 'We design, ship, and run the operational layer your business is missing.',
    ar: 'نصمّم، نبني، وندير الطبقة التشغيلية التي يفتقدها مشروعك.',
  },
  flagship: {
    eyebrow: { en: '01 / FLAGSHIP', ar: '01 / الرائد' },
    title:   { en: 'WhatsApp AI Receptionist', ar: 'المساعد الذكي على واتساب' },
    desc: {
      en: 'Books appointments, answers FAQs, qualifies leads, and escalates real ones to your phone. Speaks fluent Kuwaiti dialect and English — handles your whole inbox, never sleeps.',
      ar: 'يحجز المواعيد، يجيب على الأسئلة، يصفّي العملاء، ويحوّل المهم منهم لهاتفك. يتكلم الكويتي والإنجليزي — يدير صندوق الرسائل كله، 24/7.',
    },
    build: { en: 'Build', ar: 'بناء' },
    run:   { en: 'Run',   ar: 'تشغيل' },
  },
  cards: [
    {
      num: '02',
      title: { en: 'Client Dashboard',       ar: 'لوحة التحكم' },
      desc: {
        en: 'See bookings, messages, and revenue at a glance. We host, secure, and maintain it.',
        ar: 'شوف حجوزاتك، رسائلك، وإيراداتك بلمحة. نحن نستضيفها ونؤمّنها.',
      },
      meta: { en: 'Included', ar: 'مشمول' },
    },
    {
      num: '03',
      title: { en: 'Workflow Automations',   ar: 'أتمتة سير العمل' },
      desc: {
        en: 'Reminders, follow-ups, review requests, no-show recovery — all triggered automatically.',
        ar: 'تذكيرات، متابعات، طلبات تقييم، واسترداد الغائبين — كلها تشتغل تلقائياً.',
      },
      meta: { en: '10+ flows from day one', ar: '+١٠ سير عمل من اليوم الأول' },
    },
    {
      num: '04',
      title: { en: 'Website & App Builds',   ar: 'المواقع والتطبيقات' },
      desc: {
        en: 'Bilingual marketing sites and apps that plug straight into your automation stack.',
        ar: 'مواقع وتطبيقات ثنائية اللغة تتكامل مباشرة مع منظومة الأتمتة.',
      },
      meta: { en: `from ${minWebsite} KWD build`, ar: `من ${minWebsite} د.ك بناءً` },
    },
    {
      num: '05',
      title: { en: 'Monthly Maintenance',    ar: 'الصيانة الشهرية' },
      desc: {
        en: 'We monitor, debug, retrain, and grow the system every month. One account manager, not a ticket queue.',
        ar: 'نراقب، نصلح، نعيد التدريب، وننمّي النظام كل شهر. مسؤول حساب واحد، لا قائمة انتظار.',
      },
      meta: { en: `from ${minSmart} KWD / mo`, ar: `من ${minSmart} د.ك / شهر` },
    },
  ] as const,
}

function fadeUp(delay = 0) {
  return {
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true as const, amount: 0.2 },
    transition:  { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

export default function Services() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const fm = (delay: number) => prefersReduced ? {} : fadeUp(delay)

  return (
    <section id="services" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div {...fm(0)} className="mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ink-900 tracking-[-0.02em] leading-[0.95] mb-4">
            {t.h2[lang]}
          </h2>
          <p className="text-ms-ink-600 text-[17px] max-w-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </motion.div>

        {/* Flagship banner */}
        <motion.div
          {...fm(0.1)}
          className="w-full bg-ms-green-900 rounded-2xl p-8 mb-4 border border-ms-green-900 hover:border-ms-gold-600 transition-colors duration-300"
        >
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 uppercase mb-3">
            {t.flagship.eyebrow[lang]}
          </p>
          <h3 className="text-ms-ivory-0 text-[28px] md:text-[34px] font-bold tracking-[-0.02em] leading-tight mb-3">
            {t.flagship.title[lang]}
          </h3>
          <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl mb-8">
            {t.flagship.desc[lang]}
          </p>
          <div className="flex flex-wrap gap-6 pt-5 border-t border-white/[0.12] font-mono text-[12px] text-white/50">
            <span>
              {t.flagship.build[lang]} · <span className="text-ms-gold-500">from {minBuildFee} KWD</span>
            </span>
            <span>
              {t.flagship.run[lang]} · <span className="text-ms-gold-500">from {minSmart} KWD / mo</span>
            </span>
          </div>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.cards.map((card, i) => (
            <motion.div
              key={card.num}
              {...fm(0.2 + i * 0.08)}
              className="bg-white border border-ms-ink-200 rounded-2xl p-7 flex flex-col hover:border-ms-green-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-ms-ink-400 uppercase mb-3">
                {card.num}
              </p>
              <h3 className="text-ms-ink-900 text-[18px] font-bold leading-snug mb-2">
                {card.title[lang]}
              </h3>
              <p className="text-ms-ink-600 text-[14px] leading-relaxed flex-1 mb-5">
                {card.desc[lang]}
              </p>
              <p className="font-mono text-[11px] tracking-[0.06em] text-ms-gold-700 border-t border-ms-ink-100 pt-4">
                {card.meta[lang]}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 1.2 — Lint check**

Run from `MindSyncWeb/`:
```bash
npx eslint src/components/sections/Services.tsx
```
Expected: no errors. If you see "Unexpected any" on `useReducedMotion`, add `// eslint-disable-next-line` above that line only.

- [ ] **Step 1.3 — Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "feat: add Services section (replaces Demo)"
```

---

## Task 2: Wire `Services` into `page.tsx`

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 2.1 — Swap the import and JSX**

In `src/app/page.tsx`, replace:
```tsx
import Demo from '@/components/sections/Demo'
```
with:
```tsx
import Services from '@/components/sections/Services'
```

Then in the JSX, replace:
```tsx
<Demo />
```
with:
```tsx
<Services />
```

- [ ] **Step 2.2 — Lint check**

```bash
npx eslint src/app/page.tsx
```
Expected: no errors.

- [ ] **Step 2.3 — Visual check**

```bash
NODE_ENV=development npm run dev
```

Open `http://localhost:3000`. Scroll past the Hero. Confirm:
- Services section appears with the dark green flagship banner + 4 white cards below
- No Demo chat widget visible
- "What We Build" / gold eyebrow visible
- Hover over cards: they lift slightly and border turns green
- Hover over flagship banner: border turns gold

- [ ] **Step 2.4 — Commit**

Stop the dev server, then:
```bash
git add src/app/page.tsx
git commit -m "feat: swap Demo → Services in page composition"
```

---

## Task 3: Create `ProcessMorph.tsx`

**Files:**
- Create: `src/components/canvas/ProcessMorph.tsx`

- [ ] **Step 3.1 — Write `ProcessMorph.tsx`**

```tsx
// src/components/canvas/ProcessMorph.tsx
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// One geometry factory per step. Called once each (useMemo) — not on every render.
const GEO_FACTORIES = [
  () => new THREE.TorusKnotGeometry(1, 0.32, 160, 32, 2, 3),   // 01 Discovery
  () => new THREE.OctahedronGeometry(1.3, 0),                   // 02 Free Trial
  () => new THREE.IcosahedronGeometry(1.2, 1),                  // 03 Sign & Build
  () => new THREE.TorusGeometry(1.2, 0.34, 24, 80),            // 04 Review
  () => new THREE.SphereGeometry(1.25, 48, 48),                 // 05 Launch
]

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Inner scene (must be inside <Canvas>) ─────────────────────────────────
function MorphScene({ activeStep }: { activeStep: number }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const haloRef  = useRef<THREE.Mesh>(null)
  const dustRef  = useRef<THREE.Points>(null)

  // All 5 geometries built once
  const geos = useMemo(() => GEO_FACTORIES.map(f => f()), [])

  // Morph animation state — tracked in refs to avoid triggering re-renders
  const morphPhase    = useRef<'idle' | 'out' | 'in'>('idle')
  const morphProgress = useRef(0)
  const targetStep    = useRef(activeStep)
  const prevStep      = useRef(activeStep)  // guards against firing morph on initial mount

  // Particle positions — built once
  const dustPos = useMemo(() => {
    const pos = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const r     = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return pos
  }, [])

  // Set initial geometry imperatively after mount (avoids r3f JSX reconciliation conflicts)
  useEffect(() => {
    if (!meshRef.current || !haloRef.current) return
    meshRef.current.geometry = geos[0]
    haloRef.current.geometry = geos[0]
  }, [geos])

  // Trigger morph only when activeStep actually changes (not on mount)
  useEffect(() => {
    if (activeStep === prevStep.current) return
    prevStep.current    = activeStep
    targetStep.current  = activeStep
    morphPhase.current  = 'out'
    morphProgress.current = 0
  }, [activeStep])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    const halo = haloRef.current
    if (!mesh || !halo) return

    // ── Morph animation ────────────────────────────────────────────────────
    if (morphPhase.current === 'out') {
      morphProgress.current = Math.min(1, morphProgress.current + delta / 0.32)
      const s = easeOut(1 - morphProgress.current)  // 1 → 0
      mesh.scale.setScalar(s)
      halo.scale.setScalar(s * 1.08)

      if (morphProgress.current >= 1) {
        // Swap geometry at scale-zero point
        mesh.geometry = geos[targetStep.current]
        halo.geometry = geos[targetStep.current]
        morphPhase.current  = 'in'
        morphProgress.current = 0
      }
    } else if (morphPhase.current === 'in') {
      morphProgress.current = Math.min(1, morphProgress.current + delta / 0.38)
      const s = easeOut(morphProgress.current)      // 0 → 1
      mesh.scale.setScalar(s)
      halo.scale.setScalar(s * 1.08)
      if (morphProgress.current >= 1) morphPhase.current = 'idle'
    }

    // ── Continuous rotation ────────────────────────────────────────────────
    mesh.rotation.x += delta * 0.4
    mesh.rotation.y += delta * 0.6
    halo.rotation.x -= delta * 0.3
    halo.rotation.y += delta * 0.4
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.05
      dustRef.current.rotation.x += delta * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight intensity={1.3} position={[3, 5, 4]} />
      <pointLight color="#BF8D38" intensity={1.6} distance={20} position={[-4, 2, 2]} />

      {/* Main solid mesh — geometry set imperatively via useEffect/useFrame */}
      <mesh ref={meshRef}>
        <meshPhysicalMaterial
          color="#1C5038"
          metalness={0.4}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
        />
      </mesh>

      {/* Wireframe halo — same geometry, 1.08× scale */}
      <mesh ref={haloRef}>
        <meshBasicMaterial color="#D4A048" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Particle dust cloud */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={dustPos}
            count={200}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#E3B867"
          size={0.025}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  )
}

// ─── Exported wrapper (guards reduced-motion + wraps Canvas) ───────────────
export default function ProcessMorph({ activeStep }: { activeStep: number }) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <MorphScene activeStep={activeStep} />
    </Canvas>
  )
}
```

- [ ] **Step 3.2 — Lint check**

```bash
npx eslint src/components/canvas/ProcessMorph.tsx
```
Expected: no errors. If you see a type error on `<bufferAttribute array={dustPos}>`, add `// @ts-expect-error r3f bufferAttribute typing` above that line.

- [ ] **Step 3.3 — Commit**

```bash
git add src/components/canvas/ProcessMorph.tsx
git commit -m "feat: add ProcessMorph r3f canvas (5-step morph geometry)"
```

---

## Task 4: Upgrade `Process.tsx`

**Files:**
- Modify: `src/components/sections/Process.tsx`

- [ ] **Step 4.1 — Replace `Process.tsx` entirely**

The existing file is 205 lines. Replace it in full with the version below, which:
- Adds `useState<number>(0)` for `activeStep`
- Imports `ProcessMorph` dynamically
- Removes the `ProcessFlow` import and usage
- Restructures layout to 2-col grid (sticky canvas left, steps right)
- Adds `onMouseEnter` + active-state styles to steps

```tsx
// src/components/sections/Process.tsx
'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const ProcessMorph = dynamic(() => import('@/components/canvas/ProcessMorph'), { ssr: false })

const t = {
  eyebrow:    { en: 'How It Works',                          ar: 'كيف يشتغل النظام' },
  headline:   { en: 'From first message to live system.',    ar: 'من أول رسالة لنظام شغّال.' },
  sub: {
    en: 'A clear process, a real timeline, and a free trial so you can see it work before you pay.',
    ar: 'خطوات واضحة، مواعيد حقيقية، وأسبوع تجربة مجانية تشوف فيه النظام يشتغل قبل ما تدفع.',
  },
  trialBadge: { en: 'Free', ar: 'مجانية' },
  footnote: {
    en: "We don't start building until tasks and channels are agreed in the discovery call.",
    ar: 'لا نبدأ بناء النظام إلا بعد الاتفاق على المهام والقنوات في مكالمة الاستكشاف.',
  },
}

const STEPS = [
  {
    num: '01',
    en: {
      title: 'Discovery Call',
      sub:   'Understanding your business',
      desc:  "We map your daily tasks, channels, pain points, and goals. You leave the call with a clear picture of exactly what we'll build.",
    },
    ar: {
      title: 'مكالمة الاستكشاف',
      sub:   'نفهم طبيعة مشروعك',
      desc:  'نحدد مهامك اليومية، قنواتك، مشاكلك، وأهدافك. تخرج من المكالمة بصورة واضحة لكل شي سنبنيه.',
    },
    trial: false,
  },
  {
    num: '02',
    en: {
      title: 'Free 1-Week Trial',
      sub:   'Try before you pay',
      desc:  'We build your actual AI system based on your real business data and run it live for 7 days. If you love it, we activate. If not — no charge, no questions.',
    },
    ar: {
      title: 'أسبوع تجربة مجانية',
      sub:   'جرّب قبل ما تدفع',
      desc:  'نبني نظامك الذكي الفعلي بناءً على بيانات مشروعك الحقيقية ونشغّله أسبوع كامل. إذا عجبك نفعّله — وإذا لا، ما في أي تكلفة.',
    },
    trial: true,
  },
  {
    num: '03',
    en: {
      title: 'Sign & Build',
      sub:   'Contract + full build',
      desc:  'After the trial, you sign the agreement and pay the build fee. We finalize all integrations, agents, channels, and your client portal — tailored exactly to your needs.',
    },
    ar: {
      title: 'التوقيع والبناء',
      sub:   'عقد + بناء كامل',
      desc:  'بعد التجربة، توقّع الاتفاقية وتدفع رسوم البناء. نكمّل كل التكاملات، الوكلاء، القنوات، ولوحة التحكم — مخصصة بالكامل لك.',
    },
    trial: false,
  },
  {
    num: '04',
    en: {
      title: 'Review & Fine-Tune',
      sub:   'Live rehearsal',
      desc:  'You send 10 real customer messages. We tune every response until it matches your tone, your answers, and your brand — perfectly.',
    },
    ar: {
      title: 'المراجعة والضبط',
      sub:   'تجربة حية',
      desc:  'ترسل ١٠ رسائل عملاء حقيقية. نضبط كل رد حتى يتطابق مع أسلوبك وإجاباتك وعلامتك التجارية — بشكل مثالي.',
    },
    trial: false,
  },
  {
    num: '05',
    en: {
      title: 'Launch + Monthly Care',
      sub:   'Go live — we stay with you',
      desc:  'Your system goes live on all chosen channels. You get full portal access. We monitor, update, and maintain everything monthly — you focus on your business.',
    },
    ar: {
      title: 'الإطلاق والصيانة الشهرية',
      sub:   'تشغيل — ونبقى معاك',
      desc:  'نظامك يشتغل على كل القنوات المختارة. تحصل على لوحة التحكم كاملة. نراقب ونحدّث ونصون كل شي شهرياً — وأنت تركّز على مشروعك.',
    },
    trial: false,
  },
]

export default function Process() {
  const { lang } = useLang()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-4"
          >
            {t.headline[lang]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-white/50 text-[16px] max-w-lg leading-relaxed"
          >
            {t.sub[lang]}
          </motion.p>
        </div>

        {/* 2-col grid: sticky canvas left, steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: sticky 3D canvas */}
          <div
            className="lg:sticky lg:top-[100px] aspect-square rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(191,141,56,0.08), transparent 65%), #0A1F17',
            }}
            aria-hidden
          >
            <ProcessMorph activeStep={activeStep} />
          </div>

          {/* Right: interactive step list */}
          <div className="divide-y divide-white/10">
            {STEPS.map((step, i) => {
              const s = lang === 'ar' ? step.ar : step.en
              const isActive = activeStep === i
              return (
                <div
                  key={i}
                  className={`relative py-8 cursor-pointer border-l-[3px] pl-5 transition-all duration-200 ${
                    isActive ? 'border-ms-gold-600' : 'border-transparent'
                  }`}
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <div className="flex gap-6 items-start">
                    {/* Step number */}
                    <span
                      className={`font-mono text-[36px] font-bold leading-none tabular-nums shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-ms-gold-600/50' : 'text-ms-gold-600/20'
                      }`}
                    >
                      {step.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Title + badge */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-bold text-[18px] transition-colors duration-200 ${
                            isActive ? 'text-ms-ivory-0' : 'text-white/55'
                          }`}
                        >
                          {s.title}
                        </h3>
                        {step.trial && (
                          <span className="inline-block text-[9px] font-mono tracking-[0.15em] uppercase bg-ms-gold-600 text-ms-green-900 px-2 py-0.5 rounded-full font-bold shrink-0">
                            {t.trialBadge[lang]}
                          </span>
                        )}
                      </div>

                      {/* Sub-label */}
                      <p className="text-ms-gold-600 text-[11px] font-mono tracking-widest uppercase mb-2">
                        {s.sub}
                      </p>

                      {/* Description — expands on active */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-white/50 text-[14px] leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/25 text-[13px] mt-8 border-t border-white/10 pt-6"
        >
          {t.footnote[lang]}
        </motion.p>

      </div>
    </section>
  )
}
```

- [ ] **Step 4.2 — Lint check**

```bash
npx eslint src/components/sections/Process.tsx
```
Expected: no errors.

- [ ] **Step 4.3 — Visual check**

```bash
NODE_ENV=development npm run dev
```

Open `http://localhost:3000` and scroll to the Process section. Confirm:
- Two-column layout appears on desktop (canvas left, steps right)
- Step 1 is active by default: title is bright ivory, description is visible, gold left-border accent present
- Hovering step 2 → canvas morphs from TorusKnot (blurs to zero scale) → Octahedron (grows in)
- Hovering step 3 → morphs to Icosahedron, etc.
- Mobile (<768px): canvas stacks above the step list
- Free Trial gold badge appears on step 02
- AR lang toggle: step text and badge switch correctly, RTL layout holds

- [ ] **Step 4.4 — Commit**

Stop dev server, then:
```bash
git add src/components/sections/Process.tsx
git commit -m "feat: upgrade Process section with sticky 3D morph canvas"
```

---

## Task 5: Final cleanup check

- [ ] **Step 5.1 — Lint the full changed surface**

```bash
npx eslint src/app/page.tsx src/components/sections/Services.tsx src/components/sections/Process.tsx src/components/canvas/ProcessMorph.tsx
```
Expected: no errors across all four files.

- [ ] **Step 5.2 — Confirm `Demo.tsx` is untouched**

```bash
git status
```
Expected: working tree clean. `src/components/sections/Demo.tsx`, `src/components/ui/DemoChat.tsx`, and `src/components/ui/PortalPreview.tsx` should show no changes — they are left in place.

- [ ] **Step 5.3 — Push to trigger Netlify build**

```bash
git log --oneline -5
```
Confirm the four commits from Tasks 1–4 are present, then:
```bash
git push origin main
```
Netlify auto-builds on push (Node 20). Do NOT run `npm run build` locally — it fails on Node 25. Monitor the Netlify dashboard for build success.
