'use client'
import { useEffect, useRef, useState } from 'react'
import s from './sign.module.css'

const SERVICES = [
  'وكيل ذكاء اصطناعي يعمل ٢٤/٧ باللهجة الكويتية على واتساب وإنستقرام',
  'نظام حجز كامل: استقبال الحجز، تأكيده، وحساب رسوم التوصيل والعربون',
  'تذكير العملاء قبل مواعيدهم تلقائياً واستعادة المواعيد الملغاة',
  'تعديل وإلغاء حجوزات العملاء العائدين',
  'قاعدة بيانات العملاء + لوحة تحكم لمتابعة الحجوزات',
  'ما يصل إلى ٣٬٠٠٠ محادثة شهرياً',
  'المراقبة والصيانة وتحديث الأسعار والردود عند الطلب',
]
const PRICES: [string, string, string][] = [
  ['التجربة (٣٠ يوماً)', '١٥٠ د.ك', 'تُحتسب من رسوم التأسيس عند الاستمرار'],
  ['رسوم التأسيس (مرة واحدة)', '٢٨٥ د.ك', 'يتبقى ١٣٥ د.ك بعد خصم مبلغ التجربة'],
  ['الاشتراك الشهري', '١٠٠ د.ك', 'يشمل ٣٬٠٠٠ محادثة شهرياً'],
  ['محادثات إضافية', '٣٠ د.ك', 'لكل ١٬٠٠٠ محادثة إضافية تتجاوز الحد'],
]
const ARTICLES: [string, string][] = [
  ['موضوع العقد', 'يلتزم الطرف الأول بتزويد الطرف الثاني بخدمة «وكيل ذكاء اصطناعي» ضمن باقة «المنسّق»، يعمل على قنوات الطرف الثاني (واتساب وإنستقرام) للرد على العملاء وإدارة الحجوزات وجمع بيانات العملاء، وفقاً للمواصفات الواردة في هذا العقد.'],
  ['مدفوعات عملاء الطرف الثاني', 'تذهب مبالغ العربون والمدفوعات من عملاء الطرف الثاني مباشرةً إلى حساب الطرف الثاني الخاص، ولا تمر عبر الطرف الأول، والطرف الأول غير مسؤول عن تحصيلها.'],
  ['التزامات الطرف الأول (MindSync)', 'بناء الوكيل وتشغيله وصيانته، وتقديم الدعم والتحديثات، والحفاظ على سرية بيانات الطرف الثاني وعملائه واستخدامها فقط لتشغيل الخدمة.'],
  ['التزامات الطرف الثاني (ماتشا سبا)', 'تزويد الطرف الأول بحساب واتساب بزنس الرسمي وإتمام التوثيق، وتوفير حساب الدفع لاستلام العربون، وتزويد المعلومات الصحيحة (الخدمات والأسعار والمناطق)، وأي تعاون لازم لتفعيل الخدمة.'],
  ['المدة والتجديد', 'يبدأ العقد بفترة تجربة مدتها ٣٠ يوماً، ثم يتجدد تلقائياً لمدد شهرية متتالية ما لم يخطر أحد الطرفين الآخر برغبته في عدم التجديد.'],
  ['الإنهاء', 'يحق لأي من الطرفين إنهاء العقد بإشعار كتابي مسبق مدته ١٤ يوماً. الرسوم المدفوعة عن الفترة المستخدمة غير قابلة للاسترداد، وعند الإنهاء يسلّم الطرف الأول للطرف الثاني بيانات عملائه.'],
  ['البيانات والملكية', 'بيانات العملاء التي يجمعها الوكيل هي ملك للطرف الثاني، ويحتفظ الطرف الأول بملكية النظام والبرمجيات والتقنية المستخدمة في تقديم الخدمة.'],
  ['حدود المسؤولية', 'يبذل الطرف الأول أقصى جهد لضمان عمل الخدمة بكفاءة، إلا أنه لا يضمن استمراريتها دون انقطاع نتيجة أعطال خارجة عن إرادته (مثل انقطاع خدمات واتساب أو مزوّدي الذكاء الاصطناعي)، وتقتصر مسؤوليته على قيمة الاشتراك الشهري.'],
  ['أحكام عامة', 'يخضع هذا العقد لقوانين دولة الكويت، وتُحل أي نزاعات ودياً، وإلا فعبر المحاكم الكويتية المختصة. لا يجوز تعديل العقد إلا كتابةً وبموافقة الطرفين.'],
]

