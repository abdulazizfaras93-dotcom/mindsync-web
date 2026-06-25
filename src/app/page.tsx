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

export const metadata = {
  title: 'MindSync — أعمالك، مؤتمتة | Your Business, Automated',
  description: "A complete smart business-management system for businesses in Kuwait — replies, books, follows up, and analyzes 24/7. Three tiers from 79 KWD/mo. 30-day paid pilot, credited to setup.",
}

export default function Home() {
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
