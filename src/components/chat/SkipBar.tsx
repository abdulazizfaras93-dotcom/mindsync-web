'use client'
import { useLang } from '@/lib/lang'
import { trackCtaClicked } from '@/lib/conversation/analytics'

export default function SkipBar() {
  const { isAr, toggle } = useLang()

  const handleSkip = () => {
    trackCtaClicked('skipbar')
    window.location.href = '/classic'
  }

  return (
    <div
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-4 py-2.5
        bg-ms-green-900/95 backdrop-blur-sm
        border-b border-white/10
        text-[12px]
      `}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <a
        href="/discovery"
        className="text-ms-gold-400 hover:text-ms-gold-400/80 font-mono font-medium tracking-wide transition-colors"
      >
        {isAr ? 'ابدأ الآن ←' : '→ Get Started Now'}
      </a>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-white/50 hover:text-white/80 transition-colors font-grotesk"
        >
          {isAr ? 'EN' : 'AR'}
        </button>
        <span className="text-white/20">·</span>
        <button
          onClick={handleSkip}
          className="text-white/50 hover:text-white/80 transition-colors font-grotesk"
        >
          {isAr ? 'الموقع الكلاسيكي' : 'Classic site'}
        </button>
      </div>
    </div>
  )
}
