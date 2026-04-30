import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import IndustryHero from '@/components/sections/IndustryHero'
import Bundles from '@/components/sections/Bundles'
import Process from '@/components/sections/Process'
import ROICalculator from '@/components/sections/ROICalculator'
import FAQ from '@/components/sections/FAQ'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ExitIntent from '@/components/ui/ExitIntent'

export const metadata: Metadata = {
  title: 'Spa AI Automation Kuwait — MindSync | السبا الذكي',
  description: 'AI WhatsApp booking agent for men and women spas in Kuwait. Handle bookings, reminders, and client follow-ups automatically. 7-day setup.',
  keywords: ['spa automation Kuwait', 'spa booking bot', 'WhatsApp spa bot', 'AI spa Kuwait', 'السبا الذكي', 'أتمتة السبا الكويت'],
  alternates: { canonical: 'https://www.mindsynckw.com/spa' },
  openGraph: {
    title: 'Spa AI Automation Kuwait | MindSync',
    description: 'AI WhatsApp booking agent for men and women spas in Kuwait. 7-day setup.',
    url: 'https://www.mindsynckw.com/spa',
  },
}

export default function SpaPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="spa" />
        <Bundles />
        <ROICalculator />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ExitIntent />
    </LangProvider>
  )
}