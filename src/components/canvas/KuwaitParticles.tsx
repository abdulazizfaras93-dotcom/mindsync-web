'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Kuwait outline — ~80 points approximating country shape, normalised to ±1.2 range
const KUWAIT_OUTLINE: [number, number][] = [
  // Northern border (Iraq)
  [-1.1, 0.9], [-0.9, 0.95], [-0.6, 1.0], [-0.3, 1.05], [0.0, 1.1], [0.2, 1.1],
  [0.4, 1.05], [0.55, 1.0],
  // Northeastern corner / Saudi border east
  [0.65, 0.9], [0.7, 0.75], [0.72, 0.55], [0.7, 0.35],
  // Kuwait Bay (Gulf coast, east)
  [0.75, 0.15], [0.9, 0.0], [1.05, -0.2], [1.1, -0.45],
  [1.05, -0.65], [0.9, -0.75], [0.7, -0.85],
  // Southern coast
  [0.45, -0.9], [0.2, -0.92], [-0.1, -0.9],
  // Saudi border (south-southwest)
  [-0.4, -0.85], [-0.65, -0.75], [-0.85, -0.6], [-1.0, -0.4],
  [-1.1, -0.2], [-1.15, 0.05], [-1.15, 0.3],
  [-1.1, 0.55], [-1.1, 0.75], [-1.1, 0.9],
  // Bubiyan island (northeast Gulf)
  [0.55, 0.35], [0.62, 0.5], [0.7, 0.6], [0.75, 0.5], [0.68, 0.38],
  // Failaka island (Gulf, further east)
  [0.95, 0.1], [1.0, 0.15], [0.98, 0.2], [0.93, 0.15],
  // Interior fill points
  [-0.5, 0.7], [-0.2, 0.8], [0.1, 0.75], [0.3, 0.65],
  [-0.6, 0.3], [-0.3, 0.4], [0.0, 0.45], [0.3, 0.35],
  [-0.7, -0.1], [-0.4, 0.0], [-0.1, 0.1], [0.2, 0.0],
  [-0.5, -0.35], [-0.2, -0.3], [0.1, -0.25], [0.35, -0.2],
  [-0.3, -0.6], [0.0, -0.55], [0.25, -0.5],
  [0.5, 0.7], [0.4, 0.5], [0.25, 0.2], [0.5, 0.2],
  [-0.8, 0.55], [-0.9, 0.2], [-0.75, -0.2],
  // Extra ambient fill
  [-0.1, 0.5], [0.15, 0.3], [-0.45, 0.15], [0.4, -0.05],
  [0.6, 0.05], [0.55, -0.35], [0.3, -0.7], [-0.15, -0.75],
]

const TOTAL = 200

function buildPositions(spread: number) {
  const arr = new Float32Array(TOTAL * 3)
  for (let i = 0; i < TOTAL; i++) {
    arr[i * 3] = (Math.random() - 0.5) * spread
    arr[i * 3 + 1] = (Math.random() - 0.5) * spread
    arr[i * 3 + 2] = 0
  }
  return arr
}

function buildTargets() {
  const arr = new Float32Array(TOTAL * 3)
  for (let i = 0; i < TOTAL; i++) {
    if (i < KUWAIT_OUTLINE.length) {
      arr[i * 3] = KUWAIT_OUTLINE[i][0]
      arr[i * 3 + 1] = KUWAIT_OUTLINE[i][1]
    } else {
      arr[i * 3] = (Math.random() - 0.5) * 2.4
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.0
    }
    arr[i * 3 + 2] = 0
  }
  return arr
}

function Particles({ containerRef }: { containerRef: { current: HTMLDivElement | null } }) {
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const current = useRef(buildPositions(6))
  const targets = useRef(buildTargets())
  const forming = useRef(false)
  const progress = useRef(0)
  const elapsed = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) forming.current = true },
      { threshold: 0.3 }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef])

  useFrame((_, delta) => {
    elapsed.current += delta
    if (!geoRef.current) return
    const pos = current.current
    const tgt = targets.current

    if (forming.current && progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / 1.5)
      const t = progress.current
      for (let i = 0; i < TOTAL; i++) {
        pos[i * 3] += (tgt[i * 3] - pos[i * 3]) * t * 0.08
        pos[i * 3 + 1] += (tgt[i * 3 + 1] - pos[i * 3 + 1]) * t * 0.08
      }
    } else if (forming.current) {
      // Gentle breathing drift
      for (let i = 0; i < TOTAL; i++) {
        pos[i * 3] += Math.sin(elapsed.current * 0.4 + i) * 0.0008
        pos[i * 3 + 1] += Math.cos(elapsed.current * 0.35 + i * 0.7) * 0.0006
      }
    }

    const attr = geoRef.current.attributes.position as THREE.BufferAttribute
    attr.array.set(pos)
    attr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          array={current.current}
          count={TOTAL}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#BF8D38" size={0.04} sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}

export default function KuwaitParticles({ containerRef }: { containerRef: { current: HTMLDivElement | null } }) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Particles containerRef={containerRef} />
    </Canvas>
  )
}
