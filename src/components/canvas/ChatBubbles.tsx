'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const TEXTS = [
  'أهلاً 👋', 'مرحباً بك', 'Hi! How can I help?', 'Book appointment ✅',
  'هل تريد حجز موعد؟', '٢٤/٧ متاح', 'Reminder sent ✓', 'رأيك يهمنا ⭐', 'تم الحجز ✅',
]
const COUNT = 18

function makeTexture(text: string, dark: boolean) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const bg = dark ? '#1C5038' : 'rgba(191,141,56,0.25)'
  ctx.fillStyle = bg
  const r = 12
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.lineTo(canvas.width - r, 0)
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r)
  ctx.lineTo(canvas.width, canvas.height - r)
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height)
  ctx.lineTo(r, canvas.height)
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r)
  ctx.lineTo(0, r)
  ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = dark ? '#FBFAF5' : '#153E2D'
  ctx.font = '600 22px "Segoe UI", Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

function initBubbles() {
  return Array.from({ length: COUNT }, (_, i) => ({
    x: (Math.random() - 0.5) * 4,
    y: -4 + Math.random() * 7,
    speedY: 0.15 + Math.random() * 0.2,
    phase: Math.random() * Math.PI * 2,
    textIdx: i % TEXTS.length,
    dark: i % 2 === 0,
    width: 0.7 + Math.random() * 0.4,
  }))
}

function Bubbles() {
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null)
  const bubbles = useRef(initBubbles())
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const elapsed = useRef(0)

  useEffect(() => {
    const txs = TEXTS.map((t, i) => makeTexture(t, i % 2 === 0))
    setTextures(txs)
    return () => txs.forEach(t => t.dispose())
  }, [])

  useFrame((_, delta) => {
    elapsed.current += delta
    bubbles.current.forEach((b, i) => {
      b.y += b.speedY * delta
      if (b.y > 4) {
        b.y = -4
        b.x = (Math.random() - 0.5) * 4
        b.textIdx = Math.floor(Math.random() * TEXTS.length)
        b.dark = Math.random() > 0.5
      }
      const mesh = meshRefs.current[i]
      if (!mesh) return
      mesh.position.set(b.x + Math.sin(elapsed.current * 0.5 + b.phase) * 0.12, b.y, 0)

      // Fade in at bottom, fade out at top
      const normalY = (b.y + 4) / 8
      let opacity = 1
      if (normalY < 0.15) opacity = normalY / 0.15
      else if (normalY > 0.8) opacity = 1 - (normalY - 0.8) / 0.2
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.9
    })
  })

  if (!textures) return null

  return (
    <>
      {bubbles.current.map((b, i) => (
        <RoundedBox
          key={i}
          ref={(el: THREE.Mesh | null) => { meshRefs.current[i] = el }}
          args={[b.width, 0.2, 0.01]}
          radius={0.06}
          smoothness={4}
          position={[b.x, b.y, 0]}
        >
          <meshBasicMaterial
            map={textures[b.textIdx % textures.length]}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
      ))}
    </>
  )
}

export default function ChatBubbles() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Bubbles />
    </Canvas>
  )
}
