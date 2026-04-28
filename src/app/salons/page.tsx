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
  title: 'AI Assistant for Salons & Beauty Centers Kuwait | MindSync',
  description: 'Automate bookings, reminders, and client follow-ups for your salon with a WhatsApp AI agent. Kuwait & GCC — live in 7 days.',
  keywords: ['AI salon Kuwait', 'salon bot Kuwait', 'واتساب صالون الكويت', 'beauty salon automation Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/salons' },
  openGraph: {
    title: 'AI Assistant for Salons Kuwait | MindSync',
    description: 'Automate bookings and reminders for your salon. WhatsApp AI agent — live in 7 days.',
    url: 'https://www.mindsynckw.com/salons',
  },
}

export default function SalonsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="salon" />
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