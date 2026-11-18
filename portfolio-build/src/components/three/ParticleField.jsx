import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Particle field — 2500 glowing points drifting gently in a sphere.
 * Uses a custom point material for round, glowing particles.
 */
export function ParticleField({ count = 2500, radius = 12 }) {
  const pointsRef = useRef()

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = radius * Math.cbrt(Math.random()) // cube root for uniform volume

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 2.5 + 0.5
    }

    return { positions, sizes }
  }, [count, radius])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.04,
    sizeAttenuation: true,
    color: new THREE.Color('#22D3EE'),
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.elapsedTime * 0.015
    pointsRef.current.rotation.x = clock.elapsedTime * 0.006
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

/**
 * FloatingFragments — small UI rectangle fragments orbiting loosely
 * These look like glitchy code/UI pieces flying in the ether.
 */
export function FloatingFragments({ count = 18 }) {
  const fragmentData = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 4 + 1,
        (Math.random() - 0.5) * 6 - 1,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale:    [0.08 + Math.random() * 0.25, 0.04 + Math.random() * 0.14, 1],
      speed:    (Math.random() - 0.5) * 0.4,
      phase:    Math.random() * Math.PI * 2,
      isViolet: Math.random() > 0.5,
    })),
  [count])

  const groupRef = useRef()
  const meshRefs = useRef([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const d = fragmentData[i]
      mesh.position.y = d.position[1] + Math.sin(t * 0.4 + d.phase) * 0.3
      mesh.rotation.z = d.rotation[2] + t * d.speed * 0.2
      mesh.material.opacity = 0.2 + Math.sin(t * 0.8 + d.phase) * 0.15
    })
  })

  return (
    <group ref={groupRef}>
      {fragmentData.map((d, i) => (
        <mesh
          key={i}
          ref={el => meshRefs.current[i] = el}
          position={d.position}
          rotation={d.rotation}
          scale={d.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={d.isViolet ? '#7C3AED' : '#22D3EE'}
            emissive={d.isViolet ? '#7C3AED' : '#22D3EE'}
            emissiveIntensity={0.8}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default ParticleField
