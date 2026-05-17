'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useLang } from '@/lib/lang'
import { KineticText, MagneticButton } from '@/components/motion'

const NeuralMesh = dynamic(() => import('@/components/canvas/NeuralMesh'), { ssr: false })

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  // Start from near-final so animation is always visible even on load
  const startFrom = Math.max(0, to - Math.max(1, Math.round(to * 0.15)))

  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    const proxy = { val: startFrom }
    let anim: { revert: () => void } | null = null
    import('animejs').then(({ animate }) => {
      anim = animate(proxy, {
        val: to,
        duration,
        ease: 'outExpo',
        onUpdate: () => { el.textContent = String(Math.round(proxy.val)) },
      }) as { revert: () => void }
    })
    return () => { anim?.revert() }
  }, [inView, to, duration, startFrom])

  return <span ref={ref}>{startFrom}</span>
}

const t = {
  eyebrow:        { en: 'AI & Automation System · For Home Businesses in Kuwait',   ar: 'منظومة ذكاء اصطناعي وأتمتة · للمشاريع المنزلية بالكويت' },
  headline:       { en: 'You started your business from home.',                      ar: 'بدأت مشروعك من البيت' },
  headlineAccent: { en: 'You want it to grow — even while you sleep.',               ar: 'تبي مشروعك يكبر؟' },
  sub: {
    en: 'The intelligent system that replies, books, follows up,\nand analyzes — 24/7. Like having a full team, without one.',
    ar: 'المنظومة الذكية اللي ترد، تحجز، تتابع، وتحلل ٢٤/٧.\nكأن عندك فريق كامل — بدون فريق.',
  },
  cta1:   { en: 'Start Your Free Trial →',  ar: 'ابدأ تجربتك المجانية ←' },
  cta2:   { en: 'See How It Works',         ar: 'شوف شلون يشتغل' },
  stat1l: { en: 'Days to launch',           ar: 'أيام للإطلاق' },
  stat2l: { en: 'Complete system',          ar: 'منظومة شاملة' },
  stat3l: { en: 'Uptime',                   ar: 'وقت التشغيل' },
  stat4l: { en: 'Data ownership',           ar: 'البيانات تبقى لك' },
}

export default function Hero() {
  const { lang } = useLang()
  const prefersReduced = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const brainY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['0%', '22%']
  )
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['0%', '-8%']
  )

  // Mouse parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const meshX = useTransform(smoothX, v => v * -18)
  const meshY = useTransform(smoothY, v => v * -12)
  const textMX = useTransform(smoothX, v => v * 8)
  const textMY = useTransform(smoothY, v => v * 6)
  const ctaX = useTransform(smoothX, v => v * 14)
  const ctaY = useTransform(smoothY, v => v * 10)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width)
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height)
  }

  const stats = [
    { count: 7,    suffix: '',  display: null,   label: t.stat1l[lang] },
    { count: 1,    suffix: '',  display: null,   label: t.stat2l[lang] },
    { count: null, suffix: '',  display: '24/7', label: t.stat3l[lang] },
    { count: 100,  suffix: '%', display: null,   label: t.stat4l[lang] },
  ]

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] hero-bg pattern-overlay pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >

      {/* Video background with scroll parallax */}
      <motion.div
        style={{ y: brainY }}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/herobackground.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{ background: 'rgba(15,46,34,0.52)' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(15,46,34,0.5) 0%, rgba(15,46,34,0.25) 55%, transparent 100%)',
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0F2E22 100%)',
          }}
        />
      </motion.div>

      {/* Neural mesh — mouse parallax Layer 1 (deepest, slowest) */}
      <motion.div
        style={{ x: meshX, y: meshY }}
        className="absolute inset-0 hidden md:block opacity-60 pointer-events-none"
      >
        <NeuralMesh />
      </motion.div>

      {/* Content — scroll parallax + mouse parallax Layer 2 (mid) */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div className="min-h-[calc(100dvh-4rem)] flex items-center">

          {/* Text column */}
          <motion.div
            style={{ x: textMX, y: textMY }}
            className="w-full lg:max-w-[52%] py-20 lg:py-0 flex flex-col justify-center"
          >

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

            <div className="text-[58px] md:text-[72px] lg:text-[82px] font-bold tracking-[-0.02em] leading-[0.93] mb-6">
              <KineticText
                as="h1"
                text={t.headline[lang]}
                className="text-ms-ivory-0 block"
                delay={0.2}
              />
              <KineticText
                as="h1"
                text={t.headlineAccent[lang]}
                className="text-ms-gold-600 block"
                delay={0.38}
              />
            </div>

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

            {/* CTA — mouse parallax Layer 3 (fastest, closest) */}
            <motion.div
              style={{ x: ctaX, y: ctaY }}
              className="mb-14"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <MagneticButton href="/discovery">
                  <span className="bg-ms-gold-600 text-ms-green-900 font-bold text-[14px] px-7 py-3.5 rounded-lg hover:bg-ms-gold-400 transition-all duration-200 inline-flex items-center gap-2 active:scale-[0.98]">
                    {t.cta1[lang]}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </MagneticButton>
                <a
                  href="#process"
                  className="text-ms-ivory-0 font-medium text-[14px] px-7 py-3.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                  {t.cta2[lang]}
                </a>
              </motion.div>
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

          </motion.div>
        </div>
      </motion.div>

    </section>
  )
}
