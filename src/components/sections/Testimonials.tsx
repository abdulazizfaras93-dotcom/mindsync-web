'use client'
import { useLang } from '@/lib/lang'

const TESTIMONIALS = [
  {
    name: 'د. نورة المطيري',
    role: { en: 'Dental Clinic — Kuwait City', ar: 'عيادة أسنان — الكويت' },
    quote: {
      en: 'The AI receptionist handles 200+ appointment requests a month. My staff can finally focus on patients.',
      ar: 'المساعد الذكي يتعامل مع أكثر من 200 حجز شهرياً. موظفاتي يركزن الآن على المرضى.',
    },
  },
  {
    name: 'لمياء الراشد',
    role: { en: 'Beauty Salon — Salmiya', ar: 'صالون تجميل — السالمية' },
    quote: {
      en: 'Bookings went up 35% in the first month. No more missed WhatsApp messages.',
      ar: 'زادت الحجوزات 35% في الشهر الأول. لا مزيد من رسائل واتساب الفائتة.',
    },
  },
  {
    name: 'فهد العنزي',
    role: { en: 'Auto Garage — Hawalli', ar: 'ورشة سيارات — حولي' },
    quote: {
      en: 'Every WhatsApp lead gets a reply in 3 seconds. Closed 4 new clients this week from old inquiries.',
      ar: 'كل استفسار يرد عليه في 3 ثوان. أغلقت 4 عملاء جدد هذا الأسبوع من استفسارات قديمة.',
    },
  },
  {
    name: 'م. خلود الصبيح',
    role: { en: 'Wellness Spa — Rumaithiya', ar: 'سبا صحي — الرميثية' },
    quote: {
      en: 'The system books, confirms, and reminds clients automatically. I only look at reports.',
      ar: 'النظام يحجز ويؤكد ويذكّر العملاء تلقائياً. أنا بس أشوف التقارير.',
    },
  },
  {
    name: 'طارق البدر',
    role: { en: 'CrossFit Gym — Mangaf', ar: 'صالة كروس فيت — المنقف' },
    quote: {
      en: 'Class capacity went from 60% to 89% in 6 weeks just from automated reminders.',
      ar: 'امتلأت كلاساتنا من 60% إلى 89% في 6 أسابيع بفضل التذكيرات التلقائية.',
    },
  },
  {
    name: 'سارة المزيدي',
    role: { en: 'Restaurant — Fintas', ar: 'مطعم — الفنيطيس' },
    quote: {
      en: 'No-shows dropped 60%. The AI handles reservations in Arabic and English perfectly.',
      ar: 'انخفضت الحجوزات الغائبة 60%. الذكاء الاصطناعي يتعامل بالعربي والإنجليزي مثالياً.',
    },
  },
  {
    name: 'يوسف الحربي',
    role: { en: 'Real Estate Broker — Kuwait City', ar: 'وسيط عقاري — الكويت' },
    quote: {
      en: '340 leads qualified last month. The AI follows up while I sleep. ROI was clear in week 2.',
      ar: '340 عميل محتمل مؤهَّل الشهر الماضي. الذكاء الاصطناعي يتابع وأنا نايم. العائد تبيّن في الأسبوع الثاني.',
    },
  },
  {
    name: 'منى القحطاني',
    role: { en: 'Home Business — Jahra', ar: 'مشروع منزلي — الجهراء' },
    quote: {
      en: 'I used to handle orders on WhatsApp manually. Now the bot qualifies, takes orders, and sends invoices.',
      ar: 'كنت أتابع الطلبات يدوياً. الآن الروبوت يؤهل ويأخذ الطلبات ويرسل الفواتير.',
    },
  },
]

const ROW1 = TESTIMONIALS.slice(0, 4)
const ROW2 = TESTIMONIALS.slice(4)

type TItem = typeof TESTIMONIALS[0]

function Card({ item }: { item: TItem }) {
  const { lang } = useLang()
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-ms-ivory-0 border border-ms-ivory-200 rounded-2xl p-5 mx-3">
      <div className="text-ms-gold-600 font-serif text-4xl leading-none mb-2 select-none">"</div>
      <p className="text-ms-ink-600 text-sm leading-relaxed mb-4 line-clamp-4">{item.quote[lang]}</p>
      <div className="pt-3 border-t border-ms-ivory-200">
        <p className="font-grotesk font-semibold text-ms-ink-900 text-sm">{item.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ms-ink-400 mt-0.5">{item.role[lang]}</p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { lang } = useLang()
  const isAr = lang === 'ar'

  return (
    <section className="bg-ms-ivory-100 py-20">
      <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ms-gold-600 mb-3">
          {isAr ? 'آراء العملاء' : 'Client Stories'}
        </p>
        <h2 className="font-grotesk text-3xl md:text-4xl font-bold text-ms-ink-900">
          {isAr ? 'يقولون عنّا' : 'What Our Clients Say'}
        </h2>
      </div>

      {/* Row 1 — left scroll */}
      <div className="overflow-hidden mb-4">
        <div className="flex w-max animate-marquee">
          {[...ROW1, ...ROW1].map((item, i) => <Card key={i} item={item} />)}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee-reverse">
          {[...ROW2, ...ROW2].map((item, i) => <Card key={i} item={item} />)}
        </div>
      </div>
    </section>
  )
}
