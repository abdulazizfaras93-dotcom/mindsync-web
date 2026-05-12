'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import {
  BUNDLES, WEBSITE_SERVICES, APP_SERVICES, CUSTOM_BUNDLE, FREE_TRIAL, TIER_ORDER, INDUSTRY_SLUGS,
} from '@/lib/data'
import type { Bundle, TierId, BundleTier } from '@/lib/data'
import {
  Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2,
  Sparkles, Home, Check, ArrowRight, Globe, Smartphone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// ─── Icon maps ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  clinic:          Stethoscope,
  salon:           Scissors,
  spa:             Sparkles,
  gym:             Dumbbell,
  garage:          Wrench,
  restaurant:      UtensilsCrossed,
  'real-estate':   Building2,
  'home-business': Home,
}

// Large emoji icons for the bento tiles
const EMOJI_MAP: Record<string, string> = {
  clinic:          '🏥',
  salon:           '✂️',
  spa:             '💆',
  gym:             '💪',
  garage:          '🔧',
  restaurant:      '🍽️',
  'real-estate':   '🏢',
  'home-business': '🏠',
}


const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  'smart':      { en: 'Smart',     ar: 'الذكي' },
  'pro':        { en: 'Pro',       ar: 'المتقدم' },
  'full-auto':  { en: 'Full Auto', ar: 'المؤتمت' },
}

// ─── Copy ─────────────────────────────────────────────────────────────────────

const t = {
  eyebrow:      { en: 'Services & Pricing',                                                ar: 'الخدمات والتسعير' },
  headline:     { en: 'Your business, automated from day one',                             ar: 'مشروعك، مؤتمت من اليوم الأول' },
  sub:          { en: '8 industries — any other business built custom after a call',       ar: '٨ قطاعات — أي مشروع ثاني نبنيه مخصص بعد استشارة' },
  build:        { en: 'Build fee',                                                         ar: 'رسوم بناء النظام' },
  retainer:     { en: '/mo',                                                               ar: '/شهر' },
  kwd:          { en: 'KWD',                                                               ar: 'د.ك' },
  popular:      { en: 'Most Popular',                                                      ar: 'الأكثر طلباً' },
  selectIndustry: { en: 'Select an industry to see pricing',                               ar: 'اختر قطاعاً لعرض الأسعار' },
  getStarted:   { en: 'Get Started →',                                                    ar: 'ابدأ الآن ←' },

  // Websites section
  webLabel:     { en: 'Website Design',                                                    ar: 'تصميم المواقع' },
  webSub:       { en: 'Professional bilingual websites — with or without AI.',             ar: 'مواقع احترافية ثنائية اللغة — مع أو بدون ذكاء اصطناعي.' },
  webDays:      { en: (n: [number, number]) => `${n[0]}–${n[1]} days`,                    ar: (n: [number, number]) => `${n[0]}–${n[1]} يوم` },
  // Apps section
  appLabel:     { en: 'Mobile Apps',                                                       ar: 'تطبيقات الجوال' },
  appSub:       { en: 'iOS + Android apps — with or without AI.',                          ar: 'تطبيقات iOS + Android — مع أو بدون ذكاء اصطناعي.' },

  // Price helpers
  from:         { en: 'from',                                                              ar: 'يبدأ من' },
  discovery:    { en: 'Fill in Discovery Form',                                            ar: 'استبيان لفهم طبيعة مشروعك' },

  // Custom bundle
  customLabel:  { en: 'Priced after a free consultation call',                             ar: 'السعر يُحدد بعد مكالمة استشارة مجانية' },
}

const ID_TO_SLUG = Object.fromEntries(
  Object.entries(INDUSTRY_SLUGS).map(([slug, id]) => [id, slug])
)

// ─── Helpers ──────────────────────────────────────────────────────────────────



// ─── Bento Tile ───────────────────────────────────────────────────────────────

