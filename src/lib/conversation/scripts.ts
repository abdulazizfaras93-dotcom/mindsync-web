import type { BusinessCategory, PainKey } from '@/types/conversation'

// ─── Categories & Pains (unchanged) ──────────────────────────────────────────

export const CATEGORIES: { id: BusinessCategory; icon: string; en: string; ar: string }[] = [
  { id: 'service', icon: '📅', en: "Services & appointments", ar: 'خدمات ومواعيد' },
  { id: 'product', icon: '🛍️', en: "Products & orders",       ar: 'منتجات وطلبات' },
]

export const PAINS: { id: PainKey; en: string; ar: string; icon: string }[] = [
  { id: 'time',     icon: '💬', en: 'Replying to customer messages by hand on WhatsApp — and sometimes I forget', ar: 'الرد على مسجات الزباين يدويا عالواتساب، ومرات أنسى أرد' },
  { id: 'response', icon: '📅', en: 'Bookings pile up on me or orders get forgotten',          ar: 'الحجوزات تزيد علي أو الطلبات تنسي' },
  { id: 'orders',   icon: '🔁', en: "I don't have time to answer all the customer questions",  ar: 'ما عندي وقت أرد على كل أسئلة الزباين' },
  { id: 'scale',    icon: '🙃', en: 'All of them — I need a full fix',    ar: 'كلهم — أبي حل شامل' },
]

// ─── STAGE 1 — Warm Open ─────────────────────────────────────────────────────

export const STAGE1_BUBBLES = [
  { en: "Hey 👋 I'm MindSync.",                          ar: 'هلا 👋 أنا مايندسينك' },
  { en: 'I build complete smart business-management systems for business owners.', ar: 'أبني نظام إدارة اعمال ذكي كامل لأصحاب المشاريع' },
  { en: "Before we start — what's your business?",       ar: 'قبل ما نبدأ — شنو مشروعك؟' },
]

// ─── STAGE 2 — Discover the Pain ─────────────────────────────────────────────

const STAGE2_INTROS: Record<BusinessCategory, { en: string; ar: string }> = {
  service: { ar: 'تمام 📅 — المشاريع الخدمية تعتمد على المواعيد والمتابعة، وأي تأخير يكلف عميل.', en: "Got it 📅 — Service businesses run on appointments and follow-up, and any delay costs a client." },
  product: { ar: 'تمام 🛍️ — مشاريع المنتجات تعتمد على سرعة الرد والطلبات، وأي رسالة تفوت تعني بيعة تضيع.', en: "Got it 🛍️ — Product businesses run on fast replies and orders, and every missed message is a lost sale." },
}

export const STAGE2_QUESTION = {
  en: 'Which of these do you face in your daily operations?',
  ar: 'شنو من هالمشاكل تواجه في عمليات مشروعك اليومية؟',
}

export function getStage2Message(category: BusinessCategory, isAr: boolean): string {
  const intro = STAGE2_INTROS[category]
  const question = isAr ? STAGE2_QUESTION.ar : STAGE2_QUESTION.en
  return `${isAr ? intro.ar : intro.en}\n\n${question}`
}

// ─── STAGE 3 — Amplify the Problem ───────────────────────────────────────────

