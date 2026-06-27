import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MindSync — توقيع المزوّد',
  robots: { index: false, follow: false },
}

export default function MsSetupLayout({ children }: { children: React.ReactNode }) {
  return children
}
