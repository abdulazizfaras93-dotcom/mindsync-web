'use client'
import { useRef, useState } from 'react'
import s from './intake.module.css'

const WA = '96599539006' // MindSync — answers are sent here

type Group = { q: string; name: string; opts: string[]; multi?: boolean }

function Field({ q, ph, type = 'text' }: { q: string; ph?: string; type?: string }) {
  return (
    <div className={s.fld}>
      <label>{q}</label>
      <input className={s.input} type={type} data-q={q} placeholder={ph} />
    </div>
  )
}
function Area({ q, ph, note }: { q: string; ph?: string; note?: string }) {
  return (
    <div className={s.fld}>
      <label>{q}</label>
      {note && <div className={s.note}>{note}</div>}
      <textarea className={s.ta} data-q={q} placeholder={ph} />
    </div>
  )
}
function Chips({ q, name, opts, multi }: Group) {
  return (
    <div className={s.fld} data-group={q}>
      <label>{q}</label>
      <div className={s.chips}>
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

export default function IntakePage() {
  const root = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState(6)

  const submit = () => {
    const el = root.current
    if (!el) return
    const L: string[] = ['🌿 نموذج استكشاف العميل — MindSync', '']
    el.querySelectorAll<HTMLElement>('[data-sec]').forEach((sec) => {
      const title = sec.getAttribute('data-sec') || ''
      const lines: string[] = []
      sec.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-q]').forEach((f) => {
        const v = (f.value || '').trim()
        if (v) lines.push('• ' + f.getAttribute('data-q') + ': ' + v)
      })
      sec.querySelectorAll<HTMLElement>('[data-group]').forEach((g) => {
        const picked: string[] = []
        g.querySelectorAll<HTMLInputElement>('input:checked').forEach((i) => picked.push(i.value))
        if (picked.length) lines.push('• ' + g.getAttribute('data-group') + ': ' + picked.join('، '))
      })
      const svc = sec.querySelector('[data-svc]')
      if (svc) {
        const r: string[] = []
        svc.querySelectorAll<HTMLElement>('[data-srow]').forEach((row) => {
          const nm = (row.querySelector('.' + s.nm) as HTMLInputElement)?.value.trim() || ''
          const pr = (row.querySelector('.' + s.pr) as HTMLInputElement)?.value.trim() || ''
          const du = (row.querySelector('.' + s.du) as HTMLInputElement)?.value.trim() || ''
          if (nm) r.push('   - ' + nm + (pr ? ' — ' + pr + ' د.ك' : '') + (du ? ' (' + du + ')' : ''))
        })
        if (r.length) lines.push('• الخدمات/المنتجات:', ...r)
      }
      if (lines.length) L.push('▪️ ' + title, ...lines, '')
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
          <p>هلا فيك 🌿 عبّي النموذج من تلفونك — ثواني وتخلص، وبيوصلنا كل شي عشان نجهّز وكيلك الذكي والعرض التوضيحي.</p>
        </div>

        <div className={s.sec} data-sec="نبذة عن المشروع">
          <div className={s.sh}><div className={s.n}>١</div><h2>نبذة عن المشروع</h2></div>
          <Field q="اسم المشروع" ph="مثال: ماتشا سبا" />
          <Field q="نوع النشاط" ph="مثال: صالون، عيادة، مطعم، متجر، خدمة منزلية" />
          <Field q="الموقع / المناطق" />
          <div className={s.two}><Field q="عدد الموظفين" /><Field q="ساعات العمل" ph="مثال: ١٠ص – ١٠م" /></div>
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
          <Area q="كيف تستقبلون الطلبات / الحجوزات الآن؟" />
          <Chips q="يوجد توصيل؟" name="delivery" opts={['نعم', 'لا']} />
          <div className={s.two}><Field q="مناطق ورسوم التوصيل" /><Field q="عربون / دفعة مقدمة" /></div>
          <Chips q="طرق الدفع" name="pay" opts={['كي نت', 'كاش', 'تحويل', 'أونلاين']} multi />
        </div>

        <div className={s.sec} data-sec="القنوات والوضع الحالي">
          <div className={s.sh}><div className={s.n}>٤</div><h2>القنوات والوضع الحالي</h2></div>
          <Chips q="القنوات" name="channels" opts={['واتساب', 'انستقرام', 'مكالمات', 'الموقع', 'ثريدز']} multi />
          <div className={s.two}><Field q="مين يرد على الرسائل الحين؟" /><Field q="متوسط الرسائل يومياً" /></div>
          <Chips q="الرد بعد الدوام؟" name="after" opts={['نعم', 'لا']} />
        </div>

        <div className={s.sec} data-sec="أكثر الأسئلة من العملاء">
          <div className={s.sh}><div className={s.n}>٥</div><h2>أكثر الأسئلة من العملاء</h2></div>
          <Area q="أكثر الأسئلة المتكررة" ph="مثال: كم السعر؟ توصلون لمنطقتي؟ شنو يشمل؟ كم ياخذ وقت؟ متى متوفرين؟" note="هذي اللي بيتعلمها الوكيل ويرد عليها بدالك." />
        </div>

        <div className={s.sec} data-sec="الهوية والنبرة">
          <div className={s.sh}><div className={s.n}>٦</div><h2>الهوية والنبرة</h2></div>
          <Chips q="نبرة المخاطبة" name="tone" opts={['كويتي دافئ', 'رسمي']} />
          <Field q="ألوان العلامة (إن وجدت)" />
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
          <button className={s.send} onClick={submit}>إرسال إجاباتي عبر واتساب 💬</button>
          <div className={s.hint}>بيفتح واتساب بإجاباتك جاهزة — بس اضغط إرسال 💚</div>
        </div>
      </div>
    </div>
  )
}
