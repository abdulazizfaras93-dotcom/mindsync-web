'use client'
import { useEffect, useRef, useState } from 'react'
import s from './trymatcha.module.css'

type Msg = { who: 'c' | 'a'; text: string }

function time() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ap = h >= 12 ? 'م' : 'ص'
  h = h % 12 || 12
  return `${h}:${m} ${ap}`
}

export default function TryMatchaPage() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const sid = useRef<string>('s_' + Math.random().toString(36).slice(2) + Date.now().toString(36))
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, busy])

  const send = async (text: string) => {
    const t = text.trim()
    if (!t || busy) return
    setInput('')
    setMsgs((m) => [...m, { who: 'c', text: t }])
    setBusy(true)
    try {
      const r = await fetch('/api/try-matcha', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: t, sessionId: sid.current }),
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

  const renderBody = (text: string) => {
    const parts = text.split('[[MENU]]')
    return parts.map((p, i) => {
      const clean = p.trim()
      return (
        <span key={i}>
          {clean && <span className={s.txt}>{clean}</span>}
          {i < parts.length - 1 && (
            <img className={s.menuImg} src="/clients/matcha-menu.png" alt="قائمة خدمات وأسعار ماتشا سبا" />
          )}
        </span>
      )
    })
  }

  return (
    <div className={s.page}>
      <div className={s.head}>
        <div className={s.av}><img src="/clients/matcha.jpg" alt="ماتشا سبا" /></div>
        <div className={s.hmeta}>
          <div className={s.nm}>ماتشا سبا</div>
          <div className={s.st}>متصل الآن</div>
        </div>
        <svg className={s.hicon} viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" /></svg>
        <svg className={s.hicon} viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.5-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1z" /></svg>
      </div>

      <div className={s.body} ref={bodyRef}>
        <div className={s.enc}>🔒 الرسائل محمية. هذا وكيل ذكي يرد عن ماتشا سبا</div>
        {msgs.length === 0 && (
          <div className={s.empty}>اكتبي «هلا» تحت عشان تبدئين 👇</div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`${s.row} ${m.who === 'a' ? s.ai : s.cust}`}>
            <div className={s.bub}>
              {renderBody(m.text)}
              <span className={s.tm}>{time()}{m.who === 'c' && <span className={s.tick}>✓✓</span>}</span>
            </div>
          </div>
        ))}
        {busy && (
          <div className={`${s.row} ${s.ai}`}>
            <div className={s.bub}><div className={s.typing}><span /><span /><span /></div></div>
          </div>
        )}
      </div>

      <div className={s.inbar}>
        <div className={s.field}>
          <svg className={s.ficon} viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a5 5 0 0 1 5 5v6a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5m7 11a7 7 0 0 1-6 6.9V22h-2v-2.1A7 7 0 0 1 5 13h2a5 5 0 0 0 10 0z" opacity="0" /></svg>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            rows={1}
            placeholder="رسالة"
          />
        </div>
        <button className={s.send} onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="إرسال">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 20.5v-6l8-2.5-8-2.5v-6l19 8.5z" /></svg>
        </button>
      </div>
    </div>
  )
}
