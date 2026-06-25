// ============================================================================
// MindSync — data.ts  ·  FINALIZED 3-TIER MODEL (Phase 1 review artifact)
// ----------------------------------------------------------------------------
// This is the reviewed, completed version of _drafts/data.new.ts, ready to
// become MindSyncWeb/src/lib/data.ts in Phase 2.
//
// Decisions baked in:
//   - 3 tiers (Receptionist / Coordinator / Manager) replace MindSync Complete.
//   - PILOT (paid, 30 days, credited) replaces the free trial everywhere.
//   - Verticals = config only (VERTICALS) + getVerticalBySlug().
//   - HOME_BUSINESS_CATEGORIES kept (14, discovery form).
//   - DEMO_CONVERSATIONS kept verbatim → spliced in Phase 2 (NOT retyped,
//     to preserve the Kuwaiti-dialect Arabic + emoji exactly).
//
// Internal economics (NOT shown to clients):
//   Build = hours×10 + 35 cash · Monthly cost-to-serve R 33 · C 75 · M 174.
//   Monthly profit: R 46 (58%) · C 74 (50%) · M 125 (42%).
// ============================================================================

export const WHATSAPP_URL = 'https://wa.me/96599539006'
export const DISCOVERY_URL = '/discovery'

// ─── Types ──────────────────────────────────────────────────────────────────

export type TierId = 'receptionist' | 'coordinator' | 'manager'
export type Channel = 'whatsapp' | 'instagram' | 'website' | 'voice' | 'portal' | 'analytics'

export type Tier = {
  id: TierId
  en: string
  roleEn: string
  roleAr: string
  buildFee: number
  monthly: number
  conversationsIncluded: number
  overagePer1000: number
  badge?: { en: string; ar: string }
  channels: Channel[]
  outcome: { en: string; ar: string }
  features: { en: string[]; ar: string[] }
}

export const TIER_ORDER: TierId[] = ['receptionist', 'coordinator', 'manager']

// ─── The 3 universal tiers ──────────────────────────────────────────────────

