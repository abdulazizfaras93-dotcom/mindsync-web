'use client'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useLang } from '@/lib/lang'

const RESULTS = [
  {
    icon: '🦷',
    industry: { en: 'Dental Clinic', ar: 'عيادة أسنان' },
    metrics: [
      { value: '210+', label: { en: 'Appts / mo',          ar: 'موعد شهرياً' } },
      { value: '0',    label: { en: 'Missed calls',         ar: 'مكالمة فائتة' } },
      { value: '4h',   label: { en: 'Saved / day',          ar: 'توفير يومياً' } },
    ],
  },
  {
    icon: '💇',
    industry: { en: 'Beauty Salon', ar: 'صالون تجميل' },
    metrics: [
      { value: '+35%', label: { en: 'Bookings increase',    ar: 'زيادة الحجوزات' } },
      { value: '320',  label: { en: 'Bookings / mo',        ar: 'حجز شهرياً' } },
      { value: '6h',   label: { en: 'Saved / day',          ar: 'توفير يومياً' } },
    ],
  },
  {
    icon: '🏋️',
    industry: { en: 'Gym', ar: 'صالة رياضية' },
    metrics: [
      { value: '89%',  label: { en: 'Class fill rate',      ar: 'امتلاء الكلاسات' } },
      { value: '1.4k', label: { en: 'Reminders / mo',       ar: 'تذكير شهرياً' } },
      { value: '3h',   label: { en: 'Saved / day',          ar: 'توفير يومياً' } },
    ],
  },
  {
    icon: '🔧',
    industry: { en: 'Auto Garage', ar: 'ورشة سيارات' },
    metrics: [
      { value: '+47%', label: { en: 'Faster estimates',     ar: 'تسريع التسعير' } },
      { value: '0',    label: { en: 'Leads missed',         ar: 'عميل فائت' } },
      { value: '5h',   label: { en: 'Saved / day',          ar: 'توفير يومياً' } },
    ],
  },
  {
    icon: '🍽️',
    industry: { en: 'Restaurant', ar: 'مطعم' },
    metrics: [
      { value: '94%',  label: { en: 'Table fill rate',      ar: 'امتلاء الطاولات' } },
      { value: '280',  label: { en: 'Reservations / mo',    ar: 'حجز شهرياً' } },
      { value: '-60%', label: { en: 'No-shows',             ar: 'غياب الحجوزات' } },
    ],
  },
  {
    icon: '🏠',
    industry: { en: 'Real Estate', ar: 'عقارات' },
    metrics: [
      { value: '340',  label: { en: 'Leads qualified / mo', ar: 'عميل مؤهَّل' } },
      { value: '18m',  label: { en: 'Avg response time',    ar: 'متوسط الرد' } },
      { value: '12h',  label: { en: 'Saved / week',         ar: 'توفير أسبوعياً' } },
    ],
  },
]

function ParallaxCard({ r, i }: { r: typeof RESULTS[0]; i: number }) {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const yRaw = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -(20 + i * 12)])
  const y = useSpring(yRaw, { stiffness: 80, damping: 20 })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: prefersReduced ? 0 : i * 0.07, duration: 0.35 }}
      style={{ y }}
      className="relative group transition-all duration-300"
    >
      <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl shadow-[4px_4px_0px_0px] shadow-ms-ink-900 transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />
      <div className="relative p-5 h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl leading-none">{r.icon}</span>
          <h3 className="font-grotesk font-semibold text-ms-ink-900 text-sm">{r.industry[lang]}</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-ms-ivory-200">
          {r.metrics.map((m) => (
            <div key={m.label.en} className="text-center">
              <p className="font-mono font-bold text-ms-green-800 text-lg leading-none">{m.value}</p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-ms-ink-400 mt-1 leading-tight">{m.label[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function IndustryResults() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <section className="bg-ms-ivory-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'نتائج حقيقية' : 'Real Results'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ink-900">
            {isAr ? 'ماذا تحقق كل صناعة' : 'Results by Industry'}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESULTS.map((r, i) => (
            <ParallaxCard key={r.industry.en} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
