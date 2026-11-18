const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/karandugad',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/karandugad',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/karandugad',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
