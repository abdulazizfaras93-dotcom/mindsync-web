import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'

function MeshScene() {
  const pointsRef = useRef<THREE.Points>(null)
  const sparkRef  = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  // 120 particles scattered in a hollow sphere shell (r = 1.8–2.6)
  const positions = useMemo(() => {
    const pos = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      const r     = 1.8 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return pos
  }, [])

  // 30 line segments connecting nearby particle pairs (distance < 1.2)
  const linePositions = useMemo(() => {
    const pairs: number[] = []
    for (let i = 0; i < 120 && pairs.length < 30 * 6; i++) {
      for (let j = i + 1; j < 120 && pairs.length < 30 * 6; j++) {
        const dx = positions[i * 3]     - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 1.2) {
          pairs.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          )
        }
      }
    }
    return new Float32Array(pairs)
  }, [positions])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return geo
  }, [linePositions])

  // Target position for the gold cursor spark
  const sparkTarget = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_state, delta) => {
    if (!pointsRef.current) return

    // Slow continuous rotation
    pointsRef.current.rotation.y += delta * 0.08
    pointsRef.current.rotation.x += delta * 0.04

    // Mouse-reactive tilt (smooth lerp toward pointer)
    pointsRef.current.rotation.y +=
      (pointer.x * 0.3 - pointsRef.current.rotation.y) * 0.05

    // Gold spark lerps to cursor position
    if (sparkRef.current) {
      sparkTarget.current.set(pointer.x * 3, pointer.y * 3, 0)
      sparkRef.current.position.lerp(sparkTarget.current, 0.08)
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />

      {/* Particle cloud */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          color="#BF8D38"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.7}
        />
      </Points>

      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#153E2D" opacity={0.4} transparent />
      </lineSegments>

      {/* Gold cursor spark */}
      <mesh ref={sparkRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#BF8D38" />
      </mesh>
    </>
  )
}

export default function NeuralMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
    >
      <MeshScene />
    </Canvas>
  )
}
