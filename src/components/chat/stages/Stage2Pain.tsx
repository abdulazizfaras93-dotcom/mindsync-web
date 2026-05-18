'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AIBubble from '../AIBubble'
import SentMessage from '../SentMessage'
import TypingIndicator from '../TypingIndicator'
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
  const [showOptions, setShowOptions] = useState(false)

  const cat = CATEGORIES.find(c => c.id === category)
  const userLabel = (isAr ? cat?.ar : cat?.en) ?? ''

  useEffect(() => {
    const t1 = setTimeout(() => { setShowTyping(false); setShowMessage(true) }, 800)
    const t2 = setTimeout(() => setShowOptions(true), 1300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <SentMessage content={`${cat?.icon ?? ''} ${userLabel}`} isAr={isAr} />

      <AnimatePresence mode="wait">
        {showTyping && !showMessage && <TypingIndicator key="t" isAr={isAr} />}
      </AnimatePresence>

      {showMessage && (
        <AIBubble content={getStage2Message(category, isAr)} isAr={isAr} />
      )}

      {showOptions && (
        <div className={`flex flex-col gap-2 ${isAr ? 'items-end' : 'items-start'}`}>
          {PAINS.map((pain, i) => (
            <motion.button
              key={pain.id}
              initial={{ opacity: 0, x: isAr ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(pain.id)}
              dir={isAr ? 'rtl' : 'ltr'}
              className={`
                w-full max-w-sm px-4 py-3.5 rounded-xl text-sm font-medium
                transition-all duration-150 cursor-pointer select-none
                flex items-center gap-3 text-white/80
                ${isAr ? 'font-arabic text-right flex-row-reverse' : 'font-grotesk text-left'}
              `}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                minHeight: 44,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'rgba(191,141,56,0.08)'
                el.style.border = '1px solid rgba(191,141,56,0.40)'
                el.style.color = 'rgba(212,168,90,1)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.background = 'rgba(255,255,255,0.04)'
                el.style.border = '1px solid rgba(255,255,255,0.10)'
                el.style.color = ''
              }}
            >
              <span className="text-lg flex-shrink-0">{pain.icon}</span>
              <span>{isAr ? pain.ar : pain.en}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}