import type { BusinessCategory, PainKey } from '@/types/conversation'

export const CATEGORIES: { id: BusinessCategory; icon: string; en: string; ar: string }[] = [
  { id: 'food',          icon: '🍰', en: 'Food & Drinks',          ar: 'أكل ومشروبات' },
  { id: 'beauty',        icon: '💄', en: 'Beauty & Perfumes',       ar: 'بيوتي وعطور' },
  { id: 'fashion',       icon: '👗', en: 'Fashion & Accessories',   ar: 'ملابس وإكسسوارات' },
  { id: 'retail',        icon: '🛍️', en: 'Sales & Retail',         ar: 'بيع وريتيل' },
  { id: 'cars',          icon: '🚗', en: 'Car Services',            ar: 'خدمات السيارات' },
  { id: 'education',     icon: '📚', en: 'Education & Tutoring',    ar: 'تعليم وتدريس' },
  { id: 'creative',      icon: '🎨', en: 'Creative & Arts',         ar: 'إبداع وفنون' },
  { id: 'health',        icon: '💪', en: 'Health & Fitness',        ar: 'صحة ولياقة' },
  { id: 'sweets',        icon: '🍪', en: 'Sweets & Cakes',          ar: 'حلويات وكيكات' },
  { id: 'kids',          icon: '👶', en: 'Kids & Family',           ar: 'أطفال وعائلة' },
  { id: 'home-services', icon: '🔧', en: 'Home Services',           ar: 'خدمات منزلية' },
  { id: 'coaching',      icon: '💼', en: 'Coaching & Consulting',   ar: 'كوتش واستشارات' },
  { id: 'tech',          icon: '🛠️', en: 'Technology',              ar: 'تقنية' },
  { id: 'other',         icon: '✨', en: 'Other Business',          ar: 'مشروع ثاني' },
]

export const PAINS: { id: PainKey; en: string; ar: string; icon: string }[] = [
  { id: 'time',     icon: '💬', en: 'I get lost in DMs and WhatsApp',          ar: 'أتلخبط بالـ DMs والواتساب وأنسى أرد' },
  { id: 'response', icon: '📅', en: 'Bookings / orders get forgotten',          ar: 'الحجوزات تتعدى أو الطلبات تنسى' },
  { id: 'orders',   icon: '🔁', en: 'Repeating myself answering the same Qs',  ar: 'ما عندي وقت أرد على كل سؤال «جم السعر؟»' },
  { id: 'scale',    icon: '🙃', en: 'All of the above — I need a full fix',    ar: 'كلها — أبي حل شامل' },
]

// ─── Stage 1 ──────────────────────────────────────────────────────────────────

export const STAGE1_BUBBLES = [
  { en: "Hey 👋 I'm MindSync.", ar: 'هلا 👋 أنا MindSync.' },
  { en: 'I build AI systems for Kuwaiti home businesses.', ar: 'أبني أنظمة AI للمشاريع الكويتية اللي تبدأ من البيت.' },
  { en: 'Before we start — what kind of business do you run?', ar: 'قبل ما نبدأ — شنو نوع مشروعك؟' },
]

// ─── Stage 2 ──────────────────────────────────────────────────────────────────

