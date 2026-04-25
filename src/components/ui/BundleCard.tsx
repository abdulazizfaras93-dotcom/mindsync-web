'use client'
import { Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const ICON_MAP: Record<string, LucideIcon> = {
  clinic: Stethoscope,
  salon: Scissors,
  gym: Dumbbell,
  garage: Wrench,
  restaurant: UtensilsCrossed,
  'real-estate': Building2,
}

type BundleCardProps = {
  bundle: {
    id: string
    en: string
    ar: string
    industry: { en: string; ar: string }
    buildFee: number
    retainer: number
    features: { en: string[]; ar: string[] }
    icon: string
    badge?: { en: string; ar: string }
  }
  featured?: boolean
}

const t = {
  build:    { en: 'Build fee',        ar: 'رسم البناء' },
  retainer: { en: 'Monthly retainer', ar: 'الاشتراك الشهري' },
  includes: { en: "What's included",  ar: 'ما يشمله' },
  cta:      { en: 'Get Started',      ar: 'ابدأ الآن' },
  days:     { en: '7-day delivery',   ar: 'توصيل في ٧ أيام' },
  kwd:      { en: 'KWD',              ar: 'د.ك' },
  mo:       { en: '/mo',              ar: '/شهر' },
}

export default function BundleCard({ bundle, featured = false }: BundleCardProps) {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const Icon = ICON_MAP[bundle.id] ?? Building2
  const waText = encodeURIComponent(
    isAr
      ? `السلام عليكم، مهتم بـ${bundle.ar} — ${bundle.buildFee} د.ك بناء`
      : `Hi, I'm interested in the ${bundle.en} — ${bundle.buildFee} KWD build`
  )

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        featured
          ? 'border-ms-gold-600/40 bg-ms-green-900 text-ms-ivory-0'
          : 'border-ms-ivory-200 bg-white text-ms-ink-900'
      }`}
    >
      {bundle.badge && (
        <div className="absolute top-3 end-3 z-10 bg-ms-gold-600 text-ms-green-900 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full">
          {bundle.badge[isAr ? 'ar' : 'en']}
        </div>
      )}

      <div className="relative p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className={`text-[11px] tracking-widest uppercase mb-1.5 ${featured ? 'text-ms-gold-600' : 'text-ms-ink-600'}`}>
              {bundle.industry[isAr ? 'ar' : 'en']}
            </p>
            <h3 className={`text-[18px] font-bold leading-tight ${featured ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
              {bundle[isAr ? 'ar' : 'en']}
            </h3>
          </div>
          <span
            className={`mt-0.5 inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${
              featured ? 'bg-ms-gold-600/15 text-ms-gold-600' : 'bg-ms-green-800/10 text-ms-green-800'
            }`}
            aria-hidden
          >
            <Icon size={20} strokeWidth={1.75} />
          </span>
        </div>

        <div className={`rounded-xl p-4 mb-5 ${featured ? 'bg-white/5 border border-white/10' : 'bg-ms-ivory-100'}`}>
          <div className="flex items-end justify-between">
            <div>
              <p className={`text-[10px] uppercase tracking-wider mb-1 ${featured ? 'text-white/50' : 'text-ms-ink-600'}`}>{t.build[lang]}</p>
              <p className={`text-[28px] font-bold leading-none ${featured ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>
                {bundle.buildFee} <span className="text-[14px] font-medium opacity-60">{t.kwd[lang]}</span>
              </p>
            </div>
            <div className="text-end">
              <p className={`text-[10px] uppercase tracking-wider mb-1 ${featured ? 'text-white/50' : 'text-ms-ink-600'}`}>{t.retainer[lang]}</p>
              <p className={`text-[20px] font-bold leading-none ${featured ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>
                {bundle.retainer}<span className="text-[12px] font-normal opacity-70">{t.kwd[lang]}{t.mo[lang]}</span>
              </p>
            </div>
          </div>
        </div>

        <p className={`text-[11px] uppercase tracking-wider mb-3 ${featured ? 'text-white/50' : 'text-ms-ink-600'}`}>{t.includes[lang]}</p>
        <ul className="space-y-2 mb-6 flex-1">
          {bundle.features[isAr ? 'ar' : 'en'].map((f, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <circle cx="7" cy="7" r="7" fill={featured ? '#BF8D38' : '#153E2D'} opacity="0.15"/>
                <path d="M4 7l2 2 4-4" stroke={featured ? '#BF8D38' : '#153E2D'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`text-[13px] ${featured ? 'text-white/75' : 'text-ms-ink-600'}`}>{f}</span>
            </li>
          ))}
        </ul>

        <div className={`text-[11px] font-mono tracking-wider mb-4 ${featured ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>
          ⏱ {t.days[lang]}
        </div>

        <a
          href={`${WHATSAPP_URL}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center font-semibold text-[14px] py-3 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-2 ${
            featured
              ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-400'
              : 'bg-ms-green-800 text-ms-ivory-0 hover:bg-ms-green-700'
          }`}
        >
          {t.cta[lang]}
        </a>
      </div>
    </div>
  )
}
