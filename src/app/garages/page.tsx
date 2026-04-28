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
  title: 'AI Assistant for Auto Garages & Workshops Kuwait | MindSync',
  description: 'Automate service inquiries, job status updates, and appointment booking for your garage. WhatsApp AI agent Kuwait — live in 7 days.',
  keywords: ['AI garage Kuwait', 'workshop bot Kuwait', 'واتساب ورشة الكويت', 'auto repair automation Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/garages' },
  openGraph: {
    title: 'AI Assistant for Garages Kuwait | MindSync',
    description: 'Automate service bookings and status updates for your garage. WhatsApp AI — live in 7 days.',
    url: 'https://www.mindsynckw.com/garages',
  },
}

export default function GaragesPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="garage" />
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