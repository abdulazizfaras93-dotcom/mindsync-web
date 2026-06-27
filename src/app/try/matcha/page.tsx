'use client'
import { useEffect, useRef, useState } from 'react'
import s from './trymatcha.module.css'

type Msg = { who: 'c' | 'a'; text: string }

const GREETING = 'هلا وغلا في ماتشا سبا 🌸 أنا وكيلتج الذكية — اسأليني عن خدماتنا، أسعارنا، أو احجزي موعدج. شلون أقدر أساعدج؟'
const STARTERS = ['كم بدكير منكير؟', 'تطلعون مدينة الكويت؟', 'أبي أحجز موعد', 'عندكم مساج؟']

export default function TryMatchaPage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ who: 'a', text: GREETING }])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const sid = useRef<string>('s_' + Math.random().toString(36).slice(2) + Date.now().toString(36))
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, busy])

  const send = async (text: string) => {
    const t = text.trim()
    if (!t || busy) return
    setInput('')
    const next: Msg[] = [...msgs, { who: 'c', text: t }]
    setMsgs(next)
    setBusy(true)
    try {
      const history = next.slice(1).map((m) => ({ role: m.who === 'c' ? 'user' : 'assistant', content: m.text }))
      const r = await fetch('/api/try-matcha', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await r.json()
      setMsgs((m) => [...m, { who: 'a', text: data.reply || '...' }])
    } catch {
      setMsgs((m) => [...m, { who: 'a', text: 'تأخرت شوي، جرّبي مرة ثانية 🌸' }])
    } finally {
      setBusy(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <div className={s.page}>
      <div className={s.head}>
        <div className={s.av}><img src="/clients/matcha.jpg" alt="Matcha Spa" /></div>
        <div className={s.hmeta}>
          <div className={s.nm}>وكيل ماتشا سبا</div>
          <div className={s.st}><i /> متصل الآن · يرد فوراً</div>
        </div>
        <div className={s.hby}>by MindSync</div>
      </div>

      <div className={s.body} ref={bodyRef}>
        {msgs.map((m, i) => (
          <div key={i} className={`${s.row} ${m.who === 'a' ? s.ai : s.cust}`}>
            <div className={s.bub}>
              {m.who === 'a' && <div className={s.tag}>✦ AI</div>}
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className={`${s.row} ${s.ai}`}>
            <div className={s.bub}><div className={s.typing}><span /><span /><span /></div></div>
          </div>
        )}
      </div>

      {msgs.length <= 1 && (
        <div className={s.chips}>
          {STARTERS.map((q) => <button key={q} className={s.chip} onClick={() => send(q)}>{q}</button>)}
        </div>
      )}

      <div className={s.inbar}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="اكتبي رسالتج…"
        />
        <button className={s.send} onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="إرسال">➤</button>
      </div>
    </div>
  )
}
