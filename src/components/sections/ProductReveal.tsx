'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion'
import { useLang } from '@/lib/lang'

// ─── Aurora background blobs (inline — avoids AuroraPlate child-wrapper z issue) ──

function AuroraBlobs() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(28,80,56,0.85) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -28, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(191,141,56,0.18) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      />
    </>
  )
}

// ─── Panel 1: WhatsApp phone mockup ─────────────────────────────────────────

function PhonePanel() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ width: 208, height: 384, background: '#111b21' }}
      >
        {/* WA-style green header */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ background: '#153E2D' }}
        >
          <div className="w-8 h-8 rounded-full bg-ms-gold-600 flex items-center justify-center shrink-0">
            <span className="font-mono text-[9px] font-bold text-ms-green-900">
              MS
            </span>
          </div>
          <div>
            <p className="font-grotesk text-[11px] font-semibold text-ms-ivory-0 leading-none">
              MindSync AI
            </p>
            <p className="font-mono text-[9px] text-ms-ivory-0/60 mt-0.5 leading-none">
              online
            </p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 px-3 py-3 gap-2 overflow-hidden">
          {/* User message — right-aligned */}
          <motion.div
            className="self-end max-w-[78%]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div
              className="rounded-2xl rounded-br-sm px-3 py-2"
              style={{ background: '#005c4b' }}
            >
              <p
                className="font-arabic text-[11px] text-ms-ivory-0 leading-snug text-right"
                dir="rtl"
              >
                كم انتظر لحجز موعد؟
              </p>
            </div>
            <p className="font-mono text-[8px] text-ms-ivory-0/40 text-right mt-0.5">
              10:42
            </p>
          </motion.div>

          {/* Bot reply — left-aligned */}
          <motion.div
            className="self-start max-w-[82%]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <div
              className="rounded-2xl rounded-bl-sm px-3 py-2"
              style={{ background: '#202c33' }}
            >
              <p
                className="font-arabic text-[11px] text-ms-ivory-0 leading-snug text-right"
                dir="rtl"
              >
                أهلاً! عندنا مواعيد متاحة اليوم 🗓️
              </p>
            </div>
            <p className="font-mono text-[8px] text-ms-ivory-0/40 mt-0.5">
              10:42 ✓✓
            </p>
          </motion.div>

          {/* Typing indicator */}
          <motion.div
            className="self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          >
            <div
              className="rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center"
              style={{ background: '#202c33' }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#BF8D38' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Panel 2: n8n flow diagram ───────────────────────────────────────────────

interface FlowBoxProps {
  label: string
  color: 'green' | 'gold'
  delay: number
}

function FlowBox({ label, color, delay }: FlowBoxProps) {
  const bg = color === 'green' ? '#153E2D' : '#BF8D38'
  const border =
    color === 'green' ? 'rgba(28,80,56,0.8)' : 'rgba(191,141,56,0.6)'
  const textColor = color === 'green' ? '#FBFAF5' : '#0F2E22'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="flex items-center justify-center rounded-xl px-4 py-3 shrink-0"
      style={{ background: bg, border: `1.5px solid ${border}`, minWidth: 110 }}
    >
      <span
        className="font-mono text-[10px] font-semibold text-center leading-tight whitespace-pre-line"
        style={{ color: textColor }}
      >
        {label}
      </span>
    </motion.div>
  )
}

function FlowArrow({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center mx-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
        <defs>
          <marker
            id="pr-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#BF8D38" />
          </marker>
        </defs>
        <line
          x1="2"
          y1="8"
          x2="26"
          y2="8"
          stroke="#BF8D38"
          strokeWidth="1.5"
          markerEnd="url(#pr-arrow)"
        />
      </svg>
    </motion.div>
  )
}

