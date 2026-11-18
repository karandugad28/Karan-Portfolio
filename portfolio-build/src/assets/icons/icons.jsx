/**
 * Custom SVG icon set — SYSTEM ONLINE design language
 * Single-weight 2px stroke, rounded joints, solder-dot endpoints.
 * Default color: Panel Line (#232A35). Pass className for hover states.
 * These icons read as "mounted components" not generic clip art.
 */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.75,
}

// ● Solder dot helper
const Dot = ({ cx, cy, color }) => (
  <circle cx={cx} cy={cy} r={1.2} fill={color || 'currentColor'} />
)

export function BrowserChip({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      {/* Chip outline */}
      <rect x="2" y="3" width="16" height="14" rx="1.5" stroke="currentColor" />
      {/* Title bar */}
      <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" />
      {/* Dots in title bar */}
      <Dot cx={5} cy={5} /> <Dot cx={8} cy={5} /> <Dot cx={11} cy={5} />
      {/* Content lines */}
      <line x1="5" y1="10.5" x2="15" y2="10.5" stroke="currentColor" />
      <line x1="5" y1="13"   x2="11" y2="13"   stroke="currentColor" />
      {/* Pin legs */}
      <line x1="6"  y1="17" x2="6"  y2="19" stroke="currentColor" />
      <line x1="10" y1="17" x2="10" y2="19" stroke="currentColor" />
      <line x1="14" y1="17" x2="14" y2="19" stroke="currentColor" />
      <Dot cx={6}  cy={19} /> <Dot cx={10} cy={19} /> <Dot cx={14} cy={19} />
    </svg>
  )
}

export function DatabaseStack({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      <ellipse cx="10" cy="5"  rx="7" ry="2.5" stroke="currentColor" />
      <ellipse cx="10" cy="10" rx="7" ry="2.5" stroke="currentColor" />
      <ellipse cx="10" cy="15" rx="7" ry="2.5" stroke="currentColor" />
      <line x1="3" y1="5"  x2="3"  y2="15" stroke="currentColor" />
      <line x1="17" y1="5" x2="17" y2="15" stroke="currentColor" />
      <Dot cx={3} cy={5} /> <Dot cx={17} cy={5} />
      <Dot cx={3} cy={15} /> <Dot cx={17} cy={15} />
    </svg>
  )
}

export function TerminalModule({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      <rect x="2" y="3" width="16" height="14" rx="1.5" stroke="currentColor" />
      <polyline points="5,8 8,10.5 5,13" stroke="currentColor" />
      <line x1="10" y1="13" x2="15" y2="13" stroke="currentColor" />
      <Dot cx={5} cy={8} /> <Dot cx={5} cy={13} /> <Dot cx={15} cy={13} />
    </svg>
  )
}

export function GitFork({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      {/* Main trunk */}
      <line x1="10" y1="3" x2="10" y2="10" stroke="currentColor" />
      {/* Fork branches */}
      <line x1="10" y1="10" x2="5"  y2="14" stroke="currentColor" />
      <line x1="10" y1="10" x2="15" y2="14" stroke="currentColor" />
      {/* Terminal nodes */}
      <circle cx="5"  cy="16" r="2" stroke="currentColor" />
      <circle cx="15" cy="16" r="2" stroke="currentColor" />
      {/* Solder dots */}
      <Dot cx={10} cy={3} />
      <Dot cx={10} cy={10} />
    </svg>
  )
}

export function FigmaBoard({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      {/* Frame */}
      <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" />
      {/* Crosshairs */}
      <line x1="10" y1="3"  x2="10" y2="17" stroke="currentColor" strokeWidth="1" />
      <line x1="3"  y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1" />
      {/* Center dot */}
      <Dot cx={10} cy={10} />
      {/* Corner dots */}
      <Dot cx={3} cy={3} /> <Dot cx={17} cy={3} />
      <Dot cx={3} cy={17} /> <Dot cx={17} cy={17} />
    </svg>
  )
}

export function ServerRack({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      <rect x="3" y="3"  width="14" height="4" rx="1" stroke="currentColor" />
      <rect x="3" y="9"  width="14" height="4" rx="1" stroke="currentColor" />
      <rect x="3" y="15" width="14" height="4" rx="1" stroke="currentColor" />
      <Dot cx={14} cy={5} /> <Dot cx={14} cy={11} /> <Dot cx={14} cy={17} />
      {/* Status dots */}
      <circle cx={7} cy={5}  r={0.8} fill="currentColor" />
      <circle cx={7} cy={11} r={0.8} fill="currentColor" />
      <circle cx={7} cy={17} r={0.8} fill="currentColor" />
    </svg>
  )
}

export function CloudDeploy({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      <path d="M5 13a4 4 0 0 1 .5-7.9A5 5 0 0 1 15 8a3 3 0 0 1-1 5.8" stroke="currentColor" />
      <line x1="10" y1="12" x2="10" y2="18" stroke="currentColor" />
      <polyline points="7,15 10,18 13,15" stroke="currentColor" />
      <Dot cx={10} cy={12} /> <Dot cx={10} cy={18} />
    </svg>
  )
}

export function CodeBrackets({ className = '', style }) {
  return (
    <svg {...iconProps} className={className} style={style} aria-hidden="true">
      <polyline points="7,4 3,10 7,16"  stroke="currentColor" />
      <polyline points="13,4 17,10 13,16" stroke="currentColor" />
      <line x1="9" y1="13" x2="11" y2="7" stroke="currentColor" />
      <Dot cx={7}  cy={4}  /> <Dot cx={7}  cy={16} />
      <Dot cx={13} cy={4}  /> <Dot cx={13} cy={16} />
    </svg>
  )
}
