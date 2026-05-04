'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: {
    ar: 'ليش مايند سينك مو بوت عادي؟',
    en: 'Why MindSync is not just a bot?',
  },
  headline: {
    ar: 'شركات كثيرة في الكويت تبيعك بوت.\nمايند سينك تبني لك نظام.\nالفرق؟ كل شيء.',
    en: 'Many companies in Kuwait will sell you a bot.\nMindSync builds you a system.\nThe difference? Everything.',
  },
  body: {
    ar: 'البوت يقرأ من قائمة أجوبة جاهزة.\nالنظام اللي نبنيه يفكر — يعرف اللي تبيه، يقرر متى يحجز،\nمتى يتابع، ومتى يحيلك لنا. مبني خصوصاً لك،\nما نستخدم قوالب جاهزة.',
    en: "A bot reads from a prepared answer list.\nThe system we build thinks — it knows what you want,\ndecides when to book, when to follow up, and when to escalate.\nBuilt specifically for you. No two MindSync systems are identical.",
  },
  tableHeaders: {
    ar: ['شركات البوت', 'فريلانسر', 'Enterprise AI', 'مايند سينك'],
    en: ['Bot Company', 'Freelancer', 'Enterprise AI', 'MindSync'],
  },
  cards: [
    {
      title: { ar: 'مبنيّ لك، مو نسخة من قالب', en: 'Built for you, not copied from a template' },
      body:  { ar: 'كل نظام نبنيه برمج خصوصاً لعملك — أسعارك، فريقك، ساعات عملك، أسلوبك. ما في نسختين متطابقتين في مايند سينك.', en: 'Every system we build is programmed specifically for your business — your pricing, team, hours, tone. No two MindSync systems are identical.' },
    },
    {
      title: { ar: 'وكيل ذكي يتعلم عملك', en: 'An AI agent that learns your business' },
      body:  { ar: 'مو سيناريو يقرأ من قائمة. وكيل ذكاء اصطناعي يتعلم كيف تفكر، متى يحيل، وكيف يرد — بلغتك وأسلوبك وعلى أي قناة تختارها.', en: "Not a script reading from a list. An AI agent that learns how you think, when to escalate, and how to respond — in your language, your tone, on any channel you choose." },
    },
    {
      title: { ar: 'نبقى معاك بعد الإطلاق', en: 'We stay with you after launch' },
      body:  { ar: 'الاشتراك الشهري يشمل كل شي — hosting، API، تحديثات، دعم. شخص يراقب نظامك ويطوّره كل شهر بدون ما تطلب.', en: "The monthly retainer covers everything — hosting, API, updates, support. Someone watching, fixing, and improving your system every month. Without you asking." },
    },
  ],
}

type TableRow = {
  feature: { ar: string; en: string }
  bot: string | { ar: string; en: string }
  freelancer: string | { ar: string; en: string }
  enterprise: string | { ar: string; en: string }
  ms: string | { ar: string; en: string }
}

const TABLE_ROWS: TableRow[] = [
  { feature: { ar: 'رد تلقائي',              en: 'Auto-reply' },               bot: '✓', freelancer: '✓', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'وكيل ذكاء اصطناعي',      en: 'AI agent (not a script)' },  bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'متابعة بعد الزيارة',      en: 'Post-visit follow-up' },     bot: '✗', freelancer: '~', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'موقع أو تطبيق مخصص',     en: 'Custom website or app' },    bot: '✗', freelancer: '~', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'صيانة شهرية شاملة',       en: 'Full monthly maintenance' }, bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'مبني لسوق الكويت',        en: 'Built for Kuwait market' },  bot: '✗', freelancer: '~', enterprise: '✗', ms: '✓' },
  { feature: { ar: 'أسبوع تجربة مجانية',      en: 'Free 1-week trial' },        bot: '✗', freelancer: '✗', enterprise: '✗', ms: '✓' },
  { feature: { ar: 'شركة برمجيات مرخصة',     en: 'Licensed software company'}, bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  {
    feature: { ar: 'السعر', en: 'Price' },
    bot:        { ar: 'منخفض', en: 'Low' },
    freelancer: { ar: 'منخفض', en: 'Low' },
    enterprise: '+10,000 KWD',
    ms:         '130–520 KWD/شهر',
  },
]

