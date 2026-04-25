'use client'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: { en: 'How It Works', ar: 'آلية العمل' },
  headline:{ en: '7 business days. 4 steps. One live agent.', ar: '٧ أيام عمل. ٤ مراحل. وكيل جاهز.' },
  sub:     { en: "The clock starts after the scope is signed and your WhatsApp number is approved.", ar: "العداد يبدأ بعد توقيع العقد واعتماد رقم واتساب عملك." },
}

const STEPS = [
  {
    num: '01',
    en: { title: 'Discovery', sub: '60-min scoping call', desc: "We map your most common questions, booking tools, opening hours, and tone of voice." },
    ar: { title: 'الاكتشاف', sub: 'مكالمة تحديد النطاق', desc: "نحدد أكثر الأسئلة تكراراً، وأدوات الحجز، وساعات العمل، وأسلوب التواصل." },
  },
  {
    num: '02',
    en: { title: 'Build', sub: 'Agent + integrations', desc: "n8n flows, Claude prompts, WhatsApp API, calendar and payments — wired in your brand voice." },
    ar: { title: 'البناء', sub: 'وكيل وتكاملات', desc: "سيناريوهات n8n، تعليمات Claude، واتساب API، التقويم والمدفوعات — بلغة علامتك التجارية." },
  },
  {
    num: '03',
    en: { title: 'Review', sub: 'Live rehearsal', desc: "You send 5 real customer messages. We tune the agent until every answer matches yours." },
    ar: { title: 'المراجعة', sub: 'تجربة مباشرة', desc: "ترسل 5 رسائل عملاء حقيقية. نضبط الوكيل حتى تتطابق كل إجاباته مع إجاباتك." },
  },
  {
    num: '04',
    en: { title: 'Launch', sub: 'Go live + monthly care', desc: "We hand you the portal, keep watching the logs, and ship updates on a monthly retainer." },
    ar: { title: 'الإطلاق', sub: 'تشغيل وصيانة شهرية', desc: "نسلّمك البوابة، نراقب السجلات، ونطوّر التحديثات شهريًا." },
  },
]

export default function Process() {
  const { lang } = useLang()

  return (
    <section id="process" className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ivory-0 tracking-tight mb-4">{t.headline[lang]}</h2>
          <p className="text-white/55 text-[16px] max-w-lg mx-auto leading-relaxed">{t.sub[lang]}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const s = lang === 'ar' ? step.ar : step.en
            return (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-ms-gold-600/30 z-10"></div>
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-ms-gold-600 font-mono text-[11px] tracking-widest">{step.num}</span>
                    <div className="flex-1 h-px bg-white/10"></div>
                  </div>
                  <h3 className="text-ms-ivory-0 font-bold text-[18px] mb-1">{s.title}</h3>
                  <p className="text-ms-gold-600 text-[12px] font-medium mb-3">{s.sub}</p>
                  <p className="text-white/55 text-[13px] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/30 text-[13px] mt-10">
          {lang === 'ar'
            ? 'لا نبدأ العدّاد إلا بعد اعتماد رقم واتساب عملك من ميتا.'
            : "The 7-day clock doesn't start until your WhatsApp number is approved by Meta."}
        </p>
      </div>
    </section>
  )
}
