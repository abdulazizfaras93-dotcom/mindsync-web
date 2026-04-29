import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Spa AI Automation Kuwait — MindSync',
  description: 'AI WhatsApp booking agent for men and women spas in Kuwait. Handle bookings, reminders, and client follow-ups automatically. 7-day setup.',
  alternates: { canonical: 'https://www.mindsynckw.com/spa' },
}

export default function SpaPage() {
  redirect('/#bundles')
}
