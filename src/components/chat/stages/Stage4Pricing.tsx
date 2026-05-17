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

const FEATURES_AR = [
  'رد فوري ٢٤/٧ على واتساب، إنستغرام، وتيليغرام',
  'تدريب مخصص على منتجاتك وخدماتك',
  'لوحة تحكم العميل (الطلبات، المحادثات، الإحصائيات)',
  'إعادة تدريب شهرية مجانية',
  '١٬٠٠٠ محادثة شهرياً مشمولة',
  'دعم فني مستمر من MindSync',
]

const FEATURES_EN = [
  '24/7 instant replies on WhatsApp, Instagram & Telegram',
  'Custom-trained on your products and services',
  'Client dashboard (orders, conversations, analytics)',
  'Free monthly AI retraining',
  '1,000 conversations/month included',
  'Ongoing support from MindSync',
]

export default function Stage4Pricing({ isAr, onNext }: Props) {
  const [showCard, setShowCard] = useState(false)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), 400)
    const t2 = setTimeout(() => setShowActions(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const features = isAr ? FEATURES_AR : FEATURES_EN

  return (
    <div className="flex flex-col gap-4">
      <AIBubble
        content={isAr ? STAGE4_INTRO.ar : STAGE4_INTRO.en}
        isAr={isAr}
      />

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
            <div className="bg-ms-green-800 px-5 py-4">
              <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                <div>
                  <p className={`text-ms-gold-400 font-mono text-[10px] tracking-widest uppercase mb-1`}>
                    {MINDSYNC_COMPLETE.name.en}
                  </p>
                  <div className={`flex items-baseline gap-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-white font-grotesk font-bold text-3xl">
                      {MINDSYNC_COMPLETE.retainer}
                    </span>
                    <span className="text-white/70 text-sm font-grotesk">
                      {isAr ? 'د.ك/شهر' : 'KWD/mo'}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs font-grotesk mt-0.5">
                    {isAr
                      ? `+ ${MINDSYNC_COMPLETE.buildFee} د.ك إعداد لمرة واحدة`
                      : `+ ${MINDSYNC_COMPLETE.buildFee} KWD one-time setup`}
                  </p>
                </div>
                <div className="text-4xl opacity-70">🤖</div>
              </div>
            </div>

            {/* Features */}
            <div className="px-5 py-4">
              <ul className="space-y-2.5">
                {features.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm text-ms-ink-700 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-ms-gold-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className={isAr ? 'font-arabic text-right' : 'font-grotesk'}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Usage tiers */}
              <div className="mt-4 pt-4 border-t border-ms-ivory-200">
                <p className={`text-[11px] text-ms-ink-400 ${isAr ? 'font-arabic text-right' : 'font-grotesk'}`}>
                  {isAr ? MINDSYNC_COMPLETE.usageTiers.ar.join(' · ') : MINDSYNC_COMPLETE.usageTiers.en.join(' · ')}
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
            {isAr ? 'ابدأ الآن — ٧ أيام عمل' : 'Get Started — 7 Business Days'}
            <span>{isAr ? '←' : '→'}</span>
          </a>

          <ChipButton
            label={isAr ? 'عندي أسئلة' : 'I have questions'}
            onClick={onNext}
            isAr={isAr}
          />
        </motion.div>
      )}
    </div>
  )
}
