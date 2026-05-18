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
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ms-green-800 overflow-hidden flex items-center justify-center border border-ms-gold-600/30">
        <img src="/logo.png" alt="MindSync" className="w-6 h-6 object-contain" draggable={false} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1 backdrop-blur-xl"
        style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.09)' }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full block"
            style={{ background: 'rgba(255,255,255,0.45)' }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  )
}