const STAGE3_AMPLIFY: Record<PainKey, Record<BusinessCategory, { en: string; ar: string }>> = {
  time: {
    service: { ar: 'العميل اللي ما رديت عليه بسرعة حجز عند غيرك\nتأخر الرد مو بس بيعة ضايعة — هو عميل راح\nوفي الخدمات، سرعة الرد هي اللي تبني سمعتك', en: "The client you did not answer quickly booked elsewhere\nA slow reply is not just a lost sale — it is a lost client\nIn services, response speed is what builds your reputation" },
    product: { ar: 'الرسايل تتراكم وأنت متوهق، والعميل اللي ما انتبهت له يشتري من حساب ثاني\nأغلب قرارات الشراء تصير بالليل بعد الدوام — وأنت مو موجود\nكل رسالة بدون رد تعني بيعة محتملة طارت', en: "Messages pile up while you are overwhelmed, and the customer you missed buys from another page\nMost buying decisions happen at night, after hours — and you are not there\nEvery unanswered message is a potential sale gone" },
  },
  response: {
    service: { ar: 'الموعد اللي ما اتأكد أو ما وصله تذكير يعني وقت فاضي وخسارة مباشرة\nوالعميل اللي جاء ولقى الجدول مب مرتب — ما يرجع\nكل غياب بدون نظام يكلفك وقت وفلوس', en: "An unconfirmed appointment with no reminder means empty time and direct loss\nAnd a client who arrives to a disorganized schedule does not come back\nEvery no-show without a system costs you time and money" },
    product: { ar: 'الطلب اللي ما اتأكد يعني عميل محبط وبيعة ضايعة\nوفي المناسبات والزحمة، الطلبات تتلخبط وتنسى\nوكل طلب يضيع يعني فلوس وسمعة', en: "An unconfirmed order means a frustrated customer and a lost sale\nDuring busy seasons and occasions, orders get mixed up and forgotten\nAnd every lost order means money and reputation" },
  },
  orders: {
    service: { ar: 'نفس الأسئلة كل يوم — الأسعار، الأوقات، الموقع — تاكل وقتك\nوأنت المفروض تركز على خدمة عملائك مو على ردود متكررة\nالوقت اللي يروح على «جم السعر؟» ما يرجع', en: "The same questions daily — prices, timings, location — eat your time\nYou should be focusing on serving clients, not repeating answers\nThe time lost to 'how much?' never comes back" },
    product: { ar: 'نفس الأسئلة ألف مرة — «بكم؟»، «متوفر؟»، «في بالأسود؟»\nوأنت تعيد نفس الكلام بدل ما تركز على مشروعك\nكل دقيقة على سؤال متكرر تعني وقت من إنتاجك', en: "The same questions a thousand times — 'how much?', 'available?', 'got it in black?'\nYou repeat yourself instead of focusing on your business\nEvery minute on a repeat question is time taken from your work" },
  },
  scale: {
    service: { ar: 'الثلاث مع بعض تعني إنك دايماً تطفي حرايق بدل ما تطوّر مشروعك\nمواعيد ضايعة، ردود متأخرة، وأسئلة متكررة — كلها بنفس الوقت\nوالحل مو شغل أكثر — حل شامل يدير كل هذا عنك', en: "All three together mean you are always firefighting instead of growing\nMissed appointments, late replies, and repeat questions — all at once\nThe fix is not more work — it is one system that runs it all for you" },
    product: { ar: 'الثلاث مع بعض تعني مشروع يشتغل أقل من طاقته\nطلبات تضيع، ردود تتأخر، وأسئلة ما تخلص — كل هذا يومياً\nلو حسبت الخسارة الشهرية، الرقم أكبر مما تتوقع', en: "All three together mean a business running below its potential\nLost orders, delayed replies, and endless questions — every day\nIf you add up the monthly loss, the number is bigger than you think" },
  },
}

export function getStage3Message(pain: PainKey, category: BusinessCategory, isAr: boolean): string {
  return isAr
    ? STAGE3_AMPLIFY[pain][category].ar
    : STAGE3_AMPLIFY[pain][category].en
}

// ─── STAGE 4 — Introduce MindSync ────────────────────────────────────────────

export const STAGE3_DEMO_INTRO = {
  en: 'Here\'s an example from a system I built 👇',
  ar: 'هذا مثال من نظام بنيته 👇',
}

const STAGE4_SOLUTIONS: Record<PainKey, { en: string; ar: string }> = {
  time: {
    ar: 'تخيل وكيل ذكي يرد على كل رسالة بأسلوبك — خلال ثواني\nيفرق بين الاستفسار العادي والطلب الجدّي\nويحوّل لك الناس المهمين بس 💚',
    en: 'Imagine an AI agent that replies to every message in your style — in seconds\nIt separates casual enquiries from serious buyers\nAnd only escalates what actually needs you 💚',
  },
  response: {
    ar: 'تخيل نظام يأخذ الحجوزات من واتساب وإنستقرام تلقائياً\nيحطها في لوحة منظمة\nويرسل تذكير تلقائي قبل الموعد بـ ٢٤ ساعة 💚',
    en: 'Imagine a system that captures bookings from WhatsApp & Instagram automatically\nOrganises them in one clear dashboard\nAnd sends automatic reminders 24 hours before each appointment 💚',
  },
  orders: {
    ar: 'تخيل نظام يجاوب على ٩٠٪ من الأسئلة المتكررة بنفسه\nالأسعار، الأوقات، الـ FAQ — كلها تمشي تلقائياً\nوأنت تتدخل بس بالأسئلة الحساسة 💚',
    en: 'Imagine a system that answers 90% of repetitive questions on its own\nPrices, timings, FAQs — all automated\nAnd you only step in for the sensitive ones 💚',
  },
  scale: {
    ar: 'تخيل منظومة وحدة تحل الثلاث:\nترد، تحجز، وتتابع — كأن عندك فريق كامل\nبدون فريق 💚',
    en: 'Imagine one system that solves all three:\nReplies, books, and follows up — like having a full team\nWithout the team 💚',
  },
}

