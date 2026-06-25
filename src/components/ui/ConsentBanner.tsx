'use client'
import { useEffect, useState } from 'react'
import { analyticsEnabled, getConsent, setConsent } from '@/lib/posthog'

/** Bilingual consent bar. Only shows when analytics is configured and no choice was made yet. */
export default function ConsentBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (analyticsEnabled() && !getConsent()) setShow(true)
  }, [])

  if (!show) return null

  const decide = (v: 'granted' | 'denied') => {
    setConsent(v)
    setShow(false)
  }

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      dir="rtl"
      style={{
        position: 'fixed', insetInline: 0, bottom: 0, zIndex: 60,
        background: '#0F2E22', color: '#FBFAF5',
        borderTop: '1px solid rgba(191,141,56,0.35)',
        padding: '14px 18px',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
        gap: '12px', fontSize: '13px', lineHeight: 1.5,
      }}
    >
      <p style={{ margin: 0, maxWidth: 640, textAlign: 'center' }}>
        🍪 نستخدم كوكيز لتحسين الموقع.
        <span style={{ opacity: 0.7 }}> · We use cookies to improve the site.</span>
      </p>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={() => decide('granted')}
          style={{ background: '#BF8D38', color: '#0F2E22', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
        >
          موافق · Accept
        </button>
        <button
          onClick={() => decide('denied')}
          style={{ background: 'transparent', color: '#FBFAF5', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, padding: '8px 18px', cursor: 'pointer', fontSize: 13 }}
        >
          رفض · Decline
        </button>
      </div>
    </div>
  )
}
