import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'عقد ماتشا سبا — MindSync',
  description: 'عقد تقديم خدمة وكيل ذكي — التوقيع الإلكتروني.',
  robots: { index: false, follow: false },
}

export default function SignMatchaLayout({ children }: { children: React.ReactNode }) {
  return children
}
