'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useLang } from '@/lib/lang'

type Msg = { from: 'user' | 'bot'; text: string; delay: number }
type Industry = { id: string; label: { en: string; ar: string }; msgs: Msg[] }

const INDUSTRIES: Industry[] = [
  {
    id: 'clinic',
    label: { en: 'Dental Clinic', ar: 'عيادة أسنان' },
    msgs: [
      { from: 'user', text: 'متى اقرب وقت لحجز موعد؟', delay: 600 },
      { from: 'bot', text: 'أهلاً! عندنا مواعيد اليوم الساعة 4 أو 6 مساءً — أي وقت يناسبك؟ 😊', delay: 1600 },
      { from: 'user', text: 'الساعة 4 تمام', delay: 2800 },
      { from: 'bot', text: 'تم الحجز ✅ مع د. سارة، اليوم 4:00 م. راح نرسل لك تذكير قبلها بساعة.', delay: 4000 },
    ],
  },
  {
    id: 'salon',
    label: { en: 'Beauty Salon', ar: 'صالون تجميل' },
    msgs: [
      { from: 'user', text: 'فيه مواعيد باجر؟', delay: 600 },
      { from: 'bot', text: 'باجر عندنا 3 مواعيد — 10 الصبح، 2 الظهر، 5 المساء. أي وقت؟', delay: 1600 },
      { from: 'user', text: '2 الظهر', delay: 2800 },
      { from: 'bot', text: '✅ محجوز! أمل — الثلاثاء 2:00 الظهر. نشوفك قريب 💛', delay: 4000 },
    ],
  },
  {
    id: 'gym',
    label: { en: 'Gym', ar: 'صالة رياضية' },
    msgs: [
      { from: 'user', text: 'عندكم كلاسات yoga؟', delay: 600 },
      { from: 'bot', text: 'اي نعم! كل ثلاثاء وخميس الساعة 7 مساء. تبي أسجّلك؟', delay: 1600 },
      { from: 'user', text: 'اي', delay: 2800 },
      { from: 'bot', text: 'تمام 💪 مسجّل. راح يوصلك تذكير قبل الكلاس بساعة.', delay: 4000 },
    ],
  },
  {
    id: 'restaurant',
    label: { en: 'Restaurant', ar: 'مطعم' },
    msgs: [
      { from: 'user', text: 'ودي أحجز طاولة 4 أشخاص الجمعة', delay: 600 },
      { from: 'bot', text: 'هلا والله! الجمعة عندنا أماكن الساعة 7 أو 9 بالليل. متى تحب تختار؟', delay: 1600 },
      { from: 'user', text: 'الساعة 7', delay: 2800 },
      { from: 'bot', text: '✅ محجوز 4 أشخاص، الجمعة 7:00 م. شكراً لاختيارك! 🌿', delay: 4000 },
    ],
  },
]

function TypingDots() {
  return (
    <div className="self-start bg-white rounded-xl rounded-bl-sm shadow-sm px-3 py-2 flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-ms-ink-400 animate-pulse-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function WhatsAppMockup() {
  const { lang } = useLang()
  const isAr = lang === 'ar'
  const prefersReduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const industry = INDUSTRIES[activeIdx]

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setVisibleCount(0)
    setShowTyping(false)

    if (prefersReduced) {
      setVisibleCount(industry.msgs.length)
      return
    }

    industry.msgs.forEach((msg, i) => {
      if (msg.from === 'bot') {
        const t = setTimeout(() => setShowTyping(true), msg.delay - 800)
        timers.current.push(t)
      }
      const t = setTimeout(() => {
        setShowTyping(false)
        setVisibleCount(i + 1)
      }, msg.delay)
      timers.current.push(t)
    })

    return () => timers.current.forEach(clearTimeout)
  }, [activeIdx, prefersReduced, industry.msgs])

  return (
    <section className="bg-ms-green-900 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
            {isAr ? 'مساعد الواتساب الذكي' : 'WhatsApp AI Receptionist'}
          </p>
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ivory-0">
            {isAr ? 'يرد في ثوانٍ، على مدار الساعة' : 'Responds in Seconds, 24/7'}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Industry tabs */}
          <div className="flex md:flex-col gap-3 order-2 md:order-1 flex-wrap justify-center">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => setActiveIdx(i)}
                className={`px-4 py-2.5 rounded-xl text-sm font-grotesk font-medium transition-all duration-200 text-start whitespace-nowrap
                  ${i === activeIdx
                    ? 'bg-ms-gold-600 text-ms-ink-900'
                    : 'bg-ms-green-800/60 text-ms-ivory-0/60 hover:text-ms-ivory-0 hover:bg-ms-green-800'
                  }`}
              >
                {ind.label[lang]}
              </button>
            ))}
          </div>

          {/* Phone frame */}
          <div className="order-1 md:order-2 flex-shrink-0">
            <div className="w-60 rounded-[2rem] overflow-hidden border-4 border-ms-ink-900/40 shadow-2xl" style={{ minHeight: 400 }}>
              {/* WA header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-ms-gold-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  M
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">MindSync AI</p>
                  <p className="text-white/60 text-[10px]">online</p>
                </div>
              </div>

              {/* Messages area */}
              <div className="bg-[#ECE5DD] p-3 flex flex-col gap-2" style={{ minHeight: 320 }}>
                <AnimatePresence>
                  {industry.msgs.slice(0, visibleCount).map((msg, i) => (
                    <motion.div
                      key={`${activeIdx}-${i}`}
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.18 }}
                      className={`max-w-[82%] px-3 py-1.5 rounded-xl text-[11px] leading-relaxed text-ms-ink-900 dir-rtl ${msg.from === 'user'
                          ? 'self-end bg-[#DCF8C6] rounded-br-sm'
                          : 'self-start bg-white rounded-bl-sm shadow-sm'
                        }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  {showTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TypingDots />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div className="order-3 max-w-xs text-center md:text-start">
            <h3 className="font-grotesk text-xl font-bold text-ms-ivory-0 mb-3">
              {industry.label[lang]}
            </h3>
            <p className="text-ms-ivory-0/60 text-sm leading-relaxed">
              {isAr
                ? 'يرد على كل رسالة واتساب فوراً — بالعربي والإنجليزي — ويحجز ويؤكد ويذكّر تلقائياً.'
                : 'Every WhatsApp message gets an instant reply — in Arabic or English — with automatic booking, confirmation, and reminders.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
