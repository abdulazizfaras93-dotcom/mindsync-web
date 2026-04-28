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
  title: 'AI Receptionist for Clinics & Dental Practices Kuwait | MindSync',
  description: 'Automate 67% of patient inquiries with a WhatsApp AI agent for your clinic. Appointment booking, reminders, and patient FAQ — live in 7 days. Kuwait.',
  keywords: ['AI clinic Kuwait', 'dental clinic bot Kuwait', 'واتساب عيادة الكويت', 'AI receptionist clinic', 'chatbot clinic Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/clinics' },
  openGraph: {
    title: 'AI Receptionist for Clinics Kuwait | MindSync',
    description: 'Automate 67% of patient inquiries. WhatsApp AI agent for clinics in Kuwait — live in 7 days.',
    url: 'https://www.mindsynckw.com/clinics',
  },
}

export default function ClinicsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="clinic" />
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