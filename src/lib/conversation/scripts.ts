import type { BusinessCategory, PainKey } from '@/types/conversation'

// ─── Categories & Pains (unchanged) ──────────────────────────────────────────

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

// ─── STAGE 1 — Warm Open ─────────────────────────────────────────────────────

export const STAGE1_BUBBLES = [
  { en: "Hey 👋 I'm MindSync.",                          ar: 'هلا 👋 أنا MindSync.' },
  { en: 'I build AI systems for Kuwaiti businesses.',    ar: 'أبني أنظمة AI للمشاريع الكويتية.' },
  { en: "Before we start — what kind of business do you run?", ar: 'قبل ما نبدأ — شنو نوع مشروعك؟' },
]

// ─── STAGE 2 — Discover the Pain ─────────────────────────────────────────────

const STAGE2_INTROS: Record<BusinessCategory, { en: string; ar: string }> = {
  food:          { ar: 'تمام 🍰 — بوقت الزحمة، تحس إن في طلبات تضيع عليك؟',                          en: 'Got it 🍰 — During busy hours, do you feel like orders are slipping through?' },
  beauty:        { ar: 'تمام 💄 — العملاء يسألون عن منتج وبعدين ما يتم الرد عليهم بسرعة؟',             en: 'Got it 💄 — Do customers ask about a product and then not get a reply fast enough?' },
  fashion:       { ar: 'تمام 👗 — تجاوب على نفس الأسئلة — المقاس، اللون، السعر — كل يوم؟',             en: 'Got it 👗 — Do you find yourself answering the same questions — size, color, price — every day?' },
  retail:        { ar: 'تمام 🛍️ — في عملاء يسألونك بعد الدوام وما تييهم ردود؟',                       en: 'Got it 🛍️ — Do customers message you after hours and get no reply?' },
  cars:          { ar: 'تمام 🚗 — عملاءك يتصلون يسألون وين سيارتهم وأنت في نص الشغل؟',                en: 'Got it 🚗 — Do customers call asking about their car while you\'re busy working?' },
  education:     { ar: 'تمام 📚 — الطلاب أو أهاليهم يسألون نفس الأسئلة مرتين وثلاث كل أسبوع؟',        en: 'Got it 📚 — Do students or parents ask the same questions two or three times a week?' },
  creative:      { ar: 'تمام 🎨 — تييك استفسارات وأنت مشغول بشغلك وما تقدر ترد بسرعة؟',               en: 'Got it 🎨 — Do inquiries come in while you\'re busy creating and you can\'t reply fast?' },
  health:        { ar: 'تمام 💪 — عملاءك يحجزون جلسات وبعدين ما يحضرون لأن ما وصل لهم إشعار؟',        en: 'Got it 💪 — Do clients book sessions and then not show up because they never got a reminder?' },
  sweets:        { ar: 'تمام 🍪 — جم رسالة تندز لعميل واحد عشان طلبه؟',                               en: 'Got it 🍪 — How many messages go back and forth just to confirm one order?' },
  kids:          { ar: 'تمام 👶 — الأهل يسألون عن تفاصيل الأنشطة وأنت تعيد نفس الكلام كل مرة؟',        en: 'Got it 👶 — Do parents ask about activity details and you repeat the same thing every time?' },
  'home-services': { ar: 'تمام 🔧 — عميل طلب عرض سعر وما رديت عليه بسرعة — وراح لغيرك؟',             en: 'Got it 🔧 — Has a customer asked for a quote and gone to a competitor because you replied too late?' },
  coaching:      { ar: 'تمام 💼 — العميل حضر للجلسة الأولى وأنت ما تعرف عنه شي — تبدأ من الصفر؟',      en: 'Got it 💼 — Do clients show up to their first session and you know nothing about them?' },
  tech:          { ar: 'تمام 🛠️ — تييك استفسارات بأشكال مختلفة وأنت لازم تفرز كل واحدة وتوجهها؟',     en: 'Got it 🛠️ — Do inquiries come in all forms and you have to manually sort and route each one?' },
  other:         { ar: 'تمام ✨ — أكبر شي يأخذ منك وقت في التواصل مع عملاءك شنو هو؟',                  en: 'Got it ✨ — What takes the most of your time when dealing with customers?' },
}

export const STAGE2_QUESTION = {
  en: 'Which of these is your biggest challenge?',
  ar: 'أي وحدة من هالمشاكل تواجهك أكثر؟',
}

