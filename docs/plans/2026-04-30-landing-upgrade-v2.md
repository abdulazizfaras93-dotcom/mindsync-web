# Landing Upgrade v2.0 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the MindSync landing page and all 8 vertical pages with Zone C (WhyNotBot credibility section), Zone E (software-house hero copy), Zone B (KWD-loss pain stats), and Zone D (task elimination tables), plus tier renames and outcome CTAs.

**Architecture:** All copy/data changes flow through `src/lib/data.ts` (single source of truth). Component changes are isolated to their section files. New `WhyNotBot.tsx` is a self-contained server component. Vertical pages reuse the existing `IndustryHero` component — only its copy object changes.

**Tech Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS 3 (brand tokens) · Framer Motion · `useLang()` for AR/EN

**Source document:** `mindsync-landing-upgrade.md` (uploaded 2026-04-30)

---

## Ground Rules (never break)

- **Never `npm run build` locally** — push to `main`, Netlify CI builds on Node 20
- **Never `git add -A` or `git add .`** — stage specific files only, always run `git status` first
- Brand palette only: `#153E2D` · `#BF8D38` · `#FBFAF5` · `#0E1512` — never navy/teal/indigo/purple
- Arabic string always first in `t` objects, English below
- Tier IDs (`essential`, `advanced`, `full-stack`) never change — only display labels change

---

## Task 1: Tier Rename — `Bundles.tsx` display labels only

**Why first:** Everything else that references tier names in JSX depends on this lookup table. Easiest change, lowest risk.

**File:** `src/components/sections/Bundles.tsx` — lines 47–51

**Step 1: Edit TIER_LABELS**

Replace the current object:
```ts
const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  essential:    { en: 'Essential',   ar: 'الأساسية' },
  advanced:     { en: 'Advanced',    ar: 'المتقدمة' },
  'full-stack': { en: 'Full-Stack',  ar: 'المتكاملة' },
}
```

With:
```ts
const TIER_LABELS: Record<TierId, { en: string; ar: string }> = {
  essential:    { en: 'Automated Inbox',           ar: 'صندوق الوارد المؤتمت' },
  advanced:     { en: 'Automated Growth',          ar: 'نمو مؤتمت' },
  'full-stack': { en: 'Fully Automated Business',  ar: 'عمل مؤتمت بالكامل' },
}
```

