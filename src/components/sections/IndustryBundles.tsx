'use client'
import { ArrowRight, Clock, Check } from 'lucide-react'
import {
  MessageCircle, LayoutDashboard, Globe, AtSign, AppWindow, BarChart2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { TIER_ORDER } from '@/lib/data'
import type { Bundle, TierId, Channel } from '@/lib/data'

const CHANNEL_META: Record<Channel, { icon: React.ReactNode; label: { en: string; ar: string } }> = {
  whatsapp:  { icon: <MessageCircle size={11} />,   label: { en: 'WhatsApp',      ar: 'واتساب' } },
  portal:    { icon: <LayoutDashboard size={11} />, label: { en: 'Client Portal', ar: 'بوابة العميل' } },
  website:   { icon: <Globe size={11} />,           label: { en: 'Website',       ar: 'الموقع' } },
  instagram: { icon: <AtSign size={11} />,          label: { en: 'Instagram',     ar: 'انستقرام' } },
  app:       { icon: <AppWindow size={11} />,       label: { en: 'Mobile App',    ar: 'التطبيق' } },
  analytics: { icon: <BarChart2 size={11} />,       label: { en: 'Analytics',     ar: 'تقارير' } },
}

const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  smart:       { en: 'Smart',     ar: 'الذكي' },
  pro:         { en: 'Pro',       ar: 'المتقدم' },
  'full-auto': { en: 'Full Auto', ar: 'المؤتمت' },
}

const t = {
  eyebrow:   { en: 'Plans & Pricing',       ar: 'الباقات والتسعير' },
  headline:  { en: 'Choose your automation level', ar: 'اختر مستوى أتمتتك' },
  build:     { en: 'Build fee',             ar: 'رسوم البناء' },
  retainer:  { en: '/mo',                  ar: '/شهر' },
  kwd:       { en: 'KWD',                  ar: 'د.ك' },
  delivery:  { en: '7-day delivery',        ar: 'جاهز في ٧ أيام' },
  gone:      { en: '× Gone',               ar: '× انتهى' },
  problem:   { en: 'The Problem',           ar: 'المشكلة' },
  solution:  { en: 'The Solution',          ar: 'الحل' },
}

function TierCard({ bundle, tierId, lang }: { bundle: Bundle; tierId: TierId; lang: 'en' | 'ar' }) {
  const tier  = bundle.tiers.find(t => t.id === tierId)!
  const isPro = tierId === 'pro'

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        isPro
          ? 'bg-ms-green-900 border border-ms-gold-600/40 shadow-lg'
          : 'bg-white border border-ms-ivory-200'
      }`}
    >
      {tier.badge && (
        <div className="bg-ms-gold-600 text-ms-green-900 text-[10px] font-mono tracking-[0.15em] uppercase text-center py-1.5 font-semibold">
          {tier.badge[lang]}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">

        {/* Tier label */}
        <div className="mb-5">
          <p className={`text-[10px] tracking-[0.18em] uppercase font-medium mb-1 ${isPro ? 'text-ms-gold-600' : 'text-ms-ink-500'}`}>
            {TIER_LABELS[tierId][lang]}
          </p>
          <p className={`text-[15px] font-semibold ${isPro ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
            {bundle[lang === 'ar' ? 'ar' : 'en']}
          </p>
        </div>

        {/* Pricing */}
        <div className={`rounded-xl p-4 mb-4 ${isPro ? 'bg-white/6 border border-white/10' : 'bg-ms-ivory-100'}`}>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${isPro ? 'text-white/50' : 'text-ms-ink-500'}`}>
            {t.build[lang]}
          </p>
          <p className={`text-[30px] font-bold leading-none mb-1 ${isPro ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
            {bundle.buildFee}
            <span className={`text-[13px] font-medium ms-1 ${isPro ? 'text-white/50' : 'text-ms-ink-400'}`}> {t.kwd[lang]}</span>
          </p>
          <div className={`h-px mb-3 ${isPro ? 'bg-white/10' : 'bg-ms-ivory-200'}`} />
          <p className={`text-[22px] font-bold leading-none ${isPro ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>
            {tier.retainer}
            <span className={`text-[12px] font-normal ms-0.5 ${isPro ? 'text-white/50' : 'text-ms-ink-400'}`}>
              {' '}{t.kwd[lang]}{t.retainer[lang]}
            </span>
          </p>
        </div>

        {/* Channel pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tier.channels.map(ch => (
            <span
              key={ch}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                isPro
                  ? 'bg-ms-gold-600/10 border-ms-gold-600/20 text-ms-gold-400'
                  : 'bg-ms-green-800/8 border-ms-green-800/15 text-ms-green-800'
              }`}
            >
              {CHANNEL_META[ch].icon}
              {CHANNEL_META[ch].label[lang]}
            </span>
          ))}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-4 flex-1">
          {tier.features[lang].map((feat, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={12} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${isPro ? 'text-ms-gold-600' : 'text-ms-green-800'}`} />
              <span className={`text-[12px] leading-snug ${isPro ? 'text-white/70' : 'text-ms-ink-600'}`}>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Delivery */}
        <div className={`text-[11px] font-mono tracking-wider text-center mb-3 flex items-center justify-center gap-1.5 ${
          isPro ? 'text-ms-gold-600/60' : 'text-ms-ink-400'
        }`}>
          <Clock size={10} strokeWidth={2} />
          {t.delivery[lang]}
        </div>

        {/* CTA */}
        <a
          href="/discovery"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-150 active:scale-[0.98] ${
            isPro
              ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-500'
              : 'bg-ms-green-800 text-ms-ivory-0 hover:bg-ms-green-700'
          }`}
        >
          {bundle.scenario.tierCtas[tierId][lang]}
          <ArrowRight size={14} strokeWidth={2} />
        </a>

      </div>
    </div>
  )
}

export default function IndustryBundles({ bundle }: { bundle: Bundle }) {
  const { lang } = useLang()

  return (
    <section className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[36px] md:text-[46px] font-bold text-ms-ink-900 tracking-tight leading-[1.05] mb-3">
            {t.headline[lang]}
          </h2>
        </motion.div>

        {/* Pain scenario */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-10 max-w-3xl"
        >
          <p className="font-mono text-ms-gold-600 text-[15px] md:text-[17px] font-semibold leading-snug whitespace-pre-line">
            {bundle.scenario.painHeadline[lang]}
          </p>
          <p className="text-ms-green-800 font-medium text-[14px] mt-2">
            {bundle.scenario.painSolution[lang]}
          </p>
        </motion.div>

        {/* Tier cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-[2fr_3fr_2fr] gap-4"
        >
          {TIER_ORDER.map(tierId => (
            <TierCard key={tierId} bundle={bundle} tierId={tierId} lang={lang} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
