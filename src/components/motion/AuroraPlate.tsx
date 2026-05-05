'use client'
import { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface AuroraPlateProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function AuroraPlate({ children, className = '', id }: AuroraPlateProps) {
  const prefersReduced = useReducedMotion()

  return (
    <div id={id} className={`relative overflow-hidden bg-ms-green-900 ${className}`}>
      {/* Blob 1 — green radial */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(28,80,56,0.85) 0%, transparent 70%)' }}
        animate={prefersReduced ? {} : { x: [0, 40, 0], y: [0, -28, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob 2 — gold radial */}
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(191,141,56,0.18) 0%, transparent 70%)' }}
        animate={prefersReduced ? {} : { x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
