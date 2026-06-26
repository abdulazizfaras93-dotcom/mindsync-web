'use client'
import { useRef, useState } from 'react'
import s from './intake.module.css'

const WA = '96599539006' // MindSync — answers are sent here

// Kuwait governorates → areas
const KW: Record<string, string[]> = {
  'العاصمة': ['مدينة الكويت', 'الشرق', 'المرقاب', 'القبلة', 'الدسمة', 'الدعية', 'المنصورية', 'ضاحية عبدالله السالم', 'الشامية', 'الروضة', 'العديلية', 'الفيحاء', 'الخالدية', 'القادسية', 'كيفان', 'النزهة', 'غرناطة', 'الدوحة', 'جابر الأحمد', 'الشويخ', 'الصليبخات', 'القيروان', 'الرحاب', 'بنيد القار', 'اليرموك', 'السرة'],
  'حولي': ['حولي', 'السالمية', 'الرميثية', 'الجابرية', 'مشرف', 'بيان', 'سلوى', 'الشعب', 'البدع', 'حطين', 'الزهراء', 'الصديق', 'السلام', 'الشهداء', 'الرقة', 'ميدان حولي', 'النقرة'],
  'الفروانية': ['الفروانية', 'جليب الشيوخ', 'خيطان', 'العمرية', 'الرابية', 'الأندلس', 'الرقعي', 'الفردوس', 'العارضية', 'صباح الناصر', 'الرحاب', 'إشبيلية', 'أبرق خيطان', 'ضاحية عبدالله المبارك', 'الضجيج'],
  'مبارك الكبير': ['مبارك الكبير', 'صباح السالم', 'العدان', 'القصور', 'القرين', 'أبو فطيرة', 'المسيلة', 'المسايل', 'صبحان', 'الفنيطيس', 'وسطى'],
  'الأحمدي': ['الأحمدي', 'الفحيحيل', 'المنقف', 'أبو حليفة', 'المهبولة', 'الفنطاس', 'العقيلة', 'الصباحية', 'هدية', 'الظهر', 'جابر العلي', 'فهد الأحمد', 'علي صباح السالم', 'الوفرة', 'الخيران'],
  'الجهراء': ['الجهراء', 'القصر', 'النعيم', 'النسيم', 'العيون', 'الواحة', 'تيماء', 'الصليبية', 'أمغرة', 'كبد', 'السالمي', 'العبدلي', 'سعد العبدالله'],
}
const GOVS = Object.keys(KW)
const STAFF = ['١', '٢', '٣', '٤', '٥', '٦–١٠', 'أكثر من ١٠']
const DAYS = ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
const HOURS = ['٦ ص', '٧ ص', '٨ ص', '٩ ص', '١٠ ص', '١١ ص', '١٢ ظهراً', '١ م', '٢ م', '٣ م', '٤ م', '٥ م', '٦ م', '٧ م', '٨ م', '٩ م', '١٠ م', '١١ م', '١٢ منتصف الليل']
const ALL_AREAS = Array.from(new Set(GOVS.flatMap((g) => KW[g])))
const AREA_OPTS = ['كل الكويت', ...GOVS, ...ALL_AREAS]

type Group = { q: string; name: string; opts: string[]; multi?: boolean; cls?: string }

