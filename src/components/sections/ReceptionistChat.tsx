'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const ChatBubbles = dynamic(() => import('@/components/canvas/ChatBubbles'), { ssr: false })

const WEBHOOK_URL = 'https://ifaras911.app.n8n.cloud/webhook/receptionist-website'

type Msg = {
  id: string
  from: 'user' | 'bot'
  text: string
  ts: string
  kind?: 'text' | 'fallback'
}

const t = {
  eyebrow: { en: 'LIVE', ar: 'مباشر' },
  headline: { en: 'Talk to the AI Receptionist', ar: 'تكلم مع وكيل الاستقبال الذكي' },
  sub: {
    en: 'Available 24/7 — responds, qualifies, and books a call',
    ar: 'متاح ٢٤/٧ — يرد، يؤهّل، ويحجز لك موعد',
  },
  bullet1: { en: 'Replies in Kuwaiti dialect, Arabic, or English', ar: 'يرد باللهجة الكويتية أو الإنجليزية' },
  bullet2: { en: 'Books appointments and qualifies leads', ar: 'يحجز المواعيد ويؤهل العملاء' },
  bullet3: { en: 'Hands off to your team on WhatsApp', ar: 'يحوّل العميل لفريقك على واتساب' },
  agentName: { en: 'MindSync Receptionist', ar: 'موظف استقبال مايندسينك' },
  online: { en: 'Online · 24/7', ar: 'متصل · ٢٤/٧' },
  placeholder: { en: 'Type your message…', ar: 'اكتب كل الاسئلة الي فبالك...' },
  opener: {
    en: "Hello! I'm the AI receptionist 👋",
    ar: 'هلا والله! 👋 ',
  },
  errorReply: {
    en: 'Get in touch on WhatsApp 👇',
    ar: 'تواصل ويانا على الواتساب 👇',
  },
  waCta: { en: 'Open WhatsApp', ar: 'افتح الواتساب' },
}

