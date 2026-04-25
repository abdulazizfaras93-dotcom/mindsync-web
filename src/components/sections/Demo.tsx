'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import { BUNDLES } from '@/lib/data'
import type { IndustryId } from '@/lib/demo-scripts'
import DemoChat from '@/components/ui/DemoChat'
import PortalPreview from '@/components/ui/PortalPreview'

const t = {
  eyebrow:  { en: 'Live Demo', ar: 'تجربة مباشرة' },
  headline: { en: 'See what your customers experience.', ar: 'شاهد ما يختبره عملاؤك.' },
  sub:      { en: 'Pick your industry. Watch the agent handle a real conversation — then ask your own question.', ar: 'اختر مجالك. شاهد الوكيل يتعامل مع محادثة حقيقية — ثم اسأل سؤالك بنفسك.' },
}

export default function Demo() {
  const { lang, isAr } = useLang()
  const [selected, setSelected] = useState<IndustryId>('clinic')
  const bundle = BUNDLES.find((b) => b.id === selected)!

  return (
    <section id="demo" className="py-24 bg-ms-ivory-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">{t.headline[lang]}</h2>
          <p className="text-ms-ink-600 text-[16px] max-w-lg mx-auto leading-relaxed">{t.sub[lang]}</p>
        </div>

        {/* Industry picker */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {BUNDLES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b.id as IndustryId)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-2 ${
                selected === b.id
                  ? 'bg-ms-green-800 text-ms-ivory-0 shadow-sm'
                  : 'bg-white text-ms-ink-600 border border-ms-ivory-200 hover:border-ms-green-800/30'
              }`}
            >
              {b[isAr ? 'ar' : 'en']}
            </button>
          ))}
        </div>

        {/* Hybrid chat + portal preview */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <DemoChat industry={selected} bundleLabel={bundle[isAr ? 'ar' : 'en']} />
          <PortalPreview bundleName={{ en: bundle.en, ar: bundle.ar }} />
        </div>
      </div>
    </section>
  )
}