export function getStage2Message(category: BusinessCategory, isAr: boolean): string {
  const intro = STAGE2_INTROS[category]
  const question = isAr ? STAGE2_QUESTION.ar : STAGE2_QUESTION.en
  return `${isAr ? intro.ar : intro.en}\n\n${question}`
}

// ─── STAGE 3 — Amplify the Problem ───────────────────────────────────────────

const STAGE3_AMPLIFY: Record<PainKey, Record<BusinessCategory, { en: string; ar: string }>> = {
  time: {
    food:          { ar: 'والله هذي مشكلة كل صاحب كلاود كيتشن\nكل طلب ضايع = فلوس طارت + عميل راح لمنافس\nلو ضاع منك ١٠ طلبات بالأسبوع — جم تخسر بالشهر؟',          en: 'Every cloud kitchen owner faces this\nEvery missed order = lost money + a customer who went elsewhere\nIf 10 orders slip per week — what does that cost monthly?' },
    beauty:        { ar: 'صح — العميلة اللي ما رديت عليها بسرعة راحت لغيرك\nتأخر الرد مو بس خسارة بيعة — هو خسارة عميلة بالكامل\nوانت تعبت تبني سمعة المشروع — هالعميلة تستاهل رد سريع',          en: 'Exactly — the customer who didn\'t get a fast reply went elsewhere\nA delayed reply isn\'t just a lost sale — it\'s a lost client\nYou worked hard to build your reputation — she deserves a fast response' },
    fashion:       { ar: 'إي، والله — الرسايل تتراكم وأنت متوهق\nالعميل اللي ما انتبهت له بسرعة يروح يشتري من حساب ثاني\nالسوشيال ميديا سريعة — العميل ما ينطر',          en: 'Exactly — messages pile up and you\'re overwhelmed\nThe customer you didn\'t catch fast enough buys from another page\nSocial media moves fast — customers don\'t wait' },
    retail:        { ar: 'هذي مشكلة وايد من أصحاب المشاريع يعانون منها بصمت\nالعميل اللي يسأل بعد الدوام وما تييه ردود — ما يرجع\nأغلب قرارات الشراء تصير بالليل — وأنت مو موجود',          en: 'Most business owners suffer this silently\nA customer who asks after hours and gets no reply — won\'t come back\nMost purchase decisions happen at night — and you\'re not there' },
    cars:          { ar: 'والله هذا تشتيت حقيقي — بين الشغل والرد على العملاء\nكل مكالمة تقاطعك تأخر الشغل\nالعميل اللي ما رديت عليه — يتصل لغيرك المرة الثانية',          en: 'This is real distraction — split between work and replying\nEvery call that interrupts you slows down the job\nA customer you didn\'t answer — calls a competitor next time' },
    education:     { ar: 'إي، والله — نفس الأسئلة كل يوم تاكل من وقتك\nالوقت الضايع على الردود المتكررة كان ممكن يكون تدريس حقيقي\nوكل طالب ما رديت عليه بسرعة — راح لأكاديمية ثانية',          en: 'Exactly — same questions daily eat up your time\nTime wasted on repetitive replies could be real teaching time\nAnd every student you didn\'t answer fast — went to another academy' },
    creative:      { ar: 'والله هذي مشكلة كل فنان — الشغل يحتاج تركيز والعملاء يحتاجون ردود\nالاستفسار اللي ما انردّ عليه بسرعة = عميل قرر إنك مو جدي\nفي سوق الإبداع — الانطباع الأول يصنع القرار',          en: 'Every artist faces this — work needs focus, clients need replies\nAn unanswered inquiry = a client who decided you\'re not serious\nIn the creative market — first impressions make decisions' },
    health:        { ar: 'الغيابات بدون إشعار مشكلة حقيقية — وقت ضايع وجلسة فاضية\nكل جلسة فاضية = خسارة مباشرة + إحباط\nلو حسبت جلسات فاضية بالشهر — الرقم يعور',          en: 'No-shows are a real problem — wasted time and empty sessions\nEvery empty session = direct loss + frustration\nIf you count the empty sessions per month — the number hurts' },
    sweets:        { ar: 'والله، الطلبات المخصصة تاخذ وقت أكثر من الطلب نفسه أحياناً\nكل ذهاب وإياب على الواتساب = وقت من وقت الإنتاج\nفي الأعياد والمناسبات — الرسائل تتضاعف وما تقدر تلحق الكل',          en: 'Custom orders sometimes take more time to coordinate than to make\nEvery back-and-forth on WhatsApp = production time lost\nDuring holidays and occasions — messages multiply and you can\'t keep up' },
    kids:          { ar: 'الأهل يبون ردود فورية — وما عندهم صبر للانتظار\nالأهل اللي ما تييهم ردود سريعة يروحون لنشاط ثاني لعيالهم\nسمعة المشروع تتبنى على سرعة الاستجابة — مو بس جودة الخدمة',          en: 'Parents want instant replies — they have no patience for waiting\nParents who don\'t get fast replies find another activity for their kids\nReputation is built on response speed — not just service quality' },
    'home-services': { ar: 'والله، عرض السعر المتأخر يكلف عملاء وايد\nصاحب الخدمة المنزلية يخسر بالضبط لأن منافسه رد أسرع\nالعميل اللي يبي خدمة منزلية — يسأل أكثر من واحد، واللي يرد أول يكسب',          en: 'A delayed quote costs real customers\nHome service providers lose because a competitor replied faster\nA customer who needs home service — asks multiple providers, and whoever replies first wins' },
    coaching:      { ar: 'الجلسة الأولى من المفروض تكون قيمة — مو تعارف\nالوقت الضايع في فهم العميل من الصفر = وقت كان ممكن يكون تحول حقيقي\nوالعميل اللي ما حضّرت له — يطلع بنص الفايدة',          en: 'The first session should be valuable — not introductions\nTime wasted understanding a client from scratch = time that could be real transformation\nA client you didn\'t prepare for — leaves with half the value' },
    tech:          { ar: 'والله، تصنيف الطلبات يدوياً مضيعة وقت حقيقية\nكل طلب وصل للشخص الغلط أو تأخر = عميل حكم على الشركة بالبطء\nوفي عالم التقنية — البطء يساوي عدم الاحترافية بنظر العميل',          en: 'Manual sorting of requests is a real time sink\nEvery misrouted or delayed request = a client who judged you as slow\nIn tech — slow response equals unprofessional in the client\'s eyes' },
    other:         { ar: 'والله هذي مشكلة مشتركة بين أغلب المشاريع\nكل يوم المشكلة موجودة — كل يوم في خسارة محتملة\nوالحل مو بالمزيد من الجهد — بالأتمتة الصح',          en: 'This is a shared problem across most businesses\nEvery day the problem exists — there\'s potential loss\nThe solution isn\'t more effort — it\'s the right automation' },
  },
  response: {
    food:          { ar: 'والله هذي مشكلة كل صاحب كلاود كيتشن\nكل طلب ضايع = فلوس طارت + عميل راح لمنافس',          en: 'Every cloud kitchen owner faces this\nEvery missed order = lost money + a customer gone to a competitor' },
    beauty:        { ar: 'صح — الحجوزات الضايعة تكلف أكثر مما تتخيل\nالعميلة اللي ما تأكد لها الموعد — تحجز عند غيرك',          en: 'Missed bookings cost more than you think\nA customer whose appointment wasn\'t confirmed — books elsewhere' },
    fashion:       { ar: 'إي، الطلبات الضايعة بدون تأكيد مشكلة كبيرة\nالعميل يطلب وبعدين ما يلقى رد — يروح لمنافس',          en: 'Lost orders without confirmation are a big problem\nA customer orders and gets no reply — goes to a competitor' },
    retail:        { ar: 'هذي مشكلة وايد من أصحاب المشاريع يعانون منها\nالطلب اللي ما اتأكد = عميل محبط + بيعة ضايعة',          en: 'Many business owners suffer from this\nAn unconfirmed order = a frustrated customer + a lost sale' },
    cars:          { ar: 'المواعيد المتداخلة تكلف وقتك وسمعتك\nالعميل اللي جاء وما لقى موعده مرتب — ما يرجع',          en: 'Overlapping appointments cost you time and reputation\nA customer who shows up to a disorganized schedule — won\'t come back' },
    education:     { ar: 'الطالب اللي ما تأكد له الموعد — ينسى أو يلغي\nوأنت تخسر وقتك وإيرادك بنفس الوقت',          en: 'A student whose session wasn\'t confirmed — forgets or cancels\nAnd you lose your time and income at once' },
    creative:      { ar: 'الطلب المخصص بدون تأكيد = وقت ضايع في التحضير\nوالعميل اللي ما تأكد له — يطلب من غيرك',          en: 'A custom order without confirmation = wasted preparation time\nAnd a client who wasn\'t confirmed — orders from someone else' },
    health:        { ar: 'الحجوزات بدون تذكيرات = جلسات فاضية\nوكل جلسة فاضية = خسارة مباشرة',          en: 'Bookings without reminders = empty sessions\nAnd every empty session = direct loss' },
    sweets:        { ar: 'الطلب المخصص بدون تأكيد واضح = كارثة يوم التسليم\nوأنت تعبتِ في التحضير — والعميل ما جاء أو غيّر رأيه',          en: 'A custom order without clear confirmation = disaster on delivery day\nYou worked hard on it — and the client didn\'t show or changed their mind' },
    kids:          { ar: 'الأهل ينسون المواعيد وأنت اللي تتضرر\nكل نشاط فاضي = وقت وتحضير ضاع ببلاش',          en: 'Parents forget appointments and you pay the price\nEvery empty activity = wasted time and preparation' },
    'home-services': { ar: 'الموعد اللي ما اتأكد = طريق رحت فيه ببلاش\nوالعميل اللي ما وصله تذكير — ما كان موجود',          en: 'An unconfirmed appointment = a wasted trip\nAnd a client who got no reminder — wasn\'t there' },
    coaching:      { ar: 'الجلسة اللي ما اتأكدت = وقت من جدولك راح\nوالعميل اللي ما ذكّرته — يطلع عذر',          en: 'An unconfirmed session = a slot in your schedule gone\nAnd a client you didn\'t remind — finds an excuse' },
    tech:          { ar: 'الطلبات اللي ما اتأكدت تضيع في الازدحام\nوالعميل اللي ما لقى رداً — يفترض إنك مشغول ويروح',          en: 'Unconfirmed requests get lost in the chaos\nAnd a client who got no response — assumes you\'re busy and leaves' },
    other:         { ar: 'الحجوزات والطلبات الضايعة تكلف أكثر مما نتخيل\nوكل يوم بدون نظام — في خسارة محتملة',          en: 'Missed bookings and orders cost more than we imagine\nAnd every day without a system — there\'s potential loss' },
  },
  orders: {
    food:          { ar: 'والله هذي مشكلة كل صاحب كلاود كيتشن\nنفس السؤال ألف مرة — والوقت يروح على الردود بدل الطبخ',          en: 'Every cloud kitchen owner faces this\nSame question a thousand times — time goes to replies instead of cooking' },
    beauty:        { ar: 'صح — نفس الأسئلة كل يوم تاكل وقتك\n«جم سعر الرفرفة؟» — وأنت تعرف الجواب من أسبوع',          en: 'Exactly — same questions daily eat your time\n"How much for lashes?" — and you\'ve known the answer for weeks' },
    fashion:       { ar: 'إي، والله — «في بالأسود؟» عشر مرات باليوم\nوأنت مو قادر تركزين على شي ثاني',          en: 'Exactly — "Do you have it in black?" ten times a day\nAnd you can\'t focus on anything else' },
    retail:        { ar: 'نفس الأسئلة كل يوم تهلك وقتك\nوالعميل اللي ما رديت عليه بسرعة — راح لغيرك',          en: 'Same questions daily drain your time\nAnd a customer you didn\'t reply to fast — went elsewhere' },
    cars:          { ar: 'نفس الأسئلة — «بكم تغيير الزيت؟» كل يوم\nوأنت لازم تترك شغلك عشان ترد',          en: 'Same questions — "How much for an oil change?" every day\nAnd you have to stop your work to reply' },
    education:     { ar: 'نفس الأسئلة كل أسبوع تاكل وقت التدريس\n«كم السعر؟ وين الموقع؟ في أوقات ثانية؟»',          en: 'Same questions every week eat into teaching time\n"What\'s the price? Where\'s the location? Are there other timings?"' },
    creative:      { ar: 'كل عميل يسأل من الأول — الأسعار، المدة، شلون تطلب\nوأنت تقطع تركيزك في كل مرة',          en: 'Every client asks from scratch — prices, timeline, how to order\nAnd you break your focus every time' },
    health:        { ar: 'نفس الأسئلة كل يوم — الأسعار، الجدول، الموقع\nوأنت من المفروض تكون تدرّب مو ترد',          en: 'Same questions daily — prices, schedule, location\nAnd you should be training, not replying' },
    sweets:        { ar: 'كل عميلة تسأل من الأول — الأحجام، الأسعار، المدة، المكونات\nوأنتِ تعيدين نفس الكلام مرة بعد مرة',          en: 'Every customer asks from scratch — sizes, prices, timing, ingredients\nAnd you repeat the same thing over and over' },
    kids:          { ar: 'الأهل يسألون نفس الأسئلة كل مرة — الأسعار، الأوقات، السن المناسب\nوأنت تعيد نفس الكلام كل أسبوع',          en: 'Parents ask the same questions every time — prices, timings, suitable age\nAnd you repeat the same answer every week' },
    'home-services': { ar: 'كل عميل يسأل من الأول — السعر، التوفر، المنطقة\nوأنت تعيد نفس الكلام بدل ما تشتغل',          en: 'Every customer asks from scratch — price, availability, area\nAnd you repeat the same thing instead of working' },
    coaching:      { ar: 'كل عميل محتمل يسأل نفس الأسئلة — شنو تقدر تسوي لي؟ جم الجلسة؟\nوأنت تضيع وقت الجلسات على التسويق',          en: 'Every potential client asks the same — what can you do for me? How much per session?\nAnd you waste session time on marketing' },
    tech:          { ar: 'نفس الأسئلة التقنية كل يوم — أسعار، مدة، شلون تبدأ\nوأنت لازم توقف شغلك عشان ترد على كل واحد',          en: 'Same technical questions daily — pricing, timeline, how to start\nAnd you have to stop your work to answer each one' },
    other:         { ar: 'نفس الأسئلة كل يوم تاكل وقتك بدل ما تركز على مشروعك\nوهذا الوقت ما يرجع',          en: 'Same questions daily eat your time instead of letting you focus on your business\nAnd that time doesn\'t come back' },
  },
  scale: {
    food:          { ar: 'والله — الثلاث مشاكل مع بعض تعني إنك تشتغل ضد نفسك\nطلبات ضايعة، ردود متأخرة، وأسئلة متكررة — كل هذا بنفس الوقت\nلو حسبت الخسارة الشهرية — الرقم أكبر مما تتوقع',          en: 'All three problems together mean you\'re working against yourself\nMissed orders, delayed replies, and repetitive questions — all at once\nIf you calculate the monthly loss — the number is bigger than you expect' },
    beauty:        { ar: 'والله — الثلاث مشاكل مع بعض تأكل من وقتك وعملاءك كل يوم\nوانتِ تستاهلين تركزين على الشغل مو على الردود',          en: 'All three problems together eat your time and clients every day\nAnd you deserve to focus on work, not replies' },
    fashion:       { ar: 'الثلاث مشاكل مع بعض تعني إنك دايماً في وضع رد الفعل\nبدل ما تركزين على توسيع المشروع',          en: 'All three problems together mean you\'re always in reactive mode\nInstead of focusing on growing the business' },
    retail:        { ar: 'الثلاث مشاكل مع بعض = مشروع يشتغل أقل من طاقته\nوالحل مو أنك تشتغل أكثر — بل تشتغل بذكاء أكثر',          en: 'All three problems together = a business running below capacity\nThe solution isn\'t working harder — it\'s working smarter' },
    cars:          { ar: 'الثلاث مع بعض تعني إنك دايماً مشتت\nبين الشغل الفعلي والتواصل مع العملاء',          en: 'All three together mean you\'re always distracted\nBetween actual work and customer communication' },
    education:     { ar: 'الثلاث مشاكل مع بعض تسرق وقت التدريس الحقيقي\nوهذا يؤثر على جودة الخدمة اللي تقدمها',          en: 'All three problems together steal real teaching time\nAnd that affects the quality of service you provide' },
    creative:      { ar: 'الثلاث مشاكل مع بعض تكسر تركيزك وتأثر على جودة شغلك\nوأنت تستاهل تبدع بدون ما تشيل هم الردود',          en: 'All three problems together break your focus and affect your work quality\nAnd you deserve to create without worrying about replies' },
    health:        { ar: 'الثلاث مع بعض تعني جلسات فاضية، عملاء ضايعين، ووقت مهدر\nوأنت لازم تركز على التدريب مو الإدارة',          en: 'All three together mean empty sessions, lost clients, and wasted time\nAnd you need to focus on training, not administration' },
    sweets:        { ar: 'الثلاث مشاكل مع بعض في المناسبات = كارثة\nوانتِ لازم تكونين في المطبخ مو على الواتساب',          en: 'All three problems together during occasions = disaster\nAnd you need to be in the kitchen, not on WhatsApp' },
    kids:          { ar: 'الثلاث مع بعض تعني إنك دايماً تطفي حرايق بدل ما تطوّر المشروع',          en: 'All three together mean you\'re always putting out fires instead of growing the business' },
    'home-services': { ar: 'الثلاث مع بعض تعني عملاء ضايعين وجهد مهدر كل يوم\nوالحل الشامل هو اللي يغير المعادلة',          en: 'All three together mean lost clients and wasted effort every day\nAnd a complete solution is what changes the equation' },
    coaching:      { ar: 'الثلاث مشاكل مع بعض تعني إنك تشتغل على إدارة المشروع بدل ما تغيّر حياة عملاءك',          en: 'All three problems together mean you\'re working on running the business instead of changing your clients\' lives' },
    tech:          { ar: 'الثلاث مع بعض في مشروع تقني = صورة غير احترافية\nوأنت تستاهل تركز على البناء مو على الإدارة',          en: 'All three together in a tech business = unprofessional image\nAnd you deserve to focus on building, not administration' },
    other:         { ar: 'الثلاث مشاكل مع بعض تعني إنك تشتغل ضد نفسك كل يوم\nوالحل الشامل هو اللي يغير المعادلة كلها',          en: 'All three problems together mean you\'re working against yourself every day\nAnd a complete solution is what changes the whole equation' },
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
  en: 'Like what you see? 💚\nBuilt right here in Kuwait. Every client gets a full week trial — zero risk.\nHere\'s everything included:',
  ar: 'عجبك؟ 💚\nمبني هني في الكويت. وأي عميل يجرّب أسبوع كامل — بدون ما يدفع فلس.\nهذا شنو يشمل:',
}

export const OFFER_DETAILS = {
  ar: {
    title: 'مايندسينك كومبليت — كل شي بسعر واحد',
    setup: '٣٤٩ دينار رسوم البناء — مرة وحدة',
    monthly: '١٥٩ دينار بالشهر — يشمل كل شي',
    includes: [
      'وكيل ذكي مخصص لمشروعك — يشتغل على واتساب وإنستقرام وموقعك',
      'داشبورد تتابع فيه مشروعك',
      'أكثر من ١٠ أتمتة من اليوم الأول',
      '١٠٠٠ محادثة بالشهر مشمولة',
      'كل تكاليف الذكاء الاصطناعي مشمولة — ما في فواتير مفاجئة',
      'مراقبة وإصلاح ٢٤ ساعة',
      'تحديث الوكيل كل شهر حسب بياناتك',
      'مدير حساب متخصص',
    ],
    extra: [
      '١٠٠١ إلى ٢٠٠٠ محادثة: +٣٠ دينار بالشهر',
      'أكثر من ٢٠٠١: +٦٠ دينار بالشهر',
    ],
    trial: 'أسبوع تجريبي مجاني — النظام الحقيقي على حساباتك، بدون ما تدفع فلس',
  },
  en: {
    title: 'MindSync Complete — one price, everything included',
    setup: '349 KWD setup — one time',
    monthly: '159 KWD/month — covers everything',
    includes: [
      'Custom AI agent — built and running on your WhatsApp, Instagram, and website',
      'Business analytics dashboard',
      '10+ automations from day one',
      '1,000 conversations/month included',
      'All AI costs covered — no surprise bills',
      '24/7 monitoring and fixes',
      'Monthly agent update based on your business data',
      'Dedicated account manager',
    ],
    extra: [
      '1,001–2,000 conversations: +30 KWD/mo',
      '2,001+: +60 KWD/mo',
    ],
    trial: 'Free 1-week trial — real system on your accounts, zero risk',
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
  food: [
    { role: 'user', en: 'Assalam o alaikum, I want a chocolate cake for 10 people', ar: 'السلام عليكم، أبي كيكة ككاو لـ ١٠ أشخاص' },
    { role: 'ai',   en: 'Wa alaikum assalam 🍫\nChocolate cake for 10: 15 KWD\nWhen do you want it?', ar: 'وعليكم السلام 🍫\nكيكة ككاو ١٠ أشخاص: ١٥ د.ك\nمتى تبيها؟' },
    { role: 'user', en: 'Tomorrow at 6',              ar: 'باجر الساعة ٦' },
    { role: 'ai',   en: 'Done ✓ Ready tomorrow 6 PM\nSent you the payment link: [link]', ar: 'تم ✓ راح تكون جاهزة باجر ٦ م\nارسلت لك رابط الدفع: [link]' },
  ],
  beauty: [
    { role: 'user', en: 'How much for lash extensions?', ar: 'جم سعر الرموش؟' },
    { role: 'ai',   en: 'Hello 🌸\nClassic lashes: 12 KWD\nVolume: 18 KWD\nWant to book?', ar: 'هلا حبيبتي 🌸\nالرموش الكلاسيك: ١٢ د.ك\nالفوليوم: ١٨ د.ك\nتبين تحجزين؟' },
    { role: 'user', en: 'Yes, tomorrow afternoon', ar: 'إي، باجر العصر' },
    { role: 'ai',   en: 'Done ✓ Tomorrow 4:30 PM\nSent you the confirmation link on WhatsApp', ar: 'تم ✓ غداً ٤:٣٠ م\nأرسلت لج رابط التأكيد على واتساب' },
  ],
  fashion: [
    { role: 'user', en: 'Do you have abayas in size L?', ar: 'عندكم عبايه مقاس L؟' },
    { role: 'ai',   en: 'Yes! 3 styles in size L. Let me send you photos 📸', ar: 'إي عندنا 3 موديلات مقاس L.\nأرسل لج الصور 📸' },
    { role: 'user', en: 'How much is the black one?', ar: 'بجم العبايه السودا؟' },
    { role: 'ai',   en: 'Black abaya: 28 KWD 🖤\nFree delivery over 20 KWD! Want it?', ar: 'العبايه السودا: ٢٨ د.ك 🖤\nتوصيل مجاني فوق ٢٠ د.ك! تبينها؟' },
  ],
  retail: [
    { role: 'user', en: 'Is this still in stock?',  ar: 'المنتج ليلحين موجود؟' },
    { role: 'ai',   en: 'Yes still available! How many do you need? 📦', ar: 'إي متوفر! جم قطعة تريد؟ 📦' },
    { role: 'user', en: '3 pieces', ar: '٣ قطع' },
    { role: 'ai',   en: '3 pieces added ✓\nPayment: COD or transfer. Which do you prefer? 💳', ar: 'تم حجز ٣ قطع ✓\nالدفع: عند الاستلام أو تحويل. أيهم تفضل؟ 💳' },
  ],
  cars: [
    { role: 'user', en: 'How much for an oil change?', ar: 'بجم تغيير الزيت؟' },
    { role: 'ai',   en: 'Oil change from 8 KWD (filter included) 🔧\nCan you come tomorrow?', ar: 'تغيير الزيت يبدأ من ٨ د.ك (مع الفلتر) 🔧\nتقدر تمرنا باجر؟' },
    { role: 'user', en: 'Yes morning is fine', ar: 'إي الصبح زين' },
    { role: 'ai',   en: 'Booked! Tomorrow 9 AM\nWe\'ll remind you 1 hour before 🚗', ar: 'تم الحجز! باجر ٩ الصبح\nراح يوصلك تذكير قبل ساعة 🚗' },
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
    { role: 'user', en: 'A family of 4', ar: 'عايله ٤ أشخاص' },
    { role: 'ai',   en: 'Family portrait (4): 35 KWD digital / 65 KWD framed 🖼️\nWhich do you prefer?', ar: 'بورتريه عايله (٤): ٣٥ د.ك رقمي / ٦٥ د.ك مع إطار 🖼️\nأيهم تفضل؟' },
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
    { role: 'ai',   en: 'Of course! Here 24/7 😊\nWhat do you need?', ar: 'طبعاً! أنا هنا ٢٤/٧ 😊\nشنو تحتاج؟' },
    { role: 'user', en: 'What are your prices?', ar: 'شنو أسعاركم؟' },
    { role: 'ai',   en: 'Pulling up the latest pricing for you 📋', ar: 'هذي آخر الأسعار 📋' },
  ],
}