export const TIERS: Tier[] = [
  {
    id: 'receptionist',
    en: 'Sync Receptionist',
    roleEn: 'Receptionist',
    roleAr: 'موظف الاستقبال',
    buildFee: 155,
    monthly: 79,
    conversationsIncluded: 1000,
    overagePer1000: 30,
    channels: ['whatsapp', 'portal'],
    outcome: {
      en: 'Never lose a customer to a missed message.',
      ar: 'لا تخسر أي عميل بسبب رسالة فاتتك.',
    },
    features: {
      en: [
        'Custom AI agent on WhatsApp',
        '24/7 FAQ answering (prices, hours, location, services)',
        'Message intake + booking-link handoff',
        'Basic reminders',
        'Lightweight CRM',
        'Client portal',
        'Monitoring & maintenance',
      ],
      ar: [
        'وكيل ذكاء اصطناعي مخصّص على واتساب',
        'رد على الأسئلة المتكررة ٢٤/٧ (الأسعار، الأوقات، الموقع، الخدمات)',
        'استقبال الرسائل وتحويل روابط الحجز',
        'تذكيرات أساسية',
        'نظام عملاء مبسّط (CRM)',
        'لوحة تحكم العميل',
        'مراقبة وصيانة شهرية',
      ],
    },
  },
  {
    id: 'coordinator',
    en: 'Sync Coordinator',
    roleEn: 'Coordinator',
    roleAr: 'المنسّق',
    buildFee: 285,
    monthly: 149,
    conversationsIncluded: 3000,
    overagePer1000: 30,
    badge: { en: 'Most Popular', ar: 'الأكثر طلباً' },
    channels: ['whatsapp', 'instagram', 'website', 'portal', 'analytics'],
    outcome: {
      en: 'Turn chats into booked, confirmed revenue.',
      ar: 'يحوّل المحادثات إلى حجوزات وإيرادات مؤكدة.',
    },
    features: {
      en: [
        'Everything in Receptionist',
        'WhatsApp + Instagram + Website',
        'Full AI booking (by staff / service / time)',
        'No-show recovery',
        'Lead capture + qualification',
        'Analytics dashboard + monthly report',
        'CSAT / feedback automation',
      ],
      ar: [
        'كل ما في موظف الاستقبال',
        'واتساب + انستقرام + الموقع',
        'نظام حجز كامل (حسب الموظف / الخدمة / الوقت)',
        'استعادة المواعيد الملغاة والغياب',
        'تأهيل وتقييم العملاء المحتملين',
        'لوحة تحليلات + تقرير شهري تلقائي',
        'أتمتة استطلاعات رضا العملاء',
      ],
    },
  },
  {
    id: 'manager',
    en: 'Sync Manager',
    roleEn: 'Manager',
    roleAr: 'المدير',
    buildFee: 485,
    monthly: 299,
    conversationsIncluded: 8000, // fair use — NOT unlimited
    overagePer1000: 30,
    channels: ['whatsapp', 'instagram', 'website', 'voice', 'portal', 'analytics'],
    outcome: {
      en: 'Keep customers coming back — fill your slow days.',
      ar: 'يخلّي عملاءك يرجعون لك ويعبّي أيامك الفاضية.',
    },
    features: {
      en: [
        'Everything in Coordinator',
        'Multiple specialized agents (reception, follow-up, analyst)',
        'Win-back / reactivation campaigns',
        'Priority support + monthly strategy call',
        'Voice receptionist option',
        'Up to 8,000 conversations / month (fair use)',
      ],
      ar: [
        'كل ما في المنسّق',
        'عدة وكلاء متخصصين (استقبال، متابعة، تحليل)',
        'حملات استعادة العملاء المنقطعين',
        'دعم أولوية + مكالمة استراتيجية شهرية',
        'خيار الوكيل الصوتي',
        'حتى ٨٬٠٠٠ محادثة شهرياً (استخدام عادل)',
      ],
    },
  },
]

// ─── Baseline — included on ALL tiers ───────────────────────────────────────

export const BASELINE = {
  en: ['Kuwaiti dialect (Arabic & English)', 'Instant replies', 'Runs on its own (supervised first 2 weeks)'],
  ar: ['اللهجة الكويتية (عربي وإنجليزي)', 'ردود فورية', 'يشتغل تلقائياً (بإشراف أول أسبوعين)'],
}

// ─── On-ramp: paid Pilot (replaces the old free trial) ──────────────────────

export const PILOT = {
  price: 150,
  days: 30,
  creditedToSetup: true,
  en: { name: '30-Day Pilot', body: 'A live agent on your real business for 30 days — credited to setup if you continue.' },
  ar: { name: 'تجربة ٣٠ يوم', body: 'وكيل حقيقي على مشروعك لمدة ٣٠ يوم — تُحتسب ضمن رسوم التأسيس إذا استمريت.' },
}

// ─── Add-ons (displayed "Upon request" · internal floors for quoting only) ───

export type AddOn = {
  id: string
  en: string
  ar: string
  priceOnRequest: true
  internal: { setup?: number; setupFrom?: number; monthly?: number }
}

export const ADDONS: AddOn[] = [
  { id: 'connect',        en: 'Connect (link to your existing system)', ar: 'الربط بنظامك الحالي',          priceOnRequest: true, internal: { setup: 250, monthly: 49 } },
  { id: 'voice',          en: 'Voice AI receptionist',                  ar: 'الوكيل الصوتي',                priceOnRequest: true, internal: { setupFrom: 600, monthly: 199 } },
  { id: 'whatsapp-setup', en: 'WhatsApp Business API + green-tick',     ar: 'تفعيل واتساب الرسمي + التوثيق', priceOnRequest: true, internal: { setup: 150 } },
]

