'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Lang = 'ar' | 'en'

const T = {
  ar: {
    eyebrow: 'استبيان بناء النظام',
    headline: 'خلنا نبني نظامك الذكي',
    intro: 'عبّي المعلومات اللي تقدر عليها — كل معلومة تساعدنا نبني وكيلك بدقة. تقدر ترسل لنا الشعار وأي ملفات على واتساب.',
    langBtn: 'EN',
    submit: 'إرسال الاستبيان',
    submitting: 'جاري الإرسال...',
    error: 'صار خطأ بالإرسال. حاول مرة ثانية أو راسلنا على واتساب.',
    successTitle: 'وصلنا استبيانك! 🎉',
    successBody: 'بنراجع معلوماتك ونبدأ ببناء نظامك. بنتواصل معك على واتساب قريب.',
    backHome: 'العودة للموقع',
    optional: '(اختياري)',
    sec1: 'معلومات المشروع',
    sec2: 'طبيعة المشروع',
    sec3: 'أوقات العمل',
    sec4: 'التواصل مع العملاء',
    sec5: 'الوكيل الذكي',
    sec6: 'الباقة',
    sec7: 'إضافات',
    businessName: 'اسم المشروع',
    ownerName: 'اسمك',
    phone: 'رقم تواصلك',
    email: 'البريد الإلكتروني',
    city: 'المدينة',
    bType: 'نوع المشروع',
    bTypeOpts: [{ v: 'service', l: 'خدمات ومواعيد' }, { v: 'product', l: 'منتجات وطلبات' }, { v: 'both', l: 'الاثنين' }],
    offering: 'وش يقدّم مشروعك بالضبط؟',
    offeringPh: 'مثال: صالون نسائي يقدّم قص، صبغ، وعناية بالشعر...',
    mainItems: 'أهم الخدمات أو المنتجات وأسعارها',
    mainItemsPh: 'مثال: قص ٥ د.ك · صبغة ١٥ د.ك · كيراتين ٤٥ د.ك',
    workingHours: 'أوقات العمل',
    workingHoursPh: 'مثال: ١٠ص – ١٠م',
    daysOff: 'أيام الإجازة',
    daysOffPh: 'مثال: الجمعة',
    whatsappNumber: 'رقم واتساب اللي بيشتغل عليه الوكيل',
    whatsappPh: '+965',
    instagram: 'حساب الإنستقرام',
    website: 'الموقع الإلكتروني',
    currentChannels: 'كيف يوصلك العملاء الآن؟',
    chOpts: [{ v: 'whatsapp', l: 'واتساب' }, { v: 'instagram', l: 'انستقرام' }, { v: 'phone', l: 'مكالمات' }, { v: 'walkin', l: 'زيارات' }],
    agentName: 'تبي نسمّي الوكيل باسم معيّن؟',
    agentNamePh: 'مثال: ساره · أو اسم مشروعك',
    tone: 'أسلوب الرد',
    toneOpts: [{ v: 'friendly', l: 'ودّي' }, { v: 'formal', l: 'رسمي' }, { v: 'kuwaiti', l: 'لهجة كويتية' }],
    languages: 'لغة الرد',
    langOpts: [{ v: 'ar', l: 'عربي' }, { v: 'en', l: 'إنجليزي' }, { v: 'both', l: 'الاثنين' }],
    faqs: 'أكثر الأسئلة اللي يسألها عملاؤك + إجاباتها',
    faqsPh: 'مثال:\n- كم السعر؟ → الأسعار تبدأ من...\n- وين موقعكم؟ → نحن في...\n- متى الدوام؟ → من ١٠ إلى ١٠',
    tier: 'الباقة اللي تفكر فيها',
    tierOpts: [{ v: 'receptionist', l: 'موظف الاستقبال (٧٩)' }, { v: 'coordinator', l: 'المنسّق (١٤٩)' }, { v: 'manager', l: 'المدير (٢٩٩)' }, { v: 'unsure', l: 'مو متأكد — نصحوني' }],
    integrations: 'أنظمة تستخدمها (حجوزات، كاشير، محاسبة...)',
    integrationsPh: 'مثال: نظام حجوزات، انستقرام شوب...',
    notes: 'أي شي ثاني تبي تضيفه',
    notesPh: 'وتقدر ترسل لنا الشعار وملفاتك على واتساب 🙂',
  },
  en: {
    eyebrow: 'System Build Brief',
    headline: "Let's build your smart system",
    intro: 'Fill in what you can — every detail helps us build your agent accurately. You can send your logo and any files on WhatsApp.',
    langBtn: 'عربي',
    submit: 'Submit brief',
    submitting: 'Sending...',
    error: 'Something went wrong. Try again or message us on WhatsApp.',
    successTitle: 'We got your brief! 🎉',
    successBody: "We'll review it and start building your system. We'll reach out on WhatsApp soon.",
    backHome: 'Back to website',
    optional: '(optional)',
    sec1: 'Business info',
    sec2: 'About your business',
    sec3: 'Working hours',
    sec4: 'Customer contact',
    sec5: 'The AI agent',
    sec6: 'Plan',
    sec7: 'Extras',
    businessName: 'Business name',
    ownerName: 'Your name',
    phone: 'Your contact number',
    email: 'Email',
    city: 'City',
    bType: 'Business type',
    bTypeOpts: [{ v: 'service', l: 'Services & appointments' }, { v: 'product', l: 'Products & orders' }, { v: 'both', l: 'Both' }],
    offering: 'What exactly does your business do?',
    offeringPh: 'e.g. A women’s salon offering cuts, color, and hair care...',
    mainItems: 'Main services or products + prices',
    mainItemsPh: 'e.g. Cut 5 KWD · Color 15 KWD · Keratin 45 KWD',
    workingHours: 'Working hours',
    workingHoursPh: 'e.g. 10am – 10pm',
    daysOff: 'Days off',
    daysOffPh: 'e.g. Friday',
    whatsappNumber: 'WhatsApp number the agent will run on',
    whatsappPh: '+965',
    instagram: 'Instagram handle',
    website: 'Website',
    currentChannels: 'How do customers reach you now?',
    chOpts: [{ v: 'whatsapp', l: 'WhatsApp' }, { v: 'instagram', l: 'Instagram' }, { v: 'phone', l: 'Calls' }, { v: 'walkin', l: 'Walk-ins' }],
    agentName: 'Want to name the agent?',
    agentNamePh: 'e.g. Sara · or your business name',
    tone: 'Reply tone',
    toneOpts: [{ v: 'friendly', l: 'Friendly' }, { v: 'formal', l: 'Formal' }, { v: 'kuwaiti', l: 'Kuwaiti dialect' }],
    languages: 'Reply language',
    langOpts: [{ v: 'ar', l: 'Arabic' }, { v: 'en', l: 'English' }, { v: 'both', l: 'Both' }],
    faqs: 'Top questions customers ask + their answers',
    faqsPh: 'e.g.\n- How much? → Prices start from...\n- Where are you? → We are at...\n- What hours? → 10 to 10',
    tier: 'Tier you have in mind',
    tierOpts: [{ v: 'receptionist', l: 'Receptionist (79)' }, { v: 'coordinator', l: 'Coordinator (149)' }, { v: 'manager', l: 'Manager (299)' }, { v: 'unsure', l: 'Not sure — advise me' }],
    integrations: 'Systems you use (bookings, POS, accounting...)',
    integrationsPh: 'e.g. a booking system, Instagram shop...',
    notes: 'Anything else to add',
    notesPh: 'And you can send your logo and files on WhatsApp 🙂',
  },
}

