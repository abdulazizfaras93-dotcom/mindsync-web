'use client'
import { useEffect, useRef, useState } from 'react'

const GREEN = '#0F2E22', GOLD = '#BF8D38'

export default function MindSyncSetupPage() {
  const [name, setName] = useState('عبدالعزيز شاكر فرس')
  const [busy, setBusy] = useState(false)
  const [saved, setSaved] = useState(false)
  const [current, setCurrent] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const hasDrawn = useRef(false)

  useEffect(() => {
    const c = canvasRef.current
    if (c) {
      const ctx = c.getContext('2d')!
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height)
      ctx.strokeStyle = '#10231a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    }
    fetch('/api/mindsync-signature').then((r) => r.json()).then((d) => {
      if (d.signature) setCurrent(d.signature)
      if (d.name) setName(d.name)
    }).catch(() => {})
  }, [])

  const pos = (e: React.PointerEvent) => {
    const c = canvasRef.current!, r = c.getBoundingClientRect()
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }
  }
  const start = (e: React.PointerEvent) => {
    drawing.current = true; hasDrawn.current = true
    const ctx = canvasRef.current!.getContext('2d')!; const { x, y } = pos(e); ctx.beginPath(); ctx.moveTo(x, y)
    try { (e.target as Element).setPointerCapture(e.pointerId) } catch {}
  }
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return
    const ctx = canvasRef.current!.getContext('2d')!; const { x, y } = pos(e); ctx.lineTo(x, y); ctx.stroke()
  }
  const clearPad = () => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); hasDrawn.current = false
  }

  const save = async () => {
    if (!hasDrawn.current || busy) return
    setBusy(true)
    try {
      const signature = canvasRef.current!.toDataURL('image/png')
      const r = await fetch('/api/mindsync-signature', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), signature }),
      })
      const d = await r.json()
      if (d.ok) { setSaved(true); setCurrent(signature) } else alert('صار خطأ بالحفظ')
    } catch { alert('صار خطأ، حاول مرة ثانية') }
    finally { setBusy(false) }
  }

  const box: React.CSSProperties = { maxWidth: 560, margin: '0 auto', padding: 24 }
  return (
    <div style={{ direction: 'rtl', minHeight: '100dvh', background: '#ECE7DC', fontFamily: 'var(--font-kufi), sans-serif', color: '#1d2a22' }}>
      <div style={{ background: GREEN, color: '#fff', padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'center' }}>
        <img src="/logo.png" alt="MindSync" style={{ width: 30, height: 30, objectFit: 'contain' }} />
        <b>توقيع المزوّد — MindSync</b>
      </div>
      <div style={box}>
        <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
          هذا توقيع MindSync الافتراضي، يُحفظ مرة واحدة ويظهر مُوقّعاً مسبقاً على كل عقود العملاء.
        </p>

        {current && (
          <div style={{ background: '#fff', border: '1px solid #E7E0CF', borderRadius: 12, padding: 14, marginBottom: 18 }}>
            <div style={{ fontSize: 12.5, color: GOLD, fontWeight: 700, marginBottom: 6 }}>التوقيع الحالي المحفوظ</div>
            <img src={current} alt="MindSync" style={{ maxWidth: 200, maxHeight: 70 }} />
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: 12, padding: 22, boxShadow: '0 6px 24px rgba(0,0,0,.08)' }}>
          <label style={{ fontSize: 13.5, color: '#444', display: 'block', marginBottom: 6 }}>اسم الموقّع</label>
          <input value={name} onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', fontSize: 16, padding: '11px 14px', border: '1.5px solid #ddd5c4', borderRadius: 10, fontFamily: 'inherit', marginBottom: 14 }} />

          <label style={{ fontSize: 13.5, color: '#444', display: 'block', marginBottom: 6 }}>وقّع هنا 👇</label>
          <div style={{ position: 'relative' }}>
            <canvas ref={canvasRef} width={600} height={200}
              onPointerDown={start} onPointerMove={move} onPointerUp={() => (drawing.current = false)} onPointerLeave={() => (drawing.current = false)}
              style={{ width: '100%', height: 200, background: '#fff', border: '1.5px dashed #c9c0a8', borderRadius: 10, touchAction: 'none', cursor: 'crosshair' }} />
            <button type="button" onClick={clearPad}
              style={{ position: 'absolute', top: 8, left: 8, background: '#f0ece1', border: '1px solid #ddd5c4', borderRadius: 8, padding: '5px 12px', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer' }}>مسح</button>
          </div>

          <button onClick={save} disabled={busy}
            style={{ width: '100%', marginTop: 16, background: GREEN, color: '#fff', border: 'none', borderRadius: 12, padding: 15, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>
            {busy ? 'جارٍ الحفظ…' : 'حفظ توقيع MindSync الافتراضي'}
          </button>
          {saved && <p style={{ color: GREEN, fontWeight: 700, textAlign: 'center', marginTop: 12 }}>✓ تم الحفظ — صار توقيعج يظهر على كل العقود.</p>}
        </div>
      </div>
    </div>
  )
}
