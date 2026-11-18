import { motion } from 'framer-motion'
import { stack } from '@/content/content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const staggerGroup = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

const staggerPill = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.05 } },
}

const pillVariant = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

// Accent colors per group label
const GROUP_COLORS = {
  'Frontend':   '#5B4CF5',
  'Backend':    '#0A9981',
  '3D / Motion':'#E8A87C',
  'Tools':      '#DC4A3D',
}

function getColor(label) {
  return GROUP_COLORS[label] ?? '#1A1A2E'
}

function PillTag({ label }) {
  return (
    <motion.span
      variants={pillVariant}
      whileHover={{
        background:  '#1A1A2E',
        color:       '#FFFFFF',
        boxShadow:   '0 8px 32px rgba(0,0,0,0.10)',
        borderColor: 'transparent',
      }}
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        padding:      '8px 20px',
        borderRadius: '999px',
        border:       '1px solid rgba(26,26,46,0.1)',
        background:   '#FFFFFF',
        color:        '#1A1A2E',
        fontSize:     '0.9rem',
        fontFamily:   "'DM Sans', sans-serif",
        fontWeight:   400,
        boxShadow:    '0 2px 8px rgba(0,0,0,0.06)',
        cursor:       'default',
        transition:   'all 0.2s ease',
        userSelect:   'none',
      }}
    >
      {label}
    </motion.span>
  )
}

export function Stack() {
  return (
    <section
      id="modules"
      className="section-wrapper"
      style={{ background: '#F8F7F4' }}
      aria-labelledby="stack-heading"
    >
      <div className="content-container">
        {/* Section header */}
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ marginBottom: 'clamp(48px, 7vw, 72px)' }}
        >
          <motion.p
            variants={fadeUp}
            className="section-label"
            style={{ marginBottom: '16px' }}
          >
            SKILLS &amp; STACK
          </motion.p>
          <motion.h2
            id="stack-heading"
            variants={fadeUp}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize:   'clamp(2rem, 4vw, 2.8rem)',
              lineHeight: 1.15,
              color:      '#1A1A2E',
              fontWeight: 400,
              maxWidth:   '480px',
            }}
          >
            What I work with
          </motion.h2>
        </motion.div>

        {/* Groups grid */}
        <motion.div
          variants={staggerGroup}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap:                 'clamp(28px, 5vw, 48px)',
          }}
        >
          {stack.groups.map((group) => {
            const color = getColor(group.label)
            return (
              <motion.div key={group.label} variants={fadeUp}>
                {/* Group label with colored dot */}
                <div
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    gap:          '8px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      display:      'inline-block',
                      width:        '8px',
                      height:       '8px',
                      borderRadius: '50%',
                      background:   color,
                      flexShrink:   0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily:    "'DM Sans', sans-serif",
                      fontSize:      '0.7rem',
                      fontWeight:    600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color:         color,
                    }}
                  >
                    {group.label}
                  </span>
                </div>

                {/* Pills */}
                <motion.div
                  variants={staggerPill}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  style={{
                    display:   'flex',
                    flexWrap:  'wrap',
                    gap:       '8px',
                  }}
                >
                  {group.items.map((item) => (
                    <PillTag key={item} label={item} />
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Stack
