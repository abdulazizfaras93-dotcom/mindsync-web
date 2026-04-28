'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL, BUNDLES } from '@/lib/data'

export default function IndustryHero({ industryId }: { industryId: string }) {
  const { lang } = useLang()
  const bundle = BUNDLES.find(b => b.id === industryId)!

  const waMsg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، مهتم بـ${bundle.ar} — أريد عرض سعر.`
      : `Hi, I'm interested in ${bundle.en}. Please send me a quote.`
  )

  return (
    <section className="relative min-h-[70vh] hero-bg pattern-overlay flex flex-col justify-center pt-16">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-4">
            {bundle.industry[lang]}
          </p>
          <h1 className="text-[52px] md:text-[68px] font-bold tracking-tight leading-[1.05] mb-5">
            <span className="text-ms-ivory-0">
              {lang === 'ar' ? 'أتمتة ' : 'AI for '}
            </span>
            <span className="text-ms-gold-600">{bundle[lang === 'ar' ? 'ar' : 'en']}</span>
          </h1>
          <p className="text-white/80 text-[18px] leading-relaxed max-w-xl mb-4">
            {bundle.painStat[lang]}
          </p>
          <p className="text-white/60 text-[16px] leading-relaxed max-w-xl mb-10">
            {lang === 'ar'
              ? 'وكيل ذكاء اصطناعي مخصص لمجالك — واتساب، حجوزات، ومدفوعات — جاهز في ٧ أيام.'
              : 'A dedicated AI agent for your industry — WhatsApp, bookings, and payments — live in 7 days.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`${WHATSAPP_URL}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-ms-gold-600 text-ms-green-900 font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-ms-gold-400 transition-all inline-flex items-center gap-2"
            >
              {lang === 'ar' ? 'احصل على عرض سعر' : 'Get a Quote'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="/#demo"
              className="bg-white/15 text-ms-ivory-0 font-semibold text-[15px] px-8 py-4 rounded-xl border border-white/25 hover:bg-white/25 transition-all"
            >
              {lang === 'ar' ? 'جرّب العرض التجريبي' : 'See Live Demo'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}