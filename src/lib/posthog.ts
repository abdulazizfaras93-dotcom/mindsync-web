import posthog from 'posthog-js'

const KEY  = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'
const CONSENT_KEY = 'ms:analytics-consent' // 'granted' | 'denied'

let initialized = false

/** Analytics is active only when a PostHog key is configured (browser only). */
export function analyticsEnabled(): boolean {
  return typeof window !== 'undefined' && !!KEY
}

export function getConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CONSENT_KEY) as 'granted' | 'denied' | null
}

export function setConsent(value: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CONSENT_KEY, value)
  if (!analyticsEnabled()) return
  if (value === 'granted') posthog.opt_in_capturing()
  else posthog.opt_out_capturing()
}

export function initPostHog(): void {
  if (initialized || !analyticsEnabled()) return
  initialized = true
  posthog.init(KEY as string, {
    api_host: HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false,
    persistence: 'localStorage+cookie',
    opt_out_capturing_by_default: true, // wait for explicit consent
    loaded: (ph) => {
      if (getConsent() === 'granted') ph.opt_in_capturing()
    },
  })
}

/** Safe capture — no-ops unless a key is set AND consent was granted. */
export function capture(event: string, props?: Record<string, unknown>): void {
  if (!analyticsEnabled() || getConsent() !== 'granted') return
  posthog.capture(event, props)
}
