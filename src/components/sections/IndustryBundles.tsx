'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import type { Vertical } from '@/lib/data'
import TierCards from './TierCards'

const t = {
  eyebrow:  { en: 'Pricing',                            ar: 'التسعير' },
  headline: { en: 'Three plans. Pick your pace.',       ar: 'ثلاث باقات. اختر اللي يناسبك.' },
  addonNote: {
    en: 'Website and mobile app builds are available as optional add-ons — quote on request.',
    ar: 'تصميم المواقع وتطبيقات الجوال متاحة كإضافات اختيارية — السعر حسب الطلب.',
  },
  addonCta: { en: 'Request a quote →', ar: 'احصل على عرض سعر ←' },
}

export default function IndustryBundles({ vertical }: { vertical: Vertical }) {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  const intro = isAr ? `باقات ${vertical.ar}` : `Plans for ${vertical.en}`

  return (
    <section id="bundles" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className={`text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 ${isAr ? 'font-arabic' : ''}`}>
            {t.eyebrow[lang]}
          </p>
          <h2 className={`text-[36px] md:text-[46px] font-bold text-ms-ink-900 tracking-tight leading-[1.05] mb-3 ${isAr ? 'font-arabic' : ''}`}>
            {t.headline[lang]}
          </h2>
          <p className={`text-ms-green-800 font-medium text-[15px] ${isAr ? 'font-arabic' : ''}`}>
            {intro}
          </p>
        </motion.div>

        {/* The 3 universal tiers + baseline + pilot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TierCards />
        </motion.div>

        {/* Add-on note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className={`text-ms-ink-500 text-[14px] leading-relaxed mb-2 ${isAr ? 'font-arabic' : ''}`}>
            {t.addonNote[lang]}
          </p>
          <a
            href="/discovery"
            className={`inline-flex items-center gap-1 text-[13px] font-medium text-ms-gold-600 hover:text-ms-gold-500 transition-colors ${isAr ? 'font-arabic' : ''}`}
          >
            {t.addonCta[lang]}
          </a>
        </motion.div>

      </div>
    </section>
  )
}
