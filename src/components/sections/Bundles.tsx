'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import { BUNDLES, WHATSAPP_URL } from '@/lib/data'
import type { Bundle, TierId } from '@/lib/data'
import {
  Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2,
  Check, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  clinic: Stethoscope,
  salon: Scissors,
  gym: Dumbbell,
  garage: Wrench,
  restaurant: UtensilsCrossed,
  'real-estate': Building2,
}

const TIER_ORDER: TierId[] = ['essential', 'advanced', 'full-stack']

const t = {
  eyebrow:   { en: 'Pricing',              ar: 'التسعير' },
  headline:  { en: 'Pick your industry. Pick your tier.', ar: 'اختر مجالك. اختر باقتك.' },
  sub:       { en: 'One-time build fee. Fixed KWD retainer. No surprises.', ar: 'رسم بناء لمرة واحدة. اشتراك شهري ثابت. بدون مفاجآت.' },
  build:     { en: 'Build fee',            ar: 'رسم البناء' },
  retainer:  { en: '/mo retainer',         ar: '/شهر اشتراك' },
  kwd:       { en: 'KWD',                  ar: 'د.ك' },
  cta:       { en: 'Get Started',          ar: 'ابدأ الآن' },
  delivery:  { en: '7-day delivery',       ar: 'توصيل في ٧ أيام' },
  popular:   { en: 'Most Popular',         ar: 'الأكثر طلباً' },
}

const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  essential:    { en: 'Essential',   ar: 'الأساسية' },
  advanced:     { en: 'Advanced',    ar: 'المتقدمة' },
  'full-stack': { en: 'Full-Stack',  ar: 'المتكاملة' },
}

function TierCard({
  bundle,
  tierId,
  lang,
}: {
  bundle: Bundle
  tierId: TierId
  lang: 'en' | 'ar'
}) {
  const isAr = lang === 'ar'
  const tier = bundle.tiers.find((t) => t.id === tierId)!
  const isAdvanced = tierId === 'advanced'
  const Icon = ICON_MAP[bundle.id] ?? Building2

  const waText = encodeURIComponent(
    isAr
      ? `السلام عليكم، مهتم بـ${bundle.ar} — باقة ${TIER_LABELS[tierId].ar} — بناء ${bundle.buildFee} د.ك`
      : `Hi, I'm interested in ${bundle.en} — ${TIER_LABELS[tierId].en} tier — ${bundle.buildFee} KWD build`
  )

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        isAdvanced
          ? 'bg-ms-green-900 border border-ms-gold-600/40 shadow-lg'
          : 'bg-white border border-ms-ivory-200'
      }`}
    >
      {/* Most Popular badge */}
      {isAdvanced && (
        <div className="bg-ms-gold-600 text-ms-green-900 text-[10px] font-mono tracking-[0.15em] uppercase text-center py-1.5 font-semibold">
          {t.popular[lang]}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Tier name */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className={`text-[10px] tracking-[0.18em] uppercase font-medium mb-1 ${isAdvanced ? 'text-ms-gold-600' : 'text-ms-ink-500'}`}>
              {TIER_LABELS[tierId][lang]}
            </p>
            <p className={`text-[15px] font-semibold ${isAdvanced ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
              {bundle[isAr ? 'ar' : 'en']}
            </p>
          </div>
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
            isAdvanced ? 'bg-ms-gold-600/15 text-ms-gold-600' : 'bg-ms-green-800/8 text-ms-green-800'
          }`}>
            <Icon size={18} strokeWidth={1.75} />
          </span>
        </div>

        {/* Pricing */}
        <div className={`rounded-xl p-4 mb-5 ${isAdvanced ? 'bg-white/6 border border-white/10' : 'bg-ms-ivory-100'}`}>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${isAdvanced ? 'text-white/50' : 'text-ms-ink-500'}`}>
            {t.build[lang]}
          </p>
          <p className={`text-[30px] font-bold leading-none mb-3 ${isAdvanced ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
            {bundle.buildFee}
            <span className={`text-[13px] font-medium ms-1 ${isAdvanced ? 'text-white/50' : 'text-ms-ink-400'}`}>{t.kwd[lang]}</span>
          </p>
          <div className={`h-px mb-3 ${isAdvanced ? 'bg-white/10' : 'bg-ms-ivory-200'}`} />
          <p className={`text-[22px] font-bold leading-none ${isAdvanced ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>
            {tier.retainer}
            <span className={`text-[12px] font-normal ms-0.5 ${isAdvanced ? 'text-white/50' : 'text-ms-ink-400'}`}>
              {' '}{t.kwd[lang]}{t.retainer[lang]}
            </span>
          </p>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {tier.features[isAr ? 'ar' : 'en'].map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className={`mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full ${
                isAdvanced ? 'bg-ms-gold-600/20' : 'bg-ms-green-800/10'
              }`}>
                <Check
                  size={10}
                  strokeWidth={2.5}
                  className={isAdvanced ? 'text-ms-gold-600' : 'text-ms-green-800'}
                />
              </span>
              <span className={`text-[13px] leading-snug ${
                i === 0 && tierId !== 'essential'
                  ? isAdvanced ? 'text-ms-gold-600 font-medium' : 'text-ms-green-800 font-medium'
                  : isAdvanced ? 'text-white/70' : 'text-ms-ink-600'
              }`}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* Delivery tag + CTA */}
        <div className={`text-[11px] font-mono tracking-wider text-center mb-3 ${isAdvanced ? 'text-ms-gold-600/60' : 'text-ms-ink-400'}`}>
          ⏱ {t.delivery[lang]}
        </div>
        <a
          href={`${WHATSAPP_URL}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-150 ${
            isAdvanced
              ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-500'
              : 'bg-ms-green-800 text-ms-ivory-0 hover:bg-ms-green-700'
          }`}
        >
          {t.cta[lang]}
          <ArrowRight size={14} strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

export default function Bundles() {
  const { lang, isAr } = useLang()
  const [activeId, setActiveId] = useState<string>('clinic')

  const activeBundle = BUNDLES.find((b) => b.id === activeId)!

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-600 text-[16px] max-w-md mx-auto leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* Industry tab picker */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BUNDLES.map((b) => {
            const Icon = ICON_MAP[b.id] ?? Building2
            const isActive = b.id === activeId
            return (
              <button
                key={b.id}
                onClick={() => setActiveId(b.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-ms-green-800 text-ms-ivory-0 shadow-sm'
                    : 'bg-white text-ms-ink-600 border border-ms-ivory-200 hover:border-ms-green-800/30 hover:text-ms-green-800'
                }`}
              >
                <Icon size={13} strokeWidth={1.75} />
                {b[isAr ? 'ar' : 'en']}
              </button>
            )
          })}
        </div>

        {/* Pain stat — changes per industry */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-start gap-3 bg-ms-green-900/5 border border-ms-green-800/12 rounded-xl px-5 py-4">
            <span className="text-ms-gold-600 text-[18px] mt-0.5 shrink-0">⚠️</span>
            <p className="text-ms-ink-700 text-[14px] leading-relaxed font-medium">
              {activeBundle.painStat[lang]}
            </p>
          </div>
        </div>

        {/* 3-tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIER_ORDER.map((tierId) => (
            <TierCard
              key={tierId}
              bundle={activeBundle}
              tierId={tierId}
              lang={lang}
            />
          ))}
        </div>

        {/* Industry label below */}
        <p className="text-center text-ms-ink-400 text-[12px] mt-6 tracking-wide">
          {activeBundle.industry[lang]}
        </p>
      </div>
    </section>
  )
}
