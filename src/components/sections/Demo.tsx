'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'
import type { IndustryId } from '@/lib/demo-scripts'
import DemoChat from '@/components/ui/DemoChat'
import PortalPreview from '@/components/ui/PortalPreview'
import {
  Stethoscope, Scissors, Sparkles, Dumbbell, Wrench,
  UtensilsCrossed, Building2, Home,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type IndustryDemo = {
  id: IndustryId
  en: string
  ar: string
  icon: LucideIcon
  painStat: { en: string; ar: string }
}

const INDUSTRIES_DEMO: IndustryDemo[] = [
  {
    id: 'clinic',
    en: 'Clinic AI',
    ar: 'العيادة الذكية',
    icon: Stethoscope,
    painStat: {
      en: 'Clinics lose 30–40% of patients to missed calls and slow follow-ups.',
      ar: 'العيادات تخسر ٣٠–٤٠٪ من المرضى بسبب المكالمات الفائتة والمتابعة البطيئة.',
    },
  },
  {
    id: 'salon',
    en: 'Salon AI',
    ar: 'الصالون الذكي',
    icon: Scissors,
    painStat: {
      en: 'Salons lose 25% of bookings to unanswered WhatsApp messages.',
      ar: 'الصالونات تخسر ٢٥٪ من حجوزاتها بسبب رسائل واتساب بدون رد.',
    },
  },
  {
    id: 'spa',
    en: 'Spa AI',
    ar: 'السبا الذكي',
    icon: Sparkles,
    painStat: {
      en: 'Spas miss 35% of potential bookings from late-night and off-hour inquiries.',
      ar: 'السبا يفقد ٣٥٪ من حجوزاته المحتملة من استفسارات المساء وخارج أوقات الدوام.',
    },
  },
  {
    id: 'gym',
    en: 'Gym AI',
    ar: 'الجيم الذكي',
    icon: Dumbbell,
    painStat: {
      en: 'Gyms spend 2+ hours daily on membership inquiries that never convert.',
      ar: 'الجيم يضيّع أكثر من ساعتين يومياً في استفسارات اشتراكات لا تتحول لعملاء.',
    },
  },
  {
    id: 'garage',
    en: 'Garage AI',
    ar: 'الورشة الذكية',
    icon: Wrench,
    painStat: {
      en: 'Garage owners spend 2+ hours a day on status update calls they could automate.',
      ar: 'أصحاب الورش يقضون أكثر من ساعتين يومياً في مكالمات تحديثات يمكن أتمتتها.',
    },
  },
  {
    id: 'restaurant',
    en: 'Restaurant AI',
    ar: 'المطعم الذكي',
    icon: UtensilsCrossed,
    painStat: {
      en: 'Restaurants lose 20% of reservation requests during peak hours when staff is too busy to reply.',
      ar: 'المطاعم تخسر ٢٠٪ من طلبات الحجز أوقات الذروة لما الفريق مشغول ما يقدر يرد.',
    },
  },
  {
    id: 'real-estate',
    en: 'Real Estate AI',
    ar: 'العقارات الذكية',
    icon: Building2,
    painStat: {
      en: 'Real estate brokers miss 40% of leads because responses take more than 30 minutes.',
      ar: 'وسطاء العقارات يفقدون ٤٠٪ من العملاء المحتملين لأن الرد يتأخر أكثر من ٣٠ دقيقة.',
    },
  },
  {
    id: 'home-business',
    en: 'Home Business AI',
    ar: 'المشروع المنزلي الذكي',
    icon: Home,
    painStat: {
      en: 'Home business owners spend 5–6 hours daily managing WhatsApp orders manually.',
      ar: 'أصحاب المشاريع المنزلية يقضون ٥–٦ ساعات يومياً في إدارة طلبات واتساب يدوياً.',
    },
  },
]

const t = {
  eyebrow:  { en: 'Live Demo',                ar: 'تجربة مباشرة' },
  headline: { en: 'Watch the system work',    ar: 'شوف شلون النظام يشتغل' },
  sub: {
    en: 'This is not a bot reading pre-written replies.\nThis is a custom AI system, trained on your business, running 24/7.',
    ar: 'هذا مو بوت يقرأ من قائمة جاهزة.\nنظام ذكاء اصطناعي مخصص، مدرَّب على مشروعك، يشتغل ٢٤/٧.',
  },
}

export default function Demo() {
  const { lang, isAr } = useLang()
  const [selected, setSelected] = useState<IndustryId>('clinic')
  const industry = INDUSTRIES_DEMO.find((i) => i.id === selected)!

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

        {/* Industry picker */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {INDUSTRIES_DEMO.map((ind) => {
            const Icon     = ind.icon
            const isActive = ind.id === selected
            return (
              <button
                key={ind.id}
                onClick={() => setSelected(ind.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-ms-green-800 text-ms-ivory-0 shadow-sm'
                    : 'bg-white text-ms-ink-600 border border-ms-ivory-200 hover:border-ms-green-800/30 hover:text-ms-green-800'
                }`}
              >
                <Icon size={13} strokeWidth={1.75} />
                {isAr ? ind.ar : ind.en}
              </button>
            )
          })}
        </div>

        {/* Pain stat banner */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-start gap-3 bg-ms-green-900/5 border border-ms-green-800/12 rounded-xl px-5 py-4">
            <span className="text-ms-gold-600 text-[18px] mt-0.5 shrink-0">⚠️</span>
            <p className="text-ms-ink-700 text-[14px] leading-relaxed font-medium">
              {industry.painStat[lang]}
            </p>
          </div>
        </div>

        {/* Chat + portal preview */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <DemoChat industry={selected} bundleLabel={isAr ? industry.ar : industry.en} />
          <PortalPreview bundleName={{ en: industry.en, ar: industry.ar }} />
        </div>

      </div>
    </section>
  )
}
