'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface KineticTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function KineticText({ text, className = '', delay = 0, as: Tag = 'h2' }: KineticTextProps) {
  const prefersReduced = useReducedMotion()
  const words = text.split(' ')

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginInlineEnd: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: delay + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
