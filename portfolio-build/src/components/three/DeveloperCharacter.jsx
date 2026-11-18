import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The Developer Character — stylized low-poly humanoid
 * seated at a holographic workstation.
 * All geometry is procedurally built from Three.js primitives.
 */

// Shared materials
const skinMat   = new THREE.MeshStandardMaterial({ color: '#3D3D7A', roughness: 0.7, metalness: 0.1 })
const hairMat   = new THREE.MeshStandardMaterial({ color: '#0D0D2B', roughness: 0.9 })
const shirtMat  = new THREE.MeshStandardMaterial({ color: '#7C3AED', roughness: 0.6, metalness: 0.2, emissive: '#3D1A7A', emissiveIntensity: 0.3 })
const pantsMat  = new THREE.MeshStandardMaterial({ color: '#1C1645', roughness: 0.8 })
const deskMat   = new THREE.MeshStandardMaterial({ color: '#1A1852', roughness: 0.3, metalness: 0.6 })
const chairMat  = new THREE.MeshStandardMaterial({ color: '#120D3A', roughness: 0.7, metalness: 0.3 })
const monitorMat= new THREE.MeshStandardMaterial({ color: '#1E1B4B', roughness: 0.3, metalness: 0.8 })
const eyeMat    = new THREE.MeshStandardMaterial({ color: '#22D3EE', emissive: '#22D3EE', emissiveIntensity: 2.0 })
const keyboardMat=new THREE.MeshStandardMaterial({ color: '#0F0D30', roughness: 0.5, metalness: 0.5 })
const screenMat = new THREE.MeshStandardMaterial({
  color: '#001020',
  emissive: '#0891B2',
  emissiveIntensity: 1.2,
  roughness: 0.1,
  metalness: 0.0,
})

function Head({ position }) {
  return (
    <group position={position}>
      {/* Skull */}
      <mesh castShadow material={skinMat}>
        <boxGeometry args={[0.42, 0.45, 0.38]} />
      </mesh>
      {/* Hair top */}
      <mesh position={[0, 0.2, 0]} castShadow material={hairMat}>
        <boxGeometry args={[0.44, 0.18, 0.4]} />
      </mesh>
      {/* Hair back */}
      <mesh position={[0, 0.05, -0.21]} castShadow material={hairMat}>
        <boxGeometry args={[0.38, 0.3, 0.05]} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 0.04, 0.2]} material={eyeMat}>
        <boxGeometry args={[0.09, 0.065, 0.04]} />
      </mesh>
      <mesh position={[0.12, 0.04, 0.2]} material={eyeMat}>
        <boxGeometry args={[0.09, 0.065, 0.04]} />
      </mesh>
      {/* Nose */}
      <mesh position={[0, -0.06, 0.2]} material={skinMat}>
        <boxGeometry args={[0.05, 0.05, 0.04]} />
      </mesh>
    </group>
  )
}

function Torso({ position }) {
  return (
    <group position={position}>
      {/* Main body */}
      <mesh castShadow material={shirtMat}>
        <boxGeometry args={[0.55, 0.75, 0.3]} />
      </mesh>
      {/* Collar detail */}
      <mesh position={[0, 0.36, 0.08]} material={shirtMat}>
        <boxGeometry args={[0.2, 0.08, 0.16]} />
      </mesh>
    </group>
  )
}

function Arm({ side, position }) {
  const sign = side === 'left' ? -1 : 1
  return (
    <group position={position}>
      {/* Upper arm */}
      <mesh
        castShadow
        material={shirtMat}
        position={[sign * 0.08, -0.16, 0.04]}
        rotation={[0.4, 0, sign * 0.25]}
      >
        <boxGeometry args={[0.16, 0.38, 0.18]} />
      </mesh>
      {/* Forearm — angled toward keyboard */}
      <mesh
        castShadow
        material={skinMat}
        position={[sign * 0.12, -0.38, 0.26]}
        rotation={[-0.7, 0, sign * 0.1]}
      >
        <boxGeometry args={[0.14, 0.34, 0.16]} />
      </mesh>
      {/* Hand */}
      <mesh
        castShadow
        material={skinMat}
        position={[sign * 0.14, -0.48, 0.46]}
        rotation={[-0.4, 0, 0]}
      >
        <boxGeometry args={[0.16, 0.10, 0.18]} />
      </mesh>
    </group>
  )
}

function Legs({ position }) {
  return (
    <group position={position}>
      {/* Left thigh */}
      <mesh position={[-0.14, -0.14, 0.24]} rotation={[1.2, 0, 0]} castShadow material={pantsMat}>
        <boxGeometry args={[0.2, 0.42, 0.22]} />
      </mesh>
      {/* Right thigh */}
      <mesh position={[0.14, -0.14, 0.24]} rotation={[1.2, 0, 0]} castShadow material={pantsMat}>
        <boxGeometry args={[0.2, 0.42, 0.22]} />
      </mesh>
      {/* Left calf */}
      <mesh position={[-0.14, -0.52, 0.38]} rotation={[0, 0, 0]} castShadow material={pantsMat}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
      </mesh>
      {/* Right calf */}
      <mesh position={[0.14, -0.52, 0.38]} rotation={[0, 0, 0]} castShadow material={pantsMat}>
        <boxGeometry args={[0.18, 0.44, 0.18]} />
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.14, -0.76, 0.42]} castShadow material={hairMat}>
        <boxGeometry args={[0.2, 0.12, 0.26]} />
      </mesh>
      <mesh position={[0.14, -0.76, 0.42]} castShadow material={hairMat}>
        <boxGeometry args={[0.2, 0.12, 0.26]} />
      </mesh>
    </group>
  )
}