export function getStage4Message(pain: PainKey, isAr: boolean): string {
  return isAr ? STAGE4_SOLUTIONS[pain].ar : STAGE4_SOLUTIONS[pain].en
}

// ─── STAGE 5 — Objections ────────────────────────────────────────────────────

export type ObjectionKey = 'price' | 'notTech' | 'thinking' | 'competitors' | 'noTime'

export const OBJECTIONS: { id: ObjectionKey; en: string; ar: string }[] = [
  { id: 'price',       en: 'Sounds expensive',              ar: 'يبدو غالي' },
  { id: 'notTech',     en: 'I\'m not tech-savvy',           ar: 'أنا مو تقني' },
  { id: 'thinking',    en: 'I need to think about it',      ar: 'أبي أفكر فيه' },
  { id: 'competitors', en: 'Others offer the same thing',   ar: 'في ناس ثانيين يسوون نفس الشي' },
  { id: 'noTime',      en: 'I\'m too busy to learn something new', ar: 'ما عندي وقت أتعلم شي جديد' },
]

const STAGE5_RESPONSES: Record<ObjectionKey, { en: string; ar: string }> = {
  price: {
    ar: 'فهمك — بس خلنا نحسب بشكل ثاني\nجم عميل ضايع منك بالشهر بسبب هالمشكلة؟\nالأغلب خسارة أسبوع وحد تغطي الاشتراك كله',
    en: 'Fair point — but let\'s calculate it differently\nHow many clients are you losing monthly because of this problem?\nUsually one week of losses covers the entire subscription',
  },
  notTech: {
    ar: 'ما عليك شي تقني — خالص\nإحنا نبني، نشغّل، ونصلح كل شي\nأنت بس تستلم النتائج',
    en: 'Nothing technical is required from you — at all\nWe build, run, and fix everything\nYou just receive the results',
  },
  thinking: {
    ar: 'طبعاً — بس سؤال واحد قبل\nجم شي يضيع منك أسبوعياً بسبب هالمشكلة؟\nلأن كل أسبوع بدون حل = خسارة حقيقية',
    en: 'Of course — but one question first\nHow much is slipping away weekly because of this problem?\nBecause every week without a solution = real loss',
  },
  competitors: {
    ar: 'في فريلانسرز يسلّمون وبعدين ما تشوفهم\nإحنا نبني، نشغّل، ونحدّث الوكيل كل شهر حسب مشروعك\nمو تسليم وبس — شراكة مستمرة',
    en: 'Some freelancers deliver and disappear\nWe build, run, and update the agent monthly based on your business\nNot just delivery — an ongoing partnership',
  },
  noTime: {
    ar: 'ما في شي تتعلمه — خالص\nالوكيل يشتغل من الخلف على قنواتك الحالية\nروتينك ما يتغير — النتائج تتحسن',
    en: 'Nothing to learn — at all\nThe agent works in the background on your existing channels\nYour routine doesn\'t change — your results do',
  },
}

export function getStage5Response(objection: ObjectionKey, isAr: boolean): string {
  return isAr ? STAGE5_RESPONSES[objection].ar : STAGE5_RESPONSES[objection].en
}

// ─── STAGE 6 — Present the Offer ─────────────────────────────────────────────

export const STAGE4_INTRO = {
  en: 'Like what you see? 💚\nBuilt right here in Kuwait. Three tiers — pick the level that fits your business.\nStart with a paid 30-day Pilot, credited to your setup if you continue:',
  ar: 'عجبك؟ 💚\nمبني هني في الكويت. ثلاث باقات — اختر المستوى اللي يناسب مشروعك.\nتقدر تبدأ بتجربة ٣٠ يوم مدفوعة، وتُحتسب ضمن رسوم التأسيس إذا استمريت:',
}

