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
  title: 'Home Business AI Automation Kuwait — MindSync | المشاريع المنزلية',
  description: 'AI WhatsApp automation for home-based businesses in Kuwait. Handle inquiries, orders, and customer follow-ups automatically. 7-day setup.',
  keywords: ['home business automation Kuwait', 'home business bot', 'WhatsApp bot Kuwait', 'AI home business', 'المشاريع المنزلية الذكية', 'أتمتة المشاريع المنزلية'],
  alternates: { canonical: 'https://www.mindsynckw.com/home-businesses' },
  openGraph: {
    title: 'Home Business AI Automation Kuwait | MindSync',
    description: 'AI WhatsApp automation for home-based businesses in Kuwait. 7-day setup.',
    url: 'https://www.mindsynckw.com/home-businesses',
  },
}

export default function HomeBusinessesPage() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero industryId="home-business" />
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