function Desk({ position }) {
  return (
    <group position={position}>
      {/* Tabletop */}
      <mesh receiveShadow material={deskMat}>
        <boxGeometry args={[1.8, 0.06, 0.85]} />
      </mesh>
      {/* Legs */}
      {[[-0.78, -0.25, -0.34], [0.78, -0.25, -0.34], [-0.78, -0.25, 0.34], [0.78, -0.25, 0.34]].map((pos, i) => (
        <mesh key={i} position={pos} material={deskMat}>
          <boxGeometry args={[0.06, 0.5, 0.06]} />
        </mesh>
      ))}
    </group>
  )
}

function Monitor({ position }) {
  const screenRef = useRef()

  useFrame(({ clock }) => {
    if (screenRef.current) {
      screenRef.current.emissiveIntensity = 1.0 + Math.sin(clock.elapsedTime * 1.5) * 0.2
    }
  })

  return (
    <group position={position} rotation={[-0.1, 0, 0]}>
      {/* Monitor frame */}
      <mesh castShadow material={monitorMat}>
        <boxGeometry args={[1.0, 0.65, 0.05]} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.9, 0.55, 0.01]} />
        <meshStandardMaterial
          ref={screenRef}
          color="#001835"
          emissive="#0891B2"
          emissiveIntensity={1.0}
          roughness={0.05}
          metalness={0}
        />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, -0.42, 0.12]} material={monitorMat}>
        <boxGeometry args={[0.1, 0.14, 0.18]} />
      </mesh>
      <mesh position={[0, -0.52, 0.2]} material={monitorMat}>
        <boxGeometry args={[0.3, 0.04, 0.25]} />
      </mesh>
      {/* Code lines on screen (thin emissive strips) */}
      {[-0.18, -0.08, 0.02, 0.12, 0.20].map((y, i) => (
        <mesh key={i} position={[-0.15 + (i % 2) * 0.05, y, 0.04]}>
          <boxGeometry args={[0.3 + (i * 0.07), 0.015, 0.001]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function Keyboard({ position }) {
  return (
    <group position={position}>
      <mesh receiveShadow material={keyboardMat}>
        <boxGeometry args={[0.7, 0.04, 0.28]} />
      </mesh>
      {/* Key rows */}
      {[[-0.06, -0.06], [0, -0.02], [0.04, 0.02]].map(([xOff, zOff], row) =>
        Array.from({ length: 9 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[xOff + (col - 4) * 0.072, 0.03, zOff]}
            material={keyboardMat}
          >
            <boxGeometry args={[0.062, 0.02, 0.062]} />
          </mesh>
        ))
      )}
    </group>
  )
}

function Chair({ position }) {
  return (
    <group position={position}>
      {/* Seat */}
      <mesh material={chairMat} castShadow>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.44, -0.24]} material={chairMat} castShadow>
        <boxGeometry args={[0.52, 0.82, 0.07]} />
      </mesh>
      {/* Armrests */}
      <mesh position={[-0.3, 0.22, 0]} material={chairMat}>
        <boxGeometry args={[0.06, 0.38, 0.42]} />
      </mesh>
      <mesh position={[0.3, 0.22, 0]} material={chairMat}>
        <boxGeometry args={[0.06, 0.38, 0.42]} />
      </mesh>
      {/* Pedestal */}
      <mesh position={[0, -0.3, 0]} material={chairMat}>
        <cylinderGeometry args={[0.06, 0.08, 0.54, 8]} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.58, 0]} material={chairMat}>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 5]} />
      </mesh>
    </group>
  )
}

export function DeveloperCharacter({ typingOffset = 0 }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    // Subtle breathing/swaying
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.03
  })

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Chair */}
        <Chair position={[0, -0.08, 0.12]} />

        {/* Legs */}
        <Legs position={[0, 0.44, 0]} />

        {/* Torso */}
        <Torso position={[0, 0.72, 0]} />

        {/* Arms */}
        <Arm side="left"  position={[-0.32, 0.92, 0]} />
        <Arm side="right" position={[0.32,  0.92, 0]} />

        {/* Head */}
        <Head position={[0, 1.32, 0.04]} />

        {/* Desk */}
        <Desk position={[0, 0.38, 0.62]} />

        {/* Keyboard */}
        <Keyboard position={[0, 0.43, 0.78]} />

        {/* Monitor */}
        <Monitor position={[0, 0.82, 1.08]} />

        {/* Point light: monitor glow illuminates face */}
        <pointLight
          position={[0, 0.82, 0.9]}
          intensity={1.4}
          distance={2.5}
          color="#22D3EE"
        />
      </group>
    </Float>
  )
}

export default DeveloperCharacter
