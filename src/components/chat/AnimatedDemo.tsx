'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEMO_SCRIPTS } from '@/lib/conversation/scripts'
import type { BusinessCategory } from '@/types/conversation'

interface Props {
  category: BusinessCategory
  isAr: boolean
  autoPlay?: boolean
}

type DemoLine = { role: 'user' | 'ai'; text: string }

const TYPING_DELAY = 600   // ms before AI "types"
const REVEAL_DELAY = 1200  // ms AI message stays visible before next
const USER_DELAY   = 800   // ms between user lines

export default function AnimatedDemo({ category, isAr, autoPlay = true }: Props) {
  const script = DEMO_SCRIPTS[category] ?? DEMO_SCRIPTS['other']
  const lines: DemoLine[] = script.map(l => ({ role: l.role, text: isAr ? l.ar : l.en }))

  const [visible, setVisible] = useState<DemoLine[]>([])
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(0)
  const runningRef = useRef(false)

  useEffect(() => {
    if (!autoPlay || runningRef.current) return
    runningRef.current = true

    async function play() {
      for (const line of lines) {
        if (line.role === 'ai') {
          setTyping(true)
          await wait(TYPING_DELAY)
          setTyping(false)
          setVisible(prev => [...prev, line])
          await wait(REVEAL_DELAY)
        } else {
          await wait(USER_DELAY)
          setVisible(prev => [...prev, line])
          await wait(400)
        }
        idxRef.current++
      }
      setDone(true)
    }

    void play()
    // cleanup: mark not running on unmount (category change)
    return () => { runningRef.current = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, isAr])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [visible, typing])

  return (
    <div
      className="rounded-2xl overflow-hidden border border-ms-ivory-200 shadow-md bg-white max-w-sm w-full mx-auto"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* WhatsApp-style header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
          🤖
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold font-grotesk leading-tight truncate">
            {isAr ? 'وكيل MindSync الذكي' : 'MindSync AI Agent'}
          </p>
          <p className="text-white/70 text-[11px] font-grotesk">
            {isAr ? 'متاح ٢٤/٧ ⚡' : 'Online 24/7 ⚡'}
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div
        className="flex flex-col gap-3 p-4 min-h-[180px] max-h-[280px] overflow-y-auto"
        style={{ background: '#ECE5DD', scrollbarWidth: 'none' }}
      >
        <AnimatePresence>
          {visible.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`flex ${line.role === 'user' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}
            >
              <div className={`
                max-w-[80%] px-3 py-2 rounded-lg text-sm leading-snug shadow-sm
                ${line.role === 'user'
                  ? 'bg-[#DCF8C6] text-ms-ink-900 rounded-tr-none'
                  : 'bg-white text-ms-ink-900 rounded-tl-none'
                }
                ${isAr ? 'font-arabic text-right' : 'font-grotesk text-left'}
              `}>
                {line.text}
                <span className="text-[10px] text-ms-ink-400 ml-1 opacity-70">
                  {line.role === 'user' ? '✓✓' : ''}
                </span>
              </div>
            </motion.div>
          ))}

          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex ${isAr ? 'justify-end' : 'justify-start'}`}
            >
              <div className="bg-white px-3 py-2.5 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-ms-ink-400 block"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-center text-[11px] text-ms-ink-400 font-grotesk mt-1`}
          >
            {isAr ? '— نهاية المحادثة التجريبية —' : '— End of demo conversation —'}
          </motion.div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
