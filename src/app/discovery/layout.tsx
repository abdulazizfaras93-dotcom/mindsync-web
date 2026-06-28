import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'نموذج الاستكشاف — MindSync',
  description: 'عبّي نموذج استكشاف مشروعك ونجهّز لك وكيلك الذكي.',
}

export default function DiscoveryLayout({ children }: { children: React.ReactNode }) {
  return children
}
