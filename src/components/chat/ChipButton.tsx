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
        transition-all duration-150 select-none cursor-pointer
        ${variant === 'gold'
          ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-500'
          : 'text-white/80 hover:text-white'
        }
        ${isAr ? 'font-arabic' : 'font-grotesk'}
      `}
      style={variant === 'default' ? {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.13)',
      } : undefined}
      onMouseEnter={variant === 'default' ? (e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'rgba(191,141,56,0.12)'
        el.style.border = '1px solid rgba(191,141,56,0.35)'
        el.style.color = '#D4A85A'
      } : undefined}
      onMouseLeave={variant === 'default' ? (e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'rgba(255,255,255,0.07)'
        el.style.border = '1px solid rgba(255,255,255,0.13)'
        el.style.color = ''
      } : undefined}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.button>
  )
}