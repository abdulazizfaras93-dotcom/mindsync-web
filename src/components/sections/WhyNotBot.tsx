'use client'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: {
    ar: 'ÙÙØ´ ÙØ§ÙÙØ¯ Ø³ÙÙÙ ÙÙ Ø¨ÙØª Ø¹Ø§Ø¯ÙØ',
    en: 'Why MindSync is not just a bot?',
  },
  headline: {
    ar: 'Ø´Ø±ÙØ§Øª ÙØ«ÙØ±Ø© ÙÙ Ø§ÙÙÙÙØª ØªØ¨ÙØ¹Ù Ø¨ÙØª.\nÙØ§ÙÙØ¯ Ø³ÙÙÙ ØªØ¨ÙÙ ÙÙ ÙØ¸Ø§Ù.\nØ§ÙÙØ±ÙØ ÙÙ Ø´ÙØ¡.',
    en: 'Many companies in Kuwait will sell you a bot.\nMindSync builds you a system.\nThe difference? Everything.',
  },
  body: {
    ar: 'Ø§ÙØ¨ÙØª ÙÙØ±Ø£ ÙÙ ÙØ§Ø¦ÙØ© Ø£Ø¬ÙØ¨Ø© Ø¬Ø§ÙØ²Ø©.\nØ§ÙÙØ¸Ø§Ù Ø§ÙÙÙ ÙØ¨ÙÙÙ ÙÙÙØ± â ÙØ¹Ø±Ù Ø§ÙÙÙ ØªØ¨ÙÙØ ÙÙØ±Ø± ÙØªÙ ÙØ­Ø¬Ø²Ø\nÙØªÙ ÙØªØ§Ø¨Ø¹Ø ÙÙØªÙ ÙØ­ÙÙÙ ÙÙØ§. ÙØ¨ÙÙ Ø®ØµÙØµØ§Ù ÙÙØ\nÙØ§ ÙØ³ØªØ®Ø¯Ù ÙÙØ§ÙØ¨ Ø¬Ø§ÙØ²Ø©.',
    en: "A bot reads from a prepared answer list.\nThe system we build thinks â it knows what you want,\ndecides when to book, when to follow up, and when to escalate.\nBuilt specifically for you. No two MindSync systems are identical.",
  },
  tableHeaders: {
    ar: ['Ø´Ø±ÙØ§Øª Ø§ÙØ¨ÙØª', 'ÙØ±ÙÙØ§ÙØ³Ø±', 'Enterprise AI', 'ÙØ§ÙÙØ¯ Ø³ÙÙÙ'],
    en: ['Bot Company', 'Freelancer', 'Enterprise AI', 'MindSync'],
  },
  cards: [
    {
      title: { ar: 'ÙØ¨ÙÙÙ ÙÙØ ÙÙ ÙØ³Ø®Ø© ÙÙ ÙØ§ÙØ¨', en: 'Built for you, not copied from a template' },
      body:  { ar: 'ÙÙ ÙØ¸Ø§Ù ÙØ¨ÙÙÙ Ø¨Ø±ÙØ¬ Ø®ØµÙØµØ§Ù ÙØ¹ÙÙÙ â Ø£Ø³Ø¹Ø§Ø±ÙØ ÙØ±ÙÙÙØ Ø³Ø§Ø¹Ø§Øª Ø¹ÙÙÙØ Ø£Ø³ÙÙØ¨Ù. ÙØ§ ÙÙ ÙØ³Ø®ØªÙÙ ÙØªØ·Ø§Ø¨ÙØªÙÙ ÙÙ ÙØ§ÙÙØ¯ Ø³ÙÙÙ.', en: 'Every system we build is programmed specifically for your business â your pricing, team, hours, tone. No two MindSync systems are identical.' },
    },
    {
      title: { ar: 'ÙÙÙÙ Ø°ÙÙ ÙØªØ¹ÙÙ Ø¹ÙÙÙ', en: 'An AI agent that learns your business' },
      body:  { ar: 'ÙÙ Ø³ÙÙØ§Ø±ÙÙ ÙÙØ±Ø£ ÙÙ ÙØ§Ø¦ÙØ©. ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØªØ¹ÙÙ ÙÙÙ ØªÙÙØ±Ø ÙØªÙ ÙØ­ÙÙØ ÙÙÙÙ ÙØ±Ø¯ â Ø¨ÙØºØªÙ ÙØ£Ø³ÙÙØ¨Ù ÙØ¹ÙÙ Ø£Ù ÙÙØ§Ø© ØªØ®ØªØ§Ø±ÙØ§.', en: "Not a script reading from a list. An AI agent that learns how you think, when to escalate, and how to respond â in your language, your tone, on any channel you choose." },
    },
    {
      title: { ar: 'ÙØ¨ÙÙ ÙØ¹Ø§Ù Ø¨Ø¹Ø¯ Ø§ÙØ¥Ø·ÙØ§Ù', en: 'We stay with you after launch' },
      body:  { ar: 'Ø§ÙØ§Ø´ØªØ±Ø§Ù Ø§ÙØ´ÙØ±Ù ÙØ´ÙÙ ÙÙ Ø´Ù â hostingØ APIØ ØªØ­Ø¯ÙØ«Ø§ØªØ Ø¯Ø¹Ù. Ø´Ø®Øµ ÙØ±Ø§ÙØ¨ ÙØ¸Ø§ÙÙ ÙÙØ·ÙÙØ±Ù ÙÙ Ø´ÙØ± Ø¨Ø¯ÙÙ ÙØ§ ØªØ·ÙØ¨.', en: "The monthly retainer covers everything â hosting, API, updates, support. Someone watching, fixing, and improving your system every month. Without you asking." },
    },
  ],
}

