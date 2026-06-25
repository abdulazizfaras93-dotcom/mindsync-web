import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'
import Navbar from '@/components/layout/Navbar'
import IndustryHero from '@/components/sections/IndustryHero'
import IndustryBundles from '@/components/sections/IndustryBundles'
import ReceptionistChat from '@/components/sections/ReceptionistChat'
import ROICalculator from '@/components/sections/ROICalculator'
import Process from '@/components/sections/Process'
import { CTA, Footer } from '@/components/sections/CTAFooter'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { VERTICALS, getVerticalBySlug } from '@/lib/data'

export function generateStaticParams() {
  return VERTICALS.map(v => ({ industry: v.slug }))
}

export async function generateMetadata(
  { params }: { params: { industry: string } }
): Promise<Metadata> {
  const vertical = getVerticalBySlug(params.industry)
  if (!vertical) return {}
  const title = `${vertical.en} — MindSync Kuwait`
  const description = `AI automation for ${vertical.en.toLowerCase()} in Kuwait — replies, books, follows up 24/7.`
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.mindsynckw.com/${params.industry}`,
    },
  }
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const vertical = getVerticalBySlug(params.industry)
  if (!vertical) notFound()

  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero vertical={vertical} />
        <IndustryBundles vertical={vertical} />
        <ReceptionistChat />
        <ROICalculator />
        <Process />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  )
}
