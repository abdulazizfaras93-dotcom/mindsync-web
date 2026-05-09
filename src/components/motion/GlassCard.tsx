'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  depth?: 1 | 2 | 3
  tilt?: boolean
}

const DEPTH_BLUR: Record<1 | 2 | 3, string> = {
  1: 'backdrop-blur-sm',
  2: 'backdrop-blur-[6px]',
  3: 'backdrop-blur-lg',
}

const DEPTH_SHADOW: Record<1 | 2 | 3, string> = {
  1: '0 4px 16px rgba(15,46,34,0.08)',
  2: '0 8px 32px rgba(15,46,34,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
  3: '0 12px 48px rgba(15,46,34,0.20), inset 0 1px 0 rgba(255,255,255,0.08)',
}

export default function GlassCard({ children, className = '', depth = 2, tilt = false }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 25 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || prefersReduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rotateYRaw.set(dx * 12)
    rotateXRaw.set(-dy * 12)
  }

  const handleMouseLeave = () => {
    rotateXRaw.set(0)
    rotateYRaw.set(0)
  }

  const motionStyle = tilt && !prefersReduced
    ? { rotateX, rotateY, transformStyle: 'preserve-3d' as const, willChange: 'transform', boxShadow: DEPTH_SHADOW[depth] }
    : { boxShadow: DEPTH_SHADOW[depth] }

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={motionStyle}
        className={`${DEPTH_BLUR[depth]} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
