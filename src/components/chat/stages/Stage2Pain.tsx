'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import TypingIndicator from '../TypingIndicator'
import ChipButton from '../ChipButton'
import { PAINS, CATEGORIES, getStage2Message } from '@/lib/conversation/scripts'
import type { BusinessCategory, PainKey } from '@/types/conversation'

interface Props {
  isAr: boolean
  category: BusinessCategory
  onSelect: (pain: PainKey) => void
}

export default function Stage2Pain({ isAr, category, onSelect }: Props) {
  const [showTyping, setShowTyping] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showChips, setShowChips] = useState(false)

  const cat = CATEGORIES.find(c => c.id === category)
  const userLabel = (isAr ? cat?.ar : cat?.en) ?? ''

  useEffect(() => {
    const t1 = setTimeout(() => { setShowTyping(false); setShowMessage(true) }, 700)
    const t2 = setTimeout(() => setShowChips(true), 1100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* Echo user's selection back */}
      <SentMessage content={`${cat?.icon ?? ''} ${userLabel}`} isAr={isAr} />

      <AnimatePresence mode="wait">
        {showTyping && !showMessage && <TypingIndicator key="t" isAr={isAr} />}
      </AnimatePresence>

      {showMessage && (
        <AIBubble
          content={getStage2Message(category, isAr)}
          isAr={isAr}
        />
      )}

      {showChips && (
        <div className={`flex flex-col gap-2 ${isAr ? 'items-end' : 'items-start'}`}>
          {PAINS.map((pain, i) => (
            <ChipButton
              key={pain.id}
              icon={pain.icon}
              label={isAr ? pain.ar : pain.en}
              onClick={() => onSelect(pain.id)}
              delay={i * 0.07}
              isAr={isAr}
            />
          ))}
        </div>
      )}
    </div>
  )
}
