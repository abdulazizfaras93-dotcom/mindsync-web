'use client'
import NumberFlowBase, { type Format } from '@number-flow/react'

interface NumberFlowProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  format?: Format
}

export default function NumberFlow({ value, suffix, prefix, className = '', format }: NumberFlowProps) {
  return (
    <span className={className} style={{ fontFamily: 'JetBrains Mono, monospace', display: 'inline-flex', alignItems: 'baseline', gap: '0.1em' }}>
      {prefix && <span>{prefix}</span>}
      <NumberFlowBase value={value} format={format} />
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
