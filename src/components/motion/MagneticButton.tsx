'use client'
import { ReactNode, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  function handleMouseMove(e: React.MouseEvent) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
    setHovered(false)
  }

  const inner = href ? (
    <a href={href} className={className}>{children}</a>
  ) : (
    <button onClick={onClick} className={className}>{children}</button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={prefersReduced ? {} : { x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{
        display: 'inline-block',
        boxShadow: hovered && !prefersReduced ? '0 0 36px rgba(191,141,56,0.22)' : 'none',
        borderRadius: 'inherit',
        transition: 'box-shadow 200ms ease',
      }}
    >
      {inner}
    </motion.div>
  )
}
