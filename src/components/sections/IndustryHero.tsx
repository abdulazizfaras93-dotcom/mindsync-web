'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useLang } from '@/lib/lang'
import type { Bundle } from '@/lib/data'

const t = {
  home:       { en: 'Home',        ar: 'الرئيسية' },
  industries: { en: 'Industries',  ar: 'القطاعات' },
  buildFee:   { en: 'Build fee',   ar: 'رسوم البناء' },
  from:       { en: 'Retainer from', ar: 'اشتراك يبدأ من' },
  kwd:        { en: 'KWD',         ar: 'د.ك' },
  mo:         { en: '/mo',         ar: '/شهر' },
  cta:        { en: 'Get Started — Free Trial',  ar: 'ابدأ — أسبوع مجاني' },
  delivery:   { en: '7-day delivery',             ar: 'جاهز في ٧ أيام' },
}

export default function IndustryHero({ bundle }: { bundle: Bundle }) {
  const { lang, isAr } = useLang()
  const smartRetainer = bundle.tiers.find(t => t.id === 'smart')?.retainer ?? 0

  return (
    <section className="relative min-h-[72vh] flex flex-col justify-center bg-ms-green-900 overflow-hidden pt-24 pb-20">

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ms-gold-600/60 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-white/40 font-mono mb-10">
          <a href="/" className="hover:text-white/70 transition-colors">{t.home[lang]}</a>
          <ChevronRight size={10} className={isAr ? 'rotate-180' : ''} />
          <span className="text-white/40">{t.industries[lang]}</span>
          <ChevronRight size={10} className={isAr ? 'rotate-180' : ''} />
          <span className="text-ms-gold-600">{bundle[isAr ? 'ar' : 'en']}</span>
        </nav>

        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-ms-gold-600 text-[11px] tracking-[0.22em] uppercase font-mono font-semibold">
              {bundle.industry[lang]}
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-ms-gold-600/30" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-[44px] md:text-[62px] font-bold text-ms-ivory-0 tracking-tight leading-[1.05] mb-6"
          >
            {bundle[isAr ? 'ar' : 'en']}
          </motion.h1>

          {/* Pain stat */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-white/65 text-[17px] md:text-[19px] leading-relaxed mb-10 max-w-2xl"
          >
            {bundle.painStat[lang]}
          </motion.p>

          {/* Pricing quick-view */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-6 mb-10 flex-wrap"
          >
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-0.5">{t.buildFee[lang]}</p>
              <p className="text-ms-ivory-0 text-[22px] font-bold">
                {bundle.buildFee} <span className="text-[13px] text-white/50 font-normal">{t.kwd[lang]}</span>
              </p>
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-0.5">{t.from[lang]}</p>
              <p className="text-ms-gold-600 text-[22px] font-bold">
                {smartRetainer} <span className="text-[13px] text-white/50 font-normal">{t.kwd[lang]}{t.mo[lang]}</span>
              </p>
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono mb-0.5">&nbsp;</p>
              <p className="text-ms-ivory-0/60 text-[13px] font-mono">{t.delivery[lang]}</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="/discovery"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-ms-gold-600 text-ms-green-900 text-[14px] font-bold hover:bg-ms-gold-500 transition-all duration-150 active:scale-[0.98]"
            >
              {t.cta[lang]}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            <a
              href="/#bundles"
              className="text-[13px] text-white/50 hover:text-white/80 transition-colors underline underline-offset-4"
            >
              {isAr ? 'قارن جميع القطاعات' : 'Compare all industries'}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
