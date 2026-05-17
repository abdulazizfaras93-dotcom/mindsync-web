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
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ms-green-800 flex items-center justify-center text-[13px] select-none">
        🤖
      </div>
      {/* Bubble */}
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed text-ms-ink-900
          bg-white border border-ms-ivory-200 shadow-sm
          ${isAr ? 'rounded-br-sm font-arabic text-right' : 'rounded-bl-sm font-grotesk text-left'}
        `}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {content}
      </div>
    </motion.div>
  )
}
