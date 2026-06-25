import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import Services from '@/components/sections/Services'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Services — MindSync | ما نبنيه',
  description:
    'Complete AI automation system for home businesses in Kuwait — AI agent, client dashboard, workflow automations, website & app builds, monthly maintenance. Three AI tiers from 79 KWD/mo (Receptionist, Coordinator, Manager).',
  alternates: { canonical: 'https://www.mindsynckw.com/services' },
  openGraph: {
    url:   'https://www.mindsynckw.com/services',
    title: 'Services — MindSync | ما نبنيه',
    description:
      'Complete AI automation system for home businesses in Kuwait. Three AI tiers from 79 KWD/mo (Receptionist, Coordinator, Manager).',
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
