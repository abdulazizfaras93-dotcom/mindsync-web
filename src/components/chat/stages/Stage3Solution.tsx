'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import TypingIndicator from '../TypingIndicator'
import ChipButton from '../ChipButton'
import AnimatedDemo from '../AnimatedDemo'
import LiveDemoChat from '../LiveDemoChat'
import { PAINS, getStage3Message, STAGE3_DEMO_INTRO } from '@/lib/conversation/scripts'
import type { BusinessCategory, PainKey } from '@/types/conversation'

interface Props {
  isAr: boolean
  category: BusinessCategory
  pain: PainKey
  onNext: () => void
}

export default function Stage3Solution({ isAr, category, pain, onNext }: Props) {
  const [phase, setPhase] = useState<'typing1' | 'solution' | 'typing2' | 'demo-intro' | 'demo' | 'live-toggle' | 'live'>('typing1')
  const [showLiveDemo, setShowLiveDemo] = useState(false)

  const painItem = PAINS.find(p => p.id === pain)
  const painLabel = isAr ? painItem?.ar : painItem?.en

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('solution'), 800)
    const t2 = setTimeout(() => setPhase('typing2'), 1600)
    const t3 = setTimeout(() => setPhase('demo-intro'), 2400)
    const t4 = setTimeout(() => setPhase('demo'), 2900)
    const t5 = setTimeout(() => setPhase('live-toggle'), 10000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* User echo */}
      <SentMessage content={`${painItem?.icon ?? ''} ${painLabel ?? ''}`} isAr={isAr} />

      {/* Typing → solution */}
      <AnimatePresence mode="wait">
        {phase === 'typing1' && <TypingIndicator key="t1" isAr={isAr} />}
      </AnimatePresence>

      {phase !== 'typing1' && (
        <AIBubble content={getStage3Message(pain, category, isAr)} isAr={isAr} />
      )}

      {/* Typing → demo intro */}
      <AnimatePresence mode="wait">
        {phase === 'typing2' && <TypingIndicator key="t2" isAr={isAr} />}
      </AnimatePresence>

      {(phase === 'demo-intro' || phase === 'demo' || phase === 'live-toggle' || phase === 'live') && (
        <AIBubble content={isAr ? STAGE3_DEMO_INTRO.ar : STAGE3_DEMO_INTRO.en} isAr={isAr} />
      )}

      {/* Animated WhatsApp demo */}
      {(phase === 'demo' || phase === 'live-toggle' || phase === 'live') && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedDemo category={category} isAr={isAr} />
        </motion.div>
      )}

      {/* Live demo toggle */}
      {(phase === 'live-toggle' || phase === 'live') && !showLiveDemo && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-col gap-2 ${isAr ? 'items-end' : 'items-start'}`}
        >
          <AIBubble
            content={isAr ? 'تبي تجرب بنفسك؟ اكتب أي سؤال وأنا أرد عليك الحين! 👇' : 'Want to try it yourself? Ask anything and I\'ll reply right now! 👇'}
            isAr={isAr}
          />
          <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
            <ChipButton
              label={isAr ? '💬 جرب الديمو المباشر' : '💬 Try Live Demo'}
              onClick={() => setShowLiveDemo(true)}
              variant="gold"
              isAr={isAr}
            />
            <ChipButton
              label={isAr ? 'شوف التسعير ←' : 'See Pricing →'}
              onClick={onNext}
              isAr={isAr}
            />
          </div>
        </motion.div>
      )}

      {/* Live demo chat */}
      {showLiveDemo && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <LiveDemoChat isAr={isAr} category={category} />
          <div className={`mt-3 flex ${isAr ? 'justify-end' : 'justify-start'}`}>
            <ChipButton
              label={isAr ? 'شوف التسعير ←' : 'See Pricing →'}
              onClick={onNext}
              isAr={isAr}
            />
          </div>
        </motion.div>
      )}

      {/* Skip to pricing when demo auto-plays but no live demo shown */}
      {phase === 'live-toggle' && !showLiveDemo && (
        <div className="hidden" />
      )}
    </div>
  )
}
