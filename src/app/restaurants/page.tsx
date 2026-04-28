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
  title: 'AI Assistant for Restaurants & Cafes Kuwait | MindSync',
  description: 'Automate reservations, menu inquiries, and order follow-ups for your restaurant. WhatsApp AI agent Kuwait — live in 7 days.',
  keywords: ['AI restaurant Kuwait', 'restaurant bot Kuwait', 'واتساب مطعم الكويت', 'restaurant automation Kuwait'],
  alternates: { canonical: 'https://www.mindsynckw.com/restaurants' },
  openGraph: {
    title: 'AI Assistant for Restaurants Kuwait | MindSync',
    description: 'Automate reservations and menu questions for your restaurant. WhatsApp AI — live in 7 days.',
    url: 'https://www.mindsynckw.com/restaurants',
  },
}

export default function RestaurantsPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="restaurant" />
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