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
      className="mx-auto w-full max-w-md mt-2 px-4 py-3 bg-ms-gold-600/10 border border-ms-gold-600/30 rounded-xl flex items-center justify-between gap-3 text-sm"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <span className={`text-ms-ink-700 ${isAr ? 'font-arabic' : 'font-grotesk'}`}>
        {isAr
          ? `أهلاً بعودتك! وقفنا عند ${stageLabel}`
          : `Welcome back — you left at ${stageLabel}`}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button onClick={onResume} className="text-ms-green-800 font-semibold hover:underline">
          {isAr ? 'أكمل من هناك' : 'Resume'}
        </button>
        <span className="text-ms-ink-400">·</span>
        <button onClick={onRestart} className="text-ms-ink-500 hover:text-ms-ink-700">
          {isAr ? 'ابدأ جديد' : 'Start fresh'}
        </button>
      </div>
    </motion.div>
  )
}