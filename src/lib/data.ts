// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// MindSync â data.ts â Single source of truth
// After ANY pricing change: run `node C:\tmp\update-agent-prompts.js` then push
// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const WHATSAPP_URL = 'https://wa.me/96599539006'
export const DISCOVERY_URL = '/discovery'

// âââ Types ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export type TierId = 'smart' | 'pro' | 'full-auto'

export type Channel =
  | 'whatsapp'
  | 'website'
  | 'instagram'
  | 'app'
  | 'portal'
  | 'analytics'

export type BundleTier = {
  id: TierId
  en: string
  ar: string
  retainer: number
  badge?: { en: string; ar: string }
  features: { en: string[]; ar: string[] }
  channels: Channel[]
}

export type BundleScenario = {
  painHeadline: { en: string; ar: string }
  painSolution: { en: string; ar: string }
  tasksEliminated: {
    smart:       { en: string[]; ar: string[] }
    pro:         { en: string[]; ar: string[] }
    'full-auto': { en: string[]; ar: string[] }
  }
  tierCtas: {
    smart:       { en: string; ar: string }
    pro:         { en: string; ar: string }
    'full-auto': { en: string; ar: string }
  }
}

export type Bundle = {
  id: string
  en: string
  ar: string
  industry: { en: string; ar: string }
  buildFee: number
  painStat: { en: string; ar: string }
  icon: string
  color: string
  tiers: BundleTier[]
  scenario: BundleScenario
}

export type WebsiteService = {
  id: string
  en: string
  ar: string
  price: number | [number, number]
  deliveryDays: [number, number]
  monthlyMaintenance: number
  features: { en: string[]; ar: string[] }
}

export type AppService = {
  id: string
  en: string
  ar: string
  price: [number, number]
  deliveryDays: [number, number]
  monthlyMaintenance: number
  features: { en: string[]; ar: string[] }
}

// âââ Tier Order âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const TIER_ORDER: TierId[] = ['smart', 'pro', 'full-auto']

// âââ Shared tier descriptions (used across all bundles) âââââââââââââââââââââââ

export const TIER_LABELS: Record<TierId, { en: string; ar: string; description: { en: string; ar: string } }> = {
  smart: {
    en: 'Smart',
    ar: 'Ø§ÙØ°ÙÙ',
    description: {
      en: 'One AI agent, one or two channels, focused tasks',
      ar: 'ÙÙÙÙ Ø°ÙÙ ÙØ§Ø­Ø¯Ø ÙÙØ§Ø© Ø£Ù ÙÙØ§ØªÙÙØ ÙÙØ§Ù ÙØ­Ø¯Ø¯Ø©',
    },
  },
  pro: {
    en: 'Pro',
    ar: 'Ø§ÙÙØªÙØ¯Ù',
    description: {
      en: 'One or more agents, multiple channels, wider automation',
      ar: 'ÙÙÙÙ Ø£Ù Ø£ÙØ«Ø±Ø ÙÙÙØ§Øª ÙØªØ¹Ø¯Ø¯Ø©Ø Ø£ØªÙØªØ© Ø£ÙØ³Ø¹',
    },
  },
  'full-auto': {
    en: 'Full Auto',
    ar: 'Ø§ÙÙØ¤ØªÙØª',
    description: {
      en: 'Multiple specialized agents, all channels, full operation automation',
      ar: 'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ ÙØªØ®ØµØµÙÙØ ÙÙ Ø§ÙÙÙÙØ§ØªØ Ø£ØªÙØªØ© ÙØ§ÙÙØ© ÙÙØ¹ÙÙÙØ§Øª',
    },
  },
}

