'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AIBubble from '../AIBubble'
import ChipButton from '../ChipButton'
import { STAGE4_INTRO } from '@/lib/conversation/scripts'
import { MINDSYNC_COMPLETE } from '@/lib/data'
import { trackCtaClicked } from '@/lib/conversation/analytics'

interface Props {
  isAr: boolean
  onNext: () => void
}

const FEATURES: { en: string; ar: string }[] = [
  { ar: 'كل البنية التحتية مشمولة (AI APIs + WhatsApp + Hosting)', en: 'All infrastructure included (AI APIs + WhatsApp + Hosting)' },
  { ar: '١٬٠٠٠ محادثة شهرياً مشمولة', en: '1,000 conversations / month included' },
  { ar: 'Setup + إدارة شهرية + إعادة تدريب', en: 'Setup + monthly management + retraining' },
  { ar: 'أسبوع تجربة مجاناً', en: 'Free first week trial' },
]

export default function Stage4Pricing({ isAr, onNext }: Props) {
  const [showCard, setShowCard] = useState(false)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), 400)
    const t2 = setTimeout(() => setShowActions(true), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <AIBubble content={isAr ? STAGE4_INTRO.ar : STAGE4_INTRO.en} isAr={isAr} />

      {showCard && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-sm"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="rounded-2xl overflow-hidden border border-ms-ivory-200 shadow-md bg-white">
            {/* Header */}
            <div className="bg-ms-green-800 px-5 py-5">
              <p className="text-ms-gold-400 font-mono text-[10px] tracking-widest uppercase mb-3">
                {MINDSYNC_COMPLETE.name.en}
              </p>
              {/* Dual price display */}
              <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <div className={`flex items-baseline gap-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white font-grotesk font-bold text-3xl">{MINDSYNC_COMPLETE.buildFee}</span>
                    <span className="text-white/60 text-sm">{isAr ? 'د.ك' : 'KWD'}</span>
                  </div>
                  <p className={`text-white/50 text-[11px] mt-0.5 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
                    {isAr ? 'إعداد' : 'one-time setup'}
                  </p>
                </div>
                <div className="text-white/30 text-2xl font-light mt-1">+</div>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <div className={`flex items-baseline gap-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white font-grotesk font-bold text-3xl">{MINDSYNC_COMPLETE.retainer}</span>
                    <span className="text-white/60 text-sm">{isAr ? 'د.ك/شهر' : 'KWD/mo'}</span>
                  </div>
                  <p className={`text-white/50 text-[11px] mt-0.5 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
                    {isAr ? 'اشتراك' : 'subscription'}
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="px-5 py-4">
              <ul className="space-y-2.5">
                {FEATURES.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm text-ms-ink-700 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-ms-gold-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className={isAr ? 'font-arabic text-right' : 'font-grotesk'}>{isAr ? f.ar : f.en}</span>
                  </li>
                ))}
              </ul>

              {/* Fair use note */}
              <div className="mt-4 pt-4 border-t border-ms-ivory-200">
                <p className={`text-[11px] text-ms-ink-400 leading-relaxed ${isAr ? 'font-arabic text-right' : 'font-grotesk'}`}>
                  {isAr
                    ? 'لو تجاوزت ١٬٠٠٠ محادثة: +٣٠ د.ك / ٥٠٠ محادثة إضافية'
                    : 'Over 1,000 conversations: +30 KWD / 500 extra conversations'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex flex-wrap gap-2.5 ${isAr ? 'justify-end' : 'justify-start'}`}
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <a
            href="/discovery"
            onClick={() => trackCtaClicked('stage4')}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-ms-gold-600 hover:bg-ms-gold-500 text-white font-semibold text-sm
              transition-all duration-150 shadow-sm hover:shadow-md
              ${isAr ? 'font-arabic flex-row-reverse' : 'font-grotesk'}
            `}
          >
            {isAr ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'}
            <span>{isAr ? '←' : '→'}</span>
          </a>

          <ChipButton
            label={isAr ? 'عندي سؤال' : 'I have a question'}
            onClick={onNext}
            isAr={isAr}
          />
        </motion.div>
      )}
    </div>
  )
}