'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import TypingIndicator from '../TypingIndicator'
import ChipButton from '../ChipButton'
import { CATEGORIES, STAGE1_GREETING } from '@/lib/conversation/scripts'
import type { BusinessCategory } from '@/types/conversation'

interface Props {
  isAr: boolean
  onSelect: (category: BusinessCategory) => void
}

export default function Stage1Greeting({ isAr, onSelect }: Props) {
  const [showTyping, setShowTyping] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [showChips, setShowChips] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setShowTyping(false); setShowMessage(true) }, 900)
    const t2 = setTimeout(() => setShowChips(true), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {showTyping && !showMessage && (
          <TypingIndicator key="typing" isAr={isAr} />
        )}
      </AnimatePresence>

      {showMessage && (
        <AIBubble
          content={isAr ? STAGE1_GREETING.ar : STAGE1_GREETING.en}
          isAr={isAr}
        />
      )}

      {showChips && (
        <div className={`flex flex-wrap gap-2 ${isAr ? 'justify-end' : 'justify-start'}`}>
          {CATEGORIES.map((cat, i) => (
            <ChipButton
              key={cat.id}
              icon={cat.icon}
              label={isAr ? cat.ar : cat.en}
              onClick={() => onSelect(cat.id)}
              delay={i * 0.04}
              isAr={isAr}
            />
          ))}
        </div>
      )}
    </div>
  )
}
