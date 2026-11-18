import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Custom GLSL shader for holographic screens ───────────── */
const HolographicMaterial = shaderMaterial(
  { uTime: 0, uColor1: new THREE.Color('#7C3AED'), uColor2: new THREE.Color('#22D3EE') },
  // Vertex
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Scanlines
      float scan = sin((vUv.y + uTime * 0.25) * 60.0) * 0.06 + 0.94;

      // Grid pattern
      float gx = step(0.92, fract(vUv.x * 16.0));
      float gy = step(0.92, fract(vUv.y * 10.0));
      float grid = max(gx, gy) * 0.35;

      // Glitch strips — random horizontal flicker
      float glitchLine = step(0.98, random(vec2(floor(vUv.y * 40.0), floor(uTime * 8.0))));
      float glitch = glitchLine * 0.12;

      // Radial glow from center
      vec2 center = vUv - 0.5;
      float radial = 1.0 - smoothstep(0.0, 0.72, length(center));

      // Vertical color gradient
      vec3 col = mix(uColor1, uColor2, vUv.y);
      col = col * (scan + grid + glitch) * radial;

      // Flicker outer edge
      float edge = smoothstep(0.0, 0.08, vUv.x)
                 * smoothstep(1.0, 0.92, vUv.x)
                 * smoothstep(0.0, 0.08, vUv.y)
                 * smoothstep(1.0, 0.92, vUv.y);

      float alpha = radial * 0.88 * edge;
      gl_FragColor = vec4(col * 1.8, alpha);
    }
  `
)

extend({ HolographicMaterial })

/* ── Single orbiting holographic screen ──────────────────── */
function OrbitScreen({ radius, angle, speed, width = 1.1, height = 0.7, yOffset = 0.5 }) {
  const meshRef    = useRef()
  const matRef     = useRef()
  const angleRef   = useRef(angle)

  useFrame(({ clock }) => {
    angleRef.current += speed * 0.006
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(angleRef.current) * radius
      meshRef.current.position.z = Math.cos(angleRef.current) * radius - 0.3
      meshRef.current.rotation.y = -angleRef.current + Math.PI * 0.5
    }
    if (matRef.current) {
      matRef.current.uTime = clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <holographicMaterial
        ref={matRef}
        uTime={0}
        uColor1={new THREE.Color('#7C3AED')}
        uColor2={new THREE.Color('#22D3EE')}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/* ── Three orbiting screens ───────────────────────────────── */
export function HolographicScreens({ visible = true }) {
  if (!visible) return null

  return (
    <group position={[0, 0.9, 0]}>
      <OrbitScreen radius={2.0} angle={0}           speed={0.8}  width={1.2} height={0.75} />
      <OrbitScreen radius={1.8} angle={Math.PI*2/3} speed={-0.6} width={0.9} height={0.55} />
      <OrbitScreen radius={2.2} angle={Math.PI*4/3} speed={0.5}  width={1.0} height={0.65} />
    </group>
  )
}

export default HolographicScreens
