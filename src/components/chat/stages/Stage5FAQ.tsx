'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import ChipButton from '../ChipButton'
import { STAGE5_INTRO } from '@/lib/conversation/scripts'
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

  useEffect(() => {
    const t = setTimeout(() => setShowChips(true), 500)
    return () => clearTimeout(t)
  }, [])

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
      <AIBubble
        content={isAr ? STAGE5_INTRO.ar : STAGE5_INTRO.en}
        isAr={isAr}
      />

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

      {/* Remaining FAQ chips */}
      {showChips && remainingKeys.length > 0 && (
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

      {/* Final CTA — always visible */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`mt-2 flex flex-col gap-3 ${isAr ? 'items-end' : 'items-start'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <AIBubble
          content={isAr
            ? 'جاهز تشوف كيف يشتغل لنشاطك؟ احجز ديمو مجاني أو ابدأ الحين.'
            : 'Ready to see it work for your business? Book a free demo or get started now.'}
          isAr={isAr}
        />
        <div className={`flex flex-wrap gap-2.5 ${isAr ? 'justify-end' : 'justify-start'}`}>
          <a
            href="/discovery"
            onClick={() => trackCtaClicked('stage5')}
            className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-ms-gold-600 hover:bg-ms-gold-500 text-white font-semibold text-sm
              transition-all duration-150 shadow-sm
              ${isAr ? 'font-arabic flex-row-reverse' : 'font-grotesk'}
            `}
          >
            {isAr ? 'ابدأ الآن' : 'Get Started'}
            <span>{isAr ? '←' : '→'}</span>
          </a>
          <a
            href="https://wa.me/96599539006"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center gap-2 px-5 py-3 rounded-full
              border border-ms-ivory-200 bg-white text-ms-ink-700 text-sm font-medium
              hover:border-ms-green-800 hover:text-ms-green-800 transition-all
              ${isAr ? 'font-arabic flex-row-reverse' : 'font-grotesk'}
            `}
          >
            <span>💬</span>
            {isAr ? 'تحدث مع MindSync' : 'Talk to MindSync'}
          </a>
        </div>
      </motion.div>
    </div>
  )
}
