import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Demo from '@/components/sections/Demo'
import Bundles from '@/components/sections/Bundles'
import ReceptionistChat from '@/components/sections/ReceptionistChat'
import Process from '@/components/sections/Process'
import BuiltOn from '@/components/sections/BuiltOn'
import FAQ from '@/components/sections/FAQ'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function Home() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <Bundles />
        <ReceptionistChat />
        <Process />
        <BuiltOn />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  )
}
