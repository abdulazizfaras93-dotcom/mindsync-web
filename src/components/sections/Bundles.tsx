'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import {
  BUNDLES, WEBSITE_SERVICES, APP_SERVICES, CUSTOM_BUNDLE, FREE_TRIAL, TIER_ORDER,
} from '@/lib/data'
import { TiltCard } from '@/components/ui/TiltCard'
import type { Bundle, TierId, Channel } from '@/lib/data'
import {
  Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2,
  Sparkles, Home, Check, ArrowRight, Clock, Globe, Smartphone,
  MessageCircle, LayoutDashboard, AtSign, BarChart2, AppWindow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// âââ Icon maps ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

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

const CHANNEL_META: Record<Channel, { icon: React.ReactNode; label: { en: string; ar: string } }> = {
  whatsapp:  { icon: <MessageCircle size={11} />,   label: { en: 'WhatsApp',      ar: 'ÙØ§ØªØ³Ø§Ø¨' } },
  portal:    { icon: <LayoutDashboard size={11} />, label: { en: 'Client Portal', ar: 'Ø¨ÙØ§Ø¨Ø© Ø§ÙØ¹ÙÙÙ' } },
  website:   { icon: <Globe size={11} />,           label: { en: 'Website',       ar: 'Ø§ÙÙÙÙØ¹' } },
  instagram: { icon: <AtSign size={11} />,          label: { en: 'Instagram',     ar: 'Ø§ÙØ³ØªÙØ±Ø§Ù' } },
  app:       { icon: <AppWindow size={11} />,       label: { en: 'Mobile App',    ar: 'Ø§ÙØªØ·Ø¨ÙÙ' } },
  analytics: { icon: <BarChart2 size={11} />,       label: { en: 'Analytics',     ar: 'ØªÙØ§Ø±ÙØ±' } },
}

const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  'smart':      { en: 'Smart',     ar: 'Ø§ÙØ°ÙÙ' },
  'pro':        { en: 'Pro',       ar: 'Ø§ÙÙØªÙØ¯Ù' },
  'full-auto':  { en: 'Full Auto', ar: 'Ø§ÙÙØ¤ØªÙØª' },
}

// âââ Copy âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const t = {
  eyebrow:      { en: 'Services & Pricing',                                                ar: 'Ø§ÙØ®Ø¯ÙØ§Øª ÙØ§ÙØªØ³Ø¹ÙØ±' },
  headline:     { en: 'Your business, automated from day one',                             ar: 'ÙØ´Ø±ÙØ¹ÙØ ÙØ¤ØªÙØª ÙÙ Ø§ÙÙÙÙ Ø§ÙØ£ÙÙ' },
  sub:          { en: '8 industries â any other business built custom after a call',       ar: 'Ù¨ ÙØ·Ø§Ø¹Ø§Øª â Ø£Ù ÙØ´Ø±ÙØ¹ Ø«Ø§ÙÙ ÙØ¨ÙÙÙ ÙØ®ØµØµ Ø¨Ø¹Ø¯ Ø§Ø³ØªØ´Ø§Ø±Ø©' },
  build:        { en: 'Build fee',                                                         ar: 'Ø±Ø³ÙÙ Ø¨ÙØ§Ø¡ Ø§ÙÙØ¸Ø§Ù' },
  retainer:     { en: '/mo',                                                               ar: '/Ø´ÙØ±' },
  kwd:          { en: 'KWD',                                                               ar: 'Ø¯.Ù' },
  delivery:     { en: '7-day delivery',                                                    ar: 'Ø¬Ø§ÙØ² ÙÙ Ù§ Ø£ÙØ§Ù' },
  problem:      { en: 'The Problem',                                                       ar: 'Ø§ÙÙØ´ÙÙØ©' },
  gone:         { en: 'Ã Gone',                                                            ar: 'Ã Ø§ÙØªÙÙ' },
  popular:      { en: 'Most Popular',                                                      ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },

  // Free trial
  trialSection: { en: 'Not sure yet?',                                                     ar: 'ÙÙ ÙØªØ£ÙØ¯ Ø¨Ø¹Ø¯Ø' },

  // Websites section
  webLabel:     { en: 'Website Design',                                                    ar: 'ØªØµÙÙÙ Ø§ÙÙÙØ§ÙØ¹' },
  webSub:       { en: 'Professional bilingual websites â with or without AI.',             ar: 'ÙÙØ§ÙØ¹ Ø§Ø­ØªØ±Ø§ÙÙØ© Ø«ÙØ§Ø¦ÙØ© Ø§ÙÙØºØ© â ÙØ¹ Ø£Ù Ø¨Ø¯ÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù.' },
  webDays:      { en: (n: [number, number]) => `${n[0]}â${n[1]} days`,                    ar: (n: [number, number]) => `${n[0]}â${n[1]} ÙÙÙ` },
  webMaint:     { en: (n: number) => `+${n} KWD/mo maintenance (optional)`,               ar: (n: number) => `+${n} Ø¯.Ù/Ø´ÙØ± ØµÙØ§ÙØ© (Ø§Ø®ØªÙØ§Ø±Ù)` },

  // Apps section
  appLabel:     { en: 'Mobile Apps',                                                       ar: 'ØªØ·Ø¨ÙÙØ§Øª Ø§ÙØ¬ÙØ§Ù' },
  appSub:       { en: 'iOS + Android apps â with or without AI.',                          ar: 'ØªØ·Ø¨ÙÙØ§Øª iOS + Android â ÙØ¹ Ø£Ù Ø¨Ø¯ÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù.' },

  // Price helpers
  from:         { en: 'from',                                                              ar: 'ÙØ¨Ø¯Ø£ ÙÙ' },
  startFrom:    { en: 'Starting from',                                                     ar: 'ÙØ¨Ø¯Ø£ ÙÙ' },
  getStarted:   { en: 'Fill in Discovery Form',                                            ar: 'Ø§Ø³ØªØ¨ÙØ§Ù ÙÙÙÙ Ø·Ø¨ÙØ¹Ø© ÙØ´Ø±ÙØ¹Ù' },

  // Custom bundle
  customName:   { en: 'Custom AI System',                                                  ar: 'ÙØ¸Ø§Ù Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ' },
  customLabel:  { en: 'Priced after a free consultation call',                             ar: 'Ø§ÙØ³Ø¹Ø± ÙÙØ­Ø¯Ø¯ Ø¨Ø¹Ø¯ ÙÙØ§ÙÙØ© Ø§Ø³ØªØ´Ø§Ø±Ø© ÙØ¬Ø§ÙÙØ©' },
}

