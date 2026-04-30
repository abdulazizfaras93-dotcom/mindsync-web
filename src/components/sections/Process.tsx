'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const ProcessFlow = dynamic(() => import('@/components/canvas/ProcessFlow'), { ssr: false })

const t = {
  eyebrow: { en: 'How It Works', ar: 'آلية العمل عندنا' },
  headline: {
    en: '7 business days and your system is live.',
    ar: 'في خلال ٧ أيام عمل نظامك جاهز',
  },
  sub: {
    en: "The clock starts after contract signing — we don't stop until you're satisfied.",
    ar: 'العداد يبدأ بعد توقيع العقد — ولا نتوقف حتى تكون راضياً تماماً.',
  },
}

const STEPS = [
  {
    num: '01',
    en: { title: 'Discovery', sub: '60-min scoping call', desc: 'We map your most common questions, booking tools, opening hours, and tone of voice.' },
    ar: { title: 'الاكتشاف', sub: 'مكالمة تحديد النطاق', desc: 'نحدد أكثر المشاكل تكراراً، طريقة تلقي الحجوزات، وساعات العمل، وأسلوب التواصل.' },
  },
  {
    num: '02',
    en: { title: 'Build', sub: 'Agent + integrations', desc: 'All integrations, calendar, payments, and more — tailored to your needs.' },
    ar: { title: 'البناء', sub: 'وكيل وتكاملات', desc: 'كل التفاصيل ودمج الأدوات والخدمات المطلوبة.' },
  },
  {
    num: '03',
    en: { title: 'Review', sub: 'Live rehearsal', desc: 'You send 5 real customer messages. We tune the agent until every answer matches yours.' },
    ar: { title: 'المراجعة', sub: 'تجربة مباشرة', desc: 'ترسل 5 رسائل عملاء حقيقية. نضبط الوكيل حتى تتطابق كل إجاباته مع إجاباتك.' },
  },
  {
    num: '04',
    en: { title: 'Launch', sub: 'Go live + monthly care', desc: 'We hand you the portal, keep watching the logs, and ship updates on a monthly retainer.' },
    ar: { title: 'الإطلاق', sub: 'تشغيل وصيانة شهرية', desc: 'نسلّمك البوابة، نراقب السجلات، ونطوّر التحديثات شهريًا.' },
  },
]

export default function Process() {
  const { lang } = useLang()

  return (
    <section id="process" className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header — left-aligned */}
        <div className="mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-4">
            {t.headline[lang]}
          </h2>
          <p className="text-white/50 text-[16px] max-w-lg leading-relaxed">{t.sub[lang]}</p>
        </div>

        {/* Canvas flow animation */}
        <div className="w-full h-20 mb-2 overflow-hidden" aria-hidden>
          <ProcessFlow />
        </div>

        {/* Steps — editorial list, no cards */}
        <div className="divide-y divide-white/10">
          {STEPS.map((step, i) => {
            const s = lang === 'ar' ? step.ar : step.en
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-[72px_200px_1fr] gap-4 md:gap-8 py-8 items-start"
              >
                <span className="font-mono text-[40px] font-bold leading-none text-ms-gold-600/25 tabular-nums">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-ms-ivory-0 font-bold text-[18px] mb-1">{s.title}</h3>
                  <p className="text-ms-gold-600 text-[11px] font-mono tracking-widest uppercase">{s.sub}</p>
                </div>
                <p className="text-white/50 text-[14px] leading-relaxed md:pt-0.5">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>

        <p className="text-white/25 text-[13px] mt-8 border-t border-white/10 pt-6">
          {lang === 'ar'
            ? 'لا نبدأ البناء إلا بعد اعتماد بيانات مشروعك.'
            : "The 7-day clock doesn't start until your project data is approved."}
        </p>
      </div>
    </section>
  )
}