Also update the `t.popular` badge label (already says "Most Popular" — leave unchanged, it's correct).

**Step 2: Verify no TypeScript errors** (tier IDs are unchanged, only display strings changed)

**Step 3: Commit**
```bash
cd MindSyncWeb
git add src/components/sections/Bundles.tsx
git status   # confirm only Bundles.tsx staged
git commit -m "feat: rename tier labels to Automated Inbox / Growth / Fully Automated"
```

---

## Task 2: Demo Section Copy — `Demo.tsx`

**File:** `src/components/sections/Demo.tsx` — lines 22–26

**Step 1: Replace the `t` object**

```ts
const t = {
  eyebrow:  { en: 'Live Demo',    ar: 'تجربة مباشرة' },
  headline: {
    en: 'Watch the system work',
    ar: 'شاهد النظام يعمل',
  },
  sub: {
    en: 'This is not a bot reading pre-written replies.\nThis is a custom software system, trained on your business, running 24/7.',
    ar: 'هذا ليس بوت يقرأ من قائمة جاهزة.\nهذا نظام برمجي مخصص، مدرَّب على عملك، يعمل ٢٤ ساعة.',
  },
}
```

Note: `\n` in the sub string renders fine inside `<p>` with `whitespace-pre-line` or you can split into two `<span>` blocks. Simplest approach: wrap in a fragment with a `<br />` between sentences. Update the JSX at line 44–47:

```tsx
<h2 className="text-[36px] md:text-[44px] font-bold text-ms-ink-900 tracking-tight mb-4">
  {t.headline[lang]}
</h2>
<p className="text-ms-ink-600 text-[16px] max-w-lg mx-auto leading-relaxed">
  {t.sub[lang].split('\n').map((line, i) => (
    <span key={i} className="block">{line}</span>
  ))}
</p>
```

**Step 2: Commit**
```bash
git add src/components/sections/Demo.tsx
git status
git commit -m "feat(zone-e): update Demo section title and subhead to system messaging"
```

---

## Task 3: Hero Section Rewrite — `Hero.tsx`

**File:** `src/components/sections/Hero.tsx` — lines 28–42 (the `t` object)

**Step 1: Replace the `t` object strings**

Keep all keys identical (eyebrow, headline, headlineAccent, sub, cta1, cta2, stat labels). Only update string values:

```ts
const t = {
  eyebrow:        { en: 'AI Software Agency · Kuwait', ar: 'وكالة برمجيات وذكاء اصطناعي · الكويت' },
  headline:       { en: 'Your business deserves',      ar: 'عملك يستاهل' },
  headlineAccent: { en: 'to run without you.',         ar: 'يشغل بدونك.' },
  sub: {
    en: 'We build your business a custom software system with AI agents — responding, booking, following up, and analyzing.\nFrom WhatsApp to your dashboard in 7 business days.',
    ar: 'نبني ونعلم نظاماً خصصناه ببرمجيات وذكاء اصطناعي —\nيرد، يحجز، يتابع، ويحلل.\nمن واتساب للوحة تحكم في ٧ أيام عمل.',
  },
  cta1:   { en: 'Chat on WhatsApp', ar: 'راسلنا على واتساب' },
  cta2:   { en: 'See the Bundles',  ar: 'شاهد الباقات' },
  stat1l: { en: 'Days to go live',  ar: 'أيام للإطلاق' },
  stat2l: { en: 'Industry bundles', ar: 'باقات صناعية' },
  stat3l: { en: 'Agent uptime',     ar: 'وقت التشغيل' },
  stat4l: { en: 'Data stays yours', ar: 'بياناتك ملكك' },
}
```

Also update the sub paragraph JSX (line 88–91) to support line breaks, same pattern as Demo:

```tsx
<motion.p ... className="text-white/65 text-[16px] leading-relaxed max-w-[480px] mb-10">
  {t.sub[lang].split('\n').map((line, i) => (
    <span key={i} className="block">{line}</span>
  ))}
</motion.p>
```

**Step 2: Commit**
```bash
git add src/components/sections/Hero.tsx
git status
git commit -m "feat(zone-e): rewrite Hero to software-house positioning"
```

---

## Task 4: Process Section — `Process.tsx`

**File:** `src/components/sections/Process.tsx` — lines 8–11 (`t` object) + line 87–91 (footer note)

**Step 1: Update `t.headline` and `t.sub`**

```ts
const t = {
  eyebrow:  { en: 'How It Works', ar: 'آلية العمل' },
  headline: {
    en: '7 business days. Your system is live.',
    ar: '٧ أيام عمل. نظامك جاهز.',
  },
  sub: {
    en: 'The clock starts after contract signing — we don't stop until you're satisfied.',
    ar: 'العداد يبدأ بعد توقيع العقد — ولا نتوقف حتى تكون راضياً.',
  },
}
```

**Step 2: Commit**
```bash
git add src/components/sections/Process.tsx
git status
git commit -m "feat: update Process section headline and context note"
```

---

## Task 5: CTA Section — `CTAFooter.tsx`

**File:** `src/components/sections/CTAFooter.tsx` — lines 9–21 (`t` object in `CTA` function)

**Step 1: Update headline and sub strings only** (keep all other keys unchanged)

```ts
headline: {
  en: "What task are you tired of doing manually? We'll automate it.",
  ar: 'ما الشغل اللي تعبت منه يدوياً؟ وأتمتناه.',
},
sub: {
  en: "Send us your business name and the daily problem. We'll reply with a scoped quote in under 24 hours — free.",
  ar: 'أرسل لنا اسم عملك والمشكلة اليومية. نرد بعرض سعر في أقل من ٢٤ ساعة — مجاناً.',
},
```

Leave `eyebrow`, `cta1`, `cta2`, footer strings unchanged.

**Step 2: Commit**
```bash
git add src/components/sections/CTAFooter.tsx
git status
git commit -m "feat: update CTA headline and subhead to problem-first framing"
```

---

## Task 6: Extend `data.ts` — New Type + Scenario Fields

This is the largest data task. Add `BundleScenario` type and populate all 8 bundles.

**File:** `src/lib/data.ts`

### Step 1: Add types at the top (after existing types, before `BUNDLES`)

```ts
export type BundleScenario = {
  painHeadline: { en: string; ar: string }
  painSolution: { en: string; ar: string }
  tasksEliminated: {
    essential:    { en: string[]; ar: string[] }
    advanced:     { en: string[]; ar: string[] }
    'full-stack': { en: string[]; ar: string[] }
  }
  tierCtas: {
    essential:    { en: string; ar: string }
    advanced:     { en: string; ar: string }
    'full-stack': { en: string; ar: string }
  }
}
```

Then add `scenario: BundleScenario` to the `Bundle` type:

```ts
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
  scenario: BundleScenario   // ← add this
}
```

### Step 2: Add `scenario` to each bundle

Add to each bundle object in `BUNDLES`. Copy exact strings from the source document (Sections 5, 6, 8). Below is the full scenario for each:

---

**CLINIC:**
```ts
scenario: {
  painHeadline: {
    ar: '٦٧٪ من استفسارات المرضى تُقضى بدون موظف واحد.\nموظف الاستقبال عندك يقضي ٣–٤ ساعات يومياً يرد على نفس الأسئلة —\nما يقارب ٢٤٠ دينار شهرياً من وقت الموظف على ردود متكررة.',
    en: '67% of patient inquiries can be resolved without a single staff member.\nYour receptionist spends 3–4 hours daily answering the same questions —\nroughly 240 KWD/month of staff time on repeated replies.',
  },
  painSolution: {
    ar: 'نظام مايند سينك يتولى كل استفسار — حتى الساعة ١١ بالليل.',
    en: "MindSync's system handles every inquiry — even at 11pm.",
  },
  tasksEliminated: {
    essential: {
      ar: ['الرد على "كم سعر التنظيف؟"', 'تأكيد المواعيد يدوياً', 'ملء مواعيد الإلغاء', 'إرسال تعليمات ما قبل الزيارة', 'طلب تقييم Google بعد الزيارة', 'متابعة المرضى غير النشطين'],
      en: ['Answering "how much is a cleaning?"', 'Confirming appointments manually', 'Filling cancelled slots', 'Sending pre-visit instructions', 'Requesting Google reviews', 'Following up inactive patients'],
    },
    advanced: {
      ar: ['الرد على "كم سعر التنظيف؟"', 'تأكيد المواعيد يدوياً', 'ملء مواعيد الإلغاء', 'إرسال تعليمات ما قبل الزيارة', 'طلب تقييم Google بعد الزيارة', 'متابعة المرضى غير النشطين'],
      en: ['Answering "how much is a cleaning?"', 'Confirming appointments manually', 'Filling cancelled slots', 'Sending pre-visit instructions', 'Requesting Google reviews', 'Following up inactive patients'],
    },
    'full-stack': {
      ar: ['الرد على "كم سعر التنظيف؟"', 'تأكيد المواعيد يدوياً', 'ملء مواعيد الإلغاء', 'إرسال تعليمات ما قبل الزيارة', 'طلب تقييم Google بعد الزيارة', 'متابعة المرضى غير النشطين', 'متابعة الفواتير غير المدفوعة'],
      en: ['Answering "how much is a cleaning?"', 'Confirming appointments manually', 'Filling cancelled slots', 'Sending pre-visit instructions', 'Requesting Google reviews', 'Following up inactive patients', 'Chasing unpaid invoices'],
    },
  },
  tierCtas: {
    essential:    { ar: 'قلّل خسارة المرضى — ابدأ الآن', en: 'Stop Losing Patients — Get Started' },
    advanced:     { ar: 'استرجع كل موعد ملغى تلقائياً', en: 'Auto-Recover Every Cancelled Slot' },
    'full-stack': { ar: 'شغّل عيادتك بالكامل', en: 'Run Your Clinic on Autopilot' },
  },
},
```

**SALON:**
```ts
scenario: {
  painHeadline: {
    ar: 'الصالونات تخسر ١٥٪ من إيراداتها شهرياً\nبسبب الغيابات والمكالمات الفائتة.\nعلى صالون دخله ٢٠٠٠ دينار — هذا ٣٠٠ دينار ضائعة في الشهر.',
    en: 'Salons lose 15% of monthly revenue to no-shows and missed calls.\nOn a salon earning 2,000 KWD — that\'s 300 KWD lost every month.',
  },
  painSolution: {
    ar: 'مايند سينك يملأ الجدول ويذكّر — تلقائياً.',
    en: 'MindSync fills your calendar and sends reminders — automatically.',
  },
  tasksEliminated: {
    essential: {
      ar: ['كتابة الحجوزات يدوياً', 'الاتصال لتذكير العميلة', 'البحث عن بديل لموعد ملغى', 'إرسال عروض الأعياد', 'متابعة العميلة بعد الزيارة', 'طلب تقييم Google'],
      en: ['Writing bookings manually', 'Calling to remind clients', 'Finding replacements for cancellations', 'Sending Eid/holiday offers manually', 'Following up post-visit', 'Requesting Google reviews'],
    },
    advanced: {
      ar: ['كتابة الحجوزات يدوياً', 'الاتصال لتذكير العميلة', 'البحث عن بديل لموعد ملغى', 'إرسال عروض الأعياد', 'متابعة العميلة بعد الزيارة', 'طلب تقييم Google'],
      en: ['Writing bookings manually', 'Calling to remind clients', 'Finding replacements for cancellations', 'Sending Eid/holiday offers manually', 'Following up post-visit', 'Requesting Google reviews'],
    },
    'full-stack': {
      ar: ['كتابة الحجوزات يدوياً', 'الاتصال لتذكير العميلة', 'البحث عن بديل لموعد ملغى', 'إرسال عروض الأعياد', 'متابعة العميلة بعد الزيارة', 'طلب تقييم Google'],
      en: ['Writing bookings manually', 'Calling to remind clients', 'Finding replacements for cancellations', 'Sending Eid/holiday offers manually', 'Following up post-visit', 'Requesting Google reviews'],
    },
  },
  tierCtas: {
    essential:    { ar: 'خلّي الجدول يتملأ بنفسه', en: 'Let the Calendar Fill Itself' },
    advanced:     { ar: 'ارجعي لكل عميلة قبل ما تنساك', en: 'Win Back Every Client Before They Forget' },
    'full-stack': { ar: 'شغّلي الصالون — أنتِ تركّزين', en: 'Run the Salon — You Focus' },
  },
},
```

**SPA:**
```ts
scenario: {
  painHeadline: {
    ar: 'السبا يخسر أكثر من ٢٠٪ من حجوزاته\nلأن واتساب ما اتردّ بسرعة.\nالعميل يقرر خلال ٥ دقائق — إذا ما رددتِ، قرر بحسابك.',
    en: 'Spas lose 20%+ of bookings because WhatsApp went unanswered.\nClients decide in 5 minutes — if you don\'t reply, they decide without you.',
  },
  painSolution: {
    ar: 'مايند سينك يرد خلال ثوانٍ — في أي وقت.',
    en: 'MindSync responds in seconds — any time of day.',
  },
  tasksEliminated: {
    essential: {
      ar: ['الرد على أسئلة الخدمات والأسعار', 'التحقق من جدول المعالجين', 'إرسال تذكيرات الموعد', 'اقتراح ترقية الخدمة', 'متابعة ما بعد الجلسة', 'حملات الأعياد والمناسبات'],
      en: ['Answering service and pricing questions', 'Checking therapist availability', 'Sending appointment reminders', 'Suggesting service upgrades', 'Post-session follow-up', 'Seasonal offer campaigns'],
    },
    advanced: {
      ar: ['الرد على أسئلة الخدمات والأسعار', 'التحقق من جدول المعالجين', 'إرسال تذكيرات الموعد', 'اقتراح ترقية الخدمة', 'متابعة ما بعد الجلسة', 'حملات الأعياد والمناسبات'],
      en: ['Answering service and pricing questions', 'Checking therapist availability', 'Sending appointment reminders', 'Suggesting service upgrades', 'Post-session follow-up', 'Seasonal offer campaigns'],
    },
    'full-stack': {
      ar: ['الرد على أسئلة الخدمات والأسعار', 'التحقق من جدول المعالجين', 'إرسال تذكيرات الموعد', 'اقتراح ترقية الخدمة', 'متابعة ما بعد الجلسة', 'حملات الأعياد والمناسبات'],
      en: ['Answering service and pricing questions', 'Checking therapist availability', 'Sending appointment reminders', 'Suggesting service upgrades', 'Post-session follow-up', 'Seasonal offer campaigns'],
    },
  },
  tierCtas: {
    essential:    { ar: 'ما تخسر حجزاً ثانياً', en: "Don't Lose Another Booking" },
    advanced:     { ar: 'ارجع لكل عميل قبل ما يُنسى', en: 'Win Back Every Client Before They Go Cold' },
    'full-stack': { ar: 'شغّل السبا — بنظام كامل', en: 'Run the Spa — With a Full System' },
  },
},
```

**GYM:**
```ts
scenario: {
  painHeadline: {
    ar: 'معظم الجيمات تخسر ٣٠٪ من أعضائها سنوياً.\nالسبب مو السعر — السبب ما تابع أحد.\nعضو بـ٣٥ دينار شهرياً × ١٢ شهر = ٤٢٠ دينار تخسرها\nلأن ما أرسل أحد رسالة واحدة.',
    en: 'Most gyms lose 30% of members annually.\nNot because of price — because nobody followed up.\nOne member at 35 KWD/mo × 12 months = 420 KWD lost\nbecause nobody sent a single message.',
  },
  painSolution: {
    ar: 'مايند سينك يتابع كل عضو — من أول يوم لآخر تجديد.',
    en: 'MindSync follows up with every member — from day one to last renewal.',
  },
  tasksEliminated: {
    essential: {
      ar: ['الاتصال لتذكير تجديد الاشتراك', 'إدارة قوائم انتظار الحصص على واتساب', 'استقبال الأعضاء الجدد وشرح البرنامج', 'متابعة الأعضاء المنقطعين', 'تذكيرات جلسات المدرب الشخصي', 'حملات رمضان والصيف'],
      en: ['Calling to remind membership renewals', 'Managing class waitlists on WhatsApp', 'Onboarding new members manually', 'Chasing lapsed members', 'PT session rebooking reminders', 'Ramadan/summer campaigns'],
    },
    advanced: {
      ar: ['الاتصال لتذكير تجديد الاشتراك', 'إدارة قوائم انتظار الحصص على واتساب', 'استقبال الأعضاء الجدد وشرح البرنامج', 'متابعة الأعضاء المنقطعين', 'تذكيرات جلسات المدرب الشخصي', 'حملات رمضان والصيف'],
      en: ['Calling to remind membership renewals', 'Managing class waitlists on WhatsApp', 'Onboarding new members manually', 'Chasing lapsed members', 'PT session rebooking reminders', 'Ramadan/summer campaigns'],
    },
    'full-stack': {
      ar: ['الاتصال لتذكير تجديد الاشتراك', 'إدارة قوائم انتظار الحصص على واتساب', 'استقبال الأعضاء الجدد وشرح البرنامج', 'متابعة الأعضاء المنقطعين', 'تذكيرات جلسات المدرب الشخصي', 'حملات رمضان والصيف'],
      en: ['Calling to remind membership renewals', 'Managing class waitlists on WhatsApp', 'Onboarding new members manually', 'Chasing lapsed members', 'PT session rebooking reminders', 'Ramadan/summer campaigns'],
    },
  },
  tierCtas: {
    essential:    { ar: 'قلّل خسارة الأعضاء', en: 'Stop Losing Members' },
    advanced:     { ar: 'اجعل كل عضو يجدد تلقائياً', en: 'Make Every Member Renew Automatically' },
    'full-stack': { ar: 'شغّل الجيم — من عضو، لكل يوم', en: 'Run the Gym — Every Member, Every Day' },
  },
},
```

**GARAGE:**
```ts
scenario: {
  painHeadline: {
    ar: 'فريق الورشة يقضي ٢–٣ ساعات يومياً\nيجيب على سؤال واحد: "السيارة جاهزة؟"\n٣ ساعات × ٢٦ يوم عمل × ٣ دينار/ساعة = ٢٣٤ دينار شهرياً\nتدفعها على ردود متكررة — لا على الصيانة.',
    en: 'Your team spends 2–3 hours daily\nanswering one question: "Is my car ready?"\n3 hrs × 26 working days × 3 KWD/hr = 234 KWD/month\npaid for repeated answers — not actual work.',
  },
  painSolution: {
    ar: 'مايند سينك يجيب عن هذا السؤال — إلى الأبد.',
    en: 'MindSync answers that question — permanently.',
  },
  tasksEliminated: {
    essential: {
      ar: ['الرد على "السيارة جاهزة؟"', 'الاتصال عند انتهاء الإصلاح', 'إرسال الفاتورة عبر واتساب', 'تذكيرات الصيانة الدورية', 'متابعة ما بعد الاستلام', 'استقبال طلبات صيانة جديدة'],
      en: ['Answering "is my car ready?"', 'Calling when the job is done', 'Sending WhatsApp invoices manually', 'Service interval reminders', 'Post-pickup follow-up', 'Receiving new service requests'],
    },
    advanced: {
      ar: ['الرد على "السيارة جاهزة؟"', 'الاتصال عند انتهاء الإصلاح', 'إرسال الفاتورة عبر واتساب', 'تذكيرات الصيانة الدورية', 'متابعة ما بعد الاستلام', 'استقبال طلبات صيانة جديدة'],
      en: ['Answering "is my car ready?"', 'Calling when the job is done', 'Sending WhatsApp invoices manually', 'Service interval reminders', 'Post-pickup follow-up', 'Receiving new service requests'],
    },
    'full-stack': {
      ar: ['الرد على "السيارة جاهزة؟"', 'الاتصال عند انتهاء الإصلاح', 'إرسال الفاتورة عبر واتساب', 'تذكيرات الصيانة الدورية', 'متابعة ما بعد الاستلام', 'استقبال طلبات صيانة جديدة'],
      en: ['Answering "is my car ready?"', 'Calling when the job is done', 'Sending WhatsApp invoices manually', 'Service interval reminders', 'Post-pickup follow-up', 'Receiving new service requests'],
    },
  },
  tierCtas: {
    essential:    { ar: 'خلي النظام يجاوب عنك', en: 'Let the System Answer For You' },
    advanced:     { ar: 'عملاؤك يرجع — قبل ما يفكر بغيرك', en: 'Customers Come Back — Before They Think of Anyone Else' },
    'full-stack': { ar: 'شغّل الورشة — بنظام كامل', en: 'Run the Garage — With a Full System' },
  },
},
```

**RESTAURANT:**
```ts
scenario: {
  painHeadline: {
    ar: '٤٣٪ من مكالمات المطاعم ما يُرد عليها.\nطاولة لـ٤ أشخاص × ٢٠ دينار متوسط = ٨٠ دينار من كل حجز فائت.\nمطعم يخسر ٣–٤ حجوزات أسبوعياً =\nما بين ٩٦٠–١٢٨٠ دينار شهرياً.',
    en: '43% of restaurant calls go unanswered.\nA table of 4 × 20 KWD average = 80 KWD per missed booking.\nA restaurant losing 3–4 bookings weekly =\n960 to 1,280 KWD lost every month.',
  },
  painSolution: {
    ar: 'مايند سينك يستقبل الحجوزات — حتى بعد الدوام.',
    en: 'MindSync takes bookings — even after closing time.',
  },
  tasksEliminated: {
    essential: {
      ar: ['استقبال الحجوزات بعد الدوام', 'تأكيد الحجوزات والتذكير بها', 'متابعة الطاولات الملغية', 'استقبال وتأكيل طلبات الكاتيرينج', 'طلب تقييم Google بعد الزيارة', 'إرسال عروض الأعياد والمناسبات'],
      en: ['Taking bookings after closing time', 'Confirming reservations and sending reminders', 'Managing cancelled table follow-up', 'Receiving and qualifying catering requests', 'Requesting Google reviews post-visit', 'Sending Eid/National Day offers'],
    },
    advanced: {
      ar: ['استقبال الحجوزات بعد الدوام', 'تأكيد الحجوزات والتذكير بها', 'متابعة الطاولات الملغية', 'استقبال وتأكيل طلبات الكاتيرينج', 'طلب تقييم Google بعد الزيارة', 'إرسال عروض الأعياد والمناسبات'],
      en: ['Taking bookings after closing time', 'Confirming reservations and sending reminders', 'Managing cancelled table follow-up', 'Receiving and qualifying catering requests', 'Requesting Google reviews post-visit', 'Sending Eid/National Day offers'],
    },
    'full-stack': {
      ar: ['استقبال الحجوزات بعد الدوام', 'تأكيد الحجوزات والتذكير بها', 'متابعة الطاولات الملغية', 'استقبال وتأكيل طلبات الكاتيرينج', 'طلب تقييم Google بعد الزيارة', 'إرسال عروض الأعياد والمناسبات'],
      en: ['Taking bookings after closing time', 'Confirming reservations and sending reminders', 'Managing cancelled table follow-up', 'Receiving and qualifying catering requests', 'Requesting Google reviews post-visit', 'Sending Eid/National Day offers'],
    },
  },
  tierCtas: {
    essential:    { ar: 'ما تترك طاولة فاضية ثانياً', en: "Don't Leave Another Table Empty" },
    advanced:     { ar: 'حوّل كل زيارة لزيارة ثانية', en: 'Turn Every Visit Into a Second One' },
    'full-stack': { ar: 'شغّل المطعم — في كل يوم', en: 'Run the Restaurant — Every Single Day' },
  },
},
```

**REAL ESTATE:**
```ts
scenario: {
  painHeadline: {
    ar: 'العميل العقاري يبرد في أقل من ٥ دقائق.\nمعظم الوسطاء يردون بعد ٥ ساعات.\nعمولة متوسطة في الكويت: ١٥٠٠–٤٠٠٠ دينار.\nكل استفسار ما رددت عليه فوراً = عمولة محتملة راحت.',
    en: 'Real estate leads go cold in under 5 minutes.\nMost agents respond in 5 hours.\nAverage commission in Kuwait: 1,500–4,000 KWD.\nEvery unanswered inquiry = a potential commission gone.',
  },
  painSolution: {
    ar: 'مايند سينك يرد فوراً ويؤهل العميل — قبل ما يبرد.',
    en: 'MindSync responds instantly and qualifies the lead — before they go cold.',
  },
  tasksEliminated: {
    essential: {
      ar: ['الرد الفوري على استفسارات العقارات', 'تصفية العملاء غير الجادين يدوياً', 'إرسال قوائم عقارات لكل عميل', 'جدولة وتذكير المعاينات', 'متابعة العميل بعد المعاينة', 'تقارير الملاك الشهرية (Full-Stack)'],
      en: ['Instantly replying to property inquiries', 'Filtering unserious leads manually', 'Sending property lists to each client', 'Scheduling and reminding viewings', 'Post-viewing follow-up', 'Monthly landlord reports (Full-Stack)'],
    },
    advanced: {
      ar: ['الرد الفوري على استفسارات العقارات', 'تصفية العملاء غير الجادين يدوياً', 'إرسال قوائم عقارات لكل عميل', 'جدولة وتذكير المعاينات', 'متابعة العميل بعد المعاينة'],
      en: ['Instantly replying to property inquiries', 'Filtering unserious leads manually', 'Sending property lists to each client', 'Scheduling and reminding viewings', 'Post-viewing follow-up'],
    },
    'full-stack': {
      ar: ['الرد الفوري على استفسارات العقارات', 'تصفية العملاء غير الجادين يدوياً', 'إرسال قوائم عقارات لكل عميل', 'جدولة وتذكير المعاينات', 'متابعة العميل بعد المعاينة', 'تقارير الملاك الشهرية'],
      en: ['Instantly replying to property inquiries', 'Filtering unserious leads manually', 'Sending property lists to each client', 'Scheduling and reminding viewings', 'Post-viewing follow-up', 'Monthly landlord reports'],
    },
  },
  tierCtas: {
    essential:    { ar: 'ما تترك استفساراً بدون رد', en: "Don't Leave an Inquiry Unanswered" },
    advanced:     { ar: 'حوّل كل استفسار لمعاينة', en: 'Convert Every Inquiry Into a Viewing' },
    'full-stack': { ar: 'شغّل مكتبك — من عميل، لكل عقار', en: 'Run the Office — Every Client, Every Property' },
  },
},
```

**HOME BUSINESS:**
```ts
scenario: {
  painHeadline: {
    ar: 'صاحبة مشروع منزلي تقضي في المتوسط\n٥–٦ ساعات يومياً تدير واتساب.\nبقيمة وقت ٥ دنانير/ساعة —\nهذا ٧٥٠–٩٠٠ دينار شهرياً تذهب على رسائل متكررة.',
    en: 'A home business owner spends an average of\n5–6 hours daily managing WhatsApp.\nAt 5 KWD/hour value of time —\nthat\'s 750–900 KWD/month spent on repeated messages.',
  },
  painSolution: {
    ar: 'مايند سينك يشيل هالحمل — وأنتِ تركّزين على الإبداع.',
    en: 'MindSync takes that weight off — so you focus on your craft.',
  },
  tasksEliminated: {
    essential: {
      ar: ['الرد على "كم السعر؟" كل يوم', 'تتبع الطلبات وحالتها', 'إرسال تأكيد الطلب', 'البحث عن معلومات عميل قديم', 'إرسال عروض الأعياد يدوياً', 'متابعة ما بعد التسليم'],
      en: ['Answering "how much?" every day', 'Tracking orders and their status', 'Sending order confirmations', 'Looking up old customer info', 'Sending holiday offers manually', 'Post-delivery follow-up'],
    },
    advanced: {
      ar: ['الرد على "كم السعر؟" كل يوم', 'تتبع الطلبات وحالتها', 'إرسال تأكيد الطلب', 'البحث عن معلومات عميل قديم', 'إرسال عروض الأعياد يدوياً', 'متابعة ما بعد التسليم'],
      en: ['Answering "how much?" every day', 'Tracking orders and their status', 'Sending order confirmations', 'Looking up old customer info', 'Sending holiday offers manually', 'Post-delivery follow-up'],
    },
    'full-stack': {
      ar: ['الرد على "كم السعر؟" كل يوم', 'تتبع الطلبات وحالتها', 'إرسال تأكيد الطلب', 'البحث عن معلومات عميل قديم', 'إرسال عروض الأعياد يدوياً', 'متابعة ما بعد التسليم'],
      en: ['Answering "how much?" every day', 'Tracking orders and their status', 'Sending order confirmations', 'Looking up old customer info', 'Sending holiday offers manually', 'Post-delivery follow-up'],
    },
  },
  tierCtas: {
    essential:    { ar: 'شيلي ثقل الواتساب عن كتفك', en: 'Take WhatsApp Off Your Plate' },
    advanced:     { ar: 'خلّي مشروعك يكبر بدون ضغط', en: 'Let Your Business Grow Without the Grind' },
    'full-stack': { ar: 'شغّلي مشروعك — ركّزي على الجودة', en: 'Run Your Business — Focus on Quality' },
  },
},
```

### Step 3: Commit
```bash
git add src/lib/data.ts
git status
git commit -m "feat(zone-b/d): add BundleScenario type + scenario data for all 8 industries"
```

---

## Task 7: Render Pain Stat Headlines — `Bundles.tsx` (Zone B)

**File:** `src/components/sections/Bundles.tsx`

The pain stat banner currently exists in `Demo.tsx`. In `Bundles.tsx`, we need to render the new `painHeadline` + `painSolution` above the tier cards for the selected industry.

**Step 1: Read the current bundle selection + rendering area**

Currently at around line 53–200 in `Bundles.tsx`. There is already a bundle selector UI and then tier cards. Find where the tier cards grid starts (look for `TIER_ORDER.map`).

**Step 2: Add pain headline block above the tier grid**

After the industry tab/selector (before tier cards), insert:

```tsx
{/* Zone B — Pain headline */}
<div className="mb-8">
  <p className="font-mono text-ms-gold-600 text-[15px] md:text-[17px] font-semibold leading-snug whitespace-pre-line">
    {selectedBundle.scenario.painHeadline[lang]}
  </p>
  <p className="text-ms-green-800 font-medium text-[14px] mt-2">
    {selectedBundle.scenario.painSolution[lang]}
  </p>
</div>
```

Where `selectedBundle` is the currently-active bundle (already tracked in component state).

**Step 3: Commit**
```bash
git add src/components/sections/Bundles.tsx
git status
git commit -m "feat(zone-b): render pain headline + solution above tier cards"
```

---

## Task 8: Task Elimination Tables + Outcome CTAs — `Bundles.tsx` (Zone D)

**File:** `src/components/sections/Bundles.tsx` — `TierCard` component

**Step 1: Replace the feature `<ul>` with a task-elimination table**

Inside `TierCard`, replace the feature list render (currently `ul > li` with `Check` icons) with:

```tsx
{/* Zone D — Task elimination table */}
<table className="w-full text-sm mt-4 mb-4">
  <tbody>
    {tier.id === 'essential' || tier.id === 'advanced' || tier.id === 'full-stack'
      ? bundle.scenario.tasksEliminated[tier.id][lang].map((task, i) => (
          <tr key={i} className="border-b border-ms-ivory-200/20 last:border-0">
            <td className={`py-2 pr-4 text-[13px] leading-snug ${isAdvanced ? 'text-white/60' : 'text-ms-ink-600'}`}>
              {task}
            </td>
            <td className={`py-2 text-right font-mono text-[11px] whitespace-nowrap font-semibold ${isAdvanced ? 'text-red-400' : 'text-red-500'}`}>
              {lang === 'ar' ? '× انتهى' : '× Gone'}
            </td>
          </tr>
        ))
      : null}
  </tbody>
</table>
```

**Step 2: Replace generic CTA button text with per-tier outcome CTA**

Currently `t.cta[lang]` is used for all tier CTAs ("Get Started" / "ابدأ الآن"). Replace with:

```tsx
<a
  href={`https://wa.me/96599539006?text=${waText}`}
  ...
>
  {bundle.scenario.tierCtas[tierId][lang]}
</a>
```

**Step 3: Commit**
```bash
git add src/components/sections/Bundles.tsx
git status
git commit -m "feat(zone-d): replace feature bullets with task elimination tables + outcome CTAs per tier"
```

---

## Task 9: Create `WhyNotBot.tsx` — Zone C

**File to create:** `src/components/sections/WhyNotBot.tsx`

This is a `'use client'` component (needs `useLang()`). Full implementation:

```tsx
'use client'
import { useLang } from '@/lib/lang'

const t = {
  eyebrow: {
    ar: 'ليش مايند سينك وليس بوت عادي؟',
    en: 'Why MindSync and not just a bot?',
  },
  headline: {
    ar: 'شركات كثيرة في الكويت تبيعك بوت.\nمايند سينك تبني لك نظام.\nالفرق؟ كل شيء.',
    en: 'Many companies in Kuwait will sell you a bot.\nMindSync builds you a system.\nThe difference? Everything.',
  },
  body: {
    ar: 'البوت يقرأ من قائمة أجوبة جاهزة.\nالنظام الذي نبنيه يفكر — يعرف عملك، يقرر متى يحجز،\nمتى يتابع، ومتى يحيلك لنا. مبني خصوصاً لك،\nلا نسخة من قالب استخدمناه لغيرك.',
    en: "A bot reads from a prepared answer list.\nThe system we build thinks — it knows your business,\ndecides when to book, when to follow up, and when to escalate.\nBuilt specifically for you. No two MindSync systems are identical.",
  },
  tableHeaders: {
    ar: ['شركات البوت', 'فريلانسر', 'Enterprise AI', 'مايند سينك'],
    en: ['Bot Company', 'Freelancer', 'Enterprise AI', 'MindSync'],
  },
  cards: [
    {
      title: { ar: 'مبنيّ لك، مش نسخة من قالب', en: 'Built for you, not copied from a template' },
      body:  { ar: 'كل نظام نبنيه برمج خصوصاً لعملك — أسعارك، فريقك، ساعات عملك، أسلوبك. ما في نسختين متطابقتين في مايند سينك.', en: 'Every system we build is programmed specifically for your business — your pricing, team, hours, tone. No two MindSync systems are identical.' },
    },
    {
      title: { ar: 'نعلّم الذكاء الاصطناعي بعملك', en: 'We teach the AI your business' },
      body:  { ar: 'مو سيناريو يقرأ من قائمة. ذكاء اصطناعي يتعلم كيف تفكر، متى تحيل، وكيف يرد — بلغتك وأسلوبك.', en: "Not a script reading from a list. An AI agent that learns how you think, when to escalate, and how to respond — in your language and your tone." },
    },
    {
      title: { ar: 'نبقى معك بعد الإطلاق', en: 'We stay with you after launch' },
      body:  { ar: 'الاشتراك الشهري مو رسوم — هو ضمان. شخص يراقب نظامك ويطوّره كل شهر. بدون ما تطلب.', en: "The monthly retainer isn't a fee — it's a guarantee. Someone watching, fixing, and improving your system every month. Without you asking." },
    },
  ],
}

const TABLE_ROWS = [
  { feature: { ar: 'رد تلقائي',             en: 'Auto-reply' },              bot: '✓', freelancer: '✓', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'متابعة بعد الزيارة',     en: 'Post-visit follow-up' },    bot: '✗', freelancer: '~', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'CRM + سجل العميل',       en: 'CRM + client history' },    bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'تحليلات الإيرادات',     en: 'Revenue analytics' },       bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'صيانة شهرية',            en: 'Monthly maintenance' },     bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'مبني لسوق الكويت',       en: 'Built for Kuwait market' }, bot: '✗', freelancer: '~', enterprise: '✗', ms: '✓' },
  { feature: { ar: 'شركة برمجيات مرخصة',    en: 'Licensed software company'},bot: '✗', freelancer: '✗', enterprise: '✓', ms: '✓' },
  { feature: { ar: 'السعر',                   en: 'Price' },
    bot: { ar: 'منخفض', en: 'Low' },
    freelancer: { ar: 'منخفض', en: 'Low' },
    enterprise: '+10,000 KWD',
    ms: '200–580 KWD/شهر',
  },
]

