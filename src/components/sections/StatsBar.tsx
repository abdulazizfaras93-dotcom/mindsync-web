'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLang } from '@/lib/lang'

const STATS = [
  { value: 47,  suffix: '+', label: { en: 'Businesses Automated',  ar: 'عمل تجاري مؤتمت' } },
  { value: 380, suffix: '+', label: { en: 'Hours Saved / Week',    ar: 'ساعة موفّرة أسبوعياً' } },
  { value: 3,   suffix: 's', label: { en: 'Avg. Response Time',    ar: 'متوسط وقت الرد' } },
  { value: 98,  suffix: '%', label: { en: 'Client Retention',      ar: 'نسبة الاحتفاظ' } },
]

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    startRef.current = null
    const duration = 1600
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      setCount(Math.round(easeOut(progress) * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <>{count}{suffix}</>
}

export default function StatsBar() {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-ms-ivory-0 border-t-2 border-ms-green-800/10 border-b border-ms-ivory-200 py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label.en} className="flex flex-col items-center gap-1">
              <span className="font-mono text-4xl md:text-5xl font-bold text-ms-green-800 leading-none tracking-tight">
                <CountUp target={s.value} suffix={s.suffix} inView={inView} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ms-ink-500 mt-1.5">
                {s.label[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
