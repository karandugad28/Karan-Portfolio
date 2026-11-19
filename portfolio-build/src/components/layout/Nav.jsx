import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Home',       href: '#root' },
  { label: 'About',      href: '#process' },
  { label: 'Skills',     href: '#modules' },
  { label: 'Work',       href: '#deployed' },
  { label: 'Contact',    href: '#uplink' },
]

export function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [progress, setProgress]     = useState(0)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [active, setActive]         = useState('#root')
  const drawerRef                   = useRef(null)

  useEffect(() => {
    function onScroll() {
      const y   = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 40)
      setProgress(max > 0 ? (y / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close drawer on outside click
  useEffect(() => {
    if (!menuOpen) return
    function handler(e) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNav(e, href) {
    e.preventDefault()
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(26,26,46,0.18)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* ── Nav bar ───────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: scrolled ? '#ffffff' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,26,46,0.08)' : '1px solid transparent',
        transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
      }}>
        <div style={{
          maxWidth: 1160, margin: '0 auto',
          padding: '0 40px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <a
            href="#root"
            onClick={e => handleNav(e, '#root')}
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#1A1A2E',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            KD
          </a>

          {/* Desktop links */}
          <ul style={{
            display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0,
            alignItems: 'center',
          }}
            className="nav-links-desktop"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={e => handleNav(e, href)}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active === href ? '#1A1A2E' : '#6B6B80',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    paddingBottom: 2,
                    borderBottom: active === href ? '1.5px solid #1A1A2E' : '1.5px solid transparent',
                  }}
                  onMouseEnter={e => { if (active !== href) e.currentTarget.style.color = '#1A1A2E' }}
                  onMouseLeave={e => { if (active !== href) e.currentTarget.style.color = '#6B6B80' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="#uplink"
              onClick={e => handleNav(e, '#uplink')}
              className="nav-links-desktop"
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.9rem',
                fontWeight: 500,
                background: '#1A1A2E',
                color: '#ffffff',
                borderRadius: 999,
                padding: '10px 24px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'opacity 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.82' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Let&rsquo;s talk
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              className="nav-hamburger"
              style={{
                display: 'none',
                flexDirection: 'column', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer', padding: 6,
              }}
            >
              <span style={barStyle(menuOpen, 0)} />
              <span style={barStyle(menuOpen, 1)} />
              <span style={barStyle(menuOpen, 2)} />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: 2,
          width: `${progress}%`,
          background: '#1A1A2E',
          transition: 'width 0.1s linear',
          borderRadius: '0 2px 2px 0',
          pointerEvents: 'none',
        }} />
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed', top: 0, right: 0, zIndex: 1000,
          width: 280, height: '100dvh',
          background: '#ffffff',
          boxShadow: '-4px 0 40px rgba(0,0,0,0.12)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', flexDirection: 'column',
          padding: '80px 32px 48px',
          gap: 8,
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={e => handleNav(e, href)}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1.1rem',
              fontWeight: active === href ? 600 : 400,
              color: active === href ? '#1A1A2E' : '#6B6B80',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid rgba(26,26,46,0.06)',
              transition: 'color 0.2s',
              letterSpacing: '0.03em',
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="#uplink"
          onClick={e => handleNav(e, '#uplink')}
          style={{
            marginTop: 24,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.95rem',
            fontWeight: 500,
            background: '#1A1A2E',
            color: '#ffffff',
            borderRadius: 999,
            padding: '12px 28px',
            textDecoration: 'none',
            textAlign: 'center',
            display: 'block',
          }}
        >
          Let&rsquo;s talk
        </a>
      </div>

      {/* ── Responsive CSS ───────────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}

function barStyle(open, idx) {
  const base = {
    display: 'block', width: 22, height: 2,
    background: '#1A1A2E', borderRadius: 2,
    transition: 'transform 0.25s, opacity 0.25s',
    transformOrigin: 'center',
  }
  if (open) {
    if (idx === 0) return { ...base, transform: 'translateY(7px) rotate(45deg)' }
    if (idx === 1) return { ...base, opacity: 0 }
    if (idx === 2) return { ...base, transform: 'translateY(-7px) rotate(-45deg)' }
  }
  return base
}
