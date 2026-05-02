import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import WhyNotBot from '@/components/sections/WhyNotBot'
import Bundles from '@/components/sections/Bundles'
import ROICalculator from '@/components/sections/ROICalculator'
import ReceptionistChat from '@/components/sections/ReceptionistChat'
import Process from '@/components/sections/Process'
import BuiltOn from '@/components/sections/BuiltOn'
import TrustCluster from '@/components/sections/TrustCluster'
import FAQ from '@/components/sections/FAQ'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ExitIntent from '@/components/ui/ExitIntent'

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyNotBot />
        <Bundles />
        <ROICalculator />
        <ReceptionistChat />
        <Process />
        <BuiltOn />
        <TrustCluster />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ExitIntent />
    </LangProvider>
  )
}
