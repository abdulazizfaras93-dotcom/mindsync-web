import { LangProvider } from '@/lib/lang'
import CinematicLanding from '@/components/cinematic/CinematicLanding'

export default function V2Page() {
  return (
    <LangProvider>
      <CinematicLanding />
    </LangProvider>
  )
}
