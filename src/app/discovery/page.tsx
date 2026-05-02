'use client'

import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Stethoscope, Scissors, Sparkles, Dumbbell, Wrench,
  UtensilsCrossed, Building2, Home,
} from 'lucide-react'

// ─── Lang context ─────────────────────────────────────────────────────────────
type Lang = 'ar' | 'en'
const LangCtx = createContext<Lang>('ar')
const useLang = () => useContext(LangCtx)

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  ar: {
    eyebrow:   'استبيان الاكتشاف',
    headline:  'أخبرنا عن مشروعك',
    stepOf:    (n: number, t: number) => `الخطوة ${n} من ${t}`,
    prev:      'السابق',
    next:      'التالي',
    submit:    'اطلب التجربة المجانية',
    submitting:'جاري الإرسال...',
    error:     'حدث خطأ أثناء الإرسال. حاول مرة ثانية.',
    successTitle: 'وصلنا طلبك!',
    successBody:  'فريق مايند سينك سيتواصل معك خلال ٢٤ ساعة.',
    backToSite:   'العودة للموقع',
    required:     'هذا الحقل مطلوب',
    steps: ['معلومات التواصل', 'نوع مشروعك', 'وضعك الحالي', 'ما تبحث عنه', 'المراجعة والإرسال'],
    s1: {
      businessName:   'اسم المشروع',
      ownerName:      'اسمك',
      phone:          'رقم الجوال',
      phonePh:        '+965',
      email:          'البريد الإلكتروني',
      emailPh:        'email@example.com',
      city:           'المدينة',
      cityOpts:       [{ v: 'kuwait', l: 'الكويت' }, { v: 'saudi', l: 'السعودية' }, { v: 'uae', l: 'الإمارات' }, { v: 'other', l: 'أخرى' }],
    },
    s2: {
      industry:         'اختر نوع مشروعك',
      businessAge:      'عمر المشروع',
      businessAgeOpts:  [{ v: 'new', l: 'جديد (أقل من سنة)' }, { v: 'growing', l: 'نامي (١–٣ سنوات)' }, { v: 'established', l: 'قائم (٣+ سنوات)' }],
      monthlyInquiries: 'عدد استفسارات العملاء شهرياً (تقريباً)',
      inquiryOpts:      [{ v: 'lt50', l: 'أقل من ٥٠' }, { v: '50-200', l: '٥٠–٢٠٠' }, { v: '200-500', l: '٢٠٠–٥٠٠' }, { v: '500plus', l: '+٥٠٠' }],
    },
    s3: {
      currentChannels:     'كيف تتواصل مع عملاءك الآن؟',
      currentChOpts:       [{ v: 'whatsapp-manual', l: 'واتساب يدوي' }, { v: 'instagram', l: 'انستجرام DMs' }, { v: 'phone', l: 'مكالمات هاتفية' }, { v: 'walkin', l: 'زيارات مباشرة' }, { v: 'none', l: 'ما في نظام' }],
      wantedChannels:      'القنوات اللي تبيها',
      wantedChOpts:        [{ v: 'whatsapp', l: 'واتساب' }, { v: 'instagram', l: 'انستجرام' }, { v: 'website', l: 'موقع إلكتروني' }, { v: 'app', l: 'تطبيق موبايل' }],
      biggestPain:         'أكبر مشكلة تواجهها الآن مع العملاء (اختياري)',
      biggestPainPh:       'مثال: يفوتني طلبات بالليل، ما أقدر أرد بسرعة...',
    },
    s4: {
      tier:           'الباقة اللي تناسبك',
      smart:          'الذكي',
      smartDesc:      'وكيل واحد، ١–٢ قنوات',
      smartFrom:      'يبدأ من ١٣٠ KWD/شهر',
      pro:            'المتقدم',
      proDesc:        'وكيل+ متعدد القنوات',
      proFrom:        'يبدأ من ١٦٠ KWD/شهر',
      fullAuto:       'المؤتمت',
      fullAutoDesc:   'وكلاء متعددة، كل القنوات',
      fullAutoFrom:   'يبدأ من ٢٨٠ KWD/شهر',
      mostPopular:    'الأكثر طلباً',
      timeline:       'متى تبي تبدأ؟',
      timelineOpts:   [{ v: 'asap', l: 'في أقرب وقت' }, { v: '1month', l: 'خلال شهر' }, { v: '3months', l: 'خلال ٣ أشهر' }, { v: 'exploring', l: 'أستكشف فقط' }],
      referral:       'كيف وصلت لمايند سينك؟',
      referralOpts:   [{ v: 'instagram', l: 'انستجرام' }, { v: 'whatsapp', l: 'واتساب' }, { v: 'google', l: 'جوجل' }, { v: 'referral', l: 'توصية' }, { v: 'other', l: 'أخرى' }],
      notes:          'ملاحظات إضافية (اختياري)',
      notesPh:        'أي شي تبي تضيفه...',
    },
    s5: {
      reviewTitle:  'راجع معلوماتك قبل الإرسال',
      businessName: 'اسم المشروع',
      ownerName:    'الاسم',
      phone:        'الجوال',
      email:        'البريد',
      city:         'المدينة',
      industry:     'نوع المشروع',
      businessAge:  'عمر المشروع',
      monthlyInq:   'الاستفسارات',
      currentCh:    'القنوات الحالية',
      wantedCh:     'القنوات المطلوبة',
      biggestPain:  'المشكلة الرئيسية',
      tier:         'الباقة',
      timeline:     'وقت البدء',
      referral:     'مصدر التعرف',
      notes:        'ملاحظات',
      notSet:       'لم يُحدَّد',
    },
    industries: [
      { v: 'clinic',        l: 'عيادة' },
      { v: 'salon',         l: 'صالون' },
      { v: 'spa',           l: 'سبا' },
      { v: 'gym',           l: 'جيم' },
      { v: 'garage',        l: 'ورشة' },
      { v: 'restaurant',    l: 'مطعم' },
      { v: 'real-estate',   l: 'عقارات' },
      { v: 'home-business', l: 'مشروع منزلي' },
    ],
  },
  en: {
    eyebrow:   'Discovery Form',
    headline:  'Tell us about your business',
    stepOf:    (n: number, t: number) => `Step ${n} of ${t}`,
    prev:      'Previous',
    next:      'Next',
    submit:    'Request Free Trial',
    submitting:'Sending...',
    error:     'Something went wrong. Please try again.',
    successTitle: 'We got your request!',
    successBody:  'The MindSync team will contact you within 24 hours.',
    backToSite:   'Back to Website',
    required:     'This field is required',
    steps: ['Contact Info', 'Your Industry', 'Current Situation', 'What You Need', 'Review & Submit'],
    s1: {
      businessName:   'Business Name',
      ownerName:      'Your Name',
      phone:          'Phone Number',
      phonePh:        '+965',
      email:          'Email Address',
      emailPh:        'email@example.com',
      city:           'City',
      cityOpts:       [{ v: 'kuwait', l: 'Kuwait' }, { v: 'saudi', l: 'Saudi Arabia' }, { v: 'uae', l: 'UAE' }, { v: 'other', l: 'Other' }],
    },
    s2: {
      industry:         'Select your industry',
      businessAge:      'Business age',
      businessAgeOpts:  [{ v: 'new', l: 'New (< 1 yr)' }, { v: 'growing', l: 'Growing (1–3 yrs)' }, { v: 'established', l: 'Established (3+ yrs)' }],
      monthlyInquiries: 'Monthly customer inquiries (approx.)',
      inquiryOpts:      [{ v: 'lt50', l: '< 50' }, { v: '50-200', l: '50–200' }, { v: '200-500', l: '200–500' }, { v: '500plus', l: '500+' }],
    },
    s3: {
      currentChannels:     'How do you communicate with customers now?',
      currentChOpts:       [{ v: 'whatsapp-manual', l: 'WhatsApp (manual)' }, { v: 'instagram', l: 'Instagram DMs' }, { v: 'phone', l: 'Phone calls' }, { v: 'walkin', l: 'Walk-ins' }, { v: 'none', l: 'No system' }],
      wantedChannels:      'Channels you want',
      wantedChOpts:        [{ v: 'whatsapp', l: 'WhatsApp' }, { v: 'instagram', l: 'Instagram' }, { v: 'website', l: 'Website' }, { v: 'app', l: 'Mobile App' }],
      biggestPain:         'Biggest challenge with customers right now (optional)',
      biggestPainPh:       'e.g. Miss inquiries at night, slow response...',
    },
    s4: {
      tier:           'Which package fits you?',
      smart:          'Smart',
      smartDesc:      '1 agent, 1–2 channels',
      smartFrom:      'From 130 KWD/mo',
      pro:            'Pro',
      proDesc:        '1+ agents, multiple channels',
      proFrom:        'From 160 KWD/mo',
      fullAuto:       'Full Auto',
      fullAutoDesc:   'Multiple agents, all channels',
      fullAutoFrom:   'From 280 KWD/mo',
      mostPopular:    'Most Popular',
      timeline:       'When do you want to start?',
      timelineOpts:   [{ v: 'asap', l: 'ASAP' }, { v: '1month', l: 'Within 1 month' }, { v: '3months', l: 'Within 3 months' }, { v: 'exploring', l: 'Just exploring' }],
      referral:       'How did you find MindSync?',
      referralOpts:   [{ v: 'instagram', l: 'Instagram' }, { v: 'whatsapp', l: 'WhatsApp' }, { v: 'google', l: 'Google' }, { v: 'referral', l: 'Referral' }, { v: 'other', l: 'Other' }],
      notes:          'Additional notes (optional)',
      notesPh:        'Anything else you want to add...',
    },
    s5: {
      reviewTitle:  'Review your info before submitting',
      businessName: 'Business Name',
      ownerName:    'Name',
      phone:        'Phone',
      email:        'Email',
      city:         'City',
      industry:     'Industry',
      businessAge:  'Business Age',
      monthlyInq:   'Monthly Inquiries',
      currentCh:    'Current Channels',
      wantedCh:     'Wanted Channels',
      biggestPain:  'Main Challenge',
      tier:         'Package',
      timeline:     'Start Timeline',
      referral:     'Referral Source',
      notes:        'Notes',
      notSet:       'Not set',
    },
    industries: [
      { v: 'clinic',        l: 'Clinic' },
      { v: 'salon',         l: 'Salon' },
      { v: 'spa',           l: 'Spa' },
      { v: 'gym',           l: 'Gym' },
      { v: 'garage',        l: 'Garage' },
      { v: 'restaurant',    l: 'Restaurant' },
      { v: 'real-estate',   l: 'Real Estate' },
      { v: 'home-business', l: 'Home Business' },
    ],
  },
}

