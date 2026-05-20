'use client'
import { motion } from 'framer-motion'

interface Props {
  isAr: boolean
}

export default function TypingIndicator({ isAr }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-2.5 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}
    >
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full bg-ms-green-800 overflow-hidden flex items-center justify-center border border-ms-gold-600/40"
        style={{ boxShadow: '0 0 0 2px rgba(191,141,56,0.18), 0 2px 8px rgba(0,0,0,0.35)' }}
      >
        <img src="/logo.png" alt="MindSync" className="w-6 h-6 object-contain" draggable={false} />
      </div>
      <div
        className="px-4 py-3.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5 backdrop-blur-xl"
        style={{
          background: 'rgba(255,255,255,0.078)',
          border: '1px solid rgba(255,255,255,0.11)',
          borderLeftColor: 'rgba(191,141,56,0.8)',
          borderLeftWidth: '2px',
          boxShadow: '0 2px 14px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full block"
            style={{ background: 'rgba(191,141,56,0.7)' }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}