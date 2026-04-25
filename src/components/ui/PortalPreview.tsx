'use client'
import { useLang } from '@/lib/lang'

/**
 * Client Portal Preview — the "Value Delivered" hero panel.
 * Spec in product-definition.md → Product 2 → Hero Panel.
 *
 * Renders three big numbers up top: messages replied, bookings booked, missed.
 * Followed by uptime + recent activity as secondary info.
 */

type Stats = {
  messagesReplied: number
  bookings: number
  missed: number
  uptime: string        // e.g. "99.8%"
  monthLabel?: string   // e.g. "Apr 2026"
}

type PortalPreviewProps = {
  bundleName: { en: string; ar: string }
  stats?: Stats
}

const DEFAULT_STATS: Stats = {
  messagesReplied: 234,
  bookings: 41,
  missed: 0,
  uptime: '99.8%',
  monthLabel: 'Apr 2026',
}

const t = {
  valueDelivered: { en: 'Value delivered this month', ar: 'القيمة المُضافة هذا الشهر' },
  messages:       { en: 'messages replied',             ar: 'رسالة تم الرد عليها' },
  bookings:       { en: 'bookings captured',            ar: 'حجز تم التأكيد' },
  missed:         { en: 'missed messages',              ar: 'رسائل ضائعة' },
  uptime:         { en: 'Uptime',                        ar: 'وقت التشغيل' },
  live:           { en: 'Live',                          ar: 'مباشر' },
  recent:         { en: 'Recent activity',               ar: 'آخر المحادثات' },
  month:          { en: 'This month',                    ar: 'هذا الشهر' },
  agent:          { en: 'Agent',                         ar: 'الوكيل' },
}

export default function PortalPreview({ bundleName, stats = DEFAULT_STATS }: PortalPreviewProps) {
  const { lang, isAr } = useLang()

  const activity = [
    { time: '2m',  en: 'New booking confirmed ✅',     ar: 'حجز موعد جديد ✅' },
    { time: '8m',  en: 'Pricing inquiry',               ar: 'سؤال عن الأسعار' },
    { time: '15m', en: 'Reschedule request',            ar: 'طلب تغيير موعد' },
    { time: '31m', en: 'Customer review: 5 stars ⭐',   ar: 'تقييم العميل: 5 نجوم ⭐' },
  ]

  return (
    <div className="bg-ms-green-900 rounded-2xl border border-ms-green-700/50 overflow-hidden shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-ms-gold-600 text-[10px] tracking-widest uppercase">{t.agent[lang]}</p>
          <p className="text-ms-ivory-0 font-semibold text-[15px] leading-tight mt-0.5">
            {bundleName[isAr ? 'ar' : 'en']}
          </p>
        </div>
        <span className="flex items-center gap-1.5 bg-green-500/10 text-green-400 text-[11px] px-2.5 py-1 rounded-full border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t.live[lang]}
        </span>
      </div>

      {/* Value Delivered — hero numbers */}
      <div className="p-5">
        <p className="text-ms-gold-600 text-[10px] tracking-widest uppercase mb-3">
          {t.valueDelivered[lang]}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { n: stats.messagesReplied.toLocaleString(isAr ? 'ar-KW' : 'en-US'), l: t.messages[lang] },
            { n: stats.bookings.toString(), l: t.bookings[lang] },
            { n: stats.missed.toString(), l: t.missed[lang] },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
              <p className="text-ms-gold-600 font-bold text-[22px] leading-none mb-1">{s.n}</p>
              <p className="text-white/50 text-[10px] leading-snug">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Uptime tile */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-5 flex items-center justify-between">
          <p className="text-white/60 text-[11px]">{t.uptime[lang]} · {stats.monthLabel}</p>
          <p className="text-ms-ivory-0 font-mono font-bold text-[14px]">{stats.uptime}</p>
        </div>

        {/* Recent activity */}
        <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/5">
            <p className="text-white/50 text-[11px] tracking-wider uppercase">{t.recent[lang]}</p>
          </div>
          {activity.map((row, i) => (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3 border-b border-white/5 last:border-0">
              <span className="text-white/30 text-[10px] font-mono w-8 shrink-0">{row.time}</span>
              <span className="text-white/70 text-[12px]">{isAr ? row.ar : row.en}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
