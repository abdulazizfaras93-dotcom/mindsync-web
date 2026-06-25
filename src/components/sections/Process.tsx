// src/components/sections/Process.tsx
'use client'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { KineticText } from '@/components/motion'
import { PILOT } from '@/lib/data'

const ProcessMorph = dynamic(() => import('@/components/canvas/ProcessMorph'), { ssr: false })

const t = {
  eyebrow:    { en: 'How It Works',                          ar: 'شلون يشتغل النظام' },
  headline:   { en: 'From first message to live system.',    ar: 'من أول رسالة لنظام شغّال.' },
  sub: {
    en: `A clear process, a real timeline, and a paid ${PILOT.days}-day pilot on your real business so you see it work before you scale.`,
    ar: `خطوات واضحة، مواعيد حقيقية، وتجربة مدفوعة ${PILOT.days} يوم على مشروعك الحقيقي تشوف فيها النظام يشتغل قبل ما تكبّر.`,
  },
  trialBadge: { en: 'Pilot', ar: 'تجربة' },
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
      title: `${PILOT.days}-Day Pilot`,
      sub:   'A real agent, not a demo',
      desc:  `We build your actual AI agent on your real business data and run it live for ${PILOT.days} days (${PILOT.price} KWD). You see real results before you scale — and the ${PILOT.price} KWD is credited to your setup if you continue.`,
    },
    ar: {
      title: `تجربة ${PILOT.days} يوم`,
      sub:   'وكيل حقيقي، مو مجرد عرض',
      desc:  `نبني وكيلك الذكي الفعلي على بيانات مشروعك الحقيقية ونشغّله مباشرة لمدة ${PILOT.days} يوم (${PILOT.price} د.ك). تشوف نتائج حقيقية قبل ما تكبّر — ورسوم التجربة (${PILOT.price} د.ك) تُحتسب ضمن رسوم التأسيس إذا استمريت.`,
    },
    trial: true,
  },
  {
    num: '03',
    en: {
      title: 'Sign & Build',
      sub:   'Contract + full build',
      desc:  'After the pilot, you sign the agreement and pay the setup fee (from 155 KWD) and start your plan (from 79 KWD / mo). We finalize all integrations, agents, channels, and your client portal — tailored exactly to your needs.',
    },
    ar: {
      title: 'التوقيع والبناء',
      sub:   'عقد + بناء كامل',
      desc:  'بعد التجربة، توقّع الاتفاقية وتدفع رسوم التأسيس (من ١٥٥ د.ك) وتبدأ خطتك (من ٧٩ د.ك / شهر). نكمّل كل التكاملات، الوكلاء، القنوات، ولوحة التحكم — مخصصة بالكامل لك.',
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
  const prefersReduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 1])

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-ms-green-900 pattern-overlay">
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

          <KineticText
            text={t.headline[lang]}
            as="h2"
            delay={0.08}
            className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-4"
          />

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
            <ProcessMorph activeStep={activeStep} scrollProgress={scrollProgress} />
          </div>

          {/* Right: interactive step list */}
          <div className="divide-y divide-white/10">
            {STEPS.map((step, i) => {
              const s = lang === 'ar' ? step.ar : step.en
              const isActive = activeStep === i
              return (
                <motion.div
                  key={i}
                  initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative py-8 cursor-pointer pl-6 transition-all duration-200 rounded-sm ${
                    isActive
                      ? 'bg-ms-green-800/[0.06] border border-ms-green-800/[0.12]'
                      : 'border border-transparent'
                  }`}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(i)}
                >
                  {/* Left gold accent bar */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-colors duration-200 ${
                      isActive ? 'bg-ms-gold-600' : 'bg-transparent'
                    }`}
                    aria-hidden
                  />

                  <div className="flex gap-5 items-start">
                    {/* Step number label */}
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest shrink-0 mt-1.5 transition-colors duration-200 ${
                        isActive ? 'text-ms-gold-600' : 'text-ms-gold-600/35'
                      }`}
                    >
                      STEP {step.num}
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
                </motion.div>
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