function nowTime() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function ReceptionistChat() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.3 })

  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [opened, setOpened] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSessionId(uid())
  }, [])

  // Fire opener once when section enters view
  useEffect(() => {
    if (!inView || opened) return
    setOpened(true)
    setLoading(true)
    const timer = setTimeout(() => {
      setMessages([{ id: uid(), from: 'bot', text: t.opener[lang], ts: nowTime() }])
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Autoscroll — smooth on desktop, instant on mobile to avoid janky animated scroll
  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading || !sessionId) return

    const userMsg: Msg = { id: uid(), from: 'user', text, ts: nowTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          name: 'Website Visitor',
          user_id: sessionId,
          channel: 'website',
          language: lang,
        }),
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (!res.ok) throw new Error('bad status')
      const data = await res.json()
      const reply: string = data?.reply ?? t.errorReply[lang]

      setMessages((prev) => [...prev, { id: uid(), from: 'bot', text: reply, ts: nowTime() }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: uid(), from: 'bot', text: t.errorReply[lang], ts: nowTime(), kind: 'fallback' },
      ])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  return (
    <section id="chat" ref={sectionRef} className="relative bg-ms-green-900 py-24 px-6">
      {/* Floating bubble background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 overflow-hidden" aria-hidden>
        <ChatBubbles />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-ms-gold-600 text-xs tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.eyebrow[lang]}
          </div>
          <h2 className="text-ms-ivory-0 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-5">
            {t.headline[lang]}
          </h2>
          <p className="text-ms-ivory-0/70 text-base md:text-lg mb-8 leading-relaxed">
            {t.sub[lang]}
          </p>
          <ul className="space-y-3">
            {[t.bullet1[lang], t.bullet2[lang], t.bullet3[lang]].map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-ms-ivory-0/85">
                <span className="mt-1 w-5 h-5 rounded-full bg-ms-gold-600/20 flex items-center justify-center flex-shrink-0">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#BF8D38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[15px] leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: chat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-ms-green-800/60 backdrop-blur-md border border-ms-gold-600/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-ms-green-800 px-4 py-3 flex items-center gap-3 border-b border-ms-gold-600/15">
            <div className="w-9 h-9 rounded-full bg-ms-green-900/60 flex items-center justify-center overflow-hidden flex-shrink-0" aria-hidden>
              <Image src="/brand/logo-transparent.png" alt="MindSync" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <p className="text-ms-ivory-0 text-[14px] font-semibold leading-none">{t.agentName[lang]}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-ms-ivory-0/60 text-[11px]">{t.online[lang]}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="bg-ms-green-900/40 h-[320px] sm:h-[420px] overflow-y-scroll overscroll-contain px-4 py-4 space-y-3"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {messages.map((m) => {
              if (m.kind === 'fallback') {
                return (
                  <FallbackBubble
                    key={m.id}
                    text={m.text}
                    ts={m.ts}
                    waText={t.waCta[lang]}
                  />
                )
              }
              return (
                <Bubble
                  key={m.id}
                  isUser={m.from === 'user'}
                  text={m.text}
                  ts={m.ts}
                />
              )
            })}
            {loading && <TypingBubble />}
          </div>

          {/* Input */}
          <form onSubmit={send} className="bg-ms-green-800 border-t border-ms-gold-600/15 px-4 py-3 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder[lang]}
              disabled={loading}
              className="flex-1 bg-ms-green-900 text-ms-ivory-0 placeholder:text-ms-ivory-0/40 rounded-full px-4 py-2 text-[16px] sm:text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-0 disabled:opacity-60"
              aria-label={t.placeholder[lang]}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 bg-ms-gold-600 rounded-full flex items-center justify-center disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-ivory-0"
              aria-label={t.placeholder[lang]}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function linkify(text: string, isUser: boolean): React.ReactNode[] {
  const urlRe = /https?:\/\/[^\s]+|mindsynckw\.com\/[^\s]*/g
  const result: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = urlRe.exec(text)) !== null) {
    if (m.index > last) result.push(text.slice(last, m.index))
    const raw = m[0].replace(/[.,;!?)]+$/, '')
    const href = raw.startsWith('http') ? raw : `https://${raw}`
    result.push(
      <a
        key={m.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline break-all ${isUser ? 'text-ms-green-900/80 hover:text-ms-green-900' : 'text-ms-gold-400 hover:text-ms-gold-300'}`}
      >
        {raw}
      </a>
    )
    last = m.index + raw.length
  }
  if (last < text.length) result.push(text.slice(last))
  return result
}

function Bubble({ isUser, text, ts }: { isUser: boolean; text: string; ts: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed shadow-sm whitespace-pre-line break-words ${
          isUser
            ? 'bg-ms-gold-600 text-ms-green-900 rounded-br-sm'
            : 'bg-ms-green-700 text-ms-ivory-0 rounded-bl-sm'
        }`}
      >
        {linkify(text, isUser)}
        <span className={`text-[10px] ms-2 float-right mt-0.5 ${isUser ? 'text-ms-green-900/60' : 'text-ms-ivory-0/50'}`}>{ts}</span>
      </div>
    </motion.div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-ms-green-700 px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm flex gap-1" aria-label="typing">
        <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

function FallbackBubble({ text, ts, waText }: { text: string; ts: string; waText: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start"
    >
      <div className="max-w-[78%] bg-ms-green-700 text-ms-ivory-0 rounded-2xl rounded-bl-sm shadow-sm px-3.5 py-2.5 text-[13px] leading-relaxed">
        <p className="whitespace-pre-line">{text}</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 bg-ms-green-800 text-ms-ivory-0 text-[12px] font-semibold rounded-full px-3.5 py-1.5 shadow-sm hover:bg-ms-green-700 transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.52 3.48A11.78 11.78 0 0012.04 0C5.5 0 .17 5.33.16 11.88c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.86 11.86 0 005.74 1.46h.01c6.55 0 11.88-5.33 11.88-11.88a11.78 11.78 0 00-3.41-8.45z" />
          </svg>
          {waText}
        </a>
        <span className="block text-[10px] text-ms-ivory-0/50 mt-1.5">{ts}</span>
      </div>
    </motion.div>
  )
}

