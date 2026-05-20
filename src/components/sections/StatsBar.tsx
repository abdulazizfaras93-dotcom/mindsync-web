'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useLang } from '@/lib/lang'

const STATS = [
  { value: 7,    suffix: '',   isStatic: false, label: { en: 'Days to Launch',    ar: 'أيام للإطلاق' } },
  { value: null, suffix: '',   isStatic: true,  staticVal: '1', label: { en: 'Complete System',   ar: 'منظومة شاملة' } },
  { value: null, suffix: '/7', isStatic: true,  staticVal: '24', label: { en: 'Uptime',         ar: 'وقت التشغيل' } },
  { value: 100,  suffix: '%',  isStatic: false, label: { en: 'Data Ownership',   ar: 'البيانات تبقى لك' } },
]

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const startFrom = Math.max(0, target - Math.max(1, Math.round(target * 0.15)))
  const [count, setCount] = useState(startFrom)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    startRef.current = null
    const duration = 1200
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const progress = Math.min((ts - startRef.current) / duration, 1)
      setCount(Math.round(startFrom + easeOut(progress) * (target - startFrom)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, startFrom])

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
                {s.isStatic
                  ? <>{s.staticVal}{s.suffix}</>
                  : <CountUp target={s.value!} suffix={s.suffix} inView={inView} />
                }
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