function BentoTile({
  bundle,
  isSelected,
  onClick,
  lang,
  shouldReduceMotion,
}: {
  bundle: Bundle
  isSelected: boolean
  onClick: () => void
  lang: 'en' | 'ar'
  shouldReduceMotion: boolean
}) {
  const isAr = lang === 'ar'
  const name = isAr ? bundle.ar : bundle.en
  const emoji = EMOJI_MAP[bundle.id] ?? '🤖'

  return (
    <motion.button
      onClick={onClick}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        relative flex flex-col items-center justify-center gap-2
        rounded-2xl cursor-pointer overflow-hidden min-h-[120px] p-4
        transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600
        ${isSelected
          ? 'bg-ms-green-700 ring-2 ring-ms-gold-600'
          : 'bg-ms-green-800 hover:bg-ms-green-700'
        }
      `}
      style={isSelected ? { boxShadow: '0 0 18px 2px rgba(191,141,56,0.22)' } : undefined}
      aria-pressed={isSelected}
    >
      {/* Emoji icon */}
      <span className="text-3xl leading-none select-none" role="img" aria-label={name}>
        {emoji}
      </span>

      {/* Industry name */}
      <span className="font-grotesk font-semibold text-ms-ivory-0 text-sm text-center leading-tight">
        {name}
      </span>

      {/* Build fee */}
      <span className="font-mono text-ms-gold-600 text-xs">
        {bundle.buildFee} {t.kwd[lang]}
      </span>

      {/* Selected indicator dot */}
      {isSelected && (
        <span className="absolute top-2 end-2 w-2 h-2 rounded-full bg-ms-gold-600" />
      )}
    </motion.button>
  )
}

// ─── Tier Card (inline expand) ────────────────────────────────────────────────

function InlineTierCard({
  tier,
  bundle,
  index,
  lang,
  shouldReduceMotion,
}: {
  tier: BundleTier
  bundle: Bundle
  index: number
  lang: 'en' | 'ar'
  shouldReduceMotion: boolean
}) {
  const isPro = tier.id === 'pro'
  const isAr = lang === 'ar'
  const Icon = ICON_MAP[bundle.id] ?? Building2
  const features = tier.features[lang].slice(0, 4)

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
      className={`
        relative flex flex-col rounded-2xl overflow-hidden h-full
        ${isPro
          ? 'bg-ms-green-800 text-ms-ivory-0 border border-ms-gold-600/40 shadow-lg'
          : 'bg-ms-ivory-0 border border-ms-ivory-200'
        }
      `}
    >
      {/* Most Popular badge */}
      {isPro && (
        <div className="bg-ms-gold-600 text-ms-green-900 font-mono text-[9px] tracking-[0.15em] uppercase text-center py-1.5 font-semibold">
          {t.popular[lang]}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Header: tier label + icon */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-[10px] tracking-[0.18em] uppercase font-mono mb-0.5 ${isPro ? 'text-ms-gold-600' : 'text-ms-ink-500'}`}>
              {TIER_LABELS[tier.id][lang]}
            </p>
            <p className={`text-[14px] font-semibold font-grotesk ${isPro ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
              {isAr ? bundle.ar : bundle.en}
            </p>
          </div>
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
            isPro ? 'bg-ms-gold-600/15 text-ms-gold-600' : 'bg-ms-green-800/[0.08] text-ms-green-800'
          }`}>
            <Icon size={18} strokeWidth={1.75} />
          </span>
        </div>

        {/* Retainer price */}
        <div>
          <span className={`font-mono text-3xl font-bold leading-none ${isPro ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>
            {tier.retainer}
          </span>
          <span className={`text-[12px] font-normal ms-1 ${isPro ? 'text-white/50' : 'text-ms-ink-400'}`}>
            {' '}{t.kwd[lang]}{t.retainer[lang]}
          </span>
        </div>

        {/* Features list */}
        <ul className="flex-1 space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`mt-0.5 shrink-0 text-[11px] font-mono font-semibold ${isPro ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>✓</span>
              <span className={`text-[12px] leading-snug ${isPro ? 'text-white/80' : 'text-ms-ink-600'}`}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/discovery"
          className={`
            flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
            text-[13px] font-semibold tracking-wide transition-all duration-150 active:scale-[0.98]
            ${isPro
              ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-500'
              : 'border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0'
            }
          `}
        >
          {t.getStarted[lang]}
          <ArrowRight size={13} strokeWidth={2} />
        </a>

      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Bundles() {
  const { lang, isAr } = useLang()
  const shouldReduceMotion = useReducedMotion() ?? false

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selectedBundle = BUNDLES.find(b => b.id === selectedId) ?? null

  const handleTileClick = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id))
  }

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold font-grotesk text-ms-ink-900 tracking-tight leading-[1.0] mb-3">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-500 text-[16px] max-w-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* ── Bento Grid: 8 industry tiles ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BUNDLES.map((bundle) => (
            <BentoTile
              key={bundle.id}
              bundle={bundle}
              isSelected={selectedId === bundle.id}
              onClick={() => handleTileClick(bundle.id)}
              lang={lang}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* ── Tier Cards: animate in below grid on selection ── */}
        <AnimatePresence mode="wait">
          {selectedBundle ? (
            <motion.div
              key={selectedBundle.id}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              {/* Industry context row */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-ms-ink-900 font-grotesk font-semibold text-[15px]">
                    {isAr ? selectedBundle.ar : selectedBundle.en}
                  </p>
                  <p className="text-ms-ink-500 text-[13px] leading-relaxed max-w-lg mt-0.5">
                    {selectedBundle.painStat[lang]}
                  </p>
                </div>
                <a
                  href={`/${ID_TO_SLUG[selectedBundle.id] ?? ''}`}
                  className="hidden md:inline-flex items-center gap-1 text-[11px] text-ms-green-800 font-medium hover:underline shrink-0 ms-4"
                >
                  {lang === 'ar' ? 'الصفحة الكاملة' : 'Full details page'}
                </a>
              </div>

              {/* 3 tier cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TIER_ORDER.map((tierId, index) => {
                  const tier = selectedBundle.tiers.find(t => t.id === tierId)
                  if (!tier) return null
                  return (
                    <InlineTierCard
                      key={tierId}
                      tier={tier}
                      bundle={selectedBundle}
                      index={index}
                      lang={lang}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-hint"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 flex items-center justify-center py-10 rounded-2xl border border-dashed border-ms-ivory-200"
            >
              <p className="text-ms-ink-400 text-[13px] font-mono tracking-wider">
                {t.selectIndustry[lang]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Free Trial Strip ── */}
        <div className="mt-16 rounded-2xl bg-ms-green-900 border border-ms-gold-600/25 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="inline-block text-[10px] font-mono tracking-[0.18em] uppercase text-ms-gold-600 border border-ms-gold-600/30 px-3 py-1 rounded-full mb-3">
              {FREE_TRIAL[lang].badge}
            </span>
            <h3 className="text-[24px] font-bold text-ms-ivory-0 mb-2">
              {FREE_TRIAL[lang].headline}
            </h3>
            <p className="text-white/55 text-[14px] leading-relaxed max-w-lg">
              {FREE_TRIAL[lang].body}
            </p>
          </div>
          <a
            href="/discovery"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-ms-gold-600 text-ms-green-900 text-[14px] font-bold hover:bg-ms-gold-500 transition-all duration-150 active:scale-[0.98] whitespace-nowrap"
          >
            {FREE_TRIAL[lang].cta}
            <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>

        {/* ── Custom AI System tile ── */}
        <div className="mt-6 border-2 border-dashed border-ms-gold-600/60 bg-ms-gold-600/5 rounded-2xl p-8 text-center">
          <h3 className="text-[22px] font-bold text-ms-ink-900 mb-2">
            {CUSTOM_BUNDLE[lang].name}
          </h3>
          <p className="text-ms-ink-500 text-[15px] leading-relaxed mb-3 max-w-lg mx-auto">
            {CUSTOM_BUNDLE[lang].desc}
          </p>
          <p className="text-ms-gold-600 text-[12px] font-mono mb-5">
            {t.customLabel[lang]}
          </p>
          <a
            href="/discovery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ms-gold-600 text-ms-green-900 text-[13px] font-semibold hover:bg-ms-gold-500 transition-all duration-150 active:scale-[0.98]"
          >
            {CUSTOM_BUNDLE[lang].cta}
            <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>

        {/* ── Website Design ── */}
        <div className="mt-20 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.webLabel[lang]}
            </p>
            <p className="text-ms-ink-500 text-[15px] max-w-xl leading-relaxed">
              {t.webSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WEBSITE_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="bg-white border border-ms-ivory-200 rounded-2xl p-6 flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ms-green-800/[0.08] text-ms-green-800 shrink-0">
                    <Globe size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ms-ink-900 mb-0.5">
                      {svc[isAr ? 'ar' : 'en']}
                    </p>
                    <p className="text-[11px] text-ms-ink-400 font-mono">
                      {typeof t.webDays[lang] === 'function'
                        ? (t.webDays[lang] as (n: [number, number]) => string)(svc.deliveryDays)
                        : ''}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {svc.features[lang].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-ms-green-800/10">
                        <Check size={10} strokeWidth={2.5} className="text-ms-green-800" />
                      </span>
                      <span className="text-[13px] leading-snug text-ms-ink-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <p className="text-[15px] font-semibold text-ms-ink-900">
                    {lang === 'ar' ? 'السعر حسب الطلب' : 'Quote on request'}
                  </p>
                  <p className="text-[11px] text-ms-ink-400 mt-0.5 font-mono">
                    {lang === 'ar' ? 'تواصل معنا للحصول على عرض سعر' : 'Contact us for a custom quote'}
                  </p>
                </div>

                <a
                  href="/discovery"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-all duration-150 active:scale-[0.98]"
                >
                  {t.discovery[lang]}
                  <ArrowRight size={13} strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile Apps ── */}
        <div className="mt-16 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.appLabel[lang]}
            </p>
            <p className="text-ms-ink-500 text-[15px] max-w-xl leading-relaxed">
              {t.appSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {APP_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="bg-white border border-ms-ivory-200 rounded-2xl p-6 flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ms-green-800/[0.08] text-ms-green-800 shrink-0">
                    <Smartphone size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ms-ink-900 mb-0.5">
                      {svc[isAr ? 'ar' : 'en']}
                    </p>
                    <p className="text-[11px] text-ms-ink-400 font-mono">
                      {svc.deliveryDays[0]}–{svc.deliveryDays[1]}{' '}
                      {lang === 'ar' ? 'يوم' : 'days'}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-5 flex-1">
                  {svc.features[lang].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-ms-green-800/10">
                        <Check size={10} strokeWidth={2.5} className="text-ms-green-800" />
                      </span>
                      <span className="text-[13px] leading-snug text-ms-ink-600">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <p className="text-[15px] font-semibold text-ms-ink-900">
                    {lang === 'ar' ? 'السعر حسب الطلب' : 'Quote on request'}
                  </p>
                  <p className="text-[11px] text-ms-ink-400 mt-0.5 font-mono">
                    {lang === 'ar' ? 'تواصل معنا للحصول على عرض سعر' : 'Contact us for a custom quote'}
                  </p>
                </div>

                <a
                  href="/discovery"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-all duration-150 active:scale-[0.98]"
                >
                  {t.discovery[lang]}
                  <ArrowRight size={13} strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
