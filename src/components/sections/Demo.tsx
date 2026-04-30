'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import { BUNDLES } from '@/lib/data'
import type { IndustryId } from '@/lib/demo-scripts'
import DemoChat from '@/components/ui/DemoChat'
import PortalPreview from '@/components/ui/PortalPreview'
import {
  Stethoscope, Scissors, Dumbbell, Wrench, UtensilsCrossed, Building2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  clinic:        Stethoscope,
  salon:         Scissors,
  gym:           Dumbbell,
  garage:        Wrench,
  restaurant:    UtensilsCrossed,
  'real-estate': Building2,
}

const t = {
  eyebrow:  { en: 'Live Demo',    ar: 'تجربة مباشرة' },
  headline: {
    en: 'Watch the system work',
    ar: 'شاهد النظام يعمل',
  },
  sub: {
    en: 'This is not a bot reading pre-written replies.\nThis is a custom software system, trained on your business, running 24/7.',
    ar: 'هذا ليس بوت يقرأ من قائمة جاهزة.\nهذا نظام برمجي مخصص، مدرَّب على عملك، يعمل ٢٤ ساعة.',
  },
}

export default function Demo() {
  const { lang, isAr } = useLang()
  const [selected, setSelected] = useState<IndustryId>('clinic')
  const bundle = BUNDLES.find((b) => b.id === selected)!

  return (
    <section id="demo" className="py-24 bg-ms-ivory-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-600 text-[16px] max-w-lg mx-auto leading-relaxed">
            {t.sub[lang].split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </p>
        </div>

        {/* Industry picker — with icons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {BUNDLES.map((b) => {
            const Icon = ICON_MAP[b.id] ?? Building2
            const isActive = b.id === selected
            return (
              <button
                key={b.id}
                onClick={() => setSelected(b.id as IndustryId)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-2 ${
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

        {/* Pain stat banner — swaps per industry */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-start gap-3 bg-ms-green-900/5 border border-ms-green-800/12 rounded-xl px-5 py-4">
            <span className="text-ms-gold-600 text-[18px] mt-0.5 shrink-0">⚠️</span>
            <p className="text-ms-ink-700 text-[14px] leading-relaxed font-medium">
              {bundle.painStat[lang]}
            </p>
          </div>
        </div>

        {/* Chat + portal preview */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <DemoChat industry={selected} bundleLabel={bundle[isAr ? 'ar' : 'en']} />
          <PortalPreview bundleName={{ en: bundle.en, ar: bundle.ar }} />
        </div>

      </div>
    </section>
  )
}