interface F {
  businessName: string; ownerName: string; phone: string; email: string; city: string
  businessType: string; offering: string; mainItems: string
  workingHours: string; daysOff: string
  whatsappNumber: string; instagram: string; website: string; currentChannels: string[]
  agentName: string; tone: string; languages: string; faqs: string
  tier: string; integrations: string; notes: string
}

const empty: F = {
  businessName: '', ownerName: '', phone: '', email: '', city: '',
  businessType: '', offering: '', mainItems: '',
  workingHours: '', daysOff: '',
  whatsappNumber: '', instagram: '', website: '', currentChannels: [],
  agentName: '', tone: '', languages: '', faqs: '',
  tier: '', integrations: '', notes: '',
}

const encode = (data: Record<string, string>) =>
  Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-9">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[11px] text-ms-gold-600">{n}</span>
        <h2 className="text-ms-ink-900 font-bold text-[16px]">{title}</h2>
        <span className="flex-1 h-px bg-ms-ivory-200" />
      </div>
      {children}
    </div>
  )
}

function Label({ children, opt }: { children: React.ReactNode; opt?: string }) {
  return (
    <p className="text-ms-ink-600 text-[11px] font-mono tracking-widest uppercase mb-2">
      {children}{opt && <span className="text-ms-ink-400 ms-1 normal-case tracking-normal">{opt}</span>}
    </p>
  )
}

