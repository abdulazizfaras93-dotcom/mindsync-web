import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'نموذج الاستكشاف — MindSync',
  description: 'عبّي نموذج استكشاف مشروعك ونجهّز لك وكيلك الذكي.',
  robots: { index: false, follow: false },
}

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return children
}