function Field({ q, type = 'text' }: { q: string; type?: string }) {
  return (
    <div className={s.fld}>
      <label>{q}</label>
      <input className={s.input} type={type} data-q={q} />
    </div>
  )
}
function Area({ q, note }: { q: string; note?: string }) {
  return (
    <div className={s.fld}>
      <label>{q}</label>
      {note && <div className={s.note}>{note}</div>}
      <textarea className={s.ta} data-q={q} />
    </div>
  )
}
function Select({ q, opts, ph = 'اختر' }: { q: string; opts: string[]; ph?: string }) {
  return (
    <div className={s.fld}>
      <label>{q}</label>
      <select className={s.input} data-q={q} defaultValue="" required>
        <option value="" disabled>{ph}</option>
        {opts.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
function Chips({ q, name, opts, multi, cls }: Group) {
  return (
    <div className={s.fld} data-group={q}>
      <label>{q}</label>
      <div className={`${s.chips} ${cls || ''}`}>
        {opts.map((o) => (
          <label key={o}>
            <input type={multi ? 'checkbox' : 'radio'} name={name} value={o} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function SearchSelect({ q, options }: { q: string; options: string[] }) {
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const filtered = options.filter((o) => !sel.includes(o) && (query ? o.includes(query.trim()) : true)).slice(0, 10)
  return (
    <div className={`${s.fld} ${s.ss}`}>
      <label>{q}</label>
      {sel.length > 0 && (
        <div className={s.tags}>
          {sel.map((o) => (
            <span key={o} className={s.tag} onClick={() => setSel(sel.filter((x) => x !== o))}>{o} <b>✕</b></span>
          ))}
        </div>
      )}
      <input
        className={s.input}
        value={query}
        placeholder="ابحث عن منطقة..."
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && filtered.length > 0 && (
        <div className={s.dropdown}>
          {filtered.map((o) => (
            <div key={o} className={s.opt} onMouseDown={(e) => { e.preventDefault(); setSel([...sel, o]); setQuery('') }}>{o}</div>
          ))}
        </div>
      )}
      <input type="hidden" data-q={q} value={sel.join('، ')} readOnly />
    </div>
  )
}

export default function IntakePage() {
  const root = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState(6)
  const [gov, setGov] = useState('')
  const [logo, setLogo] = useState('')
  const [uploading, setUploading] = useState(false)

  const submit = async () => {
    const el = root.current
    if (!el) return
    let logoUrl = ''
    const fi = el.querySelector('[data-logo]') as HTMLInputElement | null
    if (fi?.files?.[0]) {
      setUploading(true)
      try {
        const fd = new FormData()
        fd.append('file', fi.files[0])
        const r = await fetch('/api/upload', { method: 'POST', body: fd })
        const j = await r.json()
        if (j.url) logoUrl = location.origin + j.url
      } catch {}
      setUploading(false)
    }
    const L: string[] = ['*نموذج استكشاف العميل*', '']
    el.querySelectorAll<HTMLElement>('[data-sec]').forEach((sec) => {
      const title = sec.getAttribute('data-sec') || ''
      const lines: string[] = []
      sec.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('[data-q]').forEach((f) => {
        const v = (f.value || '').trim()
        if (v) lines.push('- ' + f.getAttribute('data-q') + ': ' + v)
      })
      sec.querySelectorAll<HTMLElement>('[data-group]').forEach((g) => {
        const picked: string[] = []
        g.querySelectorAll<HTMLInputElement>('input:checked').forEach((i) => picked.push(i.value))
        if (picked.length) lines.push('- ' + g.getAttribute('data-group') + ': ' + picked.join('، '))
      })
      const svc = sec.querySelector('[data-svc]')
      if (svc) {
        const r: string[] = []
        svc.querySelectorAll<HTMLElement>('[data-srow]').forEach((row) => {
          const nm = (row.querySelector('.' + s.nm) as HTMLInputElement)?.value.trim() || ''
          const pr = (row.querySelector('.' + s.pr) as HTMLInputElement)?.value.trim() || ''
          const du = (row.querySelector('.' + s.du) as HTMLInputElement)?.value.trim() || ''
          if (nm) r.push('   - ' + nm + (pr ? ' - ' + pr + ' د.ك' : '') + (du ? ' (' + du + ')' : ''))
        })
        if (r.length) lines.push('- الخدمات/المنتجات:', ...r)
      }
      if (sec.querySelector('[data-logo]')) {
        if (logoUrl) lines.push('- لوقو المشروع: ' +logoUrl)
        else if (logo) lines.push('- لوقو المشروع: ' +logo)
      }
      if (lines.length) L.push('*' + title + '*', ...lines, '')
    })
    window.location.href = `https://wa.me/${WA}?text=${encodeURIComponent(L.join('\n'))}`
  }

  return (
    <div className={s.page} ref={root}>
      <div className={s.wrap}>
        <div className={s.head}>
          <img src="/brand/logo-transparent.png" alt="MindSync" />
          <div className={s.k}>MindSync · Discovery</div>
          <h1>نموذج <span>استكشاف</span> مشروعك</h1>
          <p>هلا فيك 🌿 عبّ النموذج من تلفونك — ثواني وتخلص، وبيوصلنا كل شي عشان نجهّز العرض التوضيحي.</p>
        </div>

        <div className={s.sec} data-sec="نبذة عن المشروع">
          <div className={s.sh}><div className={s.n}>١</div><h2>نبذة عن المشروع</h2></div>
          <Field q="اسم المشروع" />
          <Field q="نوع النشاط" />
          {/* Location: governorate -> dependent area */}
          <div className={s.two}>
            <div className={s.fld}>
              <label>المحافظة</label>
              <select className={s.input} data-q="المحافظة" value={gov} onChange={(e) => setGov(e.target.value)} required>
                <option value="" disabled>اختر المحافظة</option>
                {GOVS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className={s.fld}>
              <label>المنطقة</label>
              <select className={s.input} data-q="المنطقة" defaultValue="" required>
                <option value="" disabled>اختر المنطقة</option>
                {(KW[gov] || []).map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <Select q="عدد الموظفين" opts={STAFF} />
          <Chips q="أيام العمل" name="days" opts={DAYS} multi cls={s.daychips} />
          <div className={s.two}>
            <Select q="من الساعة" opts={HOURS} />
            <Select q="إلى الساعة" opts={HOURS} />
          </div>
        </div>

        <div className={s.sec} data-sec="الخدمات / المنتجات والأسعار">
          <div className={s.sh}><div className={s.n}>٢</div><h2>الخدمات / المنتجات والأسعار</h2></div>
          <div className={s.note}>أضِف كل خدمة أو منتج بسعره — هذي أهم معلومة عشان الوكيل يسعّر صح.</div>
          <div data-svc>
            {Array.from({ length: rows }).map((_, i) => (
              <div className={s.srow} data-srow key={i}>
                <input className={s.nm} type="text" placeholder="الخدمة / المنتج" />
                <input className={s.pr} type="text" placeholder="السعر د.ك" />
                <input className={s.du} type="text" placeholder="المدة/ملاحظة" />
              </div>
            ))}
          </div>
          <button type="button" className={s.addbtn} onClick={() => setRows((r) => r + 1)}>＋ أضِف خدمة</button>
        </div>

        <div className={s.sec} data-sec="الطلبات والحجوزات والدفع">
          <div className={s.sh}><div className={s.n}>٣</div><h2>الطلبات والحجوزات والدفع</h2></div>
          <Chips q="شلون تستقبلون الطلبات / الحجوزات؟" name="orders" opts={['واتساب', 'انستقرام', 'مكالمات', 'الموقع', 'تطبيق توصيل', 'حضور مباشر']} multi />
          <Chips q="عندكم توصيل؟" name="delivery" opts={['نعم', 'لا']} />
          <SearchSelect q="مناطق التوصيل" options={AREA_OPTS} />
          <div className={s.two}><Field q="رسوم التوصيل (د.ك)" /><Field q="عربون / دفعة مقدمة" /></div>
          <Chips q="طرق الدفع" name="pay" opts={['كي نت', 'كاش', 'تحويل', 'أونلاين']} multi />
        </div>

        <div className={s.sec} data-sec="القنوات والوضع الحالي">
          <div className={s.sh}><div className={s.n}>٤</div><h2>القنوات والوضع الحالي</h2></div>
          <Chips q="القنوات" name="channels" opts={['واتساب', 'انستقرام', 'مكالمات', 'الموقع']} multi />
          <Field q="قنوات أخرى" />
          <div className={s.two}><Field q="منو يرد على الرسايل الحين؟" /><Field q="متوسط الرسايل يومياً" /></div>
          <Chips q="الرد بعد الدوام؟" name="after" opts={['نعم', 'لا']} />
        </div>

        <div className={s.sec} data-sec="أكثر الأسئلة من العملاء">
          <div className={s.sh}><div className={s.n}>٥</div><h2>أكثر الأسئلة من العملاء</h2></div>
          <Area q="أكثر الأسئلة المتكررة" note="هذي اللي بيتعلمها الوكيل ويرد عليها بدالك." />
        </div>

        <div className={s.sec} data-sec="الهوية والنبرة">
          <div className={s.sh}><div className={s.n}>٦</div><h2>الهوية والنبرة</h2></div>
          <Chips q="نبرة المخاطبة" name="tone" opts={['لهجة كويتية', 'لغة عربية رسمية', 'لغة انجليزية', 'أخرى']} />
          <Field q="نبرة أخرى (اكتبها)" />
          <div className={s.fld}>
            <label>لوقو المشروع</label>
            <label className={`${s.upload} ${logo ? s.has : ''}`}>
              <input type="file" accept="image/*" data-logo style={{ display: 'none' }} onChange={(e) => setLogo(e.target.files?.[0]?.name || '')} />
              <span>{logo ? '✓ ' + logo : '📎 اختر لوقو مشروعك'}</span>
            </label>
            <div className={s.note}>بعد ما تضغط إرسال، أرفق اللوقو مع رسالة الواتساب 💚</div>
          </div>
          <Field q="عبارات تحب الوكيل يستخدمها" />
          <Area q="كلمات أو أمور نتجنّبها" />
        </div>

        <div className={s.sec} data-sec="الأهداف ونقاط الألم">
          <div className={s.sh}><div className={s.n}>٧</div><h2>الأهداف ونقاط الألم</h2></div>
          <Chips q="أكبر مشكلة الحين" name="pain" opts={['متابعة الحجوزات', 'الأسئلة المتكررة', 'الرد المتأخر', 'التنظيم/الجدول', 'أخرى']} multi />
          <Area q="الهدف خلال ٣ أشهر" />
          <Area q="ملاحظات" />
        </div>

        <div className={s.foot}>MindSync · AI Automation · <span className={s.ltr}>+965 9953 9006</span> · mindsynckw.com</div>
      </div>

      <div className={s.bar}>
        <div className={s.barInner}>
          <button className={s.send} onClick={submit} disabled={uploading}>{uploading ? 'جاري رفع اللوقو…' : 'إرسال إجاباتي عبر واتساب 💬'}</button>
          <div className={s.hint}>بيفتح واتساب بإجاباتك جاهزة — بس اضغط إرسال 💚</div>
        </div>
      </div>
    </div>
  )
}
