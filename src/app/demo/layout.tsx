import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MindSync — Live Demo',
  description: 'A live demo of your AI agent by MindSync.',
  robots: { index: false, follow: false },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
