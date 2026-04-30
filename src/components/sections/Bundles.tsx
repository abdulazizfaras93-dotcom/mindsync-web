'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import { BUNDLES, ADDONS } from '@/lib/data'
import { TiltCard } from '@/components/ui/TiltCard'
import type { Bundle, TierId } from '@/lib/data'
import {
  Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2,
  Sparkles, Home, Check, ArrowRight, Clock, Globe, Smartphone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  clinic: Stethoscope,
  salon: Scissors,
  spa: Sparkles,
  gym: Dumbbell,
  garage: Wrench,
  restaurant: UtensilsCrossed,
  'real-estate': Building2,
  'home-business': Home,
}

const TIER_ORDER: TierId[] = ['essential', 'advanced', 'full-stack']

const ADDON_ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
}

const t = {
  eyebrow:      { en: 'Pricing',                                 ar: 'التسعير' },
  headline:     { en: 'Pick your industry. Pick your tier.',     ar: 'اختر مجالك. اختر باقتك.' },
  sub:          { en: 'One-time build fee. Fixed KWD retainer. No surprises.', ar: 'رسوم بناء النظام لمرة واحدة. اشتراك شهري بسيط. لا مفاجآت.' },
  build:        { en: 'Build fee',                               ar: 'رسوم بناء النظام' },
  retainer:     { en: '/mo retainer',                            ar: '/شهر اشتراك' },
  kwd:          { en: 'KWD',                                     ar: 'د.ك' },
  cta:          { en: 'Fill in Discovery Form',                  ar: 'استبيان لفهم طبيعة مشروعك' },
  delivery:     { en: '7-day delivery',                          ar: 'جاهز في ٧ أيام' },
  popular:      { en: 'Most Popular',                            ar: 'الأكثر طلباً' },
  problem:      { en: 'The Problem',                             ar: 'المشكلة اللي نواجهها' },
  addonsLabel:  { en: 'Optional Add-ons',                        ar: 'خدمات إضافية' },
  addonsSub:    { en: 'Enhance any AI bundle with a custom website or mobile app.', ar: 'عزز أي باقة ذكاء اصطناعي بموقع أو تطبيق مخصص.' },
  getQuote:     { en: 'Fill in Discovery Form',                  ar: 'استبيان لفهم طبيعة مشروعك' },
}

const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  essential:    { en: 'Always Online',           ar: 'خلك أونلاين' },
  advanced:     { en: 'Always Growing',          ar: 'نمو دايم' },
  'full-stack': { en: 'Fully Automated',  ar: 'نظام مؤتمت بالكامل' },
}