// ─── Form state ───────────────────────────────────────────────────────────────
interface F {
  businessName: string; ownerName: string; phone: string; email: string; city: string
  industry: string; businessAge: string; monthlyInquiries: string
  currentChannels: string[]; wantedChannels: string[]; biggestPain: string
  tier: string; startTimeline: string; referralSource: string; notes: string
}

const empty: F = {
  businessName: '', ownerName: '', phone: '', email: '', city: '',
  industry: '', businessAge: '', monthlyInquiries: '',
  currentChannels: [], wantedChannels: [], biggestPain: '',
  tier: '', startTimeline: '', referralSource: '', notes: '',
}

// ─── Industry icons ───────────────────────────────────────────────────────────
const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  clinic:        <Stethoscope size={20} />,
  salon:         <Scissors size={20} />,
  spa:           <Sparkles size={20} />,
  gym:           <Dumbbell size={20} />,
  garage:        <Wrench size={20} />,
  restaurant:    <UtensilsCrossed size={20} />,
  'real-estate': <Building2 size={20} />,
  'home-business': <Home size={20} />,
}

// ─── UI primitives ────────────────────────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <p className="text-ms-ink-600 text-[11px] font-mono tracking-widest uppercase mb-2">
      {children}{required && <span className="text-ms-gold-600 ml-1">*</span>}
    </p>
  )
}

