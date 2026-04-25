'use client'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const t = {
  eyebrow: { en: "Let's build", ar: 'لنبدأ البناء' },
  headline:{ en: "Let's build your first agent. This month.", ar: 'خلنا نبني وكيلك الأول. هذا الشهر.' },
  sub:     { en: "Message us your business name and the one problem you're most tired of handling manually. We'll reply with a fixed-scope quote in under 24 hours.", ar: "أرسل لنا اسم عملك والمشكلة التي أرهقتك يدوياً. سنرد بعرض سعر محدد النطاق في أقل من ٢٤ ساعة." },
  cta1:    { en: 'WhatsApp Us Now', ar: 'راسلنا على واتساب الآن' },
  cta2:    { en: 'Try the Live Demo', ar: 'جرّب العرض المباشر' },
  legal:   { en: 'مايند سينك لتصميم وبرمجة البرمجيات الخاصة', ar: 'مايند سينك لتصميم وبرمجة البرمجيات الخاصة' },
  copy:    { en: '© 2026 MindSync · Kuwait City', ar: '© 2026 مايندسينك · مدينة الكويت' },
  links:   { en: ['Bundles', 'How It Works', 'FAQ', 'WhatsApp'], ar: ['الباقات', 'آلية العمل', 'الأسئلة', 'واتساب'] },
}

export function CTA() {
  const { lang } = useLang()
  return (
    <section className="py-24 hero-bg pattern-overlay">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-4">{t.eyebrow[lang]}</p>
        <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-tight leading-[1.1] mb-5">{t.headline[lang]}</h2>
        <p className="text-white/85 text-[16px] leading-relaxed max-w-xl mx-auto mb-10">{t.sub[lang]}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
             className="wa-pulse bg-[#25D366] text-white font-bold text-[15px] px-8 py-4 rounded-xl inline-flex items-center gap-2 hover:bg-[#20bd5a] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.cta1[lang]}
          </a>
          <a href="#demo"
             className="bg-white/10 text-ms-ivory-0 font-medium text-[15px] px-8 py-4 rounded-xl border border-white/15 hover:bg-white/15 transition-colors">
            {t.cta2[lang]}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { lang } = useLang()
  const hrefs = ['#bundles', '#process', '#faq', WHATSAPP_URL]
  return (
    <footer className="bg-ms-ink-900 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white/80 font-bold text-[16px] mb-0.5">MindSync</p>
            <p className="text-white/30 text-[11px] font-arabic" style={{fontFamily:'Noto Kufi Arabic'}}>{t.legal[lang]}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {t.links[lang].map((l, i) => (
              <a key={i} href={hrefs[i]} target={i === 3 ? '_blank' : undefined} rel={i === 3 ? 'noopener noreferrer' : undefined}
                 className="text-white/40 text-[13px] hover:text-white/70 transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-white/25 text-[12px]">{t.copy[lang]}</p>
        </div>
      </div>
    </footer>
  )
}
