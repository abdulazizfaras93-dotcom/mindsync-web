'use client'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const RADIUS = 1.6
const POINT_COUNT = 140
const PULSE_COUNT = 30

function buildGlobe() {
  // Fibonacci spiral distribution for even point coverage
  const pts: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < POINT_COUNT; i++) {
    const y = 1 - (i / (POINT_COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    pts.push(new THREE.Vector3(r * Math.cos(theta) * RADIUS, y * RADIUS, r * Math.sin(theta) * RADIUS))
  }

  // Connect each point to its 3 nearest neighbours
  const positions: number[] = []
  for (let i = 0; i < pts.length; i++) {
    const dists = pts.map((p, j) => ({ j, d: pts[i].distanceTo(p) }))
      .filter(x => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
    for (const { j } of dists) {
      if (j > i) {
        positions.push(pts[i].x, pts[i].y, pts[i].z)
        positions.push(pts[j].x, pts[j].y, pts[j].z)
      }
    }
  }

  // Build edge list for pulse particles
  const edges: [THREE.Vector3, THREE.Vector3][] = []
  for (let k = 0; k < positions.length; k += 6) {
    edges.push([
      new THREE.Vector3(positions[k], positions[k + 1], positions[k + 2]),
      new THREE.Vector3(positions[k + 3], positions[k + 4], positions[k + 5]),
    ])
  }

  return { positions, edges }
}

const { positions: EDGE_POS, edges: EDGES } = buildGlobe()

function Globe({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  const globeRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const { size } = useThree()

  // Pulse state
  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, () => ({
      t: Math.random(),
      speed: 0.18 + Math.random() * 0.22,
      edge: Math.floor(Math.random() * EDGES.length),
    }))
  )

  const pulsePositions = useRef(new Float32Array(PULSE_COUNT * 3))

  // Spring damping for mouse influence
  const currentRot = useRef<[number, number]>([0, 0])
  const targetRot = useRef<[number, number]>([0, 0])

  useFrame((_, delta) => {
    if (!globeRef.current) return

    // Auto rotate
    globeRef.current.rotation.y += delta * 0.08

    // Mouse spring
    const [mx, my] = mouseRef.current
    const nx = (mx / size.width) * 2 - 1
    const ny = -(my / size.height) * 2 + 1
    targetRot.current = [ny * 0.25, nx * 0.3]
    currentRot.current[0] += (targetRot.current[0] - currentRot.current[0]) * delta * 5
    currentRot.current[1] += (targetRot.current[1] - currentRot.current[1]) * delta * 5
    globeRef.current.rotation.x = currentRot.current[0]

    // Pulse particles
    const pos = pulsePositions.current
    for (let i = 0; i < PULSE_COUNT; i++) {
      const ps = pulseState.current[i]
      ps.t += delta * ps.speed
      if (ps.t > 1) {
        ps.t -= 1
        ps.edge = Math.floor(Math.random() * EDGES.length)
      }
      const [a, b] = EDGES[ps.edge]
      pos[i * 3] = a.x + (b.x - a.x) * ps.t
      pos[i * 3 + 1] = a.y + (b.y - a.y) * ps.t
      pos[i * 3 + 2] = a.z + (b.z - a.z) * ps.t
    }
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      attr.array.set(pos)
      attr.needsUpdate = true
    }
  })

  return (
    <group ref={globeRef}>
      {/* Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(EDGE_POS)}
            count={EDGE_POS.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1C5038" transparent opacity={0.55} />
      </lineSegments>

      {/* Pulse particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={pulsePositions.current}
            count={PULSE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#BF8D38" size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  )
}

function Scene() {
  const mouseRef = useRef<[number, number]>([0, 0])

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseRef.current = [e.clientX, e.clientY] }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return <Globe mouseRef={mouseRef} />
}

export default function NeuralGlobe() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    setOk(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])
  if (!ok) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