// ─── Websites & Apps (displayed "Upon request" · internal floors kept) ──────

export type ProjectService = {
  id: string
  en: string
  ar: string
  priceOnRequest: true
  internal: { from: number; monthly: number; connectAltMonthly?: number }
}

export const WEBSITE_SERVICES: ProjectService[] = [
  { id: 'service-website', en: 'Custom Service Website', ar: 'موقع خدمي مخصّص',     priceOnRequest: true, internal: { from: 650, monthly: 80 } },
  { id: 'eshop',           en: 'Custom E-Shop',          ar: 'متجر إلكتروني مخصّص', priceOnRequest: true, internal: { from: 1500, monthly: 120, connectAltMonthly: 49 } },
]

export const APP_SERVICES: ProjectService[] = [
  { id: 'simple-app',   en: 'Simple App',   ar: 'تطبيق بسيط',  priceOnRequest: true, internal: { from: 2400, monthly: 150 } },
  { id: 'advanced-app', en: 'Advanced App', ar: 'تطبيق متقدم', priceOnRequest: true, internal: { from: 4500, monthly: 200 } },
]

// ─── Verticals = CONFIGURATION ONLY (landing copy → same 3 universal tiers) ──

export type Vertical = { id: string; en: string; ar: string; slug: string }

export const VERTICALS: Vertical[] = [
  { id: 'clinic',        en: 'Clinics',       ar: 'العيادات',         slug: 'clinics' },
  { id: 'salon',         en: 'Salons',        ar: 'الصالونات',        slug: 'salons' },
  { id: 'spa',           en: 'Spas',          ar: 'السبا',            slug: 'spas' },
  { id: 'gym',           en: 'Gyms',          ar: 'الجيم',            slug: 'gyms' },
  { id: 'garage',        en: 'Auto Garages',  ar: 'الورش',            slug: 'garages' },
  { id: 'restaurant',    en: 'Restaurants',   ar: 'المطاعم',          slug: 'restaurants' },
  { id: 'real-estate',   en: 'Real Estate',   ar: 'العقارات',         slug: 'real-estate' },
  { id: 'home-business', en: 'Home Business', ar: 'المشاريع المنزلية', slug: 'home-businesses' },
]

export function getVerticalBySlug(slug: string): Vertical | undefined {
  return VERTICALS.find(v => v.slug === slug)
}

// ─── Home Business Categories (14 — discovery form intake; kept from current) ─

export const HOME_BUSINESS_CATEGORIES = [
  { icon: '🍰', ar: 'الأكل والمشروبات',     en: 'Food & Drinks' },
  { icon: '🧴', ar: 'البيوتي والعطور',       en: 'Beauty & Perfumes' },
  { icon: '👗', ar: 'الملابس والإكسسوارات', en: 'Fashion & Accessories' },
  { icon: '🛍️', ar: 'البيع والتجزئة',       en: 'Sales & Retail' },
  { icon: '🚗', ar: 'خدمات السيارات',        en: 'Car Services' },
  { icon: '📚', ar: 'التعليم والتدريس',      en: 'Education & Tutoring' },
  { icon: '🎨', ar: 'الإبداع والفنون',       en: 'Creative & Arts' },
  { icon: '🏥', ar: 'الصحة واللياقة',        en: 'Health & Fitness' },
  { icon: '🍪', ar: 'الحلويات والكيكات',     en: 'Sweets & Cakes' },
  { icon: '🐶', ar: 'الأطفال والعائلة',      en: 'Kids & Family' },
  { icon: '🔧', ar: 'الخدمات المنزلية',      en: 'Home Services' },
  { icon: '💼', ar: 'الكوتش والاستشارات',    en: 'Coaching & Consulting' },
  { icon: '🕌', ar: 'التقنية',                en: 'Technology' },
  { icon: '✨', ar: 'وأكثر',                  en: 'And more' },
]

// ─── Demo Conversations (Kuwaiti dialect) — preserved verbatim ──────────────