type TableRow = {
  feature: { ar: string; en: string }
  bot: string | { ar: string; en: string }
  freelancer: string | { ar: string; en: string }
  enterprise: string | { ar: string; en: string }
  ms: string | { ar: string; en: string }
}

const TABLE_ROWS: TableRow[] = [
  { feature: { ar: 'Ø±Ø¯ ØªÙÙØ§Ø¦Ù',              en: 'Auto-reply' },               bot: 'â', freelancer: 'â', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù',      en: 'AI agent (not a script)' },  bot: 'â', freelancer: 'â', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'ÙØªØ§Ø¨Ø¹Ø© Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©',      en: 'Post-visit follow-up' },     bot: 'â', freelancer: '~', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'ÙÙÙØ¹ Ø£Ù ØªØ·Ø¨ÙÙ ÙØ®ØµØµ',     en: 'Custom website or app' },    bot: 'â', freelancer: '~', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',       en: 'Full monthly maintenance' }, bot: 'â', freelancer: 'â', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'ÙØ¨ÙÙ ÙØ³ÙÙ Ø§ÙÙÙÙØª',        en: 'Built for Kuwait market' },  bot: 'â', freelancer: '~', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'Ø£Ø³Ø¨ÙØ¹ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ©',      en: 'Free 1-week trial' },        bot: 'â', freelancer: 'â', enterprise: 'â', ms: 'â' },
  { feature: { ar: 'Ø´Ø±ÙØ© Ø¨Ø±ÙØ¬ÙØ§Øª ÙØ±Ø®ØµØ©',     en: 'Licensed software company'}, bot: 'â', freelancer: 'â', enterprise: 'â', ms: 'â' },
  {
    feature: { ar: 'Ø§ÙØ³Ø¹Ø±', en: 'Price' },
    bot:        { ar: 'ÙÙØ®ÙØ¶', en: 'Low' },
    freelancer: { ar: 'ÙÙØ®ÙØ¶', en: 'Low' },
    enterprise: '+10,000 KWD',
    ms:         '130â520 KWD/Ø´ÙØ±',
  },
]

function cellColor(val: string): string {
  if (val === 'â') return 'text-ms-gold-600'
  if (val === 'â') return 'text-red-400'
  if (val === '~') return 'text-yellow-400'
  return 'text-white/60'
}

export default function WhyNotBot() {
  const { lang, isAr } = useLang()

  return (
    <section className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Eyebrow */}
        <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono font-medium mb-5 flex items-center gap-3">
          <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
          {t.eyebrow[lang]}
        </p>

        {/* Headline */}
        <h2 className="text-[38px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-6 whitespace-pre-line">
          {t.headline[lang]}
        </h2>

        {/* Body */}
        <p className="text-white/55 text-[16px] leading-relaxed max-w-2xl mb-14 whitespace-pre-line">
          {t.body[lang]}
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full min-w-[580px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-ms-gold-600/40">
                <th className="text-left py-3 pr-4 text-white/40 font-mono text-[11px] tracking-widest uppercase w-[32%]">
                  {isAr ? 'Ø§ÙÙÙØ²Ø©' : 'Feature'}
                </th>
                {t.tableHeaders[lang].map((h, i) => (
                  <th
                    key={i}
                    className={`py-3 px-3 font-mono text-[11px] tracking-widest uppercase text-center ${
                      i === 3 ? 'text-ms-gold-600' : 'text-white/40'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-white/8 last:border-0 hover:bg-white/3">
                  <td className="py-3 pr-4 text-white/60 text-[13px]">{row.feature[lang]}</td>
                  {(['bot', 'freelancer', 'enterprise', 'ms'] as const).map((col) => {
                    const rawVal = row[col]
                    const val =
                      typeof rawVal === 'object' && rawVal !== null && ('ar' in rawVal || 'en' in rawVal)
                        ? (rawVal as { ar: string; en: string })[lang]
                        : (rawVal as string)
                    return (
                      <td
                        key={col}
                        className={`py-3 px-3 text-center font-mono text-[13px] font-semibold ${
                          col === 'ms' ? 'text-ms-gold-600' : cellColor(val)
                        }`}
                      >
                        {val}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Differentiator Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.cards.map((card, i) => (
            <div key={i} className="border border-ms-gold-600/30 bg-ms-green-800 rounded-xl p-6">
              <h3 className="text-ms-gold-600 font-bold text-[16px] mb-3">{card.title[lang]}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{card.body[lang]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
