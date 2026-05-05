'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const BEFORE = [
  { en: 'Miss leads while sleeping',          ar: 'تفقد العملاء وأنت نائم' },
  { en: 'Manual WhatsApp follow-ups',         ar: 'متابعة واتساب يدوية' },
  { en: '4+ hours on admin daily',            ar: '٤+ ساعات إدارة يومياً' },
  { en: 'No-shows with no warning',           ar: 'حجوزات تُلغى بدون إشعار' },
  { en: 'Staff doing repetitive tasks',       ar: 'موظفون في مهام متكررة' },
]

const AFTER = [
  { en: 'AI responds in 3 seconds, 24/7',          ar: 'ذكاء اصطناعي يرد في 3 ثوانٍ، 24/7' },
  { en: 'Automated booking & confirmation',         ar: 'حجز وتأكيد تلقائي' },
  { en: '30 minutes admin max per day',             ar: '٣٠ دقيقة إدارة يومياً كحد أقصى' },
  { en: 'Smart reminders cut no-shows 60%',        ar: 'تذكيرات ذكية تقلل الغياب 60%' },
  { en: 'Staff fully focused on customers',         ar: 'موظفون منصبّون على العملاء' },
]

export default function BeforeAfter() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const isAr = lang === 'ar'

  return (
    <section className="bg-ms-ivory-0 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'قبل وبعد' : 'The Difference'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ink-900">
            {isAr ? 'حياتك قبل وبعد MindSync' : 'Before & After MindSync'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: prefersReduced ? 0 : 0, duration: 0.4 }}
            className="bg-red-50 border border-red-100 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-bold flex-shrink-0">✕</span>
              <h3 className="font-grotesk font-bold text-ms-ink-700">
                {isAr ? 'بدون أتمتة' : 'Without Automation'}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {BEFORE.map((item, i) => (
                <motion.li
                  key={item.en}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReduced ? 0 : 0.08 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-ms-ink-600"
                >
                  <span className="mt-0.5 text-red-400 flex-shrink-0 font-bold">✕</span>
                  {item[lang]}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.4 }}
            className="bg-ms-green-800/5 border border-ms-green-800/15 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-6 h-6 rounded-full bg-ms-green-800/15 flex items-center justify-center text-ms-green-800 text-xs font-bold flex-shrink-0">✓</span>
              <h3 className="font-grotesk font-bold text-ms-ink-700">
                {isAr ? 'مع MindSync AI' : 'With MindSync AI'}
              </h3>
            </div>
            <ul className="flex flex-col gap-3">
              {AFTER.map((item, i) => (
                <motion.li
                  key={item.en}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReduced ? 0 : 0.08 + i * 0.07, duration: 0.3 }}
                  className="flex items-start gap-3 text-sm text-ms-ink-600"
                >
                  <span className="mt-0.5 text-ms-green-800 flex-shrink-0 font-bold">✓</span>
                  {item[lang]}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
