import type { FaqKey } from '@/types/conversation'

export const FAQ_ITEMS: { id: FaqKey; q: { en: string; ar: string }; a: { en: string; ar: string } }[] = [
  {
    id: 'data',
    q: { en: 'Who owns the data?', ar: 'منو يملك البيانات؟' },
    a: {
      en: 'You own 100% of it. All data (messages, customers, orders) is saved under your account. If you stop the subscription, you get a full export.',
      ar: 'أنت تملكها 100%. كل البيانات (الرسائل، العملاء، الطلبات) محفوظة بحساب باسمك. لو وقفت الاشتراك، تأخذ export كامل.',
    },
  },
  {
    id: 'setup',
    q: { en: 'What if something breaks at night?', ar: 'شنو لو خربت مشكلة بالليل؟' },
    a: {
      en: 'We have 24/7 monitoring + an SLA that guarantees fixes within 4 hours. There\'s also an emergency backup that routes messages directly to you.',
      ar: 'عندنا monitoring 24/7 + SLA يضمن إصلاح أي عطل خلال 4 ساعات. وفيه backup خطة طوارئ تحوّل الرسائل لك مباشرة.',
    },
  },
  {
    id: 'cancel',
    q: { en: 'Can I cancel anytime?', ar: 'أقدر ألغي في أي وقت؟' },
    a: {
      en: 'Absolutely. No binding contract. Cancel with one button in the dashboard and get a full data export within 7 days.',
      ar: 'أكيد. مافيه عقد ملزم. تلغي بزر واحد من dashboard، ونعطيك export لكل بياناتك خلال 7 أيام.',
    },
  },
  {
    id: 'training',
    q: { en: 'How does a conversation count?', ar: 'شلون تنحسب المحادثة؟' },
    a: {
      en: 'A conversation = all messages with one customer in 24 hours. Whether 1 message or 50 — it counts as one. Same method as Meta.',
      ar: 'المحادثة = مجموعة رسائل مع عميل واحد خلال 24 ساعة. سواء رسالة وحدة أو 50 — تنحسب وحدة. نفس طريقة Meta.',
    },
  },
  {
    id: 'channels',
    q: { en: 'Does it work without internet?', ar: 'هل تشتغل بدون انترنت؟' },
    a: {
      en: 'The AI needs internet, but the dashboard can store temporarily and sync when the connection returns. 99.9% uptime guaranteed.',
      ar: 'الـ AI لا — يحتاج انترنت. بس الـ dashboard يقدر يخزّن مؤقتاً ويتزامن لما يرجع الانترنت. ٩٩.٩٪ uptime مضمون.',
    },
  },
  {
    id: 'trial',
    q: { en: 'What\'s included in the monthly price?', ar: 'شنو يشمل السعر الشهري؟' },
    a: {
      en: 'There are 3 tiers — from 79 KWD/mo (Receptionist) to 149 (Coordinator) to 299 (Manager). Every tier covers: AI APIs (Claude/GPT), WhatsApp Business API, hosting + infrastructure, monthly management + training, 24/7 monitoring — and your included conversations (1,000 / 3,000 / 8,000). No surprise AI bills.',
      ar: 'عندنا 3 باقات — من ٧٩ د.ك بالشهر (موظف الاستقبال) إلى ١٤٩ (المنسّق) إلى ٢٩٩ (المدير). كل باقة تشمل:\n• AI APIs (Claude/GPT)\n• WhatsApp Business API\n• Hosting + infrastructure\n• إدارة شهرية + تدريب\n• مراقبة 24/7\n• المحادثات المشمولة (١٬٠٠٠ / ٣٬٠٠٠ / ٨٬٠٠٠)\nوما في فواتير ذكاء اصطناعي مفاجئة.',
    },
  },
  {
    id: 'results',
    q: { en: 'How are you different from ChatGPT?', ar: 'شلون تختلفون عن chatgpt؟' },
    a: {
      en: 'ChatGPT is a general tool. We build a system custom to your business: trained on your products & prices, connected to WhatsApp + Instagram, with a customer dashboard and payment links. ChatGPT can\'t do that.',
      ar: 'ChatGPT أداة عامة. نحن نبني نظام مخصص لمشروعك:\n- مدرّب على منتجاتك وأسعارك\n- يربط مع WhatsApp + Instagram\n- يحفظ بيانات عملائك بـ dashboard\n- يرسل payment links\nChatGPT ما يسوي هذا.',
    },
  },
  {
    id: 'languages',
    q: { en: 'What if I don\'t like it?', ar: 'شنو لو ما عجبني؟' },
    a: {
      en: 'You start with a paid 30-Day Pilot (150 KWD) — a live agent on your real business. If you continue, the 150 is credited to your setup fee. After that, no binding contract — cancel anytime with one button.',
      ar: 'تبدأ بتجربة ٣٠ يوم مدفوعة (١٥٠ د.ك) — وكيل حقيقي على مشروعك. لو استمريت، الـ ١٥٠ تُحتسب ضمن رسوم التأسيس. وبعدها مافيه عقد ملزم — تلغي في أي وقت بزر واحد.',
    },
  },
]