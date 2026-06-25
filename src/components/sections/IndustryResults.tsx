'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { HOME_BUSINESS_CATEGORIES } from '@/lib/data'

export default function IndustryResults() {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const prefersReduced = useReducedMotion()

  return (
    <section className="bg-ms-ivory-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'نخدم كل المشاريع' : 'Every kind of business'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ink-900 mb-4">
            {isAr
              ? 'أي مشروع… وإحنا نكمّله.'
              : 'Any business — we complete it.'}
          </h2>
          <p className="text-ms-ink-500 text-[15px] max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'أي مشروع بالكويت — خدمي أو منتجات — نبني له النظام اللي يحتاجه.'
              : 'Any business in Kuwait — service or product — we build the system it needs.'}
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {HOME_BUSINESS_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.en}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: prefersReduced ? 0 : i * 0.04 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-ms-ivory-0 border-2 border-ms-ink-900 rounded-xl shadow-[3px_3px_0px_0px] shadow-ms-ink-900 transition-all duration-200 group-hover:shadow-[5px_5px_0px_0px] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              <div className="relative p-3 flex flex-col items-center gap-1.5 text-center">
                <span className="text-2xl leading-none select-none" role="img" aria-label={isAr ? cat.ar : cat.en}>
                  {cat.icon}
                </span>
                <span className="text-[11px] font-medium text-ms-ink-700 leading-tight">
                  {isAr ? cat.ar : cat.en}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Caption */}
        <p className="text-center text-ms-ink-400 text-[13px] font-mono mt-8">
          {isAr
            ? 'من أول رسالة لعميل… لين إدارة مشروعك كامل.'
            : 'From the first customer message… to running your whole business.'}
        </p>
      </div>
    </section>
  )
}
