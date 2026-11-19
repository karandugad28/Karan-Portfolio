import { useState } from 'react'
import { motion } from 'framer-motion'
import { contact } from '@/content/content'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export function Contact() {
  const [formState, setFormState] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('https://formspree.io/f/[YOUR_FORM_ID]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section
      id="uplink"
      className="section-wrapper relative"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '120px',
      }}
      aria-labelledby="contact-heading"
    >
      {/* Decorative ambient background accents */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(232, 168, 124, 0.12) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="content-container relative z-10" style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* Header centered */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <motion.p
            variants={fadeUp}
            className="section-label"
            style={{ display: 'inline-block', marginBottom: '14px' }}
          >
            GET IN TOUCH
          </motion.p>

          <motion.h2
            id="contact-heading"
            variants={fadeUp}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.15,
              color: 'var(--ink)',
              marginBottom: '16px',
              fontWeight: 400,
            }}
          >
            Let's create something considered together.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--ink-muted)',
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}
          >
            Have a project in mind, an idea to explore, or want to discuss collaborating? Send a message or reach out directly.
          </motion.p>

          {/* Socials & Quick Action Pills */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <a
              href={`mailto:${contact.email}`}
              className="pill"
              style={{
                background: '#FFFFFF',
                padding: '8px 20px',
                fontSize: '0.86rem',
              }}
            >
              ✉ {contact.email} <span style={{ opacity: 0.6 }}>↗</span>
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="pill"
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                borderColor: 'transparent',
                padding: '8px 20px',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            >
              Chat on WhatsApp ↗
            </a>
            {contact.socials.filter(s => s.label !== 'WhatsApp').map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
                style={{
                  background: '#FFFFFF',
                  padding: '8px 18px',
                  fontSize: '0.86rem',
                }}
              >
                {s.label} <span style={{ opacity: 0.6 }}>↗</span>
              </a>
            ))}
            <a
              href="/Karan_Dugad_CV.pdf"
              download="Karan_Dugad_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pill"
              style={{
                background: 'var(--ink)',
                color: '#FFFFFF',
                borderColor: 'transparent',
                padding: '8px 20px',
                fontSize: '0.86rem',
              }}
            >
              Download CV ↓
            </a>
          </motion.div>
        </motion.div>

        {/* Expanded Centered Form Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="card"
          style={{
            width: '100%',
            maxWidth: '760px',
            margin: '0 auto',
            padding: 'clamp(28px, 5vw, 48px)',
            boxShadow: 'var(--shadow-md)',
            background: '#FFFFFF',
            borderRadius: '20px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: '1.9rem',
                marginBottom: '8px',
                color: 'var(--ink)',
                fontWeight: 400,
              }}
            >
              Send a Message
            </h3>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--ink-muted)',
              }}
            >
              Fill out the form below and I'll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Row for Name & Email on larger screens */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Karan Dugad"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-soft)',
                    color: 'var(--ink)',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--ink)'
                    e.target.style.background = '#FFFFFF'
                    e.target.style.boxShadow = '0 0 0 3px rgba(26,26,46,0.06)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.background = 'var(--bg-soft)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-soft)',
                    color: 'var(--ink)',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--ink)'
                    e.target.style.background = '#FFFFFF'
                    e.target.style.boxShadow = '0 0 0 3px rgba(26,26,46,0.06)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)'
                    e.target.style.background = 'var(--bg-soft)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-muted)',
                  marginBottom: '8px',
                }}
              >
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project, timeline, or requirements..."
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-soft)',
                  color: 'var(--ink)',
                  fontSize: '0.95rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '130px',
                  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--ink)'
                  e.target.style.background = '#FFFFFF'
                  e.target.style.boxShadow = '0 0 0 3px rgba(26,26,46,0.06)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.background = 'var(--bg-soft)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'loading'}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '16px 32px',
                fontSize: '1rem',
                marginTop: '10px',
                borderRadius: 'var(--radius-pill)',
              }}
            >
              {formState === 'loading' ? 'Sending Message...' : 'Send Message →'}
            </button>

            {formState === 'success' && (
              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: '#065F46',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
            {formState === 'error' && (
              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#991B1B',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Unable to send directly. Please email me directly at {contact.email}.
              </div>
            )}
          </form>
        </motion.div>

        {/* Availability badge centered at bottom */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ textAlign: 'center', marginTop: '36px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#065F46',
              fontSize: '0.84rem',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
              }}
            />
            Available for freelance & full-time opportunities
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
