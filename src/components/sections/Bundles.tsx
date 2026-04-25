'use client'
import { useLang } from '@/lib/lang'
import { BUNDLES } from '@/lib/data'
import BundleCard from '@/components/ui/BundleCard'

const t = {
  eyebrow:  { en: 'Pricing',  ar: 'التسعير' },
  headline: { en: 'Pick the bundle that fits your business.', ar: 'اختر الباقة التي تناسب أعمالك.' },
  sub:      { en: 'One-time build fee + monthly retainer. Fixed KWD pricing. No surprises.', ar: 'رسم بناء لمرة واحدة + اشتراك شهري. تسعير ثابت بالدينار الكويتي. بدون مفاجآت.' },
}

export default function Bundles() {
  const { lang } = useLang()

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">{t.headline[lang]}</h2>
          <p className="text-ms-ink-600 text-[16px] max-w-md mx-auto leading-relaxed">{t.sub[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUNDLES.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              featured={bundle.id === 'clinic' || bundle.id === 'real-estate'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
