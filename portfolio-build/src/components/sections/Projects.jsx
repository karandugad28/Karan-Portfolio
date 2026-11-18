import { motion } from 'framer-motion'
import { projects } from '@/content/content'

const gradients = {
  'project-1': 'linear-gradient(135deg, #667eea, #764ba2)',
  'project-2': 'linear-gradient(135deg, #f093fb, #f5576c)',
  'project-3': 'linear-gradient(135deg, #4facfe, #00f2fe)',
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

function ProjectCard({ project, index }) {
  const gradient = gradients[project.id] || 'linear-gradient(135deg, #667eea, #764ba2)'
  const stackItems = project.stack
    ? project.stack.split(/[·,]/).map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <motion.div
      variants={cardVariants}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(26,26,46,0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 40px rgba(0,0,0,0.14)',
      }}
    >
      {/* Gradient image placeholder */}
      <div
        style={{
          height: '240px',
          background: gradient,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 20px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: '#FFFFFF',
              fontSize: '1.3rem',
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '1rem',
            color: '#1A1A2E',
            margin: 0,
          }}
        >
          {project.name}
        </p>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem',
            color: '#6B6B80',
            margin: 0,
            lineHeight: 1.65,
          }}
        >
          {project.description}
        </p>

        {/* Stack pills */}
        {stackItems.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {stackItems.map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem',
                  color: '#6B6B80',
                  border: '1px solid rgba(26,26,46,0.12)',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  background: 'transparent',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: 'auto',
            paddingTop: '8px',
          }}
        >
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#1A1A2E',
                textDecoration: 'none',
              }}
            >
              Live site ↗
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#6B6B80',
                textDecoration: 'none',
              }}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section
      id="deployed"
      style={{
        background: '#FFFFFF',
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
          style={{ marginBottom: '56px' }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#6B6B80',
              fontWeight: 500,
              marginBottom: '12px',
              fontFamily: "'DM Sans', sans-serif",
              margin: '0 0 12px 0',
            }}
          >
            Selected Work
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
            Projects I&apos;ve built
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="projects-grid"
        >
          {projects.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Elegant "More coming soon" footer pill indicator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              borderRadius: '999px',
              background: '#F8F7F4',
              border: '1px solid rgba(26,26,46,0.08)',
              color: '#6B6B80',
              fontSize: '0.86rem',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#E8A87C',
                boxShadow: '0 0 8px rgba(232, 168, 124, 0.6)',
              }}
            />
            <span>More projects in active development</span>
            <span style={{ color: '#9B9BAD', fontSize: '0.78rem' }}>·</span>
            <a
              href="https://github.com/karandugad28"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#1A1A2E',
                fontWeight: 500,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E8A87C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1A1A2E')}
            >
              Follow on GitHub ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* Responsive grid */}
      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
