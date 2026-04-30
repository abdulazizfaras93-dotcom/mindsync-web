'use client'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/lib/lang'

const KuwaitParticles = dynamic(() => import('@/components/canvas/KuwaitParticles'), { ssr: false })

const t = {
  eyebrow: { en: "Let's build",       ar: 'يالله نبني' },
  headline:{ en: "What task are you tired of doing manually? We'll automate it.", ar: 'شنو الشغل اللي تعبت تسويه يدوياً؟ احنا نأتمتة.' },
  sub:     { en: "Send us your business name and the daily problem. We'll reply with a scoped quote in under 24 hours.", ar: 'أرسل لنا اسم مشروعك والمشاكل الي تواججها يومياً، واحنا راح نرد عليك بعرض سعر بأقل من ٢٤ ساعة.' },
  cta1:    { en: 'Fill in Discovery Form', ar: 'استبيان لفهم طبيعة مشروعك' },
  cta2:    { en: 'Try the Live Demo', ar: 'عرض توضيحي مباشر' },
  legal:   { en: 'MindSync · Software Design and Development Company', ar: 'مايند سينك شركة تصميم وتطوير البرمجيات' },
  copy:    { en: '© 2026 MindSync · Kuwait City', ar: '© 2026 مايندسينك · مدينة الكويت' },
  links:   { en: ['Bundles', 'How It Works', 'FAQ', 'Fill in Discovery Form'], ar: ['الباقات', 'آلية العمل', 'الأسئلة', 'استبيان لفهم طبيعة مشروعك'] },
  navLabel:{ en: 'Navigation', ar: 'التنقل' },
  contact: { en: 'Contact',    ar: 'تواصل' },
  tagline: { en: "Kuwait's only full-stack AI automation company.", ar: 'شركة برمجة و أتمتة ذكاء اصطناعي الوحيدة في الكويت للشركات الصغيرة والمتوسطة.' },
}

export function CTA() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)

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
  const { lang } = useLang()
  const hrefs = ['#bundles', '#process', '#faq', '/discovery']
  const links = t.links[lang]

  return (
    <footer className="bg-ms-ink-900 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 pb-12 border-b border-white/8">

          {/* Brand column */}
          <div>
            <p className="text-ms-ivory-0 font-bold text-[18px] mb-2">MindSync</p>
            <p className="text-white/30 text-[12px] mb-1" style={{ fontFamily: 'Noto Kufi Arabic' }}>
              {t.legal[lang]}
            </p>
            <p className="text-white/20 text-[11px] font-mono mb-5">
              {lang === 'ar' ? 'س.ت. 546511' : 'CR 546511'}
            </p>
            <p className="text-white/35 text-[13px] leading-relaxed max-w-[260px]">
              {t.tagline[lang]}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="text-white/25 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
              {t.navLabel[lang]}
            </p>
            <div className="space-y-3">
              {links.slice(0, 3).map((l, i) => (
                <a key={i} href={hrefs[i]}
                   className="block text-white/50 text-[14px] hover:text-white/80 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-white/25 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
              {t.contact[lang]}
            </p>
            <div className="space-y-3">
              <a href="/discovery"
                 className="block text-white/50 text-[14px] hover:text-white/80 transition-colors">
                {lang === 'ar' ? 'استبيان لفهم طبيعة مشروعك' : 'Fill in Discovery Form'}
              </a>
              <a href="mailto:admin@mindsynckw.com"
                 className="block text-white/50 text-[14px] hover:text-white/80 transition-colors">
                admin@mindsynckw.com
              </a>
              <p className="text-white/35 text-[14px]">Kuwait City, KW</p>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-white/20 text-[12px]">{t.copy[lang]}</p>
        </div>
      </div>
    </footer>
  )
}
