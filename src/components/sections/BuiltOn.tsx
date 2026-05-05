'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const COPY = {
  eyebrow:  { en: 'Built on',  ar: 'مبني على' },
  headline: { en: 'The stack we wire into your business.',         ar: 'المنظومة التي نبنيها داخل مشروعك.' },
  sub:      { en: "Every channel your customers already use, every tool your team already trusts. We connect them — you don't.", ar: 'كل قناة يستخدمها عملاؤك الحين، وكل أداة يعتمد عليها موظفينك. احنا نربطها — أنت خلك مرتاح.' },
}

type Logo = { name: string; slug?: string; local?: string; wordmark?: boolean }

const ROW_1: Logo[] = [
  { name: 'WhatsApp Business', slug: 'whatsapp' },
  { name: 'Instagram',         slug: 'instagram' },
  { name: 'Telegram',          slug: 'telegram' },
  { name: 'Messenger',         slug: 'messenger' },
  { name: 'Claude',            local: 'claude.svg' },
  { name: 'n8n',               slug: 'n8n' },
  { name: 'OpenAI',            local: 'openai.svg' },
  { name: 'Google',            slug: 'google' },
]

const ROW_2: Logo[] = [
  { name: 'MyFatoorah', wordmark: true },
  { name: 'KNET',       local: 'knet.svg' },
  { name: 'Tap',        wordmark: true },
  { name: 'Notion',     slug: 'notion' },
  { name: 'Airtable',   slug: 'airtable' },
  { name: 'Calendly',   slug: 'calendly' },
  { name: 'Foodics',    local: 'foodics.svg' },
  { name: 'Fresha',     local: 'fresha.svg' },
]

function LogoTile({ logo }: { logo: Logo }) {
  const src = logo.local
    ? `/brand/integrations/${logo.local}`
    : logo.slug
      ? `https://cdn.simpleicons.org/${logo.slug}/153E2D`
      : null

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(15,46,34,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="h-16 w-44 flex-shrink-0 mx-3 rounded-xl bg-white border border-ms-ivory-200 shadow-[0_1px_2px_rgba(15,46,34,0.04)] flex items-center justify-center px-4 cursor-default"
    >
      {src ? (
        <img
          src={src}
          alt={logo.name}
          className="h-7 w-auto max-w-[140px] object-contain opacity-90"
          loading="lazy"
        />
      ) : (
        <span className="font-mono text-[14px] font-bold text-ms-green-800 tracking-tight">{logo.name}</span>
      )}
    </motion.div>
  )
}

export default function BuiltOn() {
  const { lang } = useLang()

  return (
    <section id="built-on" className="py-24 bg-ms-ivory-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{COPY.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">{COPY.headline[lang]}</h2>
          <p className="text-ms-ink-600 text-[16px] max-w-xl mx-auto leading-relaxed">{COPY.sub[lang]}</p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative overflow-hidden mb-6">
        <div className="flex w-max animate-marquee">
          {[...ROW_1, ...ROW_1].map((logo, i) => <LogoTile key={`r1-${i}`} logo={logo} />)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ms-ivory-100 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ms-ivory-100 to-transparent z-10" />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee-reverse">
          {[...ROW_2, ...ROW_2].map((logo, i) => <LogoTile key={`r2-${i}`} logo={logo} />)}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ms-ivory-100 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ms-ivory-100 to-transparent z-10" />
      </div>
    </section>
  )
}
