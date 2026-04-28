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
  title: 'AI Assistant for Gyms & Fitness Centers Kuwait | MindSync',
  description: 'Automate membership inquiries, class bookings, and payment reminders for your gym. WhatsApp AI agent Kuwait — live in 7 days.',
  keywords: ['AI gym Kuwait', 'gym bot Kuwait', 'واتساب جيم الكويت', 'fitness center automation Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/gyms' },
  openGraph: {
    title: 'AI Assistant for Gyms Kuwait | MindSync',
    description: 'Automate memberships and bookings for your gym. WhatsApp AI agent — live in 7 days.',
    url: 'https://www.mindsynckw.com/gyms',
  },
}

export default function GymsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="gym" />
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