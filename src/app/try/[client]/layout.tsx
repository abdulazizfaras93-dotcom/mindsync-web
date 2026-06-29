import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'جرّب الوكيل الذكي — MindSync',
  description: 'جرّب وكيلاً ذكياً يرد، يسعّر، ويحجز باللهجة الكويتية — مدعوم من MindSync.',
  robots: { index: false, follow: false },
}

export default function TryClientLayout({ children }: { children: React.ReactNode }) {
  return children
}
