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
import { INDUSTRY_SLUGS, getBundleBySlug } from '@/lib/data'

export function generateStaticParams() {
  return Object.keys(INDUSTRY_SLUGS).map(slug => ({ industry: slug }))
}

export async function generateMetadata(
  { params }: { params: { industry: string } }
): Promise<Metadata> {
  const bundle = getBundleBySlug(params.industry)
  if (!bundle) return {}
  return {
    title: `${bundle.en} — MindSync Kuwait`,
    description: bundle.painStat.en,
    openGraph: {
      title: `${bundle.en} — MindSync Kuwait`,
      description: bundle.painStat.en,
      url: `https://www.mindsynckw.com/${params.industry}`,
    },
  }
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const bundle = getBundleBySlug(params.industry)
  if (!bundle) notFound()

  return (
    <LangProvider>
      <Navbar />
      <main>
        <IndustryHero bundle={bundle} />
        <IndustryBundles bundle={bundle} />
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