export const OFFER_DETAILS = {
  ar: {
    title: 'ثلاث باقات — اختر مستواك',
    setup: 'رسوم التأسيس تبدأ من ١٥٥ دينار — مرة وحدة',
    monthly: 'من ٧٩ دينار بالشهر',
    includes: [
      'موظف الاستقبال — من ١٥٥ تأسيس / ٧٩ بالشهر · ١٠٠٠ محادثة',
      'المنسّق (الأكثر طلباً) — من ٢٨٥ تأسيس / ١٤٩ بالشهر · ٣٠٠٠ محادثة',
      'المدير — من ٤٨٥ تأسيس / ٢٩٩ بالشهر · ٨٠٠٠ محادثة',
      'كل الباقات: لهجة كويتية، ردود فورية، مراقبة وصيانة شهرية',
      'كل تكاليف الذكاء الاصطناعي مشمولة — ما في فواتير مفاجئة',
    ],
    extra: [
      'محادثات إضافية: +٣٠ دينار لكل ١٠٠٠ محادثة',
      'تقدر تترقّى أو تنزّل الباقة في أي وقت',
    ],
    trial: 'تجربة ٣٠ يوم مدفوعة بـ ١٥٠ دينار — وكيل حقيقي على مشروعك، وتُحتسب ضمن رسوم التأسيس إذا استمريت',
  },
  en: {
    title: 'Three tiers — pick your level',
    setup: 'Setup from 155 KWD — one time',
    monthly: 'From 79 KWD/month',
    includes: [
      'Sync Receptionist — from 155 setup / 79/mo · 1,000 conversations',
      'Sync Coordinator (Most Popular) — from 285 setup / 149/mo · 3,000 conversations',
      'Sync Manager — from 485 setup / 299/mo · 8,000 conversations',
      'Every tier: Kuwaiti dialect, instant replies, monthly monitoring & maintenance',
      'All AI costs covered — no surprise bills',
    ],
    extra: [
      'Extra conversations: +30 KWD per 1,000',
      'Upgrade or downgrade your tier anytime',
    ],
    trial: 'Paid 30-Day Pilot for 150 KWD — a live agent on your real business, credited to setup if you continue',
  },
}

// ─── STAGE 7 — Close ─────────────────────────────────────────────────────────

export const STAGE5_INTRO = {
  en: 'Sure, ask whatever you want 🌸',
  ar: 'أكيد، اسأل اللي تبي 🌸',
}

export const STAGE5_FOLLOWUP = {
  en: 'You have a lot of questions 😊 Want a quick 15-min call instead?',
  ar: 'عندك أسئلة كثيرة 😊 تبي نسوي مكالمة ١٥ دقيقة بدل؟',
}

export const CLOSE_MESSAGE = {
  ar: 'تمام! الخطوة الأولى بسيطة — عب استمارة قصيرة عشان فريقنا يفهم مشروعك أكثر\n👉 mindsynckw.com/discovery\nما تاخذ منك أكثر من ٣ دقايق — وبعدها إن شاء الله نبدأ 🚀',
  en: 'Let\'s go! Fill out a quick form so our team can understand your business and reach out.\n👉 mindsynckw.com/discovery\nTakes under 3 minutes — and we\'ll take it from there 🚀',
}

export const DISCOVERY_LINK = 'https://mindsynckw.com/discovery'

// ─── Animated demo scripts per category (unchanged) ──────────────────────────

type DemoLine = { role: 'user' | 'ai'; en: string; ar: string }

export const DEMO_SCRIPTS: Record<BusinessCategory, DemoLine[]> = {
  service: [
    { role: 'user', en: "Hi, I want to book an appointment", ar: 'هلا، أبي أحجز موعد' },
    { role: 'ai',   en: "Hello 🌿\nSure! We have slots tomorrow and Thursday. Which works for you?", ar: 'هلا وغلا 🌿\nأكيد! عندنا مواعيد باجر والخميس. أي وقت يناسبك؟' },
    { role: 'user', en: "Tomorrow evening", ar: 'باجر المساء' },
    { role: 'ai',   en: "Done ✓ Tomorrow 6:00 PM booked\nI will send a reminder before your appointment 📅", ar: 'تم ✓ باجر ٦:٠٠ م محجوز\nراح يوصلك تذكير قبل موعدك 📅' },
  ],
  product: [
    { role: 'user', en: "Hi, is this available? I want to order", ar: 'هلا، المنتج متوفر؟ أبي أطلب' },
    { role: 'ai',   en: "Hello 🛍️\nYes, available! How many would you like?", ar: 'هلا وغلا 🛍️\nإي متوفر! جم قطعة تبي؟' },
    { role: 'user', en: "Two, with delivery", ar: 'ثنتين، مع التوصيل' },
    { role: 'ai',   en: "Done ✓ 2 reserved + delivery\nSent you the payment link — KNET or transfer 💳", ar: 'تم ✓ حجزت ٢ + التوصيل\nأرسلت لك رابط الدفع — كي نت أو تحويل 💳' },
  ],
}
