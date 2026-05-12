'use client'
import { Zap, Star, Cpu } from 'lucide-react'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'
import { useLang } from '@/lib/lang'

const tiers: PricingTier[] = [
  {
    name: 'Smart',
    nameAr: 'الذكي',
    icon: <Zap className="w-5 h-5" />,
    price: 220,
    description: 'One AI agent, focused tasks',
    descriptionAr: 'وكيل ذكي واحد، مهام محددة',
    features: [
      'Custom AI Agent',
      'Booking & reminders',
      'FAQ on WhatsApp + Website',
      '24/7 availability',
      'Client portal dashboard',
      'Full monthly maintenance',
    ],
    featuresAr: [
      'وكيل ذكاء اصطناعي مخصص',
      'الحجوزات والتذكيرات',
      'الأسئلة الشائعة على واتساب والموقع',
      'متاح ٢٤/٧',
      'لوحة تحكم العميل',
      'صيانة شهرية شاملة',
    ],
  },
  {
    name: 'Pro',
    nameAr: 'المتقدم',
    icon: <Star className="w-5 h-5" />,
    price: 340,
    description: 'Multiple channels, wider automation',
    descriptionAr: 'قنوات متعددة، أتمتة أوسع',
    popular: true,
    features: [
      'Everything in Smart',
      'Post-visit follow-up automation',
      'Google Review requests',
      'No-show re-booking flow',
      'Analytics dashboard',
      'WhatsApp + Website + Instagram',
    ],
    featuresAr: [
      'كل ما في الذكي',
      'متابعة تلقائية بعد الزيارة',
      'طلبات تقييم Google',
      'إعادة حجز الغائبين',
      'لوحة تحليلات',
      'واتساب + موقع + إنستغرام',
    ],
  },
  {
    name: 'Full Auto',
    nameAr: 'المؤتمت',
    icon: <Cpu className="w-5 h-5" />,
    price: 460,
    description: 'Full operation automation',
    descriptionAr: 'أتمتة كاملة للعمليات',
    features: [
      'Everything in Pro',
      'Broadcast & re-activation campaigns',
      'AI receptionist on all channels',
      'Mobile app for your team',
      'Monthly performance reports',
      'Priority support',
    ],
    featuresAr: [
      'كل ما في المتقدم',
      'حملات البث وإعادة التفاعل',
      'مستقبل ذكي على جميع القنوات',
      'تطبيق موبايل لفريقك',
      'تقارير أداء شهرية',
      'دعم أولوية',
    ],
  },
]

export default function PricingCards() {
  const { lang } = useLang()

  return (
    <section className="py-20 bg-ms-ivory-0" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CreativePricing
        tag="Pricing"
        tagAr="الأسعار"
        title="Simple, transparent pricing"
        titleAr="أسعار واضحة وشفافة"
        description="One build fee. Monthly support. Cancel anytime."
        descriptionAr="رسوم بناء واحدة. دعم شهري. إلغاء في أي وقت."
        tiers={tiers}
        lang={lang}
      />
    </section>
  )
}
