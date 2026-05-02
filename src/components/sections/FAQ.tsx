'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow:  { en: 'FAQ',                        ar: 'Ø§ÙØ£Ø³Ø¦ÙØ© Ø§ÙÙØªÙØ±Ø±Ø©' },
  headline: { en: 'Questions we hear often.',   ar: 'Ø£Ø³Ø¦ÙØ© Ø¯Ø§ÙÙ ÙØ³ÙØ¹ÙØ§' },
}

const FAQS = [
  {
    en: {
      q: 'What exactly does MindSync build?',
      a: 'We build custom AI automation systems â AI agents trained on your business that handle specific tasks (booking, follow-ups, inquiries, analytics) on whatever channels you need (WhatsApp, website, Instagram, app). We also design websites and mobile apps separately.',
    },
    ar: {
      q: 'Ø´ÙÙ Ø¨Ø§ÙØ¶Ø¨Ø· ØªØ¨ÙÙ ÙØ§ÙÙØ¯ Ø³ÙÙÙØ',
      a: 'ÙØ¨ÙÙ Ø£ÙØ¸ÙØ© ÙØ¤ØªÙØªØ© Ø¨Ø§ÙØ°ÙØ§Ø¡ Ø§ÙØ§ØµØ·ÙØ§Ø¹Ù â ÙÙÙØ§Ø¡ ÙØ¯Ø±ÙØ¨ÙÙ Ø¹ÙÙ ÙØ´Ø±ÙØ¹Ù ÙØªÙÙÙÙ ÙÙØ§Ù ÙØ­Ø¯Ø¯Ø© (Ø­Ø¬Ø²Ø ÙØªØ§Ø¨Ø¹Ø©Ø Ø§Ø³ØªÙØ³Ø§Ø±Ø§ØªØ ØªØ­ÙÙÙ) Ø¹ÙÙ Ø£Ù ÙÙØ§Ø© ØªØ­ØªØ§Ø¬ÙØ§ (ÙØ§ØªØ³Ø§Ø¨Ø ÙÙÙØ¹Ø Ø§ÙØ³ØªÙØ±Ø§ÙØ ØªØ·Ø¨ÙÙ). ÙØ°ÙÙ ÙØµÙÙ ÙÙØ§ÙØ¹ ÙØªØ·Ø¨ÙÙØ§Øª Ø¨Ø´ÙÙ ÙÙÙØµÙ.',
    },
  },
  {
    en: {
      q: 'Do you offer a free trial?',
      a: 'Yes. For clients who want to see the system in action first, we build your actual AI system based on your real business data and run it live for 7 days â at no cost. If you love it, you pay the build fee and choose your plan. If not, no charge.',
    },
    ar: {
      q: 'ÙÙ ØªÙØ¯ÙÙÙ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ©Ø',
      a: 'Ø£ÙÙØ¯. Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙ ÙØ¨ÙÙ ÙØ´ÙÙÙÙ Ø§ÙÙØ¸Ø§Ù ÙØ´ØªØºÙ Ø£ÙÙ â ÙØ¨ÙÙ ÙØ¸Ø§ÙÙ Ø§ÙØ°ÙÙ Ø§ÙÙØ¹ÙÙ Ø¨ÙØ§Ø¡Ù Ø¹ÙÙ Ø¨ÙØ§ÙØ§Øª ÙØ´Ø±ÙØ¹Ù Ø§ÙØ­ÙÙÙÙØ© ÙÙØ´ØºÙÙÙ Ø£Ø³Ø¨ÙØ¹ ÙØ§ÙÙ Ø¨Ø¯ÙÙ ØªÙÙÙØ©. Ø¥Ø°Ø§ Ø¹Ø¬Ø¨Ù ØªØ¯ÙØ¹ Ø±Ø³ÙÙ Ø§ÙØ¨ÙØ§Ø¡ ÙØªØ®ØªØ§Ø± Ø§ÙØ¨Ø§ÙØ©. ÙØ¥Ø°Ø§ ÙØ§Ø ÙØ§ ÙÙ Ø£Ù Ø±Ø³ÙÙ.',
    },
  },
  {
    en: {
      q: 'Can I get a website or app without the AI system?',
      a: 'Yes. Website design and mobile app development are standalone services â you can order them with or without an AI automation system. Prices and timelines are shown in the pricing section.',
    },
    ar: {
      q: 'Ø£ÙØ¯Ø± Ø£Ø·ÙØ¨ ÙÙÙØ¹ Ø£Ù ØªØ·Ø¨ÙÙ Ø¨Ø¯ÙÙ ÙØ¸Ø§Ù Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹ÙØ',
      a: 'Ø£ÙÙØ¯. ØªØµÙÙÙ Ø§ÙÙÙØ§ÙØ¹ ÙØªØ·ÙÙØ± Ø§ÙØªØ·Ø¨ÙÙØ§Øª Ø®Ø¯ÙØ§Øª ÙÙÙØµÙØ© â ØªÙØ¯Ø± ØªØ·ÙØ¨ÙØ§ ÙØ¹ Ø£Ù Ø¨Ø¯ÙÙ ÙØ¸Ø§Ù Ø£ØªÙØªØ©. Ø§ÙØ£Ø³Ø¹Ø§Ø± ÙØ§ÙÙØ¯Ø¯ ÙÙØ¶Ø­Ø© ÙÙ ÙØ³Ù Ø§ÙØªØ³Ø¹ÙØ±.',
    },
  },
  {
    en: {
      q: 'What does the monthly retainer cover?',
      a: 'Everything â hosting, API costs, agent monitoring, updates, bug fixes, and support. The retainer is not just a maintenance fee, it\'s the guarantee your system keeps running and improving every month without you asking.',
    },
    ar: {
      q: 'Ø´ÙÙ ÙØ´ÙÙ Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø§ÙØ´ÙØ±ÙØ',
      a: 'ÙÙ Ø´Ù â Ø§ÙØ§Ø³ØªØ¶Ø§ÙØ©Ø ØªÙØ§ÙÙÙ APIØ ÙØ±Ø§ÙØ¨Ø© Ø§ÙÙÙÙÙØ Ø§ÙØªØ­Ø¯ÙØ«Ø§ØªØ Ø¥ØµÙØ§Ø­ Ø§ÙØ£Ø®Ø·Ø§Ø¡Ø ÙØ§ÙØ¯Ø¹Ù. Ø§ÙØ§Ø´ØªØ±Ø§Ù ÙÙ Ø¨Ø³ Ø±Ø³ÙÙ ØµÙØ§ÙØ© â ÙÙ Ø¶ÙØ§Ù Ø¥Ù ÙØ¸Ø§ÙÙ ÙØ´ØªØºÙ ÙÙØªØ·ÙØ± ÙÙ Ø´ÙØ± Ø¨Ø¯ÙÙ ÙØ§ ØªØ·ÙØ¨.',
    },
  },
  {
    en: {
      q: 'Do I need to change my WhatsApp number?',
      a: "No. We connect your existing business number through the Meta WhatsApp Business API. Your customers keep texting the number they already know.",
    },
    ar: {
      q: 'ÙÙ ÙØ­ØªØ§Ø¬ Ø§ØºÙØ± Ø±ÙÙ Ø§ÙÙØ§ØªØ³Ø§Ø¨ ÙÙØ´Ø±ÙØ¹ÙØ',
      a: 'ÙØ§. ÙØ±Ø¨Ø· Ø±ÙÙÙ Ø§ÙØ­Ø§ÙÙ Ø¨ÙØ§ØªØ³Ø§Ø¨ Ø¨ÙØ²ÙØ³ API. Ø¹ÙÙØ§Ø¤Ù ÙØ³ØªÙØ±ÙÙ ÙÙ ÙØ±Ø§Ø³ÙØ© ÙÙØ³ Ø§ÙØ±ÙÙ.',
    },
  },
  {
    en: {
      q: "What if the agent doesn't know the answer?",
      a: "It escalates gracefully. We train a polite handoff that pulls you into the conversation only for cases worth your time â everything routine is handled automatically.",
    },
    ar: {
      q: 'Ø´ÙÙ ÙØµÙØ± ÙÙ Ø§ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØ§ Ø¹Ø±Ù ÙØ±Ø¯ Ø¹ÙÙ Ø³Ø¤Ø§ÙØ',
      a: 'ÙØ­ÙÙÙ Ø§ÙÙØ­Ø§Ø¯Ø«Ø© Ø¨Ø£Ø¯Ø¨. ÙØ¯Ø±ÙØ¨Ù Ø¹ÙÙ ÙÙÙ Ø§ÙÙØ­Ø§Ø¯Ø«Ø© ÙÙ ÙÙØ· ÙÙ Ø§ÙØ­Ø§ÙØ§Øª Ø§ÙÙÙ ØªØ³ØªØ§ÙÙ â ÙÙ Ø´Ù Ø±ÙØªÙÙÙ ÙØªÙÙØ§Ù ØªÙÙØ§Ø¦ÙØ§Ù.',
    },
  },
  {
    en: {
      q: 'Who owns the data and the system?',
      a: "You do. Everything â the agent, the data, the portal â is yours as long as you're paying the monthly retainer. If you ever stop, we export everything and hand it over.",
    },
    ar: {
      q: 'ÙÙÙ ÙÙÙÙ Ø§ÙØ¨ÙØ§ÙØ§Øª ÙØ§ÙÙØ¸Ø§ÙØ',
      a: 'Ø£ÙØª. ÙÙ Ø´Ù â Ø§ÙÙÙÙÙØ Ø§ÙØ¨ÙØ§ÙØ§ØªØ ÙÙØ­Ø© Ø§ÙØªØ­ÙÙ â ÙÙÙÙ Ø·Ø§ÙÙØ§ Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø§ÙØ´ÙØ±Ù ÙÙØ¹ÙÙ. ÙÙ ÙØ±Ø±Øª ØªÙÙÙØ ÙØµØ¯ÙØ± ÙÙ Ø´Ù ÙÙØ³ÙÙÙÙ ÙÙ.',
    },
  },
  {
    en: {
      q: 'What happens if something breaks at 11pm?',
      a: "You message us on WhatsApp. We have monitoring alerts on all active systems and respond within the SLA window included in your plan.",
    },
    ar: {
      q: 'Ø´ÙÙÙ ÙÙ Ø®Ø±Ø¨Øª ÙØ´ÙÙØ© Ø¨Ø§ÙÙÙÙØ',
      a: 'ØªØ±Ø§Ø³ÙÙØ§ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨. Ø¹ÙØ¯ÙØ§ ØªÙØ¨ÙÙØ§Øª ÙØ±Ø§ÙØ¨Ø© Ø¹ÙÙ ÙÙ Ø§ÙØ£ÙØ¸ÙØ© Ø§ÙØ´ØºÙØ§ÙØ© ÙÙØ±Ø¯ Ø¶ÙÙ ÙÙØª Ø§ÙØ§Ø³ØªØ¬Ø§Ø¨Ø© Ø§ÙÙØ­Ø¯Ø¯ ÙÙ Ø®Ø·ØªÙ.',
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
