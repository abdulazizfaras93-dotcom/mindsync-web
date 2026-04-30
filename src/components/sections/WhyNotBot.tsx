'use client'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: {
    ar: 'ليش مايند سينك مو بوت عادي؟',
    en: 'Why MindSync not just a bot?',
  },
  headline: {
    ar: 'شركات كثيرة في الكويت تبيعك بوت.\nمايند سينك تبني لك نظام.\nالفرق؟ كل شيء.',
    en: 'Many companies in Kuwait will sell you a bot.\nMindSync builds you a system.\nThe difference? Everything.',
  },
  body: {
    ar: 'البوت يقرأ من قائمة أجوبة جاهزة.\nالنظام اللي نبنيه يفكر — يعرف اللي تبيه، يقرر متى يحجز،\nمتى يتابع، ومتى يحيلك لنا. مبني خصوصاً لك،\nما نستخدم قوالب جاهزة.',
    en: "A bot reads from a prepared answer list.\nThe system we build thinks — it knows what you want,\ndecides when to book, when to follow up, and when to escalate.\nBuilt specifically for you. No two MindSync systems are identical.",
  },
  tableHeaders: {
    ar: ['شركات البوت', 'فريلانسر', 'Enterprise AI', 'مايند سينك'],
    en: ['Bot Company', 'Freelancer', 'Enterprise AI', 'MindSync'],
  },
  cards: [
    {
      title: { ar: 'مبنيّ لك، مو نسخة من قالب', en: 'Built for you, not copied from a template' },
      body:  { ar: 'كل نظام نبنيه برمج خصوصاً لعملك — أسعارك، فريقك، ساعات عملك، أسلوبك. ما في نسختين متطابقتين في مايند سينك.', en: 'Every system we build is programmed specifically for your business — your pricing, team, hours, tone. No two MindSync systems are identical.' },
    },
    {
      title: { ar: 'نعلّم الذكاء الاصطناعي بعملك', en: 'We teach the AI your business' },
      body:  { ar: 'مو سيناريو يقرأ من قائمة. ذكاء اصطناعي يتعلم كيف تفكر، متى يحيل، وكيف يرد — بلغتك وأسلوبك.', en: "Not a script reading from a list. An AI agent that learns how you think, when to escalate, and how to respond — in your language and your tone." },
    },
    {
      title: { ar: 'نبقى معاك بعد الإطلاق', en: 'We stay with you after launch' },
      body:  { ar: 'الاشتراك الشهري مو رسوم — هو ضمان. شخص يراقب نظامك ويطوّره كل شهر. من دون ما تطلب.', en: "The monthly retainer isn't a fee — it's a guarantee. Someone watching, fixing, and improving your system every month. Without you asking." },
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
  { feature: { ar: 'رد تلقائي',             en: 'Auto-reply' },              bot: '✓', freelancer: '✓', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'متابعة بعد الزيارة',     en: 'Post-visit follow-up' },    bot: '✗', freelancer: '~', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'CRM + سجل العميل',       en: 'CRM + client history' },    bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'تحليلات الإيرادات',     en: 'Revenue analytics' },       bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'صيانة شهرية',            en: 'Monthly maintenance' },     bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'مبني لسوق الكويت',       en: 'Built for Kuwait market' }, bot: '✗', freelancer: '~', enterprise: '✗', ms: '✓' },
  { feature: { ar: 'شركة برمجيات مرخصة',    en: 'Licensed software company'},bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  {
    feature: { ar: 'السعر', en: 'Price' },
    bot: { ar: 'منخفض', en: 'Low' },
    freelancer: { ar: 'منخفض', en: 'Low' },
    enterprise: '+10,000 KWD',
    ms: '200–580 KWD/شهر',
  },
]

function cellColor(val: string): string {
  if (val === '✓') return 'text-ms-gold-600'
  if (val === '✗') return 'text-red-400'
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
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-ms-gold-600/40">
                <th className="text-left py-3 pr-4 text-white/40 font-mono text-[11px] tracking-widest uppercase w-[34%]">
                  {isAr ? 'الميزة' : 'Feature'}
                </th>
                {t.tableHeaders[lang].map((h, i) => (
                  <th key={i} className={`py-3 px-3 font-mono text-[11px] tracking-widest uppercase text-center ${i === 3 ? 'text-ms-gold-600' : 'text-white/40'}`}>
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
                    const val = typeof rawVal === 'object' && rawVal !== null && ('ar' in rawVal || 'en' in rawVal)
                      ? (rawVal as { ar: string; en: string })[lang]
                      : rawVal as string
                    return (
                      <td key={col} className={`py-3 px-3 text-center font-mono text-[13px] font-semibold ${col === 'ms' ? 'text-ms-gold-600' : cellColor(val)}`}>
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
