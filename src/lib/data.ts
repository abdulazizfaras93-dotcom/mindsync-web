export type TierId = 'essential' | 'advanced' | 'full-stack'

export type BundleTier = {
  id: TierId
  en: string
  ar: string
  retainer: number
  badge?: { en: string; ar: string }
  features: { en: string[]; ar: string[] }
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
}

export const BUNDLES: Bundle[] = [
  {
    id: 'clinic',
    en: 'Clinic AI',
    ar: 'العيادة الذكية',
    industry: { en: 'Health & Dental Clinics', ar: 'العيادات الصحية والأسنان' },
    buildFee: 640,
    painStat: {
      en: '67% of patient inquiries can be resolved without a single staff member.',
      ar: '٦٧٪ من استفسارات المرضى يمكن حلها دون أي موظف.',
    },
    icon: '🏥',
    color: '#153E2D',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 240,
        features: {
          en: [
            'WhatsApp AI Receptionist (24/7)',
            'Appointment Booking & Reminders',
            'Patient FAQ Bot (pricing, prep, directions)',
            'CRM Setup & Training',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'مساعد واتساب ذكي (٢٤/٧)',
            'حجز المواعيد والتذكيرات',
            'بوت الأسئلة الشائعة',
            'إعداد نظام CRM والتدريب',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 380,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'Cancellation Auto-Fill from Waitlist',
            'Post-Treatment Follow-up Sequence (Day 1 / 7 / 30)',
            'Google Review Request Automation',
            'Patient Reactivation Campaigns',
            'Pre-Visit Prep Checklist via WhatsApp',
          ],
          ar: [
            'كل ما في الأساسية',
            'ملء الإلغاءات تلقائياً من قائمة الانتظار',
            'متابعة ما بعد العلاج (اليوم ١ / ٧ / ٣٠)',
            'أتمتة طلب تقييمات Google',
            'حملات إعادة تنشيط المرضى',
            'قائمة تحضير ما قبل الزيارة',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 520,
        features: {
          en: [
            'Everything in Advanced',
            'Seasonal Campaign Broadcasts (Eid, National Day)',
            'Invoice & Payment Reminder Automation',
            'Insurance/Payment Info Pre-Screening Bot',
            'Revenue & No-Show Analytics Dashboard',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'حملات موسمية (عيد، اليوم الوطني)',
            'أتمتة الفواتير وتذكيرات الدفع',
            'بوت فلترة التأمين والدفع المسبق',
            'لوحة تحليلات الإيرادات والغيابات',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
  {
    id: 'salon',
    en: 'Salon AI',
    ar: 'الصالون الذكي',
    industry: { en: 'Men & Women Salons', ar: 'صالونات الرجال والنساء' },
    buildFee: 480,
    painStat: {
      en: 'Salons lose up to 15% of revenue every month to no-shows and missed calls.',
      ar: 'الصالونات تخسر ١٥٪ من إيراداتها شهرياً بسبب الغيابات والمكالمات الفائتة.',
    },
    icon: '✂️',
    color: '#1C5038',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 160,
        features: {
          en: [
            'WhatsApp Booking Bot (24/7)',
            'Stylist-Specific Scheduling',
            'Appointment Reminders & Confirmations',
            'Client Loyalty Visit Tracking',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'بوت حجز واتساب (٢٤/٧)',
            'جدولة حسب المختص',
            'تذكيرات وتأكيدات المواعيد',
            'تتبع ولاء العملاء',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 260,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'Rebooking Nudge 3 Weeks Post-Visit',
            'Upsell Suggestion at Booking (add-on treatments)',
            'Google Review Request Automation',
            'Missed-Call Auto-Text Response',
            'Stylist Performance Stats in Dashboard',
          ],
          ar: [
            'كل ما في الأساسية',
            'تذكير الحجز بعد ٣ أسابيع من الزيارة',
            'اقتراح خدمات إضافية عند الحجز',
            'أتمتة طلب تقييمات Google',
            'رد تلقائي على المكالمات الفائتة',
            'إحصائيات أداء المختصين',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 360,
        features: {
          en: [
            'Everything in Advanced',
            'Seasonal Promo Broadcasts (Eid, National Day)',
            'Win-Back Campaign for 30-Day Inactive Clients',
            'Birthday & Anniversary Automated Offers',
            'Revenue & Occupancy Analytics Dashboard',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'حملات موسمية (عيد، اليوم الوطني)',
            'حملة استعادة العملاء غير النشطين',
            'عروض أعياد الميلاد والمناسبات',
            'لوحة تحليلات الإيرادات والإشغال',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
  {
    id: 'gym',
    en: 'Gym AI',
    ar: 'الجيم الذكي',
    industry: { en: 'Men & Women Gyms', ar: 'صالات الرجال والنساء' },
    buildFee: 560,
    painStat: {
      en: 'Most gyms lose 30% of members annually — simply because nobody followed up.',
      ar: 'معظم الصالات تخسر ٣٠٪ من أعضائها سنوياً — لأن أحداً لم يتابع معهم.',
    },
    icon: '💪',
    color: '#153E2D',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 200,
        features: {
          en: [
            'WhatsApp Membership Bot (24/7)',
            'Attendance & Check-in Tracking',
            'Auto Renewal Reminders (Day -14, -7, -1)',
            'Class Scheduling Assistant',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'بوت الاشتراكات (٢٤/٧)',
            'تتبع الحضور',
            'تذكيرات التجديد التلقائي (١٤، ٧، ١ أيام)',
            'مساعد جدولة الحصص',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 320,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'Waitlist Auto-Fill for Cancelled Classes',
            'New Member Onboarding Sequence (Goals + Tips)',
            'PT Session Rebooking Prompts',
            'Google Review Request Automation',
            'Membership FAQ Bot',
          ],
          ar: [
            'كل ما في الأساسية',
            'ملء الحصص الملغاة من قائمة الانتظار',
            'تسلسل استقبال الأعضاء الجدد',
            'تذكير إعادة حجز جلسات المدرب',
            'أتمتة طلب تقييمات Google',
            'بوت الأسئلة الشائعة للاشتراكات',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 440,
        features: {
          en: [
            'Everything in Advanced',
            'Win-Back Campaign (30/60/90-day lapsed members)',
            'Seasonal Offer Broadcasts (Ramadan, Summer)',
            'Peak Hours Heatmap & Staffing Insights',
            'Revenue & Churn Analytics Dashboard',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'حملة استعادة الأعضاء المنقطعين',
            'حملات موسمية (رمضان، الصيف)',
            'خريطة أوقات الذروة وتحسين التوظيف',
            'لوحة تحليلات الإيرادات والتسرب',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
  {
    id: 'garage',
    en: 'Garage AI',
    ar: 'الورشة الذكية',
    industry: { en: 'Car Garages & Auto Service', ar: 'ورش السيارات والصيانة' },
    buildFee: 520,
    painStat: {
      en: 'Garages spend 2–3 hours daily answering "is my car ready?" — that\'s revenue time wasted.',
      ar: 'الورش تقضي ٢-٣ ساعات يومياً تجيب على "السيارة جاهزة؟" — وقت ضائع من الإيرادات.',
    },
    icon: '🔧',
    color: '#1C5038',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 180,
        features: {
          en: [
            'WhatsApp Job Status Bot (24/7)',
            'Customer Update Automation (Received → In Progress → Ready)',
            'Service History Tracking',
            'WhatsApp Invoice Delivery',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'بوت حالة الطلبات (٢٤/٧)',
            'تحديثات تلقائية (استلام → تحت التنفيذ → جاهز)',
            'تتبع سجل الصيانة',
            'إرسال الفواتير عبر واتساب',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 290,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'Post-Pickup Follow-up (Day 3 Check-in)',
            'Service Interval Reminders (3/6 months)',
            'WhatsApp Job Intake Form for New Requests',
            'Google Review Request After Pickup',
            'Per-Job Revenue Tracking in Dashboard',
          ],
          ar: [
            'كل ما في الأساسية',
            'متابعة ما بعد الاستلام (اليوم ٣)',
            'تذكيرات دورية للصيانة (٣/٦ أشهر)',
            'نموذج استقبال طلبات جديدة',
            'طلب تقييم Google بعد الاستلام',
            'تتبع إيرادات كل طلب في اللوحة',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 400,
        features: {
          en: [
            'Everything in Advanced',
            'Seasonal Campaign Broadcasts (AC Season, Ramadan Rush)',
            'Auto-Built Customer CRM from WhatsApp',
            'Payment Reminder Sequences',
            'Job Volume & Turnaround Analytics Dashboard',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'حملات موسمية (موسم التكييف، رمضان)',
            'CRM تلقائي من واتساب',
            'تسلسل تذكيرات الدفع',
            'لوحة تحليلات حجم الطلبات والدوران',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
  {
    id: 'restaurant',
    en: 'Restaurant AI',
    ar: 'المطعم الذكي',
    industry: { en: 'F&B, Cafes & Restaurants', ar: 'المطاعم والكافيهات' },
    buildFee: 560,
    painStat: {
      en: '43% of restaurant calls go unanswered — that\'s an estimated $20B in lost revenue globally per year.',
      ar: '٤٣٪ من مكالمات المطاعم لا يُرد عليها — خسارة تُقدّر بـ ٢٠ مليار دولار سنوياً.',
    },
    icon: '🍽️',
    color: '#153E2D',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 220,
        features: {
          en: [
            'WhatsApp Menu & FAQ Bot (24/7)',
            'Reservation Management & Reminders',
            'Order Status Updates',
            'After-Hours Booking Capture',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'بوت المنيو والأسئلة (٢٤/٧)',
            'إدارة الحجوزات والتذكيرات',
            'تحديثات حالة الطلبات',
            'استقبال الحجوزات خارج أوقات العمل',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 360,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'No-Show Confirmation Flow (reduce empty tables)',
            'Catering Inquiry Capture Bot (high-ticket)',
            'Google Review Request Post-Visit',
            '"We Miss You" Campaign for 30-Day Inactive',
            'Table Utilization Stats in Dashboard',
          ],
          ar: [
            'كل ما في الأساسية',
            'تأكيد الحجوزات لتقليل الطاولات الفارغة',
            'بوت استقبال طلبات الكاترينج',
            'طلب تقييم Google بعد الزيارة',
            'حملة "افتقدناكم" للعملاء غير النشطين',
            'إحصائيات إشغال الطاولات في اللوحة',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 500,
        features: {
          en: [
            'Everything in Advanced',
            'Seasonal Campaign Broadcasts (Eid, National Day, Ramadan)',
            'Upsell Bot at Reservation (desserts, drinks, upgrades)',
            'Staff Tip & Peak-Hour Intelligence',
            'Revenue & Cover Analytics Dashboard',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'حملات موسمية (عيد، اليوم الوطني، رمضان)',
            'بوت البيع الإضافي عند الحجز',
            'تحليل أوقات الذروة والإيرادات',
            'لوحة تحليلات الإيرادات والأغطية',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
  {
    id: 'real-estate',
    en: 'Real Estate AI',
    ar: 'العقارات الذكية',
    industry: { en: 'Brokers & Real Estate Offices', ar: 'مكاتب العقارات والوسطاء' },
    buildFee: 680,
    painStat: {
      en: 'Real estate leads go cold in under 5 minutes — most agents respond in 5 hours.',
      ar: 'العميل العقاري يبرد في أقل من ٥ دقائق — معظم الوسطاء يردون بعد ٥ ساعات.',
    },
    icon: '🏢',
    color: '#1C5038',
    tiers: [
      {
        id: 'essential',
        en: 'Essential',
        ar: 'الأساسية',
        retainer: 260,
        features: {
          en: [
            'WhatsApp Listings Bot (24/7)',
            'Instant Lead Qualification (Budget & Area)',
            'Viewing Scheduler & Reminders',
            'New Listing Broadcasts to Buyer List',
            'Client Portal Dashboard',
            'Monthly Maintenance',
          ],
          ar: [
            'بوت العقارات (٢٤/٧)',
            'تأهيل العملاء فوراً (الميزانية والمنطقة)',
            'جدولة المعاينات والتذكيرات',
            'بث العقارات الجديدة',
            'بوابة العميل',
            'صيانة شهرية',
          ],
        },
      },
      {
        id: 'advanced',
        en: 'Advanced',
        ar: 'المتقدمة',
        retainer: 420,
        badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
        features: {
          en: [
            'Everything in Essential',
            'Post-Viewing Follow-up + Next Step Prompt',
            'Segmented Broadcasts by Area / Budget / Type',
            'Seller Auto-Update on Inquiry & Offer Activity',
            'Lead Drip Sequence (New Matching Listings)',
            'Viewing Show-Up Rate in Dashboard',
          ],
          ar: [
            'كل ما في الأساسية',
            'متابعة ما بعد المعاينة + الخطوة التالية',
            'بث مقسّم حسب المنطقة والميزانية والنوع',
            'تحديث تلقائي للبائع على الاستفسارات',
            'تسلسل رعاية العملاء المحتملين',
            'معدل حضور المعاينات في اللوحة',
          ],
        },
      },
      {
        id: 'full-stack',
        en: 'Full-Stack',
        ar: 'المتكاملة',
        retainer: 580,
        features: {
          en: [
            'Everything in Advanced',
            'Agent Handoff Logic (qualify → route to human)',
            'Portfolio Vacancy & Lead Pipeline Dashboard',
            'Landlord Monthly Performance Report (Auto)',
            'Market Broadcast Campaigns (seasonal/price drops)',
            'Priority Support + Monthly Strategy Call',
          ],
          ar: [
            'كل ما في المتقدمة',
            'منطق تحويل العملاء للوكيل البشري',
            'لوحة المحفظة العقارية وخط العملاء',
            'تقرير أداء شهري تلقائي للملاك',
            'حملات سوقية (تخفيضات، مواسم)',
            'دعم أولوية + مكالمة استراتيجية شهرية',
          ],
        },
      },
    ],
  },
]

export const WHATSAPP_NUMBER = '96599539006'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const DEMO_CONVERSATIONS: Record<string, { en: string[]; ar: string[] }[]> = {
  clinic: [
    { en: ['Hi, I need to book a dental appointment', 'مرحبا، أريد حجز موعد أسنان'], ar: ['مرحبا، أريد حجز موعد أسنان', 'Hi, I need to book a dental appointment'] },
    { en: ['Hello! Welcome to the clinic. What day works best for you? We have slots available Monday to Saturday.', 'أهلاً! ما هو اليوم المناسب لك؟ لدينا مواعيد من الاثنين إلى السبت.'], ar: ['أهلاً! ما هو اليوم المناسب لك؟ لدينا مواعيد من الاثنين إلى السبت.', 'Hello! Welcome to the clinic. What day works best for you?'] },
    { en: ['Wednesday afternoon please', 'الأربعاء بعد الظهر من فضلك'], ar: ['الأربعاء بعد الظهر من فضلك', 'Wednesday afternoon please'] },
    { en: ['Wednesday 3pm or 4:30pm — which works?', 'الأربعاء الساعة 3 أو 4:30 عصراً؟'], ar: ['الأربعاء الساعة 3 أو 4:30 عصراً؟', 'Wednesday 3pm or 4:30pm — which works?'] },
    { en: ['3pm perfect', 'الساعة 3 ممتاز'], ar: ['الساعة 3 ممتاز', '3pm perfect'] },
    { en: ['✅ Booked! Wednesday 3pm. You\'ll get a reminder 2 hours before. See you then!', '✅ تم الحجز! الأربعاء الساعة 3. ستصلك رسالة تذكير قبل ساعتين.'], ar: ['✅ تم الحجز! الأربعاء الساعة 3. ستصلك رسالة تذكير قبل ساعتين.', '✅ Booked! Wednesday 3pm. You\'ll get a reminder 2 hours before.'] },
  ],
  salon: [
    { en: ['Is Sarah available Saturday?', 'هل سارة متاحة السبت؟'], ar: ['هل سارة متاحة السبت؟', 'Is Sarah available Saturday?'] },
    { en: ['Let me check... Yes! Sarah has 11am and 2pm open Saturday. Which works?', 'يلا أشوف... نعم! سارة عندها 11 صباحاً و 2 ظهراً السبت. أيهما يناسبك؟'], ar: ['يلا أشوف... نعم! سارة عندها 11 صباحاً و 2 ظهراً السبت. أيهما يناسبك؟', 'Let me check... Yes! Sarah has 11am and 2pm open Saturday.'] },
    { en: ['11am please', 'الساعة 11 من فضلك'], ar: ['الساعة 11 من فضلك', '11am please'] },
    { en: ['✅ Booked with Sarah, Saturday 11am. See you!', '✅ محجوز مع سارة، السبت الساعة 11. نشوفك!'], ar: ['✅ محجوز مع سارة، السبت الساعة 11. نشوفك!', '✅ Booked with Sarah, Saturday 11am. See you!'] },
  ],
  gym: [
    { en: ['How much is a monthly membership?', 'كم سعر الاشتراك الشهري؟'], ar: ['كم سعر الاشتراك الشهري؟', 'How much is a monthly membership?'] },
    { en: ['Monthly: 35 KWD · 3 months: 90 KWD · 6 months: 160 KWD. Want to start today?', 'شهري: 35 د.ك · 3 أشهر: 90 د.ك · 6 أشهر: 160 د.ك. تبي تبدأ اليوم؟'], ar: ['شهري: 35 د.ك · 3 أشهر: 90 د.ك · 6 أشهر: 160 د.ك. تبي تبدأ اليوم؟', 'Monthly: 35 KWD · 3 months: 90 KWD · 6 months: 160 KWD. Want to start?'] },
    { en: ['Yes, 3 months please', 'نعم، 3 أشهر من فضلك'], ar: ['نعم، 3 أشهر من فضلك', 'Yes, 3 months please'] },
    { en: ['✅ 90 KWD for 3 months. Our team will send payment details shortly!', '✅ 90 د.ك لمدة 3 أشهر. فريقنا سيرسل تفاصيل الدفع قريباً!'], ar: ['✅ 90 د.ك لمدة 3 أشهر. فريقنا سيرسل تفاصيل الدفع قريباً!', '✅ 90 KWD for 3 months. Payment details coming shortly!'] },
  ],
  garage: [
    { en: ['Any update on my Toyota Camry?', 'في أي تحديث على سيارتي كامري؟'], ar: ['في أي تحديث على سيارتي كامري؟', 'Any update on my Toyota Camry?'] },
    { en: ['Your Camry (plate: 12345) — engine service complete, waiting on AC part. Ready Thursday.', 'الكامري (12345) — تم تغيير الزيت، ننتظر قطعة التكييف. جاهزة الخميس.'], ar: ['الكامري (12345) — تم تغيير الزيت، ننتظر قطعة التكييف. جاهزة الخميس.', 'Your Camry — engine service complete, waiting on AC part. Ready Thursday.'] },
    { en: ['Thanks! How much?', 'شكراً! كم الحساب؟'], ar: ['شكراً! كم الحساب؟', 'Thanks! How much?'] },
    { en: ['Total: 85 KWD. We\'ll send the invoice when ready. 📋', 'المجموع: 85 د.ك. نرسل الفاتورة لما تكون جاهزة. 📋'], ar: ['المجموع: 85 د.ك. نرسل الفاتورة لما تكون جاهزة. 📋', 'Total: 85 KWD. Invoice coming when ready. 📋'] },
  ],
  restaurant: [
    { en: ['Do you have a table for 4 tonight?', 'عندكم طاولة لـ4 الليلة؟'], ar: ['عندكم طاولة لـ4 الليلة؟', 'Do you have a table for 4 tonight?'] },
    { en: ['Yes! 7pm or 8:30pm available tonight for 4 guests. Which do you prefer?', 'نعم! الساعة 7 أو 8:30 مساءً متاحة الليلة لـ4. أيهما تفضل؟'], ar: ['نعم! الساعة 7 أو 8:30 مساءً متاحة الليلة لـ4. أيهما تفضل؟', 'Yes! 7pm or 8:30pm available tonight for 4 guests.'] },
    { en: ['7pm please', 'الساعة 7 من فضلك'], ar: ['الساعة 7 من فضلك', '7pm please'] },
    { en: ['✅ Reserved for 4 at 7pm tonight. We\'ll see you soon! 🍽️', '✅ محجوز لـ4 الساعة 7 الليلة. نشوفكم قريباً! 🍽️'], ar: ['✅ محجوز لـ4 الساعة 7 الليلة. نشوفكم قريباً! 🍽️', '✅ Reserved for 4 at 7pm tonight. See you soon! 🍽️'] },
  ],
  'real-estate': [
    { en: ['Hi, do you have apartments for sale in Salmiya?', 'السلام عليكم، عندكم شقق للبيع في السالمية؟'], ar: ['السلام عليكم، عندكم شقق للبيع في السالمية؟', 'Hi, do you have apartments for sale in Salmiya?'] },
    { en: ['Welcome! Yes, 3 apartments available in Salmiya right now. Is this for investment or residence? And what\'s your budget range?', 'هلا والله! نعم، عندنا ٣ شقق متاحة في السالمية. استثمار أو سكن؟ وكم ميزانيتك تقريباً؟'], ar: ['هلا والله! نعم، عندنا ٣ شقق متاحة في السالمية. استثمار أو سكن؟ وكم ميزانيتك تقريباً؟', 'Welcome! Yes, 3 apartments available in Salmiya. Investment or residence? What\'s your budget?'] },
    { en: ['Residence, budget around 120K', 'للسكن، ميزانيتي حوالي ١٢٠ ألف'], ar: ['للسكن، ميزانيتي حوالي ١٢٠ ألف', 'Residence, budget around 120K'] },
    { en: ['Got it — 2 listings fit: 110K (3BR, 8th floor, sea view) and 125K (4BR, ground floor, garden). Should I send photos + location?', 'تمام — عندنا شقتين تناسبك: ١١٠ ألف (٣ غرف، طابق ٨، إطلالة بحر) و ١٢٥ ألف (٤ غرف، أرضي مع حديقة). أرسل لك الصور والموقع؟'], ar: ['تمام — عندنا شقتين تناسبك: ١١٠ ألف (٣ غرف، طابق ٨، إطلالة بحر) و ١٢٥ ألف (٤ غرف، أرضي مع حديقة). أرسل لك الصور والموقع؟', 'Got it — 2 listings fit: 110K (3BR, sea view) and 125K (4BR, garden).'] },
    { en: ['Yes please, and when can I view?', 'نعم من فضلك، والمعاينة متى ممكن؟'], ar: ['نعم من فضلك، والمعاينة متى ممكن؟', 'Yes please, and when can I view?'] },
    { en: ['✅ Details sent. Viewings available tomorrow 6pm or Thursday 4pm. Which works? 🏢', '✅ أرسلنا التفاصيل. جاهزين للمعاينة بكرة ٦ مساءً أو الخميس ٤ عصراً. أيهما يناسبك؟ 🏢'], ar: ['✅ أرسلنا التفاصيل. جاهزين للمعاينة بكرة ٦ مساءً أو الخميس ٤ عصراً. أيهما يناسبك؟ 🏢', '✅ Details sent. Viewings tomorrow 6pm or Thursday 4pm. Which works? 🏢'] },
  ],
}
