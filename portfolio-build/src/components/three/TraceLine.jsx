import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'

/**
 * Vertical SVG trace line that runs the full page height.
 * stroke-dashoffset is scrubbed by scroll position via GSAP.
 * On mobile, renders as a simple static gradient rule instead.
 */
export function TraceLine({ isMobile }) {
  const pathRef = useRef(null)

  useEffect(() => {
    if (isMobile || !pathRef.current) return

    const path   = pathRef.current
    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray:  length,
      strokeDashoffset: length,
    })

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end:   'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(path, {
          strokeDashoffset: length * (1 - self.progress),
        })
      },
    })

    return () => st.kill()
  }, [isMobile])

  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="fixed left-5 top-0 bottom-0 w-px pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-panel-line) 10%, var(--color-panel-line) 90%, transparent)',
          opacity: 0.4,
        }}
      />
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="fixed left-8 top-0 h-full pointer-events-none z-10"
      style={{ width: 2, height: '100vh', position: 'fixed' }}
      preserveAspectRatio="none"
    >
      <line
        x1="1" y1="0" x2="1" y2="100%"
        stroke="var(--color-panel-line)"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        ref={pathRef}
        x1="1" y1="0" x2="1" y2="100%"
        stroke="var(--color-ember-copper)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(226,134,75,0.8))' }}
      />
    </svg>
  )
}

export default TraceLine