function FlowPanel({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex flex-col items-center gap-6 w-full h-full justify-center">
      <motion.p
        className="font-mono text-[9px] uppercase tracking-widest text-ms-gold-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {isAr ? 'أتمتة n8n' : 'n8n Automation'}
      </motion.p>

      <div className="flex items-center flex-wrap justify-center gap-y-3">
        <FlowBox
          label={isAr ? 'واتساب\nTrigger' : 'WhatsApp\nTrigger'}
          color="green"
          delay={0.2}
        />
        <FlowArrow delay={0.5} />
        <FlowBox
          label={'AI Agent\n(Claude)'}
          color="gold"
          delay={0.6}
        />
        <FlowArrow delay={0.9} />
        <FlowBox
          label={isAr ? 'حجز\nموعد' : 'Book\nAppointment'}
          color="green"
          delay={1.0}
        />
      </div>

      <motion.div
        className="w-64 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #BF8D38 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      />

      <motion.p
        className="font-mono text-[9px] text-ms-ivory-0/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        {isAr ? 'يعالج تلقائياً في ثوانٍ' : 'processed automatically in seconds'}
      </motion.p>
    </div>
  )
}

// ─── Panel 3: Admin KPI dashboard card ──────────────────────────────────────

function DashboardPanel({ isAr }: { isAr: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="rounded-2xl border border-ms-green-700/40 shadow-2xl overflow-hidden"
        style={{ width: 280, background: '#FBFAF5' }}
      >
        {/* Top bar */}
        <div className="px-4 py-3 border-b border-ms-green-800/10 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-ms-green-800" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-ms-green-800">
            {isAr ? 'لوحة تحكم MindSync' : 'MindSync Dashboard'}
          </span>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {/* Main KPI */}
          <div className="col-span-2 rounded-xl p-4" style={{ background: '#153E2D' }}>
            <p className="font-mono text-[9px] uppercase tracking-widest text-ms-ivory-0/60 mb-2">
              {isAr ? 'المحادثات اليوم' : 'CONVOS TODAY'}
            </p>
            <div className="flex items-end gap-2">
              <motion.span
                className="font-grotesk text-4xl font-bold text-ms-ivory-0 leading-none"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                24
              </motion.span>
              <motion.span
                className="font-mono text-sm font-semibold mb-1 px-1.5 py-0.5 rounded"
                style={{ color: '#0F2E22', background: '#BF8D38' }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 1, 1, 0.7, 1] }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  times: [0, 0.2, 0.5, 0.7, 1],
                }}
              >
                +1
              </motion.span>
            </div>
            {/* Gold flash bar */}
            <motion.div
              className="mt-2 h-0.5 rounded-full origin-left"
              style={{ background: '#BF8D38' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{
                delay: 0.9,
                duration: 1.4,
                times: [0, 0.3, 0.8, 1],
              }}
            />
          </div>

          {/* Active clients */}
          <div className="rounded-xl p-3 border border-ms-green-800/10">
            <p className="font-mono text-[8px] uppercase tracking-widest text-ms-ink-600 mb-1 leading-tight">
              {isAr ? 'عملاء\nنشطون' : 'ACTIVE\nCLIENTS'}
            </p>
            <p className="font-grotesk text-2xl font-bold text-ms-green-800">7</p>
          </div>

          {/* Agents online */}
          <div className="rounded-xl p-3 border border-ms-green-800/10">
            <p className="font-mono text-[8px] uppercase tracking-widest text-ms-ink-600 mb-1 leading-tight">
              {isAr ? 'وكلاء\nنشطون' : 'AGENTS\nONLINE'}
            </p>
            <p className="font-grotesk text-2xl font-bold text-ms-green-800">3</p>
          </div>
        </div>

        {/* Activity row */}
        <div className="px-4 pb-4">
          <motion.div
            className="rounded-lg px-3 py-2 flex items-center gap-2"
            style={{ background: 'rgba(21,62,45,0.06)' }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: '#BF8D38' }}
            />
            <span className="font-mono text-[9px] text-ms-ink-600">
              {isAr
                ? 'حجز جديد — عيادة الدكتور أحمد'
                : 'New booking — Dr Ahmad Clinic'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Progress dots — reads scroll MotionValue reactively ────────────────────

function ProgressDots({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', v => {
    if (v < 0.35) setActiveIndex(0)
    else if (v < 0.67) setActiveIndex(1)
    else setActiveIndex(2)
  })

  return (
    <div className="flex gap-2">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i === activeIndex ? 20 : 6,
            height: 6,
            background:
              i === activeIndex
                ? '#BF8D38'
                : 'rgba(251,250,245,0.25)',
          }}
        />
      ))}
    </div>
  )
}