const inputCls = `w-full border border-ms-ivory-200 rounded-lg px-4 py-3 text-[14px] bg-white text-ms-ink-900
  focus:outline-none focus:ring-2 focus:ring-ms-green-800 focus:border-transparent placeholder:text-ms-ink-400 transition`

function Field({ label, name, value, onChange, ph, type = 'text', required, opt }: {
  label: string; name: string; value: string; onChange: (v: string) => void
  ph?: string; type?: string; required?: boolean; opt?: string
}) {
  return (
    <div className="mb-5">
      <Label opt={opt}>{label}{required && <span className="text-ms-gold-600 ms-1">*</span>}</Label>
      <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph} required={required} className={inputCls} />
    </div>
  )
}

function Area({ label, name, value, onChange, ph, opt }: {
  label: string; name: string; value: string; onChange: (v: string) => void; ph?: string; opt?: string
}) {
  return (
    <div className="mb-5">
      <Label opt={opt}>{label}</Label>
      <textarea name={name} value={value} onChange={e => onChange(e.target.value)} placeholder={ph} rows={4} className={`${inputCls} resize-none whitespace-pre-line`} />
    </div>
  )
}

function Pills({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void; options: readonly { v: string; l: string }[]; required?: boolean
}) {
  return (
    <div className="mb-5">
      <Label>{label}{required && <span className="text-ms-gold-600 ms-1">*</span>}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => onChange(o.v)}
            className={`px-4 py-2 rounded-full text-[13px] border transition font-medium ${value === o.v
              ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
              : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800/40 hover:text-ms-green-800'}`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  )
}

