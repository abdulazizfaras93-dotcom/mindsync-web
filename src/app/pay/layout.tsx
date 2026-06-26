import type { Metadata } from 'next'
import { LangProvider } from '@/lib/lang'

export const metadata: Metadata = {
  title: 'Payment — MindSync',
  robots: { index: false, follow: false },
}

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>
}
