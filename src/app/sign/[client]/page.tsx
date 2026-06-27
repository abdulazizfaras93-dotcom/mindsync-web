'use client'
import { useEffect, useRef, useState } from 'react'
import s from './sign.module.css'
import { CONTRACTS, PROVIDER, scopeFor, article1, REST_ARTICLES, type ContractData } from '@/lib/contracts'

const REST_NUM = ['٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١']

function fmtDate(iso: string) {
  const d = iso ? new Date(iso) : new Date()
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

export default function SignContractPage({ params }: { params: { client: string } }) {
  // Record-driven: start from the static contracts.ts (instant for existing clients),
  // then upgrade from the live onboarding record if one exists for this slug.
  const [data, setData] = useState<ContractData | undefined>(CONTRACTS[params.client])
  const [loading, setLoading] = useState(!CONTRACTS[params.client])

  const [name, setName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [signed, setSigned] = useState(false)
  const [signedAt, setSignedAt] = useState('')
  const [sigUrl, setSigUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [msSig, setMsSig] = useState<{ name: string; signature: string | null }>({ name: PROVIDER.name, signature: null })
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
    fetch('/api/mindsync-signature').then((r) => r.json())
      .then((d) => setMsSig({ name: d.name || PROVIDER.name, signature: d.signature || null })).catch(() => {})
  }, [])

  useEffect(() => {
    fetch(`/api/contract?slug=${encodeURIComponent(params.client)}`)
      .then((r) => r.json())
      .then((j) => { if (j?.found && j.contract) setData(j.contract as ContractData) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [params.client])

  if (loading) {
    return <div style={{ direction: 'rtl', padding: 40, textAlign: 'center', fontFamily: 'var(--font-kufi), sans-serif' }}>جارٍ التحميل…</div>
  }
  if (!data) {
    return <div style={{ direction: 'rtl', padding: 40, textAlign: 'center', fontFamily: 'var(--font-kufi), sans-serif' }}>هذا العقد غير موجود.</div>
  }

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

  const sign = async () => {
    if (!name.trim() || !agreed || !hasDrawn.current || busy) return
    setBusy(true)
    try {
      const signature = canvasRef.current!.toDataURL('image/png')
      const r = await fetch('/api/sign-contract', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ client: params.client, name: name.trim(), signature, agreed: true }),
      })
      const d = await r.json()
      if (d.ok) { setSigUrl(signature); setSignedAt(d.signedAt); setSigned(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else alert('صار خطأ بالتوقيع، حاول مرة ثانية')
    } catch { alert('صار خطأ، تأكد من الاتصال وحاول مرة ثانية') }
    finally { setBusy(false) }
  }

  return (
    <div className={s.page}>
      <style>{`@media print { .noprint{display:none!important} [aria-label="Analytics consent"]{display:none!important} body{background:#fff} }`}</style>

      <div className={`${s.bar} noprint`}>
        <img src="/logo.png" alt="MindSync" />
        <span>عقد إلكتروني — MindSync</span>
      </div>

      <div id="contract" className={s.contract}>
        <div className={s.hd}>
          <img src="/logo.png" alt="MindSync" />
          <div><h1>عقد تقديم خدمة — وكيل ذكاء اصطناعي</h1><div className={s.s}>MindSync · مايند سينك — حلول الذكاء الاصطناعي</div></div>
        </div>

        <div className={s.parties}>
          أُبرم هذا العقد بين:<br />
          <b>الطرف الأول (مزوّد الخدمة):</b> MindSync (مايند سينك) — رقم الرخصة التجارية: {PROVIDER.license} · البريد الإلكتروني: {PROVIDER.email} · رقم التواصل: {PROVIDER.phone}<br />
          <b>الطرف الثاني (العميل):</b> {data.businessName} — رقم واتساب العمل: {data.whatsapp}
        </div>

        <div className={s.art}><h3>المادة ١: موضوع العقد</h3><p>{article1(data.channelsAr)}</p></div>
        <div className={s.art}>
          <h3>المادة ٢: نطاق الخدمة</h3>
          <ul className={s.feat}>{scopeFor(data.channelsAr).map((x, i) => <li key={i}>{x}</li>)}</ul>
        </div>
        <div className={s.art}>
          <h3>المادة ٣: الرسوم والدفع</h3>
          <table className={s.price}><tbody>
            <tr><th>البند</th><th>المبلغ</th><th>ملاحظات</th></tr>
            {data.pricing.map(([a, b, c], i) => <tr key={i}><td>{a}</td><td className={s.amt}>{b}</td><td className={s.nt}>{c}</td></tr>)}
          </tbody></table>
          <p>تُدفع رسوم الاشتراك الشهري مقدماً في بداية كل دورة. جميع المبالغ بالدينار الكويتي وغير شاملة أي رسوم خارجية لمزوّدي الخدمات (مثل واتساب الرسمي) إن وُجدت.</p>
        </div>
        {REST_ARTICLES.map(([t, b], i) => (
          <div className={s.art} key={i}><h3>المادة {REST_NUM[i]}: {t}</h3><p>{b}</p></div>
        ))}

        <div className={s.signrow}>
          <div className={s.sigbox}>
            <div className={s.sigrole}>الطرف الأول — MindSync</div>
            <div className={s.signedName}>{msSig.name}</div>
            {msSig.signature ? (
              <><img className={s.sigimg} src={msSig.signature} alt="توقيع MindSync" /><div className={s.signedMeta}>موقّع مسبقاً عن MindSync</div></>
            ) : <div className={s.sigline}>التوقيع: ______________</div>}
          </div>
          <div className={s.sigbox}>
            <div className={s.sigrole}>الطرف الثاني — {data.businessName}</div>
            {signed ? (
              <>
                <div className={s.signedName}>{name}</div>
                <img className={s.sigimg} src={sigUrl} alt="التوقيع" />
                <div className={s.signedMeta}>موقّع إلكترونياً · {fmtDate(signedAt)}</div>
              </>
            ) : (
              <>
                <div className={s.sigline}>الاسم: ______________</div>
                <div className={s.sigline}>التوقيع: ______________</div>
                <div className={s.sigline}>التاريخ: ______________</div>
              </>
            )}
          </div>
        </div>
      </div>

      {!signed ? (
        <div className={`${s.widget} noprint`}>
          <h3>التوقيع الإلكتروني</h3>
          <label className={s.lbl}>الاسم الكامل</label>
          <input className={s.inp} value={name} onChange={(e) => setName(e.target.value)} />
          <label className={s.lbl}>التوقيع</label>
          <div className={s.padwrap}>
            <canvas ref={canvasRef} className={s.pad} width={600} height={200}
              onPointerDown={start} onPointerMove={move} onPointerUp={() => (drawing.current = false)} onPointerLeave={() => (drawing.current = false)} />
            <button type="button" className={s.clear} onClick={clearPad}>مسح</button>
          </div>
          <label className={s.agree}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>أوافق على شروط هذا العقد وأوقّعه إلكترونياً</span>
          </label>
          <button className={s.signbtn} disabled={busy || !name.trim() || !agreed} onClick={sign}>
            {busy ? 'جارٍ التوقيع…' : 'توقيع وإتمام العقد'}
          </button>
          <p className={s.hint}>بالضغط على «توقيع» يُسجَّل التوقيع مع التاريخ والوقت كموافقة إلكترونية.</p>
        </div>
      ) : (
        <div className={`${s.done} noprint`}>
          <div className={s.doneMsg}>✓ تم توقيع العقد بنجاح، يا {name} 🌸</div>
          <p>تقدرين تحفظين نسختج من العقد الحين.</p>
          <button className={s.dl} onClick={() => window.print()}>تحميل / حفظ العقد PDF</button>
        </div>
      )}
    </div>
  )
}
