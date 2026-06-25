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
import { TIERS, PILOT } from '@/lib/data'
import type { TierId } from '@/lib/data'
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
  const [selectedTier, setSelectedTier] = useState<TierId>('coordinator')
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
          className="mx-auto w-full max-w-sm flex flex-col gap-3"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <p className={`text-ms-gold-400 font-mono text-[10px] tracking-widest uppercase ${isAr ? 'font-arabic text-right' : 'text-left'}`}>
            {offer.title}
          </p>

          {/* 3-tier picker */}
          {TIERS.map(tier => {
            const isSelected = tier.id === selectedTier
            const role = isAr ? tier.roleAr : tier.roleEn
            const name = tier.en
            const features = (isAr ? tier.features.ar : tier.features.en).slice(0, 3)
            const badge = tier.badge ? (isAr ? tier.badge.ar : tier.badge.en) : null
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                aria-pressed={isSelected}
                className="relative w-full rounded-2xl overflow-hidden text-start transition-all duration-200"
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, #153E2D 0%, #0F2E22 100%)'
                    : 'rgba(255,255,255,0.04)',
                  border: isSelected
                    ? '1px solid rgba(191,141,56,0.55)'
                    : '1px solid rgba(255,255,255,0.10)',
                  boxShadow: isSelected ? '0 0 0 1px rgba(191,141,56,0.25)' : 'none',
                }}
              >
                {badge && (
                  <span
                    className={`absolute top-0 ${isAr ? 'left-0 rounded-br-lg' : 'right-0 rounded-bl-lg'} px-2.5 py-1 text-[9px] font-semibold tracking-wide uppercase bg-ms-gold-600 text-ms-green-900 ${isAr ? 'font-arabic' : 'font-grotesk'}`}
                  >
                    {badge}
                  </span>
                )}

                <div className="px-4 py-3.5">
                  <div className={`flex items-baseline justify-between gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className={isAr ? 'text-right' : 'text-left'}>
                      <p className={`text-white font-semibold text-sm ${isAr ? 'font-arabic' : 'font-grotesk'}`}>{role}</p>
                      <p className="text-white/35 text-[10px] font-mono tracking-wide">{name}</p>
                    </div>
                    <div className={isAr ? 'text-left' : 'text-right'}>
                      <div className={`flex items-baseline gap-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                        <span className="text-white font-grotesk font-bold text-xl">{tier.monthly}</span>
                        <span className="text-white/55 text-[11px]">{isAr ? 'د.ك/شهر' : 'KWD/mo'}</span>
                      </div>
                      <p className={`text-white/40 text-[10px] mt-0.5 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
                        {isAr ? `+ ${tier.buildFee} د.ك تأسيس` : `+ ${tier.buildFee} KWD setup`}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-2.5 space-y-1.5">
                    {features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 text-[11px] text-white/70 ${isAr ? 'flex-row-reverse text-right' : ''}`}>
                        <span className="text-ms-gold-600 font-bold flex-shrink-0">✓</span>
                        <span className={isAr ? 'font-arabic' : 'font-grotesk'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            )
          })}

          {/* Pilot mention + overage */}
          <div className="px-1 pt-1 space-y-1" dir={isAr ? 'rtl' : 'ltr'}>
            <p className={`text-[11px] text-ms-gold-400/90 leading-relaxed ${isAr ? 'font-arabic text-right' : 'font-grotesk'}`}>
              {isAr
                ? `${PILOT.ar.name} (${PILOT.price} د.ك): ${PILOT.ar.body}`
                : `${PILOT.en.name} (${PILOT.price} KWD): ${PILOT.en.body}`}
            </p>
            {offer.extra.map((line, i) => (
              <p key={i} className={`text-[11px] text-white/35 leading-relaxed ${isAr ? 'font-arabic text-right' : 'font-grotesk'}`}>
                {line}
              </p>
            ))}
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
            {isAr ? 'ابدأ تجربة الـ ٣٠ يوم' : 'Start your 30-Day Pilot'}
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