function fmtDate(iso: string) {
  const d = iso ? new Date(iso) : new Date()
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
}

export default function SignMatchaPage() {
  const [name, setName] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [signed, setSigned] = useState(false)
  const [signedAt, setSignedAt] = useState('')
  const [sigUrl, setSigUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [msSig, setMsSig] = useState<{ name: string; signature: string | null }>({ name: 'عبدالعزيز شاكر فرس', signature: null })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const hasDrawn = useRef(false)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height)
    ctx.strokeStyle = '#10231a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
  }, [])

  useEffect(() => {
    fetch('/api/mindsync-signature').then((r) => r.json())
      .then((d) => setMsSig({ name: d.name || 'عبدالعزيز شاكر فرس', signature: d.signature || null }))
      .catch(() => {})
  }, [])

  const pos = (e: React.PointerEvent) => {
    const c = canvasRef.current!, r = c.getBoundingClientRect()
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) }
  }
  const start = (e: React.PointerEvent) => {
    drawing.current = true; hasDrawn.current = true
    const ctx = canvasRef.current!.getContext('2d')!
    const { x, y } = pos(e); ctx.beginPath(); ctx.moveTo(x, y)
    ;(e.target as Element).setPointerCapture(e.pointerId)
  }
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return
    const ctx = canvasRef.current!.getContext('2d')!
    const { x, y } = pos(e); ctx.lineTo(x, y); ctx.stroke()
  }
  const end = () => { drawing.current = false }
  const clearPad = () => {
    const c = canvasRef.current!; const ctx = c.getContext('2d')!
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); hasDrawn.current = false
  }

  const sign = async () => {
    if (!name.trim() || !agreed || !hasDrawn.current || busy) return
    setBusy(true)
    try {
      const signature = canvasRef.current!.toDataURL('image/png')
      const r = await fetch('/api/sign-matcha', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), signature, agreed: true }),
      })
      const data = await r.json()
      if (data.ok) { setSigUrl(signature); setSignedAt(data.signedAt); setSigned(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }
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
          <b>الطرف الأول (مزوّد الخدمة):</b> MindSync (مايند سينك) — رقم الرخصة التجارية: ٢٠٢٦/٨٠٢٤ · البريد الإلكتروني: admin@mindsynckw.com · رقم التواصل: ٩٩٥٣٩٠٠٦<br />
          <b>الطرف الثاني (العميل):</b> صالون «ماتشا سبا» — رقم واتساب العمل: ٦٧٦٥٧١٧٦
        </div>

        <div className={s.art}>
          <h3>المادة ١: موضوع العقد</h3><p>{ARTICLES[0][1]}</p>
        </div>
        <div className={s.art}>
          <h3>المادة ٢: نطاق الخدمة</h3>
          <ul className={s.feat}>{SERVICES.map((x, i) => <li key={i}>{x}</li>)}</ul>
        </div>
        <div className={s.art}>
          <h3>المادة ٣: الرسوم والدفع</h3>
          <table className={s.price}>
            <tbody>
              <tr><th>البند</th><th>المبلغ</th><th>ملاحظات</th></tr>
              {PRICES.map(([a, b, c], i) => <tr key={i}><td>{a}</td><td className={s.amt}>{b}</td><td className={s.nt}>{c}</td></tr>)}
            </tbody>
          </table>
          <p>تُدفع رسوم الاشتراك الشهري مقدماً في بداية كل دورة. جميع المبالغ بالدينار الكويتي وغير شاملة أي رسوم خارجية لمزوّدي الخدمات (مثل واتساب الرسمي) إن وُجدت.</p>
        </div>
        {ARTICLES.slice(1).map(([t, b], i) => (
          <div className={s.art} key={i}><h3>المادة {['٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١'][i]}: {t}</h3><p>{b}</p></div>
        ))}

        <div className={s.signrow}>
          <div className={s.sigbox}>
            <div className={s.sigrole}>الطرف الأول — MindSync</div>
            <div className={s.signedName}>{msSig.name}</div>
            {msSig.signature ? (
              <>
                <img className={s.sigimg} src={msSig.signature} alt="توقيع MindSync" />
                <div className={s.signedMeta}>موقّع مسبقاً عن MindSync</div>
              </>
            ) : (
              <div className={s.sigline}>التوقيع: ______________</div>
            )}
          </div>
          <div className={s.sigbox}>
            <div className={s.sigrole}>الطرف الثاني — ماتشا سبا</div>
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
              onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerLeave={end} />
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
