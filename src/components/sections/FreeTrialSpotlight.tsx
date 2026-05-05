'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const GUARANTEES = [
  { en: 'Full setup — no partial delivery',              ar: 'إعداد كامل — بدون تسليم جزئي' },
  { en: 'Live on WhatsApp within 7 business days',       ar: 'شغّال على واتساب خلال 7 أيام عمل' },
  { en: 'Cancel anytime — zero lock-in',                 ar: 'إلغاء في أي وقت — بدون التزام' },
]

export default function FreeTrialSpotlight() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const isAr = lang === 'ar'

  return (
    <section className="bg-ms-green-900 py-28 relative overflow-hidden">
      {/* Large decorative 7 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-mono font-black text-ms-green-800/50 leading-none"
          style={{ fontSize: 'clamp(180px, 30vw, 380px)' }}>
          7
        </span>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-4">
            {isAr ? 'ابدأ بدون مخاطرة' : 'Zero Risk Start'}
          </p>

          <h2 className="font-grotesk font-black text-ms-ivory-0 leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            {isAr ? '٧ أيام مجاناً' : '7 Days Free'}
          </h2>

          <p className="text-ms-ivory-0/60 text-lg leading-relaxed mb-10 max-w-md mx-auto">
            {isAr
              ? 'نبني نظامك الذكي كاملاً وتشتغل أسبوع كامل بدون دفع. إذا ما أعجبك — لا شيء.'
              : 'We build your full AI system and you run it live for a week before paying anything. Not happy? Nothing owed.'}
          </p>

          <ul className="flex flex-col gap-3 mb-10 max-w-sm mx-auto text-start">
            {GUARANTEES.map((g, i) => (
              <motion.li
                key={g.en}
                initial={prefersReduced ? false : { opacity: 0, x: isAr ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.35 }}
                className="flex items-start gap-3"
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-ms-gold-600/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1.5 4l2.5 2.5 5-5" stroke="#BF8D38" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-ms-ivory-0/80 text-sm">{g[lang]}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/discovery"
            className="inline-block bg-ms-gold-600 hover:bg-ms-gold-500 text-ms-ink-900 font-grotesk font-bold text-sm px-8 py-4 rounded-xl transition-colors duration-200"
          >
            {isAr ? 'ابدأ تجربتك المجانية ←' : 'Start Your Free Trial →'}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
