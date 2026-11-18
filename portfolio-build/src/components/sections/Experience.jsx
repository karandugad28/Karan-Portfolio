import { motion } from 'framer-motion'
import { experience } from '@/content/content'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const entryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function Experience() {
  return (
    <section
      id="runtime"
      style={{
        background: '#F8F7F4',
        paddingTop: 'var(--section-pad, 120px)',
        paddingBottom: 'var(--section-pad, 120px)',
      }}
    >
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 40px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6B6B80',
              fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              margin: '0 0 12px 0',
            }}
          >
            Experience
          </p>
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#1A1A2E',
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Where I&apos;ve worked
          </h2>
        </motion.div>

        {/* Timeline entries */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {experience.entries.map((entry, i) => (
            <motion.div
              key={i}
              variants={entryVariants}
              style={{
                borderTop: i === 0 ? '1px solid rgba(26,26,46,0.12)' : undefined,
                borderBottom: '1px solid rgba(26,26,46,0.12)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: '32px',
                  padding: '36px 0 36px 20px',
                  borderLeft: '3px solid #1A1A2E',
                  marginLeft: '0',
                  paddingLeft: '24px',
                }}
                className="exp-entry"
              >
                {/* Left: Period */}
                <div style={{ paddingTop: '4px' }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem',
                      color: '#9B9BAD',
                      fontVariantNumeric: 'tabular-nums',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {entry.period}
                  </p>
                </div>

                {/* Right: Role + Company + Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: '1.3rem',
                      color: '#1A1A2E',
                      fontWeight: 400,
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {entry.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem',
                      color: '#6B6B80',
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {entry.company}
                  </p>
                  {entry.summary && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.95rem',
                        color: '#6B6B80',
                        margin: '4px 0 0 0',
                        lineHeight: 1.7,
                        maxWidth: '620px',
                      }}
                    >
                      {entry.summary}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Responsive layout */}
      <style>{`
        @media (max-width: 640px) {
          .exp-entry {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  )
}
