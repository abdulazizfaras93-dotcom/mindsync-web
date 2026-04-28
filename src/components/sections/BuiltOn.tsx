'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: { en: 'Built on', ar: 'مبني على' },
  headline:{ en: 'The stack we wire into your business.', ar: 'المنظومة التي نبنيها داخل أعمالك.' },
  sub:     { en: 'Every channel your customers already use, every tool your team already trusts. We connect them — you don\'t.', ar: 'كل قناة يستخدمها عملاؤك بالفعل، وكل أداة يعتمد عليها فريقك. نحن نربطها — أنت لا تحتاج لذلك.' },
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
  { name: 'MyFatoorah',  wordmark: true },
  { name: 'KNET',        local: 'knet.svg' },
  { name: 'Tap',         wordmark: true },
  { name: 'Notion',      slug: 'notion' },
  { name: 'Airtable',    slug: 'airtable' },
  { name: 'Calendly',    slug: 'calendly' },
  { name: 'Foodics',     local: 'foodics.svg' },
  { name: 'Fresha',      local: 'fresha.svg' },
]

// Repeat enough times for a seamless loop on wide screens.
const repeated = <T,>(items: T[], n = 3) => Array.from({ length: n }).flatMap(() => items)

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
      className="h-16 w-44 flex-shrink-0 rounded-xl bg-white border border-ms-ivory-200 shadow-[0_1px_2px_rgba(15,46,34,0.04)] flex items-center justify-center px-4 cursor-default"
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
    <section id="built-on" className="py-24 bg-ms-ivory-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-3">{t.eyebrow[lang]}</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">{t.headline[lang]}</h2>
          <p className="text-ms-ink-600 text-[16px] max-w-xl mx-auto leading-relaxed">{t.sub[lang]}</p>
        </div>
      </div>

      {/* Marquee — full-bleed so the fade edges align with viewport */}
      <div className="relative">
        <div className="flex gap-6 marquee-left">
          {repeated(ROW_1).map((logo, i) => <LogoTile key={`r1-${i}`} logo={logo} />)}
        </div>
        <div className="flex gap-6 mt-6 marquee-right">
          {repeated(ROW_2).map((logo, i) => <LogoTile key={`r2-${i}`} logo={logo} />)}
        </div>

        {/* Fade overlays (use ivory-100 to match section bg) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ms-ivory-100 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ms-ivory-100 to-transparent" />
      </div>
    </section>
  )
}