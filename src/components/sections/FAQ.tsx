'use client'
import { useState } from 'react'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  headline:{ en: 'Questions we hear on every call.', ar: 'أسئلة تتكرر في كل مكالمة.' },
}

const FAQS = [
  {
    en: { q: 'Do I need to change my WhatsApp number?', a: "No. We connect your existing business number through the Meta WhatsApp Business API. Your customers keep texting the number they already know." },
    ar: { q: 'هل يجب أن أغير رقم واتساب؟', a: "لا. نربط رقمك الحالي عبر واتساب بيزنس API من ميتا. عملاؤك يستمرون في مراسلة نفس الرقم." },
  },
  {
    en: { q: "What if the agent doesn't know the answer?", a: "It escalates gracefully. We train a polite handoff that pulls you into the chat only for cases worth your time." },
    ar: { q: "ماذا لو لم يعرف الوكيل الإجابة؟", a: "يحوّل المحادثة بأدب. ندرّب تحويلاً ذكياً ينقل المحادثة إليك فقط في الحالات التي تستحق وقتك." },
  },
  {
    en: { q: 'Who owns the data and flows?', a: "You do. All logs live in your portal and your accounts. If you ever leave, we export everything and walk away." },
    ar: { q: "من يملك البيانات والسيناريوهات؟", a: "أنت. جميع السجلات في بوابتك وحساباتك. إذا قررت التوقف، نصدّر كل شيء وننسحب." },
  },
  {
    en: { q: 'What does the monthly retainer cover?', a: "Monitoring, prompt tuning, small updates, WhatsApp API costs, and a monthly performance report. Everything to keep your agent sharp." },
    ar: { q: "ماذا يشمل الاشتراك الشهري؟", a: "المراقبة، ضبط التعليمات، التعديلات الصغيرة، تكاليف واتساب API، وتقرير أداء شهري." },
  },
  {
    en: { q: 'Can I start with just one channel?', a: "Yes. Most clients launch on WhatsApp, then add Instagram DM or a web chat widget after the first month." },
    ar: { q: "هل يمكنني البدء بقناة واحدة فقط؟", a: "نعم. معظم العملاء ينطلقون بواتساب، ثم يضيفون إنستغرام أو محادثة الموقع بعد الشهر الأول." },
  },
  {
    en: { q: 'What happens if something breaks at 11pm?', a: "You message us on WhatsApp. We have monitoring alerts and SLA response times built into every retainer plan." },
    ar: { q: "ماذا لو تعطل شيء الساعة 11 ليلاً؟", a: "تراسلنا على واتساب. لدينا تنبيهات مراقبة ومستويات خدمة مضمونة في كل خطة." },
  },
]

export default function FAQ() {
  const { lang } = useLang()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-ms-ivory-100">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight">{t.headline[lang]}</h2>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => {
            const f = lang === 'ar' ? faq.ar : faq.en
            const isOpen = open === i
            return (
              <div key={i} className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${isOpen ? 'border-ms-green-800/20' : 'border-ms-ivory-200'}`}>
                <button onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4">
                  <span className={`text-[15px] font-semibold transition-colors ${isOpen ? 'text-ms-green-800' : 'text-ms-ink-900'}`}>{f.q}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-ms-green-800 rotate-45' : 'bg-ms-ivory-100'}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6h8" stroke={isOpen ? 'white' : '#4A5550'} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-ms-ink-600 text-[14px] leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
