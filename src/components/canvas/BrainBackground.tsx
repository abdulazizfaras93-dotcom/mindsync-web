'use client'
import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT  = 36
const PULSE_COUNT = 10

function buildBrainGeo() {
  const geo = new THREE.IcosahedronGeometry(2.1, 5)
  const pos = geo.attributes.position as THREE.BufferAttribute

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i)

    const groove = Math.exp(-Math.pow(x / 0.35, 2)) * 0.24
    y -= groove * Math.max(0, y / 2.1)

    if (y > 0.9) y = 0.9 + (y - 0.9) * 0.72
    if (z > 0.6 && y > 0) { z *= 1.09; y *= 1.04 }
    if (z < -0.6 && y > -0.3) z *= 1.07
    if (Math.abs(x) > 1.1 && y < 0.25) { x *= 1.09; y *= 0.9 }
    if (y < -1.0 && z < 0) { x *= 0.65; z *= 0.68; y *= 0.85 }

    const n1 = Math.sin(x * 5.0 + 0.8) * Math.cos(y * 4.6 - 1.2) * Math.sin(z * 5.3) * 0.06
    const n2 = Math.sin(x * 8.8) * Math.cos(z * 8.4 + 2.0) * Math.sin(y * 7.0) * 0.028
    const fac = 1 + n1 + n2
    x *= fac; y *= fac; z *= fac

    pos.setXYZ(i, x, y, z)
  }
  geo.computeVertexNormals()

  const vCol = new Float32Array(pos.count * 3)
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    let r: number, g: number, b: number

    if (x <= 0) {
      const band = (i * 7) % 19
      if (band < 4) {
        r = 0.75; g = 0.55; b = 0.22
      } else if (band < 10) {
        r = 0.08; g = 0.24; b = 0.17
      } else {
        r = 0.11; g = 0.31; b = 0.22
      }
      const bri = 0.7 + Math.random() * 0.38
      r *= bri; g *= bri; b *= bri
    } else {
      const shade = 0.05 + Math.random() * 0.08
      r = shade * 0.55; g = shade * 1.45; b = shade * 0.88
    }
    vCol[i * 3] = r; vCol[i * 3 + 1] = g; vCol[i * 3 + 2] = b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(vCol, 3))

  return geo
}

function buildNodes(): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const phi   = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI
    const r = 2.14 + Math.random() * 0.3
    nodes.push(new THREE.Vector3(
      Math.abs(r * Math.sin(phi) * Math.cos(theta)) + 0.05,
      r * Math.sin(phi) * Math.sin(theta) * 0.72 - 0.18,
      r * Math.cos(phi) * 0.52,
    ))
  }
  return nodes
}

function buildEdges(nodes: THREE.Vector3[]): { positions: Float32Array; edges: [number, number][] } {
  const edgePos: number[] = []
  const edges: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 1.05 && Math.random() > 0.5) {
        edgePos.push(nodes[i].x, nodes[i].y, nodes[i].z)
        edgePos.push(nodes[j].x, nodes[j].y, nodes[j].z)
        edges.push([i, j])
      }
    }
  }
  return { positions: new Float32Array(edgePos), edges }
}

const BRAIN_GEO  = buildBrainGeo()
const NODES      = buildNodes()
const { positions: EDGE_POSITIONS, edges: EDGES } = buildEdges(NODES)

