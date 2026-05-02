// src/components/sections/Process.tsx
'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const ProcessMorph = dynamic(() => import('@/components/canvas/ProcessMorph'), { ssr: false })

const t = {
  eyebrow:    { en: 'How It Works',                          ar: 'كيف يشتغل النظام' },
  headline:   { en: 'From first message to live system.',    ar: 'من أول رسالة لنظام شغّال.' },
  sub: {
    en: 'A clear process, a real timeline, and a free trial so you can see it work before you pay.',
    ar: 'خطوات واضحة، مواعيد حقيقية، وأسبوع تجربة مجانية تشوف فيه النظام يشتغل قبل ما تدفع.',
  },
  trialBadge: { en: 'Free', ar: 'مجانية' },
  footnote: {
    en: "We don't start building until tasks and channels are agreed in the discovery call.",
    ar: 'لا نبدأ بناء النظام إلا بعد الاتفاق على المهام والقنوات في مكالمة الاستكشاف.',
  },
}

const STEPS = [
  {
    num: '01',
    en: {
      title: 'Discovery Call',
      sub:   'Understanding your business',
      desc:  "We map your daily tasks, channels, pain points, and goals. You leave the call with a clear picture of exactly what we'll build.",
    },
    ar: {
      title: 'مكالمة الاستكشاف',
      sub:   'نفهم طبيعة مشروعك',
      desc:  'نحدد مهامك اليومية، قنواتك، مشاكلك، وأهدافك. تخرج من المكالمة بصورة واضحة لكل شي سنبنيه.',
    },
    trial: false,
  },
  {
    num: '02',
    en: {
      title: 'Free 1-Week Trial',
      sub:   'Try before you pay',
      desc:  'We build your actual AI system based on your real business data and run it live for 7 days. If you love it, we activate. If not — no charge, no questions.',
    },
    ar: {
      title: 'أسبوع تجربة مجانية',
      sub:   'جرّب قبل ما تدفع',
      desc:  'نبني نظامك الذكي الفعلي بناءً على بيانات مشروعك الحقيقية ونشغّله أسبوع كامل. إذا عجبك نفعّله — وإذا لا، ما في أي تكلفة.',
    },
    trial: true,
  },
  {
    num: '03',
    en: {
      title: 'Sign & Build',
      sub:   'Contract + full build',
      desc:  'After the trial, you sign the agreement and pay the build fee. We finalize all integrations, agents, channels, and your client portal — tailored exactly to your needs.',
    },
    ar: {
      title: 'التوقيع والبناء',
      sub:   'عقد + بناء كامل',
      desc:  'بعد التجربة، توقّع الاتفاقية وتدفع رسوم البناء. نكمّل كل التكاملات، الوكلاء، القنوات، ولوحة التحكم — مخصصة بالكامل لك.',
    },
    trial: false,
  },
  {
    num: '04',
    en: {
      title: 'Review & Fine-Tune',
      sub:   'Live rehearsal',
      desc:  'You send 10 real customer messages. We tune every response until it matches your tone, your answers, and your brand — perfectly.',
    },
    ar: {
      title: 'المراجعة والضبط',
      sub:   'تجربة حية',
      desc:  'ترسل ١٠ رسائل عملاء حقيقية. نضبط كل رد حتى يتطابق مع أسلوبك وإجاباتك وعلامتك التجارية — بشكل مثالي.',
    },
    trial: false,
  },
  {
    num: '05',
    en: {
      title: 'Launch + Monthly Care',
      sub:   'Go live — we stay with you',
      desc:  'Your system goes live on all chosen channels. You get full portal access. We monitor, update, and maintain everything monthly — you focus on your business.',
    },
    ar: {
      title: 'الإطلاق والصيانة الشهرية',
      sub:   'تشغيل — ونبقى معاك',
      desc:  'نظامك يشتغل على كل القنوات المختارة. تحصل على لوحة التحكم كاملة. نراقب ونحدّث ونصون كل شي شهرياً — وأنت تركّز على مشروعك.',
    },
    trial: false,
  },
]

export default function Process() {
  const { lang } = useLang()
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-4"
          >
            {t.headline[lang]}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-white/50 text-[16px] max-w-lg leading-relaxed"
          >
            {t.sub[lang]}
          </motion.p>
        </div>

        {/* 2-col grid: sticky canvas left, steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: sticky 3D canvas */}
          <div
            className="lg:sticky lg:top-[100px] aspect-square rounded-2xl overflow-hidden border border-white/[0.08]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(191,141,56,0.08), transparent 65%), #0A1F17',
            }}
            aria-hidden
          >
            <ProcessMorph activeStep={activeStep} />
          </div>

          {/* Right: interactive step list */}
          <div className="divide-y divide-white/10">
            {STEPS.map((step, i) => {
              const s = lang === 'ar' ? step.ar : step.en
              const isActive = activeStep === i
              return (
                <div
                  key={i}
                  className={`relative py-8 cursor-pointer border-l-[3px] pl-5 transition-all duration-200 ${
                    isActive ? 'border-ms-gold-600' : 'border-transparent'
                  }`}
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <div className="flex gap-6 items-start">
                    <span
                      className={`font-mono text-[36px] font-bold leading-none tabular-nums shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-ms-gold-600/50' : 'text-ms-gold-600/20'
                      }`}
                    >
                      {step.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-bold text-[18px] transition-colors duration-200 ${
                            isActive ? 'text-ms-ivory-0' : 'text-white/55'
                          }`}
                        >
                          {s.title}
                        </h3>
                        {step.trial && (
                          <span className="inline-block text-[9px] font-mono tracking-[0.15em] uppercase bg-ms-gold-600 text-ms-green-900 px-2 py-0.5 rounded-full font-bold shrink-0">
                            {t.trialBadge[lang]}
                          </span>
                        )}
                      </div>

                      <p className="text-ms-gold-600 text-[11px] font-mono tracking-widest uppercase mb-2">
                        {s.sub}
                      </p>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isActive ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-white/50 text-[14px] leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/25 text-[13px] mt-8 border-t border-white/10 pt-6"
        >
          {t.footnote[lang]}
        </motion.p>

      </div>
    </section>
  )
}