function cellColor(val: string): string {
  if (val === '✓') return 'text-ms-gold-600'
  if (val === '✗') return 'text-red-400'
  if (val === '~') return 'text-yellow-400'
  return 'text-white/60'
}

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function WhyNotBot() {
  const { lang, isAr } = useLang()
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Background pattern slides at a slower rate than content — depth effect
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-8%', '8%']
  )

  return (
    <section ref={sectionRef} className="relative py-24 bg-ms-green-900 overflow-hidden">

      {/* Parallax background pattern */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pattern-overlay pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, amount: 0.5 }}
          className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono font-medium mb-5 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
          {t.eyebrow[lang]}
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.08}
          viewport={{ once: true, amount: 0.3 }}
          className="text-[38px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-6 whitespace-pre-line"
        >
          {t.headline[lang]}
        </motion.h2>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.16}
          viewport={{ once: true, amount: 0.3 }}
          className="text-white/55 text-[16px] leading-relaxed max-w-2xl mb-14 whitespace-pre-line"
        >
          {t.body[lang]}
        </motion.p>

        {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.2}
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-x-auto mb-16"
        >
          <table className="w-full min-w-[580px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-ms-gold-600/40">
                <th className="text-left py-3 pr-4 text-white/40 font-mono text-[11px] tracking-widest uppercase w-[32%]">
                  {isAr ? 'الميزة' : 'Feature'}
                </th>
                {t.tableHeaders[lang].map((h, i) => (
                  <th
                    key={i}
                    className={`py-3 px-3 font-mono text-[11px] tracking-widest uppercase text-center ${
                      i === 3 ? 'text-ms-gold-600' : 'text-white/40'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="border-b border-white/8 last:border-0 hover:bg-white/3"
                >
                  <td className="py-3 pr-4 text-white/60 text-[13px]">{row.feature[lang]}</td>
                  {(['bot', 'freelancer', 'enterprise', 'ms'] as const).map((col) => {
                    const rawVal = row[col]
                    const val =
                      typeof rawVal === 'object' && rawVal !== null && ('ar' in rawVal || 'en' in rawVal)
                        ? (rawVal as { ar: string; en: string })[lang]
                        : (rawVal as string)
                    return (
                      <td
                        key={col}
                        className={`py-3 px-3 text-center font-mono text-[13px] font-semibold ${
                          col === 'ms' ? 'text-ms-gold-600' : cellColor(val)
                        }`}
                      >
                        {val}
                      </td>
                    )
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* 3 Differentiator Cards — asymmetric: 1 featured + 2 stacked */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-5">

          {/* Featured card — first differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border border-ms-gold-600/30 bg-ms-green-800 rounded-xl p-8 flex flex-col justify-between"
          >
            <span className="font-mono text-[11px] tracking-[0.18em] text-ms-gold-600/50 uppercase mb-6 block">01</span>
            <div>
              <h3 className="text-ms-ivory-0 font-bold text-[20px] leading-snug mb-4">{t.cards[0].title[lang]}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{t.cards[0].body[lang]}</p>
            </div>
          </motion.div>

          {/* Right column — two smaller cards stacked */}
          <div className="flex flex-col gap-5">
            {t.cards.slice(1).map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border border-ms-gold-600/20 bg-ms-green-800/60 rounded-xl p-6 flex-1"
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-ms-gold-600/50 uppercase mb-3 block">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <h3 className="text-ms-gold-600 font-bold text-[15px] leading-snug mb-2">{card.title[lang]}</h3>
                <p className="text-white/50 text-[13px] leading-relaxed">{card.body[lang]}</p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
