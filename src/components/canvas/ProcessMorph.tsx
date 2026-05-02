// src/components/canvas/ProcessMorph.tsx
'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GEO_FACTORIES = [
  () => new THREE.TorusKnotGeometry(1, 0.32, 160, 32, 2, 3),
  () => new THREE.OctahedronGeometry(1.3, 0),
  () => new THREE.IcosahedronGeometry(1.2, 1),
  () => new THREE.TorusGeometry(1.2, 0.34, 24, 80),
  () => new THREE.SphereGeometry(1.25, 48, 48),
]

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function MorphScene({ activeStep }: { activeStep: number }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const haloRef  = useRef<THREE.Mesh>(null)
  const dustRef  = useRef<THREE.Points>(null)

  const geos = useMemo(() => GEO_FACTORIES.map(f => f()), [])

  const morphPhase    = useRef<'idle' | 'out' | 'in'>('idle')
  const morphProgress = useRef(0)
  const targetStep    = useRef(activeStep)
  const prevStep      = useRef(activeStep)

  const dustPos = useMemo(() => {
    const pos = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      const r     = 2.5 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return pos
  }, [])

  useEffect(() => {
    if (!meshRef.current || !haloRef.current) return
    meshRef.current.geometry = geos[0]
    haloRef.current.geometry = geos[0]
  }, [geos])

  useEffect(() => {
    if (activeStep === prevStep.current) return
    prevStep.current      = activeStep
    targetStep.current    = activeStep
    morphPhase.current    = 'out'
    morphProgress.current = 0
  }, [activeStep])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    const halo = haloRef.current
    if (!mesh || !halo) return

    if (morphPhase.current === 'out') {
      morphProgress.current = Math.min(1, morphProgress.current + delta / 0.32)
      const s = easeOut(1 - morphProgress.current)
      mesh.scale.setScalar(s)
      halo.scale.setScalar(s * 1.08)

      if (morphProgress.current >= 1) {
        mesh.geometry = geos[targetStep.current]
        halo.geometry = geos[targetStep.current]
        morphPhase.current    = 'in'
        morphProgress.current = 0
      }
    } else if (morphPhase.current === 'in') {
      morphProgress.current = Math.min(1, morphProgress.current + delta / 0.38)
      const s = easeOut(morphProgress.current)
      mesh.scale.setScalar(s)
      halo.scale.setScalar(s * 1.08)
      if (morphProgress.current >= 1) morphPhase.current = 'idle'
    }

    mesh.rotation.x += delta * 0.4
    mesh.rotation.y += delta * 0.6
    halo.rotation.x -= delta * 0.3
    halo.rotation.y += delta * 0.4
    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.05
      dustRef.current.rotation.x += delta * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight intensity={1.3} position={[3, 5, 4]} />
      <pointLight color="#BF8D38" intensity={1.6} distance={20} position={[-4, 2, 2]} />

      <mesh ref={meshRef}>
        <meshPhysicalMaterial
          color="#1C5038"
          metalness={0.4}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
        />
      </mesh>

      <mesh ref={haloRef}>
        <meshBasicMaterial color="#D4A048" wireframe transparent opacity={0.3} />
      </mesh>

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={dustPos}
            count={200}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#E3B867"
          size={0.025}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export default function ProcessMorph({ activeStep }: { activeStep: number }) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <MorphScene activeStep={activeStep} />
    </Canvas>
  )
}
