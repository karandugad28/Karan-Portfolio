const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919054402989',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.18-.06-.1-.22-.16-.47-.29z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/karandugad28',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karan-dugad-a55775437',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/karan_dugad/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
]

export function Footer() {
  function scrollToTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid rgba(26,26,46,0.08)',
      fontFamily: '"DM Sans", sans-serif',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto',
        padding: '48px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 32,
      }}
        className="footer-grid"
      >
        {/* Left — wordmark */}
        <div>
          <div style={{
            fontFamily: '"DM Serif Display", serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#1A1A2E',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: 6,
          }}>
            KD
          </div>
          <div style={{
            fontSize: '0.82rem',
            color: '#6B6B80',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            Web Developer
          </div>
        </div>

        {/* Center — copyright */}
        <div style={{
          fontSize: '0.83rem',
          color: '#6B6B80',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          © 2025 Karan Dugad. Built with care.
        </div>

        {/* Right — back to top + socials */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 10,
          flexWrap: 'wrap',
        }}>
          {/* Back to top */}
          <button
            onClick={scrollToTop}
            title="Back to top"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: '#6B6B80',
              background: 'transparent',
              border: '1px solid rgba(26,26,46,0.14)',
              borderRadius: 999,
              padding: '7px 16px',
              cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#1A1A2E'
              e.currentTarget.style.borderColor = 'rgba(26,26,46,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#6B6B80'
              e.currentTarget.style.borderColor = 'rgba(26,26,46,0.14)'
            }}
          >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>↑</span>
            Back to top
          </button>

          {/* Social pills */}
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36,
                color: '#6B6B80',
                border: '1px solid rgba(26,26,46,0.14)',
                borderRadius: 999,
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#1A1A2E'
                e.currentTarget.style.borderColor = '#1A1A2E'
                e.currentTarget.style.background = 'rgba(26,26,46,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#6B6B80'
                e.currentTarget.style.borderColor = 'rgba(26,26,46,0.14)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Responsive CSS ───────────────────────────────────── */}
      <style>{`
        @media (max-width: 680px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 24px !important;
          }
          .footer-grid > div:last-child {
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  )
}
