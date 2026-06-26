'use client'
import { useEffect, useState } from 'react'
import { useLang } from '@/lib/lang'

export default function PayResult({ ok }: { ok: boolean }) {
  const { isAr } = useLang()
  const [ref, setRef] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setRef(p.get('paymentId') || p.get('Id') || '')
  }, [])

  const t = ok
    ? {
        title: isAr ? 'تم استلام دفعتك' : 'Payment received',
        body: isAr ? 'شكراً لك! بنتواصل معك قريب لإكمال الخطوات.' : "Thank you! We'll reach out shortly to continue.",
        glyph: '✓',
        color: '#D8AE5A',
      }
    : {
        title: isAr ? 'ما تمت العملية' : 'Payment didn’t go through',
        body: isAr ? 'صار خطأ في الدفع. حاول مرة ثانية أو راسلنا على واتساب ونساعدك.' : 'Something went wrong with the payment. Try again or message us on WhatsApp.',
        glyph: '✕',
        color: 'rgba(251,250,245,.8)',
      }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0A1F17',
        color: '#FBFAF5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: isAr ? 'var(--font-kufi), sans-serif' : 'var(--font-grotesk), sans-serif',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 440, width: '100%' }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: ok ? 'rgba(191,141,56,.14)' : 'rgba(251,250,245,.06)',
            border: `1.5px solid ${ok ? '#BF8D38' : 'rgba(251,250,245,.2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: 36,
            color: t.color,
          }}
        >
          {t.glyph}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: ok ? '#D8AE5A' : '#FBFAF5' }}>{t.title}</h1>
        <p style={{ color: 'rgba(251,250,245,.6)', lineHeight: 1.7, marginBottom: 24, fontSize: 15 }}>{t.body}</p>
        {ref && (
          <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'rgba(251,250,245,.4)', marginBottom: 26 }}>
            {isAr ? 'مرجع العملية' : 'Reference'}: {ref}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/"
            style={{ padding: '13px 26px', borderRadius: 12, background: '#BF8D38', color: '#0A1F17', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}
          >
            {isAr ? 'الصفحة الرئيسية' : 'Back home'}
          </a>
          {!ok && (
            <a
              href="https://wa.me/96599539006"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '13px 26px', borderRadius: 12, border: '1px solid rgba(251,250,245,.2)', color: '#FBFAF5', textDecoration: 'none', fontSize: 14 }}
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