// âââ Bundles ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const BUNDLES: Bundle[] = [

  // ââ CLINIC ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'clinic',
    en: 'Clinic AI',
    ar: 'Ø§ÙØ¹ÙØ§Ø¯Ø© Ø§ÙØ°ÙÙØ©',
    industry: { en: 'Health & Dental Clinics', ar: 'Ø§ÙØ¹ÙØ§Ø¯Ø§Øª Ø§ÙØµØ­ÙØ© ÙØ§ÙØ£Ø³ÙØ§Ù' },
    buildFee: 400,
    painStat: {
      en: 'Clinics lose 30â40% of patients to missed calls and slow follow-ups.',
      ar: 'Ø§ÙØ¹ÙØ§Ø¯Ø§Øª ØªØ®Ø³Ø± Ù£Ù âÙ¤Ù Ùª ÙÙ Ø§ÙÙØ±Ø¶Ù Ø¨Ø³Ø¨Ø¨ Ø§ÙÙÙØ§ÙÙØ§Øª Ø§ÙÙØ§Ø¦ØªØ© ÙØ§ÙÙØªØ§Ø¨Ø¹Ø© Ø§ÙØ¨Ø·ÙØ¦Ø©.',
    },
    icon: 'clinic',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 220,
        features: {
          en: [
            'Custom AI Agent trained on your clinic',
            'Appointment booking & automated reminders',
            'Patient FAQ (pricing, prep, location, hours)',
            '24/7 availability on WhatsApp + Website',
            'Client Portal Dashboard',
            'Full monthly maintenance (hosting, API, support)',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØ¹ÙØ§Ø¯ØªÙ',
            'Ø­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯ ÙØ¥Ø±Ø³Ø§Ù Ø§ÙØªØ°ÙÙØ±Ø§Øª ØªÙÙØ§Ø¦ÙØ§Ù',
            'Ø¥Ø¬Ø§Ø¨Ø© Ø£Ø³Ø¦ÙØ© Ø§ÙÙØ±Ø¶Ù (Ø§ÙØ£Ø³Ø¹Ø§Ø±Ø Ø§ÙØªØ­Ø¶ÙØ±Ø Ø§ÙÙÙÙØ¹Ø Ø§ÙØ£ÙÙØ§Øª)',
            'ÙØªØ§Ø­ Ù¢Ù¤/Ù§ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙØ§ÙÙÙÙØ¹',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ© (hostingØ APIØ Ø¯Ø¹Ù)',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 340,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Post-visit patient follow-up automation',
            'Google Review requests after each visit',
            'No-show & cancellation re-booking flow',
            'Appointment analytics dashboard',
            'Multi-channel: WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙÙØ±Ø¶Ù ØªÙÙØ§Ø¦ÙØ§Ù Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©',
            'Ø·ÙØ¨ ØªÙÙÙÙØ§Øª Google Ø¨Ø¹Ø¯ ÙÙ Ø²ÙØ§Ø±Ø©',
            'Ø¥Ø¹Ø§Ø¯Ø© Ø­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯ Ø§ÙÙÙØºØ§Ø© ØªÙÙØ§Ø¦ÙØ§Ù',
            'ÙÙØ­Ø© ØªØ­ÙÙÙØ§Øª Ø§ÙÙÙØ§Ø¹ÙØ¯',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 460,
        features: {
          en: [
            'Everything in Pro',
            'Multiple specialized AI agents (reception, follow-up, analytics)',
            'Win-back campaigns for inactive patients',
            'Seasonal health awareness broadcasts',
            'Full operations automation across all channels',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ ÙØªØ®ØµØµÙÙ (Ø§Ø³ØªÙØ¨Ø§ÙØ ÙØªØ§Ø¨Ø¹Ø©Ø ØªØ­ÙÙÙ)',
            'Ø­ÙÙØ§Øª Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙÙØ±Ø¶Ù Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'Ø¥Ø°Ø§Ø¹Ø§Øª ØªÙØ¹ÙØ© ØµØ­ÙØ© ÙÙØ³ÙÙØ©',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A clinic answering 40 patient messages a day manually\nis spending 3+ hours on repetitive replies.',
        ar: 'Ø¹ÙØ§Ø¯Ø© ØªØ±Ø¯ Ø¹ÙÙ Ù¤Ù  Ø±Ø³Ø§ÙØ© ÙÙÙÙØ§Ù ÙØ¯ÙÙØ§Ù\nØªØ¶ÙÙØ¹ Ø£ÙØ«Ø± ÙÙ Ù£ Ø³Ø§Ø¹Ø§Øª ÙÙ Ø±Ø¯ÙØ¯ ÙØªÙØ±Ø±Ø©.',
      },
      painSolution: {
        en: 'A custom AI agent handles every inquiry, books appointments, and follows up â your staff focuses on patients, not phones.',
        ar: 'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØªÙÙÙ ÙÙ Ø§Ø³ØªÙØ³Ø§Ø±Ø ÙØ­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯Ø ÙÙØªØ§Ø¨Ø¹ â ÙØ±ÙÙÙ ÙØ±ÙØ² Ø¹ÙÙ Ø§ÙÙØ±Ø¶Ù ÙÙ Ø¹ÙÙ Ø§ÙØªÙÙÙÙÙ.',
      },
      tasksEliminated: {
        smart: {
          en: ['Answering repetitive patient questions', 'Manual appointment booking', 'Sending reminders by hand'],
          ar: ['Ø§ÙØ±Ø¯ Ø¹ÙÙ Ø£Ø³Ø¦ÙØ© Ø§ÙÙØ±Ø¶Ù Ø§ÙÙØªÙØ±Ø±Ø©', 'Ø­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯ ÙØ¯ÙÙØ§Ù', 'Ø¥Ø±Ø³Ø§Ù Ø§ÙØªØ°ÙÙØ±Ø§Øª ÙØ¯ÙÙØ§Ù'],
        },
        pro: {
          en: ['Post-visit follow-up calls', 'Chasing Google Reviews manually', 'Re-booking cancelled appointments'],
          ar: ['ÙÙØ§ÙÙØ§Øª Ø§ÙÙØªØ§Ø¨Ø¹Ø© Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©', 'Ø·ÙØ¨ Ø§ÙØªÙÙÙÙØ§Øª ÙØ¯ÙÙØ§Ù', 'Ø¥Ø¹Ø§Ø¯Ø© Ø­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯ Ø§ÙÙÙØºØ§Ø©'],
        },
        'full-auto': {
          en: ['All manual patient communication', 'Campaign planning and sending', 'Monthly reporting'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ Ø§ÙÙØ¯ÙÙ ÙØ¹ Ø§ÙÙØ±Ø¶Ù', 'ØªØ®Ø·ÙØ· ÙØ¥Ø±Ø³Ø§Ù Ø§ÙØ­ÙÙØ§Øª', 'Ø§ÙØªÙØ§Ø±ÙØ± Ø§ÙØ´ÙØ±ÙØ©'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ SALON âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'salon',
    en: 'Salon AI',
    ar: 'Ø§ÙØµØ§ÙÙÙ Ø§ÙØ°ÙÙ',
    industry: { en: "Men's & Women's Salons", ar: 'ØµØ§ÙÙÙØ§Øª Ø§ÙØ±Ø¬Ø§Ù ÙØ§ÙØ³ÙØ¯Ø§Øª' },
    buildFee: 300,
    painStat: {
      en: 'Salons lose 25% of bookings to unanswered WhatsApp messages.',
      ar: 'Ø§ÙØµØ§ÙÙÙØ§Øª ØªØ®Ø³Ø± Ù¢Ù¥Ùª ÙÙ Ø­Ø¬ÙØ²Ø§ØªÙØ§ Ø¨Ø³Ø¨Ø¨ Ø±Ø³Ø§Ø¦Ù ÙØ§ØªØ³Ø§Ø¨ Ø¨Ø¯ÙÙ Ø±Ø¯.',
    },
    icon: 'salon',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 160,
        features: {
          en: [
            'Custom AI Agent trained on your salon',
            'Booking by stylist, service & time slot',
            'Service menu & pricing automation',
            '24/7 on WhatsApp + Website',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØµØ§ÙÙÙÙ',
            'Ø­Ø¬Ø² Ø­Ø³Ø¨ Ø§ÙÙØµÙÙ ÙØ§ÙØ®Ø¯ÙØ© ÙØ§ÙÙÙØª',
            'Ø£ØªÙØªØ© ÙØ§Ø¦ÙØ© Ø§ÙØ®Ø¯ÙØ§Øª ÙØ§ÙØ£Ø³Ø¹Ø§Ø±',
            'ÙØªØ§Ø­ Ù¢Ù¤/Ù§ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙØ§ÙÙÙÙØ¹',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Repeat-client recognition & loyalty tracking',
            'Upsell at booking confirmation',
            'Google Review requests post-visit',
            'No-show follow-up automation',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'Ø§ÙØªØ¹Ø±Ù Ø¹ÙÙ Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙØªÙØ±Ø±ÙÙ ÙØªØªØ¨Ø¹ Ø§ÙÙÙØ§Ø¡',
            'Ø¹Ø±ÙØ¶ Ø¥Ø¶Ø§ÙÙØ© Ø¹ÙØ¯ ØªØ£ÙÙØ¯ Ø§ÙØ­Ø¬Ø²',
            'Ø·ÙØ¨ ØªÙÙÙÙØ§Øª Google Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©',
            'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙØºØ§Ø¦Ø¨ÙÙ ØªÙÙØ§Ø¦ÙØ§Ù',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 330,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (booking, follow-up, loyalty)',
            'Seasonal promo broadcasts (Eid, National Day)',
            'Win-back campaigns for inactive clients',
            'Full channel automation',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (Ø­Ø¬Ø²Ø ÙØªØ§Ø¨Ø¹Ø©Ø ÙÙØ§Ø¡)',
            'Ø­ÙÙØ§Øª ÙÙØ³ÙÙØ© (Ø¹ÙØ¯Ø Ø§ÙÙÙÙ Ø§ÙÙØ·ÙÙ)',
            'Ø­ÙÙØ§Øª Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A busy salon gets 60+ WhatsApp messages daily â\nmost go unanswered for hours.',
        ar: 'ØµØ§ÙÙÙ ÙØ´ØºÙÙ ÙØ³ØªÙØ¨Ù Ù¦Ù + Ø±Ø³Ø§ÙØ© ÙØ§ØªØ³Ø§Ø¨ ÙÙÙÙØ§Ù â\nØ£ØºÙØ¨ÙØ§ ØªØ¨ÙÙ Ø¨Ø¯ÙÙ Ø±Ø¯ ÙØ³Ø§Ø¹Ø§Øª.',
      },
      painSolution: {
        en: 'Your AI agent books appointments, confirms times, and follows up â instantly, at any hour.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØ­Ø¬Ø² Ø§ÙÙÙØ§Ø¹ÙØ¯Ø ÙØ¤ÙØ¯ Ø§ÙØ£ÙÙØ§ØªØ ÙÙØªØ§Ø¨Ø¹ â ÙÙØ±Ø§ÙØ ÙÙ Ø£Ù ÙÙØª.',
      },
      tasksEliminated: {
        smart: {
          en: ['Manual booking messages', 'Pricing inquiries', 'Sending reminders'],
          ar: ['Ø±Ø³Ø§Ø¦Ù Ø§ÙØ­Ø¬Ø² Ø§ÙÙØ¯ÙÙØ©', 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§ÙØ£Ø³Ø¹Ø§Ø±', 'Ø¥Ø±Ø³Ø§Ù Ø§ÙØªØ°ÙÙØ±Ø§Øª'],
        },
        pro: {
          en: ['Loyalty tracking spreadsheets', 'Manual review requests', 'No-show follow-ups'],
          ar: ['Ø¬Ø¯Ø§ÙÙ ØªØªØ¨Ø¹ Ø§ÙÙÙØ§Ø¡', 'Ø·ÙØ¨ Ø§ÙØªÙÙÙÙØ§Øª ÙØ¯ÙÙØ§Ù', 'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙØºØ§Ø¦Ø¨ÙÙ'],
        },
        'full-auto': {
          en: ['All client communication', 'Campaign planning', 'Monthly reporting'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¹ÙÙØ§Ø¡', 'ØªØ®Ø·ÙØ· Ø§ÙØ­ÙÙØ§Øª', 'Ø§ÙØªÙØ§Ø±ÙØ± Ø§ÙØ´ÙØ±ÙØ©'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ SPA âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'spa',
    en: 'Spa AI',
    ar: 'Ø§ÙØ³Ø¨Ø§ Ø§ÙØ°ÙÙ',
    industry: { en: 'Spas & Wellness Centers', ar: 'Ø§ÙØ³Ø¨Ø§ ÙÙØ±Ø§ÙØ² Ø§ÙØ¹Ø§ÙÙØ©' },
    buildFee: 300,
    painStat: {
      en: 'Spas miss 35% of potential bookings from late-night and off-hour inquiries.',
      ar: 'Ø§ÙØ³Ø¨Ø§ ÙÙÙØ¯ Ù£Ù¥Ùª ÙÙ Ø­Ø¬ÙØ²Ø§ØªÙ Ø§ÙÙØ­ØªÙÙØ© ÙÙ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§ÙÙØ³Ø§Ø¡ ÙØ®Ø§Ø±Ø¬ Ø£ÙÙØ§Øª Ø§ÙØ¯ÙØ§Ù.',
    },
    icon: 'spa',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 160,
        features: {
          en: [
            'Custom AI Agent trained on your spa',
            'Session booking by therapist & treatment type',
            'Treatment menu, duration & pricing automation',
            '24/7 on WhatsApp + Website',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØ³Ø¨Ø§Ù',
            'Ø­Ø¬Ø² Ø§ÙØ¬ÙØ³Ø§Øª Ø­Ø³Ø¨ Ø§ÙÙØ¹Ø§ÙØ¬ ÙÙÙØ¹ Ø§ÙØ¹ÙØ§Ø¬',
            'Ø£ØªÙØªØ© ÙØ§Ø¦ÙØ© Ø§ÙØ¹ÙØ§Ø¬Ø§Øª ÙØ§ÙÙØ¯Ø© ÙØ§ÙØ£Ø³Ø¹Ø§Ø±',
            'ÙØªØ§Ø­ Ù¢Ù¤/Ù§ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙØ§ÙÙÙÙØ¹',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Package & membership upsell automation',
            'Post-session wellness follow-ups',
            'Google Review requests after visits',
            'Client preference memory',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'Ø£ØªÙØªØ© Ø¹Ø±ÙØ¶ Ø§ÙØ¨Ø§ÙØ§Øª ÙØ§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª',
            'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙØ¹Ø§ÙÙØ© Ø¨Ø¹Ø¯ Ø§ÙØ¬ÙØ³Ø©',
            'Ø·ÙØ¨ ØªÙÙÙÙØ§Øª Google Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©',
            'Ø­ÙØ¸ ØªÙØ¶ÙÙØ§Øª Ø§ÙØ¹ÙÙÙ',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 330,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (booking, wellness coach, loyalty)',
            'Seasonal wellness campaigns',
            'Win-back for inactive clients',
            'Full channel automation',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (Ø­Ø¬Ø²Ø ÙØ¯Ø±Ø¨ Ø¹Ø§ÙÙØ©Ø ÙÙØ§Ø¡)',
            'Ø­ÙÙØ§Øª Ø¹Ø§ÙÙØ© ÙÙØ³ÙÙØ©',
            'Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'Most spa bookings happen in the evening â\nwhen your staff is off.',
        ar: 'Ø£ØºÙØ¨ Ø­Ø¬ÙØ²Ø§Øª Ø§ÙØ³Ø¨Ø§ ØªØµÙØ± ÙÙ Ø§ÙÙØ³Ø§Ø¡ â\nÙÙØ§ ÙØ±ÙÙÙ ÙÙØªÙÙ ÙÙ Ø§ÙØ¯ÙØ§Ù.',
      },
      painSolution: {
        en: 'Your AI agent takes bookings and answers questions around the clock â no missed revenue.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØ³ØªÙØ¨Ù Ø§ÙØ­Ø¬ÙØ²Ø§Øª ÙÙØ¬ÙØ¨ Ø§ÙØ£Ø³Ø¦ÙØ© Ø¹ÙÙ ÙØ¯Ø§Ø± Ø§ÙØ³Ø§Ø¹Ø© â Ø¨Ø¯ÙÙ Ø®Ø³Ø§Ø±Ø© Ø­Ø¬Ø².',
      },
      tasksEliminated: {
        smart: {
          en: ['Off-hour booking messages', 'Treatment pricing questions', 'Manual reminders'],
          ar: ['Ø±Ø³Ø§Ø¦Ù Ø§ÙØ­Ø¬Ø² Ø®Ø§Ø±Ø¬ Ø£ÙÙØ§Øª Ø§ÙØ¯ÙØ§Ù', 'Ø£Ø³Ø¦ÙØ© Ø£Ø³Ø¹Ø§Ø± Ø§ÙØ¹ÙØ§Ø¬Ø§Øª', 'Ø§ÙØªØ°ÙÙØ±Ø§Øª Ø§ÙÙØ¯ÙÙØ©'],
        },
        pro: {
          en: ['Upsell conversations', 'Post-session follow-ups', 'Review collection'],
          ar: ['ÙØ­Ø§Ø¯Ø«Ø§Øª Ø§ÙØ¨ÙØ¹ Ø§ÙØ¥Ø¶Ø§ÙÙ', 'Ø§ÙÙØªØ§Ø¨Ø¹Ø© Ø¨Ø¹Ø¯ Ø§ÙØ¬ÙØ³Ø©', 'Ø¬ÙØ¹ Ø§ÙØªÙÙÙÙØ§Øª'],
        },
        'full-auto': {
          en: ['All client communication', 'Campaign management', 'Monthly analysis'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¹ÙÙØ§Ø¡', 'Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ­ÙÙØ§Øª', 'Ø§ÙØªØ­ÙÙÙ Ø§ÙØ´ÙØ±Ù'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ GYM âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'gym',
    en: 'Gym AI',
    ar: 'Ø§ÙØ¬ÙÙ Ø§ÙØ°ÙÙ',
    industry: { en: "Men's & Women's Gyms", ar: 'ØµØ§ÙØ§Øª Ø§ÙØ¬ÙÙ ÙÙØ±Ø¬Ø§Ù ÙØ§ÙØ³ÙØ¯Ø§Øª' },
    buildFee: 320,
    painStat: {
      en: 'Gyms spend 2+ hours daily on membership inquiries that never convert.',
      ar: 'Ø§ÙØ¬ÙÙ ÙØ¶ÙÙØ¹ Ø£ÙØ«Ø± ÙÙ Ø³Ø§Ø¹ØªÙÙ ÙÙÙÙØ§Ù ÙÙ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ø´ØªØ±Ø§ÙØ§Øª ÙØ§ ØªØªØ­ÙÙ ÙØ¹ÙÙØ§Ø¡.',
    },
    icon: 'gym',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 170,
        features: {
          en: [
            'Custom AI Agent trained on your gym',
            'Membership plan info & pricing automation',
            'New member registration flow',
            'Class schedule & trainer availability',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØ¬ÙÙÙ',
            'ÙØ¹ÙÙÙØ§Øª ÙØ£Ø³Ø¹Ø§Ø± Ø§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª ØªÙÙØ§Ø¦ÙØ§Ù',
            'ØªØ³Ø¬ÙÙ Ø§ÙØ£Ø¹Ø¶Ø§Ø¡ Ø§ÙØ¬Ø¯Ø¯',
            'Ø¬Ø¯Ø§ÙÙ Ø§ÙÙÙØ§Ø³Ø§Øª ÙØªÙÙØ± Ø§ÙÙØ¯Ø±Ø¨ÙÙ',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 260,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Membership renewal reminders',
            'Personal training upsell automation',
            'Member retention follow-ups',
            'Progress check-in prompts',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'ØªØ°ÙÙØ±Ø§Øª ØªØ¬Ø¯ÙØ¯ Ø§ÙØ§Ø´ØªØ±Ø§Ù ØªÙÙØ§Ø¦ÙØ§Ù',
            'Ø£ØªÙØªØ© Ø¹Ø±ÙØ¶ Ø§ÙØªØ¯Ø±ÙØ¨ Ø§ÙØ´Ø®ØµÙ',
            'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙØ£Ø¹Ø¶Ø§Ø¡ ÙÙØ­ÙØ§Ø¸ Ø¹ÙÙÙÙ',
            'ØªØ°ÙÙØ±Ø§Øª ØªØªØ¨Ø¹ Ø§ÙØªÙØ¯Ù',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 360,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (sales, retention, coach assistant)',
            'Win-back campaigns for churned members',
            'Seasonal fitness challenge campaigns',
            'Full automation across all channels',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (ÙØ¨ÙØ¹Ø§ØªØ Ø§Ø³ØªØ¨ÙØ§Ø¡Ø ÙØ³Ø§Ø¹Ø¯ ÙØ¯Ø±Ø¨)',
            'Ø­ÙÙØ§Øª Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙØ£Ø¹Ø¶Ø§Ø¡ Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'Ø­ÙÙØ§Øª ØªØ­Ø¯ÙØ§Øª Ø§ÙÙÙØ§ÙØ© Ø§ÙÙÙØ³ÙÙØ©',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A gym receptionist spends 3 hours answering\n"how much is the membership?" every single day.',
        ar: 'ÙÙØ¸Ù Ø§ÙØ§Ø³ØªÙØ¨Ø§Ù ÙÙ Ø§ÙØ¬ÙÙ ÙØ¶ÙÙØ¹ Ù£ Ø³Ø§Ø¹Ø§Øª ÙÙÙÙØ§Ù\nÙØ¬ÙØ¨ "Ø¬Ù Ø§ÙØ§Ø´ØªØ±Ø§ÙØ" ÙÙ ÙÙÙ.',
      },
      painSolution: {
        en: 'Your AI agent handles all inquiries, registers new members, and follows up renewals â automatically.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØªÙÙÙ ÙÙ Ø§ÙØ§Ø³ØªÙØ³Ø§Ø±Ø§ØªØ ÙØ³Ø¬Ù Ø§ÙØ£Ø¹Ø¶Ø§Ø¡ Ø§ÙØ¬Ø¯Ø¯Ø ÙÙØªØ§Ø¨Ø¹ Ø§ÙØªØ¬Ø¯ÙØ¯Ø§Øª â ØªÙÙØ§Ø¦ÙØ§Ù.',
      },
      tasksEliminated: {
        smart: {
          en: ['Membership price questions', 'Manual registration', 'Class schedule inquiries'],
          ar: ['Ø£Ø³Ø¦ÙØ© Ø£Ø³Ø¹Ø§Ø± Ø§ÙØ§Ø´ØªØ±Ø§ÙØ§Øª', 'Ø§ÙØªØ³Ø¬ÙÙ Ø§ÙÙØ¯ÙÙ', 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø¬Ø¯Ø§ÙÙ Ø§ÙÙÙØ§Ø³Ø§Øª'],
        },
        pro: {
          en: ['Renewal reminder calls', 'PT upsell conversations', 'Retention check-ins'],
          ar: ['ÙÙØ§ÙÙØ§Øª ØªØ°ÙÙØ± Ø§ÙØªØ¬Ø¯ÙØ¯', 'ÙØ­Ø§Ø¯Ø«Ø§Øª Ø¨ÙØ¹ Ø§ÙØªØ¯Ø±ÙØ¨ Ø§ÙØ´Ø®ØµÙ', 'ÙØªØ§Ø¨Ø¹Ø§Øª Ø§ÙØ§Ø³ØªØ¨ÙØ§Ø¡'],
        },
        'full-auto': {
          en: ['All member communication', 'Campaign execution', 'Monthly performance reports'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ£Ø¹Ø¶Ø§Ø¡', 'ØªÙÙÙØ° Ø§ÙØ­ÙÙØ§Øª', 'ØªÙØ§Ø±ÙØ± Ø§ÙØ£Ø¯Ø§Ø¡ Ø§ÙØ´ÙØ±ÙØ©'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ GARAGE ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'garage',
    en: 'Garage AI',
    ar: 'Ø§ÙÙØ±Ø´Ø© Ø§ÙØ°ÙÙØ©',
    industry: { en: 'Auto Garages & Service Centers', ar: 'ÙØ±Ø´ Ø§ÙØ³ÙØ§Ø±Ø§Øª ÙÙØ±Ø§ÙØ² Ø§ÙØ®Ø¯ÙØ©' },
    buildFee: 300,
    painStat: {
      en: 'Garage owners spend 2+ hours a day on status update calls they could automate.',
      ar: 'Ø£ØµØ­Ø§Ø¨ Ø§ÙÙØ±Ø´ ÙÙØ¶ÙÙ Ø£ÙØ«Ø± ÙÙ Ø³Ø§Ø¹ØªÙÙ ÙÙÙÙØ§Ù ÙÙ ÙÙØ§ÙÙØ§Øª ØªØ­Ø¯ÙØ«Ø§Øª ÙÙÙÙ Ø£ØªÙØªØªÙØ§.',
    },
    icon: 'garage',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 160,
        features: {
          en: [
            'Custom AI Agent trained on your garage',
            'Automated car status updates to customers',
            'Service booking & appointment scheduling',
            'Service menu & pricing info',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙÙØ±Ø´ØªÙ',
            'ØªØ­Ø¯ÙØ«Ø§Øª Ø­Ø§ÙØ© Ø§ÙØ³ÙØ§Ø±Ø© ØªÙÙØ§Ø¦ÙØ§Ù ÙÙØ¹ÙÙØ§Ø¡',
            'Ø­Ø¬Ø² Ø§ÙØ®Ø¯ÙØ© ÙØ¬Ø¯ÙÙØ© Ø§ÙÙÙØ§Ø¹ÙØ¯',
            'ÙØ§Ø¦ÙØ© Ø§ÙØ®Ø¯ÙØ§Øª ÙØ§ÙØ£Ø³Ø¹Ø§Ø±',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Automated invoice & estimate sending',
            'Service history tracking per vehicle',
            'Maintenance reminder by mileage / date',
            'Google Review requests after service',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'Ø¥Ø±Ø³Ø§Ù Ø§ÙÙÙØ§ØªÙØ± ÙØ§ÙØªÙØ¯ÙØ±Ø§Øª ØªÙÙØ§Ø¦ÙØ§Ù',
            'ØªØªØ¨Ø¹ ØªØ§Ø±ÙØ® Ø§ÙØµÙØ§ÙØ© ÙÙÙ Ø³ÙØ§Ø±Ø©',
            'ØªØ°ÙÙØ± Ø§ÙØµÙØ§ÙØ© Ø­Ø³Ø¨ Ø§ÙÙÙÙÙÙØªØ±Ø§Øª Ø£Ù Ø§ÙØªØ§Ø±ÙØ®',
            'Ø·ÙØ¨ ØªÙÙÙÙØ§Øª Google Ø¨Ø¹Ø¯ Ø§ÙØ®Ø¯ÙØ©',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 330,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (service advisor, follow-up, analytics)',
            'Win-back campaigns for inactive customers',
            'Seasonal service offer broadcasts',
            'Full automation across all channels',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (ÙØ³ØªØ´Ø§Ø± Ø®Ø¯ÙØ©Ø ÙØªØ§Ø¨Ø¹Ø©Ø ØªØ­ÙÙÙ)',
            'Ø­ÙÙØ§Øª Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'Ø¹Ø±ÙØ¶ Ø®Ø¯ÙØ© ÙÙØ³ÙÙØ©',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'Every garage customer calls at least twice asking\n"is my car ready?" â hours wasted every day.',
        ar: 'ÙÙ Ø¹ÙÙÙ ÙÙ Ø§ÙÙØ±Ø´Ø© ÙØªØµÙ ÙØ±ØªÙÙ Ø¹ÙÙ Ø§ÙØ£ÙÙ\n"Ø³ÙØ§Ø±ØªÙ Ø®ÙØµØªØ" â Ø³Ø§Ø¹Ø§Øª ØªØ¶ÙØ¹ ÙÙ ÙÙÙ.',
      },
      painSolution: {
        en: 'Your AI agent sends real-time car status updates and handles all inquiries â zero interruptions to your team.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØ±Ø³Ù ØªØ­Ø¯ÙØ«Ø§Øª Ø­Ø§ÙØ© Ø§ÙØ³ÙØ§Ø±Ø© ÙÙØ±ÙØ§Ù ÙÙØªÙÙÙ ÙÙ Ø§ÙØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª â ÙØ±ÙÙÙ Ø¨Ø¯ÙÙ Ø§ÙÙØ·Ø§Ø¹.',
      },
      tasksEliminated: {
        smart: {
          en: ['Status update calls', 'Service pricing inquiries', 'Manual booking'],
          ar: ['ÙÙØ§ÙÙØ§Øª ØªØ­Ø¯ÙØ« Ø§ÙØ­Ø§ÙØ©', 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø£Ø³Ø¹Ø§Ø± Ø§ÙØ®Ø¯ÙØ©', 'Ø§ÙØ­Ø¬Ø² Ø§ÙÙØ¯ÙÙ'],
        },
        pro: {
          en: ['Invoice sending', 'Maintenance reminder calls', 'Review requests'],
          ar: ['Ø¥Ø±Ø³Ø§Ù Ø§ÙÙÙØ§ØªÙØ±', 'ÙÙØ§ÙÙØ§Øª ØªØ°ÙÙØ± Ø§ÙØµÙØ§ÙØ©', 'Ø·ÙØ¨ Ø§ÙØªÙÙÙÙØ§Øª'],
        },
        'full-auto': {
          en: ['All customer communication', 'Campaign execution', 'Performance reporting'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¹ÙÙØ§Ø¡', 'ØªÙÙÙØ° Ø§ÙØ­ÙÙØ§Øª', 'ØªÙØ§Ø±ÙØ± Ø§ÙØ£Ø¯Ø§Ø¡'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ RESTAURANT ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'restaurant',
    en: 'Restaurant AI',
    ar: 'Ø§ÙÙØ·Ø¹Ù Ø§ÙØ°ÙÙ',
    industry: { en: 'Restaurants, Cafes & F&B', ar: 'Ø§ÙÙØ·Ø§Ø¹Ù ÙØ§ÙÙÙØ§ÙÙ ÙØ§ÙÙÙØ¯ Ø¢ÙØ¯ Ø¨ÙÙØ±Ø¬' },
    buildFee: 380,
    painStat: {
      en: 'Restaurants lose 20% of reservation requests during peak hours when staff is too busy to reply.',
      ar: 'Ø§ÙÙØ·Ø§Ø¹Ù ØªØ®Ø³Ø± Ù¢Ù Ùª ÙÙ Ø·ÙØ¨Ø§Øª Ø§ÙØ­Ø¬Ø² Ø£ÙÙØ§Øª Ø§ÙØ°Ø±ÙØ© ÙÙØ§ Ø§ÙÙØ±ÙÙ ÙØ´ØºÙÙ ÙØ§ ÙÙØ¯Ø± ÙØ±Ø¯.',
    },
    icon: 'restaurant',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 200,
        features: {
          en: [
            'Custom AI Agent trained on your restaurant',
            'Table reservation & party size handling',
            'Menu info, dietary options & pricing',
            '24/7 on WhatsApp + Website',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙÙØ·Ø¹ÙÙ',
            'Ø­Ø¬Ø² Ø§ÙØ·Ø§ÙÙØ§Øª ÙØ¹Ø¯Ø¯ Ø§ÙØ£Ø´Ø®Ø§Øµ',
            'ÙØ¹ÙÙÙØ§Øª Ø§ÙÙÙÙÙ ÙØ§ÙØ®ÙØ§Ø±Ø§Øª Ø§ÙØºØ°Ø§Ø¦ÙØ© ÙØ§ÙØ£Ø³Ø¹Ø§Ø±',
            'ÙØªØ§Ø­ Ù¢Ù¤/Ù§ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙØ§ÙÙÙÙØ¹',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 300,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Pre-arrival upsell (dessert, special occasion setup)',
            'Post-visit feedback & Google Review requests',
            'Online order handling automation',
            'Special event booking flow',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'Ø¨ÙØ¹ Ø¥Ø¶Ø§ÙÙ ÙØ¨Ù Ø§ÙÙØµÙÙ (Ø­ÙÙÙØ§ØªØ Ø¥Ø¹Ø¯Ø§Ø¯ ÙÙØ§Ø³Ø¨Ø§Øª)',
            'Ø§Ø³ØªØ·ÙØ§Ø¹ Ø±Ø£Ù ÙØ§ Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø© ÙØ·ÙØ¨ ØªÙÙÙÙØ§Øª Google',
            'Ø£ØªÙØªØ© ÙØ¹Ø§ÙØ¬Ø© Ø§ÙØ·ÙØ¨Ø§Øª Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©',
            'ØªØ¯ÙÙ Ø­Ø¬Ø² Ø§ÙÙÙØ§Ø³Ø¨Ø§Øª Ø§ÙØ®Ø§ØµØ©',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 420,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (host, order, loyalty)',
            'Regular customer VIP recognition',
            'Seasonal menu & offer broadcasts',
            'Full automation across all channels',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (Ø§Ø³ØªÙØ¨Ø§ÙØ Ø·ÙØ¨Ø§ØªØ ÙÙØ§Ø¡)',
            'Ø§ÙØªØ¹Ø±Ù Ø¹ÙÙ Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙÙØ²ÙÙ',
            'Ø¥Ø°Ø§Ø¹Ø§Øª Ø§ÙÙÙÙÙ Ø§ÙÙÙØ³ÙÙ ÙØ§ÙØ¹Ø±ÙØ¶',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'On a busy Friday night, your team misses 15 reservation\nrequests â that\'s real revenue walking out the door.',
        ar: 'ÙÙÙØ© Ø§ÙØ¬ÙØ¹Ø© Ø§ÙÙØ²Ø¯Ø­ÙØ©Ø ÙØ±ÙÙÙ ÙØ¶ÙÙØ¹ Ù¡Ù¥ Ø·ÙØ¨ Ø­Ø¬Ø² â\nÙØ°Ø§ Ø¥ÙØ±Ø§Ø¯ ÙØ¹ÙÙ ÙØ®Ø±Ø¬ ÙÙ Ø§ÙØ¨Ø§Ø¨.',
      },
      painSolution: {
        en: 'Your AI agent handles reservations, menu questions, and upsells â even during your busiest hours.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØªÙÙÙ Ø§ÙØ­Ø¬ÙØ²Ø§Øª ÙØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§ÙÙÙÙÙ ÙØ§ÙØ¨ÙØ¹ Ø§ÙØ¥Ø¶Ø§ÙÙ â Ø­ØªÙ ÙÙ Ø£ÙØ«Ø± Ø£ÙÙØ§ØªÙ Ø§Ø²Ø¯Ø­Ø§ÙØ§Ù.',
      },
      tasksEliminated: {
        smart: {
          en: ['Reservation calls & messages', 'Menu inquiries', 'Availability checking'],
          ar: ['ÙÙØ§ÙÙØ§Øª ÙØ±Ø³Ø§Ø¦Ù Ø§ÙØ­Ø¬Ø²', 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§ÙÙÙÙÙ', 'ÙØ­Øµ Ø§ÙØªÙÙØ±'],
        },
        pro: {
          en: ['Upsell conversations', 'Post-visit feedback collection', 'Online order management'],
          ar: ['ÙØ­Ø§Ø¯Ø«Ø§Øª Ø§ÙØ¨ÙØ¹ Ø§ÙØ¥Ø¶Ø§ÙÙ', 'Ø¬ÙØ¹ Ø¢Ø±Ø§Ø¡ ÙØ§ Ø¨Ø¹Ø¯ Ø§ÙØ²ÙØ§Ø±Ø©', 'Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ·ÙØ¨Ø§Øª Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ©'],
        },
        'full-auto': {
          en: ['All guest communication', 'Campaign management', 'Monthly revenue analysis'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¶ÙÙÙ', 'Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ­ÙÙØ§Øª', 'ØªØ­ÙÙÙ Ø§ÙØ¥ÙØ±Ø§Ø¯Ø§Øª Ø§ÙØ´ÙØ±Ù'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ REAL ESTATE âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'real-estate',
    en: 'Real Estate AI',
    ar: 'Ø§ÙØ¹ÙØ§Ø±Ø§Øª Ø§ÙØ°ÙÙØ©',
    industry: { en: 'Real Estate Brokers & Agencies', ar: 'ÙØ³Ø·Ø§Ø¡ Ø§ÙØ¹ÙØ§Ø±Ø§Øª ÙØ§ÙØ´Ø±ÙØ§Øª Ø§ÙØ¹ÙØ§Ø±ÙØ©' },
    buildFee: 450,
    painStat: {
      en: 'Real estate brokers miss 40% of leads because responses take more than 30 minutes.',
      ar: 'ÙØ³Ø·Ø§Ø¡ Ø§ÙØ¹ÙØ§Ø±Ø§Øª ÙÙÙØ¯ÙÙ Ù¤Ù Ùª ÙÙ Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙØ­ØªÙÙÙÙ ÙØ£Ù Ø§ÙØ±Ø¯ ÙØªØ£Ø®Ø± Ø£ÙØ«Ø± ÙÙ Ù£Ù  Ø¯ÙÙÙØ©.',
    },
    icon: 'real-estate',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 250,
        features: {
          en: [
            'Custom AI Agent trained on your listings',
            'Instant property matching by budget & preferences',
            'Viewing appointment scheduling',
            'Property info, photos & location sharing',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙØ¹ÙØ§Ø±Ø§ØªÙ',
            'ÙØ·Ø§Ø¨ÙØ© ÙÙØ±ÙØ© ÙÙØ¹ÙØ§Ø±Ø§Øª Ø­Ø³Ø¨ Ø§ÙÙÙØ²Ø§ÙÙØ© ÙØ§ÙØªÙØ¶ÙÙØ§Øª',
            'Ø¬Ø¯ÙÙØ© ÙÙØ§Ø¹ÙØ¯ Ø§ÙÙØ¹Ø§ÙÙØ©',
            'ÙØ¹ÙÙÙØ§Øª Ø§ÙØ¹ÙØ§Ø± ÙØ§ÙØµÙØ± ÙØ§ÙÙÙÙØ¹',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 380,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Lead qualification & scoring automation',
            'Post-viewing follow-up sequences',
            'New listing alerts to interested clients',
            'Market report automation',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'ØªØ£ÙÙÙ ÙØªÙÙÙÙ Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙØ­ØªÙÙÙÙ ØªÙÙØ§Ø¦ÙØ§Ù',
            'ØªØ³ÙØ³Ù Ø§ÙÙØªØ§Ø¨Ø¹Ø© Ø¨Ø¹Ø¯ Ø§ÙÙØ¹Ø§ÙÙØ©',
            'ØªÙØ¨ÙÙØ§Øª Ø§ÙØ¹ÙØ§Ø±Ø§Øª Ø§ÙØ¬Ø¯ÙØ¯Ø© ÙÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙØªÙÙÙ',
            'Ø£ØªÙØªØ© ØªÙØ§Ø±ÙØ± Ø§ÙØ³ÙÙ',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 520,
        features: {
          en: [
            'Everything in Pro',
            'Multiple AI agents (sales, follow-up, market analyst)',
            'Long-term lead nurturing sequences',
            'Investor portfolio update automation',
            'Full automation across all channels',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø¹Ø¯Ø© ÙÙÙØ§Ø¡ (ÙØ¨ÙØ¹Ø§ØªØ ÙØªØ§Ø¨Ø¹Ø©Ø ÙØ­ÙÙ Ø³ÙÙ)',
            'ØªØ³ÙØ³ÙØ§Øª Ø±Ø¹Ø§ÙØ© Ø§ÙØ¹ÙÙØ§Ø¡ Ø¹ÙÙ Ø§ÙÙØ¯Ù Ø§ÙØ·ÙÙÙ',
            'ØªØ­Ø¯ÙØ«Ø§Øª ÙØ­Ø§ÙØ¸ Ø§ÙÙØ³ØªØ«ÙØ±ÙÙ ØªÙÙØ§Ø¦ÙØ§Ù',
            'Ø£ØªÙØªØ© ÙØ§ÙÙØ© Ø¹Ø¨Ø± Ø¬ÙÙØ¹ Ø§ÙÙÙÙØ§Øª',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A real estate lead who doesn\'t get a reply in 5 minutes\ngoes to the next broker. Always.',
        ar: 'Ø¹ÙÙÙ Ø§ÙØ¹ÙØ§Ø±Ø§Øª Ø§ÙÙÙ ÙØ§ ÙØ¬ÙÙ Ø±Ø¯ ÙÙ Ù¥ Ø¯ÙØ§Ø¦Ù\nÙØ±ÙØ­ ÙÙÙØ³ÙØ· Ø§ÙØ«Ø§ÙÙ. Ø¯Ø§Ø¦ÙØ§Ù.',
      },
      painSolution: {
        en: 'Your AI agent responds instantly, qualifies the lead, matches properties, and books viewings â even at midnight.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØ±Ø¯ ÙÙØ±Ø§ÙØ ÙØ¤ÙÙÙ Ø§ÙØ¹ÙÙÙØ ÙØ·Ø§Ø¨Ù Ø§ÙØ¹ÙØ§Ø±Ø§ØªØ ÙÙØ­Ø¬Ø² Ø§ÙÙØ¹Ø§ÙÙØ§Øª â Ø­ØªÙ ÙÙØªØµÙ Ø§ÙÙÙÙ.',
      },
      tasksEliminated: {
        smart: {
          en: ['Initial inquiry responses', 'Property matching manually', 'Viewing scheduling'],
          ar: ['Ø§ÙØ±Ø¯ÙØ¯ Ø§ÙØ£ÙÙÙØ© Ø¹ÙÙ Ø§ÙØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª', 'ÙØ·Ø§Ø¨ÙØ© Ø§ÙØ¹ÙØ§Ø±Ø§Øª ÙØ¯ÙÙØ§Ù', 'Ø¬Ø¯ÙÙØ© Ø§ÙÙØ¹Ø§ÙÙØ§Øª'],
        },
        pro: {
          en: ['Lead qualification calls', 'Post-viewing follow-ups', 'Market report preparation'],
          ar: ['ÙÙØ§ÙÙØ§Øª ØªØ£ÙÙÙ Ø§ÙØ¹ÙÙØ§Ø¡', 'Ø§ÙÙØªØ§Ø¨Ø¹Ø© Ø¨Ø¹Ø¯ Ø§ÙÙØ¹Ø§ÙÙØ©', 'ØªØ­Ø¶ÙØ± ØªÙØ§Ø±ÙØ± Ø§ÙØ³ÙÙ'],
        },
        'full-auto': {
          en: ['All client communication', 'Lead nurturing campaigns', 'Portfolio reporting'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¹ÙÙØ§Ø¡', 'Ø­ÙÙØ§Øª Ø±Ø¹Ø§ÙØ© Ø§ÙØ¹ÙÙØ§Ø¡', 'ØªÙØ§Ø±ÙØ± Ø§ÙÙØ­Ø§ÙØ¸'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },

  // ââ HOME BUSINESS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'home-business',
    en: 'Home Business AI',
    ar: 'Ø§ÙÙØ´Ø±ÙØ¹ Ø§ÙÙÙØ²ÙÙ Ø§ÙØ°ÙÙ',
    industry: { en: 'Home-based Businesses & Micro Brands', ar: 'Ø§ÙÙØ´Ø§Ø±ÙØ¹ Ø§ÙÙÙØ²ÙÙØ© ÙØ§ÙØ¹ÙØ§ÙØ§Øª Ø§ÙØµØºÙØ±Ø©' },
    buildFee: 250,
    painStat: {
      en: 'Home business owners spend 5â6 hours daily managing WhatsApp orders manually.',
      ar: 'Ø£ØµØ­Ø§Ø¨ Ø§ÙÙØ´Ø§Ø±ÙØ¹ Ø§ÙÙÙØ²ÙÙØ© ÙÙØ¶ÙÙ Ù¥âÙ¦ Ø³Ø§Ø¹Ø§Øª ÙÙÙÙØ§Ù ÙÙ Ø¥Ø¯Ø§Ø±Ø© Ø·ÙØ¨Ø§Øª ÙØ§ØªØ³Ø§Ø¨ ÙØ¯ÙÙØ§Ù.',
    },
    icon: 'home-business',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'Ø§ÙØ°ÙÙ',
        retainer: 130,
        features: {
          en: [
            'Custom AI Agent trained on your business',
            'Order intake & confirmation automation',
            'Product catalogue & pricing replies',
            'Delivery info & area coverage',
            'Client Portal Dashboard',
            'Full monthly maintenance',
          ],
          ar: [
            'ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ ÙÙØ´Ø±ÙØ¹Ù',
            'Ø§Ø³ØªÙØ¨Ø§Ù Ø§ÙØ·ÙØ¨Ø§Øª ÙØ§ÙØªØ£ÙÙØ¯ ØªÙÙØ§Ø¦ÙØ§Ù',
            'Ø±Ø¯ÙØ¯ Ø§ÙÙØªØ§ÙÙØ¬ ÙØ§ÙØ£Ø³Ø¹Ø§Ø±',
            'ÙØ¹ÙÙÙØ§Øª Ø§ÙØªÙØµÙÙ ÙØ§ÙÙÙØ§Ø·Ù',
            'ÙÙØ­Ø© ØªØ­ÙÙ Ø§ÙØ¹ÙÙÙ',
            'ØµÙØ§ÙØ© Ø´ÙØ±ÙØ© Ø´Ø§ÙÙØ©',
          ],
        },
        channels: ['whatsapp', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'Ø§ÙÙØªÙØ¯Ù',
        retainer: 200,
        badge: { en: 'Most Popular', ar: 'Ø§ÙØ£ÙØ«Ø± Ø·ÙØ¨Ø§Ù' },
        features: {
          en: [
            'Everything in Smart',
            'Repeat-customer recognition & loyalty',
            'Upsell at order confirmation',
            'Google Review requests post-delivery',
            'Abandoned inquiry follow-up',
            'WhatsApp + Website + Instagram',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙØ°ÙÙ',
            'Ø§ÙØªØ¹Ø±Ù Ø¹ÙÙ Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙØªÙØ±Ø±ÙÙ ÙØ§ÙÙÙØ§Ø¡',
            'Ø§ÙØªØ±Ø§Ø­ ÙÙØªØ¬Ø§Øª Ø¥Ø¶Ø§ÙÙØ© Ø¹ÙØ¯ ØªØ£ÙÙØ¯ Ø§ÙØ·ÙØ¨',
            'Ø·ÙØ¨ ØªÙÙÙÙØ§Øª Google Ø¨Ø¹Ø¯ Ø§ÙØªÙØµÙÙ',
            'ÙØªØ§Ø¨Ø¹Ø© Ø§ÙØ§Ø³ØªÙØ³Ø§Ø±Ø§Øª ØºÙØ± Ø§ÙÙÙØªÙÙØ©',
            'ÙØ§ØªØ³Ø§Ø¨ + ÙÙÙØ¹ + Ø§ÙØ³ØªÙØ±Ø§Ù',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'Ø§ÙÙØ¤ØªÙØª',
        retainer: 280,
        features: {
          en: [
            'Everything in Pro',
            'Seasonal promo broadcasts (Eid, National Day)',
            'Win-back campaigns for inactive customers',
            'Custom order form via WhatsApp',
            'Bulk broadcast to customer list',
            'Priority support + monthly strategy call',
          ],
          ar: [
            'ÙÙ ÙØ§ ÙÙ Ø§ÙÙØªÙØ¯Ù',
            'Ø­ÙÙØ§Øª ÙÙØ³ÙÙØ© (Ø¹ÙØ¯Ø Ø§ÙÙÙÙ Ø§ÙÙØ·ÙÙ)',
            'Ø­ÙÙØ§Øª Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§ÙØ¹ÙÙØ§Ø¡ Ø§ÙÙÙÙØ·Ø¹ÙÙ',
            'ÙÙÙØ°Ø¬ Ø·ÙØ¨ ÙØ®ØµØµ Ø¹Ø¨Ø± ÙØ§ØªØ³Ø§Ø¨',
            'Ø¨Ø« Ø¬ÙØ§Ø¹Ù ÙÙØ§Ø¦ÙØ© Ø§ÙØ¹ÙÙØ§Ø¡',
            'Ø¯Ø¹Ù Ø£ÙÙÙÙØ© + ÙÙØ§ÙÙØ© Ø§Ø³ØªØ±Ø§ØªÙØ¬ÙØ© Ø´ÙØ±ÙØ©',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A home business owner spends her entire morning\nanswering the same 10 WhatsApp questions.',
        ar: 'ØµØ§Ø­Ø¨Ø© ÙØ´Ø±ÙØ¹ ÙÙØ²ÙÙ ØªÙØ¶Ù ÙÙ ØµØ¨Ø§Ø­ÙØ§\nØªØ±Ø¯ Ø¹ÙÙ ÙÙØ³ Ø§ÙÙÙ¡Ù  Ø£Ø³Ø¦ÙØ© Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨.',
      },
      painSolution: {
        en: 'Your AI agent handles orders, answers questions, and follows up customers â giving you your time back.',
        ar: 'ÙÙÙÙÙ Ø§ÙØ°ÙÙ ÙØªÙÙÙ Ø§ÙØ·ÙØ¨Ø§ØªØ ÙØ¬ÙØ¨ Ø§ÙØ£Ø³Ø¦ÙØ©Ø ÙÙØªØ§Ø¨Ø¹ Ø§ÙØ¹ÙÙØ§Ø¡ â ÙØ±Ø¬Ø¹ÙÙ ÙÙØªÙ.',
      },
      tasksEliminated: {
        smart: {
          en: ['Order inquiry replies', 'Pricing & catalogue messages', 'Delivery area questions'],
          ar: ['Ø±Ø¯ÙØ¯ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§ÙØ·ÙØ¨Ø§Øª', 'Ø±Ø³Ø§Ø¦Ù Ø§ÙØ£Ø³Ø¹Ø§Ø± ÙØ§ÙÙØªØ§ÙÙØ¬', 'Ø£Ø³Ø¦ÙØ© ÙÙØ§Ø·Ù Ø§ÙØªÙØµÙÙ'],
        },
        pro: {
          en: ['Loyalty tracking', 'Upsell conversations', 'Review collection'],
          ar: ['ØªØªØ¨Ø¹ Ø§ÙÙÙØ§Ø¡', 'ÙØ­Ø§Ø¯Ø«Ø§Øª Ø§ÙØ¨ÙØ¹ Ø§ÙØ¥Ø¶Ø§ÙÙ', 'Ø¬ÙØ¹ Ø§ÙØªÙÙÙÙØ§Øª'],
        },
        'full-auto': {
          en: ['All customer communication', 'Campaign management', 'Monthly order analysis'],
          ar: ['ÙÙ Ø§ÙØªÙØ§ØµÙ ÙØ¹ Ø§ÙØ¹ÙÙØ§Ø¡', 'Ø¥Ø¯Ø§Ø±Ø© Ø§ÙØ­ÙÙØ§Øª', 'ØªØ­ÙÙÙ Ø§ÙØ·ÙØ¨Ø§Øª Ø§ÙØ´ÙØ±Ù'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'Ø§Ø¨Ø¯Ø£ Ø¨Ø§ÙØ°ÙÙ' },
        pro:         { en: 'Go Pro', ar: 'Ø§Ø®ØªØ± Ø§ÙÙØªÙØ¯Ù' },
        'full-auto': { en: 'Full Automation', ar: 'Ø§ÙØ£ØªÙØªØ© Ø§ÙÙØ§ÙÙØ©' },
      },
    },
  },
]

// âââ Website Services âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const WEBSITE_SERVICES: WebsiteService[] = [
  {
    id: 'landing-page',
    en: 'Landing Page',
    ar: 'ØµÙØ­Ø© ÙØ¨ÙØ·',
    price: 300,
    deliveryDays: [5, 7],
    monthlyMaintenance: 80,
    features: {
      en: [
        '1â3 pages, bilingual AR/EN',
        'Mobile-responsive design',
        'Basic SEO setup',
        'Contact / WhatsApp CTA',
        'Hosting & domain setup',
      ],
      ar: [
        'Ù¡âÙ£ ØµÙØ­Ø§ØªØ Ø«ÙØ§Ø¦Ù Ø§ÙÙØºØ© AR/EN',
        'ØªØµÙÙÙ ÙØªØ¬Ø§ÙØ¨ ÙØ¹ Ø§ÙØ¬ÙØ§Ù',
        'Ø¥Ø¹Ø¯Ø§Ø¯ SEO Ø£Ø³Ø§Ø³Ù',
        'Ø²Ø± ØªÙØ§ØµÙ / ÙØ§ØªØ³Ø§Ø¨',
        'Ø¥Ø¹Ø¯Ø§Ø¯ Ø§ÙØ§Ø³ØªØ¶Ø§ÙØ© ÙØ§ÙØ¯ÙÙÙÙ',
      ],
    },
  },
  {
    id: 'business-website',
    en: 'Business Website',
    ar: 'ÙÙÙØ¹ ØªØ¬Ø§Ø±Ù',
    price: 550,
    deliveryDays: [10, 14],
    monthlyMaintenance: 80,
    features: {
      en: [
        '5â8 pages, bilingual AR/EN',
        'Mobile-responsive design',
        'Full SEO setup',
        'Services / portfolio pages',
        'Hosting & domain setup',
      ],
      ar: [
        'Ù¥âÙ¨ ØµÙØ­Ø§ØªØ Ø«ÙØ§Ø¦Ù Ø§ÙÙØºØ© AR/EN',
        'ØªØµÙÙÙ ÙØªØ¬Ø§ÙØ¨ ÙØ¹ Ø§ÙØ¬ÙØ§Ù',
        'Ø¥Ø¹Ø¯Ø§Ø¯ SEO ÙØ§ÙÙ',
        'ØµÙØ­Ø§Øª Ø®Ø¯ÙØ§Øª / ÙØ¹Ø±Ø¶ Ø£Ø¹ÙØ§Ù',
        'Ø¥Ø¹Ø¯Ø§Ø¯ Ø§ÙØ§Ø³ØªØ¶Ø§ÙØ© ÙØ§ÙØ¯ÙÙÙÙ',
      ],
    },
  },
  {
    id: 'advanced-website',
    en: 'Advanced Website',
    ar: 'ÙÙÙØ¹ ÙØªÙØ¯Ù',
    price: [900, 1400],
    deliveryDays: [14, 21],
    monthlyMaintenance: 80,
    features: {
      en: [
        'Custom features (store, booking, dashboard)',
        'Bilingual AR/EN with RTL',
        'Payment gateway integration',
        'Advanced SEO & performance',
        'Hosting & domain setup',
      ],
      ar: [
        'Ø®ØµØ§Ø¦Øµ ÙØ®ØµØµØ© (ÙØªØ¬Ø±Ø Ø­Ø¬Ø²Ø ÙÙØ­Ø© ØªØ­ÙÙ)',
        'Ø«ÙØ§Ø¦Ù Ø§ÙÙØºØ© AR/EN ÙØ¹ RTL',
        'Ø±Ø¨Ø· Ø¨ÙØ§Ø¨Ø© Ø§ÙØ¯ÙØ¹',
        'SEO ÙØªÙØ¯Ù ÙØ£Ø¯Ø§Ø¡ Ø¹Ø§ÙÙ',
        'Ø¥Ø¹Ø¯Ø§Ø¯ Ø§ÙØ§Ø³ØªØ¶Ø§ÙØ© ÙØ§ÙØ¯ÙÙÙÙ',
      ],
    },
  },
]

// âââ App Services âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const APP_SERVICES: AppService[] = [
  {
    id: 'simple-app',
    en: 'Simple App',
    ar: 'ØªØ·Ø¨ÙÙ Ø¨Ø³ÙØ·',
    price: [2000, 2500],
    deliveryDays: [21, 30],
    monthlyMaintenance: 150,
    features: {
      en: [
        'iOS + Android (cross-platform)',
        'Bilingual AR/EN with RTL',
        'Core business features',
        'App Store + Google Play publishing',
        'Basic push notifications',
      ],
      ar: [
        'iOS + Android (cross-platform)',
        'Ø«ÙØ§Ø¦Ù Ø§ÙÙØºØ© AR/EN ÙØ¹ RTL',
        'Ø®ØµØ§Ø¦Øµ Ø§ÙØ£Ø¹ÙØ§Ù Ø§ÙØ£Ø³Ø§Ø³ÙØ©',
        'ÙØ´Ø± Ø¹ÙÙ App Store + Google Play',
        'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª Ø£Ø³Ø§Ø³ÙØ©',
      ],
    },
  },
  {
    id: 'advanced-app',
    en: 'Advanced App',
    ar: 'ØªØ·Ø¨ÙÙ ÙØªÙØ¯Ù',
    price: [3500, 6000],
    deliveryDays: [30, 45],
    monthlyMaintenance: 150,
    features: {
      en: [
        'iOS + Android (cross-platform)',
        'Bilingual AR/EN with RTL',
        'Custom features (booking, payments, orders, loyalty)',
        'App Store + Google Play publishing',
        'Advanced push notifications & analytics',
      ],
      ar: [
        'iOS + Android (cross-platform)',
        'Ø«ÙØ§Ø¦Ù Ø§ÙÙØºØ© AR/EN ÙØ¹ RTL',
        'Ø®ØµØ§Ø¦Øµ ÙØ®ØµØµØ© (Ø­Ø¬Ø²Ø Ø¯ÙØ¹Ø Ø·ÙØ¨Ø§ØªØ ÙÙØ§Ø¡)',
        'ÙØ´Ø± Ø¹ÙÙ App Store + Google Play',
        'Ø¥Ø´Ø¹Ø§Ø±Ø§Øª ÙØªÙØ¯ÙØ© ÙØªØ­ÙÙÙØ§Øª',
      ],
    },
  },
]

// âââ Free Trial Offer âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const FREE_TRIAL = {
  en: {
    badge: '1-Week Free Trial',
    headline: 'Not sure yet? Try it first.',
    body: 'We build your actual AI system based on your business. Run it for 7 days â no payment needed. If you love it, we activate. If not, no charge.',
    cta: 'Request Your Free Trial',
  },
  ar: {
    badge: 'Ø£Ø³Ø¨ÙØ¹ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ©',
    headline: 'ÙÙ ÙØªØ£ÙØ¯ Ø¨Ø¹Ø¯Ø Ø¬Ø±ÙØ¨ Ø£ÙÙ.',
    body: 'ÙØ¨ÙÙ ÙØ¸Ø§ÙÙ Ø§ÙØ°ÙÙ Ø§ÙÙØ¹ÙÙ Ø¨ÙØ§Ø¡Ù Ø¹ÙÙ ÙØ´Ø±ÙØ¹Ù. Ø´ØºÙÙÙ Ø£Ø³Ø¨ÙØ¹ â Ø¨Ø¯ÙÙ Ø£Ù Ø¯ÙØ¹. Ø¥Ø°Ø§ Ø¹Ø¬Ø¨ÙØ ÙÙØ¹ÙÙÙ. Ø¥Ø°Ø§ ÙØ§Ø ÙØ§ ÙÙ Ø£Ù ØªÙÙÙØ©.',
    cta: 'Ø§Ø·ÙØ¨ ØªØ¬Ø±Ø¨ØªÙ Ø§ÙÙØ¬Ø§ÙÙØ©',
  },
}

// âââ Custom Bundle CTA ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const CUSTOM_BUNDLE = {
  en: {
    name: 'Custom AI System',
    desc: "Your business doesn't fit the 8 industries? No problem â we design and build a fully custom AI agent system after a consultation call.",
    cta: 'Book a Consultation',
  },
  ar: {
    name: 'ÙØ¸Ø§Ù Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ',
    desc: 'ÙØ´Ø±ÙØ¹Ù ÙØ§ ÙÙØ§Ø³Ø¨ Ø§ÙÙÙ¨ ÙØ·Ø§Ø¹Ø§ØªØ ÙÙØ§ ÙÙÙÙ â ÙØµÙÙ ÙÙØ¨ÙÙ ÙØ¸Ø§Ù ÙÙÙÙ Ø°ÙØ§Ø¡ Ø§ØµØ·ÙØ§Ø¹Ù ÙØ®ØµØµ Ø¨Ø§ÙÙØ§ÙÙ Ø¨Ø¹Ø¯ ÙÙØ§ÙÙØ© Ø§Ø³ØªØ´Ø§Ø±Ø©.',
    cta: 'Ø§Ø­Ø¬Ø² Ø§Ø³ØªØ´Ø§Ø±Ø©',
  },
}

// âââ Demo Conversations (Kuwaiti dialect) âââââââââââââââââââââââââââââââââââââ

export const DEMO_CONVERSATIONS: Record<string, { en: string[]; ar: string[] }[]> = {

  clinic: [
    { en: ['Hi, I need to book a dental appointment for a cleaning'], ar: ['ÙÙØ§Ø Ø£Ø¨Ù Ø£Ø­Ø¬Ø² ÙÙØ¹Ø¯ Ø¹ÙØ¯ Ø¯ÙØªÙØ± Ø§ÙØ£Ø³ÙØ§ÙØ ØªÙØ¸ÙÙ Ø£Ø³ÙØ§Ù'] },
    { en: ['Hala! ð We have slots available this week. Which day works best for you â weekday or weekend?'], ar: ['ÙÙØ§ ÙØºÙØ§! ð Ø¹ÙØ¯ÙØ§ ÙÙØ§Ø¹ÙØ¯ ÙØªØ§Ø­Ø© ÙØ§ÙØ£Ø³Ø¨ÙØ¹. ÙØªÙ ØªØ­Ø¨Ø â ÙÙÙ Ø¯ÙØ§Ù ÙÙØ§ Ø¹Ø·ÙØ©Ø'] },
    { en: ['Wednesday evening if possible, around 6 or 7pm'], ar: ['Ø§ÙØ£Ø±Ø¨Ø¹Ø§Ø¡ Ø§ÙÙØ³Ø§Ø¡ ÙÙ ÙÙØ Ø­ÙØ§ÙÙ Ù¦ Ø£Ù Ù§'] },
    { en: ['Perfect! Wednesday we have 6:00pm and 7:30pm open. Which one works for you?'], ar: ['Ø²ÙÙ! Ø§ÙØ£Ø±Ø¨Ø¹Ø§Ø¡ Ø¹ÙØ¯ÙØ§ Ø§ÙØ³Ø§Ø¹Ø© Ù¦ ÙØ³Ø§Ø¡Ù Ù Ù§:Ù£Ù . Ø£Ù ÙÙØª ÙÙØ§Ø³Ø¨ÙØ'] },
    { en: ['6pm is great. Also â how much does a cleaning cost?'], ar: ['Ø§ÙØ³Ø§Ø¹Ø© Ù¦ ØªÙØ§Ù. ÙØ¨Ø³ â Ø¬Ù Ø³Ø¹Ø± Ø§ÙØªÙØ¸ÙÙØ'] },
    { en: ['Cleaning is 25 KWD. Includes scaling, polishing, and a full checkup. Shall I confirm the 6pm slot for you?'], ar: ['Ø§ÙØªÙØ¸ÙÙ Ø¨Ù Ù¢Ù¥ Ø¯ÙÙØ§Ø±. ÙØ´ÙÙ Ø§ÙØªÙØ¸ÙÙ Ø§ÙØ¹ÙÙÙ ÙØ§ÙØªÙÙÙØ¹ ÙÙØ­Øµ ÙØ§ÙÙ. Ø£Ø£ÙØ¯ ÙÙ ÙÙØ¹Ø¯ Ø§ÙØ³Ø§Ø¹Ø© Ù¦Ø'] },
    { en: ['Yes please, my name is Ahmad Al-Rashidi'], ar: ['Ø£ÙÙØ¯Ø Ø§Ø³ÙÙ Ø£Ø­ÙØ¯ Ø§ÙØ±Ø§Ø´Ø¯Ù'] },
    { en: ["â Done, Ahmad! Wednesday 6:00pm confirmed. You'll get a WhatsApp reminder 2 hours before. See you then! ð¦·"], ar: ['â ØªÙ ÙØ§ Ø£Ø­ÙØ¯! Ø§ÙØ£Ø±Ø¨Ø¹Ø§Ø¡ Ø§ÙØ³Ø§Ø¹Ø© Ù¦ ÙØ³Ø§Ø¡Ù ÙØ¤ÙØ¯. Ø±Ø§Ø­ ÙÙØµÙÙ ØªØ°ÙÙØ± Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙØ¨Ù Ø³Ø§Ø¹ØªÙÙ. ÙØ´ÙÙÙ Ø¹ÙÙ Ø®ÙØ±! ð¦·'] },
  ],

  salon: [
    { en: ['Hey, is Fatima available this Saturday for a keratin treatment?'], ar: ['ÙÙØ§Ø ÙØ§Ø·ÙØ© ÙØ§Ø¶ÙÙ ÙÙÙ Ø§ÙØ³Ø¨ØªØ Ø£Ø¨Ù Ø£Ø³ÙÙ ÙÙØ±Ø§ØªÙÙ'] },
    { en: ["Hala! Let me check Fatima's schedule... â She has Saturday at 11am and 2pm open. Which works?"], ar: ['ÙÙØ§! Ø«ÙØ§ÙÙ Ø£Ø´ÙÙ Ø¬Ø¯ÙÙ ÙØ§Ø·ÙØ© Ø§ÙØ­ÙÙ... â Ø¹ÙØ¯ÙØ§ Ø§ÙØ³Ø¨Øª Ø§ÙØ³Ø§Ø¹Ø© Ù¡Ù¡ Ø§ÙØµØ¨Ø­ Ù Ù¢ Ø§ÙØ¸ÙØ±. Ø£Ù ÙÙØª ÙÙØ§Ø³Ø¨Ø'] },
    { en: ['2pm is better. How long does keratin take?'], ar: ['Ø§ÙØ³Ø§Ø¹Ø© Ù¢ Ø£Ø­Ø³Ù. ÙØ¬Ù ÙØ§Ø®Ø° Ø§ÙÙÙØ±Ø§ØªÙÙ ÙÙØªØ'] },
    { en: ["Keratin takes around 2.5 to 3 hours depending on hair length. Fatima's fully available from 2pm. Want me to book it?"], ar: ['Ø§ÙÙÙØ±Ø§ØªÙÙ ÙØ§Ø®Ø° ØªÙØ±ÙØ¨Ø§Ù Ù¢.Ù¥ Ø¥ÙÙ Ù£ Ø³Ø§Ø¹Ø§Øª Ø­Ø³Ø¨ Ø·ÙÙ Ø§ÙØ´Ø¹Ø±. ÙØ§Ø·ÙØ© ÙØ§Ø¶ÙØ© ÙÙ Ø§ÙØ³Ø§Ø¹Ø© Ù¢. Ø£Ø­Ø¬Ø²Ø'] },
    { en: ['Yes! And what\'s the price?'], ar: ['Ø£ÙÙØ¯! ÙØ¬Ù Ø³Ø¹Ø±ÙØ§Ø'] },
    { en: ['Keratin with Fatima is 45 KWD. Includes blow-dry and style finish. Should I put your name down?'], ar: ['Ø§ÙÙÙØ±Ø§ØªÙÙ Ø¹ÙØ¯ ÙØ§Ø·ÙØ© Ø¨Ù Ù¤Ù¥ Ø¯ÙÙØ§Ø±. ÙØ´ÙÙ ÙØ¬ÙÙ ÙØªØ³Ø±ÙØ­Ø© ÙÙØ§Ø¦ÙØ©. Ø£Ø­Ø· Ø§Ø³ÙÙØ'] },
    { en: ["Please, it's Mariam"], ar: ['ÙÙ Ø³ÙØ­ØªÙØ Ø§Ø³ÙÙ ÙØ±ÙÙ'] },
    { en: ['â Booked, Mariam! Saturday 2:00pm with Fatima â Keratin. Reminder coming your way the morning of ð'], ar: ['â ØªÙ Ø§ÙØ­Ø¬Ø² ÙØ§ ÙØ±ÙÙ! Ø§ÙØ³Ø¨Øª Ø§ÙØ³Ø§Ø¹Ø© Ù¢ ÙØ¹ ÙØ§Ø·ÙØ© â ÙÙØ±Ø§ØªÙÙ. Ø±Ø§Ø­ ÙÙØµÙ ØªØ°ÙÙØ± ØµØ¨Ø§Ø­ Ø§ÙÙÙÙ ð'] },
  ],

  spa: [
    { en: ['Hi, I want to book a Swedish massage for this Thursday'], ar: ['ÙÙØ§Ø Ø£Ø¨Ù Ø£Ø­Ø¬Ø² ÙØ³Ø§Ø¬ Ø³ÙÙØ¯Ù ÙÙÙ Ø§ÙØ®ÙÙØ³'] },
    { en: ['Hala! ð Thursday we have availability at 3pm, 5pm, and 7pm. Which time works best for you?'], ar: ['ÙÙØ§ ÙØºÙØ§! ð Ø§ÙØ®ÙÙØ³ Ø¹ÙØ¯ÙØ§ ÙÙØ§Ø¹ÙØ¯ Ø§ÙØ³Ø§Ø¹Ø© Ù£ ÙÙ°Ù¥ ÙÙ°Ù§. Ø£Ù ÙÙØª ÙÙØ§Ø³Ø¨ÙØ'] },
    { en: ['5pm is perfect. How long is the session?'], ar: ['Ø§ÙØ³Ø§Ø¹Ø© Ù¥ ØªÙØ§Ù. ÙØ¬Ù ØªØ§Ø®Ø° Ø§ÙØ¬ÙØ³Ø©Ø'] },
    { en: ['Swedish massage is 60 minutes. We also have a 90-minute option with hot stone for 10 KWD more. Interested in the upgrade?'], ar: ['Ø§ÙÙØ³Ø§Ø¬ Ø§ÙØ³ÙÙØ¯Ù Ù¦Ù  Ø¯ÙÙÙØ©. Ø¹ÙØ¯ÙØ§ ÙØ°ÙÙ Ø®ÙØ§Ø± Ù©Ù  Ø¯ÙÙÙØ© ÙØ¹ Ø§ÙØ­Ø¬Ø§Ø±Ø© Ø§ÙØ³Ø§Ø®ÙØ© Ø¨Ù Ù¡Ù  Ø¯ÙØ§ÙÙØ± Ø¥Ø¶Ø§ÙÙØ©. ØªØ­Ø¨ Ø§ÙØªØ±ÙÙØ©Ø'] },
    { en: ["No thanks, 60 minutes is fine. What's the price?"], ar: ['ÙØ§ Ø´ÙØ±Ø§ÙØ Ù¦Ù  Ø¯ÙÙÙØ© ÙØ§ÙÙ. ÙØ¬Ù Ø§ÙØ³Ø¹Ø±Ø'] },
    { en: ['Swedish massage 60 min is 35 KWD. Includes aromatherapy oils and post-session herbal tea. Shall I book Thursday 5pm for you?'], ar: ['Ø§ÙÙØ³Ø§Ø¬ Ø§ÙØ³ÙÙØ¯Ù Ù¦Ù  Ø¯ÙÙÙØ© Ø¨Ù Ù£Ù¥ Ø¯ÙÙØ§Ø±. ÙØ´ÙÙ Ø²ÙÙØª Ø¹Ø·Ø±ÙØ© ÙØ´Ø§Ù Ø£Ø¹Ø´Ø§Ø¨ Ø¨Ø¹Ø¯ Ø§ÙØ¬ÙØ³Ø©. Ø£Ø­Ø¬Ø²ÙÙ Ø§ÙØ®ÙÙØ³ Ø§ÙØ³Ø§Ø¹Ø© Ù¥Ø'] },
    { en: ['Yes please, my name is Sara'], ar: ['Ø£ÙÙØ¯ÙØ Ø§Ø³ÙÙ Ø³Ø§Ø±Ø©'] },
    { en: ['â Booked, Sara! Thursday 5:00pm â Swedish Massage 60 min. Reminder on WhatsApp the morning of. See you soon! ð¿'], ar: ['â ØªÙ Ø§ÙØ­Ø¬Ø² ÙØ§ Ø³Ø§Ø±Ø©! Ø§ÙØ®ÙÙØ³ Ø§ÙØ³Ø§Ø¹Ø© Ù¥ ÙØ³Ø§Ø¡Ù â ÙØ³Ø§Ø¬ Ø³ÙÙØ¯Ù Ù¦Ù  Ø¯ÙÙÙØ©. Ø±Ø§Ø­ ÙÙØµÙÙ ØªØ°ÙÙØ± ØµØ¨Ø§Ø­ ÙÙÙ Ø§ÙØ®ÙÙØ³. ÙØ´ÙÙÙ! ð¿'] },
  ],

  gym: [
    { en: ['Hi, I want to join the gym. What memberships do you have?'], ar: ['ÙÙØ§Ø Ø£Ø¨Ù Ø£Ø´ØªØ±Ù Ø¨Ø§ÙØ¬ÙÙ. Ø´ÙÙ Ø¹ÙØ¯ÙÙ ÙÙ Ø§Ø´ØªØ±Ø§ÙØ§ØªØ'] },
    { en: ['Hala, welcome! ðª We have 3 options:\nâ¢ Monthly: 35 KWD\nâ¢ 3 Months: 90 KWD\nâ¢ 6 Months: 160 KWD\nAll include full access + locker. Which one interests you?'], ar: ['ÙÙØ§ ÙØºÙØ§Ø Ø­ÙØ§Ù! ðª Ø¹ÙØ¯ÙØ§ Ù£ Ø®ÙØ§Ø±Ø§Øª:\nâ¢ Ø´ÙØ±Ù: Ù£Ù¥ Ø¯ÙÙØ§Ø±\nâ¢ Ù£ Ø£Ø´ÙØ±: Ù©Ù  Ø¯ÙÙØ§Ø±\nâ¢ Ù¦ Ø£Ø´ÙØ±: Ù¡Ù¦Ù  Ø¯ÙÙØ§Ø±\nÙÙÙØ§ ØªØ´ÙÙ Ø¯Ø®ÙÙ ÙØ§ÙÙ + Ø®Ø²Ø§ÙØ©. Ø£Ù ÙØ­Ø¯Ø© ØªØ¨ÙØ'] },
    { en: ['The 3 months sounds good. Do you have personal training too?'], ar: ['Ø§ÙØ«ÙØ§Ø«Ø© Ø£Ø´ÙØ± Ø²ÙÙØ©. ÙØ¹ÙØ¯ÙÙ ØªØ¯Ø±ÙØ¨ Ø´Ø®ØµÙØ'] },
    { en: ['Yes! PT sessions are 15 KWD each or 8 sessions for 100 KWD. Our trainers speak Arabic and English. Want to add PT with your membership?'], ar: ['Ø£ÙÙØ¯ Ø¹ÙØ¯ÙØ§! Ø¬ÙØ³Ø§Øª Ø§ÙØªØ¯Ø±ÙØ¨ Ø§ÙØ´Ø®ØµÙ Ø¨Ù Ù¡Ù¥ Ø¯ÙÙØ§Ø± Ø§ÙØ¬ÙØ³Ø©Ø Ø£Ù Ù¨ Ø¬ÙØ³Ø§Øª Ø¨Ù Ù¡Ù Ù  Ø¯ÙÙØ§Ø±. ÙØ¯Ø±Ø¨ÙÙØ§ ÙØªÙÙÙÙÙ Ø¹Ø±Ø¨Ù ÙØ¥ÙØ¬ÙÙØ²Ù. ØªØ¨Ù ØªØ¶ÙÙ ØªØ¯Ø±ÙØ¨ ÙØ¹ Ø§ÙØ§Ø´ØªØ±Ø§ÙØ'] },
    { en: ["Maybe later. What are the gym hours? And where are you located?"], ar: ['Ø¨Ø¹Ø¯ÙÙ Ø¥Ù Ø´Ø§Ø¡ Ø§ÙÙÙ. ÙØªÙ Ø³Ø§Ø¹Ø§Øª Ø§ÙØ¹ÙÙØ ÙÙÙÙ ÙÙÙØ¹ÙÙØ'] },
    { en: ["We're open 5:30amâ11pm weekdays, 7amâ10pm weekends. Located in Salmiya, near the co-op. I'll send you the location pin on WhatsApp ð"], ar: ['ÙØ§ØªØ­ÙÙ ÙÙ Ù¥:Ù£Ù  Ø§ÙØµØ¨Ø­ Ø¥ÙÙ Ù¡Ù¡ Ø§ÙÙÙÙ Ø£ÙØ§Ù Ø§ÙØ¯ÙØ§ÙØ ÙÙ§ Ø§ÙØµØ¨Ø­ Ø¥ÙÙ Ù¡Ù  Ø§ÙÙÙÙ Ø§ÙØ¹Ø·Ù. ÙÙÙØ¹ÙØ§ ÙÙ Ø§ÙØ³Ø§ÙÙÙØ©Ø ÙØ±ÙØ¨ Ø§ÙØ¬ÙØ¹ÙØ©. Ø£Ø±Ø³ÙÙ Ø§ÙÙÙÙÙØ´Ù Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ð'] },
    { en: ["Perfect. I'll take the 3-month membership. My name is Khalid"], ar: ['ØªÙØ§Ù. Ø£Ø¨Ù Ø§Ø´ØªØ±Ø§Ù Ù£ Ø£Ø´ÙØ±. Ø§Ø³ÙÙ Ø®Ø§ÙØ¯'] },
    { en: ["â Khalid, you're in! 3-month membership registered. Our team will send payment details on WhatsApp within minutes. See you at the gym! ðª"], ar: ['â ÙØ§ Ø®Ø§ÙØ¯Ø ØªÙ ØªØ³Ø¬ÙÙÙ! Ø§Ø´ØªØ±Ø§Ù Ù£ Ø£Ø´ÙØ± ÙØ­Ø¬ÙØ². ÙØ±ÙÙÙØ§ Ø±Ø§Ø­ ÙØ±Ø³ÙÙÙ ØªÙØ§ØµÙÙ Ø§ÙØ¯ÙØ¹ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ Ø¨Ø¯ÙØ§ÙÙ. ÙØ´ÙÙÙ Ø¨Ø§ÙØ¬ÙÙ! ðª'] },
  ],

  garage: [
    { en: ['Hi, I left my Camry with you guys yesterday. Any update?'], ar: ['ÙÙØ§Ø Ø®ÙÙØª Ø§ÙÙØ§ÙØ±Ù Ø¹ÙØ¯ÙÙ Ø£ÙØ³. ÙÙ Ø£Ù ØªØ­Ø¯ÙØ«Ø'] },
    { en: ['Hala! Let me check... Your Camry (plate: 12345) â engine oil done â, AC filter replaced â. Currently waiting on a brake pad part, arrives tomorrow morning Ø¥Ù Ø´Ø§Ø¡ Ø§ÙÙÙ.'], ar: ['ÙÙØ§! Ø£Ø´ÙÙ Ø§ÙØ­ÙÙ... Ø§ÙÙØ§ÙØ±Ù (ÙÙØ­Ø©: Ù¡Ù¢Ù£Ù¤Ù¥) â ØªØºÙÙØ± Ø§ÙØ²ÙØª Ø®ÙØ§Øµ âØ ÙÙØªØ± Ø§ÙØªÙÙÙÙ Ø§ØªØºÙØ± â. Ø§ÙØ­ÙÙ ÙÙØ·Ø± ÙØ·Ø¹Ø© Ø§ÙÙØ±Ø§ÙÙØ ØªÙØµÙ Ø¨Ø§Ø¬Ø± Ø§ÙØµØ¨Ø­ Ø¥Ù Ø´Ø§Ø¡ Ø§ÙÙÙ.'] },
    { en: ['Okay good. And roughly how much is the total going to be?'], ar: ['Ø²ÙÙ. ÙØªÙØ±ÙØ¨Ø§Ù Ø¬Ù ÙØ·ÙØ¹ Ø§ÙØ­Ø³Ø§Ø¨ ÙØ§ÙÙØ'] },
    { en: ["Estimated total: 75â85 KWD depending on the brake pad price. We'll send the exact invoice on WhatsApp once the part arrives. No surprises ð"], ar: ['Ø§ÙØ­Ø³Ø§Ø¨ Ø§ÙÙØªÙÙØ¹: Ù§Ù¥âÙ¨Ù¥ Ø¯ÙÙØ§Ø± Ø­Ø³Ø¨ Ø³Ø¹Ø± ÙØ·Ø¹Ø© Ø§ÙÙØ±Ø§ÙÙ. ÙØ±Ø³Ù Ø§ÙÙØ§ØªÙØ±Ø© Ø§ÙØ¯ÙÙÙØ© Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ÙÙØ§ ØªÙØµÙ Ø§ÙÙØ·Ø¹Ø©. ÙØ§ÙÙ ÙÙØ§Ø¬Ø¢Øª ð'] },
    { en: ['Good. And when will it be fully ready for pickup?'], ar: ['Ø­ÙÙ. ÙÙØªÙ ØªÙÙÙ Ø¬Ø§ÙØ²Ø© ÙÙØ§Ø³ØªÙØ§Ù Ø¨Ø§ÙÙØ§ÙÙØ'] },
    { en: ["If the part arrives on time tomorrow, your Camry will be ready by Thursday afternoon. We'll send you a WhatsApp message the moment it's done â"], ar: ['Ø¥Ø°Ø§ ÙØµÙØª Ø§ÙÙØ·Ø¹Ø© Ø¨Ø§Ø¬Ø± Ø¨ÙÙØªÙØ§Ø Ø§ÙÙØ§ÙØ±Ù ØªÙÙÙ Ø¬Ø§ÙØ²Ø© Ø§ÙØ®ÙÙØ³ Ø¨Ø¹Ø¯ Ø§ÙØ¸ÙØ±. ÙØ±Ø³ÙÙÙ Ø±Ø³Ø§ÙØ© ÙØ§ØªØ³Ø§Ø¨ ÙÙØª ÙØ§ ØªØ®ÙØµ â'] },
    { en: ['Perfect. And can I pay by knet when I pick it up?'], ar: ['ØªÙØ§Ù. ÙØ£ÙØ¯Ø± Ø£Ø¯ÙØ¹ ÙÙ-ÙØª ÙÙØª Ø§ÙØ§Ø³ØªÙØ§ÙØ'] },
    { en: ["Akeed! We accept Knet, cash, and bank transfer. No problem at all. See you Thursday, and laa tsheel hamm â your car is in good hands ð§"], ar: ['Ø£ÙÙØ¯! ÙÙØ¨Ù ÙÙ-ÙØªØ ÙØ§Ø´Ø ÙØªØ­ÙÙÙ Ø¨ÙÙÙ. ÙÙØ§ ÙÙÙÙ. ÙØ´ÙÙÙ Ø§ÙØ®ÙÙØ³Ø ÙØ§ ØªØ´ÙÙ ÙÙ â Ø³ÙØ§Ø±ØªÙ Ø¨Ø£ÙØ¯Ù Ø£ÙÙÙØ© ð§'] },
  ],

  restaurant: [
    { en: ['Hey, do you have a table for 5 this Friday evening?'], ar: ['ÙÙØ§Ø Ø¹ÙØ¯ÙÙ Ø·Ø§ÙÙØ© ÙÙÙ¥ Ø£Ø´Ø®Ø§Øµ ÙÙÙ Ø§ÙØ¬ÙØ¹Ø© Ø§ÙÙØ³Ø§Ø¡Ø'] },
    { en: ['Hala! Friday evening we have availability at 7:30pm and 9:00pm for 5 guests. Any preference?'], ar: ['ÙÙØ§ ÙØºÙØ§! Ø§ÙØ¬ÙØ¹Ø© Ø§ÙÙØ³Ø§Ø¡ Ø¹ÙØ¯ÙØ§ Ø·Ø§ÙÙØ© ÙØªØ§Ø­Ø© Ø§ÙØ³Ø§Ø¹Ø© Ù§:Ù£Ù  ÙØ§ÙØ³Ø§Ø¹Ø© Ù© ÙÙÙ¥ Ø£Ø´Ø®Ø§Øµ. Ø£Ù ÙÙØª ÙÙØ§Ø³Ø¨ÙÙØ'] },
    { en: ['7:30pm works. Is it indoors or outdoors? We prefer outside'], ar: ['Ø§ÙØ³Ø§Ø¹Ø© Ù§:Ù£Ù  ØªÙØ§Ù. ÙÙ Ø§ÙØ·Ø§ÙÙØ© Ø¯Ø§Ø®ÙÙØ© ÙÙØ§ Ø®Ø§Ø±Ø¬ÙØ©Ø ÙØ¨Ù Ø¨Ø±ÙØ©'] },
    { en: ['Great choice! We have outdoor seating available at 7:30pm. Should I reserve an outdoor table for 5 in your name?'], ar: ['Ø®ÙØ§Ø± ÙÙØªØ§Ø²! Ø¹ÙØ¯ÙØ§ Ø¬ÙÙØ³ Ø®Ø§Ø±Ø¬Ù ÙØªØ§Ø­ Ø§ÙØ³Ø§Ø¹Ø© Ù§:Ù£Ù . Ø£Ø­Ø¬Ø²ÙÙÙ Ø·Ø§ÙÙØ© Ø¨Ø±ÙØ© ÙÙÙ¥ Ø¨Ø¥Ø³ÙÙØ'] },
    { en: ['Yes please. Also, do you have a set menu or Ã  la carte?'], ar: ['Ø§Ù ÙÙ Ø³ÙØ­Øª. ÙÙÙ Ø¹ÙØ¯ÙÙ ÙÙÙÙÙ Ø«Ø§Ø¨Øª ÙÙØ§ Ø¨ÙÙÙÙØ'] },
    { en: ["Both! Full Ã  la carte menu plus a weekend set menu at 12 KWD per person (3 courses). I'll send the full menu link on WhatsApp ð½ï¸ What's the name for the reservation?"], ar: ['Ø§ÙØ«ÙÙÙ! ÙØ§Ø¦ÙØ© ÙÙÙÙÙ ÙØ§ÙÙØ© ÙÙØ°ÙÙ Ø§ÙØ¨ÙÙÙÙ ÙÙØ¹Ø·ÙØ© Ø¨Ù Ù¡Ù¢ Ø¯ÙÙØ§Ø± ÙÙØ´Ø®Øµ (Ù£ Ø£Ø·Ø¨Ø§Ù). Ø£Ø±Ø³ÙÙÙ Ø±Ø§Ø¨Ø· Ø§ÙÙÙÙÙ Ø§ÙÙØ§ÙÙ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ ð½ï¸ Ø´ÙÙ Ø§ÙØ§Ø³Ù ÙÙØ­Ø¬Ø²Ø'] },
    { en: ['Nasser Al-Mutairi'], ar: ['ÙØ§ØµØ± Ø§ÙÙØ·ÙØ±Ù'] },
    { en: ['â Reserved, Nasser! Friday 7:30pm, outdoor table for 5. Reminder + menu link coming to you on WhatsApp. See you then! ð'], ar: ['â ØªÙ Ø§ÙØ­Ø¬Ø² ÙØ§ ÙØ§ØµØ±! Ø§ÙØ¬ÙØ¹Ø© Ø§ÙØ³Ø§Ø¹Ø© Ù§:Ù£Ù Ø Ø·Ø§ÙÙØ© Ø¨Ø±ÙØ© ÙÙÙ¥. ØªØ°ÙÙØ± ÙØ±Ø§Ø¨Ø· Ø§ÙÙÙÙÙ ÙÙØµÙÙ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨. ÙØ´ÙÙÙÙ! ð'] },
  ],

  'real-estate': [
    { en: ["Hi, I'm looking for an apartment to buy in Salmiya, budget around 120K"], ar: ['ÙÙØ§Ø Ø£Ø¨Ù Ø£Ø´ØªØ±Ù Ø´ÙØ© ÙÙ Ø§ÙØ³Ø§ÙÙÙØ©Ø ÙÙØ²Ø§ÙÙØªÙ Ø­ÙØ§ÙÙ Ù¡Ù¢Ù  Ø£ÙÙ'] },
    { en: ['Hala, welcome! Great area. Quick question â is this for personal residence or investment?'], ar: ['ÙÙØ§ ÙØºÙØ§Ø Ø­ÙØ§Ù! ÙÙØ·ÙØ© Ø²ÙÙØ©. Ø³Ø¤Ø§Ù Ø³Ø±ÙØ¹ â ÙÙØ³ÙÙ Ø§ÙØ´Ø®ØµÙ ÙÙØ§ Ø§Ø³ØªØ«ÙØ§Ø±Ø'] },
    { en: ['Personal residence. I need at least 3 bedrooms, prefer a high floor'], ar: ['ÙÙØ³ÙÙ. Ø£Ø¨Ù Ø¹ÙÙ Ø§ÙØ£ÙÙ Ù£ ØºØ±ÙØ ÙØ£ÙØ¶Ù Ø·Ø§Ø¨Ù Ø¹Ø§ÙÙ'] },
    { en: ['Perfect. I have 2 matching listings right now:\nâ¢ 110K â 3BR, 8th floor, sea view, 180mÂ²\nâ¢ 118K â 3BR, 12th floor, city view, 165mÂ²\nShall I send photos and full details on WhatsApp?'], ar: ['ÙÙØªØ§Ø². Ø¹ÙØ¯Ù Ø§ÙØ­ÙÙ Ù¢ Ø¹ÙØ§Ø±Ø§Øª ØªÙØ§Ø³Ø¨Ù:\nâ¢ Ù¡Ù¡Ù  Ø£ÙÙ â Ù£ ØºØ±ÙØ Ø·Ø§Ø¨Ù Ù¨Ø Ø¥Ø·ÙØ§ÙØ© Ø¨Ø­Ø±Ø Ù¡Ù¨Ù ÙÂ²\nâ¢ Ù¡Ù¡Ù¨ Ø£ÙÙ â Ù£ ØºØ±ÙØ Ø·Ø§Ø¨Ù Ù¡Ù¢Ø Ø¥Ø·ÙØ§ÙØ© ÙØ¯ÙÙØ©Ø Ù¡Ù¦Ù¥ÙÂ²\nØ£Ø±Ø³ÙÙÙ Ø§ÙØµÙØ± ÙØ§ÙØªÙØ§ØµÙÙ Ø§ÙÙØ§ÙÙØ© Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨Ø'] },
    { en: ['Yes send them. The sea view one sounds interesting'], ar: ['Ø£Ø±Ø³Ù. Ø§ÙÙÙ ÙÙÙØ§ Ø¥Ø·ÙØ§ÙØ© Ø¹ÙÙ Ø§ÙØ¨Ø­Ø±'] },
    { en: ["Sent! ð² The 110K unit is on the 8th floor, direct sea view, 2 parking spots included, building has a pool and gym. Available for viewing anytime this week. When's good for you?"], ar: ['Ø£Ø±Ø³ÙØª! ð² Ø§ÙÙØ­Ø¯Ø© Ø¨Ù Ù¡Ù¡Ù  Ø£ÙÙ ÙÙ Ø§ÙØ·Ø§Ø¨Ù Ø§ÙØ«Ø§ÙÙØ Ø¥Ø·ÙØ§ÙØ© Ø¨Ø­Ø± ÙØ¨Ø§Ø´Ø±Ø©Ø ÙÙØ§ÙÙÙÙ Ø³ÙØ§Ø±Ø§ØªØ ÙÙ Ø§ÙØ¨ÙØ§ÙØ© ÙØ³Ø¨Ø­ ÙØ¬ÙÙ. Ø¬Ø§ÙØ²Ø© ÙÙÙØ¹Ø§ÙÙØ© Ø£Ù ÙÙØª ÙØ§ÙØ£Ø³Ø¨ÙØ¹. ÙØªÙ ÙÙØ§Ø³Ø¨ÙØ'] },
    { en: ['How about tomorrow evening, around 6?'], ar: ['Ø¨Ø§Ø¬Ø± Ø§ÙÙØ³Ø§Ø¡Ø Ø­ÙØ§ÙÙ Ø§ÙØ³Ø§Ø¹Ø© Ù¦Ø'] },
    { en: ["â Viewing confirmed! Tomorrow 6:00pm â Salmiya, 8th floor sea view unit. I'll send you the exact location and our agent's number on WhatsApp. Yalla, see you there! ð¢"], ar: ['â ØªÙØª Ø¬Ø¯ÙÙØ© Ø§ÙÙØ¹Ø§ÙÙØ©! Ø¨Ø§Ø¬Ø± Ø§ÙØ³Ø§Ø¹Ø© Ù¦ ÙØ³Ø§Ø¡Ù â Ø§ÙØ³Ø§ÙÙÙØ©Ø Ø§ÙØ·Ø§Ø¨Ù Ø§ÙØ«Ø§ÙÙØ Ø¥Ø·ÙØ§ÙØ© Ø§ÙØ¨Ø­Ø±. Ø£Ø±Ø³ÙÙÙ Ø§ÙÙÙÙØ¹ Ø§ÙØ¯ÙÙÙ ÙØ±ÙÙ Ø§ÙÙÙÙÙ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨. ÙØ§ÙÙÙ ÙØ´ÙÙÙ ÙÙØ§Ù! ð¢'] },
  ],

  'home-business': [
    { en: ['Hi, I saw your page on Instagram. Do you take custom cake orders?'], ar: ['ÙÙØ§Ø Ø´ÙØª ØµÙØ­ØªÙ Ø¹ÙÙ Ø§ÙØ³ØªØºØ±Ø§Ù. ØªÙØ¨ÙÙÙ Ø·ÙØ¨Ø§Øª ÙÙÙØ§Øª ÙØ®ØµØµØ©Ø'] },
    { en: ['Hala, welcome! ð Yes, I take custom cake orders. What\'s the occasion â birthday, wedding, or something else?'], ar: ['ÙÙØ§ ÙØºÙØ§! ð Ø£ÙÙØ¯ Ø£ÙØ¨Ù Ø·ÙØ¨Ø§Øª ÙØ®ØµØµØ©. Ø´ÙÙ Ø§ÙÙÙØ§Ø³Ø¨Ø© â Ø¹ÙØ¯ ÙÙÙØ§Ø¯Ø Ø£ÙØ±Ø§Ø­Ø ÙÙØ§ Ø´Ù Ø«Ø§ÙÙØ'] },
    { en: ['Birthday cake for 20 people, this Friday. Is that possible?'], ar: ['ÙÙÙØ© Ø¹ÙØ¯ ÙÙÙØ§Ø¯ ÙÙÙ¢Ù  Ø´Ø®ØµØ ÙÙÙ Ø§ÙØ¬ÙØ¹Ø© ÙØ°Ø§. ÙÙÙÙØ'] },
    { en: ["Friday is doable! I need the order by Wednesday to start prep. What flavor and design are you thinking?"], ar: ['Ø§ÙØ¬ÙØ¹Ø© ÙÙÙÙ! Ø£Ø­ØªØ§Ø¬ Ø§ÙØ·ÙØ¨ ÙÙÙ Ø§ÙØ£Ø±Ø¨Ø¹Ø§Ø¡ ÙØ£Ø¨Ø¯Ø£ Ø§ÙØªØ­Ø¶ÙØ±. Ø´ÙÙ Ø§ÙÙÙÙØ© ÙØ§ÙØªØµÙÙÙ Ø§ÙÙÙ ØªØ¨ÙÙØ'] },
    { en: ['Vanilla sponge with strawberry cream. And can you write a name on it?'], ar: ['Ø¥Ø³ÙÙØ¬ÙØ© ÙØ§ÙÙÙØ§ Ø¨ÙØ±ÙÙØ© ÙØ±Ø§ÙÙØ©. ÙØªÙØ¯Ø±ÙÙ ØªÙØªØ¨ÙÙ Ø§Ø³Ù Ø¹ÙÙÙØ§Ø'] },
    { en: ['Absolutely! Name writing is included. A custom cake for 20 people is 28 KWD. Delivery to Kuwait City areas is 3 KWD extra. Shall I confirm your order?'], ar: ['Ø£ÙÙØ¯Ù! ÙØªØ§Ø¨Ø© Ø§ÙØ§Ø³Ù ÙØ´ÙÙÙØ©. ÙÙÙØ© ÙØ®ØµØµØ© ÙÙÙ¢Ù  Ø´Ø®Øµ Ø¨Ù Ù¢Ù¨ Ø¯ÙÙØ§Ø±. Ø§ÙØªÙØµÙÙ ÙÙÙØ§Ø·Ù ÙØ¯ÙÙØ© Ø§ÙÙÙÙØª Ù£ Ø¯ÙØ§ÙÙØ± Ø¥Ø¶Ø§ÙÙØ©. Ø£Ø£ÙØ¯ Ø·ÙØ¨ÙØ'] },
    { en: ["Yes please! My name is Dalal, delivery to Rumaithiya"], ar: ['Ø£ÙÙØ¯Ù! Ø§Ø³ÙÙ Ø¯ÙØ§ÙØ ØªÙØµÙÙ Ø§ÙØ±ÙÙØ«ÙØ©'] },
    { en: ['â Order confirmed, Dalal! Vanilla sponge + strawberry cream for 20, Friday delivery to Rumaithiya â total 31 KWD. I\'ll send payment details on WhatsApp now ð'], ar: ['â ØªÙ ØªØ£ÙÙØ¯ Ø§ÙØ·ÙØ¨ ÙØ§ Ø¯ÙØ§Ù! ÙØ§ÙÙÙØ§ Ø¨ÙØ±Ø§ÙÙØ© ÙÙÙ¢Ù Ø ØªÙØµÙÙ Ø§ÙØ¬ÙØ¹Ø© Ø§ÙØ±ÙÙØ«ÙØ© â Ø§ÙÙØ¬ÙÙØ¹ Ù£Ù¡ Ø¯ÙÙØ§Ø±. Ø£Ø±Ø³ÙÙÙ ØªÙØ§ØµÙÙ Ø§ÙØ¯ÙØ¹ Ø¹ÙÙ ÙØ§ØªØ³Ø§Ø¨ Ø§ÙØ­ÙÙ ð'] },
  ],
}
