'use client'
import { useLang } from '@/lib/lang'
import { trackCtaClicked } from '@/lib/conversation/analytics'

export default function SkipBar() {
  const { isAr, toggle } = useLang()

  return (
    <div
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-5 py-2.5 rounded-full text-[12px] mx-auto max-w-md backdrop-blur-xl"
      style={{
        background: 'rgba(6,14,9,0.75)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
      dir="ltr"
    >
      <a
        href="/discovery"
        onClick={() => trackCtaClicked('skipbar')}
        className="text-ms-gold-400 hover:text-ms-gold-500 font-mono font-medium tracking-wide transition-colors"
      >
        {isAr ? 'ابدأ الحين ←' : '→ Get Started Now'}
      </a>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="text-white/50 hover:text-white/80 transition-colors font-grotesk"
        >
          {isAr ? 'EN' : 'AR'}
        </button>
        <span className="text-white/20">·</span>
        <a
          href="/classic"
          onClick={() => trackCtaClicked('skipbar')}
          className="text-white/40 hover:text-white/70 transition-colors font-grotesk"
        >
          {isAr ? 'الموقع العادي ↑' : 'Classic ↑'}
        </a>
      </div>
    </div>
  )
}