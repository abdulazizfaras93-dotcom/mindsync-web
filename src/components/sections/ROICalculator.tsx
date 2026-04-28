'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const t = {
  eyebrow:   { en: 'ROI Calculator', ar: 'حاسبة العائد' },
  headline:  { en: 'How much is manual WhatsApp costing you?', ar: 'كم يكلّفك واتساب اليدوي؟' },
  sub:       { en: 'Move the sliders and see your estimated monthly savings.', ar: 'حرّك الأشرطة لترى توفيرك الشهري المتوقع.' },
  inquiries: { en: 'Customer messages per week', ar: 'رسائل العملاء أسبوعياً' },
  hours:     { en: 'Hours spent on WhatsApp per week', ar: 'ساعات على واتساب أسبوعياً' },
  savedHrs:  { en: 'Hours saved / month', ar: 'ساعة توفّر / شهر' },
  savedKwd:  { en: 'Staff cost saved / month', ar: 'توفير تكلفة موظف / شهر' },
  roiLabel:  { en: 'Annual ROI vs. build fee', ar: 'العائد السنوي مقابل رسم البناء' },
  cta:       { en: 'Get my free quote →', ar: 'احصل على عرض مجاني ←' },
  disclaimer:{ en: 'Based on 67% automation rate and 3 KWD/hr staff cost.', ar: 'بناءً على معدل أتمتة ٦٧٪ وتكلفة موظف ٣ د.ك/ساعة.' },
}

export default function ROICalculator() {
  const { lang } = useLang()
  const [msgs, setMsgs] = useState(80)
  const [hrs, setHrs] = useState(10)

  const automatable = Math.round(msgs * 0.67)
  const savedHrs = Math.round(hrs * 4 * 0.67)
  const savedKwd = savedHrs * 3
  const annualSavings = savedKwd * 12
  const roi = Math.round((annualSavings / 640) * 100)

  const waMsg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أريد حساب العائد لأعمالي. لديّ حوالي ${msgs} رسالة أسبوعياً وأقضي ${hrs} ساعات على واتساب.`
      : `Hi, I'd like to get a quote. I get ~${msgs} messages/week and spend ${hrs} hrs/week on WhatsApp.`
  )

  return (
    <section className="py-24 bg-ms-ivory-0">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">{t.headline[lang]}</h2>
          <p className="text-ms-ink-600 text-[16px] max-w-md mx-auto">{t.sub[lang]}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="bg-ms-ivory-100 rounded-2xl p-8 space-y-8"
          >
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-ms-ink-700 text-[14px] font-medium">{t.inquiries[lang]}</label>
                <span className="text-ms-green-800 font-bold text-[16px]">{msgs}</span>
              </div>
              <input
                type="range" min={10} max={500} step={10} value={msgs}
                onChange={e => setMsgs(+e.target.value)}
                className="w-full accent-ms-green-800 cursor-pointer"
              />
              <div className="flex justify-between text-ms-ink-400 text-[11px] mt-1">
                <span>10</span><span>500</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-ms-ink-700 text-[14px] font-medium">{t.hours[lang]}</label>
                <span className="text-ms-green-800 font-bold text-[16px]">{hrs}h</span>
              </div>
              <input
                type="range" min={1} max={40} step={1} value={hrs}
                onChange={e => setHrs(+e.target.value)}
                className="w-full accent-ms-green-800 cursor-pointer"
              />
              <div className="flex justify-between text-ms-ink-400 text-[11px] mt-1">
                <span>1h</span><span>40h</span>
              </div>
            </div>

            <p className="text-ms-ink-400 text-[12px]">{t.disclaimer[lang]}</p>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { label: t.savedHrs[lang], value: `${savedHrs}h`, sub: `${automatable} msgs handled by AI` },
              { label: t.savedKwd[lang], value: `${savedKwd} KWD`, sub: lang === 'ar' ? `${savedKwd * 12} د.ك سنوياً` : `${savedKwd * 12} KWD / year` },
              { label: t.roiLabel[lang], value: `${roi}%`, sub: lang === 'ar' ? 'خلال السنة الأولى' : 'in year one', highlight: true },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className={`rounded-2xl p-6 ${item.highlight ? 'bg-ms-green-900 text-ms-ivory-0' : 'bg-white border border-ms-ivory-200'}`}
              >
                <p className={`text-[12px] uppercase tracking-wider mb-1 ${item.highlight ? 'text-ms-gold-600' : 'text-ms-ink-500'}`}>{item.label}</p>
                <p className={`text-[36px] font-bold leading-none mb-1 ${item.highlight ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>{item.value}</p>
                <p className={`text-[13px] ${item.highlight ? 'text-white/60' : 'text-ms-ink-500'}`}>{item.sub}</p>
              </motion.div>
            ))}

            <a
              href={`${WHATSAPP_URL}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="block w-full bg-ms-gold-600 text-ms-green-900 font-bold text-[15px] py-4 rounded-xl text-center hover:bg-ms-gold-500 transition-colors"
            >
              {t.cta[lang]}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}