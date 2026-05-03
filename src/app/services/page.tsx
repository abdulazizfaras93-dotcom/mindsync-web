import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import Services from '@/components/sections/Services'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Services — MindSync | ما نبنيه',
  description:
    'WhatsApp AI Receptionist, Client Dashboard, Workflow Automations, Website & App Builds, and Monthly Maintenance — all built and run by MindSync.',
  alternates: { canonical: 'https://www.mindsynckw.com/services' },
  openGraph: {
    url:   'https://www.mindsynckw.com/services',
    title: 'Services — MindSync',
    description:
      'Four systems. One retainer. WhatsApp AI, dashboard, automations, web/app builds.',
    images: [{ url: '/og/b-terminal-en.png', width: 1200, height: 630 }],
  },
}

export default function ServicesPage() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pt-16">
        <Services />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  )
}
