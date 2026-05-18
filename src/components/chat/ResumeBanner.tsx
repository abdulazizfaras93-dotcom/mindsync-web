'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang'

interface Props {
  stage: number
  onResume: () => void
  onRestart: () => void
}

export default function ResumeBanner({ stage, onResume, onRestart }: Props) {
  const { isAr } = useLang()

  const stageLabel = isAr
    ? ['', 'نوع المشروع', 'المشاكل', 'الحل', 'السعر', 'الأسئلة'][stage] ?? `خطوة ${stage}`
    : ['', 'Business Type', 'Challenges', 'Solution', 'Pricing', 'FAQ'][stage] ?? `Step ${stage}`

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md mt-2 px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-sm"
      style={{ background: 'rgba(191,141,56,0.08)', border: '1px solid rgba(191,141,56,0.25)' }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <span className={`text-white/70 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
        {isAr
          ? `أهلاً بعودتك! وقفنا عند ${stageLabel}`
          : `Welcome back — you left at ${stageLabel}`}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={onResume} className="text-ms-gold-400 font-semibold hover:text-ms-gold-500 transition-colors">
          {isAr ? 'أكمل من هناك' : 'Resume'}
        </button>
        <span className="text-white/20">·</span>
        <button onClick={onRestart} className="text-white/40 hover:text-white/60 transition-colors">
          {isAr ? 'ابدأ جديد' : 'Start fresh'}
        </button>
      </div>
    </motion.div>
  )
}