function BrainScene({ mouseRef }: { mouseRef: React.MutableRefObject<[number, number]> }) {
  const groupRef   = useRef<THREE.Group>(null)
  const { size }   = useThree()
  const rotSmooth  = useRef<[number, number]>([0, 0])

  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, () => ({
      t:     Math.random(),
      speed: 0.12 + Math.random() * 0.14,
      edge:  Math.floor(Math.random() * Math.max(1, EDGES.length)),
    }))
  )
  const pulsePos = useRef(new Float32Array(PULSE_COUNT * 3))
  const pulseRef = useRef<THREE.Points>(null)
  const nodeRef  = useRef<THREE.InstancedMesh>(null)

  const nodePhase = useMemo(
    () => Array.from({ length: NODE_COUNT }, () => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 1.4,
      isGold: Math.random() < 0.25,
    })),
    []
  )

  useEffect(() => {
    if (!nodeRef.current) return
    const dummy = new THREE.Object3D()
    NODES.forEach((n, i) => {
      dummy.position.copy(n)
      dummy.updateMatrix()
      nodeRef.current!.setMatrixAt(i, dummy.matrix)
    })
    nodeRef.current.instanceMatrix.needsUpdate = true
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += delta * 0.055

    const [mx, my] = mouseRef.current
    const nx = (mx / size.width) * 2 - 1
    const ny = -(my / size.height) * 2 + 1
    rotSmooth.current[0] += (ny * 0.12 - rotSmooth.current[0]) * delta * 3.5
    rotSmooth.current[1] += (nx * 0.14 - rotSmooth.current[1]) * delta * 3.5
    groupRef.current.rotation.x = rotSmooth.current[0]

    const pp = pulsePos.current
    for (let i = 0; i < PULSE_COUNT; i++) {
      const ps = pulseState.current[i]
      ps.t += delta * ps.speed
      if (ps.t > 1) {
        ps.t -= 1
        ps.edge = Math.floor(Math.random() * Math.max(1, EDGES.length))
      }
      if (EDGES.length > 0) {
        const [ai, bi] = EDGES[Math.min(ps.edge, EDGES.length - 1)]
        const a = NODES[ai], b = NODES[bi]
        pp[i * 3]     = a.x + (b.x - a.x) * ps.t
        pp[i * 3 + 1] = a.y + (b.y - a.y) * ps.t
        pp[i * 3 + 2] = a.z + (b.z - a.z) * ps.t
      }
    }
    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute
      attr.array.set(pp)
      attr.needsUpdate = true
    }

    if (nodeRef.current) {
      const dummy = new THREE.Object3D()
      const now   = performance.now() * 0.001
      nodePhase.forEach((np, i) => {
        const scale = 1 + Math.sin(now * np.speed + np.phase) * 0.4
        dummy.position.copy(NODES[i])
        dummy.scale.setScalar(Math.max(0.3, scale))
        dummy.updateMatrix()
        nodeRef.current!.setMatrixAt(i, dummy.matrix)
      })
      nodeRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={[0.6, -0.1, 0]}>
      <mesh geometry={BRAIN_GEO}>
        <meshPhongMaterial
          vertexColors
          shininess={60}
          specular={new THREE.Color(0xBF8D38)}
          transparent
          opacity={0.52}
        />
      </mesh>

      <mesh geometry={BRAIN_GEO} scale={[1.003, 1.003, 1.003]}>
        <meshBasicMaterial
          color={0x1C5038}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {EDGE_POSITIONS.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={EDGE_POSITIONS}
              count={EDGE_POSITIONS.length / 3}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={0x2A7A55} transparent opacity={0.45} />
        </lineSegments>
      )}

      <instancedMesh ref={nodeRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[0.028, 7, 7]} />
        <meshBasicMaterial color={0x2A7A55} transparent opacity={0.7} />
      </instancedMesh>

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={pulsePos.current}
            count={PULSE_COUNT}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0xBF8D38}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  )
}

function Scene() {
  const mouseRef = useRef<[number, number]>([
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  ])

  useEffect(() => {
    const h = (e: MouseEvent) => { mouseRef.current = [e.clientX, e.clientY] }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <>
      <ambientLight intensity={0.1} color={0xFBFAF5} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} color={0xE8D5A3} />
      <pointLight position={[-4, 2, 2]} intensity={3.5} distance={14} color={0x153E2D} />
      <pointLight position={[3, -2, 3]} intensity={2.5} distance={12} color={0xBF8D38} />
      <pointLight position={[0, -5, -3]} intensity={5} distance={18} color={0x1C5038} />
      <BrainScene mouseRef={mouseRef} />
    </>
  )
}

export default function BrainBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      frameloop="always"
    >
      <Scene />
    </Canvas>
  )
}
