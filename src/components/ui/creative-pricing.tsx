import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PricingTier {
  name: string
  nameAr: string
  icon: React.ReactNode
  price: number
  description: string
  descriptionAr: string
  features: string[]
  featuresAr: string[]
  popular?: boolean
}

function CreativePricing({
  tag = 'Simple Pricing',
  tagAr = 'الأسعار',
  title = 'Choose your plan',
  titleAr = 'اختر خطتك',
  description = 'One build. Monthly support. Cancel anytime.',
  descriptionAr = 'بناء واحد. دعم شهري. إلغاء في أي وقت.',
  tiers,
  lang = 'en',
}: {
  tag?: string
  tagAr?: string
  title?: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  tiers: PricingTier[]
  lang?: 'en' | 'ar'
}) {
  const isAr = lang === 'ar'

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center space-y-4 mb-16">
        <p className="font-mono text-xs tracking-widest text-ms-gold-600 uppercase">
          {isAr ? tagAr : tag}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-ms-ink-900 font-grotesk">
          {isAr ? titleAr : title}
        </h2>
        <p className="text-ms-ink-500 text-base max-w-md mx-auto">
          {isAr ? descriptionAr : description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier, index) => (
          <div
            key={tier.name}
            className={cn(
              'relative group transition-all duration-300',
              index === 0 && 'md:rotate-[-1deg]',
              index === 1 && 'md:rotate-[1deg]',
              index === 2 && 'md:rotate-[-1.5deg]',
            )}
          >
            {/* Card shadow layer */}
            <div
              className={cn(
                'absolute inset-0 bg-ms-ivory-0',
                'border-2 border-ms-ink-900',
                'rounded-lg shadow-[4px_4px_0px_0px] shadow-ms-ink-900',
                'transition-all duration-300',
                'group-hover:shadow-[8px_8px_0px_0px]',
                'group-hover:-translate-x-1 group-hover:-translate-y-1',
              )}
            />

            <div className="relative p-6">
              {tier.popular && (
                <div className="absolute -top-2 -right-2 bg-ms-gold-600 text-ms-ivory-0 font-mono text-xs px-3 py-1 rounded-full rotate-12 border-2 border-ms-ink-900 tracking-wide uppercase">
                  {isAr ? 'الأكثر شيوعاً' : 'Popular'}
                </div>
              )}

              <div className="mb-6">
                <div className="w-10 h-10 rounded-full mb-4 flex items-center justify-center border-2 border-ms-ink-900 text-ms-green-800">
                  {tier.icon}
                </div>
                <h3 className="font-grotesk text-xl font-semibold text-ms-ink-900 mb-1">
                  {isAr ? tier.nameAr : tier.name}
                </h3>
                <p className="text-sm text-ms-ink-500">
                  {isAr ? tier.descriptionAr : tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-semibold text-ms-ink-900 font-grotesk">
                  {tier.price}
                </span>
                <span className="text-ms-ink-500 text-sm ml-1">
                  {isAr ? 'د.ك / شهر' : 'KWD/mo'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {(isAr ? tier.featuresAr : tier.features).map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-ms-ink-900 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-ms-green-800" />
                    </div>
                    <span className="text-sm text-ms-ink-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={cn(
                  'w-full h-11 text-sm font-medium relative',
                  'border-2 border-ms-ink-900',
                  'transition-all duration-300',
                  'shadow-[4px_4px_0px_0px] shadow-ms-ink-900',
                  'hover:shadow-[6px_6px_0px_0px]',
                  'hover:-translate-x-0.5 hover:-translate-y-0.5',
                  'rounded-md',
                  tier.popular
                    ? 'bg-ms-green-800 text-ms-ivory-0 hover:bg-ms-green-700'
                    : 'bg-ms-ivory-0 text-ms-ink-900 hover:bg-ms-ivory-100',
                )}
              >
                {isAr ? 'ابدأ الآن' : 'Get Started'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { CreativePricing }
