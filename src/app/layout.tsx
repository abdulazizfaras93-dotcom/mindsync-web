import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Noto_Kufi_Arabic, JetBrains_Mono } from 'next/font/google'
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

const SITE_URL = 'https://www.mindsynckw.com'
const TITLE = 'MindSync — Your Business, Automated | أعمالك مؤتمتة'
const DESCRIPTION = "Kuwait's only full-stack AI automation agency for SMBs. WhatsApp bots to client dashboards in 7 business days."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'AI automation Kuwait', 'ذكاء اصطناعي الكويت', 'WhatsApp bot Kuwait',
    'AI agency Kuwait', 'business automation Kuwait', 'MindSync',
    'chatbot clinic Kuwait', 'AI salon Kuwait', 'automation SMB Gulf',
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'MindSync',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'ar_KW',
    alternateLocale: ['en_US'],
    images: [
      { url: '/og/b-terminal-ar.png', width: 1200, height: 630, alt: 'MindSync — أعمالك، مؤتمتة' },
      { url: '/og/b-terminal-en.png', width: 1200, height: 630, alt: 'MindSync — Your Business, Automated' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/b-terminal-ar.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#153E2D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Default to Arabic for Kuwait ICP. The LangProvider syncs the actual
  // user choice to document.documentElement on mount (localStorage).
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
