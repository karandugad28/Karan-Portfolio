/* Mobile fallback for the circuit board — SVG version */
/* Replaces WebGL canvas below 768px for performance */

export function CircuitBoardSVG() {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Circuit board illustration"
      role="img"
      style={{ width: '100%', height: '100%', maxWidth: 340 }}
    >
      {/* Board background */}
      <rect x="10" y="10" width="320" height="200" rx="4" fill="#0D1219" stroke="#232A35" strokeWidth="1" />

      {/* Traces */}
      <path d="M170 110 L230 110 L260 80 L310 80" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M170 110 L170 60  L200 40  L240 40" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M170 110 L110 110 L80  80  L40  80" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M170 110 L170 160 L210 180 L260 180" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M170 110 L120 140 L80  160 L40  160" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M170 110 L230 100 L280 100 L310 120" stroke="#1A2230" strokeWidth="1.5" strokeLinecap="round" />

      {/* Lit traces (copper) */}
      <path d="M170 110 L230 110 L260 80 L310 80" stroke="#E2864B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M170 110 L170 60  L200 40  L240 40" stroke="#E2864B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* CPU center */}
      <rect x="152" y="92" width="36" height="36" rx="2" fill="#E2864B" opacity="0.9" />
      <rect x="156" y="96" width="28" height="28" rx="1" fill="#0D1219" />
      {/* CPU pins */}
      {[158,166,174,180].map(x => (
        <g key={x}>
          <line x1={x} y1="92" x2={x} y2="86" stroke="#8B7CF6" strokeWidth="1.5" />
          <line x1={x} y1="128"x2={x} y2="134"stroke="#8B7CF6" strokeWidth="1.5" />
        </g>
      ))}
      {[100,108,116,124].map(y => (
        <g key={y}>
          <line x1="152" y1={y} x2="146" y2={y} stroke="#8B7CF6" strokeWidth="1.5" />
          <line x1="188" y1={y} x2="194" y2={y} stroke="#8B7CF6" strokeWidth="1.5" />
        </g>
      ))}

      {/* Small components */}
      <rect x="255" y="74" width="18" height="10" rx="1" fill="#1E2A3A" stroke="#232A35" />
      <rect x="74"  y="74" width="12" height="18" rx="1" fill="#1E2A3A" stroke="#232A35" />
      <rect x="250" y="174"width="16" height="10" rx="1" fill="#1E2A3A" stroke="#232A35" />
      <circle cx="40"  cy="80"  r="4" fill="#1E2A3A" stroke="#232A35" />
      <circle cx="40"  cy="160" r="4" fill="#1E2A3A" stroke="#232A35" />
      <circle cx="310" cy="80"  r="4" fill="#E2864B" opacity="0.6" />

      {/* Solder dots on trace endpoints */}
      <circle cx="310" cy="80"  r="2.5" fill="#E2864B" />
      <circle cx="240" cy="40"  r="2" fill="#E2864B" opacity="0.6" />
      <circle cx="170" cy="110" r="3" fill="#E2864B" />
    </svg>
  )
}

export default CircuitBoardSVG
