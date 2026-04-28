'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 10)
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 6)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="text-[14px] text-ms-ink-600 hover:text-ms-green-800 transition-colors font-medium"
    >
      {children}
    </motion.a>
  )
}

const t = {
  demo:     { en: 'Live Demo',   ar: 'تجربة مباشرة' },
  bundles:  { en: 'Bundles',     ar: 'الباقات' },
  process:  { en: 'How It Works',ar: 'آلية العمل' },
  faq:      { en: 'FAQ',         ar: 'الأسئلة' },
  cta:      { en: 'Chat on WhatsApp', ar: 'تواصل على واتساب' },
  toggleAr: { en: 'العربية',     ar: 'English' },
}

export default function Navbar() {
  const { lang, toggle } = useLang()
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
        <a href="#" className="flex items-center gap-3 group" aria-label="MindSync">
          <img src="/brand/logo-transparent.png" alt="" width={44} height={44} className="block" />
          <span className="text-ms-ink-900 font-grotesk text-[17px] tracking-tight font-bold leading-none">MindSync</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <MagneticLink key={link.href} href={link.href}>
              {link.label[lang]}
            </MagneticLink>
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
