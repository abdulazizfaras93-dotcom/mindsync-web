'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function ChatContainer({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  })

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-4 overflow-y-auto px-4 py-4 ${className}`}
      style={{ scrollbarWidth: 'none' }}
    >
      {children}
    </div>
  )
}
