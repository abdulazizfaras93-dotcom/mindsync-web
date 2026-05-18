'use client'
import { motion } from 'framer-motion'

interface Props {
  content: string
  isAr: boolean
  delay?: number
}

export default function SentMessage({ content, isAr, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isAr ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isAr ? 'rounded-bl-sm font-arabic text-right' : 'rounded-br-sm font-grotesk text-left'}
        `}
        style={{ background: '#BF8D38', color: '#0F2E22' }}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {content}
      </div>
    </motion.div>
  )
}
