'use client'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

// Floating AI-receptionist launcher for the homepage. Opens a chat popup wired to
// MindSync's own Receptionist agent (n8n /webhook/receptionist-website → { reply }).
const WEBHOOK_URL = 'https://ifaras911.app.n8n.cloud/webhook/receptionist-website'

type Msg = { id: string; from: 'user' | 'bot'; text: string; ts: string; fallback?: boolean }

const T = {
  launch: { en: 'Chat with our AI', ar: 'تكلم مع مساعدنا الذكي' },
  nudge: { en: 'Need help? Ask our AI 👋', ar: 'محتاج مساعدة؟ اسأل مساعدنا الذكي 👋' },
  agent: { en: 'MindSync Assistant', ar: 'مساعد مايند سينك' },
  online: { en: 'Online · 24/7', ar: 'متصل · ٢٤/٧' },
  ph: { en: 'Type your message…', ar: 'اكتب رسالتك...' },
  opener: {
    en: "Hi! 👋 I'm MindSync's AI assistant — ask me about pricing, features, or book a call.",
    ar: 'هلا والله! 👋 أنا المساعد الذكي لمايند سينك — اسألوني عن الأسعار، المزايا، أو احجزوا مكالمة.',
  },
  err: { en: 'Reach us on WhatsApp 👇', ar: 'تواصلوا ويانا على الواتساب 👇' },
  wa: { en: 'Open WhatsApp', ar: 'افتح الواتساب' },
  close: { en: 'Close', ar: 'إغلاق' },
}

function nowTime() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}
function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function ReceptionistWidget() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setSessionId(uid()) }, [])

  // one-time discoverability nudge
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // fire opener the first time the panel is opened
  useEffect(() => {
    if (!open || messages.length) return
    setLoading(true)
    const t = setTimeout(() => {
      setMessages([{ id: uid(), from: 'bot', text: T.opener[lang], ts: nowTime() }])
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }, 450)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // autoscroll
  useEffect(() => {
    const el = chatRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading || !sessionId) return
    setMessages((prev) => [...prev, { id: uid(), from: 'user', text, ts: nowTime() }])
    setInput('')
    setLoading(true)
    try {
      const controller = new AbortController()
      const to = setTimeout(() => controller.abort(), 30000)
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, name: 'Website Visitor', user_id: sessionId, channel: 'website', language: lang }),
        signal: controller.signal,
      })
      clearTimeout(to)
      if (!res.ok) throw new Error('bad status')
      const data = await res.json()
      const reply: string = data?.reply ?? T.err[lang]
      setMessages((prev) => [...prev, { id: uid(), from: 'bot', text: reply, ts: nowTime() }])
    } catch {
      setMessages((prev) => [...prev, { id: uid(), from: 'bot', text: T.err[lang], ts: nowTime(), fallback: true }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  return (
    <>
      {open && (
        <div className="fixed z-[60] bottom-24 left-4 right-4 sm:right-auto sm:left-6 sm:w-[370px] max-w-[calc(100vw-2rem)]">
          <div className="flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-ms-gold-600/25 bg-ms-green-800/95 backdrop-blur-md">
            <div className="bg-ms-green-800 px-4 py-3 flex items-center gap-3 border-b border-ms-gold-600/15">
              <div className="w-9 h-9 rounded-full bg-ms-green-900/60 flex items-center justify-center text-ms-gold-400" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-ms-ivory-0 text-[14px] font-semibold leading-none">{T.agent[lang]}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-ms-ivory-0/60 text-[11px]">{T.online[lang]}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label={T.close[lang]} className="text-ms-ivory-0/60 hover:text-ms-ivory-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-ms-green-900/50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div ref={chatRef} className="bg-ms-green-900/50 h-[340px] overflow-y-auto overscroll-contain px-3.5 py-3.5 space-y-2.5" style={{ WebkitOverflowScrolling: 'touch' }}>
              {messages.map((m) =>
                m.fallback ? (
                  <div key={m.id} className="flex justify-start">
                    <div className="max-w-[80%] bg-ms-green-700 text-ms-ivory-0 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-[13px] leading-relaxed">
                      <p className="whitespace-pre-line">{m.text}</p>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 bg-ms-green-800 text-ms-ivory-0 text-[12px] font-semibold rounded-full px-3.5 py-1.5 hover:bg-ms-green-700">{T.wa[lang]}</a>
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line break-words ${m.from === 'user' ? 'bg-ms-gold-600 text-ms-green-900 rounded-br-sm' : 'bg-ms-green-700 text-ms-ivory-0 rounded-bl-sm'}`}>
                      {m.text}
                      <span className={`block text-[10px] mt-0.5 ${m.from === 'user' ? 'text-ms-green-900/60' : 'text-ms-ivory-0/50'}`}>{m.ts}</span>
                    </div>
                  </div>
                )
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-ms-green-700 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1" aria-label="typing">
                    <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-ms-ivory-0/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={send} className="bg-ms-green-800 border-t border-ms-gold-600/15 px-3 py-2.5 flex items-center gap-2">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={T.ph[lang]} disabled={loading} aria-label={T.ph[lang]}
                className="flex-1 bg-ms-green-900 text-ms-ivory-0 placeholder:text-ms-ivory-0/40 rounded-full px-4 py-2 text-[16px] sm:text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 disabled:opacity-60" />
              <button type="submit" disabled={loading || !input.trim()} aria-label="send" className="w-9 h-9 bg-ms-gold-600 rounded-full flex items-center justify-center disabled:opacity-40 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" /></svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {nudge && !open && (
        <button onClick={() => { setOpen(true); setNudge(false) }}
          className="fixed z-[55] bottom-[6.25rem] left-6 max-w-[220px] bg-ms-ivory-0 text-ms-green-900 text-[13px] font-medium rounded-2xl rounded-bl-sm shadow-xl px-3.5 py-2.5 text-start hover:shadow-2xl transition-shadow">
          {T.nudge[lang]}
        </button>
      )}

      <button onClick={() => { setOpen((o) => !o); setNudge(false) }} title={T.launch[lang]} aria-label={T.launch[lang]}
        className="fixed bottom-6 left-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#1C5038,#BF8D38)' }}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        )}
      </button>
    </>
  )
}
