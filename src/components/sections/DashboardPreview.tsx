'use client'
import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { useLang } from '@/lib/lang'

const copy = {
  en: {
    eyebrow: 'The Platform',
    heading: 'Your entire business\nautomation, in one place.',
    sub: 'From WhatsApp bookings to analytics dashboards — MindSync runs everything so you don\'t have to.',
  },
  ar: {
    eyebrow: 'المنصة',
    heading: 'أتمتة أعمالك بالكامل\nفي مكان واحد.',
    sub: 'من حجوزات واتساب إلى لوحات التحليلات — مايند سينك يدير كل شيء.',
  },
}

export default function DashboardPreview() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section
      className="overflow-hidden bg-ms-ivory-0 py-10 md:py-20"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <p className="font-mono text-xs tracking-widest text-ms-gold-600 uppercase mb-3">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-ms-ink-900 leading-tight whitespace-pre-line mb-4">
              {t.heading}
            </h2>
            <p className="text-ms-ink-500 text-base md:text-lg max-w-xl mx-auto">
              {t.sub}
            </p>
          </div>
        }
      >
        <Image
          src="/dashboard-preview.jpg"
          alt="MindSync automation platform dashboard"
          fill
          className="object-cover object-top rounded-2xl"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={false}
        />
      </ContainerScroll>
    </section>
  )
}
