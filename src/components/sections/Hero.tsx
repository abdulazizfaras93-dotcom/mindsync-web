'use client'
import { useLang } from '@/lib/lang'
import { WHATSAPP_URL } from '@/lib/data'

const t = {
  eyebrow:  { en: 'AI Automation Agency · وكالة الأتمتة الذكية', ar: 'وكالة الأتمتة الذكية · AI Automation Agency' },
  headline: { en: 'Your Business,', ar: 'أعمالك،' },
  headlineAccent: { en: 'Automated.', ar: 'مؤتمتة.' },
  sub:      { en: 'AI agents for clinics, salons, gyms, garages, restaurants & real-estate offices in Kuwait. Built, deployed, and maintained — in 7 business days.', ar: 'وكلاء ذكاء اصطناعي للعيادات والصالونات والجيمات وورش السيارات والمطاعم ومكاتب العقارات في الكويت. مبنية، مُشغَّلة، ومُصانة — في 7 أيام عمل.' },
  cta1:     { en: 'Chat on WhatsApp',  ar: 'تواصل على واتساب' },
  cta2:     { en: 'See the Bundles',   ar: 'اكتشف الباقات' },
  stat1n:   { en: '7', ar: '٧' },
  stat1l:   { en: 'Business days to go live', ar: 'أيام عمل للإطلاق' },
  stat2n:   { en: '6', ar: '٦' },
  stat2l:   { en: 'Industry bundles', ar: 'باقات صناعية' },
  stat3n:   { en: '24/7', ar: '٢٤/٧' },
  stat3l:   { en: 'Agent uptime', ar: 'وقت تشغيل الوكيل' },
  stat4n:   { en: '100%', ar: '١٠٠٪' },
  stat4l:   { en: 'You own the data & flows', ar: 'بياناتك وسيناريوهاتك ملكك' },
}

export default function Hero() {
  const { lang } = useLang()

  return (
    <section className="relative min-h-screen hero-bg pattern-overlay flex flex-col justify-center pt-16">

      {/* Gold geometric accent — top right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="400" cy="0" r="200" stroke="#BF8D38" strokeWidth="0.5"/>
          <circle cx="400" cy="0" r="140" stroke="#BF8D38" strokeWidth="0.5"/>
          <circle cx="400" cy="0" r="80" stroke="#BF8D38" strokeWidth="0.5"/>
        </svg>
      </div>

      {/* Bottom left geometric */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] opacity-8 pointer-events-none">
        <svg viewBox="0 0 300 300" fill="none">
          <polygon points="0,300 150,0 300,300" stroke="#BF8D38" strokeWidth="0.5" fill="none"/>
          <polygon points="30,300 150,60 270,300" stroke="#BF8D38" strokeWidth="0.5" fill="none"/>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-6 mt-4">{t.eyebrow[lang]}</p>

          {/* Headline */}
          <h1 className="text-[56px] md:text-[72px] font-bold tracking-tight leading-[1.05] mb-4">
            <span className="text-ms-ivory-0">{t.headline[lang]}</span>
            <br/>
            <span className="text-ms-gold-600">{t.headlineAccent[lang]}</span>
          </h1>

          {/* Sub */}
          <p className="text-white/85 text-[17px] leading-relaxed max-w-xl mb-10 font-light">{t.sub[lang]}</p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
               className="bg-ms-gold-600 text-ms-green-900 font-bold text-[15px] px-8 py-4 rounded-xl hover:bg-ms-gold-400 transition-all duration-200 inline-flex items-center gap-2">
              {t.cta1[lang]}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#bundles"
               className="bg-white/15 text-ms-ivory-0 font-semibold text-[15px] px-8 py-4 rounded-xl border border-white/25 hover:bg-white/25 transition-all duration-200">
              {t.cta2[lang]}
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {[
              { n: t.stat1n[lang], l: t.stat1l[lang] },
              { n: t.stat2n[lang], l: t.stat2l[lang] },
              { n: t.stat3n[lang], l: t.stat3l[lang] },
              { n: t.stat4n[lang], l: t.stat4l[lang] },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 px-6 py-5">
                <p className="text-ms-gold-600 text-[28px] font-bold leading-none mb-1">{s.n}</p>
                <p className="text-white/85 text-[12px] leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/60"></div>
        <div className="w-1 h-1 rounded-full bg-white/60"></div>
      </div>
    </section>
  )
}
