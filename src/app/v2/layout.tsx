import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MindSync — Cinematic Preview',
  description: 'Staging preview of the new MindSync landing.',
  robots: { index: false, follow: false },
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return children
}