// ─── Static fallback for prefers-reduced-motion ──────────────────────────────

function StaticStack({ isAr }: { isAr: boolean }) {
  const cards = [
    {
      step: '01',
      label: isAr ? 'واتساب' : 'WhatsApp',
      body: isAr
        ? 'يرسل العميل رسالة ويحصل على رد فوري من الوكيل الذكي.'
        : 'Client sends a message and gets an instant reply from the AI agent.',
    },
    {
      step: '02',
      label: 'n8n + Claude',
      body: isAr
        ? 'يعالج n8n الطلب ويرسله إلى Claude لفهم النية وتنفيذ الإجراء.'
        : 'n8n processes the request and routes it through Claude to understand intent and act.',
    },
    {
      step: '03',
      label: isAr ? 'لوحة التحكم' : 'Dashboard',
      body: isAr
        ? 'يظهر الحجز فوراً في لوحة تحكم MindSync الإدارية.'
        : 'The booking lands instantly in your MindSync admin dashboard.',
    },
  ]

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto px-6">
      {cards.map(c => (
        <div
          key={c.step}
          className="rounded-2xl border border-ms-green-700/40 bg-ms-green-800 p-6"
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-ms-gold-600 mb-2">
            {c.step} — {c.label}
          </p>
          <p className="font-grotesk text-ms-ivory-0 text-sm leading-relaxed">
            {c.body}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProductReveal() {
  const { isAr } = useLang()
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Panel opacities
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0])
  const panel2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.4, 0.65],
    [0, 1, 0]
  )
  const panel3Opacity = useTransform(scrollYProgress, [0.55, 0.7, 1], [0, 1, 1])

  // Panel vertical drift
  const panel1Y = useTransform(scrollYProgress, [0, 0.4], ['0%', '-8%'])
  const panel2Y = useTransform(scrollYProgress, [0.25, 0.65], ['8%', '0%'])
  const panel3Y = useTransform(scrollYProgress, [0.55, 1], ['8%', '0%'])

  if (prefersReduced) {
    return (
      <section className="bg-ms-green-900 py-24">
        <div className="text-center mb-12 px-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'شاهد البيانات وهي تتدفق' : 'Watch the Data Move'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ivory-0">
            {isAr ? 'من واتساب إلى لوحة التحكم' : 'WhatsApp → n8n → Dashboard'}
          </h2>
        </div>
        <StaticStack isAr={isAr} />
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-ms-green-900"
      style={{ minHeight: '250vh' }}
    >
      {/* ── Sticky viewport ──────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Aurora background blobs */}
        <AuroraBlobs />

        {/* Section header */}
        <div className="text-center mb-12 relative z-10 px-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'شاهد البيانات وهي تتدفق' : 'Watch the Data Move'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ivory-0">
            {isAr
              ? 'من واتساب إلى لوحة التحكم'
              : 'WhatsApp → n8n → Dashboard'}
          </h2>
        </div>

        {/* Panel stack */}
        <div
          className="relative w-full max-w-2xl mx-auto px-6 z-10"
          style={{ height: 420 }}
        >
          {/* Panel 1 — WhatsApp */}
          <motion.div
            style={{ opacity: panel1Opacity, y: panel1Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <PhonePanel />
          </motion.div>

          {/* Panel 2 — n8n flow */}
          <motion.div
            style={{ opacity: panel2Opacity, y: panel2Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FlowPanel isAr={isAr} />
          </motion.div>

          {/* Panel 3 — Dashboard */}
          <motion.div
            style={{ opacity: panel3Opacity, y: panel3Y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <DashboardPanel isAr={isAr} />
          </motion.div>
        </div>

        {/* Scroll progress dots */}
        <div className="relative z-10 mt-8">
          <ProgressDots scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  )
}
