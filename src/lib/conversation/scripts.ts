import type { BusinessCategory, PainKey } from '@/types/conversation'

export const CATEGORIES: { id: BusinessCategory; icon: string; en: string; ar: string }[] = [
  { id: 'food',          icon: '🍰', en: 'Food & Drinks',          ar: 'الأكل والمشروبات' },
  { id: 'beauty',        icon: '🧴', en: 'Beauty & Perfumes',       ar: 'البيوتي والعطور' },
  { id: 'fashion',       icon: '👗', en: 'Fashion & Accessories',   ar: 'الملابس والإكسسوارات' },
  { id: 'retail',        icon: '🛍️', en: 'Sales & Retail',         ar: 'البيع والتجزئة' },
  { id: 'cars',          icon: '🚗', en: 'Car Services',            ar: 'خدمات السيارات' },
  { id: 'education',     icon: '📚', en: 'Education & Tutoring',    ar: 'التعليم والتدريس' },
  { id: 'creative',      icon: '🎨', en: 'Creative & Arts',         ar: 'الإبداع والفنون' },
  { id: 'health',        icon: '🏥', en: 'Health & Fitness',        ar: 'الصحة واللياقة' },
  { id: 'sweets',        icon: '🍪', en: 'Sweets & Cakes',          ar: 'الحلويات والكيكات' },
  { id: 'kids',          icon: '🐶', en: 'Kids & Family',           ar: 'الأطفال والعائلة' },
  { id: 'home-services', icon: '🔧', en: 'Home Services',           ar: 'الخدمات المنزلية' },
  { id: 'coaching',      icon: '💼', en: 'Coaching & Consulting',   ar: 'الكوتش والاستشارات' },
  { id: 'tech',          icon: '🕌', en: 'Technology',              ar: 'التقنية' },
  { id: 'other',         icon: '✨', en: 'Other',                   ar: 'أخرى' },
]

export const PAINS: { id: PainKey; en: string; ar: string; icon: string }[] = [
  { id: 'time',     icon: '⏰', en: 'Answering the same questions every day',     ar: 'رد على نفس الأسئلة كل يوم' },
  { id: 'response', icon: '💬', en: 'Customers waiting too long for a reply',     ar: 'زبائن ينتظرون رد طول' },
  { id: 'orders',   icon: '📦', en: 'Managing orders manually in WhatsApp',       ar: 'تنظيم الطلبات يدوي في واتساب' },
  { id: 'scale',    icon: '📈', en: 'Can\'t grow without hiring more staff',       ar: 'ما أقدر أكبّر بدون موظفين إضافيين' },
]

// Stage 1 greeting
export const STAGE1_GREETING = {
  en: "Hi! I'm the MindSync AI. Tell me — what type of business do you run?",
  ar: 'أهلاً! أنا ذكاء MindSync. قولي — شو نوع نشاطك التجاري؟',
}

// Stage 2 — pain question (after category selected)
export function getStage2Message(category: BusinessCategory, isAr: boolean): string {
  const cat = CATEGORIES.find(c => c.id === category)
  const name = isAr ? cat?.ar : cat?.en
  if (isAr) return `ممتاز! كثير من أصحاب ${name ?? 'المشاريع'} يواجهون تحديات مشتركة. أكبر تحدي عندك؟`
  return `Great choice! Most ${name ?? 'business'} owners face similar challenges. What's your biggest one?`
}