function TextInput({ label, value, onChange, placeholder, required, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; required?: boolean; type?: string
}) {
  return (
    <div className="mb-5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-ms-ivory-200 rounded-lg px-4 py-3 text-[14px] bg-white text-ms-ink-900
          focus:outline-none focus:ring-2 focus:ring-ms-green-800 focus:border-transparent
          placeholder:text-ms-ink-400 transition"
      />
    </div>
  )
}

function TextArea({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div className="mb-5">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-ms-ivory-200 rounded-lg px-4 py-3 text-[14px] bg-white text-ms-ink-900
          focus:outline-none focus:ring-2 focus:ring-ms-green-800 focus:border-transparent
          placeholder:text-ms-ink-400 transition resize-none"
      />
    </div>
  )
}

function PillGroup({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void
  options: readonly { v: string; l: string }[]; required?: boolean
}) {
  return (
    <div className="mb-5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => onChange(o.v)}
            className={`px-4 py-2 rounded-full text-[13px] border transition font-medium
              ${value === o.v
                ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800/40 hover:text-ms-green-800'
              }`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiPill({ label, values, onChange, options, required }: {
  label: string; values: string[]; onChange: (v: string[]) => void
  options: readonly { v: string; l: string }[]; required?: boolean
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v])
  return (
    <div className="mb-5">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => toggle(o.v)}
            className={`px-4 py-2 rounded-full text-[13px] border transition font-medium
              ${values.includes(o.v)
                ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
                : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800/40 hover:text-ms-green-800'
              }`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step components ──────────────────────────────────────────────────────────
function Step1({ f, set }: { f: F; set: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = T[lang].s1
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <TextInput label={t.businessName} value={f.businessName} onChange={v => set('businessName', v)} required />
      <TextInput label={t.ownerName} value={f.ownerName} onChange={v => set('ownerName', v)} required />
      <TextInput label={t.phone} value={f.phone} onChange={v => set('phone', v)} placeholder={t.phonePh} type="tel" required />
      <TextInput label={t.email} value={f.email} onChange={v => set('email', v)} placeholder={t.emailPh} type="email" />
      <PillGroup label={t.city} value={f.city} onChange={v => set('city', v)} options={t.cityOpts} required />
    </motion.div>
  )
}

function Step2({ f, set }: { f: F; set: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = T[lang].s2; const industries = T[lang].industries
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="mb-5">
        <FieldLabel required>{t.industry}</FieldLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {industries.map(ind => (
            <button key={ind.v} type="button" onClick={() => set('industry', ind.v)}
              className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border text-[13px] font-medium transition
                ${f.industry === ind.v
                  ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
                  : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800/40 hover:text-ms-green-800'
                }`}>
              <span className={f.industry === ind.v ? 'text-ms-gold-600' : 'text-ms-green-800/60'}>
                {INDUSTRY_ICONS[ind.v]}
              </span>
              {ind.l}
            </button>
          ))}
        </div>
      </div>
      <PillGroup label={t.businessAge} value={f.businessAge} onChange={v => set('businessAge', v)} options={t.businessAgeOpts} />
      <PillGroup label={t.monthlyInquiries} value={f.monthlyInquiries} onChange={v => set('monthlyInquiries', v)} options={t.inquiryOpts} />
    </motion.div>
  )
}

function Step3({ f, set }: { f: F; set: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = T[lang].s3
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <MultiPill label={t.currentChannels} values={f.currentChannels} onChange={v => set('currentChannels', v)} options={t.currentChOpts} />
      <MultiPill label={t.wantedChannels} values={f.wantedChannels} onChange={v => set('wantedChannels', v)} options={t.wantedChOpts} />
      <TextArea label={t.biggestPain} value={f.biggestPain} onChange={v => set('biggestPain', v)} placeholder={t.biggestPainPh} />
    </motion.div>
  )
}

function Step4({ f, set }: { f: F; set: (k: keyof F, v: unknown) => void }) {
  const lang = useLang(); const t = T[lang].s4
  const tiers = [
    { v: 'smart',     name: t.smart,    desc: t.smartDesc,    price: t.smartFrom,    popular: false },
    { v: 'pro',       name: t.pro,      desc: t.proDesc,      price: t.proFrom,      popular: true  },
    { v: 'full-auto', name: t.fullAuto, desc: t.fullAutoDesc, price: t.fullAutoFrom, popular: false },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <div className="mb-5">
        <FieldLabel>{t.tier}</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tiers.map(tier => (
            <button key={tier.v} type="button" onClick={() => set('tier', tier.v)}
              className={`relative text-left p-4 rounded-xl border transition
                ${f.tier === tier.v
                  ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
                  : tier.popular
                    ? 'bg-white border-ms-gold-600/60 text-ms-ink-900 hover:border-ms-green-800/40'
                    : 'bg-white border-ms-ivory-200 text-ms-ink-900 hover:border-ms-green-800/40'
                }`}>
              {tier.popular && (
                <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold
                  ${f.tier === tier.v ? 'bg-ms-gold-600 text-ms-green-900' : 'bg-ms-gold-600 text-ms-green-900'}`}>
                  {t.mostPopular}
                </span>
              )}
              <p className={`font-bold text-[15px] mb-1 ${f.tier === tier.v ? 'text-ms-ivory-0' : 'text-ms-ink-900'}`}>{tier.name}</p>
              <p className={`text-[12px] mb-2 ${f.tier === tier.v ? 'text-ms-ivory-0/70' : 'text-ms-ink-400'}`}>{tier.desc}</p>
              <p className={`text-[12px] font-mono font-semibold ${f.tier === tier.v ? 'text-ms-gold-600' : 'text-ms-green-800'}`}>{tier.price}</p>
            </button>
          ))}
        </div>
      </div>
      <PillGroup label={t.timeline} value={f.startTimeline} onChange={v => set('startTimeline', v)} options={t.timelineOpts} />
      <PillGroup label={t.referral} value={f.referralSource} onChange={v => set('referralSource', v)} options={t.referralOpts} />
      <TextArea label={t.notes} value={f.notes} onChange={v => set('notes', v)} placeholder={t.notesPh} />
    </motion.div>
  )
}

function Step5({ f }: { f: F }) {
  const lang = useLang(); const t = T[lang].s5; const industries = T[lang].industries
  const industryLabel = industries.find(i => i.v === f.industry)?.l ?? t.notSet

  const rows: [string, string][] = [
    [t.businessName, f.businessName || t.notSet],
    [t.ownerName,    f.ownerName    || t.notSet],
    [t.phone,        f.phone        || t.notSet],
    [t.email,        f.email        || t.notSet],
    [t.city,         f.city         || t.notSet],
    [t.industry,     industryLabel],
    [t.businessAge,  f.businessAge  || t.notSet],
    [t.monthlyInq,   f.monthlyInquiries || t.notSet],
    [t.currentCh,    f.currentChannels.join(', ') || t.notSet],
    [t.wantedCh,     f.wantedChannels.join(', ') || t.notSet],
    [t.biggestPain,  f.biggestPain  || t.notSet],
    [t.tier,         f.tier         || t.notSet],
    [t.timeline,     f.startTimeline || t.notSet],
    [t.referral,     f.referralSource || t.notSet],
    [t.notes,        f.notes        || t.notSet],
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <p className="text-ms-ink-600 text-[13px] mb-5 leading-relaxed">{t.reviewTitle}</p>
      <div className="rounded-xl border border-ms-ivory-200 overflow-hidden">
        {rows.map(([label, val], i) => (
          <div key={i} className={`grid grid-cols-[140px_1fr] gap-3 px-4 py-3 text-[13px] ${i % 2 === 0 ? 'bg-ms-ivory-0' : 'bg-white'}`}>
            <span className="text-ms-ink-400 font-mono text-[11px] tracking-wider uppercase">{label}</span>
            <span className="text-ms-ink-900 font-medium">{val}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const STEP_COMPS = [Step1, Step2, Step3, Step4, Step5]
const TOTAL = 5

// ─── Main form ────────────────────────────────────────────────────────────────
function DiscoveryForm({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [step, setStep] = useState(0)
  const [dir, setDir]   = useState(1)
  const [form, setForm] = useState<F>(empty)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const t   = T[lang]
  const isAr = lang === 'ar'

  const set = (k: keyof F, v: unknown) => setForm(p => ({ ...p, [k]: v as never }))

  const goTo = (n: number) => {
    setDir(n > step ? 1 : -1)
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setStatus('loading')
    try {
      await fetch('https://ifaras911.app.n8n.cloud/webhook/client-discovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).gtag?.('event', 'conversion', {
        send_to: 'AW-18124307098/gB4kCNjQ3qUcEJr1q8JD',
        value: 1.0,
        currency: 'USD',
      })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`min-h-screen bg-ms-green-900 hero-bg pattern-overlay flex items-center justify-center px-4 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-ms-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-ms-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-ms-ivory-0 mb-3">{t.successTitle}</h1>
          <p className="text-white/60 leading-relaxed mb-8">{t.successBody}</p>
          <a href="/"
            className="inline-block bg-ms-gold-600 text-ms-green-900 px-8 py-3 rounded-lg font-bold text-[14px] hover:bg-ms-gold-400 transition">
            {t.backToSite}
          </a>
        </motion.div>
      </div>
    )
  }

  const StepComp = STEP_COMPS[step]
  const pct = Math.round(((step + 1) / TOTAL) * 100)

  return (
    <div className={`min-h-screen bg-ms-ivory-0 flex flex-col ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>

      {/* Sticky header */}
      <header className="bg-ms-green-900 hero-bg pattern-overlay sticky top-0 z-20 shadow-lg">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/brand/logo-transparent.png" alt="MindSync" width={30} height={30} className="opacity-90" />
            <span className="text-ms-ivory-0 font-bold text-[14px]">MindSync</span>
          </a>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-3 py-1.5 rounded-full border border-white/20 text-ms-ivory-0 text-[11px] font-mono tracking-wider hover:bg-white/10 transition">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <span className="text-white/40 text-[11px] font-mono">{t.stepOf(step + 1, TOTAL)}</span>
          </div>
        </div>

        {/* Eyebrow + headline */}
        <div className="max-w-2xl mx-auto px-5 pb-4">
          <p className="text-ms-gold-600 text-[10px] font-mono tracking-[0.2em] uppercase mb-0.5">{t.eyebrow}</p>
          <p className="text-ms-ivory-0 font-bold text-[15px]">{t.steps[step]}</p>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto px-5 pb-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-ms-gold-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          {/* Step dots */}
          <div className="flex gap-1.5 mt-2 justify-center">
            {Array.from({ length: TOTAL }, (_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300
                ${i === step ? 'w-5 h-1.5 bg-ms-gold-600' : i < step ? 'w-1.5 h-1.5 bg-ms-gold-600/50' : 'w-1.5 h-1.5 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </header>

      {/* Form body */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-8">
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-[13px] text-red-700">
            {t.error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: dir * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -32 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepComp f={form} set={set} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 bg-white border-t border-ms-ivory-200 px-5 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button type="button" onClick={() => goTo(step - 1)} disabled={step === 0}
            className="px-5 py-2.5 rounded-lg border border-ms-ivory-200 text-ms-ink-600 text-[13px] font-medium
              disabled:opacity-30 hover:border-ms-green-800/40 hover:text-ms-green-800 transition">
            {t.prev}
          </button>

          {step < TOTAL - 1 ? (
            <button type="button" onClick={() => goTo(step + 1)}
              className="px-7 py-2.5 rounded-lg bg-ms-green-800 text-ms-ivory-0 text-[13px] font-semibold hover:bg-ms-green-700 transition">
              {t.next}
              <svg className={`inline-block w-3.5 h-3.5 ${isAr ? 'mr-1.5 rotate-180' : 'ml-1.5'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={() => void submit()} disabled={status === 'loading'}
              className="px-7 py-2.5 rounded-lg bg-ms-gold-600 text-ms-green-900 text-[13px] font-bold hover:bg-ms-gold-400 transition disabled:opacity-60">
              {status === 'loading' ? t.submitting : t.submit}
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Page() {
  const [lang, setLang] = useState<Lang>('ar')
  return (
    <LangCtx.Provider value={lang}>
      <DiscoveryForm lang={lang} setLang={setLang} />
    </LangCtx.Provider>
  )
}
