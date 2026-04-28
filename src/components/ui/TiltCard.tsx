'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const rimOpacity = useTransform(springX, [-0.5, 0.5], [0.08, 0.2])

  return (
    <div
      style={{ perspective: 800 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width - 0.5)
        y.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>
        {children}
        {/* Gold rim sheen */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #BF8D38 0%, transparent 60%)',
            opacity: rimOpacity,
          }}
        />
      </motion.div>
    </div>
  )
}
