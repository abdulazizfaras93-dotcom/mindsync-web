'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { trackCtaClicked } from '@/lib/conversation/analytics'

export default function SkipBar() {
  const { isAr, toggle } = useLang()

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-2.5 rounded-full text-[12px] mx-auto max-w-md backdrop-blur-xl"
      style={{
        background: 'rgba(6,14,9,0.80)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      dir="ltr"
    >
      {/* Brand mark */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-ms-green-800 border border-ms-gold-600/40 overflow-hidden flex items-center justify-center flex-shrink-0">
          <img src="/logo.png" alt="MindSync" className="w-4 h-4 object-contain" draggable={false} />
        </div>
        <span className="font-grotesk font-bold text-white text-[12px] hidden xs:inline">MindSync</span>
      </div>

      {/* Primary CTA */}
      <a
        href="/discovery"
        onClick={() => trackCtaClicked('skipbar')}
        className="group flex items-center gap-1.5 text-ms-gold-400 hover:text-ms-gold-300 font-grotesk font-semibold tracking-wide transition-colors duration-150"
      >
        {isAr ? 'ابدأ الحين' : 'Get Started'}
        <svg
          width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-150 ${isAr ? 'group-hover:-translate-x-0.5 rotate-180' : 'group-hover:translate-x-0.5'}`}
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Language toggle with globe */}
        <button
          onClick={toggle}
          title={isAr ? 'Switch to English' : 'التبديل للعربية'}
          className="flex items-center gap-1 text-white/55 hover:text-white/90 transition-colors duration-150 font-grotesk group"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="text-[11px]">{isAr ? 'EN' : 'عر'}</span>
        </button>

        <span className="text-white/20">·</span>

        {/* Full site link */}
        <a
          href="/classic"
          onClick={() => trackCtaClicked('skipbar')}
          className="flex items-center gap-1 text-white/40 hover:text-white/75 transition-colors duration-150 font-grotesk"
          title={isAr ? 'الموقع الكامل' : 'Full website'}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span className="text-[11px]">{isAr ? 'الموقع' : 'Full Site'}</span>
        </a>
      </div>
    </motion.div>
  )
}