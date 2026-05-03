'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useLang } from '@/lib/lang'
import { BUNDLES, INDUSTRY_SLUGS } from '@/lib/data'

function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)
  const sx  = useSpring(x, { stiffness: 200, damping: 18 })
  const sy  = useSpring(y, { stiffness: 200, damping: 18 })

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

// Reverse-lookup: bundle id → URL slug
const ID_TO_SLUG = Object.fromEntries(
  Object.entries(INDUSTRY_SLUGS).map(([slug, id]) => [id, slug])
)

const t = {
  services:   { en: 'Services',     ar: 'خدماتنا' },
  industries: { en: 'Industries',   ar: 'القطاعات' },
  process:    { en: 'How It Works', ar: 'كيف يشتغل' },
  faq:        { en: 'FAQ',          ar: 'الأسئلة' },
  cta:        { en: 'Get Started',  ar: 'ابدأ الحين' },
  toggleAr:   { en: 'العربية',      ar: 'English' },
}

export default function Navbar() {
  const { lang, toggle } = useLang()
  const [scrolled,        setScrolled]        = useState(false)
  const [visible,         setVisible]         = useState(true)
  const [menuOpen,        setMenuOpen]        = useState(false)
  const [industriesOpen,  setIndustriesOpen]  = useState(false)
  const [mobileIndustries, setMobileIndustries] = useState(false)
  const lastScrollY     = useRef(0)
  const dropdownRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 40)
      if (currentY > 120) {
        setVisible(currentY < lastScrollY.current)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navLinks = [
    { href: '/#services', label: t.services },
    { href: '/#process', label: t.process },
    { href: '/#faq',     label: t.faq },
  ]

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -80 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,border,box-shadow] duration-300 ${
        scrolled
          ? 'bg-ms-ivory-0/95 backdrop-blur-md border-b border-ms-ivory-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" aria-label="MindSync">
          <img
            src="/brand/logo-transparent.png"
            alt=""
            width={44}
            height={44}
            className="block"
          />
          <span className="text-ms-ink-900 font-grotesk text-[17px] tracking-tight font-bold leading-none">
            MindSync
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <MagneticLink href="/#services">{t.services[lang]}</MagneticLink>

          {/* Industries dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
          >
            <button
              onClick={() => setIndustriesOpen(o => !o)}
              className="flex items-center gap-1 text-[14px] text-ms-ink-600 hover:text-ms-green-800 transition-colors font-medium"
            >
              {t.industries[lang]}
              <ChevronDown
                size={13}
                strokeWidth={2}
                className={`transition-transform duration-200 ${industriesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {industriesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-ms-ivory-0 border border-ms-ivory-200 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="py-1.5">
                  {BUNDLES.map(b => {
                    const slug = ID_TO_SLUG[b.id]
                    if (!slug) return null
                    return (
                      <a
                        key={b.id}
                        href={`/${slug}`}
                        className="flex items-center px-4 py-2 text-[13px] text-ms-ink-700 hover:bg-ms-green-800 hover:text-ms-ivory-0 transition-colors"
                      >
                        {b[lang === 'ar' ? 'ar' : 'en']}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map(link => (
            <MagneticLink key={link.href} href={link.href}>
              {link.label[lang]}
            </MagneticLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:block text-[13px] text-ms-ink-600 hover:text-ms-green-800 transition-colors border border-ms-ivory-200 rounded-full px-3 py-1"
          >
            {t.toggleAr[lang]}
          </button>
          <a
            href="/discovery"
            className="bg-ms-green-800 text-ms-ivory-0 text-[13px] font-semibold px-4 py-2 rounded-lg hover:bg-ms-green-700 transition-colors hidden md:block"
          >
            {t.cta[lang]}
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 flex flex-col gap-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-ms-ink-900 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ms-ink-900 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ms-ink-900 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ms-ivory-0 border-t border-ms-ivory-200 px-6 py-5 flex flex-col gap-4">
          <a
            href="/#services"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-ms-ink-900 font-medium py-1"
          >
            {t.services[lang]}
          </a>

          {/* Industries accordion */}
          <div>
            <button
              onClick={() => setMobileIndustries(o => !o)}
              className="flex items-center justify-between w-full text-[15px] text-ms-ink-900 font-medium py-1"
            >
              {t.industries[lang]}
              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`transition-transform duration-200 ${mobileIndustries ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileIndustries && (
              <div className="mt-2 ms-3 flex flex-col gap-1 border-s-2 border-ms-ivory-200 ps-3">
                {BUNDLES.map(b => {
                  const slug = ID_TO_SLUG[b.id]
                  if (!slug) return null
                  return (
                    <a
                      key={b.id}
                      href={`/${slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="text-[14px] text-ms-ink-600 py-1 hover:text-ms-green-800"
                    >
                      {b[lang === 'ar' ? 'ar' : 'en']}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <a
            href="/#process"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-ms-ink-900 font-medium py-1"
          >
            {t.process[lang]}
          </a>
          <a
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-ms-ink-900 font-medium py-1"
          >
            {t.faq[lang]}
          </a>

          <div className="flex gap-3 pt-3 border-t border-ms-ivory-200">
            <button
              onClick={toggle}
              className="text-[13px] text-ms-ink-600 border border-ms-ivory-200 rounded-full px-3 py-1.5"
            >
              {t.toggleAr[lang]}
            </button>
            <a
              href="/discovery"
              className="bg-ms-green-800 text-ms-ivory-0 text-[13px] font-semibold px-4 py-2 rounded-lg flex-1 text-center"
            >
              {t.cta[lang]}
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
