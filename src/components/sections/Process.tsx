'use client'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

const ProcessFlow = dynamic(() => import('@/components/canvas/ProcessFlow'), { ssr: false })

const t = {
  eyebrow:  { en: 'How It Works',                          ar: 'ÙÙÙ ÙØ´ØªØºÙ Ø§ÙÙØ¸Ø§Ù' },
  headline: { en: 'From first message to live system.',    ar: 'ÙÙ Ø£ÙÙ Ø±Ø³Ø§ÙØ© ÙÙØ¸Ø§Ù Ø´ØºÙØ§Ù.' },
  sub: {
    en: 'A clear process, a real timeline, and a free trial so you can see it work before you pay.',
    ar: 'Ø®Ø·ÙØ§Øª ÙØ§Ø¶Ø­Ø©Ø ÙÙØ§Ø¹ÙØ¯ Ø­ÙÙÙÙØ©Ø ÙØ£Ø³Ø¨ÙØ¹ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ© ØªØ´ÙÙ ÙÙÙ Ø§ÙÙØ¸Ø§Ù ÙØ´ØªØºÙ ÙØ¨Ù ÙØ§ ØªØ¯ÙØ¹.',
  },
  trialBadge: { en: 'Free', ar: 'ÙØ¬Ø§ÙÙØ©' },
}

const STEPS = [
  {
    num: '01',
    en: {
      title: 'Discovery Call',
      sub:   'Understanding your business',
      desc:  'We map your daily tasks, channels, pain points, and goals. You leave the call with a clear picture of exactly what we\'ll build.',
    },
    ar: {
      title: 'ÙÙØ§ÙÙØ© Ø§ÙØ§Ø³ØªÙØ´Ø§Ù',
      sub:   'ÙÙÙÙ Ø·Ø¨ÙØ¹Ø© ÙØ´Ø±ÙØ¹Ù',
      desc:  'ÙØ­Ø¯Ø¯ ÙÙØ§ÙÙ Ø§ÙÙÙÙÙØ©Ø ÙÙÙØ§ØªÙØ ÙØ´Ø§ÙÙÙØ ÙØ£ÙØ¯Ø§ÙÙ. ØªØ®Ø±Ø¬ ÙÙ Ø§ÙÙÙØ§ÙÙØ© Ø¨ØµÙØ±Ø© ÙØ§Ø¶Ø­Ø© ÙÙÙ Ø´Ù Ø³ÙØ¨ÙÙÙ.',
    },
    trial: false,
  },
  {
    num: '02',
    en: {
      title: 'Free 1-Week Trial',
      sub:   'Try before you pay',
      desc:  'We build your actual AI system based on your real business data and run it live for 7 days. If you love it, we activate. If not â no charge, no questions.',
    },
    ar: {
      title: 'Ø£Ø³Ø¨ÙØ¹ ØªØ¬Ø±Ø¨Ø© ÙØ¬Ø§ÙÙØ©',
      sub:   'Ø¬Ø±ÙØ¨ ÙØ¨Ù ÙØ§ ØªØ¯ÙØ¹',
      desc:  'ÙØ¨ÙÙ ÙØ¸Ø§ÙÙ Ø§ÙØ°ÙÙ Ø§ÙÙØ¹ÙÙ Ø¨ÙØ§Ø¡Ù Ø¹ÙÙ Ø¨ÙØ§ÙØ§Øª ÙØ´Ø±ÙØ¹Ù Ø§ÙØ­ÙÙÙÙØ© ÙÙØ´ØºÙÙÙ Ø£Ø³Ø¨ÙØ¹ ÙØ§ÙÙ. Ø¥Ø°Ø§ Ø¹Ø¬Ø¨Ù ÙÙØ¹ÙÙÙ â ÙØ¥Ø°Ø§ ÙØ§Ø ÙØ§ ÙÙ Ø£Ù ØªÙÙÙØ©.',
    },
    trial: true,
  },
  {
    num: '03',
    en: {
      title: 'Sign & Build',
      sub:   'Contract + full build',
      desc:  'After the trial, you sign the agreement and pay the build fee. We finalize all integrations, agents, channels, and your client portal â tailored exactly to your needs.',
    },
    ar: {
      title: 'Ø§ÙØªÙÙÙØ¹ ÙØ§ÙØ¨ÙØ§Ø¡',
      sub:   'Ø¹ÙØ¯ + Ø¨ÙØ§Ø¡ ÙØ§ÙÙ',
      desc:  'Ø¨Ø¹Ø¯ Ø§ÙØªØ¬Ø±Ø¨Ø©Ø ØªÙÙÙØ¹ Ø§ÙØ§ØªÙØ§ÙÙØ© ÙØªØ¯ÙØ¹ Ø±Ø³ÙÙ Ø§ÙØ¨ÙØ§Ø¡. ÙÙÙÙÙ ÙÙ Ø§ÙØªÙØ§ÙÙØ§ØªØ Ø§ÙÙÙÙØ§Ø¡Ø Ø§ÙÙÙÙØ§ØªØ ÙÙÙØ­Ø© Ø§ÙØªØ­ÙÙ â ÙØ®ØµØµØ© Ø¨Ø§ÙÙØ§ÙÙ ÙÙ.',
    },
    trial: false,
  },
  {
    num: '04',
    en: {
      title: 'Review & Fine-Tune',
      sub:   'Live rehearsal',
      desc:  'You send 10 real customer messages. We tune every response until it matches your tone, your answers, and your brand â perfectly.',
    },
    ar: {
      title: 'Ø§ÙÙØ±Ø§Ø¬Ø¹Ø© ÙØ§ÙØ¶Ø¨Ø·',
      sub:   'ØªØ¬Ø±Ø¨Ø© Ø­ÙØ©',
      desc:  'ØªØ±Ø³Ù Ù¡Ù  Ø±Ø³Ø§Ø¦Ù Ø¹ÙÙØ§Ø¡ Ø­ÙÙÙÙØ©. ÙØ¶Ø¨Ø· ÙÙ Ø±Ø¯ Ø­ØªÙ ÙØªØ·Ø§Ø¨Ù ÙØ¹ Ø£Ø³ÙÙØ¨Ù ÙØ¥Ø¬Ø§Ø¨Ø§ØªÙ ÙØ¹ÙØ§ÙØªÙ Ø§ÙØªØ¬Ø§Ø±ÙØ© â Ø¨Ø´ÙÙ ÙØ«Ø§ÙÙ.',
    },
    trial: false,
  },
  {
    num: '05',
    en: {
      title: 'Launch + Monthly Care',
      sub:   'Go live â we stay with you',
      desc:  'Your system goes live on all chosen channels. You get full portal access. We monitor, update, and maintain everything monthly â you focus on your business.',
    },
    ar: {
      title: 'Ø§ÙØ¥Ø·ÙØ§Ù ÙØ§ÙØµÙØ§ÙØ© Ø§ÙØ´ÙØ±ÙØ©',
      sub:   'ØªØ´ØºÙÙ â ÙÙØ¨ÙÙ ÙØ¹Ø§Ù',
      desc:  'ÙØ¸Ø§ÙÙ ÙØ´ØªØºÙ Ø¹ÙÙ ÙÙ Ø§ÙÙÙÙØ§Øª Ø§ÙÙØ®ØªØ§Ø±Ø©. ØªØ­ØµÙ Ø¹ÙÙ ÙÙØ­Ø© Ø§ÙØªØ­ÙÙ ÙØ§ÙÙØ©. ÙØ±Ø§ÙØ¨ ÙÙØ­Ø¯ÙØ« ÙÙØµÙÙ ÙÙ Ø´Ù Ø´ÙØ±ÙØ§Ù â ÙØ£ÙØª ØªØ±ÙÙØ² Ø¹ÙÙ ÙØ´Ø±ÙØ¹Ù.',
    },
    trial: false,
  },
]

