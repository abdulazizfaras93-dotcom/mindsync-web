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
    ar: 'الذكي',
    description: {
      en: 'One AI agent, one or two channels, focused tasks',
      ar: 'وكيل ذكي واحد، قناة أو قناتين، مهام محددة',
    },
  },
  pro: {
    en: 'Pro',
    ar: 'المتقدم',
    description: {
      en: 'One or more agents, multiple channels, wider automation',
      ar: 'وكيل أو أكثر، قنوات متعددة، أتمتة أوسع',
    },
  },
  'full-auto': {
    en: 'Full Auto',
    ar: 'المؤتمت',
    description: {
      en: 'Multiple specialized agents, all channels, full operation automation',
      ar: 'عدة وكلاء متخصصين، كل القنوات، أتمتة كاملة للعمليات',
    },
  },
}

// âââ Bundles ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const BUNDLES: Bundle[] = [

  // ââ CLINIC ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'clinic',
    en: 'Clinic AI',
    ar: 'العيادة الذكية',
    industry: { en: 'Health & Dental Clinics', ar: 'العيادات الصحية والأسنان' },
    buildFee: 400,
    painStat: {
      en: 'Clinics lose 30–40% of patients to missed calls and slow follow-ups.',
      ar: 'العيادات تخسر ٣٠–٤٠٪ من المرضى بسبب المكالمات الفائتة والمتابعة البطيئة.',
    },
    icon: 'clinic',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لعيادتك',
            'حجز المواعيد وإرسال التذكيرات تلقائياً',
            'إجابة أسئلة المرضى (الأسعار، التحضير، الموقع، الأوقات)',
            'متاح ٢٤/٧ على واتساب والموقع',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة (hosting، API، دعم)',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 340,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'متابعة المرضى تلقائياً بعد الزيارة',
            'طلب تقييمات Google بعد كل زيارة',
            'إعادة حجز المواعيد الملغاة تلقائياً',
            'لوحة تحليلات المواعيد',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء متخصصين (استقبال، متابعة، تحليل)',
            'حملات استعادة المرضى المنقطعين',
            'إذاعات توعية صحية موسمية',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A clinic answering 40 patient messages a day manually\nis spending 3+ hours on repetitive replies.',
        ar: 'عيادة ترد على ٤٠ رسالة يومياً يدوياً\nتضيّع أكثر من ٣ ساعات في ردود متكررة.',
      },
      painSolution: {
        en: 'A custom AI agent handles every inquiry, books appointments, and follows up — your staff focuses on patients, not phones.',
        ar: 'وكيل ذكاء اصطناعي مخصص يتولى كل استفسار، يحجز المواعيد، ويتابع — فريقك يركز على المرضى مو على التليفون.',
      },
      tasksEliminated: {
        smart: {
          en: ['Answering repetitive patient questions', 'Manual appointment booking', 'Sending reminders by hand'],
          ar: ['الرد على أسئلة المرضى المتكررة', 'حجز المواعيد يدوياً', 'إرسال التذكيرات يدوياً'],
        },
        pro: {
          en: ['Post-visit follow-up calls', 'Chasing Google Reviews manually', 'Re-booking cancelled appointments'],
          ar: ['مكالمات المتابعة بعد الزيارة', 'طلب التقييمات يدوياً', 'إعادة حجز المواعيد الملغاة'],
        },
        'full-auto': {
          en: ['All manual patient communication', 'Campaign planning and sending', 'Monthly reporting'],
          ar: ['كل التواصل اليدوي مع المرضى', 'تخطيط وإرسال الحملات', 'التقارير الشهرية'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ SALON âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'salon',
    en: 'Salon AI',
    ar: 'الصالون الذكي',
    industry: { en: "Men's & Women's Salons", ar: 'صالونات الرجال والسيدات' },
    buildFee: 300,
    painStat: {
      en: 'Salons lose 25% of bookings to unanswered WhatsApp messages.',
      ar: 'الصالونات تخسر ٢٥٪ من حجوزاتها بسبب رسائل واتساب بدون رد.',
    },
    icon: 'salon',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لصالونك',
            'حجز حسب المصفف والخدمة والوقت',
            'أتمتة قائمة الخدمات والأسعار',
            'متاح ٢٤/٧ على واتساب والموقع',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'التعرف على العملاء المتكررين وتتبع الولاء',
            'عروض إضافية عند تأكيد الحجز',
            'طلب تقييمات Google بعد الزيارة',
            'متابعة العملاء الغائبين تلقائياً',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (حجز، متابعة، ولاء)',
            'حملات موسمية (عيد، اليوم الوطني)',
            'حملات استعادة العملاء المنقطعين',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A busy salon gets 60+ WhatsApp messages daily —\nmost go unanswered for hours.',
        ar: 'صالون مشغول يستقبل ٦٠+ رسالة واتساب يومياً —\nأغلبها تبقى بدون رد لساعات.',
      },
      painSolution: {
        en: 'Your AI agent books appointments, confirms times, and follows up — instantly, at any hour.',
        ar: 'وكيلك الذكي يحجز المواعيد، يؤكد الأوقات، ويتابع — فوراً، في أي وقت.',
      },
      tasksEliminated: {
        smart: {
          en: ['Manual booking messages', 'Pricing inquiries', 'Sending reminders'],
          ar: ['رسائل الحجز اليدوية', 'استفسارات الأسعار', 'إرسال التذكيرات'],
        },
        pro: {
          en: ['Loyalty tracking spreadsheets', 'Manual review requests', 'No-show follow-ups'],
          ar: ['جداول تتبع الولاء', 'طلب التقييمات يدوياً', 'متابعة الغائبين'],
        },
        'full-auto': {
          en: ['All client communication', 'Campaign planning', 'Monthly reporting'],
          ar: ['كل التواصل مع العملاء', 'تخطيط الحملات', 'التقارير الشهرية'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ SPA âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'spa',
    en: 'Spa AI',
    ar: 'السبا الذكي',
    industry: { en: 'Spas & Wellness Centers', ar: 'السبا ومراكز العافية' },
    buildFee: 300,
    painStat: {
      en: 'Spas miss 35% of potential bookings from late-night and off-hour inquiries.',
      ar: 'السبا يفقد ٣٥٪ من حجوزاته المحتملة من استفسارات المساء وخارج أوقات الدوام.',
    },
    icon: 'spa',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لسباك',
            'حجز الجلسات حسب المعالج ونوع العلاج',
            'أتمتة قائمة العلاجات والمدة والأسعار',
            'متاح ٢٤/٧ على واتساب والموقع',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'أتمتة عروض الباقات والاشتراكات',
            'متابعة العافية بعد الجلسة',
            'طلب تقييمات Google بعد الزيارة',
            'حفظ تفضيلات العميل',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (حجز، مدرب عافية، ولاء)',
            'حملات عافية موسمية',
            'استعادة العملاء المنقطعين',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'Most spa bookings happen in the evening —\nwhen your staff is off.',
        ar: 'أغلب حجوزات السبا تصير في المساء —\nلما فريقك ينتهي من الدوام.',
      },
      painSolution: {
        en: 'Your AI agent takes bookings and answers questions around the clock — no missed revenue.',
        ar: 'وكيلك الذكي يستقبل الحجوزات ويجيب الأسئلة على مدار الساعة — بدون خسارة حجز.',
      },
      tasksEliminated: {
        smart: {
          en: ['Off-hour booking messages', 'Treatment pricing questions', 'Manual reminders'],
          ar: ['رسائل الحجز خارج أوقات الدوام', 'أسئلة أسعار العلاجات', 'التذكيرات اليدوية'],
        },
        pro: {
          en: ['Upsell conversations', 'Post-session follow-ups', 'Review collection'],
          ar: ['محادثات البيع الإضافي', 'المتابعة بعد الجلسة', 'جمع التقييمات'],
        },
        'full-auto': {
          en: ['All client communication', 'Campaign management', 'Monthly analysis'],
          ar: ['كل التواصل مع العملاء', 'إدارة الحملات', 'التحليل الشهري'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ GYM âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'gym',
    en: 'Gym AI',
    ar: 'الجيم الذكي',
    industry: { en: "Men's & Women's Gyms", ar: 'صالات الجيم للرجال والسيدات' },
    buildFee: 320,
    painStat: {
      en: 'Gyms spend 2+ hours daily on membership inquiries that never convert.',
      ar: 'الجيم يضيّع أكثر من ساعتين يومياً في استفسارات اشتراكات لا تتحول لعملاء.',
    },
    icon: 'gym',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لجيمك',
            'معلومات وأسعار الاشتراكات تلقائياً',
            'تسجيل الأعضاء الجدد',
            'جداول الكلاسات وتوفر المدربين',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 260,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'تذكيرات تجديد الاشتراك تلقائياً',
            'أتمتة عروض التدريب الشخصي',
            'متابعة الأعضاء للحفاظ عليهم',
            'تذكيرات تتبع التقدم',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (مبيعات، استبقاء، مساعد مدرب)',
            'حملات استعادة الأعضاء المنقطعين',
            'حملات تحديات اللياقة الموسمية',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A gym receptionist spends 3 hours answering\n"how much is the membership?" every single day.',
        ar: 'ÙÙØ¸Ù Ø§ÙØ§Ø³ØªÙØ¨Ø§Ù ÙÙ Ø§ÙØ¬ÙÙ ÙØ¶ÙÙØ¹ Ù£ Ø³Ø§Ø¹Ø§Øª ÙÙÙÙØ§Ù\nÙØ¬ÙØ¨ "جم الاشتراك؟" ÙÙ ÙÙÙ.',
      },
      painSolution: {
        en: 'Your AI agent handles all inquiries, registers new members, and follows up renewals — automatically.',
        ar: 'وكيلك الذكي يتولى كل الاستفسارات، يسجل الأعضاء الجدد، ويتابع التجديدات — تلقائياً.',
      },
      tasksEliminated: {
        smart: {
          en: ['Membership price questions', 'Manual registration', 'Class schedule inquiries'],
          ar: ['أسئلة أسعار الاشتراكات', 'التسجيل اليدوي', 'استفسارات جداول الكلاسات'],
        },
        pro: {
          en: ['Renewal reminder calls', 'PT upsell conversations', 'Retention check-ins'],
          ar: ['مكالمات تذكير التجديد', 'محادثات بيع التدريب الشخصي', 'متابعات الاستبقاء'],
        },
        'full-auto': {
          en: ['All member communication', 'Campaign execution', 'Monthly performance reports'],
          ar: ['كل التواصل مع الأعضاء', 'تنفيذ الحملات', 'تقارير الأداء الشهرية'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ GARAGE ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'garage',
    en: 'Garage AI',
    ar: 'الورشة الذكية',
    industry: { en: 'Auto Garages & Service Centers', ar: 'ورش السيارات ومراكز الخدمة' },
    buildFee: 300,
    painStat: {
      en: 'Garage owners spend 2+ hours a day on status update calls they could automate.',
      ar: 'أصحاب الورش يقضون أكثر من ساعتين يومياً في مكالمات تحديثات يمكن أتمتتها.',
    },
    icon: 'garage',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لورشتك',
            'تحديثات حالة السيارة تلقائياً للعملاء',
            'حجز الخدمة وجدولة المواعيد',
            'قائمة الخدمات والأسعار',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 240,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'إرسال الفواتير والتقديرات تلقائياً',
            'تتبع تاريخ الصيانة لكل سيارة',
            'تذكير الصيانة حسب الكيلومترات أو التاريخ',
            'طلب تقييمات Google بعد الخدمة',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (مستشار خدمة، متابعة، تحليل)',
            'حملات استعادة العملاء المنقطعين',
            'عروض خدمة موسمية',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'Every garage customer calls at least twice asking\n"is my car ready?" â hours wasted every day.',
        ar: 'ÙÙ Ø¹ÙÙÙ ÙÙ Ø§ÙÙØ±Ø´Ø© ÙØªØµÙ ÙØ±ØªÙÙ Ø¹ÙÙ Ø§ÙØ£ÙÙ\n"سيارتي خلصت؟" â Ø³Ø§Ø¹Ø§Øª ØªØ¶ÙØ¹ ÙÙ ÙÙÙ.',
      },
      painSolution: {
        en: 'Your AI agent sends real-time car status updates and handles all inquiries — zero interruptions to your team.',
        ar: 'وكيلك الذكي يرسل تحديثات حالة السيارة فورياً ويتولى كل الاستفسارات — فريقك بدون انقطاع.',
      },
      tasksEliminated: {
        smart: {
          en: ['Status update calls', 'Service pricing inquiries', 'Manual booking'],
          ar: ['مكالمات تحديث الحالة', 'استفسارات أسعار الخدمة', 'الحجز اليدوي'],
        },
        pro: {
          en: ['Invoice sending', 'Maintenance reminder calls', 'Review requests'],
          ar: ['إرسال الفواتير', 'مكالمات تذكير الصيانة', 'طلب التقييمات'],
        },
        'full-auto': {
          en: ['All customer communication', 'Campaign execution', 'Performance reporting'],
          ar: ['كل التواصل مع العملاء', 'تنفيذ الحملات', 'تقارير الأداء'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ RESTAURANT ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'restaurant',
    en: 'Restaurant AI',
    ar: 'المطعم الذكي',
    industry: { en: 'Restaurants, Cafes & F&B', ar: 'المطاعم والمقاهي والفود آند بيفرج' },
    buildFee: 380,
    painStat: {
      en: 'Restaurants lose 20% of reservation requests during peak hours when staff is too busy to reply.',
      ar: 'المطاعم تخسر ٢٠٪ من طلبات الحجز أوقات الذروة لما الفريق مشغول ما يقدر يرد.',
    },
    icon: 'restaurant',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لمطعمك',
            'حجز الطاولات وعدد الأشخاص',
            'معلومات المنيو والخيارات الغذائية والأسعار',
            'متاح ٢٤/٧ على واتساب والموقع',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 300,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'بيع إضافي قبل الوصول (حلويات، إعداد مناسبات)',
            'استطلاع رأي ما بعد الزيارة وطلب تقييمات Google',
            'أتمتة معالجة الطلبات الإلكترونية',
            'تدفق حجز المناسبات الخاصة',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (استقبال، طلبات، ولاء)',
            'التعرف على العملاء المميزين',
            'إذاعات المنيو الموسمي والعروض',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'On a busy Friday night, your team misses 15 reservation\nrequests — that\'s real revenue walking out the door.',
        ar: 'ليلة الجمعة المزدحمة، فريقك يضيّع ١٥ طلب حجز —\nهذا إيراد فعلي يخرج من الباب.',
      },
      painSolution: {
        en: 'Your AI agent handles reservations, menu questions, and upsells — even during your busiest hours.',
        ar: 'وكيلك الذكي يتولى الحجوزات واستفسارات المنيو والبيع الإضافي — حتى في أكثر أوقاتك ازدحاماً.',
      },
      tasksEliminated: {
        smart: {
          en: ['Reservation calls & messages', 'Menu inquiries', 'Availability checking'],
          ar: ['مكالمات ورسائل الحجز', 'استفسارات المنيو', 'فحص التوفر'],
        },
        pro: {
          en: ['Upsell conversations', 'Post-visit feedback collection', 'Online order management'],
          ar: ['محادثات البيع الإضافي', 'جمع آراء ما بعد الزيارة', 'إدارة الطلبات الإلكترونية'],
        },
        'full-auto': {
          en: ['All guest communication', 'Campaign management', 'Monthly revenue analysis'],
          ar: ['كل التواصل مع الضيوف', 'إدارة الحملات', 'تحليل الإيرادات الشهري'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ REAL ESTATE âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'real-estate',
    en: 'Real Estate AI',
    ar: 'العقارات الذكية',
    industry: { en: 'Real Estate Brokers & Agencies', ar: 'وسطاء العقارات والشركات العقارية' },
    buildFee: 450,
    painStat: {
      en: 'Real estate brokers miss 40% of leads because responses take more than 30 minutes.',
      ar: 'وسطاء العقارات يفقدون ٤٠٪ من العملاء المحتملين لأن الرد يتأخر أكثر من ٣٠ دقيقة.',
    },
    icon: 'real-estate',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لعقاراتك',
            'مطابقة فورية للعقارات حسب الميزانية والتفضيلات',
            'جدولة مواعيد المعاينة',
            'معلومات العقار والصور والموقع',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'website', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 380,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'تأهيل وتقييم العملاء المحتملين تلقائياً',
            'تسلسل المتابعة بعد المعاينة',
            'تنبيهات العقارات الجديدة للعملاء المهتمين',
            'أتمتة تقارير السوق',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'عدة وكلاء (مبيعات، متابعة، محلل سوق)',
            'تسلسلات رعاية العملاء على المدى الطويل',
            'تحديثات محافظ المستثمرين تلقائياً',
            'أتمتة كاملة عبر جميع القنوات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'app', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A real estate lead who doesn\'t get a reply in 5 minutes\ngoes to the next broker. Always.',
        ar: 'عميل العقارات اللي ما يجيه رد في ٥ دقائق\nيروح للوسيط الثاني. دائماً.',
      },
      painSolution: {
        en: 'Your AI agent responds instantly, qualifies the lead, matches properties, and books viewings — even at midnight.',
        ar: 'وكيلك الذكي يرد فوراً، يؤهّل العميل، يطابق العقارات، ويحجز المعاينات — حتى منتصف الليل.',
      },
      tasksEliminated: {
        smart: {
          en: ['Initial inquiry responses', 'Property matching manually', 'Viewing scheduling'],
          ar: ['الردود الأولية على الاستفسارات', 'مطابقة العقارات يدوياً', 'جدولة المعاينات'],
        },
        pro: {
          en: ['Lead qualification calls', 'Post-viewing follow-ups', 'Market report preparation'],
          ar: ['مكالمات تأهيل العملاء', 'المتابعة بعد المعاينة', 'تحضير تقارير السوق'],
        },
        'full-auto': {
          en: ['All client communication', 'Lead nurturing campaigns', 'Portfolio reporting'],
          ar: ['كل التواصل مع العملاء', 'حملات رعاية العملاء', 'تقارير المحافظ'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },

  // ââ HOME BUSINESS ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  {
    id: 'home-business',
    en: 'Home Business AI',
    ar: 'المشروع المنزلي الذكي',
    industry: { en: 'Home-based Businesses & Micro Brands', ar: 'المشاريع المنزلية والعلامات الصغيرة' },
    buildFee: 250,
    painStat: {
      en: 'Home business owners spend 5–6 hours daily managing WhatsApp orders manually.',
      ar: 'أصحاب المشاريع المنزلية يقضون ٥–٦ ساعات يومياً في إدارة طلبات واتساب يدوياً.',
    },
    icon: 'home-business',
    color: '#153E2D',
    tiers: [
      {
        id: 'smart',
        en: 'Smart',
        ar: 'الذكي',
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
            'وكيل ذكاء اصطناعي مخصص لمشروعك',
            'استقبال الطلبات والتأكيد تلقائياً',
            'ردود الكتالوج والأسعار',
            'معلومات التوصيل والمناطق',
            'لوحة تحكم العميل',
            'صيانة شهرية شاملة',
          ],
        },
        channels: ['whatsapp', 'portal'],
      },
      {
        id: 'pro',
        en: 'Pro',
        ar: 'المتقدم',
        retainer: 200,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
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
            'كل ما في الذكي',
            'التعرف على العملاء المتكررين والولاء',
            'اقتراح منتجات إضافية عند تأكيد الطلب',
            'طلب تقييمات Google بعد التوصيل',
            'متابعة الاستفسارات غير المكتملة',
            'واتساب + موقع + انستقرام',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
      {
        id: 'full-auto',
        en: 'Full Auto',
        ar: 'المؤتمت',
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
            'كل ما في المتقدم',
            'حملات موسمية (عيد، اليوم الوطني)',
            'حملات استعادة العملاء المنقطعين',
            'نموذج طلب مخصص عبر واتساب',
            'بث جماعي لقائمة العملاء',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
        channels: ['whatsapp', 'website', 'instagram', 'portal', 'analytics'],
      },
    ],
    scenario: {
      painHeadline: {
        en: 'A home business owner spends her entire morning\nanswering the same 10 WhatsApp questions.',
        ar: 'صاحبة مشروع منزلي تقضي كل صباحها\nترد على نفس الـ١٠ أسئلة على واتساب.',
      },
      painSolution: {
        en: 'Your AI agent handles orders, answers questions, and follows up customers — giving you your time back.',
        ar: 'وكيلك الذكي يتولى الطلبات، يجيب الأسئلة، ويتابع العملاء — يرجعلك وقتك.',
      },
      tasksEliminated: {
        smart: {
          en: ['Order inquiry replies', 'Pricing & catalogue messages', 'Delivery area questions'],
          ar: ['ردود استفسارات الطلبات', 'رسائل الأسعار والكتالوج', 'أسئلة مناطق التوصيل'],
        },
        pro: {
          en: ['Loyalty tracking', 'Upsell conversations', 'Review collection'],
          ar: ['تتبع الولاء', 'محادثات البيع الإضافي', 'جمع التقييمات'],
        },
        'full-auto': {
          en: ['All customer communication', 'Campaign management', 'Monthly order analysis'],
          ar: ['كل التواصل مع العملاء', 'إدارة الحملات', 'تحليل الطلبات الشهري'],
        },
      },
      tierCtas: {
        smart:       { en: 'Start with Smart', ar: 'ابدأ بالذكي' },
        pro:         { en: 'Go Pro', ar: 'اختر المتقدم' },
        'full-auto': { en: 'Full Automation', ar: 'الأتمتة الكاملة' },
      },
    },
  },
]

// âââ Website Services âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const WEBSITE_SERVICES: WebsiteService[] = [
  {
    id: 'landing-page',
    en: 'Landing Page',
    ar: 'صفحة هبوط',
    price: 300,
    deliveryDays: [5, 7],
    monthlyMaintenance: 80,
    features: {
      en: [
        '1–3 pages, bilingual AR/EN',
        'Mobile-responsive design',
        'Basic SEO setup',
        'Contact / WhatsApp CTA',
        'Hosting & domain setup',
      ],
      ar: [
        '١–٣ صفحات، ثنائي اللغة AR/EN',
        'تصميم متجاوب مع الجوال',
        'إعداد SEO أساسي',
        'زر تواصل / واتساب',
        'إعداد الاستضافة والدومين',
      ],
    },
  },
  {
    id: 'business-website',
    en: 'Business Website',
    ar: 'موقع تجاري',
    price: 550,
    deliveryDays: [10, 14],
    monthlyMaintenance: 80,
    features: {
      en: [
        '5–8 pages, bilingual AR/EN',
        'Mobile-responsive design',
        'Full SEO setup',
        'Services / portfolio pages',
        'Hosting & domain setup',
      ],
      ar: [
        '٥–٨ صفحات، ثنائي اللغة AR/EN',
        'تصميم متجاوب مع الجوال',
        'إعداد SEO كامل',
        'صفحات خدمات / معرض أعمال',
        'إعداد الاستضافة والدومين',
      ],
    },
  },
  {
    id: 'advanced-website',
    en: 'Advanced Website',
    ar: 'موقع متقدم',
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
        'خصائص مخصصة (متجر، حجز، لوحة تحكم)',
        'ثنائي اللغة AR/EN مع RTL',
        'ربط بوابة الدفع',
        'SEO متقدم وأداء عالي',
        'إعداد الاستضافة والدومين',
      ],
    },
  },
]

// âââ App Services âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const APP_SERVICES: AppService[] = [
  {
    id: 'simple-app',
    en: 'Simple App',
    ar: 'تطبيق بسيط',
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
        'ثنائي اللغة AR/EN مع RTL',
        'خصائص الأعمال الأساسية',
        'نشر على App Store + Google Play',
        'إشعارات أساسية',
      ],
    },
  },
  {
    id: 'advanced-app',
    en: 'Advanced App',
    ar: 'تطبيق متقدم',
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
        'ثنائي اللغة AR/EN مع RTL',
        'خصائص مخصصة (حجز، دفع، طلبات، ولاء)',
        'نشر على App Store + Google Play',
        'إشعارات متقدمة وتحليلات',
      ],
    },
  },
]

// âââ Free Trial Offer âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export const FREE_TRIAL = {
  en: {
    badge: '1-Week Free Trial',
    headline: 'Not sure yet? Try it first.',
    body: 'We build your actual AI system based on your business. Run it for 7 days — no payment needed. If you love it, we activate. If not, no charge.',
    cta: 'Request Your Free Trial',
  },
  ar: {
    badge: 'أسبوع تجربة مجانية',
    headline: 'مو متأكد بعد؟ جرّب أول.',
    body: 'نبني نظامك الذكي الفعلي بناءً على مشروعك. شغّله أسبوع — بدون أي دفع. إذا عجبك، نفعّله. إذا لا، ما في أي تكلفة.',
    cta: 'اطلب تجربتك المجانية',
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
    name: 'نظام ذكاء اصطناعي مخصص',
    desc: 'مشروعك ما يناسب الـ٨ قطاعات؟ ولا يهمك — نصمم ونبني نظام وكيل ذكاء اصطناعي مخصص بالكامل بعد مكالمة استشارة.',
    cta: 'احجز استشارة',
  },
}

// âââ Demo Conversations (Kuwaiti dialect) âââââââââââââââââââââââââââââââââââââ

export const DEMO_CONVERSATIONS: Record<string, { en: string[]; ar: string[] }[]> = {

  clinic: [
    { en: ['Hi, I need to book a dental appointment for a cleaning'], ar: ['هلا، أبي أحجز موعد عند دكتور الأسنان، تنظيف أسنان'] },
    { en: ['Hala! 😊 We have slots available this week. Which day works best for you — weekday or weekend?'], ar: ['هلا وغلا! 😊 عندنا مواعيد متاحة هالأسبوع. متى تحب؟ — يوم دوام ولا عطلة؟'] },
    { en: ['Wednesday evening if possible, around 6 or 7pm'], ar: ['الأربعاء المساء لو في، حوالي ٦ أو ٧'] },
    { en: ['Perfect! Wednesday we have 6:00pm and 7:30pm open. Which one works for you?'], ar: ['زين! الأربعاء عندنا الساعة ٦ مساءً و ٧:٣٠. أي وقت يناسبك؟'] },
    { en: ['6pm is great. Also — how much does a cleaning cost?'], ar: ['الساعة ٦ تمام. وبس — جم سعر التنظيف؟'] },
    { en: ['Cleaning is 25 KWD. Includes scaling, polishing, and a full checkup. Shall I confirm the 6pm slot for you?'], ar: ['التنظيف بـ ٢٥ دينار. يشمل التنظيف العميق والتلميع وفحص كامل. أأكد لك موعد الساعة ٦؟'] },
    { en: ['Yes please, my name is Ahmad Al-Rashidi'], ar: ['أكيد، اسمي أحمد الراشدي'] },
    { en: ["â Done, Ahmad! Wednesday 6:00pm confirmed. You'll get a WhatsApp reminder 2 hours before. See you then! ð¦·"], ar: ['✅ تم يا أحمد! الأربعاء الساعة ٦ مساءً مؤكد. راح يوصلك تذكير على واتساب قبل ساعتين. نشوفك على خير! 🦷'] },
  ],

  salon: [
    { en: ['Hey, is Fatima available this Saturday for a keratin treatment?'], ar: ['هلا، فاطمة فاضيه يوم السبت؟ أبي أسوي كيراتين'] },
    { en: ["Hala! Let me check Fatima's schedule... â She has Saturday at 11am and 2pm open. Which works?"], ar: ['هلا! ثواني أشوف جدول فاطمة الحين... ✅ عندها السبت الساعة ١١ الصبح و ٢ الظهر. أي وقت يناسب؟'] },
    { en: ['2pm is better. How long does keratin take?'], ar: ['الساعة ٢ أحسن. وجم ياخذ الكيراتين وقت؟'] },
    { en: ["Keratin takes around 2.5 to 3 hours depending on hair length. Fatima's fully available from 2pm. Want me to book it?"], ar: ['الكيراتين ياخذ تقريباً ٢.٥ إلى ٣ ساعات حسب طول الشعر. فاطمة فاضية من الساعة ٢. أحجز؟'] },
    { en: ['Yes! And what\'s the price?'], ar: ['أكيد! وجم سعرها؟'] },
    { en: ['Keratin with Fatima is 45 KWD. Includes blow-dry and style finish. Should I put your name down?'], ar: ['الكيراتين عند فاطمة بـ ٤٥ دينار. يشمل مجفف وتسريحة نهائية. أحط اسمك؟'] },
    { en: ["Please, it's Mariam"], ar: ['لو سمحتي، اسمي مريم'] },
    { en: ['✅ Booked, Mariam! Saturday 2:00pm with Fatima — Keratin. Reminder coming your way the morning of 💅'], ar: ['✅ تم الحجز يا مريم! السبت الساعة ٢ مع فاطمة — كيراتين. راح يوصل تذكير صباح اليوم 💅'] },
  ],

  spa: [
    { en: ['Hi, I want to book a Swedish massage for this Thursday'], ar: ['هلا، أبي أحجز مساج سويدي يوم الخميس'] },
    { en: ['Hala! 😊 Thursday we have availability at 3pm, 5pm, and 7pm. Which time works best for you?'], ar: ['هلا وغلا! 😊 الخميس عندنا مواعيد الساعة ٣ وٰ٥ وٰ٧. أي وقت يناسبك؟'] },
    { en: ['5pm is perfect. How long is the session?'], ar: ['الساعة ٥ تمام. وجم تاخذ الجلسة؟'] },
    { en: ['Swedish massage is 60 minutes. We also have a 90-minute option with hot stone for 10 KWD more. Interested in the upgrade?'], ar: ['المساج السويدي ٦٠ دقيقة. عندنا كذلك خيار ٩٠ دقيقة مع الحجارة الساخنة بـ ١٠ دنانير إضافية. تحب الترقية؟'] },
    { en: ["No thanks, 60 minutes is fine. What's the price?"], ar: ['لا شكراً، ٦٠ دقيقة كافي. وجم السعر؟'] },
    { en: ['Swedish massage 60 min is 35 KWD. Includes aromatherapy oils and post-session herbal tea. Shall I book Thursday 5pm for you?'], ar: ['المساج السويدي ٦٠ دقيقة بـ ٣٥ دينار. يشمل زيوت عطرية وشاي أعشاب بعد الجلسة. أحجزلك الخميس الساعة ٥؟'] },
    { en: ['Yes please, my name is Sara'], ar: ['أكيدي، اسمي سارة'] },
    { en: ['✅ Booked, Sara! Thursday 5:00pm — Swedish Massage 60 min. Reminder on WhatsApp the morning of. See you soon! 🌿'], ar: ['✅ تم الحجز يا سارة! الخميس الساعة ٥ مساءً — مساج سويدي ٦٠ دقيقة. راح يوصلك تذكير صباح يوم الخميس. نشوفك! 🌿'] },
  ],

  gym: [
    { en: ['Hi, I want to join the gym. What memberships do you have?'], ar: ['هلا، أبي أشترك بالجيم. شنو عندكم من اشتراكات؟'] },
    { en: ['Hala, welcome! 💪 We have 3 options:\n• Monthly: 35 KWD\n• 3 Months: 90 KWD\n• 6 Months: 160 KWD\nAll include full access + locker. Which one interests you?'], ar: ['هلا وغلا، حياك! 💪 عندنا ٣ خيارات:\n• شهري: ٣٥ دينار\n• ٣ أشهر: ٩٠ دينار\n• ٦ أشهر: ١٦٠ دينار\nكلها تشمل دخول كامل + خزانة. أي وحدة تبي؟'] },
    { en: ['The 3 months sounds good. Do you have personal training too?'], ar: ['الثلاثة أشهر زينة. وعندكم تدريب شخصي؟'] },
    { en: ['Yes! PT sessions are 15 KWD each or 8 sessions for 100 KWD. Our trainers speak Arabic and English. Want to add PT with your membership?'], ar: ['أكيد عندنا! جلسات التدريب الشخصي بـ ١٥ دينار الجلسة، أو ٨ جلسات بـ ١٠٠ دينار. مدربينا يتكلمون عربي وإنجليزي. تبي تضيف تدريب مع الاشتراك؟'] },
    { en: ["Maybe later. What are the gym hours? And where are you located?"], ar: ['بعدين إن شاء الله. متى ساعات العمل؟ ووين موقعكم؟'] },
    { en: ["We're open 5:30am–11pm weekdays, 7am–10pm weekends. Located in Salmiya, near the co-op. I'll send you the location pin on WhatsApp ð"], ar: ['فاتحين من ٥:٣٠ الصبح إلى ١١ الليل أيام الدوام، و٧ الصبح إلى ١٠ الليل العطل. موقعنا في السالمية، قريب الجمعية. أرسلك اللوكيشن على واتساب 📍'] },
    { en: ["Perfect. I'll take the 3-month membership. My name is Khalid"], ar: ['تمام. أبي اشتراك ٣ أشهر. اسمي خالد'] },
    { en: ["â Khalid, you're in! 3-month membership registered. Our team will send payment details on WhatsApp within minutes. See you at the gym! ðª"], ar: ['✅ يا خالد، تم تسجيلك! اشتراك ٣ أشهر محجوز. فريقنا راح يرسللك تفاصيل الدفع على واتساب بدقايق. نشوفك بالجيم! 💪'] },
  ],

  garage: [
    { en: ['Hi, I left my Camry with you guys yesterday. Any update?'], ar: ['هلا، خليت الكامري عندكم أمس. في أي تحديث؟'] },
    { en: ['Hala! Let me check... Your Camry (plate: 12345) — engine oil done ✅, AC filter replaced ✅. Currently waiting on a brake pad part, arrives tomorrow morning إن شاء الله.'], ar: ['هلا! أشوف الحين... الكامري (لوحة: ١٢٣٤٥) — تغيير الزيت خلاص ✅، فلتر التكييف اتغير ✅. الحين ننطر قطعة الفرامل، توصل باجر الصبح إن شاء الله.'] },
    { en: ['Okay good. And roughly how much is the total going to be?'], ar: ['زين. وتقريباً جم يطلع الحساب كامل؟'] },
    { en: ["Estimated total: 75â85 KWD depending on the brake pad price. We'll send the exact invoice on WhatsApp once the part arrives. No surprises ð"], ar: ['الحساب المتوقع: ٧٥–٨٥ دينار حسب سعر قطعة الفرامل. نرسل الفاتورة الدقيقة على واتساب لما توصل القطعة. ماكو مفاجآت 👍'] },
    { en: ['Good. And when will it be fully ready for pickup?'], ar: ['حلو. ومتى تكون جاهزة للاستلام بالكامل؟'] },
    { en: ["If the part arrives on time tomorrow, your Camry will be ready by Thursday afternoon. We'll send you a WhatsApp message the moment it's done â"], ar: ['إذا وصلت القطعة باجر بوقتها، الكامري تكون جاهزة الخميس بعد الظهر. نرسللك رسالة واتساب وقت ما تخلص ✅'] },
    { en: ['Perfect. And can I pay by knet when I pick it up?'], ar: ['تمام. وأقدر أدفع كي-نت وقت الاستلام؟'] },
    { en: ["Akeed! We accept Knet, cash, and bank transfer. No problem at all. See you Thursday, and laa tsheel hamm — your car is in good hands 🔧"], ar: ['أكيد! نقبل كي-نت، كاش، وتحويل بنكي. ولا يهمك. نشوفك الخميس، لا تشيل هم — سيارتك بأيدٍ أمينة 🔧'] },
  ],

  restaurant: [
    { en: ['Hey, do you have a table for 5 this Friday evening?'], ar: ['هلا، عندكم طاولة لـ٥ أشخاص يوم الجمعة المساء؟'] },
    { en: ['Hala! Friday evening we have availability at 7:30pm and 9:00pm for 5 guests. Any preference?'], ar: ['هلا وغلا! الجمعة المساء عندنا طاولة متاحة الساعة ٧:٣٠ والساعة ٩ لـ٥ أشخاص. أي وقت يناسبكم؟'] },
    { en: ['7:30pm works. Is it indoors or outdoors? We prefer outside'], ar: ['الساعة ٧:٣٠ تمام. هل الطاولة داخلية ولا خارجية؟ نبي برّة'] },
    { en: ['Great choice! We have outdoor seating available at 7:30pm. Should I reserve an outdoor table for 5 in your name?'], ar: ['خيار ممتاز! عندنا جلوس خارجي متاح الساعة ٧:٣٠. أحجزلكم طاولة برّة لـ٥ بإسمك؟'] },
    { en: ['Yes please. Also, do you have a set menu or Ã  la carte?'], ar: ['اي لو سمحت. وهل عندكم مينيو ثابت ولا بوفيه؟'] },
    { en: ["Both! Full Ã  la carte menu plus a weekend set menu at 12 KWD per person (3 courses). I'll send the full menu link on WhatsApp 🍽️ What's the name for the reservation?"], ar: ['الثنين! قائمة مينيو كاملة وكذلك البوفيه للعطلة بـ ١٢ دينار للشخص (٣ أطباق). أرسللك رابط المنيو الكامل على واتساب 🍽️ شنو الاسم للحجز؟'] },
    { en: ['Nasser Al-Mutairi'], ar: ['ناصر المطيري'] },
    { en: ['✅ Reserved, Nasser! Friday 7:30pm, outdoor table for 5. Reminder + menu link coming to you on WhatsApp. See you then! 🌟'], ar: ['✅ تم الحجز يا ناصر! الجمعة الساعة ٧:٣٠، طاولة برّة لـ٥. تذكير ورابط المنيو يوصلك على واتساب. نشوفكم! 🌟'] },
  ],

  'real-estate': [
    { en: ["Hi, I'm looking for an apartment to buy in Salmiya, budget around 120K"], ar: ['هلا، أبي أشتري شقة في السالمية، ميزانيتي حوالي ١٢٠ ألف'] },
    { en: ['Hala, welcome! Great area. Quick question — is this for personal residence or investment?'], ar: ['هلا وغلا، حياك! منطقة زينة. سؤال سريع — للسكن الشخصي ولا استثمار؟'] },
    { en: ['Personal residence. I need at least 3 bedrooms, prefer a high floor'], ar: ['للسكن. أبي على الأقل ٣ غرف، وأفضل طابق عالي'] },
    { en: ['Perfect. I have 2 matching listings right now:\n• 110K — 3BR, 8th floor, sea view, 180m²\n• 118K — 3BR, 12th floor, city view, 165m²\nShall I send photos and full details on WhatsApp?'], ar: ['ممتاز. عندي الحين ٢ عقارات تناسبك:\n• ١١٠ ألف — ٣ غرف، طابق ٨، إطلالة بحر، ١٨٠م²\n• ١١٨ ألف — ٣ غرف، طابق ١٢، إطلالة مدينة، ١٦٥م²\nأرسللك الصور والتفاصيل الكاملة على واتساب؟'] },
    { en: ['Yes send them. The sea view one sounds interesting'], ar: ['أرسل. اللي فيها إطلالة على البحر'] },
    { en: ["Sent! ð² The 110K unit is on the 8th floor, direct sea view, 2 parking spots included, building has a pool and gym. Available for viewing anytime this week. When's good for you?"], ar: ['أرسلت! 📲 الوحدة بـ ١١٠ ألف في الطابق الثامن، إطلالة بحر مباشرة، مواقفين سيارات، في البناية مسبح وجيم. جاهزة للمعاينة أي وقت هالأسبوع. متى يناسبك؟'] },
    { en: ['How about tomorrow evening, around 6?'], ar: ['باجر المساء، حوالي الساعة ٦؟'] },
    { en: ["â Viewing confirmed! Tomorrow 6:00pm â Salmiya, 8th floor sea view unit. I'll send you the exact location and our agent's number on WhatsApp. Yalla, see you there! ð¢"], ar: ['✅ تمت جدولة المعاينة! باجر الساعة ٦ مساءً — السالمية، الطابق الثامن، إطلالة البحر. أرسللك الموقع الدقيق ورقم الوكيل على واتساب. يالله نشوفك هناك! 🏢'] },
  ],

  'home-business': [
    { en: ['Hi, I saw your page on Instagram. Do you take custom cake orders?'], ar: ['هلا، شفت صفحتك على انستغرام. تقبلين طلبات كيكات مخصصة؟'] },
    { en: ['Hala, welcome! 😊 Yes, I take custom cake orders. What\'s the occasion â birthday, wedding, or something else?'], ar: ['هلا وغلا! 😊 أكيد أقبل طلبات مخصصة. شنو المناسبة — عيد ميلاد، أفراح، ولا شي ثاني؟'] },
    { en: ['Birthday cake for 20 people, this Friday. Is that possible?'], ar: ['كيكة عيد ميلاد لـ٢٠ شخص، يوم الجمعة هذا. ممكن؟'] },
    { en: ["Friday is doable! I need the order by Wednesday to start prep. What flavor and design are you thinking?"], ar: ['الجمعة ممكن! أحتاج الطلب يوم الأربعاء لأبدأ التحضير. شنو النكهة والتصميم اللي تبيه؟'] },
    { en: ['Vanilla sponge with strawberry cream. And can you write a name on it?'], ar: ['إسفنجية فانيلا بكريمة فراولة. وتقدرين تكتبين اسم عليها؟'] },
    { en: ['Absolutely! Name writing is included. A custom cake for 20 people is 28 KWD. Delivery to Kuwait City areas is 3 KWD extra. Shall I confirm your order?'], ar: ['أكيدي! كتابة الاسم مشمولة. كيكة مخصصة لـ٢٠ شخص بـ ٢٨ دينار. التوصيل لمناطق مدينة الكويت ٣ دنانير إضافية. أأكد طلبك؟'] },
    { en: ["Yes please! My name is Dalal, delivery to Rumaithiya"], ar: ['أكيدي! اسمي دلال، توصيل الرميثية'] },
    { en: ['✅ Order confirmed, Dalal! Vanilla sponge + strawberry cream for 20, Friday delivery to Rumaithiya — total 31 KWD. I\'ll send payment details on WhatsApp now ð'], ar: ['✅ تم تأكيد الطلب يا دلال! فانيلا بفراولة لـ٢٠، توصيل الجمعة الرميثية — المجموع ٣١ دينار. أرسللك تفاصيل الدفع على واتساب الحين 🎂'] },
  ],
}
