import type { BusinessCategory, PainKey, FaqKey } from '@/types/conversation'

// Analytics stubs — wire to real provider later (PostHog, Mixpanel, etc.)

export function trackCategorySelected(_category: BusinessCategory): void {
  // TODO: posthog.capture('conv_category_selected', { category })
}

export function trackPainSelected(_pain: PainKey): void {
  // TODO: posthog.capture('conv_pain_selected', { pain })
}

export function trackStageReached(_stage: number): void {
  // TODO: posthog.capture('conv_stage_reached', { stage })
}

export function trackFaqOpened(_faq: FaqKey): void {
  // TODO: posthog.capture('conv_faq_opened', { faq })
}

export function trackCtaClicked(_location: 'stage4' | 'stage5' | 'skipbar'): void {
  // TODO: posthog.capture('conv_cta_clicked', { location })
}

export function trackLiveDemoMessage(_messageIndex: number): void {
  // TODO: posthog.capture('conv_live_demo_message', { messageIndex })
}