function MultiPills({ label, values, onChange, options }: {
  label: string; values: string[]; onChange: (v: string[]) => void; options: readonly { v: string; l: string }[]
}) {
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v])
  return (
    <div className="mb-5">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o.v} type="button" onClick={() => toggle(o.v)}
            className={`px-4 py-2 rounded-full text-[13px] border transition font-medium ${values.includes(o.v)
              ? 'bg-ms-green-800 border-ms-green-800 text-ms-ivory-0'
              : 'bg-white border-ms-ivory-200 text-ms-ink-600 hover:border-ms-green-800/40 hover:text-ms-green-800'}`}>
            {o.l}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const [lang, setLang] = useState<Lang>('ar')
  const [f, setF] = useState<F>(empty)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const t = T[lang]
  const isAr = lang === 'ar'
  const set = (k: keyof F, v: unknown) => setF(p => ({ ...p, [k]: v as never }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'onboarding', lang, ...f, currentChannels: f.currentChannels.join(', ') }),
      })
      if (res.ok) { setStatus('success'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className={`min-h-screen bg-ms-green-900 hero-bg pattern-overlay flex items-center justify-center px-4 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-ms-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-ms-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[28px] font-bold text-ms-ivory-0 mb-3">{t.successTitle}</h1>
          <p className="text-white/60 leading-relaxed mb-8">{t.successBody}</p>
          <a href="/" className="inline-block bg-ms-gold-600 text-ms-green-900 px-8 py-3 rounded-lg font-bold text-[14px] hover:bg-ms-gold-400 transition">{t.backHome}</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-ms-ivory-0 ${isAr ? 'font-arabic' : 'font-sans'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <header className="bg-ms-green-900 hero-bg pattern-overlay">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/brand/logo-transparent.png" alt="MindSync" width={30} height={30} className="opacity-90" />
            <span className="text-ms-ivory-0 font-bold text-[14px]">MindSync</span>
          </a>
          <button type="button" onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="px-3 py-1.5 rounded-full border border-white/20 text-ms-ivory-0 text-[11px] font-mono tracking-wider hover:bg-white/10 transition">
            {t.langBtn}
          </button>
        </div>
        <div className="max-w-2xl mx-auto px-5 pb-6">
          <p className="text-ms-gold-600 text-[10px] font-mono tracking-[0.2em] uppercase mb-1">{t.eyebrow}</p>
          <h1 className="text-ms-ivory-0 font-bold text-[24px] mb-2">{t.headline}</h1>
          <p className="text-white/55 text-[13px] leading-relaxed max-w-lg">{t.intro}</p>
        </div>
      </header>

      <main className="max-w-2xl w-full mx-auto px-5 py-8">
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6 text-[13px] text-red-700">{t.error}</div>
        )}

        <form name="onboarding" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
          <input type="hidden" name="form-name" value="onboarding" />
          <p hidden><input name="bot-field" onChange={() => {}} /></p>

          <Section n="01" title={t.sec1}>
            <Field label={t.businessName} name="businessName" value={f.businessName} onChange={v => set('businessName', v)} required />
            <Field label={t.ownerName} name="ownerName" value={f.ownerName} onChange={v => set('ownerName', v)} required />
            <Field label={t.phone} name="phone" value={f.phone} onChange={v => set('phone', v)} ph={t.whatsappPh} type="tel" required />
            <Field label={t.email} name="email" value={f.email} onChange={v => set('email', v)} type="email" opt={t.optional} />
            <Field label={t.city} name="city" value={f.city} onChange={v => set('city', v)} opt={t.optional} />
          </Section>

          <Section n="02" title={t.sec2}>
            <Pills label={t.bType} value={f.businessType} onChange={v => set('businessType', v)} options={t.bTypeOpts} required />
            <input type="hidden" name="businessType" value={f.businessType} />
            <Area label={t.offering} name="offering" value={f.offering} onChange={v => set('offering', v)} ph={t.offeringPh} />
            <Area label={t.mainItems} name="mainItems" value={f.mainItems} onChange={v => set('mainItems', v)} ph={t.mainItemsPh} />
          </Section>

          <Section n="03" title={t.sec3}>
            <Field label={t.workingHours} name="workingHours" value={f.workingHours} onChange={v => set('workingHours', v)} ph={t.workingHoursPh} />
            <Field label={t.daysOff} name="daysOff" value={f.daysOff} onChange={v => set('daysOff', v)} ph={t.daysOffPh} opt={t.optional} />
          </Section>

          <Section n="04" title={t.sec4}>
            <Field label={t.whatsappNumber} name="whatsappNumber" value={f.whatsappNumber} onChange={v => set('whatsappNumber', v)} ph={t.whatsappPh} type="tel" />
            <Field label={t.instagram} name="instagram" value={f.instagram} onChange={v => set('instagram', v)} ph="@" opt={t.optional} />
            <Field label={t.website} name="website" value={f.website} onChange={v => set('website', v)} opt={t.optional} />
            <MultiPills label={t.currentChannels} values={f.currentChannels} onChange={v => set('currentChannels', v)} options={t.chOpts} />
            <input type="hidden" name="currentChannels" value={f.currentChannels.join(', ')} />
          </Section>

          <Section n="05" title={t.sec5}>
            <Field label={t.agentName} name="agentName" value={f.agentName} onChange={v => set('agentName', v)} ph={t.agentNamePh} opt={t.optional} />
            <Pills label={t.tone} value={f.tone} onChange={v => set('tone', v)} options={t.toneOpts} />
            <input type="hidden" name="tone" value={f.tone} />
            <Pills label={t.languages} value={f.languages} onChange={v => set('languages', v)} options={t.langOpts} />
            <input type="hidden" name="languages" value={f.languages} />
            <Area label={t.faqs} name="faqs" value={f.faqs} onChange={v => set('faqs', v)} ph={t.faqsPh} />
          </Section>

          <Section n="06" title={t.sec6}>
            <Pills label={t.tier} value={f.tier} onChange={v => set('tier', v)} options={t.tierOpts} />
            <input type="hidden" name="tier" value={f.tier} />
          </Section>

          <Section n="07" title={t.sec7}>
            <Area label={t.integrations} name="integrations" value={f.integrations} onChange={v => set('integrations', v)} ph={t.integrationsPh} opt={t.optional} />
            <Area label={t.notes} name="notes" value={f.notes} onChange={v => set('notes', v)} ph={t.notesPh} opt={t.optional} />
          </Section>

          <input type="hidden" name="lang" value={lang} />

          <button type="submit" disabled={status === 'loading'}
            className="w-full mt-2 py-4 rounded-lg bg-ms-gold-600 text-ms-green-900 text-[15px] font-bold hover:bg-ms-gold-400 transition disabled:opacity-60">
            {status === 'loading' ? t.submitting : t.submit}
          </button>
        </form>
      </main>
    </div>
  )
}
