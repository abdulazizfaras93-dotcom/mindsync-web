/**
 * Canonical source of truth for per-industry demo conversations.
 * Currently re-exports from data.ts; migrate the raw data here when
 * the demo grows beyond the homepage (e.g., per-vertical /clinics page).
 */

import { DEMO_CONVERSATIONS } from './data'

export type DemoTurn = {
  en: string[]
  ar: string[]
}

export type DemoScript = DemoTurn[]

export type IndustryId =
  | 'clinic'
  | 'salon'
  | 'gym'
  | 'garage'
  | 'restaurant'
  | 'real-estate'

export const SCRIPTS: Record<IndustryId, DemoScript> = DEMO_CONVERSATIONS as Record<IndustryId, DemoScript>

export function getScript(industry: IndustryId): DemoScript {
  return SCRIPTS[industry] ?? []
}

/**
 * Convention: in each DemoTurn, index 0 is the user message in the current
 * language, index 1 is the mirror in the other language. The chat view
 * renders index 0 only; index 1 is available for screenshots / fallback.
 */
