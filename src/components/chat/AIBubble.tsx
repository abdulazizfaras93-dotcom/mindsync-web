'use client'
import { motion } from 'framer-motion'

interface Props {
  content: string
  isAr: boolean
  delay?: number
}

export default function AIBubble({ content, isAr, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2.5 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}
    >
      {/* MindSync logo avatar — slightly larger with gold ring glow */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full bg-ms-green-800 overflow-hidden flex items-center justify-center border border-ms-gold-600/40"
        style={{ boxShadow: '0 0 0 2px rgba(191,141,56,0.18), 0 2px 8px rgba(0,0,0,0.35)' }}
      >
        <img
          src="/logo.png"
          alt="MindSync"
          className="w-6 h-6 object-contain"
          draggable={false}
        />
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-white/92
          whitespace-pre-line backdrop-blur-xl
          ${isAr ? 'rounded-br-sm font-arabic text-right' : 'rounded-bl-sm font-grotesk text-left'}
        `}
        style={{
          background: 'rgba(255,255,255,0.078)',
          border: '1px solid rgba(255,255,255,0.11)',
          borderLeftColor: isAr ? 'rgba(255,255,255,0.11)' : 'rgba(191,141,56,0.8)',
          borderLeftWidth: isAr ? undefined : '2px',
          borderRightColor: isAr ? 'rgba(191,141,56,0.8)' : 'rgba(255,255,255,0.11)',
          borderRightWidth: isAr ? '2px' : undefined,
          boxShadow: '0 2px 14px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
        dir={isAr ? 'rtl' : 'ltr'}
        aria-live="polite"
      >
        {content}
      </div>
    </motion.div>
  )
}