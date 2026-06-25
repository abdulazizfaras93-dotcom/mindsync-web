import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import HomeHero from '@/components/sections/HomeHero'
import ConversationalLanding from '@/components/chat/ConversationalLanding'
import Services from '@/components/sections/Services'
import IndustryResults from '@/components/sections/IndustryResults'
import Bundles from '@/components/sections/Bundles'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ExitIntent from '@/components/ui/ExitIntent'

// Previous homepage (conversational/classic-hybrid) — preserved as a backup.
export default function V1Home() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <HomeHero />
        <section id="try" aria-label="Live demo">
          <ConversationalLanding embedded />
        </section>
        <Services />
        <IndustryResults />
        <Bundles />
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
