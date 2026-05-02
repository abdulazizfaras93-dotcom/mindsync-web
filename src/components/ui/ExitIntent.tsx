'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang'

const COOKIE_KEY  = 'ms_exit_shown'
const COOKIE_DAYS = 7

const t = {
  badge:    { en: '1-Week Free Trial',                   ar: 'Ø£Ø³Ø¨ÙØ¹ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ©' },
  headline: { en: 'Try it free before you commit.',     ar: 'Ø¬Ø±ÙØ¨ ÙØ¬Ø§ÙØ§Ù ÙØ¨Ù ÙØ§ ØªÙØ±Ø±.' },
  sub: {
    en: "We build your actual AI system and run it live for 7 days â at no cost. If you love it, we activate. If not, no charge.",
    ar: 'ÙØ¨ÙÙ ÙØ¸Ø§ÙÙ Ø§ÙØ°ÙÙ Ø§ÙÙØ¹ÙÙ ÙÙØ´ØºÙÙÙ Ø£Ø³Ø¨ÙØ¹ ÙØ§ÙÙ â Ø¨Ø¯ÙÙ Ø£Ù ØªÙÙÙØ©. Ø¥Ø°Ø§ Ø¹Ø¬Ø¨Ù ÙÙØ¹ÙÙÙ. ÙØ¥Ø°Ø§ ÙØ§Ø ÙØ§ ÙÙ Ø±Ø³ÙÙ.',
  },
  cta:     { en: 'Request Your Free Trial',             ar: 'Ø§Ø·ÙØ¨ ØªØ¬Ø±Ø¨ØªÙ Ø§ÙÙØ¬Ø§ÙÙØ©' },
  dismiss: { en: 'No thanks',                           ar: 'ÙØ§ Ø´ÙØ±Ø§Ù' },
}

function setCookie(days: number) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${COOKIE_KEY}=1; expires=${exp}; path=/`
}

function hasCookie() {
  return document.cookie.split(';').some(c => c.trim().startsWith(`${COOKIE_KEY}=`))
}

export default function ExitIntent() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasCookie()) return
    let triggered = false
    const handler = (e: MouseEvent) => {
      if (triggered || e.clientY > 20) return
      triggered = true
      setTimeout(() => setVisible(true), 200)
    }
    document.addEventListener('mouseleave', handler)
    return () => document.removeEventListener('mouseleave', handler)
  }, [])

  const dismiss = () => {
    setVisible(false)
    setCookie(COOKIE_DAYS)
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-ms-green-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-ms-gold-600/20 pointer-events-auto relative">

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Badge */}
              <span className="inline-block text-[10px] font-mono tracking-[0.18em] uppercase bg-ms-gold-600 text-ms-green-900 px-3 py-1 rounded-full font-bold mb-5">
                {t.badge[lang]}
              </span>

              <h3 className="text-ms-ivory-0 text-[22px] font-bold leading-tight mb-3">
                {t.headline[lang]}
              </h3>
              <p className="text-white/65 text-[14px] leading-relaxed mb-7">
                {t.sub[lang]}
              </p>

              <a
                href="/discovery"
                onClick={dismiss}
                className="block w-full bg-ms-gold-600 text-ms-green-900 font-bold text-[15px] py-4 rounded-xl text-center hover:bg-ms-gold-500 transition-colors mb-3"
              >
                {t.cta[lang]}
              </a>
              <button
                onClick={dismiss}
                className="block w-full text-white/40 text-[13px] py-2 hover:text-white/60 transition-colors"
              >
                {t.dismiss[lang]}
              </button>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
