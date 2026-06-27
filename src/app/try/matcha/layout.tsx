import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'جرّبي وكيل ماتشا سبا — MindSync',
  description: 'جرّبي وكيل ماتشا سبا الذكي — يرد، يسعّر، ويحجز باللهجة الكويتية.',
  robots: { index: false, follow: false },
}

export default function TryMatchaLayout({ children }: { children: React.ReactNode }) {
  return children
}
