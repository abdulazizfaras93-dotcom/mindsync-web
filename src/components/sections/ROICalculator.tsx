'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

// Average build fee across all 8 bundles (used for ROI baseline)
const AVG_BUILD_FEE = 340  // (250+300+300+320+300+380+400+450) / 8 â 338 â 340
const STAFF_COST_PER_HR = 5 // KWD/hr â realistic Kuwait SMB rate
const AUTOMATION_RATE = 0.70 // 70% of messages automatable

const t = {
  eyebrow:    { en: 'ROI Calculator',                                ar: 'حاسبة العائد المادي' },
  headline:   { en: 'How much is manual messaging costing you?',    ar: 'شكثر تكلّفك الرسائل اليدوية؟' },
  sub:        { en: 'Move the sliders — see your real monthly savings.', ar: 'حرّك الأشرطة — شوف توفيرك الشهري الحقيقي.' },
  inquiries:  { en: 'Customer messages per week',                    ar: 'رسائل العملاء أسبوعياً' },
  hours:      { en: 'Hours spent on messages per week',              ar: 'ساعات تقضيها على الرسائل أسبوعياً' },
  savedHrs:   { en: 'Hours saved / month',                          ar: 'ساعة توفير / شهر' },
  savedKwd:   { en: 'Staff cost saved / month',                      ar: 'توفير تكلفة موظف / شهر' },
  roiLabel:   { en: 'Annual ROI vs. average build fee',             ar: 'العائد السنوي مقابل متوسط رسوم البناء' },
  disclaimer: {
    en: `Based on ${Math.round(AUTOMATION_RATE * 100)}% automation rate and ${STAFF_COST_PER_HR} KWD/hr staff cost.`,
    ar: `بناءً على معدل أتمتة ${Math.round(AUTOMATION_RATE * 100)}٪ وتكلفة موظف ${STAFF_COST_PER_HR} د.ك/ساعة.`,
  },
  autoHandled: {
    en: (n: number) => `${n} msgs handled by AI / week`,
    ar: (n: number) => `${n} رسالة يتولاها الذكاء الاصطناعي / أسبوع`,
  },
  annualSavings: {
    en: (n: number) => `${n} KWD saved / year`,
    ar: (n: number) => `${n} د.ك توفير / سنة`,
  },
  yearOne: { en: 'in year one', ar: 'خلال السنة الأولى' },
}

export default function ROICalculator() {
  const { lang } = useLang()
  const [msgs, setMsgs] = useState(80)
  const [hrs, setHrs]   = useState(10)

  const autoHandled   = Math.round(msgs * AUTOMATION_RATE)
  const savedHrs      = Math.round(hrs * 4 * AUTOMATION_RATE)       // per month
  const savedKwd      = Math.round(savedHrs * STAFF_COST_PER_HR)    // KWD/month
  const annualSavings = savedKwd * 12
  const roi           = Math.round((annualSavings / AVG_BUILD_FEE) * 100)

  const results = [
    {
      label:     t.savedHrs[lang],
      value:     `${savedHrs}h`,
      sub:       typeof t.autoHandled[lang] === 'function'
                   ? (t.autoHandled[lang] as (n: number) => string)(autoHandled)
                   : '',
      highlight: false,
    },
    {
      label:     t.savedKwd[lang],
      value:     `${savedKwd} KWD`,
      sub:       typeof t.annualSavings[lang] === 'function'
                   ? (t.annualSavings[lang] as (n: number) => string)(annualSavings)
                   : '',
      highlight: false,
    },
    {
      label:     t.roiLabel[lang],
      value:     `${roi}%`,
      sub:       t.yearOne[lang],
      highlight: true,
    },
  ]

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
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ink-600 text-[16px] max-w-md mx-auto">
            {t.sub[lang]}
          </p>
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
            {/* Messages slider */}
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

            {/* Hours slider */}
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
            {results.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className={`rounded-2xl p-6 ${
                  item.highlight
                    ? 'bg-ms-green-900 text-ms-ivory-0'
                    : 'bg-white border border-ms-ivory-200'
                }`}
              >
                <p className={`text-[12px] uppercase tracking-wider mb-1 ${
                  item.highlight ? 'text-ms-gold-600' : 'text-ms-ink-500'
                }`}>
                  {item.label}
                </p>
                <p className={`text-[36px] font-bold leading-none mb-1 ${
                  item.highlight ? 'text-ms-gold-600' : 'text-ms-green-800'
                }`}>
                  {item.value}
                </p>
                <p className={`text-[13px] ${item.highlight ? 'text-white/60' : 'text-ms-ink-500'}`}>
                  {item.sub}
                </p>
              </motion.div>
            ))}

            <a
              href="/discovery"
              className="block w-full bg-ms-gold-600 text-ms-green-900 font-bold text-[15px] py-4 rounded-xl text-center hover:bg-ms-gold-500 transition-colors"
            >
              {lang === 'ar' ? 'استبيان لفهم طبيعة مشروعك' : 'Fill in Discovery Form'}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
