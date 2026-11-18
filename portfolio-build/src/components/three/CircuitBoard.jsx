import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ── Board substrate ─────────────────────────────────────── */
function BoardSubstrate() {
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[7, 4.5, 0.12]} />
      <meshStandardMaterial
        color="#0D1219"
        roughness={0.8}
        metalness={0.3}
      />
    </mesh>
  )
}

/* ── Trace path ──────────────────────────────────────────── */
function TraceLine({ points, lit }) {
  const geometry = useMemo(() => {
    const curve   = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)))
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.012, 4, false)
    return tubeGeo
  }, [points])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={lit ? '#E2864B' : '#1A2230'}
        emissive={lit ? '#E2864B' : '#0D1219'}
        emissiveIntensity={lit ? 2.2 : 0.05}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  )
}

/* ── Small board component (resistor / cap / crystal) ───── */
function BoardComp({ position, size = [0.12, 0.06, 0.08], color = '#1E2A3A' }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.5} />
    </mesh>
  )
}

/* ── CPU — the central brightest element ─────────────────── */
function CPU() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity =
        1.4 + Math.sin(clock.elapsedTime * 1.2) * 0.3
    }
  })

  return (
    <group position={[0, 0, 0.1]}>
      {/* CPU body */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[0.55, 0.55, 0.1]} />
        <meshStandardMaterial
          color="#E2864B"
          emissive="#E2864B"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Pin legs */}
      {[-1, -0.5, 0, 0.5, 1].map((offset) => (
        <mesh key={`pin-top-${offset}`} position={[offset * 0.22, 0.35, 0]}>
          <boxGeometry args={[0.025, 0.12, 0.04]} />
          <meshStandardMaterial color="#8B7CF6" emissive="#8B7CF6" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {[-1, -0.5, 0, 0.5, 1].map((offset) => (
        <mesh key={`pin-right-${offset}`} position={[0.35, offset * 0.22, 0]}>
          <boxGeometry args={[0.12, 0.025, 0.04]} />
          <meshStandardMaterial color="#8B7CF6" emissive="#8B7CF6" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Scene root ──────────────────────────────────────────── */
function Scene({ tracesLit }) {
  const groupRef = useRef()
  const prefersReduced = useReducedMotion()

  const traceDefinitions = useMemo(() => [
    { points: [[0,0,0.07],[0.6,0,0.07],[1.2,0.4,0.07],[1.8,0.4,0.07],[2.6,0.8,0.07]] },
    { points: [[0,0,0.07],[0,0.6,0.07],[0.4,1.0,0.07],[0.8,1.4,0.07],[1.4,1.8,0.07]] },
    { points: [[0,0,0.07],[-0.8,0.2,0.07],[-1.6,0.2,0.07],[-2.4,0.6,0.07],[-3.0,0.6,0.07]] },
    { points: [[0,0,0.07],[0,-0.6,0.07],[0.6,-1.2,0.07],[1.4,-1.5,0.07],[2.4,-1.8,0.07]] },
    { points: [[0,0,0.07],[-0.6,-0.4,0.07],[-1.4,-0.8,0.07],[-2.0,-1.4,0.07],[-2.8,-1.8,0.07]] },
    { points: [[0,0,0.07],[1.0,-0.2,0.07],[2.0,-0.4,0.07],[2.8,-0.2,0.07],[3.2,0.2,0.07]] },
  ], [])

  const components = useMemo(() => [
    { pos: [1.8, 0.4, 0.1],  size: [0.22, 0.1, 0.08] },
    { pos: [-2.4, 0.6, 0.1], size: [0.14, 0.22, 0.09] },
    { pos: [1.4, -1.5, 0.1], size: [0.18, 0.1, 0.09] },
    { pos: [-1.8, -1.2, 0.1],size: [0.1, 0.18, 0.09] },
    { pos: [2.6, 0.8, 0.1],  size: [0.08, 0.08, 0.14] },
    { pos: [-2.8, -1.8, 0.1],size: [0.12, 0.12, 0.1] },
    { pos: [2.8, -0.2, 0.1], size: [0.1, 0.26, 0.08] },
    { pos: [0.8, 1.4, 0.1],  size: [0.08, 0.08, 0.12] },
  ], [])

  // Slow idle sine drift
  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || prefersReduced) return
    const t = clock.elapsedTime
    groupRef.current.rotation.x = -0.22 + Math.sin(t * 0.3) * 0.04 + pointer.y * -0.06
    groupRef.current.rotation.y =  0.18 + Math.sin(t * 0.2) * 0.06 + pointer.x *  0.08
  })

  return (
    <group ref={groupRef} rotation={[-0.22, 0.18, 0]} scale={[1.1, 1.1, 1.1]}>
      <BoardSubstrate />

      {traceDefinitions.map((t, i) => (
        <TraceLine key={i} points={t.points} lit={tracesLit} />
      ))}

      <CPU />

      {components.map((c, i) => (
        <BoardComp key={i} position={c.pos} size={c.size} />
      ))}

      {/* Lighting */}
      <pointLight position={[3, 3, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-2, -2, 3]} intensity={0.4} color="#8B7CF6" />
      <ambientLight intensity={0.15} />
    </group>
  )
}

/* ── Exported canvas ─────────────────────────────────────── */
export function CircuitBoard({ tracesLit = false }) {
  return (
    <Canvas
      id="circuit-board-canvas"
      gl={{ antialias: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene tracesLit={tracesLit} />
      <EffectComposer>
        <Bloom
          intensity={1.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  )
}

export default CircuitBoard