const STAGE2_INTROS: Record<BusinessCategory, { en: string; ar: string }> = {
  food:          { ar: 'تمام 🍰 مشاريع الأكل المنزلي أكثر شي يواجهونه…', en: 'Got it 🍰 Home food businesses usually face...' },
  beauty:        { ar: 'تمام 💄 مشاريع البيوتي والعطور أغلبها…',           en: 'Got it 💄 Beauty & perfume businesses often...' },
  fashion:       { ar: 'تمام 👗 مشاريع الملابس والإكسسوارات عادةً…',       en: 'Got it 👗 Fashion businesses usually deal with...' },
  retail:        { ar: 'تمام 🛍️ صاحب مشروع البيع المنزلي أكثر شي يلخبطه…', en: 'Got it 🛍️ Retail businesses struggle most with...' },
  cars:          { ar: 'تمام 🚗 خدمات السيارات تعاني من…',                  en: 'Got it 🚗 Car service businesses usually face...' },
  education:     { ar: 'تمام 📚 مشاريع التعليم والتدريس أكثر شي…',          en: 'Got it 📚 Education businesses typically deal with...' },
  creative:      { ar: 'تمام 🎨 مشاريع الإبداع والفنون غالبها…',            en: 'Got it 🎨 Creative businesses usually struggle with...' },
  health:        { ar: 'تمام 💪 مشاريع الصحة واللياقة أكثر شي…',           en: 'Got it 💪 Health & fitness businesses often face...' },
  sweets:        { ar: 'تمام 🍪 مشاريع الحلويات والكيكات أكثر شي يواجهون…', en: 'Got it 🍪 Sweets & cakes businesses usually struggle with...' },
  kids:          { ar: 'تمام 👶 مشاريع الأطفال والعائلة غالبها…',            en: 'Got it 👶 Kids & family businesses often deal with...' },
  'home-services': { ar: 'تمام 🔧 الخدمات المنزلية أكثر شي تواجهه…',        en: 'Got it 🔧 Home service businesses usually face...' },
  coaching:      { ar: 'تمام 💼 الكوتش والاستشارات أكثر شي يلخبطهم…',      en: 'Got it 💼 Coaching businesses typically deal with...' },
  tech:          { ar: 'تمام 🛠️ مشاريع التقنية أكثر شي…',                  en: 'Got it 🛠️ Tech businesses usually struggle with...' },
  other:         { ar: 'تمام ✨ أغلب المشاريع المنزلية تواجه…',              en: 'Got it ✨ Most home businesses face...' },
}

export const STAGE2_QUESTION = {
  en: 'Which of these is your biggest challenge?',
  ar: 'أي وحدة من هالمشاكل تواجهك؟',
}

export function getStage2Message(category: BusinessCategory, isAr: boolean): string {
  const intro = STAGE2_INTROS[category]
  const question = isAr ? STAGE2_QUESTION.ar : STAGE2_QUESTION.en
  return `${isAr ? intro.ar : intro.en}\n\n${question}`
}

// ─── Stage 3 solutions ────────────────────────────────────────────────────────

const STAGE3_SOLUTIONS: Record<PainKey, { en: string; ar: string }> = {
  time: {
    ar: 'فهمت 💚 الحل:\nنظام يرد على كل رسالة بأسلوبك خلال ثوانٍ، يفرق بين الاستفسار العادي والطلب الجدّي، ويحوّل لك الناس المهمين بس.',
    en: 'Got it 💚 The fix:\nA system that replies in seconds in your style, separates casual enquiries from serious buyers, and only escalates what needs you.',
  },
  response: {
    ar: 'فهمت 💚 الحل:\nنظام يأخذ الحجوزات من واتساب وانستقرام، يحطها بلوحة منظمة، ويرسل تذكير تلقائي قبل الموعد بـ ٢٤ ساعة.',
    en: 'Got it 💚 The fix:\nA system that captures bookings from WhatsApp & Instagram, organises them in a dashboard, and sends automatic reminders 24h before.',
  },
  orders: {
    ar: 'فهمت 💚 الحل:\nنظام يجاوب على ٩٠٪ من الأسئلة المتكررة بنفسه (الأسعار، الأوقات، الـ FAQ) — وأنت تتدخل بس بالأسئلة الحساسة.',
    en: 'Got it 💚 The fix:\nA system that answers 90% of repetitive questions on its own (prices, hours, FAQs) — you only step in for the sensitive ones.',
  },
  scale: {
    ar: 'فهمت 💚 الحل:\nمنظومة وحدة تحل الثلاث: ترد، تحجز، وتتابع — كأن عندك فريق كامل بدون فريق.',
    en: 'Got it 💚 The fix:\nOne system that does all three: replies, books, and follows up — like having a full team without the team.',
  },
}

