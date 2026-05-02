'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick  = (now: number) => {
      const p    = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * to))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{val}</span>
}

const t = {
  eyebrow:        { en: 'AI Software Agency · Kuwait',   ar: 'شركة برمجيات وذكاء اصطناعي · الكويت' },
  headline:       { en: 'Your business deserves',        ar: 'مشروعك يستاهل' },
  headlineAccent: { en: 'to run without you.',           ar: 'يشتغل بدونك.' },
  sub: {
    en: 'We build your business a custom software system with AI agents — responding, booking, following up, and analyzing.\nFrom WhatsApp to your dashboard in 7 business days.',
    ar: 'نبني ونعلم نظاماً خصصناه ببرمجيات وذكاء اصطناعي —\nيرد، يحجز، يتابع، ويحلل.\nمن واتساب للوحة تحكم في ٧ أيام عمل.',
  },
  cta1:   { en: 'Fill in Discovery Form',  ar: 'استبيان لفهم طبيعة مشروعك' },
  cta2:   { en: 'See the Bundles',         ar: 'شوف الباقات' },
  stat1l: { en: 'Days to go live',         ar: 'أيام ونخلص الإعداد' },
  stat2l: { en: 'Industry bundles',        ar: 'باقات متخصصة' },
  stat3l: { en: 'Agent uptime',            ar: 'وقت التشغيل' },
  stat4l: { en: 'Data stays yours',        ar: 'البيانات محفوظة عندك' },
}

export default function Hero() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Brain scrolls at 0.4x speed — stays visible longer, creates depth
  const brainY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['0%', '22%']
  )
  // Text drifts slightly upward, reinforcing the depth separation
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['0%', '-8%']
  )

  const stats = [
    { count: 7,    suffix: '',  display: null,   label: t.stat1l[lang] },
    { count: 8,    suffix: '',  display: null,   label: t.stat2l[lang] },
    { count: null, suffix: '',  display: '24/7', label: t.stat3l[lang] },
    { count: 100,  suffix: '%', display: null,   label: t.stat4l[lang] },
  ]

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] hero-bg pattern-overlay pt-16 overflow-hidden">

      {/* 3-D Brain — full-bleed background, fades left so text stays readable */}
      <motion.div
        style={{ y: brainY }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {prefersReduced ? (
          <div className="absolute inset-0 bg-ms-green-900" />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/mindsync.mp4" type="video/mp4" />
          </video>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0F2E22 0%, #0F2E22 28%, rgba(15,46,34,0.82) 44%, rgba(15,46,34,0.35) 62%, transparent 78%)',
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0F2E22 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div className="min-h-[calc(100dvh-4rem)] flex items-center">

          {/* Text column — max 52% wide on desktop so brain shows on right */}
          <div className="w-full lg:max-w-[52%] py-20 lg:py-0 flex flex-col justify-center">

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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[58px] md:text-[72px] lg:text-[82px] font-bold tracking-[-0.02em] leading-[0.93] mb-6"
            >
              <span className="text-ms-ivory-0 block">{t.headline[lang]}</span>
              <motion.span
                className="text-ms-gold-600 block"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
              >
                {t.headlineAccent[lang]}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-white/65 text-[16px] leading-relaxed max-w-[480px] mb-10"
            >
              {t.sub[lang].split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="grid grid-cols-4 border-t border-white/10 pt-8"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.74 + i * 0.07 }}
                  className={`${i > 0 ? 'pl-5 border-l border-white/10' : ''}`}
                >
                  <p className="text-ms-gold-600 text-[24px] font-bold leading-none mb-1.5 font-mono tabular-nums">
                    {s.count !== null && s.count !== undefined
                      ? <><CountUp to={s.count} />{s.suffix}</>
                      : s.display}
                  </p>
                  <p className="text-white/40 text-[11px] leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

    </section>
  )
}
