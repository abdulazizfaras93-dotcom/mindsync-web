'use client'
import { useLang } from '@/lib/lang'
import { BUNDLES, WEBSITE_SERVICES } from '@/lib/data'

const minBuildFee = Math.min(...BUNDLES.map(b => b.buildFee))
const minSmart    = Math.min(...BUNDLES.map(b => b.tiers.find(t => t.id === 'smart')!.retainer))
const minWebsite  = (() => {
  const p = WEBSITE_SERVICES[0].price
  return Array.isArray(p) ? p[0] : p
})()

const t = {
  eyebrow: { en: 'What We Build', ar: 'ما نبنيه' },
  h2:      { en: 'Four systems. One retainer.', ar: 'أربعة أنظمة. راتب واحد.' },
  sub: {
    en: 'We design, ship, and run the operational layer your business is missing.',
    ar: 'نصمّم، نبني، وندير الطبقة التشغيلية التي يفتقدها مشروعك.',
  },
  flagship: {
    eyebrow: { en: '01 / FLAGSHIP', ar: '01 / الرائد' },
    title:   { en: 'WhatsApp AI Receptionist', ar: 'المساعد الذكي على واتساب' },
    desc: {
      en: 'Books appointments, answers FAQs, qualifies leads, and escalates real ones to your phone. Speaks fluent Kuwaiti dialect and English — handles your whole inbox, never sleeps.',
      ar: 'يحجز المواعيد، يجيب على الأسئلة، يصفّي العملاء، ويحوّل المهم منهم لهاتفك. يتكلم الكويتي والإنجليزي — يدير صندوق الرسائل كله، 24/7.',
    },
    build:     { en: 'Build', ar: 'بناء' },
    run:       { en: 'Run',   ar: 'تشغيل' },
    fromLabel: { en: 'from',  ar: 'من' },
    currency:  { en: 'KWD',   ar: 'د.ك' },
    perMonth:  { en: '/ mo',  ar: '/ شهر' },
  },
  cards: [
    {
      num: '02',
      title: { en: 'Client Dashboard',     ar: 'لوحة التحكم' },
      desc: {
        en: 'See bookings, messages, and revenue at a glance. We host, secure, and maintain it.',
        ar: 'شوف حجوزاتك، رسائلك، وإيراداتك بلمحة. نحن نستضيفها ونؤمّنها.',
      },
      meta: { en: 'Included', ar: 'مشمول' },
    },
    {
      num: '03',
      title: { en: 'Workflow Automations', ar: 'أتمتة سير العمل' },
      desc: {
        en: 'Reminders, follow-ups, review requests, no-show recovery — all triggered automatically.',
        ar: 'تذكيرات، متابعات، طلبات تقييم، واسترداد الغائبين — كلها تشتغل تلقائياً.',
      },
      meta: { en: '10+ flows from day one', ar: '+١٠ سير عمل من اليوم الأول' },
    },
    {
      num: '04',
      title: { en: 'Website & App Builds', ar: 'المواقع والتطبيقات' },
      desc: {
        en: 'Bilingual marketing sites and apps that plug straight into your automation stack.',
        ar: 'مواقع وتطبيقات ثنائية اللغة تتكامل مباشرة مع منظومة الأتمتة.',
      },
      meta: { en: `from ${minWebsite} KWD build`, ar: `من ${minWebsite} د.ك بناءً` },
    },
    {
      num: '05',
      title: { en: 'Monthly Maintenance',  ar: 'الصيانة الشهرية' },
      desc: {
        en: 'We monitor, debug, retrain, and grow the system every month. One account manager, not a ticket queue.',
        ar: 'نراقب، نصلح، نعيد التدريب، وننمّي النظام كل شهر. مسؤول حساب واحد، لا قائمة انتظار.',
      },
      meta: { en: `from ${minSmart} KWD / mo`, ar: `من ${minSmart} د.ك / شهر` },
    },
  ] as const,
}

export default function Services() {
  const { lang } = useLang()

  return (
    <section id="services" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ink-900 tracking-[-0.02em] leading-[0.95] mb-4">
            {t.h2[lang]}
          </h2>
          <p className="text-ms-ink-600 text-[17px] max-w-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* Flagship banner */}
        <div className="w-full bg-ms-green-900 rounded-2xl p-8 mb-4 border border-ms-green-900 hover:border-ms-gold-600 transition-colors duration-300">
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 uppercase mb-3">
            {t.flagship.eyebrow[lang]}
          </p>
          <h3 className="text-ms-ivory-0 text-[28px] md:text-[34px] font-bold tracking-[-0.02em] leading-tight mb-3">
            {t.flagship.title[lang]}
          </h3>
          <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl mb-8">
            {t.flagship.desc[lang]}
          </p>
          <div className="flex flex-wrap gap-6 pt-5 border-t border-white/[0.12] font-mono text-[12px] text-white/50">
            <span>
              {t.flagship.build[lang]} · <span className="text-ms-gold-500">{t.flagship.fromLabel[lang]} {minBuildFee} {t.flagship.currency[lang]}</span>
            </span>
            <span>
              {t.flagship.run[lang]} · <span className="text-ms-gold-500">{t.flagship.fromLabel[lang]} {minSmart} {t.flagship.currency[lang]} {t.flagship.perMonth[lang]}</span>
            </span>
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.cards.map((card) => (
            <div
              key={card.num}
              className="bg-white border border-ms-ink-200 rounded-2xl p-7 flex flex-col hover:border-ms-green-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-ms-ink-400 uppercase mb-3">
                {card.num}
              </p>
              <h3 className="text-ms-ink-900 text-[18px] font-bold leading-snug mb-2">
                {card.title[lang]}
              </h3>
              <p className="text-ms-ink-600 text-[14px] leading-relaxed flex-1 mb-5">
                {card.desc[lang]}
              </p>
              <p className="font-mono text-[11px] tracking-[0.06em] text-ms-gold-600 border-t border-ms-ink-100 pt-4">
                {card.meta[lang]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
