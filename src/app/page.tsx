import { LangProvider } from '@/lib/lang'
import CinematicLanding from '@/components/cinematic/CinematicLanding'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ExitIntent from '@/components/ui/ExitIntent'

export const metadata = {
  title: 'MindSync — أعمالك، مؤتمتة | Your Business, Automated',
  description: "A complete smart business-management system for businesses in Kuwait — replies, books, follows up, and analyzes 24/7. Three tiers from 79 KWD/mo. 30-day paid pilot, credited to setup.",
}

export default function Home() {
  return (
    <LangProvider>
      <CinematicLanding />
      <WhatsAppButton />
      <ExitIntent />
    </LangProvider>
  )
}
