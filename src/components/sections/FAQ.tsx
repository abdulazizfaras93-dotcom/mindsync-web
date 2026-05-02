'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow:  { en: 'FAQ',                        ar: 'الأسئلة المتكررة' },
  headline: { en: 'Questions we hear often.',   ar: 'أسئلة دايم نسمعها' },
}

const FAQS = [
  {
    en: {
      q: 'What exactly does MindSync build?',
      a: 'We build custom AI automation systems — AI agents trained on your business that handle specific tasks (booking, follow-ups, inquiries, analytics) on whatever channels you need (WhatsApp, website, Instagram, app). We also design websites and mobile apps separately.',
    },
    ar: {
      q: 'شنو بالضبط تبني مايند سينك؟',
      a: 'نبني أنظمة مؤتمتة بالذكاء الاصطناعي — وكلاء مدرّبين على مشروعك يتولون مهام محددة (حجز، متابعة، استفسارات، تحليل) على أي قناة تحتاجها (واتساب، موقع، انستقرام، تطبيق). كذلك نصمم مواقع وتطبيقات بشكل منفصل.',
    },
  },
  {
    en: {
      q: 'Do you offer a free trial?',
      a: 'Yes. For clients who want to see the system in action first, we build your actual AI system based on your real business data and run it live for 7 days — at no cost. If you love it, you pay the build fee and choose your plan. If not, no charge.',
    },
    ar: {
      q: 'هل تقدمون تجربة مجانية؟',
      a: 'أكيد. العملاء اللي يبون يشوفون النظام يشتغل أول — نبني نظامك الذكي الفعلي بناءً على بيانات مشروعك الحقيقية ونشغّله أسبوع كامل بدون تكلفة. إذا عجبك تدفع رسوم البناء وتختار الباقة. وإذا لا، ما في أي رسوم.',
    },
  },
  {
    en: {
      q: 'Can I get a website or app without the AI system?',
      a: 'Yes. Website design and mobile app development are standalone services — you can order them with or without an AI automation system. Prices and timelines are shown in the pricing section.',
    },
    ar: {
      q: 'أقدر أطلب موقع أو تطبيق بدون نظام ذكاء اصطناعي؟',
      a: 'أكيد. تصميم المواقع وتطوير التطبيقات خدمات منفصلة — تقدر تطلبها مع أو بدون نظام أتمتة. الأسعار والمدد موضحة في قسم التسعير.',
    },
  },
  {
    en: {
      q: 'What does the monthly retainer cover?',
      a: 'Everything — hosting, API costs, agent monitoring, updates, bug fixes, and support. The retainer is not just a maintenance fee, it\'s the guarantee your system keeps running and improving every month without you asking.',
    },
    ar: {
      q: 'شنو يشمل الاشتراك الشهري؟',
      a: 'كل شي — الاستضافة، تكاليف API، مراقبة الوكيل، التحديثات، إصلاح الأخطاء، والدعم. الاشتراك مو بس رسوم صيانة — هو ضمان إن نظامك يشتغل ويتطور كل شهر بدون ما تطلب.',
    },
  },
  {
    en: {
      q: 'Do I need to change my WhatsApp number?',
      a: "No. We connect your existing business number through the Meta WhatsApp Business API. Your customers keep texting the number they already know.",
    },
    ar: {
      q: 'هل محتاج اغير رقم الواتساب لمشروعي؟',
      a: 'لا. نربط رقمك الحالي بواتساب بيزنس API. عملاؤك يستمرون في مراسلة نفس الرقم.',
    },
  },
  {
    en: {
      q: "What if the agent doesn't know the answer?",
      a: "It escalates gracefully. We train a polite handoff that pulls you into the conversation only for cases worth your time — everything routine is handled automatically.",
    },
    ar: {
      q: 'شنو يصير لو الوكيل الذكي ما عرف يرد على سؤال؟',
      a: 'يحوّل المحادثة بأدب. ندرّبه على نقل المحادثة لك فقط في الحالات اللي تستاهل — كل شي روتيني يتولاه تلقائياً.',
    },
  },
  {
    en: {
      q: 'Who owns the data and the system?',
      a: "You do. Everything â the agent, the data, the portal â is yours as long as you're paying the monthly retainer. If you ever stop, we export everything and hand it over.",
    },
    ar: {
      q: 'منو يملك البيانات والنظام؟',
      a: 'أنت. كل شي — الوكيل، البيانات، لوحة التحكم — ملكك طالما الاشتراك الشهري مفعّل. لو قررت توقف، نصدّر كل شي ونسلّمه لك.',
    },
  },
  {
    en: {
      q: 'What happens if something breaks at 11pm?',
      a: "You message us on WhatsApp. We have monitoring alerts on all active systems and respond within the SLA window included in your plan.",
    },
    ar: {
      q: 'شلون لو خربت مشكلة بالليل؟',
      a: 'تراسلنا على واتساب. عندنا تنبيهات مراقبة على كل الأنظمة الشغّالة ونرد ضمن وقت الاستجابة المحدد في خطتك.',
    },
  },
]

export default function FAQ() {
  const { lang } = useLang()
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="py-24 bg-ms-ivory-0">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
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
              const f       = lang === 'ar' ? faq.ar : faq.en
              const isActive = open === i
              return (
                <motion.button
                  key={i}
                  onClick={() => setOpen(i)}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
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
                    <span className={`text-[14px] font-medium leading-snug ${
                      isActive ? 'text-ms-ivory-0' : 'text-ms-ink-700'
                    }`}>
                      {f.q}
                    </span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* RIGHT: Answer panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="bg-ms-green-900 rounded-2xl p-8"
              >
                <p className="text-ms-gold-600 font-mono text-[11px] tracking-widest uppercase mb-4">
                  {String(open + 1).padStart(2, '0')} / {String(FAQS.length).padStart(2, '0')}
                </p>
                <h3 className="text-ms-ivory-0 font-bold text-[19px] leading-snug mb-5">
                  {lang === 'ar' ? FAQS[open].ar.q : FAQS[open].en.q}
                </h3>
                <p className="text-white/60 text-[15px] leading-relaxed">
                  {lang === 'ar' ? FAQS[open].ar.a : FAQS[open].en.a}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
