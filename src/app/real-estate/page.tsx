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
  title: 'AI Assistant for Real Estate Brokers Kuwait | MindSync',
  description: 'Automate property inquiries, lead qualification, and viewing bookings for your real estate office. WhatsApp AI agent Kuwait — live in 7 days.',
  keywords: ['AI real estate Kuwait', 'property bot Kuwait', 'واتساب عقارات الكويت', 'real estate automation Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/real-estate' },
  openGraph: {
    title: 'AI Assistant for Real Estate Kuwait | MindSync',
    description: 'Automate property inquiries and lead qualification. WhatsApp AI — live in 7 days.',
    url: 'https://www.mindsynckw.com/real-estate',
  },
}

export default function RealEstatePage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="real-estate" />
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