// Stage 3 — solution message (after pain selected)
export function getStage3Message(pain: PainKey, category: BusinessCategory, isAr: boolean): string {
  const solutions: Record<PainKey, { en: string; ar: string }> = {
    time: {
      en: `Your AI agent answers every question instantly — 24/7, in Arabic and English. No more copy-pasting the same reply.`,
      ar: `وكيلك الذكي يرد على كل سؤال فوراً — ٢٤/٧، بالعربي والإنجليزي. لا مزيد من نسخ ولصق نفس الرد.`,
    },
    response: {
      en: `Customers get a reply in under 3 seconds — even at 2 AM. Your AI never sleeps, never misses a message.`,
      ar: `الزبائن يحصلون على رد خلال ٣ ثواني — حتى الساعة ٢ صباحاً. وكيلك الذكي ما ينام، ما يغفل.`,
    },
    orders: {
      en: `Every order captured automatically — with customer name, items, and delivery details — no WhatsApp chaos.`,
      ar: `كل طلب يُسجَّل تلقائياً — مع اسم الزبون والمنتجات وتفاصيل التوصيل — لا فوضى واتساب.`,
    },
    scale: {
      en: `Handle 10x more customers without hiring. Your AI works all channels simultaneously — WhatsApp, Instagram, more.`,
      ar: `تعامل مع ١٠ أضعاف الزبائن بدون توظيف. وكيلك يشتغل على كل القنوات في نفس الوقت.`,
    },
  }
  const s = solutions[pain]
  const msg = isAr ? s.ar : s.en
  const cat = CATEGORIES.find(c => c.id === category)
  const _ = cat // category available for future per-industry customization
  return msg
}

// Stage 3 — demo intro
export const STAGE3_DEMO_INTRO = {
  en: 'Here\'s how your AI agent would handle a real customer conversation 👇',
  ar: 'شوف كيف وكيلك الذكي يتعامل مع زبون حقيقي 👇',
}

// Stage 4 — pricing teaser (before showing card)
export const STAGE4_INTRO = {
  en: 'Ready to automate your business? Here\'s everything that\'s included:',
  ar: 'جاهز تأتمت نشاطك؟ هذا كل شي مشمول:',
}

// Stage 5 — FAQ intro
export const STAGE5_INTRO = {
  en: 'Any questions before you get started?',
  ar: 'عندك أسئلة قبل تبدأ؟',
}

// Animated demo scripts per category
type DemoLine = { role: 'user' | 'ai'; en: string; ar: string }

