'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STEP_X = [-2.4, -0.8, 0.8, 2.4]

const CURVE = new THREE.CatmullRomCurve3(
  STEP_X.map(x => new THREE.Vector3(x, 0, 0))
)

function Flow() {
  const tRef = useRef(0)
  const travelerRef = useRef<THREE.Mesh>(null)
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null])
  const elapsedRef = useRef(0)
  const flashTimers = useRef([0, 0, 0, 0])

  useFrame((_, delta) => {
    elapsedRef.current += delta
    const elapsed = elapsedRef.current

    tRef.current = (tRef.current + delta * 0.22) % 1
    const travelerPos = CURVE.getPointAt(tRef.current)

    if (travelerRef.current) {
      travelerRef.current.position.copy(travelerPos)
    }

    nodeRefs.current.forEach((node, i) => {
      if (!node) return
      const mat = node.material as THREE.MeshStandardMaterial
      const nodeX = STEP_X[i]
      const dist = Math.abs(travelerPos.x - nodeX)
      if (dist < 0.3) {
        flashTimers.current[i] = 0.4
      }
      if (flashTimers.current[i] > 0) {
        flashTimers.current[i] -= delta
        mat.emissiveIntensity = 2.5
      } else {
        mat.emissiveIntensity = 0.4 + 0.3 * Math.sin(elapsed * 2.5 + i)
      }
    })
  })

  return (
    <>
      {/* Tube */}
      <mesh>
        <tubeGeometry args={[CURVE, 80, 0.008, 8, false]} />
        <meshBasicMaterial color="#BF8D38" transparent opacity={0.4} />
      </mesh>

      {/* Node spheres */}
      {STEP_X.map((x, i) => (
        <mesh
          key={i}
          position={[x, 0, 0]}
          ref={(el) => { nodeRefs.current[i] = el }}
        >
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshStandardMaterial color="#BF8D38" emissive="#BF8D38" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Traveler sphere */}
      <mesh ref={travelerRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#BF8D38" emissive="#BF8D38" emissiveIntensity={1.5} />
      </mesh>

      <ambientLight intensity={0.6} />
    </>
  )
}

export default function ProcessFlow() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 5], zoom: 80 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Flow />
    </Canvas>
  )
}
