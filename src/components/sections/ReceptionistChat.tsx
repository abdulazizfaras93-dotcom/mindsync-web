'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const WEBHOOK_URL = 'https://ifaras911.app.n8n.cloud/webhook/receptionist-website'

type Msg = {
  id: string
  from: 'user' | 'bot'
  text: string
  ts: string
  kind?: 'text' | 'fallback' | 'contact-form'
}

const t = {
  eyebrow: { en: 'LIVE', ar: 'مباشر' },
  headline: { en: 'Talk to the AI Receptionist', ar: 'تكلم مع موظف الاستقبال الذكي' },
  sub: {
    en: 'Available 24/7 — responds, qualifies, and books a call',
    ar: 'متاح ٢٤/٧ — يرد، يؤهّل، ويحجز لك موعد',
  },
  bullet1: { en: 'Replies in Kuwaiti dialect, Arabic, or English', ar: 'يرد بالكويتي والعربي والإنجليزي' },
  bullet2: { en: 'Books appointments and qualifies leads', ar: 'يحجز المواعيد ويؤهل العملاء' },
  bullet3: { en: 'Hands off to your team on WhatsApp', ar: 'يحوّل العميل لفريقك على واتساب' },
  agentName: { en: 'MindSync Receptionist', ar: 'موظف الاستقبال' },
  online: { en: 'Online · 24/7', ar: 'متصل · ٢٤/٧' },
  placeholder: { en: 'Type your message…', ar: 'اكتب رسالتك…' },
  opener: {
    en: "Hello! I'm MindSync's AI receptionist 👋 What type of business do you have?",
    ar: 'هلا! أنا موظف الاستقبال لمايندسينك 👋 شنو نوع مشروعك؟',
  },
  errorReply: {
    en: 'Connection lost, reach us on WhatsApp 👇',
    ar: 'انقطع الاتصال، تواصل معانا على واتساب 👇',
  },
  waCta: { en: 'Open WhatsApp', ar: 'افتح واتساب' },
  contactAsk: {
    en: 'Your name and WhatsApp number? So we can follow up 🙏',
    ar: 'اسمك ورقم واتسابك؟ عشان نتواصل معاك 🙏',
  },
  contactNamePh: { en: 'Your name', ar: 'اسمك' },
  contactPhonePh: { en: 'WhatsApp number', ar: 'رقم واتسابك' },
  contactSubmit: { en: 'Send', ar: 'إرسال' },
  contactDone: {
    en: 'Done! Our team will reach out soon ✅',
    ar: 'تم! راح يتواصل معك الفريق قريباً ✅',
  },
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
  const [contactShown, setContactShown] = useState(false)
  const [contactDone, setContactDone] = useState(false)

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

  // Autoscroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, loading])

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading || !sessionId) return

    const userMsg: Msg = { id: uid(), from: 'user', text, ts: nowTime() }
    const userMsgCount = messages.filter((m) => m.from === 'user').length + 1
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

      if (userMsgCount >= 3 && !contactShown && !contactDone) {
        setContactShown(true)
        setMessages((prev) => [
          ...prev,
          { id: uid(), from: 'bot', text: t.contactAsk[lang], ts: nowTime(), kind: 'contact-form' },
        ])
      }
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

  async function submitContact(name: string, phone: string) {
    setContactDone(true)
    setMessages((prev) => prev.filter((m) => m.kind !== 'contact-form'))

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'Contact info collected',
          name,
          phone,
          user_id: sessionId,
          channel: 'website',
        }),
      })
    } catch {
      // Local confirmation still shown — silent failure is fine for this lead capture
    }

    setMessages((prev) => [
      ...prev,
      { id: uid(), from: 'bot', text: t.contactDone[lang], ts: nowTime() },
    ])
  }

  return (
    <section ref={sectionRef} className="bg-ms-green-900 py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
            <div className="w-9 h-9 rounded-full bg-ms-gold-600/20 flex items-center justify-center" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
                <path d="M 12 44 C 12 28 20 18 32 18 C 44 18 52 28 52 44" stroke="#BF8D38" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 22 44 C 22 34 26 28 32 28 C 38 28 42 34 42 44" stroke="#BF8D38" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="44" r="3.5" fill="#BF8D38" />
                <circle cx="52" cy="44" r="3.5" fill="#BF8D38" />
              </svg>
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
            className="bg-ms-green-900/40 max-h-[480px] min-h-[360px] overflow-y-auto px-4 py-4 space-y-3"
          >
            {messages.map((m) => {
              if (m.kind === 'contact-form' && !contactDone) {
                return (
                  <ContactFormBubble
                    key={m.id}
                    askText={m.text}
                    namePh={t.contactNamePh[lang]}
                    phonePh={t.contactPhonePh[lang]}
                    submitText={t.contactSubmit[lang]}
                    onSubmit={submitContact}
                  />
                )
              }
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
              className="flex-1 bg-ms-green-900 text-ms-ivory-0 placeholder:text-ms-ivory-0/40 rounded-full px-4 py-2 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-0 disabled:opacity-60"
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

function Bubble({ isUser, text, ts }: { isUser: boolean; text: string; ts: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed shadow-sm whitespace-pre-line ${
          isUser
            ? 'bg-ms-gold-600 text-ms-green-900 rounded-br-sm'
            : 'bg-ms-green-700 text-ms-ivory-0 rounded-bl-sm'
        }`}
      >
        {text}
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
          className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white text-[12px] font-semibold rounded-full px-3.5 py-1.5 shadow-sm hover:bg-[#20bd5a] transition-colors"
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

function ContactFormBubble({
  askText,
  namePh,
  phonePh,
  submitText,
  onSubmit,
}: {
  askText: string
  namePh: string
  phonePh: string
  submitText: string
  onSubmit: (name: string, phone: string) => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const valid = name.trim().length > 1 && phone.trim().length >= 6

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-start"
    >
      <div className="max-w-[88%] w-full bg-ms-green-700 text-ms-ivory-0 rounded-2xl rounded-bl-sm shadow-sm px-3.5 py-3 text-[13px] leading-relaxed">
        <p className="mb-2.5">{askText}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (valid) onSubmit(name.trim(), phone.trim())
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePh}
            className="bg-ms-green-900 text-ms-ivory-0 placeholder:text-ms-ivory-0/40 rounded-lg px-3 py-2 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={phonePh}
            className="bg-ms-green-900 text-ms-ivory-0 placeholder:text-ms-ivory-0/40 rounded-lg px-3 py-2 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600"
          />
          <button
            type="submit"
            disabled={!valid}
            className="self-start bg-ms-gold-600 text-ms-green-900 font-semibold text-[12px] rounded-full px-4 py-1.5 disabled:opacity-40 hover:bg-ms-gold-500 transition-colors"
          >
            {submitText}
          </button>
        </form>
      </div>
    </motion.div>
  )
}
