'use client'
import { ArrowRight, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { MINDSYNC_COMPLETE } from '@/lib/data'
import type { Bundle } from '@/lib/data'

const t = {
  eyebrow:   { en: 'Pricing',                        ar: 'التسعير' },
  headline:  { en: 'One price. Everything included.', ar: 'سعر واحد. كل شي شامل.' },
  buildLabel:{ en: 'Setup',                           ar: 'إعداد' },
  retLabel:  { en: 'Monthly subscription',            ar: 'اشتراك شهري' },
  kwd:       { en: 'KWD',                             ar: 'د.ك' },
  mo:        { en: '/ mo',                            ar: '/ شهر' },
  included:  { en: 'Fully included:',                 ar: 'شامل بالكامل:' },
  fairUse:   { en: 'Additional usage (Fair Use):',    ar: 'الاستخدام الإضافي (Fair Use):' },
  cta:       { en: 'Start Your Free Trial →',         ar: 'ابدأ تجربتك المجانية ←' },
  addonNote: {
    en: 'Website and mobile app builds are available as optional add-ons — quote on request.',
    ar: 'تصميم المواقع وتطبيقات الجوال متاحة كإضافات اختيارية — السعر حسب الطلب.',
  },
  addonCta:  { en: 'Request a quote →', ar: 'احصل على عرض سعر ←' },
  problem:   { en: 'The Problem',       ar: 'المشكلة' },
  solution:  { en: 'The Solution',      ar: 'الحل' },
}

export default function IndustryBundles({ bundle }: { bundle: Bundle }) {
  const { lang } = useLang()

  return (
    <section className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[36px] md:text-[46px] font-bold text-ms-ink-900 tracking-tight leading-[1.05] mb-3">
            {t.headline[lang]}
          </h2>
        </motion.div>

        {/* Pain scenario */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-12 max-w-3xl mx-auto text-center"
        >
          <p className="font-mono text-ms-gold-600 text-[15px] md:text-[17px] font-semibold leading-snug whitespace-pre-line">
            {bundle.scenario.painHeadline[lang]}
          </p>
          <p className="text-ms-green-800 font-medium text-[14px] mt-2">
            {bundle.scenario.painSolution[lang]}
          </p>
        </motion.div>

        {/* Single MindSync Complete card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
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

        {/* Add-on note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-ms-ink-500 text-[14px] leading-relaxed mb-2">
            {t.addonNote[lang]}
          </p>
          <a
            href="/discovery"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-ms-gold-600 hover:text-ms-gold-500 transition-colors"
          >
            {t.addonCta[lang]}
          </a>
        </motion.div>

      </div>
    </section>
  )
}
