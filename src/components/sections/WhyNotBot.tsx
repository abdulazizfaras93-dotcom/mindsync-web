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
  withoutTitle: {
    ar: 'بدون ذكاء اصطناعي',
    en: 'Without AI',
  },
  withTitle: {
    ar: 'مع MindSync AI',
    en: 'With MindSync AI',
  },
  painPoints: [
    {
      ar: 'فرص ضائعة — عملاء يسألون ولا أحد يرد',
      en: 'Missed leads — customers ask, no one responds',
    },
    {
      ar: 'متابعة يدوية لكل عميل بعد الزيارة',
      en: 'Manual follow-ups after every visit',
    },
    {
      ar: '+4 ساعات يومياً على المهام الإدارية',
      en: '4+ hours daily on admin tasks',
    },
    {
      ar: 'نسيان المواعيد وارتفاع معدل الغياب',
      en: 'Appointment no-shows with no reminders',
    },
    {
      ar: 'الفريق يضيع وقته على أسئلة متكررة',
      en: 'Staff stuck answering repetitive questions',
    },
  ],
  solutions: [
    {
      ar: 'رد فوري من الذكاء الاصطناعي — 24/7 في 3 ثوانٍ',
      en: '3-second AI response 24/7, zero missed leads',
    },
    {
      ar: 'حجز تلقائي ومتابعة بعد كل زيارة',
      en: 'Automated booking & post-visit follow-up',
    },
    {
      ar: '30 دقيقة فقط للمهام الإدارية يومياً',
      en: '30 min admin/day — AI handles the rest',
    },
    {
      ar: 'تذكيرات ذكية تخفض الغياب 60٪',
      en: 'Smart reminders cut no-shows by 60%',
    },
    {
      ar: 'الفريق يركز على العملاء لا على الردود',
      en: 'Staff focused on customers, not messages',
    },
  ],
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

        {/* Two-panel split reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-16">

          {/* Left panel — Without AI */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="bg-red-950/20 border border-red-200/20 rounded-2xl p-8"
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-grotesk font-bold text-xl text-ms-ivory-0">
                {t.withoutTitle[lang]}
              </h3>
            </div>

            {/* Pain points list */}
            <ul className="space-y-3">
              {t.painPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-white/65 text-[14px] leading-snug">{point[lang]}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right panel — With MindSync AI */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-ms-green-800/8 border border-ms-green-800/20 rounded-2xl p-8"
            style={{ background: 'rgba(21,62,45,0.15)' }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-ms-gold-600/15 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-ms-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-grotesk font-bold text-xl text-ms-ivory-0">
                {t.withTitle[lang]}
              </h3>
            </div>

            {/* Solutions list */}
            <ul className="space-y-3">
              {t.solutions.map((solution, i) => (
                <motion.li
                  key={i}
                  initial={prefersReduced ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-ms-gold-600/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-ms-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white/80 text-[14px] leading-snug">{solution[lang]}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

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
