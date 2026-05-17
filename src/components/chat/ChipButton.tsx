'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  icon?: string
  onClick: () => void
  delay?: number
  variant?: 'default' | 'gold'
  isAr?: boolean
}

export default function ChipButton({ label, icon, onClick, delay = 0, variant = 'default', isAr }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
        border transition-all duration-150 select-none cursor-pointer
        ${variant === 'gold'
          ? 'bg-ms-gold-600 border-ms-gold-600 text-white hover:bg-ms-gold-500 hover:border-ms-gold-500'
          : 'bg-white border-ms-ivory-200 text-ms-ink-700 hover:border-ms-green-800 hover:text-ms-green-800'
        }
        ${isAr ? 'font-arabic' : 'font-grotesk'}
      `}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.button>
  )
}
