'use client'
import { useLang } from '@/lib/lang'
import { WEBSITE_SERVICES, APP_SERVICES, ADDONS } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import TierCards from './TierCards'

const t = {
  eyebrow:  { en: 'Pricing',                          ar: 'التسعير' },
  headline: { en: 'Three tiers. Pick your level.',    ar: 'ثلاث مستويات. اختر اللي يناسبك.' },
  sub:      { en: 'From 79 KWD/mo — one platform, scaled to your business.', ar: 'من ٧٩ د.ك شهرياً — منصة واحدة، تكبر مع مشروعك.' },
  moreLabel:{ en: 'Add-ons, websites & apps',         ar: 'إضافات، مواقع وتطبيقات' },
  moreSub:  { en: 'Tailored to your project — priced after a quick consultation.', ar: 'مخصّصة لمشروعك — السعر يُحدد بعد مكالمة سريعة.' },
  onRequest:{ en: 'Upon request',                     ar: 'حسب الطلب' },
  cta:      { en: 'Request a quote',                  ar: 'اطلب عرض سعر' },
}

export default function Bundles() {
  const { lang } = useLang()
  const ar = lang === 'ar'
  const services = [...ADDONS, ...WEBSITE_SERVICES, ...APP_SERVICES]

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-12 text-center">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold font-grotesk text-ms-ink-900 tracking-tight leading-[1.0] mb-3">
            {t.headline[lang]}
          </h2>
          <p className={`text-ms-ink-500 text-[16px] max-w-md mx-auto leading-relaxed ${ar ? 'font-arabic' : ''}`}>
            {t.sub[lang]}
          </p>
        </div>

        {/* The 3 tiers */}
        <TierCards />

        {/* Add-ons, websites & apps — upon request */}
        <div className="mt-20 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8 text-center">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.moreLabel[lang]}
            </p>
            <p className={`text-ms-ink-500 text-[15px] max-w-xl mx-auto leading-relaxed ${ar ? 'font-arabic' : ''}`}>
              {t.moreSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" dir={ar ? 'rtl' : 'ltr'}>
            {services.map((svc) => (
              <a
                key={svc.id}
                href="/discovery"
                className={`group flex items-center justify-between gap-3 rounded-xl border border-ms-ink-900/12 bg-white px-5 py-4 hover:border-ms-gold-600/50 transition-all ${ar ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className={ar ? 'text-right' : ''}>
                  <p className={`text-[14px] font-semibold text-ms-ink-900 ${ar ? 'font-arabic' : ''}`}>
                    {ar ? svc.ar : svc.en}
                  </p>
                  <p className="text-[11px] text-ms-gold-600 font-mono mt-0.5">{t.onRequest[lang]}</p>
                </div>
                <ArrowRight size={15} strokeWidth={2} className={`text-ms-ink-300 group-hover:text-ms-gold-600 transition-colors shrink-0 ${ar ? 'rotate-180' : ''}`} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
