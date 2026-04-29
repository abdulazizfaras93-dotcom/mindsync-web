import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Home Business AI Automation Kuwait — MindSync',
  description: 'AI WhatsApp automation for home-based businesses in Kuwait. Handle inquiries, orders, and customer follow-ups automatically. 7-day setup.',
  alternates: { canonical: 'https://www.mindsynckw.com/home-businesses' },
}

export default function HomeBusinessPage() {
  redirect('/#bundles')
}
