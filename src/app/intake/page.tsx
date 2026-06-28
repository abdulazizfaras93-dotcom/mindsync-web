import { redirect } from 'next/navigation'

// The intake form is now the single discovery form at /discovery.
// Keep /intake working for any old links by redirecting.
export default function IntakeRedirect() {
  redirect('/discovery')
}
