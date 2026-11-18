import { useRef, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Stars, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Vector2 } from 'three'

import { DeveloperCharacter }     from './DeveloperCharacter'
import { HolographicScreens }     from './HolographicScreen'
import { ParticleField, FloatingFragments } from './ParticleField'
import { useReducedMotion }        from '@/hooks/useReducedMotion'

/* ── Grid floor ──────────────────────────────────────────── */
function GridFloor() {
  return (
    <gridHelper
      args={[20, 30, '#1C1645', '#1C1645']}
      position={[0, -1.1, 0]}
    />
  )
}

/* ── Scroll-driven camera controller ─────────────────────── */
function CameraController({ cameraProxyRef }) {
  const { camera } = useThree()
  const prefersReduced = useReducedMotion()

  useFrame(() => {
    if (!cameraProxyRef?.current) return
    const target = cameraProxyRef.current
    const lerpFactor = prefersReduced ? 1.0 : 0.06

    camera.position.x += (target.x - camera.position.x) * lerpFactor
    camera.position.y += (target.y - camera.position.y) * lerpFactor
    camera.position.z += (target.z - camera.position.z) * lerpFactor
    camera.lookAt(target.lookX || 0, target.lookY || 0.8, target.lookZ || 0.5)
  })

  return null
}

/* ── Rim lights ──────────────────────────────────────────── */
function Lights() {
  const rimRef = useRef()
  useFrame(({ clock }) => {
    if (rimRef.current) {
      rimRef.current.intensity = 0.8 + Math.sin(clock.elapsedTime * 0.7) * 0.15
    }
  })

  return (
    <>
      <ambientLight intensity={0.12} color="#0E0B2E" />
      {/* Key light — cool blue-white from top-right */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={1.2}
        color="#C4B5FD"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Rim light — violet from behind */}
      <pointLight
        ref={rimRef}
        position={[0, 2, -4]}
        intensity={0.8}
        color="#7C3AED"
        distance={8}
      />
      {/* Fill — low cyan from front-left */}
      <pointLight position={[-4, 0, 3]} intensity={0.4} color="#22D3EE" distance={10} />
    </>
  )
}

/* ── Inner R3F scene ─────────────────────────────────────── */
function Scene({ cameraProxyRef, screensVisible }) {
  return (
    <>
      <CameraController cameraProxyRef={cameraProxyRef} />
      <Lights />

      {/* Background stars */}
      <Stars radius={80} depth={60} count={6000} factor={3} saturation={0.1} fade speed={0.3} />

      {/* Ground grid */}
      <GridFloor />

      {/* The main character */}
      <DeveloperCharacter />

      {/* Orbiting holographic screens */}
      <HolographicScreens visible={screensVisible} />

      {/* Atmospheric particles */}
      <ParticleField count={2500} radius={11} />
      <FloatingFragments count={20} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
        <ChromaticAberration
          offset={new Vector2(0.0008, 0.0008)}
          radialModulation={false}
          modulationOffset={0.0}
        />
      </EffectComposer>
    </>
  )
}

/* ── Exported Canvas wrapper ─────────────────────────────── */
export const DeveloperScene = forwardRef(function DeveloperScene(
  { cameraProxyRef, screensVisible = false },
  ref
) {
  return (
    <Canvas
      id="developer-scene-canvas"
      shadows
      gl={{
        antialias:  true,
        pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
        alpha:      false,
      }}
      camera={{ position: [0, 1.5, 4], fov: 52, near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%', background: '#06060F' }}
    >
      <Scene cameraProxyRef={cameraProxyRef} screensVisible={screensVisible} />
    </Canvas>
  )
})

export default DeveloperScene