function cellColor(val: string) {
  if (val === '✓') return 'text-ms-gold-600'
  if (val === '✗') return 'text-red-400'
  if (val === '~') return 'text-yellow-400'
  return 'text-white/60'
}

export default function WhyNotBot() {
  const { lang, isAr } = useLang()

  return (
    <section className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Eyebrow */}
        <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-mono font-medium mb-5 flex items-center gap-3">
          <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
          {t.eyebrow[lang]}
        </p>

        {/* Headline */}
        <h2 className="text-[38px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-6 whitespace-pre-line">
          {t.headline[lang]}
        </h2>

        {/* Body */}
        <p className="text-white/55 text-[16px] leading-relaxed max-w-2xl mb-14 whitespace-pre-line">
          {t.body[lang]}
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-16">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead>
              <tr className="border-b border-ms-gold-600/40">
                <th className="text-left py-3 pr-4 text-white/40 font-mono text-[11px] tracking-widest uppercase w-[34%]">
                  {isAr ? 'الميزة' : 'Feature'}
                </th>
                {t.tableHeaders[lang].map((h, i) => (
                  <th key={i} className={`py-3 px-3 font-mono text-[11px] tracking-widest uppercase text-center ${i === 3 ? 'text-ms-gold-600' : 'text-white/40'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-white/8 last:border-0 hover:bg-white/3">
                  <td className="py-3 pr-4 text-white/60 text-[13px]">{row.feature[lang]}</td>
                  {(['bot', 'freelancer', 'enterprise', 'ms'] as const).map((col) => {
                    const val = typeof row[col] === 'object' ? (row[col] as { ar: string; en: string })[lang] : row[col] as string
                    return (
                      <td key={col} className={`py-3 px-3 text-center font-mono text-[13px] font-semibold ${col === 'ms' ? cellColor('✓') : cellColor(val)}`}>
                        {val}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3 Differentiator Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.cards.map((card, i) => (
            <div key={i} className="border border-ms-gold-600/30 bg-ms-green-800 rounded-xl p-6">
              <h3 className="text-ms-gold-600 font-bold text-[16px] mb-3">{card.title[lang]}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{card.body[lang]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

**Step 2: Commit**
```bash
git add src/components/sections/WhyNotBot.tsx
git status
git commit -m "feat(zone-c): add WhyNotBot credibility section with comparison table"
```

---

## Task 10: Wire `WhyNotBot` into `page.tsx`

**File:** `src/app/page.tsx`

**Step 1: Add import + insertion**

```tsx
import WhyNotBot from '@/components/sections/WhyNotBot'
```

Insert `<WhyNotBot />` between `<Demo />` and `<Bundles />`:

```tsx
<Demo />
<WhyNotBot />
<Bundles />
```

**Step 2: Commit**
```bash
git add src/app/page.tsx
git status
git commit -m "feat: insert WhyNotBot section between Demo and Bundles"
```

---

## Task 11: Push to Production

```bash
git push origin main
```

Netlify auto-builds. Monitor at https://app.netlify.com → `mindsync-web` → Deploys.

**Verify after deploy:**
1. `https://www.mindsynckw.com` — hero reads "Your business deserves / to run without you."
2. Demo section reads "Watch the system work"
3. WhyNotBot section appears between Demo and Bundles (dark green plate with comparison table)
4. Bundles section: tier names show "Automated Inbox / Automated Growth / Fully Automated Business"
5. Each tier card shows task elimination table (× Gone column)
6. CTA buttons show industry+tier-specific text (not generic "Get Started")
7. Toggle AR/EN — all sections flip correctly, no broken strings
8. Check `/clinics`, `/salons` etc. pages — they inherit Bundles changes automatically

---

## Task 12: Vertical Pages Hero Copy — `IndustryHero.tsx` (Week 3+)

**Note:** Lower priority. Only tackle after Tasks 1–11 are live and validated.

**File:** `src/components/sections/IndustryHero.tsx`

First read the file to understand how it uses `industryId`. Then add a `VERTICAL_HERO_COPY` map keyed by `industryId` with the dialect copy from Section 11 of the source document (clinic, salon, spa, gym, garage, restaurant, real-estate, home-business).

Replace or augment the generic hero headline with the dialect copy when `industryId` is present.

Commit and push after each vertical page is updated.

---

## Estimated Time
- Tasks 1–5: ~1.5 hours (copy-only changes)
- Task 6: ~2 hours (8 industry scenario blocks)
- Tasks 7–8: ~1.5 hours (Bundles.tsx render changes)
- Task 9–10: ~2 hours (WhyNotBot new component)
- Task 11: 5 min
- **Total (items 1–11): ~7–8 hours**
