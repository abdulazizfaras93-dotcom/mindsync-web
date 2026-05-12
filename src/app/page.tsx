import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import Services from '@/components/sections/Services'
import IndustryResults from '@/components/sections/IndustryResults'
import Bundles from '@/components/sections/Bundles'
import PricingCards from '@/components/sections/PricingCards'
import WhatsAppMockup from '@/components/sections/WhatsAppMockup'
import ReceptionistChat from '@/components/sections/ReceptionistChat'
import Process from '@/components/sections/Process'
import FreeTrialSpotlight from '@/components/sections/FreeTrialSpotlight'
import BuiltOn from '@/components/sections/BuiltOn'
import Testimonials from '@/components/sections/Testimonials'
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
        <StatsBar />
        <Services />
        <IndustryResults />
        <Bundles />
        <PricingCards />
<WhatsAppMockup />
        <ReceptionistChat />
        <Process />
        <FreeTrialSpotlight />
        <BuiltOn />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <ExitIntent />
    </LangProvider>
  )
}
