'use client'
import { motion } from 'framer-motion'

interface Props {
  content: string
  isAr: boolean
  delay?: number
}

// Subtle shimmer on the sent bubble background
export default function SentMessage({ content, isAr, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isAr ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-semibold
          ${isAr ? 'rounded-bl-sm font-arabic text-right' : 'rounded-br-sm font-grotesk text-left'}
        `}
        style={{
          background: 'linear-gradient(135deg, #BF8D38 0%, #C99B49 100%)',
          color: '#0F2E22',
          boxShadow: '0 2px 12px rgba(191,141,56,0.35)',
        }}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {content}
      </div>
    </motion.div>
  )
}