export const STAGE3_DEMO_INTRO = {
  en: 'Here\'s an example from a system I built 👇',
  ar: 'هذا مثال من نظام بنيته 👇',
}

export function getStage3Message(pain: PainKey, _category: BusinessCategory, isAr: boolean): string {
  return isAr ? STAGE3_SOLUTIONS[pain].ar : STAGE3_SOLUTIONS[pain].en
}

// ─── Stage 4 ──────────────────────────────────────────────────────────────────

export const STAGE4_INTRO = {
  en: 'Like what you see? Here\'s the price 💸',
  ar: 'عجبك؟ خل أوريك السعر 💸',
}

// ─── Stage 5 ──────────────────────────────────────────────────────────────────

export const STAGE5_INTRO = {
  en: 'Sure, ask whatever you want 🌸',
  ar: 'أكيد، اسأل اللي تبي 🌸',
}

export const STAGE5_FOLLOWUP = {
  en: 'You have a lot of questions 😊 Want a quick 15-min call instead?',
  ar: 'عندك أسئلة كثيرة 😊 تبي نسوي مكالمة 15 دقيقة بدل؟',
}

// ─── Animated demo scripts per category ───────────────────────────────────────

type DemoLine = { role: 'user' | 'ai'; en: string; ar: string }

export const DEMO_SCRIPTS: Record<BusinessCategory, DemoLine[]> = {
  food: [
    { role: 'user', en: 'Assalam o alaikum, I want a chocolate cake for 10 people', ar: 'السلام عليكم، أبي كيكة شوكولاتة لـ ١٠ أشخاص' },
    { role: 'ai',   en: 'Wa alaikum assalam 🍫\nChocolate cake for 10: 15 KWD\nWhen do you want it?', ar: 'وعليكم السلام 🍫\nكيكة شوكولاتة ١٠ أشخاص: ١٥ د.ك\nمتى تبيها؟' },
    { role: 'user', en: 'Tomorrow at 6',              ar: 'باجر الساعة ٦' },
    { role: 'ai',   en: 'Done ✓ Ready tomorrow 6 PM\nSent you the payment link: [link]', ar: 'تم ✓ راح تكون جاهزة باجر ٦ م\nارسلت لك رابط الدفع: [link]' },
  ],
  beauty: [
    { role: 'user', en: 'How much for lash extensions?', ar: 'كم سعر الرفرفة؟' },
    { role: 'ai',   en: 'Hello 🌸\nClassic lashes: 12 KWD\nVolume: 18 KWD\nWant to book?', ar: 'هلا حبيبتي 🌸\nالرفرفة الكلاسيك: ١٢ د.ك\nالفوليوم: ١٨ د.ك\nتبين تحجزين؟' },
    { role: 'user', en: 'Yes, tomorrow afternoon', ar: 'إي، باجر العصر' },
    { role: 'ai',   en: 'Done ✓ Tomorrow 4:30 PM\nSent you the confirmation link on WhatsApp', ar: 'تم ✓ غداً ٤:٣٠ م\nأرسلت لج رابط التأكيد على واتساب' },
  ],
  fashion: [
    { role: 'user', en: 'Do you have abayas in size L?', ar: 'عندكم عباية مقاس L؟' },
    { role: 'ai',   en: 'Yes! 3 styles in size L. Let me send you photos 📸', ar: 'إي عندنا 3 موديلات مقاس L.\nأرسل لج الصور 📸' },
    { role: 'user', en: 'How much is the black one?', ar: 'بكم السوداء؟' },
    { role: 'ai',   en: 'Black abaya: 28 KWD 🖤\nFree delivery over 20 KWD! Want it?', ar: 'العباية السوداء: ٢٨ د.ك 🖤\nتوصيل مجاني فوق ٢٠ د.ك! تبينها؟' },
  ],
  retail: [
    { role: 'user', en: 'Is this still in stock?',  ar: 'هذي المنتج لا زال موجود؟' },
    { role: 'ai',   en: 'Yes still available! How many do you need? 📦', ar: 'إي متوفر! جم قطعة تريد؟ 📦' },
    { role: 'user', en: '3 pieces', ar: '٣ قطع' },
    { role: 'ai',   en: '3 pieces added ✓\nPayment: COD or transfer. Which do you prefer? 💳', ar: 'تم حجز ٣ قطع ✓\nالدفع: عند الاستلام أو تحويل. أيهم تفضل؟ 💳' },
  ],
  cars: [
    { role: 'user', en: 'How much for an oil change?', ar: 'بكم تغيير الزيت؟' },
    { role: 'ai',   en: 'Oil change from 8 KWD (filter included) 🔧\nCan you come tomorrow?', ar: 'تغيير الزيت يبدأ من ٨ د.ك (مع الفلتر) 🔧\nتقدر تجي بكرة؟' },
    { role: 'user', en: 'Yes morning is fine', ar: 'إي الصبح زين' },
    { role: 'ai',   en: 'Booked! Tomorrow 9 AM\nWe\'ll remind you 1 hour before 🚗', ar: 'تم الحجز! بكرة ٩ الصبح\nراح ترسل لك تذكير قبل ساعة 🚗' },
  ],
  education: [
    { role: 'user', en: 'Do you tutor grade 10 math?', ar: 'عندكم مدرس رياضيات للصف العاشر؟' },
    { role: 'ai',   en: 'Yes! All grades, online or at home 📚\nWhich subject?', ar: 'إي، كل الصفوف، أونلاين أو في البيت 📚\nأي مادة؟' },
    { role: 'user', en: 'Math and physics', ar: 'رياضيات وفيزياء' },
    { role: 'ai',   en: 'Combined package from 45 KWD/mo 🎓\nWant a free trial session?', ar: 'باكج مشترك من ٤٥ د.ك/شهر 🎓\nتبي جلسة تجريبية مجانية؟' },
  ],
  creative: [
    { role: 'user', en: 'Do you do custom portraits?', ar: 'تسوون بورتريه شخصي؟' },
    { role: 'ai',   en: 'Yes! Watercolor or digital, 5-7 days 🎨\nHow many people?', ar: 'إي! بالألوان المائية أو رقمي، ٥–٧ أيام 🎨\nجم شخص؟' },
    { role: 'user', en: 'A family of 4', ar: 'عيلة ٤ أشخاص' },
    { role: 'ai',   en: 'Family portrait (4): 35 KWD digital / 65 KWD framed 🖼️\nWhich do you prefer?', ar: 'بورتريه عيلة (٤): ٣٥ د.ك رقمي / ٦٥ د.ك مع إطار 🖼️\nأيهم تفضل؟' },
  ],
  health: [
    { role: 'user', en: 'Do you have female trainers?', ar: 'عندكم مدربات؟' },
    { role: 'ai',   en: 'Yes! 3 female trainers — home, gym, or online 💪', ar: 'إي! ٣ مدربات — في البيت، جيم، أو أونلاين 💪' },
    { role: 'user', en: 'Home sessions 3x a week', ar: 'جلسات بالبيت، ٣ مرات أسبوعياً' },
    { role: 'ai',   en: '3x/week home package: 120 KWD/mo 📅\nStart this week?', ar: 'باكج ٣ مرات/أسبوع بالبيت: ١٢٠ د.ك/شهر 📅\nتبدأين هالأسبوع؟' },
  ],
  sweets: [
    { role: 'user', en: 'Can I order a custom birthday cake?', ar: 'أقدر أطلب كيكة عيد ميلاد مخصصة؟' },
    { role: 'ai',   en: 'Of course! Any occasion 🎂\nWe need 48h notice. What date?', ar: 'طبعاً! أي مناسبة 🎂\nنحتاج ٤٨ ساعة إشعار. أي تاريخ؟' },
    { role: 'user', en: 'This Friday', ar: 'الجمعة هذي' },
    { role: 'ai',   en: 'Friday is available! Sizes from 25 KWD 🎉\nHow many people?', ar: 'الجمعة متاحة! الأحجام تبدأ من ٢٥ د.ك 🎉\nجم شخص؟' },
  ],
  kids: [
    { role: 'user', en: 'Do you have activities for kids 4-7?', ar: 'عندكم أنشطة للأطفال من ٤ لـ ٧ سنين؟' },
    { role: 'ai',   en: 'Yes! Arts, music & sports for ages 3-10 🎈\nWeekend or weekday?', ar: 'إي! فنون، موسيقى، ورياضة للأعمار ٣–١٠ 🎈\nنهاية الأسبوع أو أثناء الأسبوع؟' },
    { role: 'user', en: 'Weekends only', ar: 'نهاية الأسبوع بس' },
    { role: 'ai',   en: 'Weekend package: 40 KWD/mo (4 sessions) 🌟\nFree first class?', ar: 'باكج نهاية الأسبوع: ٤٠ د.ك/شهر (٤ جلسات) 🌟\nتبي أول حصة مجاناً؟' },
  ],
  'home-services': [
    { role: 'user', en: 'Do you fix ACs?', ar: 'تصلحون مكيفات؟' },
    { role: 'ai',   en: 'Yes! Repair, cleaning & installation 🛠️\nSame-day available. When?', ar: 'إي! إصلاح، تنظيف، وتركيب 🛠️\nخدمة نفس اليوم متاحة. متى تبي؟' },
    { role: 'user', en: 'How much for cleaning?', ar: 'بكم التنظيف؟' },
    { role: 'ai',   en: 'AC cleaning: 12 KWD/unit\n2+ units = 10 KWD each 📋\nBook now?', ar: 'تنظيف مكيف: ١٢ د.ك/جهاز\n٢ أجهزة فأكثر = ١٠ د.ك/جهاز 📋\nتحجز الحين؟' },
  ],
  coaching: [
    { role: 'user', en: 'Do you offer business coaching?', ar: 'عندكم كوتشينج أعمال؟' },
    { role: 'ai',   en: 'Yes! 1-on-1 — strategy, sales & mindset 💼\nOnline or in-person. Interested?', ar: 'إي! فردي — استراتيجية، مبيعات، وعقلية 💼\nأونلاين أو وجهاً لوجه. تبي تعرف أكثر؟' },
    { role: 'user', en: 'How much per session?', ar: 'جم سعر الجلسة؟' },
    { role: 'ai',   en: 'Sessions from 60 KWD\nFirst consultation FREE 🎯\nBook yours?', ar: 'الجلسات من ٦٠ د.ك\nالاستشارة الأولى مجانية 🎯\nتحجز وقتك؟' },
  ],
  tech: [
    { role: 'user', en: 'Do you build mobile apps?', ar: 'تطورون تطبيقات موبايل؟' },
    { role: 'ai',   en: 'Yes! iOS & Android 📱\nFree consultation to scope your project. When are you free?', ar: 'إي! iOS وAndroid 📱\nاستشارة مجانية لتحديد المشروع. متى تكون حاضر؟' },
    { role: 'user', en: 'I need an ordering app', ar: 'أحتاج تطبيق للطلبات' },
    { role: 'ai',   en: 'Ordering apps from 2,000 KWD 🚀\nFree requirements call this week?', ar: 'تطبيقات الطلبات تبدأ من ٢٠٠٠ د.ك 🚀\nمكالمة متطلبات مجانية هالأسبوع؟' },
  ],
  other: [
    { role: 'user', en: 'Hi, can you help me?', ar: 'هلا، تقدر تساعدني؟' },
    { role: 'ai',   en: 'Of course! I\'m here 24/7 😊\nWhat do you need?', ar: 'طبعاً! أنا هنا ٢٤/٧ 😊\nشنو تحتاج؟' },
    { role: 'user', en: 'What are your prices?', ar: 'شنو أسعاركم؟' },
    { role: 'ai',   en: 'Happy to help! Pulling up the latest pricing for you 📋', ar: 'بكل سرور! أجيب لك آخر الأسعار الحين 📋' },
  ],
}