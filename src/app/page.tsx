import { LangProvider } from '@/lib/lang'
import ConversationalLanding from '@/components/chat/ConversationalLanding'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata = {
  title: 'MindSync — أعمالك، مؤتمتة | Your Business, Automated',
  description: 'Kuwait\'s only full-stack AI automation agency for home businesses. WhatsApp bot to client dashboard in 7 business days.',
}

export default function Home() {
  return (
    <LangProvider>
      <ConversationalLanding />
      <WhatsAppButton />
    </LangProvider>
  )
}
