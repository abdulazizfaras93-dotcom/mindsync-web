export const BUNDLES = [
  {
    id: 'clinic',
    en: 'Clinic AI Bundle',
    ar: 'باقة العيادة الذكية',
    industry: { en: 'Health & Dental Clinics', ar: 'العيادات الصحية والأسنان' },
    buildFee: 640,
    retainer: 240,
    features: {
      en: ['WhatsApp AI Receptionist', 'Appointment Booking & Reminders', 'Patient Follow-up Automation', 'CRM Setup & Training', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['مساعد واتساب ذكي', 'حجز المواعيد والتذكيرات', 'أتمتة متابعة المرضى', 'إعداد نظام CRM والتدريب', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '🏥',
    color: '#153E2D',
  },
  {
    id: 'salon',
    en: 'Salon AI Bundle',
    ar: 'باقة الصالون الذكي',
    industry: { en: 'Men & Women Salons', ar: 'صالونات الرجال والنساء' },
    buildFee: 480,
    retainer: 160,
    features: {
      en: ['WhatsApp Booking Bot', 'Stylist-Specific Scheduling', 'Rebooking Reminders', 'Client Loyalty Tracking', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['بوت حجز واتساب', 'جدولة حسب المختص', 'تذكيرات إعادة الحجز', 'تتبع ولاء العملاء', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '✂️',
    color: '#1C5038',
  },
  {
    id: 'gym',
    en: 'Gym AI Bundle',
    ar: 'باقة الجيم الذكي',
    industry: { en: 'Men & Women Gyms', ar: 'صالات الرجال والنساء' },
    buildFee: 560,
    retainer: 200,
    features: {
      en: ['WhatsApp Membership Bot', 'Attendance & Check-in Tracking', 'Auto Renewal Reminders', 'Class Scheduling Assistant', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['بوت الاشتراكات', 'تتبع الحضور', 'تذكيرات التجديد التلقائي', 'مساعد جدولة الحصص', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '💪',
    color: '#153E2D',
  },
  {
    id: 'garage',
    en: 'Garage AI Bundle',
    ar: 'باقة الورشة الذكية',
    industry: { en: 'Car Garages & Auto Service', ar: 'ورش السيارات والصيانة' },
    buildFee: 520,
    retainer: 180,
    features: {
      en: ['WhatsApp Job Status Bot', 'Customer Update Automation', 'Service History Tracking', 'Invoice Notifications', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['بوت حالة الطلبات', 'تحديثات العملاء التلقائية', 'تتبع سجل الصيانة', 'إشعارات الفواتير', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '🔧',
    color: '#1C5038',
  },
  {
    id: 'restaurant',
    en: 'Restaurant AI Bundle',
    ar: 'باقة المطعم الذكي',
    industry: { en: 'F&B, Cafes & Restaurants', ar: 'المطاعم والكافيهات' },
    buildFee: 560,
    retainer: 220,
    features: {
      en: ['WhatsApp Menu & FAQ Bot', 'Reservation Management', 'Order Status Updates', 'Seasonal Campaign Broadcasts', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['بوت المنيو والأسئلة', 'إدارة الحجوزات', 'تحديثات حالة الطلبات', 'حملات موسمية', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '🍽️',
    color: '#153E2D',
  },
  {
    id: 'real-estate',
    en: 'Real Estate AI Bundle',
    ar: 'باقة العقارات الذكية',
    industry: { en: 'Brokers & Real Estate Offices', ar: 'مكاتب العقارات والوسطاء' },
    buildFee: 680,
    retainer: 260,
    badge: { en: 'Highest Value', ar: 'الأكثر قيمة' },
    features: {
      en: ['WhatsApp Listings Bot', 'Buyer Qualification (Budget & Area)', 'Viewing Scheduler & Reminders', 'New Listing Broadcasts to Buyer List', 'Client Portal Dashboard', 'Monthly Maintenance'],
      ar: ['بوت العقارات على واتساب', 'تأهيل المشتري (الميزانية والمنطقة)', 'جدولة المعاينات والتذكيرات', 'بث العقارات الجديدة لقائمة المشترين', 'بوابة العميل', 'صيانة شهرية'],
    },
    icon: '🏢',
    color: '#1C5038',
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
