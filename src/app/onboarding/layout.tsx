import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Onboarding — MindSync',
  description: 'MindSync client system build brief.',
  robots: { index: false, follow: false },
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children
}
