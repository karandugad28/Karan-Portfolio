import { motion } from 'framer-motion'
import { about } from '@/content/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export function About() {
  return (
    <section
      id="process"
      className="section-wrapper relative"
      style={{ background: '#FFFFFF', overflow: 'hidden' }}
      aria-labelledby="about-heading"
    >
      {/* Soft accent shape — subtle background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: '#F8F7F4',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="content-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <motion.p
            variants={fadeUp}
            className="section-label"
            style={{ marginBottom: '16px', display: 'inline-block' }}
          >
            ABOUT ME
          </motion.p>

          <motion.h2
            id="about-heading"
            variants={fadeUp}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              color: '#1A1A2E',
              marginBottom: '28px',
              fontWeight: 400,
            }}
          >
            {about.heading}
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
            {about.body.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: '#6B6B80',
                  margin: '0 auto',
                  maxWidth: '680px',
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a
              href="/Karan_Dugad_CV.pdf"
              download="Karan_Dugad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                padding: '14px 32px',
                fontSize: '0.95rem',
              }}
            >
              Download CV
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v8M3 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
