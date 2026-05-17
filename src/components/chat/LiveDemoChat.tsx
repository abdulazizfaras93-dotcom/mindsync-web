'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypingIndicator from './TypingIndicator'
import { trackLiveDemoMessage } from '@/lib/conversation/analytics'
import type { BusinessCategory, LiveMessage } from '@/types/conversation'

interface Props {
  isAr: boolean
  category: BusinessCategory
}

const MAX_MESSAGES = 5

export default function LiveDemoChat({ isAr, category }: Props) {
  const [messages, setMessages] = useState<LiveMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hitLimit, setHitLimit] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const msgCount = useRef(0)

  const lang = isAr ? 'ar' : 'en'

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading || hitLimit) return

    if (msgCount.current >= MAX_MESSAGES) {
      setHitLimit(true)
      return
    }

    const userMsg: LiveMessage = { id: crypto.randomUUID(), role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError('')
    msgCount.current++
    trackLiveDemoMessage(msgCount.current)

    try {
      const res = await fetch('/api/demo-chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: text, category, lang }),
      })

      if (res.status === 429) {
        setHitLimit(true)
        setLoading(false)
        return
      }

      const data = (await res.json()) as { reply?: string; error?: string }
      const reply = data.reply ?? (isAr ? 'عذراً، حدث خطأ.' : 'Sorry, something went wrong.')
      const aiMsg: LiveMessage = { id: crypto.randomUUID(), role: 'ai', content: reply }
      setMessages(prev => [...prev, aiMsg])
    } catch {
      setError(isAr ? 'تعذّر الاتصال. تحقق من الإنترنت.' : 'Connection failed. Check your internet.')
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    if (msgCount.current >= MAX_MESSAGES) setHitLimit(true)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send() }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden border border-ms-ivory-200 shadow-md bg-white w-full"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-ms-green-800 overflow-hidden flex items-center justify-center flex-shrink-0 border border-white/20">
          <img src="/logo.png" alt="MindSync" className="w-7 h-7 object-contain" draggable={false} />
        </div>
        <div>
          <p className="text-white text-sm font-semibold font-grotesk">
            {isAr ? 'ديمو مباشر — وكيل MindSync' : 'Live Demo — MindSync Agent'}
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <p className="text-white/70 text-[11px] font-grotesk">
              {isAr ? 'يرد الآن' : 'Responding now'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex flex-col gap-3 p-4 h-[380px] overflow-y-auto"
        style={{ background: '#ECE5DD', scrollbarWidth: 'none' }}
      >
        {messages.length === 0 && (
          <p className={`text-center text-[12px] text-ms-ink-500 mt-4 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
            {isAr ? 'اسأل أي سؤال تريده 👇' : 'Ask any question below 👇'}
          </p>
        )}

        <AnimatePresence>
          {messages.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className={`flex ${m.role === 'user' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}
            >
              <div className={`
                max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-snug shadow-sm
                ${m.role === 'user' ? 'bg-[#DCF8C6] text-ms-ink-900 rounded-tr-none' : 'bg-white text-ms-ink-900 rounded-tl-none'}
                ${isAr ? 'font-arabic text-right' : 'font-grotesk text-left'}
              `}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && <TypingIndicator isAr={isAr} />}

        {error && (
          <p className="text-center text-[12px] text-red-500 font-grotesk">{error}</p>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="border-t border-ms-ivory-200 bg-white p-3">
        {hitLimit ? (
          <div className={`text-center ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
            <p className="text-[12px] text-ms-ink-500 mb-2">
              {isAr ? 'وصلت للحد التجريبي. ابدأ نشاطك الآن!' : 'Demo limit reached. Get the real thing!'}
            </p>
            <a
              href="/discovery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ms-gold-600 text-white text-sm font-semibold hover:bg-ms-gold-500 transition-colors"
            >
              {isAr ? 'ابدأ الآن ←' : '→ Get Started'}
            </a>
          </div>
        ) : (
          <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isAr ? 'اكتب سؤالك هنا…' : 'Type your question…'}
              disabled={loading}
              maxLength={400}
              dir={isAr ? 'rtl' : 'ltr'}
              className={`
                flex-1 text-sm bg-ms-ivory-100 rounded-full px-4 py-2.5
                border border-ms-ivory-200 focus:outline-none focus:border-ms-green-800
                placeholder:text-ms-ink-400 text-ms-ink-900 disabled:opacity-50
                ${isAr ? 'font-arabic text-right' : 'font-grotesk'}
              `}
            />
            <button
              onClick={() => void send()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-[#054d44] transition-colors"
            >
              <svg className={`w-4 h-4 text-white ${isAr ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
