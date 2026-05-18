'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import ChipButton from '../ChipButton'
import { STAGE5_INTRO, STAGE5_FOLLOWUP } from '@/lib/conversation/scripts'
import { FAQ_ITEMS } from '@/lib/conversation/faqAnswers'
import { trackCtaClicked, trackFaqOpened } from '@/lib/conversation/analytics'
import type { FaqKey } from '@/types/conversation'

interface Props {
  isAr: boolean
}

interface AnsweredFaq {
  key: FaqKey
  q: string
  a: string
}

export default function Stage5FAQ({ isAr }: Props) {
  const [showChips, setShowChips] = useState(false)
  const [answered, setAnswered] = useState<AnsweredFaq[]>([])
  const [remainingKeys, setRemainingKeys] = useState<FaqKey[]>(FAQ_ITEMS.map(f => f.id))
  const [showFollowup, setShowFollowup] = useState(false)
  const followupShownRef = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setShowChips(true), 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (answered.length >= 3 && !followupShownRef.current) {
      followupShownRef.current = true
      setTimeout(() => setShowFollowup(true), 800)
    }
  }, [answered.length])

  const handleFaq = (key: FaqKey) => {
    const item = FAQ_ITEMS.find(f => f.id === key)
    if (!item) return
    trackFaqOpened(key)
    setAnswered(prev => [...prev, {
      key,
      q: isAr ? item.q.ar : item.q.en,
      a: isAr ? item.a.ar : item.a.en,
    }])
    setRemainingKeys(prev => prev.filter(k => k !== key))
  }

  return (
    <div className="flex flex-col gap-4">
      <AIBubble content={isAr ? STAGE5_INTRO.ar : STAGE5_INTRO.en} isAr={isAr} />

      {/* Answered FAQs */}
      <AnimatePresence>
        {answered.map(item => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
          >
            <SentMessage content={item.q} isAr={isAr} />
            <AIBubble content={item.a} isAr={isAr} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Follow-up after 3 FAQs */}
      {showFollowup && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <AIBubble content={isAr ? STAGE5_FOLLOWUP.ar : STAGE5_FOLLOWUP.en} isAr={isAr} />
          <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
            <ChipButton
              label={isAr ? 'احجز مكالمة ←' : '→ Book a Call'}
              onClick={() => { trackCtaClicked('stage5'); window.open('https://wa.me/96599539006', '_blank') }}
              variant="gold"
              isAr={isAr}
            />
            <ChipButton
              label={isAr ? 'أكمل الأسئلة' : 'Keep asking'}
              onClick={() => setShowFollowup(false)}
              isAr={isAr}
            />
          </div>
        </motion.div>
      )}

      {/* Remaining FAQ chips */}
      {showChips && remainingKeys.length > 0 && !showFollowup && (
        <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
          {remainingKeys.map((key, i) => {
            const item = FAQ_ITEMS.find(f => f.id === key)!
            return (
              <ChipButton
                key={key}
                label={isAr ? item.q.ar : item.q.en}
                onClick={() => handleFaq(key)}
                delay={i * 0.05}
                isAr={isAr}
              />
            )
          })}
        </div>
      )}

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className={`mt-2 flex flex-col gap-3 ${isAr ? 'items-end' : 'items-start'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <AIBubble
          content={isAr
            ? 'جاهز تبدأ؟ الأسبوع الأول مجاناً — بدون أي التزام.'
            : 'Ready to start? The first week is free — no commitment.'}
          isAr={isAr}
        />
        <div className={`flex flex-wrap gap-2.5 ${isAr ? 'justify-end' : 'justify-start'}`}>
          <a
            href="/discovery"
            onClick={() => trackCtaClicked('stage5')}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-ms-gold-600 hover:bg-ms-gold-500 text-ms-green-900 font-semibold text-sm
              transition-all duration-150 shadow-sm
              ${isAr ? 'font-arabic flex-row-reverse' : 'font-grotesk'}
            `}
          >
            {isAr ? 'ابدأ تجربتك المجانية' : 'Start Free Trial'}
            <span>{isAr ? '←' : '→'}</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}