export default function Process() {
  const { lang } = useLang()

  return (
    <section id="process" className="py-24 bg-ms-green-900 pattern-overlay">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-14">
          <p className="text-ms-gold-600 text-[11px] tracking-[0.2em] uppercase font-medium mb-3 flex items-center gap-3">
            <span className="w-6 h-px bg-ms-gold-600 shrink-0" />
            {t.eyebrow[lang]}
          </p>
          <h2 className="text-[40px] md:text-[52px] font-bold text-ms-ivory-0 tracking-[-0.02em] leading-[0.95] mb-4">
            {t.headline[lang]}
          </h2>
          <p className="text-white/50 text-[16px] max-w-lg leading-relaxed">
            {t.sub[lang]}
          </p>
        </div>

        {/* Canvas flow animation */}
        <div className="w-full h-20 mb-2 overflow-hidden" aria-hidden>
          <ProcessFlow />
        </div>

        {/* Steps */}
        <div className="divide-y divide-white/10">
          {STEPS.map((step, i) => {
            const s = lang === 'ar' ? step.ar : step.en
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-[72px_220px_1fr] gap-4 md:gap-8 py-8 items-start"
              >
                {/* Step number */}
                <span className="font-mono text-[40px] font-bold leading-none text-ms-gold-600/25 tabular-nums">
                  {step.num}
                </span>

                {/* Title + sub */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-ms-ivory-0 font-bold text-[18px]">{s.title}</h3>
                    {step.trial && (
                      <span className="inline-block text-[9px] font-mono tracking-[0.15em] uppercase bg-ms-gold-600 text-ms-green-900 px-2 py-0.5 rounded-full font-bold">
                        {t.trialBadge[lang]}
                      </span>
                    )}
                  </div>
                  <p className="text-ms-gold-600 text-[11px] font-mono tracking-widest uppercase">
                    {s.sub}
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/50 text-[14px] leading-relaxed md:pt-0.5">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        <p className="text-white/25 text-[13px] mt-8 border-t border-white/10 pt-6">
          {lang === 'ar'
            ? 'ÙØ§ ÙØ¨Ø¯Ø£ Ø¨ÙØ§Ø¡ Ø§ÙÙØ¸Ø§Ù Ø¥ÙØ§ Ø¨Ø¹Ø¯ Ø§ÙØ§ØªÙØ§Ù Ø¹ÙÙ Ø§ÙÙÙØ§Ù ÙØ§ÙÙÙÙØ§Øª ÙÙ ÙÙØ§ÙÙØ© Ø§ÙØ§Ø³ØªÙØ´Ø§Ù.'
            : "We don't start building until tasks and channels are agreed in the discovery call."}
        </p>

      </div>
    </section>
  )
}