// âââ Helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

const formatPrice = (price: number | [number, number], kwd: string) =>
  Array.isArray(price)
    ? `${price[0].toLocaleString()}â${price[1].toLocaleString()} ${kwd}`
    : `${price.toLocaleString()} ${kwd}`

// âââ Tier Card ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function TierCard({ bundle, tierId, lang }: { bundle: Bundle; tierId: TierId; lang: 'en' | 'ar' }) {
  const isAr    = lang === 'ar'
  const tier    = bundle.tiers.find((t) => t.id === tierId)!
  const isPro   = tierId === 'pro'
  const Icon    = ICON_MAP[bundle.id] ?? Building2

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        isPro
          ? 'bg-ms-green-900 border border-ms-gold-600/40 shadow-lg'
          : 'bg-white border border-ms-ivory-200'
      }`}
    >
      {/* Popular badge */}
      {tier.badge && (
        <div className="bg-ms-gold-600 text-ms-green-900 text-[10px] font-mono tracking-[0.15em] uppercase text-center py-1.5 font-semibold">
          {tier.badge[lang]}
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className={`text-[10px] tracking-[0.18em] uppercase font-medium mb-1 ${isPro ? 'text-ms-gold-600' : 'text-ms-ink-500'}`}>
              {TIER_LABELS[tierId][lang]}
            </p>
            <p className={`text-[15px] font-semibold ${isPro ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
              {bundle[isAr ? 'ar' : 'en']}
            </p>
          </div>
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
            isPro ? 'bg-ms-gold-600/15 text-ms-gold-600' : 'bg-ms-green-800/8 text-ms-green-800'
          }`}>
            <Icon size={18} strokeWidth={1.75} />
          </span>
        </div>

        {/* Pricing block */}
        <div className={`rounded-xl p-4 mb-4 ${isPro ? 'bg-white/6 border border-white/10' : 'bg-ms-ivory-100'}`}>
          <p className={`text-[10px] uppercase tracking-wider mb-1 ${isPro ? 'text-white/50' : 'text-ms-ink-500'}`}>
            {t.build[lang]}
          </p>
          <p className={`text-[30px] font-bold leading-none mb-1 ${isPro ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
            {bundle.buildFee}
            <span className={`text-[13px] font-medium ms-1 ${isPro ? 'text-white/50' : 'text-ms-ink-400'}`}>
              {t.kwd[lang]}
            </span>
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
          {tier.channels.map((ch) => (
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

        {/* Tasks eliminated */}
        <table className="w-full text-sm mt-2 mb-4 flex-1">
          <tbody>
            {bundle.scenario.tasksEliminated[tierId][lang].map((task, i) => (
              <tr key={i} className={`border-b last:border-0 ${isPro ? 'border-white/8' : 'border-ms-ivory-200/60'}`}>
                <td className={`py-2 pr-4 text-[13px] leading-snug ${isPro ? 'text-white/60' : 'text-ms-ink-600'}`}>
                  {task}
                </td>
                <td className={`py-2 text-right font-mono text-[11px] whitespace-nowrap font-semibold ${isPro ? 'text-red-400' : 'text-red-500'}`}>
                  {t.gone[lang]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delivery label */}
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

// âââ Main Component âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export default function Bundles() {
  const { lang, isAr } = useLang()
  const [activeId, setActiveId] = useState<string>('clinic')
  const activeBundle = BUNDLES.find((b) => b.id === activeId)!

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* ââ Section header ââ */}
        <div className="mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ink-900 tracking-tight leading-[1.0] mb-3">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-500 text-[16px] max-w-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* ââ AI Bundles: sidebar + cards ââ */}
        <div className="flex gap-10 items-start">

          {/* LEFT: Industry sidebar â desktop */}
          <div className="hidden md:block shrink-0 w-44">
            <div className="space-y-0.5">
              {BUNDLES.map((b) => {
                const Icon     = ICON_MAP[b.id] ?? Building2
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

            {/* Pain stat */}
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

            {/* Mobile: pill tabs */}
            <div className="flex md:hidden flex-wrap gap-2 mb-6">
              {BUNDLES.map((b) => {
                const Icon     = ICON_MAP[b.id] ?? Building2
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

            {/* Pain headline + solution */}
            <div className="mb-8">
              <p className="font-mono text-ms-gold-600 text-[15px] md:text-[17px] font-semibold leading-snug whitespace-pre-line">
                {activeBundle.scenario.painHeadline[lang]}
              </p>
              <p className="text-ms-green-800 font-medium text-[14px] mt-2">
                {activeBundle.scenario.painSolution[lang]}
              </p>
            </div>

            {/* Tier cards â Smart / Pro / Full Auto */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_2fr] gap-4">
              {TIER_ORDER.map((tierId) => (
                <TiltCard key={tierId}>
                  <TierCard bundle={activeBundle} tierId={tierId} lang={lang} />
                </TiltCard>
              ))}
            </div>

          </div>
        </div>

        {/* ââ Free Trial Strip ââ */}
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

        {/* ââ Custom AI System tile ââ */}
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

        {/* ââ Website Design ââ */}
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
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ms-green-800/8 text-ms-green-800 shrink-0">
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
                  <p className="text-[26px] font-bold text-ms-ink-900 leading-none">
                    {formatPrice(svc.price, t.kwd[lang])}
                  </p>
                  <p className="text-[11px] text-ms-ink-400 mt-1">
                    {typeof t.webMaint[lang] === 'function'
                      ? (t.webMaint[lang] as (n: number) => string)(svc.monthlyMaintenance)
                      : ''}
                  </p>
                </div>

                <a
                  href="/discovery"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-all duration-150 active:scale-[0.98]"
                >
                  {t.getStarted[lang]}
                  <ArrowRight size={13} strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ââ Mobile Apps ââ */}
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
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-ms-green-800/8 text-ms-green-800 shrink-0">
                    <Smartphone size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ms-ink-900 mb-0.5">
                      {svc[isAr ? 'ar' : 'en']}
                    </p>
                    <p className="text-[11px] text-ms-ink-400 font-mono">
                      {svc.deliveryDays[0]}â{svc.deliveryDays[1]}{' '}
                      {lang === 'ar' ? 'ÙÙÙ' : 'days'}
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
                  <p className="text-[22px] font-bold text-ms-ink-900 leading-none">
                    {svc.price[0].toLocaleString()}â{svc.price[1].toLocaleString()}{' '}
                    <span className="text-[14px] font-medium text-ms-ink-400">{t.kwd[lang]}</span>
                  </p>
                  <p className="text-[11px] text-ms-ink-400 mt-1">
                    +{svc.monthlyMaintenance} {t.kwd[lang]}/{lang === 'ar' ? 'Ø´ÙØ± ØµÙØ§ÙØ©' : 'mo maintenance'}
                  </p>
                </div>

                <a
                  href="/discovery"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border border-ms-green-800 text-ms-green-800 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-all duration-150 active:scale-[0.98]"
                >
                  {t.getStarted[lang]}
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
