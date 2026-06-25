import type { BusinessCategory, PainKey, FaqKey } from '@/types/conversation'
import { capture } from '@/lib/posthog'

// Funnel analytics → PostHog. Safe no-op until NEXT_PUBLIC_POSTHOG_KEY is set
// AND the visitor has granted consent (see ConsentBanner).

export function trackCategorySelected(category: BusinessCategory): void {
  capture('conv_category_selected', { category })
}

export function trackPainSelected(pain: PainKey): void {
  capture('conv_pain_selected', { pain })
}

export function trackStageReached(stage: number): void {
  capture('conv_stage_reached', { stage })
}

export function trackFaqOpened(faq: FaqKey): void {
  capture('conv_faq_opened', { faq })
}

export function trackCtaClicked(location: 'stage4' | 'stage5' | 'skipbar'): void {
  capture('conv_cta_clicked', { location })
}

export function trackLiveDemoMessage(messageIndex: number): void {
  capture('conv_live_demo_message', { messageIndex })
}