export const DEMO_CONVERSATIONS: Record<string, { en: string[]; ar: string[] }[]> = {

  clinic: [
    { en: ['Hi, I need to book a dental appointment for a cleaning'], ar: ['هلا، أبي أحجز موعد عند دكتور الأسنان، تنظيف أسنان'] },
    { en: ['Hala! 😊 We have slots available this week. Which day works best for you — weekday or weekend?'], ar: ['هلا وغلا! 😊 عندنا مواعيد متاحة هالأسبوع. متى تحب؟ — يوم دوام ولا عطلة؟'] },
    { en: ['Wednesday evening if possible, around 6 or 7pm'], ar: ['الأربعاء المساء لو في، حوالي ٦ أو ٧'] },
    { en: ['Perfect! Wednesday we have 6:00pm and 7:30pm open. Which one works for you?'], ar: ['زين! الأربعاء عندنا الساعة ٦ مساءً و ٧:٣٠. أي وقت يناسبك؟'] },
    { en: ['6pm is great. Also — how much does a cleaning cost?'], ar: ['الساعة ٦ تمام. وبس — جم سعر التنظيف؟'] },
    { en: ['Cleaning is 25 KWD. Includes scaling, polishing, and a full checkup. Shall I confirm the 6pm slot for you?'], ar: ['التنظيف بـ ٢٥ دينار. يشمل التنظيف العميق والتلميع وفحص كامل. أأكد لك موعد الساعة ٦؟'] },
    { en: ['Yes please, my name is Ahmad Al-Rashidi'], ar: ['أكيد، اسمي أحمد الراشدي'] },
    { en: ["✅ Done, Ahmad! Wednesday 6:00pm confirmed. You'll get a WhatsApp reminder 2 hours before. See you then! 🦷"], ar: ['✅ تم يا أحمد! الأربعاء الساعة ٦ مساءً مؤكد. راح يوصلك تذكير على واتساب قبل ساعتين. نشوفك على خير! 🦷'] },
  ],

  salon: [
    { en: ['Hey, is Fatima available this Saturday for a keratin treatment?'], ar: ['هلا، فاطمة فاضيه يوم السبت؟ أبي أسوي كيراتين'] },
    { en: ["Hala! Let me check Fatima's schedule... ✅ She has Saturday at 11am and 2pm open. Which works?"], ar: ['هلا! ثواني أشوف جدول فاطمة الحين... ✅ عندها السبت الساعة ١١ الصبح و ٢ الظهر. أي وقت يناسب؟'] },
    { en: ['2pm is better. How long does keratin take?'], ar: ['الساعة ٢ أحسن. وجم ياخذ الكيراتين وقت؟'] },
    { en: ["Keratin takes around 2.5 to 3 hours depending on hair length. Fatima's fully available from 2pm. Want me to book it?"], ar: ['الكيراتين ياخذ تقريباً ٢.٥ إلى ٣ ساعات حسب طول الشعر. فاطمة فاضية من الساعة ٢. أحجز؟'] },
    { en: ['Yes! And what\'s the price?'], ar: ['أكيد! وجم سعرها؟'] },
    { en: ['Keratin with Fatima is 45 KWD. Includes blow-dry and style finish. Should I put your name down?'], ar: ['الكيراتين عند فاطمة بـ ٤٥ دينار. يشمل مجفف وتسريحة نهائية. أحط اسمك؟'] },
    { en: ["Please, it's Mariam"], ar: ['لو سمحتي، اسمي مريم'] },
    { en: ['✅ Booked, Mariam! Saturday 2:00pm with Fatima — Keratin. Reminder coming your way the morning of 💅'], ar: ['✅ تم الحجز يا مريم! السبت الساعة ٢ مع فاطمة — كيراتين. راح يوصل تذكير صباح اليوم 💅'] },
  ],

  spa: [
    { en: ['Hi, I want to book a Swedish massage for this Thursday'], ar: ['هلا، أبي أحجز مساج سويدي يوم الخميس'] },
    { en: ['Hala! 😊 Thursday we have availability at 3pm, 5pm, and 7pm. Which time works best for you?'], ar: ['هلا وغلا! 😊 الخميس عندنا مواعيد الساعة ٣ و٥ و٧. أي وقت يناسبك؟'] },
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
    { en: ["✅ Khalid, you're in! 3-month membership registered. Our team will send payment details on WhatsApp within minutes. See you at the gym! ðª"], ar: ['✅ يا خالد، تم تسجيلك! اشتراك ٣ أشهر محجوز. فريقنا راح يرسللك تفاصيل الدفع على واتساب بدقايق. نشوفك بالجيم! 💪'] },
  ],

  garage: [
    { en: ['Hi, I left my Camry with you guys yesterday. Any update?'], ar: ['هلا، خليت الكامري عندكم أمس. في أي تحديث؟'] },
    { en: ['Hala! Let me check... Your Camry (plate: 12345) — engine oil done ✅, AC filter replaced ✅. Currently waiting on a brake pad part, arrives tomorrow morning إن شاء الله.'], ar: ['هلا! أشوف الحين... الكامري (لوحة: ١٢٣٤٥) — تغيير الزيت خلاص ✅، فلتر التكييف اتغير ✅. الحين ننطر قطعة الفرامل، توصل باجر الصبح إن شاء الله.'] },
    { en: ['Okay good. And roughly how much is the total going to be?'], ar: ['زين. وتقريباً جم يطلع الحساب كامل؟'] },
    { en: ["Estimated total: 75–85 KWD depending on the brake pad price. We'll send the exact invoice on WhatsApp once the part arrives. No surprises ð"], ar: ['الحساب المتوقع: ٧٥–٨٥ دينار حسب سعر قطعة الفرامل. نرسل الفاتورة الدقيقة على واتساب لما توصل القطعة. ماكو مفاجآت 👍'] },
    { en: ['Good. And when will it be fully ready for pickup?'], ar: ['حلو. ومتى تكون جاهزة للاستلام بالكامل؟'] },
    { en: ["If the part arrives on time tomorrow, your Camry will be ready by Thursday afternoon. We'll send you a WhatsApp message the moment it's done ✅"], ar: ['إذا وصلت القطعة باجر بوقتها، الكامري تكون جاهزة الخميس بعد الظهر. نرسللك رسالة واتساب وقت ما تخلص ✅'] },
    { en: ['Perfect. And can I pay by knet when I pick it up?'], ar: ['تمام. وأقدر أدفع كي-نت وقت الاستلام؟'] },
    { en: ["Akeed! We accept Knet, cash, and bank transfer. No problem at all. See you Thursday, and laa tsheel hamm — your car is in good hands 🔧"], ar: ['أكيد! نقبل كي-نت، كاش، وتحويل بنكي. ولا يهمك. نشوفك الخميس، لا تشيل هم — سيارتك بأيدٍ أمينة 🔧'] },
  ],

  restaurant: [
    { en: ['Hey, do you have a table for 5 this Friday evening?'], ar: ['هلا، عندكم طاولة لـ٥ أشخاص يوم الجمعة المساء؟'] },
    { en: ['Hala! Friday evening we have availability at 7:30pm and 9:00pm for 5 guests. Any preference?'], ar: ['هلا وغلا! الجمعة المساء عندنا طاولة متاحة الساعة ٧:٣٠ والساعة ٩ لـ٥ أشخاص. أي وقت يناسبكم؟'] },
    { en: ['7:30pm works. Is it indoors or outdoors? We prefer outside'], ar: ['الساعة ٧:٣٠ تمام. هل الطاولة داخلية ولا خارجية؟ نبي برّة'] },
    { en: ['Great choice! We have outdoor seating available at 7:30pm. Should I reserve an outdoor table for 5 in your name?'], ar: ['خيار ممتاز! عندنا جلوس خارجي متاح الساعة ٧:٣٠. أحجزلكم طاولة برّة لـ٥ بإسمك؟'] },
    { en: ['Yes please. Also, do you have a set menu or à la carte?'], ar: ['اي لو سمحت. وهل عندكم مينيو ثابت ولا بوفيه؟'] },
    { en: ["Both! Full à la carte menu plus a weekend set menu at 12 KWD per person (3 courses). I'll send the full menu link on WhatsApp 🍽️ What's the name for the reservation?"], ar: ['الثنين! قائمة مينيو كاملة وكذلك البوفيه للعطلة بـ ١٢ دينار للشخص (٣ أطباق). أرسللك رابط المنيو الكامل على واتساب 🍽️ شنو الاسم للحجز؟'] },
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
    { en: ["✅ Viewing confirmed! Tomorrow 6:00pm — Salmiya, 8th floor sea view unit. I'll send you the exact location and our agent's number on WhatsApp. Yalla, see you there! ð¢"], ar: ['✅ تمت جدولة المعاينة! باجر الساعة ٦ مساءً — السالمية، الطابق الثامن، إطلالة البحر. أرسللك الموقع الدقيق ورقم الوكيل على واتساب. يالله نشوفك هناك! 🏢'] },
  ],

  'home-business': [
    { en: ['Hi, I saw your page on Instagram. Do you take custom cake orders?'], ar: ['هلا، شفت صفحتك على انستغرام. تقبلين طلبات كيكات مخصصة؟'] },
    { en: ['Hala, welcome! 😊 Yes, I take custom cake orders. What\'s the occasion — birthday, wedding, or something else?'], ar: ['هلا وغلا! 😊 أكيد أقبل طلبات مخصصة. شنو المناسبة — عيد ميلاد، أفراح، ولا شي ثاني؟'] },
    { en: ['Birthday cake for 20 people, this Friday. Is that possible?'], ar: ['كيكة عيد ميلاد لـ٢٠ شخص، يوم الجمعة هذا. ممكن؟'] },
    { en: ["Friday is doable! I need the order by Wednesday to start prep. What flavor and design are you thinking?"], ar: ['الجمعة ممكن! أحتاج الطلب يوم الأربعاء لأبدأ التحضير. شنو النكهة والتصميم اللي تبيه؟'] },
    { en: ['Vanilla sponge with strawberry cream. And can you write a name on it?'], ar: ['إسفنجية فانيلا بكريمة فراولة. وتقدرين تكتبين اسم عليها؟'] },
    { en: ['Absolutely! Name writing is included. A custom cake for 20 people is 28 KWD. Delivery to Kuwait City areas is 3 KWD extra. Shall I confirm your order?'], ar: ['أكيدي! كتابة الاسم مشمولة. كيكة مخصصة لـ٢٠ شخص بـ ٢٨ دينار. التوصيل لمناطق مدينة الكويت ٣ دنانير إضافية. أأكد طلبك؟'] },
    { en: ["Yes please! My name is Dalal, delivery to Rumaithiya"], ar: ['أكيدي! اسمي دلال، توصيل الرميثية'] },
    { en: ['✅ Order confirmed, Dalal! Vanilla sponge + strawberry cream for 20, Friday delivery to Rumaithiya — total 31 KWD. I\'ll send payment details on WhatsApp now ð'], ar: ['✅ تم تأكيد الطلب يا دلال! فانيلا بفراولة لـ٢٠، توصيل الجمعة الرميثية — المجموع ٣١ دينار. أرسللك تفاصيل الدفع على واتساب الحين 🎂'] },
  ],
}

// ─── B2B track ("MindSync Business") ─ DEFERRED (no data yet) ────────────────
// Internal/back-office AI (staff assistant, ops automation, OCR). Project-priced,
// quoted per engagement. Intentionally kept OUT of TIERS.
