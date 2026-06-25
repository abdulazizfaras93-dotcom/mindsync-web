'use client'
import { useEffect } from 'react'
import { initPostHog } from '@/lib/posthog'

/** Initializes PostHog on mount. No-ops unless NEXT_PUBLIC_POSTHOG_KEY is set. */
export default function PostHogProvider() {
  useEffect(() => {
    initPostHog()
  }, [])
  return null
}
