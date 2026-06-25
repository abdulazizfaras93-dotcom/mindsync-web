import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MindSync — Classic landing (v1)',
  robots: { index: false, follow: false },
}

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return children
}
