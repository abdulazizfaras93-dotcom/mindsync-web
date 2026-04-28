'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: { en: 'FAQ',                              ar: 'الأسئلة الشائعة' },
  headline:{ en: 'Questions we hear on every call.', ar: 'أسئلة تتكرر في كل مكالمة.' },
}

const FAQS = [
  {
    en: { q: 'Do I need to change my WhatsApp number?', a: "No. We connect your existing business number through the Meta WhatsApp Business API. Your customers keep texting the number they already know." },
    ar: { q: 'هل يجب أن أغير رقم واتساب؟',            a: "لا. نربط رقمك الحالي عبر واتساب بيزنس API من ميتا. عملاؤك يستمرون في مراسلة نفس الرقم." },
  },
  {
    en: { q: "What if the agent doesn't know the answer?", a: "It escalates gracefully. We train a polite handoff that pulls you into the chat only for cases worth your time." },
    ar: { q: "ماذا لو لم يعرف الوكيل الإجابة؟",          a: "يحوّل المحادثة بأدب. ندرّب تحويلاً ذكياً ينقل المحادثة إليك فقط في الحالات التي تستحق وقتك." },
  },
  {
    en: { q: 'Who owns the data and flows?', a: "You do. All logs live in your portal and your accounts. If you ever leave, we export everything and walk away." },
    ar: { q: "من يملك البيانات والسيناريوهات؟", a: "أنت. جميع السجلات في بوابتك وحساباتك. إذا قررت التوقف، نصدّر كل شيء وننسحب." },
  },
  {
    en: { q: 'What does the monthly retainer cover?', a: "Monitoring, prompt tuning, small updates, WhatsApp API costs, and a monthly performance report. Everything to keep your agent sharp." },
    ar: { q: "ماذا يشمل الاشتراك الشهري؟",          a: "المراقبة، ضبط التعليمات، التعديلات الصغيرة، تكاليف واتساب API، وتقرير أداء شهري." },
  },
  {
    en: { q: 'Can I start with just one channel?', a: "Yes. Most clients launch on WhatsApp, then add Instagram DM or a web chat widget after the first month." },
    ar: { q: "هل يمكنني البدء بقناة واحدة فقط?", a: "نعم. معظم العملاء ينطلقون بواتساب، ثم يضيفون إنستغرام أو محادثة الموقع بعد الشهر الأول." },
  },
  {
    en: { q: 'What happens if something breaks at 11pm?', a: "You message us on WhatsApp. We have monitoring alerts and SLA response times built into every retainer plan." },
    ar: { q: "ماذا لو تعطل شيء الساعة 11 ليلاً؟",       a: "تراسلنا على واتساب. لدينا تنبيهات مراقبة ومستويات خدمة مضمونة في كل خطة." },
  },
]

export default function FAQ() {
  const { lang } = useLang()
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header — left-aligned */}
        <div className="mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3">
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ink-900 tracking-tight leading-[0.95]">
            {t.headline[lang]}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14">

          {/* LEFT: Question list */}
          <div className="space-y-1">
            {FAQS.map((faq, i) => {
              const f = lang === 'ar' ? faq.ar : faq.en
              const isActive = open === i
              return (
                <motion.button
                  key={i}
                  onClick={() => setOpen(i)}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ms-gold-600 ${
                    isActive
                      ? 'bg-ms-green-900 text-ms-ivory-0'
                      : 'text-ms-ink-700 hover:bg-ms-ivory-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-mono text-[11px] tracking-wider pt-0.5 shrink-0 transition-colors ${
                      isActive ? 'text-ms-gold-600' : 'text-ms-ink-300 group-hover:text-ms-ink-400'
                    }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-[14px] font-semibold leading-snug transition-colors ${
                      isActive ? 'text-ms-ivory-0' : 'text-ms-ink-800'
                    }`}>
                      {f.q}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* RIGHT: Answer panel */}
          <div className="lg:sticky lg:top-24 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-ms-ivory-100 rounded-2xl p-8 lg:p-10"
              >
                <p className="text-ms-ink-300 text-[11px] font-mono tracking-widest uppercase mb-5">
                  {String(open + 1).padStart(2, '0')} / {String(FAQS.length).padStart(2, '0')}
                </p>
                <p className="text-ms-ink-700 text-[17px] leading-relaxed">
                  {(lang === 'ar' ? FAQS[open].ar : FAQS[open].en).a}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
