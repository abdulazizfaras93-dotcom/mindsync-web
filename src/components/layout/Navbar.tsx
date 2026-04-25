'use client'
import { useState, useEffect } from 'react'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const t = {
  demo:     { en: 'Live Demo',   ar: 'تجربة مباشرة' },
  bundles:  { en: 'Bundles',     ar: 'الباقات' },
  process:  { en: 'How It Works',ar: 'آلية العمل' },
  faq:      { en: 'FAQ',         ar: 'الأسئلة' },
  cta:      { en: 'Chat on WhatsApp', ar: 'تواصل على واتساب' },
  toggleAr: { en: 'العربية',     ar: 'English' },
}

export default function Navbar() {
  const { lang, toggle, isAr } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#demo',    label: t.demo },
    { href: '#bundles', label: t.bundles },
    { href: '#process', label: t.process },
    { href: '#faq',     label: t.faq },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ms-ivory-0/95 backdrop-blur-md border-b border-ms-ivory-200 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="navGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#153E2D"/>
                <stop offset="100%" stopColor="#BF8D38"/>
              </linearGradient>
            </defs>
            <path d="M 12 44 C 12 28 20 18 32 18 C 44 18 52 28 52 44" stroke="url(#navGrad)" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M 22 44 C 22 34 26 28 32 28 C 38 28 42 34 42 44" stroke="#BF8D38" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <circle cx="12" cy="44" r="4" fill="#BF8D38"/>
            <circle cx="52" cy="44" r="4" fill="#BF8D38"/>
            <circle cx="32" cy="18" r="3" fill="#153E2D" stroke="#BF8D38" strokeWidth="1.5"/>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="text-ms-ink-900 font-grotesk font-700 text-[17px] tracking-tight font-bold">MindSync</span>
            <span className="text-ms-ink-600 font-arabic text-[11px] font-light" style={{fontFamily:'Noto Kufi Arabic'}}>مايند سينك</span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
               className="text-[14px] text-ms-ink-600 hover:text-ms-green-800 transition-colors font-medium">
              {link.label[lang]}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button onClick={toggle}
            className="hidden md:block text-[13px] text-ms-ink-600 hover:text-ms-green-800 transition-colors border border-ms-ivory-200 rounded-full px-3 py-1">
            {t.toggleAr[lang]}
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
             className="bg-ms-green-800 text-ms-ivory-0 text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-ms-green-700 transition-colors hidden md:block">
            {t.cta[lang]}
          </a>
          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)}>
            <div className="w-5 h-0.5 bg-ms-ink-900 mb-1"></div>
            <div className="w-5 h-0.5 bg-ms-ink-900 mb-1"></div>
            <div className="w-5 h-0.5 bg-ms-ink-900"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ms-ivory-0 border-t border-ms-ivory-200 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
               className="text-[15px] text-ms-ink-900 font-medium">
              {link.label[lang]}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-ms-ivory-200">
            <button onClick={toggle}
              className="text-[13px] text-ms-ink-600 border border-ms-ivory-200 rounded-full px-3 py-1">
              {t.toggleAr[lang]}
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
               className="bg-ms-green-800 text-ms-ivory-0 text-[13px] font-semibold px-4 py-2 rounded-lg">
              {t.cta[lang]}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
