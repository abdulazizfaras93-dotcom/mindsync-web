import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Noto_Kufi_Arabic, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
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
const TITLE      = 'MindSync — Your Business, Automated | أعمالك مؤتمتة'
const DESCRIPTION =
  "Kuwait's first AI automation agency for SMBs â custom AI systems, websites & apps. From first message to live system in 7 business days."
const DESCRIPTION_AR =
  'أول شركة برمجيات وأتمتة ذكاء اصطناعي في الكويت للشركات الصغيرة والمتوسطة — أنظمة ذكية مخصصة، مواقع، وتطبيقات.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI automation Kuwait',
    'ذكاء اصطناعي الكويت',
    'نظام مؤتمت الكويت',
    'AI agency Kuwait',
    'business automation Kuwait',
    'MindSync',
    'AI system clinic Kuwait',
    'AI salon Kuwait',
    'automation SMB Gulf',
    'website design Kuwait',
    'mobile app Kuwait',
    'واتساب بوت الكويت',
    'أتمتة مشاريع الكويت',
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
      { url: '/og/b-terminal-ar.png', width: 1200, height: 630, alt: 'MindSync — أعمالك، مؤتمتة' },
      { url: '/og/b-terminal-en.png', width: 1200, height: 630, alt: 'MindSync — Your Business, Automated' },
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
  '@type':    'LocalBusiness',
  name:            'MindSync',
  alternateName:   'مايند سينك',
  description:     "Kuwait's first AI automation agency for SMBs â custom AI systems, websites & apps. Your business, automated.",
  url:             'https://www.mindsynckw.com',
  logo:            'https://www.mindsynckw.com/brand/logo-transparent.png',
  image:           'https://www.mindsynckw.com/og/b-terminal-ar.png',
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
    'Business automation',
    'Website design',
    'Mobile app development',
    'n8n workflows',
    'Claude AI',
  ],
  sameAs: [
    'https://www.instagram.com/MindSyncKW',
    'https://wa.me/96599539006',
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
      <body className="antialiased">{children}</body>
    </html>
  )
}