export const DEMO_SCRIPTS: Record<BusinessCategory, DemoLine[]> = {
  food: [
    { role: 'user', en: 'Do you deliver to Salmiya?',        ar: 'توصلون لسالمية؟' },
    { role: 'ai',   en: 'Yes! We deliver to Salmiya. Delivery takes 45–60 min. What would you like to order? 🍔', ar: 'نعم! نوصل لسالمية. التوصيل ٤٥–٦٠ دقيقة. شو تحب تطلب؟ 🍔' },
    { role: 'user', en: '2 burgers please',                  ar: 'برجرين لو سمحت' },
    { role: 'ai',   en: 'Got it — 2 burgers. Your name and address? 📦', ar: 'تمام — برجرين. اسمك وعنوانك؟ 📦' },
  ],
  beauty: [
    { role: 'user', en: 'Do you have lip fillers available?', ar: 'عندكم حقن شفايف؟' },
    { role: 'ai',   en: 'Yes! Lip fillers starting from 35 KWD. Would you like to book a consultation? 💋', ar: 'نعم! حقن الشفايف تبدأ من ٣٥ د.ك. تبي تحجزين استشارة؟ 💋' },
    { role: 'user', en: 'Yes please, this Thursday',          ar: 'نعم، الخميس إذا ممكن' },
    { role: 'ai',   en: 'Thursday is available at 2 PM or 5 PM — which works for you? 🗓️', ar: 'الخميس متاح الساعة ٢ أو ٥ — أيهم يناسبك؟ 🗓️' },
  ],
  fashion: [
    { role: 'user', en: 'Do you have abayas in size L?',     ar: 'عندكم عباية مقاس L؟' },
    { role: 'ai',   en: 'Yes! We have 3 styles in size L. Let me send you photos 📸', ar: 'نعم! عندنا ٣ موديلات مقاس L. أرسل لك صور 📸' },
    { role: 'user', en: 'How much is the black one?',        ar: 'بكم السوداء؟' },
    { role: 'ai',   en: 'The black abaya is 28 KWD. Free delivery for orders over 20 KWD! 🎁', ar: 'العباية السوداء ٢٨ د.ك. توصيل مجاني فوق ٢٠ د.ك! 🎁' },
  ],
  retail: [
    { role: 'user', en: 'Is this item still in stock?',      ar: 'هذي المنتج لا زال موجود؟' },
    { role: 'ai',   en: 'Yes, still available! How many would you like? 📦', ar: 'نعم، متوفر! كم قطعة تريد؟ 📦' },
    { role: 'user', en: '3 pieces',                          ar: '٣ قطع' },
    { role: 'ai',   en: 'Adding 3 to your order. Payment is COD or bank transfer. Which do you prefer? 💳', ar: 'سأضيف ٣ للطلب. الدفع عند الاستلام أو تحويل. أيهم تفضل؟ 💳' },
  ],
  cars: [
    { role: 'user', en: 'How much for an oil change?',       ar: 'بكم تغيير الزيت؟' },
    { role: 'ai',   en: 'Oil change starts at 8 KWD (includes filter). Can you come in tomorrow? 🔧', ar: 'تغيير الزيت يبدأ من ٨ د.ك (مع الفلتر). تقدر تجي بكرة؟ 🔧' },
    { role: 'user', en: 'Yes morning is fine',               ar: 'نعم الصبح تمام' },
    { role: 'ai',   en: 'Booked! Tomorrow morning 9 AM. We\'ll send a reminder 1 hour before 🚗', ar: 'تم الحجز! بكرة الصبح ٩. نرسل لك تذكير قبل ساعة 🚗' },
  ],
  education: [
    { role: 'user', en: 'Do you tutor math for grade 10?',   ar: 'عندكم دروس رياضيات للصف العاشر؟' },
    { role: 'ai',   en: 'Yes! We cover all grades. Sessions are online or in-home. What subject? 📚', ar: 'نعم! نغطي كل الصفوف. الجلسات أونلاين أو في البيت. أي مادة؟ 📚' },
    { role: 'user', en: 'Math and physics both',             ar: 'رياضيات وفيزياء' },
    { role: 'ai',   en: 'Great! Combined package from 45 KWD/month. Want a free trial session? 🎓', ar: 'ممتاز! باكج مشترك من ٤٥ د.ك/شهر. تبي جلسة تجريبية مجانية؟ 🎓' },
  ],
  creative: [
    { role: 'user', en: 'Do you do custom portraits?',       ar: 'تسوون بورتريه شخصي؟' },
    { role: 'ai',   en: 'Yes! Custom portraits in watercolor or digital. Delivery 5–7 days 🎨', ar: 'نعم! بورتريه مخصص بالألوان المائية أو رقمي. التسليم ٥–٧ أيام 🎨' },
    { role: 'user', en: 'How much for a family portrait?',   ar: 'بكم بورتريه عائلي؟' },
    { role: 'ai',   en: 'Family portrait (4 people): 35 KWD digital / 65 KWD framed. Which do you prefer? 🖼️', ar: 'بورتريه عائلي (٤ أشخاص): ٣٥ د.ك رقمي / ٦٥ د.ك مع إطار. أيهم تفضل؟ 🖼️' },
  ],
  health: [
    { role: 'user', en: 'Do you have female trainers?',      ar: 'عندكم مدربات؟' },
    { role: 'ai',   en: 'Yes! 3 female trainers available — home, gym, or online sessions 💪', ar: 'نعم! ٣ مدربات متاحات — في البيت، جيم، أو أونلاين 💪' },
    { role: 'user', en: 'Home sessions, 3x a week',          ar: 'جلسات في البيت، ٣ مرات أسبوعياً' },
    { role: 'ai',   en: 'Package: 3x/week home = 120 KWD/month. Want to start this week? 📅', ar: 'باكج: ٣ مرات/أسبوع في البيت = ١٢٠ د.ك/شهر. تبين تبدأين هالأسبوع؟ 📅' },
  ],
  sweets: [
    { role: 'user', en: 'Can I order a custom birthday cake?', ar: 'أقدر أطلب كيكة عيد ميلاد مخصصة؟' },
    { role: 'ai',   en: 'Of course! Custom cakes for any occasion 🎂 Min. 48h notice. What date?', ar: 'طبعاً! كيك مخصص لأي مناسبة 🎂 نحتاج ٤٨ ساعة إشعار. أي تاريخ؟' },
    { role: 'user', en: 'This Friday',                        ar: 'الجمعة' },
    { role: 'ai',   en: 'Friday is available! Sizes from 25 KWD. How many people? 🎉', ar: 'الجمعة متاحة! الأحجام تبدأ من ٢٥ د.ك. كم شخص؟ 🎉' },
  ],
  kids: [
    { role: 'user', en: 'Do you have activities for kids 4–7?', ar: 'عندكم أنشطة للأطفال ٤–٧ سنين؟' },
    { role: 'ai',   en: 'Yes! Arts, music, and sports for ages 3–10. Weekend and weekday sessions 🎈', ar: 'نعم! فنون، موسيقى، ورياضة للأعمار ٣–١٠. جلسات أسبوعية وعطلة نهاية الأسبوع 🎈' },
    { role: 'user', en: 'Weekends only for now',              ar: 'نهاية الأسبوع فقط للحين' },
    { role: 'ai',   en: 'Weekend package: 40 KWD/month (4 sessions). Want to try a free first class? 🌟', ar: 'باكج نهاية الأسبوع: ٤٠ د.ك/شهر (٤ جلسات). تبي تجرب أول حصة مجاناً؟ 🌟' },
  ],
  'home-services': [
    { role: 'user', en: 'Do you fix AC units?',              ar: 'تصلحون مكيفات؟' },
    { role: 'ai',   en: 'Yes! AC repair, cleaning & installation. Same-day service available 🛠️', ar: 'نعم! إصلاح، تنظيف وتركيب مكيفات. خدمة في نفس اليوم 🛠️' },
    { role: 'user', en: 'How much for a cleaning?',          ar: 'بكم التنظيف؟' },
    { role: 'ai',   en: 'AC cleaning: 12 KWD/unit. 2+ units = 10 KWD each. When are you free? 📋', ar: 'تنظيف مكيف: ١٢ د.ك/جهاز. جهازين فأكثر = ١٠ د.ك/جهاز. متى تكون حاضر؟ 📋' },
  ],
  coaching: [
    { role: 'user', en: 'Do you offer business coaching?',   ar: 'عندكم كوتشينج أعمال؟' },
    { role: 'ai',   en: 'Yes! 1-on-1 business coaching — strategy, sales, and mindset. Online or in-person 💼', ar: 'نعم! كوتشينج أعمال فردي — استراتيجية، مبيعات، وعقلية. أونلاين أو وجهاً لوجه 💼' },
    { role: 'user', en: 'What\'s the price per session?',    ar: 'كم سعر الجلسة؟' },
    { role: 'ai',   en: 'Sessions from 60 KWD. First consultation is FREE 🎯 Want to book?', ar: 'الجلسات من ٦٠ د.ك. الاستشارة الأولى مجانية 🎯 تبي تحجز؟' },
  ],
  tech: [
    { role: 'user', en: 'Do you build mobile apps?',         ar: 'تطورون تطبيقات موبايل؟' },
    { role: 'ai',   en: 'Yes! iOS and Android apps. Free consultation to scope your project 📱', ar: 'نعم! تطبيقات iOS وAndroid. استشارة مجانية لتحديد نطاق مشروعك 📱' },
    { role: 'user', en: 'I need an ordering app',            ar: 'أحتاج تطبيق للطلبات' },
    { role: 'ai',   en: 'Ordering apps start from 2,000 KWD. Want a free requirements call this week? 🚀', ar: 'تطبيقات الطلبات تبدأ من ٢٠٠٠ د.ك. تبي مكالمة متطلبات مجانية هالأسبوع؟ 🚀' },
  ],
  other: [
    { role: 'user', en: 'Hi, can you help me?',              ar: 'أهلاً، ممكن تساعدني؟' },
    { role: 'ai',   en: 'Of course! I\'m here 24/7. What do you need? 😊',  ar: 'طبعاً! أنا هنا ٢٤/٧. شو تحتاج؟ 😊' },
    { role: 'user', en: 'I want to know about your prices',  ar: 'أبي أعرف عن الأسعار' },
    { role: 'ai',   en: 'Happy to help! Let me pull up our latest pricing for you 📋', ar: 'بكل سرور! خليني أجيب لك آخر الأسعار 📋' },
  ],
}
