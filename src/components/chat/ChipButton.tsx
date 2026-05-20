'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  icon?: string
  onClick: () => void
  delay?: number
  variant?: 'default' | 'gold'
  isAr?: boolean
  selected?: boolean
}

export default function ChipButton({ label, icon, onClick, delay = 0, variant = 'default', isAr, selected = false }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.90, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -1.5 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium
        transition-all duration-200 select-none cursor-pointer
        ${variant === 'gold'
          ? 'bg-ms-gold-600 text-ms-green-900 hover:bg-ms-gold-500 shadow-sm hover:shadow-md'
          : selected
            ? 'text-ms-green-900'
            : 'text-white/80 hover:text-ms-gold-400'
        }
        ${isAr ? 'font-arabic' : 'font-grotesk'}
      `}
      style={
        variant === 'gold'
          ? { boxShadow: '0 2px 12px rgba(191,141,56,0.35)' }
          : selected
            ? {
                background: 'linear-gradient(135deg, #BF8D38 0%, #C99B49 100%)',
                border: '1px solid rgba(191,141,56,0.9)',
                boxShadow: '0 2px 12px rgba(191,141,56,0.35)',
              }
            : {
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.13)',
              }
      }
      onMouseEnter={variant === 'default' && !selected ? (e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'rgba(191,141,56,0.1)'
        el.style.border = '1px solid rgba(191,141,56,0.50)'
        el.style.boxShadow = '0 2px 12px rgba(191,141,56,0.15)'
      } : undefined}
      onMouseLeave={variant === 'default' && !selected ? (e) => {
        const el = e.currentTarget as HTMLButtonElement
        el.style.background = 'rgba(255,255,255,0.07)'
        el.style.border = '1px solid rgba(255,255,255,0.13)'
        el.style.boxShadow = ''
      } : undefined}
    >
      {icon && <span>{icon}</span>}
      {label}
    </motion.button>
  )
}