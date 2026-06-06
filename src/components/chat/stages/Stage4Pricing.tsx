'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import ChipButton from '../ChipButton'
import {
  STAGE4_INTRO, OBJECTIONS, getStage5Response, OFFER_DETAILS, DISCOVERY_LINK,
} from '@/lib/conversation/scripts'
import type { ObjectionKey } from '@/lib/conversation/scripts'
import { MINDSYNC_COMPLETE } from '@/lib/data'
import { trackCtaClicked } from '@/lib/conversation/analytics'

interface Props {
  isAr: boolean
  onNext: () => void
}

interface AnsweredObjection {
  id: ObjectionKey
  label: string
  response: string
}

export default function Stage4Pricing({ isAr, onNext }: Props) {
  const [showCard, setShowCard] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [answered, setAnswered] = useState<AnsweredObjection[]>([])
  const [remainingIds, setRemainingIds] = useState<ObjectionKey[]>(OBJECTIONS.map(o => o.id))

  useEffect(() => {
    const t1 = setTimeout(() => setShowCard(true), 400)
    const t2 = setTimeout(() => setShowActions(true), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleObjection = (id: ObjectionKey) => {
    const obj = OBJECTIONS.find(o => o.id === id)!
    setAnswered(prev => [...prev, {
      id,
      label: isAr ? obj.ar : obj.en,
      response: getStage5Response(id, isAr),
    }])
    setRemainingIds(prev => prev.filter(k => k !== id))
  }

  const offer = OFFER_DETAILS[isAr ? 'ar' : 'en']

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
          <div
            className="rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-5"
              style={{ background: 'linear-gradient(135deg, #153E2D 0%, #0F2E22 100%)' }}
            >
              <p className="text-ms-gold-400 font-mono text-[10px] tracking-widest uppercase mb-3">
                {MINDSYNC_COMPLETE.name.en}
              </p>
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
                {offer.includes.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm text-white/75 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <span className="text-ms-gold-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span className={isAr ? 'font-arabic text-right' : 'font-grotesk'}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {offer.extra.map((line, i) => (
                  <p key={i} className={`text-[11px] text-white/35 leading-relaxed ${isAr ? 'font-arabic text-right' : 'font-grotesk'}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Primary CTA */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <a
            href={DISCOVERY_LINK}
            onClick={() => trackCtaClicked('stage4')}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-ms-gold-600 hover:bg-ms-gold-500 text-ms-green-900 font-semibold text-sm
              transition-all duration-150 shadow-sm hover:shadow-md
              ${isAr ? 'font-arabic flex-row-reverse' : 'font-grotesk'}
            `}
          >
            {isAr ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'}
            <span>{isAr ? '←' : '→'}</span>
          </a>
        </motion.div>
      )}

      {/* Answered objections */}
      <AnimatePresence>
        {answered.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
          >
            <SentMessage content={item.label} isAr={isAr} />
            <AIBubble content={item.response} isAr={isAr} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Objection chips + more questions */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : 'justify-start'}`}
          dir={isAr ? 'rtl' : 'ltr'}
        >
          {remainingIds.map((id, i) => {
            const obj = OBJECTIONS.find(o => o.id === id)!
            return (
              <ChipButton
                key={id}
                label={isAr ? obj.ar : obj.en}
                onClick={() => handleObjection(id)}
                delay={i * 0.05}
                isAr={isAr}
              />
            )
          })}
          {answered.length > 0 && (
            <ChipButton
              label={isAr ? 'عندي سؤال ثاني' : 'More questions'}
              onClick={onNext}
              isAr={isAr}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}