function TierCard({
  bundle, tierId, lang,
}: {
  bundle: Bundle; tierId: TierId; lang: 'en' | 'ar'
}) {
  const isAr = lang === 'ar'
  const tier = bundle.tiers.find((t) => t.id === tierId)!
  const isAdvanced = tierId === 'advanced'
  const Icon = ICON_MAP[bundle.id] ?? Building2

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        isAdvanced
          ? 'bg-ms-green-900 border border-ms-gold-600/40 shadow-lg'
          : 'bg-white border border-ms-ivory-200'
      }`}
    >
      {isAdvanced && (
        <div className="bg-ms-gold-600 text-ms-green-900 text-[10px] font-mono tracking-[0.15em] uppercase text-center py-1.5 font-semibold">
          {t.popular[lang]}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
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

        <div className={`rounded-xl p-4 mb-5 ${isAdvanced ? 'bg-white/6 border border-white/10' : 'bg-ms-ivory-100'}`}>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${isAdvanced ? 'text-white/50' : 'text-ms-ink-500'}`}>
            {t.build[lang]}
          </p>
          <p className={`text-[30px] font-bold leading-none mb-1 ${isAdvanced ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
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

        {/* Zone D — Task elimination table */}
        <table className="w-full text-sm mt-4 mb-4 flex-1">
          <tbody>
            {bundle.scenario.tasksEliminated[tierId][lang].map((task, i) => (
              <tr key={i} className="border-b border-ms-ivory-200/20 last:border-0">
                <td className={`py-2 pr-4 text-[13px] leading-snug ${isAdvanced ? 'text-white/60' : 'text-ms-ink-600'}`}>
                  {task}
                </td>
                <td className={`py-2 text-right font-mono text-[11px] whitespace-nowrap font-semibold ${isAdvanced ? 'text-red-400' : 'text-red-500'}`}>
                  {lang === 'ar' ? '× انتهى' : '× Gone'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`text-[11px] font-mono tracking-wider text-center mb-3 flex items-center justify-center gap-1.5 ${
          isAdvanced ? 'text-ms-gold-600/60' : 'text-ms-ink-400'
        }`}>
          <Clock size={10} strokeWidth={2} />
          {t.delivery[lang]}
        </div>
        <a
          href="/discovery"
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-150 active:scale-[0.98] ${
            isAdvanced
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

export default function Bundles() {
  const { lang, isAr } = useLang()
  const [activeId, setActiveId] = useState<string>('clinic')

  const activeBundle = BUNDLES.find((b) => b.id === activeId)!

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header — left-aligned */}
        <div className="mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ink-900 tracking-tight leading-[1.0] mb-3">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-500 text-[16px] max-w-md leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* Body: sidebar (desktop) + cards */}
        <div className="flex gap-10 items-start">

          {/* LEFT: Industry sidebar — desktop only */}
          <div className="hidden md:block shrink-0 w-44">
            <div className="space-y-0.5">
              {BUNDLES.map((b) => {
                const Icon = ICON_MAP[b.id] ?? Building2
                const isActive = b.id === activeId
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveId(b.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 ${
                      isActive
                        ? 'bg-ms-green-800 text-ms-ivory-0'
                        : 'text-ms-ink-600 hover:bg-ms-ivory-100 hover:text-ms-ink-900'
                    }`}
                  >
                    <Icon size={13} strokeWidth={1.75} className="shrink-0" />
                    <span className="text-[13px] font-medium">{b[isAr ? 'ar' : 'en']}</span>
                  </button>
                )
              })}
            </div>

            {/* Pain stat below sidebar */}
            <div className="mt-8 pt-6 border-t border-ms-ivory-200">
              <p className="text-ms-ink-400 text-[10px] uppercase tracking-[0.15em] mb-2 font-mono">
                {t.problem[lang]}
              </p>
              <p className="text-ms-ink-600 text-[12px] leading-relaxed">
                {activeBundle.painStat[lang]}
              </p>
            </div>
          </div>

          {/* RIGHT: Cards area */}
          <div className="flex-1 min-w-0">

            {/* Mobile: horizontal pill tabs */}
            <div className="flex md:hidden flex-wrap gap-2 mb-6">
              {BUNDLES.map((b) => {
                const Icon = ICON_MAP[b.id] ?? Building2
                const isActive = b.id === activeId
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveId(b.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 focus-visible:outline-none ${
                      isActive
                        ? 'bg-ms-green-800 text-ms-ivory-0'
                        : 'bg-white text-ms-ink-600 border border-ms-ivory-200 hover:border-ms-green-800/30'
                    }`}
                  >
                    <Icon size={12} strokeWidth={1.75} />
                    {b[isAr ? 'ar' : 'en']}
                  </button>
                )
              })}
            </div>

            {/* Mobile: pain stat */}
            <div className="md:hidden mb-6">
              <p className="text-ms-ink-600 text-[13px] leading-relaxed italic border-l-2 border-ms-gold-600/40 pl-3">
                {activeBundle.painStat[lang]}
              </p>
            </div>

            {/* Zone B — Pain headline */}
            <div className="mb-8">
              <p className="font-mono text-ms-gold-600 text-[15px] md:text-[17px] font-semibold leading-snug whitespace-pre-line">
                {activeBundle.scenario.painHeadline[lang]}
              </p>
              <p className="text-ms-green-800 dark:text-ms-green-400 font-medium text-[14px] mt-2">
                {activeBundle.scenario.painSolution[lang]}
              </p>
            </div>

            {/* Tier cards — asymmetric grid */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_2fr] gap-4">
              {TIER_ORDER.map((tierId) => (
                <TiltCard key={tierId}>
                  <TierCard
                    bundle={activeBundle}
                    tierId={tierId}
                    lang={lang}
                  />
                </TiltCard>
              ))}
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-16 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.addonsLabel[lang]}
            </p>
            <p className="text-ms-ink-500 text-[15px] max-w-xl leading-relaxed">
              {t.addonsSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {ADDONS.map((addon) => {
              const Icon = ADDON_ICON_MAP[addon.icon] ?? Globe
              return (
                <div
                  key={addon.id}
                  className="bg-white border border-ms-ivory-200 rounded-2xl p-6 flex flex-col hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-ms-green-800/8 text-ms-green-800 shrink-0">
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ms-ink-900 mb-0.5">
                        {addon.name[lang]}
                      </p>
                      <p className="text-[13px] text-ms-ink-500 leading-snug">
                        {addon.description[lang]}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {addon.features[lang].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-ms-green-800/10">
                          <Check size={10} strokeWidth={2.5} className="text-ms-green-800" />
                        </span>
                        <span className="text-[13px] leading-snug text-ms-ink-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/discovery"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold tracking-wide border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-all duration-150 active:scale-[0.98]"
                  >
                    {t.getQuote[lang]}
                    <ArrowRight size={13} strokeWidth={2} />
                  </a>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
