import type { FaqKey } from '@/types/conversation'

export const FAQ_ITEMS: { id: FaqKey; q: { en: string; ar: string }; a: { en: string; ar: string } }[] = [
  {
    id: 'setup',
    q: { en: 'How long does setup take?', ar: 'كم تأخذ مدة الإعداد؟' },
    a: { en: 'Your AI agent is live in 7 business days. We handle everything — no technical skills needed from you.', ar: 'وكيلك الذكي يصير حي خلال ٧ أيام عمل. نحن نتولى كل شي — ما تحتاج خبرة تقنية.' },
  },
  {
    id: 'languages',
    q: { en: 'Does it speak Arabic and English?', ar: 'يتكلم عربي وإنجليزي؟' },
    a: { en: 'Yes! Your AI responds in both Arabic and English — automatically matching the customer\'s language.', ar: 'نعم! وكيلك يرد بالعربي والإنجليزي — يتكيف تلقائياً مع لغة الزبون.' },
  },
  {
    id: 'channels',
    q: { en: 'Which channels are supported?', ar: 'أي قنوات مدعومة؟' },
    a: { en: 'WhatsApp, Instagram DMs, and Telegram. All conversations in one dashboard.', ar: 'واتساب، رسائل إنستغرام، وتيليغرام. كل المحادثات في لوحة واحدة.' },
  },
  {
    id: 'training',
    q: { en: 'Can I customize what it says?', ar: 'أقدر أخصص كلامه؟' },
    a: { en: 'Absolutely. You can edit its knowledge base, tone, and responses anytime from your portal.', ar: 'بالتأكيد. تقدر تعدل قاعدة معرفته، أسلوبه، وردوده في أي وقت من البوابة.' },
  },
  {
    id: 'cancel',
    q: { en: 'Can I cancel anytime?', ar: 'أقدر أوقف الاشتراك؟' },
    a: { en: 'Yes — no contracts, no cancellation fees. Cancel anytime with 30 days notice.', ar: 'نعم — لا عقود، لا رسوم إلغاء. تقدر تلغي في أي وقت مع إشعار ٣٠ يوم.' },
  },
  {
    id: 'trial',
    q: { en: 'Is there a free trial?', ar: 'في فترة تجريبية مجانية؟' },
    a: { en: 'We offer a live demo — you see your AI in action before any payment. Book it in the next step.', ar: 'نقدم ديمو مباشر — تشوف وكيلك وهو يشتغل قبل أي دفع. احجزه في الخطوة التالية.' },
  },
  {
    id: 'data',
    q: { en: 'Is my data secure?', ar: 'بياناتي آمنة؟' },
    a: { en: 'Yes. All data is encrypted, stored in Kuwait/GCC servers, and never shared with third parties.', ar: 'نعم. كل البيانات مشفرة، مخزنة في سيرفرات الكويت/الخليج، وما تُشارك مع أحد.' },
  },
  {
    id: 'results',
    q: { en: 'What results can I expect?', ar: 'شو النتائج المتوقعة؟' },
    a: { en: 'Clients typically see 70% fewer missed messages, 3x faster response times, and hours saved weekly.', ar: 'العملاء عادةً يشوفون ٧٠٪ أقل رسائل فائتة، ردود أسرع ٣ مرات، وساعات توفير أسبوعياً.' },
  },
]
