'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/lang'

const NeuralGlobe = dynamic(() => import('@/components/canvas/NeuralGlobe'), { ssr: false })

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])
  return <span ref={ref}>{val}</span>
}

const t = {
  eyebrow:        { en: 'AI Software Agency · Kuwait', ar: 'شركة برمجيات وذكاء اصطناعي · الكويت' },
  headline:       { en: 'Your business deserves',      ar: 'مشروعك يستاهل' },
  headlineAccent: { en: 'to run without you.',         ar: 'يشتغل بدونك.' },
  sub: {
    en: 'We build your business a custom software system with AI agents — responding, booking, following up, and analyzing.\nFrom WhatsApp to your dashboard in 7 business days.',
    ar: 'نبني ونعلم نظاماً خصصناه ببرمجيات وذكاء اصطناعي —\nيرد، يحجز، يتابع، ويحلل.\nمن واتساب للوحة تحكم في ٧ أيام عمل.',
  },
  cta1:   { en: 'Fill in Discovery Form', ar: 'استبيان لفهم طبيعة مشروعك' },
  cta2:   { en: 'See the Bundles',  ar: 'شوف الباقات' },
  stat1l: { en: 'Days to go live',  ar: 'أيام ونخلص الإعداد' },
  stat2l: { en: 'Industry bundles', ar: 'باقات متخصصة' },
  stat3l: { en: 'Agent uptime',     ar: 'وقت التشغيل' },
  stat4l: { en: 'Data stays yours', ar: 'البيانات محفوظة عندك' },
}

export default function Hero() {
  const { lang } = useLang()

  const stats = [
    { count: 7,    suffix: '',  display: null,   label: t.stat1l[lang] },
    { count: 8,    suffix: '',  display: null,   label: t.stat2l[lang] },
    { count: null, suffix: '',  display: '24/7', label: t.stat3l[lang] },
    { count: 100,  suffix: '%', display: null,   label: t.stat4l[lang] },
  ]

  return (
    <section className="relative min-h-[100dvh] hero-bg pattern-overlay pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] min-h-[calc(100dvh-4rem)] items-center">

          {/* LEFT: Content */}
          <div className="py-20 lg:py-0 lg:pr-16 flex flex-col justify-center">

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-6 h-px bg-ms-gold-600 shrink-0" />
              <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium">
                {t.eyebrow[lang]}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[58px] md:text-[72px] lg:text-[82px] font-bold tracking-[-0.02em] leading-[0.93] mb-6"
            >
              <span className="text-ms-ivory-0 block">{t.headline[lang]}</span>
              <span className="text-ms-gold-600 block">{t.headlineAccent[lang]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="text-white/65 text-[16px] leading-relaxed max-w-[480px] mb-10"
            >
              {t.sub[lang].split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <a
                href="/discovery"
                className="bg-ms-gold-600 text-ms-green-900 font-bold text-[14px] px-7 py-3.5 rounded-lg hover:bg-ms-gold-400 transition-all duration-200 inline-flex items-center gap-2 active:scale-[0.98]"
              >
                {t.cta1[lang]}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#bundles"
                className="text-ms-ivory-0 font-medium text-[14px] px-7 py-3.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                {t.cta2[lang]}
              </a>
            </motion.div>

            {/* Stats — horizontal rule with dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="grid grid-cols-4 border-t border-white/10 pt-8"
            >
              {stats.map((s, i) => (
                <div key={i} className={`${i > 0 ? 'pl-5 border-l border-white/10' : ''}`}>
                  <p className="text-ms-gold-600 text-[24px] font-bold leading-none mb-1.5 font-mono tabular-nums">
                    {s.count !== null && s.count !== undefined
                      ? <><CountUp to={s.count} />{s.suffix}</>
                      : s.display}
                  </p>
                  <p className="text-white/40 text-[11px] leading-tight">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Globe (desktop only) */}
          <div className="hidden lg:block relative self-stretch">
            <div className="sticky top-16 h-[calc(100dvh-4rem)] w-full">
              <NeuralGlobe />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
