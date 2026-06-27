import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'عقد — MindSync',
  description: 'عقد تقديم خدمة وكيل ذكي — التوقيع الإلكتروني.',
  robots: { index: false, follow: false },
}

export default function SignClientLayout({ children }: { children: React.ReactNode }) {
  return children
}
