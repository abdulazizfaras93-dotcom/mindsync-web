'use client'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/lib/lang'

const KuwaitParticles = dynamic(() => import('@/components/canvas/KuwaitParticles'), { ssr: false })

const t = {
  eyebrow:  { en: "Let's build",      ar: 'ÙØ§ÙÙÙ ÙØ¨ÙÙ' },
  headline: {
    en: "What task are you tired of doing manually? We'll automate it.",
    ar: 'Ø´ÙÙ Ø§ÙØ´ØºÙ Ø§ÙÙÙ ØªØ¹Ø¨Øª ØªØ³ÙÙÙ ÙØ¯ÙÙØ§ÙØ Ø§Ø­ÙØ§ ÙØ£ØªÙØªØ©.',
  },
  sub: {
    en: 'Tell us your business name and your daily problem. We\'ll reply with a clear plan in under 24 hours.',
    ar: 'Ø£Ø®Ø¨Ø±ÙØ§ Ø¨Ø§Ø³Ù ÙØ´Ø±ÙØ¹Ù ÙØ§ÙÙØ´ÙÙØ© Ø§ÙÙÙÙÙØ©. ÙØ±Ø¯ Ø¹ÙÙÙ Ø¨Ø®Ø·Ø© ÙØ§Ø¶Ø­Ø© Ø¨Ø£ÙÙ ÙÙ Ù¢Ù¤ Ø³Ø§Ø¹Ø©.',
  },
  cta1:    { en: 'Fill in Discovery Form', ar: 'Ø§Ø³ØªØ¨ÙØ§Ù ÙÙÙÙ Ø·Ø¨ÙØ¹Ø© ÙØ´Ø±ÙØ¹Ù' },
  cta2:    { en: 'Try the Live Demo',      ar: 'Ø¹Ø±Ø¶ ØªÙØ¶ÙØ­Ù ÙØ¨Ø§Ø´Ø±' },

  // Footer
  tagline: {
    en: 'Kuwait\'s first AI automation agency â systems, websites & apps for SMBs.',
    ar: 'Ø£ÙÙ Ø´Ø±ÙØ© Ø¨Ø±ÙØ¬ÙØ§Øª ÙØ£ØªÙØªØ© Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙÙ Ø§ÙÙÙÙØª ÙÙØ´Ø±ÙØ§Øª Ø§ÙØµØºÙØ±Ø© ÙØ§ÙÙØªÙØ³Ø·Ø©.',
  },
  legal:   {
    en: 'MindSync Â· Software Design and Development Company',
    ar: 'ÙØ§ÙÙØ¯ Ø³ÙÙÙ Â· Ø´Ø±ÙØ© ØªØµÙÙÙ ÙØªØ·ÙÙØ± Ø§ÙØ¨Ø±ÙØ¬ÙØ§Øª',
  },
  copy:    { en: 'Â© 2026 MindSync Â· Kuwait City', ar: 'Â© 2026 ÙØ§ÙÙØ¯Ø³ÙÙÙ Â· ÙØ¯ÙÙØ© Ø§ÙÙÙÙØª' },
  links:   {
    en: ['Bundles', 'How It Works', 'FAQ', 'Fill in Discovery Form'],
    ar: ['Ø§ÙØ¨Ø§ÙØ§Øª', 'ÙÙÙ ÙØ´ØªØºÙ', 'Ø§ÙØ£Ø³Ø¦ÙØ©', 'Ø§Ø³ØªØ¨ÙØ§Ù ÙÙÙÙ Ø·Ø¨ÙØ¹Ø© ÙØ´Ø±ÙØ¹Ù'],
  },
  navLabel: { en: 'Navigation', ar: 'Ø§ÙØªÙÙÙ' },
  contact:  { en: 'Contact',    ar: 'ØªÙØ§ØµÙ' },
}

const NAV_HREFS = ['#bundles', '#process', '#faq', '/discovery']

export function CTA() {
  const { lang }     = useLang()
  const sectionRef   = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-28 hero-bg pattern-overlay overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <KuwaitParticles containerRef={sectionRef} />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-5 flex items-center gap-3">
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[44px] md:text-[58px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.93] mb-6">
            {t.headline[lang]}
          </h2>
          <p className="text-white/60 text-[16px] leading-relaxed mb-10 max-w-[480px]">
            {t.sub[lang]}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/discovery"
              className="bg-ms-gold-600 text-ms-green-900 font-bold text-[14px] px-7 py-3.5 rounded-lg hover:bg-ms-gold-400 transition-all duration-200 inline-flex items-center gap-2.5 active:scale-[0.98]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              {t.cta1[lang]}
            </a>
            <a
              href="#demo"
              className="text-ms-ivory-0 font-medium text-[14px] px-7 py-3.5 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              {t.cta2[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { lang, isAr } = useLang()

  return (
    <footer className="bg-ms-ink-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 mb-10">

          {/* Brand block */}
          <div>
            <p className="text-ms-gold-600 font-bold text-[17px] tracking-tight mb-2">
              MindSync
            </p>
            <p className="text-white/35 text-[13px] leading-relaxed max-w-xs">
              {t.tagline[lang]}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.18em] uppercase font-mono mb-4">
              {t.navLabel[lang]}
            </p>
            <ul className="space-y-2.5">
              {t.links[lang].map((link, i) => (
                <li key={i}>
                  <a
                    href={NAV_HREFS[i]}
                    className="text-white/50 text-[13px] hover:text-ms-gold-600 transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[10px] tracking-[0.18em] uppercase font-mono mb-4">
              {t.contact[lang]}
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://wa.me/96599539006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-[13px] hover:text-ms-gold-600 transition-colors duration-150"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/mindsync.kw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-[13px] hover:text-ms-gold-600 transition-colors duration-150"
                >
                  @mindsync.kw
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@mindsynckw.com"
                  className="text-white/50 text-[13px] hover:text-ms-gold-600 transition-colors duration-150"
                >
                  admin@mindsynckw.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.mindsynckw.com"
                  className="text-white/50 text-[13px] hover:text-ms-gold-600 transition-colors duration-150"
                >
                  mindsynckw.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-[12px]">{t.copy[lang]}</p>
          <p className="text-white/20 text-[12px] text-center">{t.legal[lang]}</p>
        </div>
      </div>
    </footer>
  )
}
