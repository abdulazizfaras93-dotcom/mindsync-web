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

export const metadata: Metadata = {
  title: 'MindSync — Your Business, Automated | أعمالك مؤتمتة',
  description: "Kuwait's only full-stack AI automation agency for SMBs. WhatsApp bots to client dashboards in 7 business days.",
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
