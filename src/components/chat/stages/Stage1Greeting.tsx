'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import AIBubble from '../AIBubble'
import TypingIndicator from '../TypingIndicator'
import ChipButton from '../ChipButton'
import { CATEGORIES, STAGE1_BUBBLES } from '@/lib/conversation/scripts'
import type { BusinessCategory } from '@/types/conversation'

interface Props {
  isAr: boolean
  onSelect: (category: BusinessCategory) => void
}

export default function Stage1Greeting({ isAr, onSelect }: Props) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(true)
  const [showChips, setShowChips] = useState(false)

  useEffect(() => {
    // Reveal 3 bubbles in sequence, then show chips
    const timings = [900, 1700, 2500, 3300]
    const timeouts = timings.map((ms, i) => setTimeout(() => {
      if (i < 3) {
        setTyping(false)
        setVisibleCount(i + 1)
        if (i < 2) setTimeout(() => setTyping(true), 50)
      } else {
        setShowChips(true)
      }
    }, ms))
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {typing && visibleCount < 3 && <TypingIndicator key={`t${visibleCount}`} isAr={isAr} />}
      </AnimatePresence>

      {STAGE1_BUBBLES.slice(0, visibleCount).map((b, i) => (
        <AIBubble
          key={i}
          content={isAr ? b.ar : b.en}
          isAr={isAr}
        />
      ))}

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