'use client'
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const KuwaitParticles = dynamic(() => import('@/components/canvas/KuwaitParticles'), { ssr: false })

const t = {
  eyebrow: { en: "Let's build",       ar: 'لنبدأ البناء' },
  headline:{ en: "Let's build your first agent. This month.", ar: 'خلنا نبني وكيلك الأول. هذا الشهر.' },
  sub:     { en: "Message us your business name and the one problem you're most tired of handling manually. We'll reply with a fixed-scope quote in under 24 hours.", ar: "أرسل لنا اسم عملك والمشكلة التي أرهقتك يدوياً. سنرد بعرض سعر محدد النطاق في أقل من ٢٤ ساعة." },
  cta1:    { en: 'WhatsApp Us Now',    ar: 'راسلنا على واتساب الآن' },
  cta2:    { en: 'Try the Live Demo', ar: 'جرّب العرض المباشر' },
  legal:   { en: 'مايند سينك لتصميم وبرمجة البرمجيات الخاصة', ar: 'مايند سينك لتصميم وبرمجة البرمجيات الخاصة' },
  copy:    { en: '© 2026 MindSync · Kuwait City', ar: '© 2026 مايندسينك · مدينة الكويت' },
  links:   { en: ['Bundles', 'How It Works', 'FAQ', 'WhatsApp'], ar: ['الباقات', 'آلية العمل', 'الأسئلة', 'واتساب'] },
  navLabel:{ en: 'Navigation', ar: 'التنقل' },
  contact: { en: 'Contact',    ar: 'تواصل' },
  tagline: { en: "Kuwait's only full-stack AI automation agency for small businesses.", ar: 'وكالة الأتمتة الذكية الوحيدة في الكويت للشركات الصغيرة والمتوسطة.' },
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
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ms-gold-600 text-ms-green-900 font-bold text-[14px] px-7 py-3.5 rounded-lg hover:bg-ms-gold-400 transition-all duration-200 inline-flex items-center gap-2.5 active:scale-[0.98]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
  const hrefs = ['#bundles', '#process', '#faq', WHATSAPP_URL]
  const links = t.links[lang]

  return (
    <footer className="bg-ms-ink-900 pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 pb-12 border-b border-white/8">

          {/* Brand column */}
          <div>
            <p className="text-ms-ivory-0 font-bold text-[18px] mb-2">MindSync</p>
            <p className="text-white/30 text-[12px] mb-5" style={{ fontFamily: 'Noto Kufi Arabic' }}>
              {t.legal[lang]}
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                 className="block text-white/50 text-[14px] hover:text-white/80 transition-colors">
                WhatsApp
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
