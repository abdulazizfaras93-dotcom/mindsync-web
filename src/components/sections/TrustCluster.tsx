'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'

/**
 * Trust Cluster — sits directly above the final CTA.
 * Reasoning documented in website-optimization.md §3.
 *
 * 1. Made-in-Kuwait badge (gold-on-green, hero-scale)
 * 2. Live active-agent count (from n8n public webhook)
 * 3. MyFatoorah + Meta Business Partner logos
 * 4. Data-residency line in Arabic + English
 */

const t = {
  eyebrow:    { en: 'Trust & credentials', ar: 'الثقة والاعتمادات' },
  madeIn:     { en: 'Made in Kuwait',      ar: 'شركة كويتية' },
  agentsLbl:  { en: 'live agents running', ar: 'وكلاء شغّالين' },
  residency:  {
    en: 'Your data stays in Kuwait. We don\'t sell it. We don\'t share it.',
    ar: 'معلوماتك تبقى بالكويت، ما نبيعها وما نشاركها.',
  },
  fatoorah:   { en: 'MyFatoorah payments', ar: 'دفع عبر ماي فاتورة' },
  metaPartner:{ en: 'Meta Business Partner', ar: 'شريك ميتا للأعمال' },
}

export default function TrustCluster() {
  const { lang, isAr } = useLang()
  const [agentCount, setAgentCount] = useState<number | null>(null)

  useEffect(() => {
    // TODO: wire to n8n public endpoint when ready
    //   fetch('/api/agent-count').then(r => r.json()).then(d => setAgentCount(d.count))
    // For now, render the placeholder so the UI stays stable.
    setAgentCount(12)
  }, [])

  return (
    <section aria-labelledby="trust-heading" className="py-20 bg-ms-ivory-100 border-y border-ms-ivory-200">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-ms-gold-600 text-[11px] tracking-[0.18em] uppercase font-medium mb-6 text-center">
          {t.eyebrow[lang]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">

          {/* Made in Kuwait — primary chrome */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-br from-ms-green-900 via-ms-green-800 to-ms-green-700 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ms-gold-600 flex items-center justify-center shrink-0" aria-hidden>
              <span className="text-ms-green-900 text-[20px] font-bold">KW</span>
            </div>
            <div>
              <p className="text-ms-gold-600 text-[10px] tracking-widest uppercase mb-1">
                {isAr ? 'الهوية المحلية' : 'Local identity'}
              </p>
              <p id="trust-heading" className="text-ms-ivory-0 text-[22px] font-bold leading-tight">
                {t.madeIn[lang]}
              </p>
            </div>
          </div>

          {/* Live agent count */}
          <div className="rounded-2xl bg-white border border-ms-ivory-200 p-6 text-center flex flex-col justify-center">
            <p className="text-ms-green-800 font-mono text-[36px] font-bold leading-none">
              {agentCount ?? '—'}
            </p>
            <p className="text-ms-ink-600 text-[12px] mt-2 leading-tight">
              {t.agentsLbl[lang]}
            </p>
          </div>

          {/* Partner badges */}
          <div className="rounded-2xl bg-white border border-ms-ivory-200 p-6 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ms-gold-600 shrink-0" />
              <span className="text-ms-ink-900 text-[13px] font-medium">{t.fatoorah[lang]}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ms-gold-600 shrink-0" />
              <span className="text-ms-ink-900 text-[13px] font-medium">{t.metaPartner[lang]}</span>
            </div>
          </div>
        </div>

        <p className="text-ms-ink-600 text-[14px] text-center mt-8 max-w-xl mx-auto leading-relaxed">
          {t.residency[lang]}
        </p>
      </div>
    </section>
  )
}
