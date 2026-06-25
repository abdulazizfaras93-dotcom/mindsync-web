'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: { en: 'What We Build', ar: 'اللي نبنيه' },
  h2:      { en: 'Custom AI — we build it and run it for you.', ar: 'ذكاء اصطناعي مخصص — نبنيه ونشغّله لك.' },
  sub: {
    en: 'We design, build, and run the operational layer your business is missing — so you focus on your work.',
    ar: 'نصمم، نبني، وندير الجزء التشغيلي اللي ناقص مشروعك — وأنت تركّز على شغلك.',
  },
  flagship: {
    eyebrow: { en: '01 / FLAGSHIP', ar: '01 / الرائد' },
    title:   { en: 'An AI agent built just for you', ar: 'وكيل ذكاء اصطناعي مبني خصيصاً لك' },
    desc: {
      en: 'Not a ready-made template. A fully programmed agent for your business, trained on exactly how you work. We deploy it on WhatsApp, your website, Instagram — or all three. It handles your entire customer communication.',
      ar: 'مو قالب جاهز. وكيل مبرمج بالكامل لمشروعك ومدرّب على أسلوبك بالضبط. ننشره على واتساب، موقعك، إنستقرام — أو الثلاثة. ويتولى التواصل مع عملائك كامل.',
    },
    included: { en: 'Included in every tier', ar: 'مشمول في كل الباقات' },
    price:    { en: 'from 79 KWD/mo', ar: 'من ٧٩ د.ك شهرياً' },
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
        ar: 'تذكيرات، متابعات، طلبات تقييم، واسترجاع العملاء اللي ما حضروا — كلها تشتغل تلقائياً.',
      },
      meta: { en: '10+ automations from day one', ar: '+١٠ أتمتة من اليوم الأول' },
    },
    {
      num: '04',
      title: { en: 'Website & App Builds', ar: 'المواقع والتطبيقات' },
      desc: {
        en: 'Bilingual marketing sites and apps that plug straight into your automation stack.',
        ar: 'مواقع وتطبيقات ثنائية اللغة تتكامل مباشرة مع منظومة الأتمتة.',
      },
      meta: { en: 'Optional add-on · after consultation', ar: 'إضافة اختيارية · بعد استشارة' },
    },
    {
      num: '05',
      title: { en: 'Monthly Maintenance',  ar: 'الصيانة الشهرية' },
      desc: {
        en: 'We monitor, debug, retrain, and grow the system every month. One account manager, not a ticket queue.',
        ar: 'نراقب، نصلح، نعيد التدريب، وننمّي النظام كل شهر. مسؤول حساب واحد، لا قائمة انتظار.',
      },
      meta: { en: 'Included · monthly retraining on your invoices', ar: 'مشمول · إعادة تدريب شهرية على فواتيرك ومستجدات مشروعك' },
    },
  ] as const,
}

export default function Services() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()

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
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-full bg-ms-green-900 rounded-2xl p-8 border-2 border-ms-ink-900 shadow-[6px_6px_0px_0px] shadow-ms-ink-900">
            <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 uppercase mb-3">
              {t.flagship.eyebrow[lang]}
            </p>
            <h3 className="text-ms-ivory-0 text-[28px] md:text-[34px] font-bold tracking-[-0.02em] leading-tight mb-3">
              {t.flagship.title[lang]}
            </h3>
            <p className="text-white/65 text-[15px] leading-relaxed max-w-2xl mb-8">
              {t.flagship.desc[lang]}
            </p>
            <div className="pt-5 border-t border-white/[0.12]">
              <span className="inline-block font-mono text-[12px] text-ms-gold-500 border border-ms-gold-600/30 px-4 py-1.5 rounded-full">
                {t.flagship.included[lang]} · {t.flagship.price[lang]}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: prefersReduced ? 0 : i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl shadow-[4px_4px_0px_0px] shadow-ms-ink-900 transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />
              <div className="relative p-7 flex flex-col h-full">
                <p className="font-mono text-[11px] tracking-[0.16em] text-ms-ink-400 uppercase mb-3">
                  {card.num}
                </p>
                <h3 className="text-ms-ink-900 text-[18px] font-bold leading-snug mb-2">
                  {card.title[lang]}
                </h3>
                <p className="text-ms-ink-600 text-[14px] leading-relaxed flex-1 mb-5">
                  {card.desc[lang]}
                </p>
                <p className="font-mono text-[11px] tracking-[0.06em] text-ms-gold-600 border-t border-ms-ivory-200 pt-4">
                  {card.meta[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
