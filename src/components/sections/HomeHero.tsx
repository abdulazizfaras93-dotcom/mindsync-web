'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { MINDSYNC_COMPLETE } from '@/lib/data'

const t = {
  eyebrow: { ar: 'منظومة ذكاء اصطناعي وأتمتة · الكويت', en: 'AI & Automation System · Kuwait' },
  h1a:     { ar: 'نظام ذكاء اصطناعي كامل',              en: 'A complete AI system' },
  h1b:     { ar: 'لمشروعك المنزلي.',                    en: 'for your home business.' },
  sub:     { ar: 'يرد، يحجز، يتابع، ويحلل ٢٤/٧ — كأن عندك فريق كامل، بدون فريق.', en: 'It replies, books, follows up, and analyzes 24/7 — like a full team, without one.' },
  cta1:    { ar: 'ابدأ تجربتك المجانية', en: 'Start your free trial' },
  cta2:    { ar: 'جرّب الحين',            en: 'Try it live' },
  setup:   { ar: 'إعداد',                en: 'setup' },
  mo:      { ar: 'شهرياً',               en: '/mo' },
  trial:   { ar: 'أسبوع تجربة مجاني',     en: '7-day free trial' },
}

const STATS = [
  { v: '7',    l: { ar: 'أيام للإطلاق',  en: 'Days to launch' } },
  { v: '1',    l: { ar: 'منظومة شاملة',  en: 'Complete system' } },
  { v: '24/7', l: { ar: 'وقت التشغيل',   en: 'Uptime' } },
  { v: '100%', l: { ar: 'البيانات لك',   en: 'Data ownership' } },
]

export default function HomeHero() {
  const { lang } = useLang()
  const ar = lang === 'ar'
  const font = ar ? 'font-arabic' : 'font-grotesk'

  return (
    <section className="bg-ms-ivory-0 pt-28 pb-16 px-6 lg:px-10" dir={ar ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-3 mb-6 ${ar ? 'flex-row-reverse justify-end' : ''}`}
        >
          <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium font-mono">{t.eyebrow[lang]}</p>
        </motion.div>

        <h1 className={`text-[42px] md:text-[64px] font-bold tracking-tight leading-[0.95] text-ms-ink-900 mb-6 ${font}`}>
          <span className="block">{t.h1a[lang]}</span>
          <span className="block text-ms-green-800">{t.h1b[lang]}</span>
        </h1>

        <p className={`text-ms-ink-700 text-[17px] leading-relaxed max-w-[540px] mb-8 ${font}`}>{t.sub[lang]}</p>

        <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 ${ar ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="text-ms-ink-900 font-bold text-[20px] font-mono">
            {MINDSYNC_COMPLETE.buildFee} <span className="text-ms-ink-500 text-[13px] font-sans">KWD {t.setup[lang]}</span>
          </span>
          <span className="text-ms-ink-300">·</span>
          <span className="text-ms-ink-900 font-bold text-[20px] font-mono">
            {MINDSYNC_COMPLETE.retainer} <span className="text-ms-ink-500 text-[13px] font-sans">KWD{t.mo[lang]}</span>
          </span>
          <span className="text-ms-ink-300">·</span>
          <span className={`text-ms-green-800 font-medium text-[14px] ${font}`}>{t.trial[lang]}</span>
        </div>

        <div className={`flex flex-wrap gap-3 mb-14 ${ar ? 'flex-row-reverse justify-end' : ''}`}>
          <a
            href="/discovery"
            className={`bg-ms-gold-600 text-ms-green-900 font-bold text-[14px] px-7 py-3.5 rounded-lg hover:bg-ms-gold-400 transition-all duration-200 active:scale-[0.98] ${font}`}
          >
            {t.cta1[lang]}
          </a>
          <a
            href="#try"
            className={`text-ms-ink-900 font-medium text-[14px] px-7 py-3.5 rounded-lg border border-ms-ink-900/15 hover:border-ms-ink-900/35 hover:bg-ms-ink-900/[0.03] transition-all duration-200 ${font}`}
          >
            {t.cta2[lang]} {ar ? '↓' : '↓'}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ms-ink-900/10 pt-8">
          {STATS.map((s, i) => (
            <div key={i}>
              <p className="font-mono text-3xl md:text-4xl font-bold text-ms-green-800 leading-none">{s.v}</p>
              <p className={`text-[10px] uppercase tracking-widest text-ms-ink-500 mt-2 font-mono`}>{s.l[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
