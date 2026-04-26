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

// DEMO_CONVERSATIONS — Kuwaiti dialect, 8 turns per industry
// Format: { en: [single string], ar: [single string] }
// Even index = user bubble, Odd index = bot bubble
export const DEMO_CONVERSATIONS: Record<string, { en: string[]; ar: string[] }[]> = {

  // ─── CLINIC ───
  clinic: [
    { en: ['Hi, I need to book a dental appointment for a cleaning'], ar: ['هلا، أبي أحجز موعد عند دكتور الأسنان، تنظيف أسنان'] },
    { en: ['Hala! 😊 We have slots available this week. Which day works best for you — weekday or weekend?'], ar: ['هلا وغلا! 😊 عندنا مواعيد متاحة هالأسبوع. متى تحب؟ — يوم دوام ولا عطلة؟'] },
    { en: ['Wednesday evening if possible, around 6 or 7pm'], ar: ['الأربعاء المساء لو في، حوالي ٦ أو ٧'] },
    { en: ['Perfect! Wednesday we have 6:00pm and 7:30pm open. Which one works for you?'], ar: ['زين! الأربعاء عندنا الساعة ٦ مساءً و ٧:٣٠. أي وقت يناسبك؟'] },
    { en: ['6pm is great. Also — how much does a cleaning cost?'], ar: ['الساعة ٦ تمام. وبس — جم سعر التنظيف؟'] },
    { en: ['Cleaning is 25 KWD. Includes scaling, polishing, and a full checkup. Shall I confirm the 6pm slot for you?'], ar: ['التنظيف بـ ٢٥ دينار. يشمل التنظيف العميق والتلميع وفحص كامل. أأكد لك موعد الساعة ٦؟'] },
    { en: ['Yes please, my name is Ahmad Al-Rashidi'], ar: ['أكيد، اسمي أحمد الراشدي'] },
    { en: ['✅ Done, Ahmad! Wednesday 6:00pm confirmed. You\'ll get a WhatsApp reminder 2 hours before. See you then! 🦷'], ar: ['✅ تم يا أحمد! الأربعاء الساعة ٦ مساءً مؤكد. راح يوصلك تذكير على واتساب قبل ساعتين. نشوفك على خير! 🦷'] },
  ],

  // ─── SALON ───
  salon: [
    { en: ['Hey, is Fatima available this Saturday for a keratin treatment?'], ar: ['هلا، فاطمة فاضيه يوم السبت؟ أبي أسوي كيراتين'] },
    { en: ['Hala! Let me check Fatima\'s schedule... ✅ She has Saturday at 11am and 2pm open. Which works?'], ar: ['هلا! ثواني أشوف جدول فاطمة الحين... ✅ عندها السبت الساعة ١١ الصبح و ٢ الظهر. أي وقت يناسب؟'] },
    { en: ['2pm is better. How long does keratin take?'], ar: ['الساعة ٢ أحسن. وجم ياخذ الكيراتين وقت؟'] },
    { en: ['Keratin takes around 2.5 to 3 hours depending on hair length. Fatima\'s fully available from 2pm. Want me to book it?'], ar: ['الكيراتين ياخذ تقريباً ٢.٥ إلى ٣ ساعات حسب طول الشعر. فاطمة فاضية من الساعة ٢. أحجز؟'] },
    { en: ['Yes! And what\'s the price?'], ar: ['أكيد! وجم سعرها؟'] },
    { en: ['Keratin with Fatima is 45 KWD. Includes blow-dry and style finish. Should I put your name down?'], ar: ['الكيراتين عند فاطمة بـ ٤٥ دينار. يشمل مجفف وتسريحة نهائية. أحط اسمك؟'] },
    { en: ['Please, it\'s Mariam'], ar: ['لو سمحتي، اسمي مريم'] },
    { en: ['✅ Booked, Mariam! Saturday 2:00pm with Fatima — Keratin. Reminder coming your way the morning of 💅'], ar: ['✅ تم الحجز يا مريم! السبت الساعة ٢ مع فاطمة — كيراتين. راح يوصل تذكير صباح اليوم 💅'] },
  ],

  // ─── GYM ───
  gym: [
    { en: ['Hi, I want to join the gym. What memberships do you have?'], ar: ['هلا، أبي أشترك بالجيم. شنو عندكم من اشتراكات؟'] },
    { en: ['Hala, welcome! 💪 We have 3 options:\n• Monthly: 35 KWD\n• 3 Months: 90 KWD\n• 6 Months: 160 KWD\nAll include full access + locker. Which one interests you?'], ar: ['هلا وغلا، حياك! 💪 عندنا ٣ خيارات:\n• شهري: ٣٥ دينار\n• ٣ أشهر: ٩٠ دينار\n• ٦ أشهر: ١٦٠ دينار\nكلها تشمل دخول كامل + خزانة. أي وحدة تبي؟'] },
    { en: ['The 3 months sounds good. Do you have personal training too?'], ar: ['الثلاثة أشهر زينة. وعندكم تدريب شخصي؟'] },
    { en: ['Yes! PT sessions are 15 KWD each or 8 sessions for 100 KWD. Our trainers speak Arabic and English. Want to add PT with your membership?'], ar: ['أكيد عندنا! جلسات التدريب الشخصي بـ ١٥ دينار الجلسة، أو ٨ جلسات بـ ١٠٠ دينار. مدربينا يتكلمون عربي وإنجليزي. تبي تضيف تدريب مع الاشتراك؟'] },
    { en: ['Maybe later. What are the gym hours? And where are you located?'], ar: ['بعدين إن شاء الله. متى ساعات العمل؟ ووين موقعكم؟'] },
    { en: ['We\'re open 5:30am–11pm weekdays, 7am–10pm weekends. Located in Salmiya, near the co-op. I\'ll send you the location pin on WhatsApp 📍'], ar: ['فاتحين من ٥:٣٠ الصبح إلى ١١ الليل أيام الدوام، و٧ الصبح إلى ١٠ الليل العطل. موقعنا في السالمية، قريب الجمعية. أرسلك اللوكيشن على واتساب 📍'] },
    { en: ['Perfect. I\'ll take the 3-month membership. My name is Khalid'], ar: ['تمام. أبي اشتراك ٣ أشهر. اسمي خالد'] },
    { en: ['✅ Khalid, you\'re in! 3-month membership registered. Our team will send payment details on WhatsApp within minutes. See you at the gym! 💪'], ar: ['✅ يا خالد، تم تسجيلك! اشتراك ٣ أشهر محجوز. فريقنا راح يرسللك تفاصيل الدفع على واتساب بدقايق. نشوفك بالجيم! 💪'] },
  ],

  // ─── GARAGE ───
  garage: [
    { en: ['Hi, I left my Camry with you guys yesterday. Any update?'], ar: ['هلا، خليت الكامري عندكم أمس. في أي تحديث؟'] },
    { en: ['Hala! Let me check... Your Camry (plate: 12345) — engine oil done ✅, AC filter replaced ✅. Currently waiting on a brake pad part, arrives tomorrow morning إن شاء الله.'], ar: ['هلا! أشوف الحين... الكامري (لوحة: ١٢٣٤٥) — تغيير الزيت خلاص ✅، فلتر التكييف اتغير ✅. الحين ننطر قطعة الفرامل، توصل باجر الصبح إن شاء الله.'] },
    { en: ['Okay good. And roughly how much is the total going to be?'], ar: ['زين. وتقريباً جم يطلع الحساب كامل؟'] },
    { en: ['Estimated total: 75–85 KWD depending on the brake pad price. We\'ll send the exact invoice on WhatsApp once the part arrives. No surprises 👍'], ar: ['الحساب المتوقع: ٧٥–٨٥ دينار حسب سعر قطعة الفرامل. نرسل الفاتورة الدقيقة على واتساب لما توصل القطعة. ماكو مفاجآت 👍'] },
    { en: ['Good. And when will it be fully ready for pickup?'], ar: ['حلو. ومتى تكون جاهزة للاستلام بالكامل؟'] },
    { en: ['If the part arrives on time tomorrow, your Camry will be ready by Thursday afternoon. We\'ll send you a WhatsApp message the moment it\'s done ✅'], ar: ['إذا وصلت القطعة باجر بوقتها، الكامري تكون جاهزة الخميس بعد الظهر. نرسللك رسالة واتساب وقت ما تخلص ✅'] },
    { en: ['Perfect. And can I pay by knet when I pick it up?'], ar: ['تمام. وأقدر أدفع كي-نت وقت الاستلام؟'] },
    { en: ['Akeed! We accept Knet, cash, and bank transfer. No problem at all. See you Thursday, and laa tsheel hamm — your car is in good hands 🔧'], ar: ['أكيد! نقبل كي-نت، كاش، وتحويل بنكي. ولا يهمك. نشوفك الخميس، لا تشيل هم — سيارتك بأيدٍ أمينة 🔧'] },
  ],

  // ─── RESTAURANT ───
  restaurant: [
    { en: ['Hey, do you have a table for 5 this Friday evening?'], ar: ['هلا، عندكم طاولة لـ٥ أشخاص يوم الجمعة المساء؟'] },
    { en: ['Hala! Friday evening we have availability at 7:30pm and 9:00pm for 5 guests. Any preference?'], ar: ['هلا وغلا! الجمعة المساء عندنا طاولة متاحة الساعة ٧:٣٠ والساعة ٩ لـ٥ أشخاص. أي وقت يناسبكم؟'] },
    { en: ['7:30pm works. Is it indoors or outdoors? We prefer outside'], ar: ['الساعة ٧:٣٠ تمام. هل الطاولة داخلية ولا خارجية؟ نبي برّة'] },
    { en: ['Great choice! We have outdoor seating available at 7:30pm. Should I reserve an outdoor table for 5 in your name?'], ar: ['خيار ممتاز! عندنا جلوس خارجي متاح الساعة ٧:٣٠. أحجزلكم طاولة برّة لـ٥ بإسمك؟'] },
    { en: ['Yes please. Also, do you have a set menu or à la carte?'], ar: ['اي لو سمحت. وهل عندكم مينيو ثابت ولا بوفيه؟'] },
    { en: ['Both! Full à la carte menu plus a weekend set menu at 12 KWD per person (3 courses). I\'ll send the full menu link on WhatsApp 🍽️ What\'s the name for the reservation?'], ar: ['الثنين! قائمة مينيو كاملة وكذلك البوفيه للعطلة بـ ١٢ دينار للشخص (٣ أطباق). أرسللك رابط المنيو الكامل على واتساب 🍽️ شنو الاسم للحجز؟'] },
    { en: ['Nasser Al-Mutairi'], ar: ['ناصر المطيري'] },
    { en: ['✅ Reserved, Nasser! Friday 7:30pm, outdoor table for 5. Reminder + menu link coming to you on WhatsApp. See you then! 🌟'], ar: ['✅ تم الحجز يا ناصر! الجمعة الساعة ٧:٣٠، طاولة برّة لـ٥. تذكير ورابط المنيو يوصلك على واتساب. نشوفكم! 🌟'] },
  ],

  // ─── REAL ESTATE ───
  'real-estate': [
    { en: ['Hi, I\'m looking for an apartment to buy in Salmiya, budget around 120K'], ar: ['هلا، أبي أشتري شقة في السالمية، ميزانيتي حوالي ١٢٠ ألف'] },
    { en: ['Hala, welcome! Great area. Quick question — is this for personal residence or investment?'], ar: ['هلا وغلا، حياك! منطقة زينة. سؤال سريع — للسكن الشخصي ولا استثمار؟'] },
    { en: ['Personal residence. I need at least 3 bedrooms, prefer a high floor'], ar: ['للسكن. أبي على الأقل ٣ غرف، وأفضل طابق عالي'] },
    { en: ['Perfect. I have 2 matching listings right now:\n• 110K — 3BR, 8th floor, sea view, 180m²\n• 118K — 3BR, 12th floor, city view, 165m²\nShall I send photos and full details on WhatsApp?'], ar: ['ممتاز. عندي الحين ٢ عقارات تناسبك:\n• ١١٠ ألف — ٣ غرف، طابق ٨، إطلالة بحر، ١٨٠م²\n• ١١٨ ألف — ٣ غرف، طابق ١٢، إطلالة مدينة، ١٦٥م²\nأرسللك الصور والتفاصيل الكاملة على واتساب؟'] },
    { en: ['Yes send them. The sea view one sounds interesting'], ar: ['أرسل. اللي فيها إطلالة على البحر'] },
    { en: ['Sent! 📲 The 110K unit is on the 8th floor, direct sea view, 2 parking spots included, building has a pool and gym. Available for viewing anytime this week. When\'s good for you?'], ar: ['أرسلت! 📲 الوحدة بـ ١١٠ ألف في الطابق الثامن، إطلالة بحر مباشرة، مواقفين سيارات، في البناية مسبح وجيم. جاهزة للمعاينة أي وقت هالأسبوع. متى يناسبك؟'] },
    { en: ['How about tomorrow evening, around 6?'], ar: ['باجر المساء، حوالي الساعة ٦؟'] },
    { en: ['✅ Viewing confirmed! Tomorrow 6:00pm — Salmiya, 8th floor sea view unit. I\'ll send you the exact location and our agent\'s number on WhatsApp. Yalla, see you there! 🏢'], ar: ['✅ تمت جدولة المعاينة! باجر الساعة ٦ مساءً — السالمية، الطابق الثامن، إطلالة البحر. أرسللك الموقع الدقيق ورقم الوكيل على واتساب. يالله نشوفك هناك! 🏢'] },
  ],
}
