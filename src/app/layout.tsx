import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Noto_Kufi_Arabic, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import SmoothScroll from '@/components/providers/SmoothScroll'
import './globals.css'

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
})

const kufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-kufi',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL   = 'https://www.mindsynckw.com'
const TITLE      = 'MindSync — منظومة ذكاء اصطناعي للمشاريع المنزلية بالكويت'
const DESCRIPTION =
  'منظومة AI كاملة للمشاريع المنزلية بالكويت — ترد، تحجز، تتابع، وتحليل ٢٤/٧. سعر شامل: 349 د.ك إعداد + 159 د.ك شهرياً. أسبوع تجربة مجاني.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'مشاريع منزلية الكويت',
    'أتمتة المشاريع المنزلية',
    'AI للمشاريع الصغيرة الكويت',
    'نظام ذكي للأعمال',
    'واتساب بوت الكويت',
    'حجز تلقائي',
    'MindSync',
    'home business automation Kuwait',
    'AI agent Kuwait',
    'ذكاء اصطناعي الكويت',
    'نظام مؤتمت الكويت',
    'AI agency Kuwait',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type:            'website',
    url:             SITE_URL,
    siteName:        'MindSync',
    title:           TITLE,
    description:     DESCRIPTION,
    locale:          'ar_KW',
    alternateLocale: ['en_US'],
    images: [
      { url: '/og/b-terminal-ar.png', width: 1200, height: 630, alt: 'MindSync — منظومة ذكاء اصطناعي للمشاريع المنزلية بالكويت' },
      { url: '/og/b-terminal-en.png', width: 1200, height: 630, alt: 'MindSync — AI System for Home Businesses in Kuwait' },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       TITLE,
    description: DESCRIPTION,
    images:      ['/og/b-terminal-ar.png'],
  },
}

export const viewport: Viewport = {
  themeColor:   '#153E2D',
  width:        'device-width',
  initialScale: 1,
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id':   `${SITE_URL}/#organization`,
      name:          'MindSync',
      alternateName: 'مايند سينك',
      legalName:     'مايند سينك لتصميم وبرمجة البرمجيات الخاصة',
      url:           SITE_URL,
      logo:          `${SITE_URL}/brand/logo-transparent.png`,
      email:         'admin@mindsynckw.com',
      telephone:     '+96599539006',
      sameAs: [
        'https://www.instagram.com/MindSyncKW',
        'https://wa.me/96599539006',
      ],
    },
    {
      '@type': 'WebSite',
      '@id':   `${SITE_URL}/#website`,
      url:        SITE_URL,
      name:       'MindSync',
      inLanguage: ['ar-KW', 'en'],
      publisher:  { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'LocalBusiness',
      '@id':   `${SITE_URL}/#localbusiness`,
      name:            'MindSync',
      alternateName:   'مايند سينك',
      description:     'Complete AI & automation system for home businesses in Kuwait — replies, books, follows up, and analyzes 24/7.',
      url:             SITE_URL,
      logo:            `${SITE_URL}/brand/logo-transparent.png`,
      image:           `${SITE_URL}/og/b-terminal-ar.png`,
      telephone:       '+96599539006',
      email:           'admin@mindsynckw.com',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  'Kuwait City',
        addressCountry:   'KW',
      },
      areaServed: [
        { '@type': 'Country', name: 'Kuwait' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      priceRange: '$$',
      knowsAbout: [
        'AI automation systems',
        'Custom AI agents',
        'WhatsApp Business API',
        'Home business automation',
        'Website design',
        'Mobile app development',
        'n8n workflows',
        'Claude AI',
      ],
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      makesOffer: {
        '@type':      'Offer',
        name:         'MindSync Complete',
        description:  'Complete AI automation system: 349 KWD one-time setup + 159 KWD/month subscription (1,000 conversations/month included).',
        priceCurrency:'KWD',
        price:        '349',
        url:          `${SITE_URL}/discovery`,
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${grotesk.variable} ${kufi.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/brand/logo-transparent.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/logo-transparent.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18124307098"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18124307098');
        `}
      </Script>
      <body className="antialiased"><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  )
}
