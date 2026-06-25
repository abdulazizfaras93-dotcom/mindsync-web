'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  autoScroll?: boolean
}

export default function ChatContainer({ children, className = '', autoScroll = true }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevChildCount = useRef(0)

  // Count children to detect additions (works for any ReactNode tree)
  const childCount = Array.isArray(children) ? children.length : 1

  useEffect(() => {
    if (!autoScroll) return
    if (childCount !== prevChildCount.current) {
      prevChildCount.current = childCount
      // Small delay so new content has painted before we scroll
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 80)
    }
  }, [childCount, autoScroll])

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {children}
      <div ref={bottomRef} />
    </div>
  )
}