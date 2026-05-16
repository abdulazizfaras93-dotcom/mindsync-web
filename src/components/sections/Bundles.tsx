'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import {
  MINDSYNC_COMPLETE, WEBSITE_SERVICES, APP_SERVICES, CUSTOM_BUNDLE, FREE_TRIAL,
} from '@/lib/data'
import { Check, ArrowRight, Globe, Smartphone } from 'lucide-react'

// ─── Copy ─────────────────────────────────────────────────────────────────────

const t = {
  eyebrow:   { en: 'Pricing',                                ar: 'التسعير' },
  headline:  { en: 'One price. Everything included.',        ar: 'سعر واحد. كل شي شامل.' },
  sub:       { en: 'No bundles, no tiers, no surprises.',    ar: 'بدون باقات، بدون طبقات، بدون مفاجآت.' },
  buildLabel:{ en: 'Setup',                                  ar: 'إعداد' },
  retLabel:  { en: 'Monthly subscription',                   ar: 'اشتراك شهري' },
  kwd:       { en: 'KWD',                                    ar: 'د.ك' },
  mo:        { en: '/ mo',                                   ar: '/ شهر' },
  included:  { en: 'Fully included:',                        ar: 'شامل بالكامل:' },
  fairUse:   { en: 'Additional usage (Fair Use):',           ar: 'الاستخدام الإضافي (Fair Use):' },
  cta:       { en: 'Start Your Free Trial →',               ar: 'ابدأ تجربتك المجانية ←' },

  // Website section
  webLabel:  { en: 'Website Design',                         ar: 'تصميم المواقع' },
  webSub:    { en: 'Professional bilingual websites — with or without AI.', ar: 'مواقع احترافية ثنائية اللغة — مع أو بدون ذكاء اصطناعي.' },
  webDays:   { en: (n: [number, number]) => `${n[0]}–${n[1]} days`, ar: (n: [number, number]) => `${n[0]}–${n[1]} يوم` },

  // App section
  appLabel:  { en: 'Mobile Apps',                            ar: 'تطبيقات الجوال' },
  appSub:    { en: 'iOS + Android apps — with or without AI.', ar: 'تطبيقات iOS + Android — مع أو بدون ذكاء اصطناعي.' },

  discovery: { en: 'Fill in Discovery Form',                 ar: 'استبيان لفهم طبيعة مشروعك' },
  customLabel:{ en: 'Price determined after a free consultation', ar: 'السعر يُحدد بعد مكالمة استشارة مجانية' },
  quoteOnly: { en: 'Quote on request',                       ar: 'السعر حسب الطلب' },
  quoteDesc: { en: 'Contact us for a custom quote',          ar: 'تواصل معنا للحصول على عرض سعر' },
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────

function PricingCard() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="relative group max-w-xl mx-auto"
    >
      {/* Shadow layer */}
      <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl shadow-[6px_6px_0px_0px] shadow-ms-ink-900 transition-all duration-300 group-hover:shadow-[10px_10px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />

      <div className="relative p-8 flex flex-col gap-6">
        {/* Product name */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ms-ink-400 mb-1">MindSync</p>
          <h3 className="font-bold text-[28px] text-ms-ink-900 tracking-tight">Complete</h3>
        </div>

        {/* Price block */}
        <div className="flex items-end gap-6 pb-6 border-b border-ms-ivory-200">
          <div className="text-center">
            <p className="font-mono text-[42px] font-bold text-ms-ink-900 leading-none">
              {MINDSYNC_COMPLETE.buildFee}
            </p>
            <p className="text-[12px] text-ms-ink-400 mt-1 font-mono">{t.kwd[lang]} · {t.buildLabel[lang]}</p>
          </div>
          <div className="text-ms-ink-400 text-[24px] font-light pb-2">+</div>
          <div className="text-center">
            <p className="font-mono text-[42px] font-bold text-ms-green-800 leading-none">
              {MINDSYNC_COMPLETE.retainer}
            </p>
            <p className="text-[12px] text-ms-ink-400 mt-1 font-mono">{t.kwd[lang]}{t.mo[lang]} · {t.retLabel[lang]}</p>
          </div>
        </div>

        {/* Included features */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ms-ink-400 mb-3">
            {t.included[lang]}
          </p>
          <ul className="space-y-2.5">
            {MINDSYNC_COMPLETE.features[lang].map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-ms-ink-900">
                  <Check size={9} strokeWidth={2.5} className="text-ms-green-800" />
                </span>
                <span className="text-[14px] leading-snug text-ms-ink-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fair use tiers */}
        <div className="bg-ms-ivory-100 rounded-xl p-4 border border-ms-ivory-200">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ms-ink-400 mb-2">
            {t.fairUse[lang]}
          </p>
          <ul className="space-y-1">
            {MINDSYNC_COMPLETE.usageTiers[lang].map((tier, i) => (
              <li key={i} className="font-mono text-[12px] text-ms-ink-600">{tier}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="/discovery"
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-ms-green-800 text-ms-ivory-0 text-[15px] font-bold border-2 border-ms-ink-900 shadow-[4px_4px_0px_0px] shadow-ms-ink-900 hover:shadow-[6px_6px_0px_0px] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
        >
          {t.cta[lang]}
          <ArrowRight size={15} strokeWidth={2} />
        </a>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Bundles() {
  const { lang, isAr } = useLang()

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold font-grotesk text-ms-ink-900 tracking-tight leading-[1.0] mb-3">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-500 text-[16px] max-w-md mx-auto leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* Single pricing card */}
        <PricingCard />

        {/* Free Trial Strip */}
        <div className="mt-10 rounded-2xl bg-ms-green-900 border border-ms-gold-600/25 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
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

        {/* Custom AI System tile */}
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

        {/* Website Design */}
        <div className="mt-20 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.webLabel[lang]}
            </p>
            <p className="text-ms-ink-500 text-[15px] max-w-xl leading-relaxed">
              {t.webSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WEBSITE_SERVICES.map((svc) => (
              <div key={svc.id} className="relative group transition-all duration-300">
                <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl shadow-[4px_4px_0px_0px] shadow-ms-ink-900 transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <div className="relative p-6 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-ms-ink-900 text-ms-green-800 shrink-0">
                      <Globe size={16} strokeWidth={1.75} />
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

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {svc.features[lang].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-ms-ink-900">
                          <Check size={9} strokeWidth={2.5} className="text-ms-green-800" />
                        </span>
                        <span className="text-[13px] leading-snug text-ms-ink-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <p className="text-[15px] font-semibold text-ms-ink-900">{t.quoteOnly[lang]}</p>
                    <p className="text-[11px] text-ms-ink-400 mt-0.5 font-mono">{t.quoteDesc[lang]}</p>
                  </div>

                  <a
                    href="/discovery"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border-2 border-ms-ink-900 bg-ms-ivory-0 text-ms-ink-900 shadow-[4px_4px_0px_0px] shadow-ms-ink-900 hover:shadow-[6px_6px_0px_0px] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
                  >
                    {t.discovery[lang]}
                    <ArrowRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Apps */}
        <div className="mt-16 pt-12 border-t border-ms-ivory-200">
          <div className="mb-8">
            <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-2">
              {t.appLabel[lang]}
            </p>
            <p className="text-ms-ink-500 text-[15px] max-w-xl leading-relaxed">
              {t.appSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {APP_SERVICES.map((svc) => (
              <div key={svc.id} className="relative group transition-all duration-300">
                <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-2xl shadow-[4px_4px_0px_0px] shadow-ms-ink-900 transition-all duration-300 group-hover:shadow-[8px_8px_0px_0px] group-hover:-translate-x-1 group-hover:-translate-y-1" />
                <div className="relative p-6 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-ms-ink-900 text-ms-green-800 shrink-0">
                      <Smartphone size={16} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold text-ms-ink-900 mb-0.5">
                        {svc[isAr ? 'ar' : 'en']}
                      </p>
                      <p className="text-[11px] text-ms-ink-400 font-mono">
                        {svc.deliveryDays[0]}–{svc.deliveryDays[1]}{' '}
                        {lang === 'ar' ? 'يوم' : 'days'}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {svc.features[lang].map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-0.5 shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full border-2 border-ms-ink-900">
                          <Check size={9} strokeWidth={2.5} className="text-ms-green-800" />
                        </span>
                        <span className="text-[13px] leading-snug text-ms-ink-600">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <p className="text-[15px] font-semibold text-ms-ink-900">{t.quoteOnly[lang]}</p>
                    <p className="text-[11px] text-ms-ink-400 mt-0.5 font-mono">{t.quoteDesc[lang]}</p>
                  </div>

                  <a
                    href="/discovery"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold border-2 border-ms-ink-900 bg-ms-ivory-0 text-ms-ink-900 shadow-[4px_4px_0px_0px] shadow-ms-ink-900 hover:shadow-[6px_6px_0px_0px] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
                  >
                    {t.discovery[lang]}
                    <ArrowRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
