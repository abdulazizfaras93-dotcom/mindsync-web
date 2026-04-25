'use client'
import { useState, useEffect, useRef } from 'react'
import { useLang } from '@/lib/lang'
import { getScript, type IndustryId } from '@/lib/demo-scripts'

/**
 * Hybrid demo chat — Decision 5-C in the rollout plan.
 *
 *   Phase 1 (canned): play the pre-written 3+ turn script with typing
 *                     indicators. No network calls. Always works.
 *   Phase 2 (live):   once the script finishes, reveal an input. Every
 *                     message posts to /api/demo which proxies to the
 *                     n8n receptionist demo webhook, scoped to this
 *                     industry's system prompt.
 *
 * Safe to swap into Demo.tsx: same visual footprint as the original chat.
 */

type ChatMessage = {
  from: 'user' | 'bot'
  text: string
  ts: string
}

type DemoChatProps = {
  industry: IndustryId
  bundleLabel?: string
}

const t = {
  agent:     { en: 'MindSync Agent', ar: 'وكيل مايندسينك' },
  online:    { en: 'Online · replies in seconds', ar: 'متصل · يرد خلال ثوانٍ' },
  askOwn:    { en: 'Ask your own question…', ar: 'اسأل سؤالك الخاص…' },
  sending:   { en: 'Sending…', ar: 'يرسل…' },
  errorSend: { en: 'Something broke. Try again in a moment.', ar: 'صار خطأ. جرّب مرة ثانية.' },
}

function nowTime() {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function DemoChat({ industry, bundleLabel }: DemoChatProps) {
  const { lang } = useLang()
  const script = getScript(industry)

  const [playedCount, setPlayedCount] = useState(0)
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  const scriptFinished = playedCount >= script.length

  // Canned playback
  useEffect(() => {
    setPlayedCount(0)
    setLiveMessages([])
    setError(null)
    const timers: ReturnType<typeof setTimeout>[] = []
    script.forEach((_, i) => {
      timers.push(setTimeout(() => setPlayedCount(i + 1), i * 900 + 300))
    })
    return () => timers.forEach(clearTimeout)
  }, [industry, script])

  // Autoscroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [playedCount, liveMessages, loading])

  async function sendLive(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { from: 'user', text, ts: nowTime() }
    setLiveMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ industry, message: text, lang }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { reply: string }
      setLiveMessages((prev) => [...prev, { from: 'bot', text: data.reply, ts: nowTime() }])
    } catch (err) {
      setError(t.errorSend[lang])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-ms-ivory-200 overflow-hidden shadow-sm flex flex-col">
      {/* Header */}
      <div className="bg-ms-green-800 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-ms-gold-600/20 flex items-center justify-center" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
            <path d="M 12 44 C 12 28 20 18 32 18 C 44 18 52 28 52 44" stroke="#BF8D38" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 22 44 C 22 34 26 28 32 28 C 38 28 42 34 42 44" stroke="#BF8D38" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="44" r="3.5" fill="#BF8D38" />
            <circle cx="52" cy="44" r="3.5" fill="#BF8D38" />
          </svg>
        </div>
        <div>
          <p className="text-ms-ivory-0 text-[14px] font-semibold leading-none">{t.agent[lang]}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <p className="text-white/60 text-[11px]">{t.online[lang]}</p>
          </div>
        </div>
        {bundleLabel && (
          <div className="ms-auto">
            <span className="bg-ms-gold-600/20 text-ms-gold-600 text-[10px] font-mono px-2 py-0.5 rounded tracking-wider uppercase">
              {bundleLabel}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        ref={chatRef}
        className="h-72 overflow-y-auto px-4 py-4 space-y-3 bg-[#ECE5DD]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23BF8D38' stroke-width='0.2' opacity='0.15'%3E%3Cpolygon points='20,2 38,11 38,29 20,38 2,29 2,11'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {/* Canned turns */}
        {script.slice(0, playedCount).map((msg, i) => {
          const isUser = i % 2 === 0
          return (
            <Bubble
              key={`c-${i}`}
              isUser={isUser}
              text={msg[lang][0]}
              ts={nowTime()}
            />
          )
        })}

        {/* Typing while canned turns finish */}
        {!scriptFinished && <TypingBubble />}

        {/* Live conversation */}
        {scriptFinished && liveMessages.map((m, i) => (
          <Bubble key={`l-${i}`} isUser={m.from === 'user'} text={m.text} ts={m.ts} />
        ))}
        {scriptFinished && loading && <TypingBubble />}
        {error && (
          <p className="text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Input — live only after the canned script completes */}
      <form onSubmit={sendLive} className="px-4 py-3 bg-white border-t border-ms-ivory-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          disabled={!scriptFinished || loading}
          onChange={(e) => setInput(e.target.value)}
          placeholder={scriptFinished ? t.askOwn[lang] : '…'}
          className="flex-1 bg-ms-ivory-100 rounded-full px-4 py-2 text-ms-ink-900 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 focus-visible:ring-offset-1 disabled:opacity-60"
          aria-label={t.askOwn[lang]}
        />
        <button
          type="submit"
          disabled={!scriptFinished || loading || !input.trim()}
          className="w-9 h-9 bg-ms-green-800 rounded-full flex items-center justify-center disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600"
          aria-label={loading ? t.sending[lang] : t.askOwn[lang]}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

function Bubble({ isUser, text, ts }: { isUser: boolean; text: string; ts: string }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
          isUser ? 'bg-[#DCF8C6] text-gray-900 rounded-br-sm' : 'bg-white text-gray-900 rounded-bl-sm'
        }`}
      >
        {text}
        <span className="text-[10px] text-gray-400 ms-2 float-right mt-0.5">{ts}</span>
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm flex gap-1" aria-label="typing">
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
