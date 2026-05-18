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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-2.5 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}
    >
      {/* MindSync logo avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ms-green-800 overflow-hidden flex items-center justify-center border border-ms-gold-600/30">
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
          max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-white/90
          whitespace-pre-line backdrop-blur-xl
          ${isAr ? 'rounded-br-sm font-arabic text-right' : 'rounded-bl-sm font-grotesk text-left'}
        `}
        style={{
          background: 'rgba(255,255,255,0.055)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderLeftColor: isAr ? 'rgba(255,255,255,0.09)' : 'rgba(191,141,56,0.45)',
          borderLeftWidth: isAr ? undefined : '2px',
          borderRightColor: isAr ? 'rgba(191,141,56,0.45)' : 'rgba(255,255,255,0.09)',
          borderRightWidth: isAr ? '2px' : undefined,
        }}
        dir={isAr ? 'rtl' : 'ltr'}
        aria-live="polite"
      >
        {content}
      </div>
    </motion.div>
  )
}