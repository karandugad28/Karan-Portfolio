import { useState } from 'react'

/**
 * Chip — stack skill item with icon slot.
 * Follows design.md: Panel Line border → Ember Copper on hover, 6px radius, glow.
 */
export function Chip({ label, icon: Icon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-panel-line
                 font-mono text-mono-s text-signal-slate uppercase tracking-widest
                 transition-all duration-200 cursor-default select-none"
      style={{
        borderColor: hovered ? 'var(--color-ember-copper)' : undefined,
        boxShadow:   hovered ? 'var(--glow-copper)' : undefined,
        color:       hovered ? 'var(--color-ember-copper)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {Icon && (
        <Icon
          style={{ color: hovered ? 'var(--color-ember-copper)' : 'var(--color-panel-line)' }}
          className="transition-colors duration-200"
        />
      )}
      {label}
    </div>
  )
}

export default Chip
