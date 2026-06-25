'use client'
import { useLang } from '@/lib/lang'
import { TIERS, PILOT, BASELINE, type Tier } from '@/lib/data'

function TierCard({ tier, ar }: { tier: Tier; ar: boolean }) {
  const featured = !!tier.badge
  const features = ar ? tier.features.ar : tier.features.en
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 bg-white ${
        featured
          ? 'border-2 border-ms-gold-600 shadow-[0_20px_40px_rgba(15,46,34,0.12)]'
          : 'border border-ms-ink-900/10'
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ms-gold-600 text-ms-green-900 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
          {ar ? tier.badge.ar : tier.badge.en}
        </span>
      )}
      <p className="font-mono text-[11px] tracking-widest uppercase text-ms-gold-600 mb-1">
        {ar ? tier.roleAr : tier.roleEn}
      </p>
      <h3 className="font-grotesk font-bold text-[22px] text-ms-ink-900 mb-3">{tier.en}</h3>
      <p className={`text-[14px] text-ms-ink-600 mb-5 ${ar ? 'font-arabic text-right' : ''}`}>
        {ar ? tier.outcome.ar : tier.outcome.en}
      </p>

      <div className={`flex items-end gap-2 mb-1 ${ar ? 'flex-row-reverse justify-end' : ''}`}>
        <span className="font-mono font-bold text-[34px] text-ms-green-800 leading-none">{tier.monthly}</span>
        <span className="text-ms-ink-500 text-[13px] mb-1">{ar ? 'د.ك / شهر' : 'KWD / mo'}</span>
      </div>
      <p className={`text-[13px] text-ms-ink-500 mb-1 ${ar ? 'text-right' : ''}`}>
        {ar ? `+ ${tier.buildFee} د.ك إعداد (لمرة واحدة)` : `+ ${tier.buildFee} KWD setup (one-time)`}
      </p>
      <p className={`text-[12px] text-ms-ink-500 mb-5 font-mono ${ar ? 'text-right' : ''}`}>
        {tier.conversationsIncluded.toLocaleString()} {ar ? 'محادثة / شهر' : 'conversations / mo'}
      </p>

      <ul className="space-y-2 mb-6 flex-1">
        {features.map((f, i) => (
          <li key={i} className={`flex gap-2 text-[13px] text-ms-ink-700 ${ar ? 'flex-row-reverse text-right' : ''}`}>
            <span className="text-ms-gold-600 mt-0.5 flex-shrink-0">✓</span>
            <span className={ar ? 'font-arabic' : ''}>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="/discovery"
        className={`text-center font-bold text-[14px] px-5 py-3 rounded-lg transition-all duration-200 active:scale-[0.98] ${
          featured
            ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-400'
            : 'border border-ms-ink-900/15 text-ms-ink-900 hover:bg-ms-ink-900/[0.03]'
        } ${ar ? 'font-arabic' : ''}`}
      >
        {ar ? 'ابدأ' : 'Get started'}
      </a>
    </div>
  )
}

export default function TierCards() {
  const { lang } = useLang()
  const ar = lang === 'ar'
  return (
    <div dir={ar ? 'rtl' : 'ltr'}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch pt-3">
        {TIERS.map(t => (
          <TierCard key={t.id} tier={t} ar={ar} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-ms-ink-500">
        {(ar ? BASELINE.ar : BASELINE.en).map((b, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-ms-gold-600">●</span>
            <span className={ar ? 'font-arabic' : ''}>{b}</span>
          </span>
        ))}
      </div>

      <p className={`mt-4 text-center text-[13px] text-ms-ink-600 ${ar ? 'font-arabic' : ''}`}>
        <span className="text-ms-green-800 font-medium">{ar ? PILOT.ar.name : PILOT.en.name}</span>
        {' — '}
        {ar ? PILOT.ar.body : PILOT.en.body}
      </p>
    </div>
  )
}
