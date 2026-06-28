'use client'
import { useEffect, useRef, useState } from 'react'
import s from '../try/matcha/trymatcha.module.css'

type Msg = { who: 'c' | 'a'; text: string }

function time() {
  const d = new Date()
  let h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ap = h >= 12 ? 'م' : 'ص'
  h = h % 12 || 12
  return `${h}:${m} ${ap}`
}

// Generic, reusable demo. Open with: /demo?biz=<name>&ctx=<business info>&lang=ar
// e.g. /demo?biz=عيادة النور&ctx=عيادة أسنان... تنظيف ٢٠ د.ك... الدوام ١٠-٨&lang=ar
export default function DemoPage() {
  const [biz, setBiz] = useState('MindSync')
  const [ctx, setCtx] = useState('')
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const sid = useRef<string>('d_' + Math.random().toString(36).slice(2) + Date.now().toString(36))
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    if (p.get('biz')) setBiz(p.get('biz') as string)
    if (p.get('ctx')) setCtx(p.get('ctx') as string)
    if (p.get('lang') === 'en') setLang('en')
  }, [])

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, busy])
  useEffect(() => {
    const d = document.documentElement, b = document.body
    const pd = d.style.overflowX, pb = b.style.overflowX
    d.style.overflowX = 'hidden'; b.style.overflowX = 'hidden'
    return () => { d.style.overflowX = pd; b.style.overflowX = pb }
  }, [])

  const send = async (text: string) => {
    const t = text.trim()
    if (!t || busy) return
    setInput('')
    setMsgs((m) => [...m, { who: 'c', text: t }])
    setBusy(true)
    try {
      const r = await fetch('/api/try-demo', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: t, sessionId: sid.current, businessName: biz, businessContext: ctx, lang }),
      })
      const data = await r.json()
      setMsgs((m) => [...m, { who: 'a', text: data.reply || '...' }])
    } catch {
      setMsgs((m) => [...m, { who: 'a', text: lang === 'en' ? 'Try again.' : 'جرّبوا مرة ثانية 🌿' }])
    } finally {
      setBusy(false)
    }
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  const onlineTxt = lang === 'en' ? 'online now' : 'متصل الآن'
  const encTxt = lang === 'en' ? `🔒 Protected. This is an AI agent answering for ${biz}` : `🔒 الرسائل محمية. هذا وكيل ذكي يرد عن ${biz}`
  const emptyTxt = lang === 'en' ? 'Type "hi" below to start 👇' : 'اكتبوا «هلا» تحت عشان تبدون 👇'
  const initial = (biz || 'M').trim().charAt(0)

  return (
    <div className={s.page}>
      <div className={s.head}>
        <div className={s.av} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#153E2D', color: '#BF8D38', fontWeight: 700, fontSize: 20 }}>{initial}</div>
        <div className={s.hmeta}>
          <div className={s.nm}>{biz}</div>
          <div className={s.st}>{onlineTxt}</div>
        </div>
        <svg className={s.hicon} viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" /></svg>
        <svg className={s.hicon} viewBox="0 0 24 24"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.5-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1z" /></svg>
      </div>

      <div className={s.body} ref={bodyRef}>
        <div className={s.enc}>{encTxt}</div>
        {msgs.length === 0 && <div className={s.empty}>{emptyTxt}</div>}
        {msgs.map((m, i) => (
          <div key={i} className={`${s.row} ${m.who === 'a' ? s.ai : s.cust}`}>
            <div className={s.bub}>
              <span className={s.txt}>{m.text}</span>
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
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKey} rows={1} placeholder={lang === 'en' ? 'Message' : 'رسالة'} />
        </div>
        <button className={s.send} onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="send">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 20.5v-6l8-2.5-8-2.5v-6l19 8.5z" /></svg>
        </button>
      </div>
    </div>
  )
}
