import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 }
    )

    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Work', id: 'work' },
    { label: 'Process', id: 'process' },
  ]

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'padding 0.35s ease, background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
          backgroundColor: scrolled ? 'rgba(245,244,240,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #E0DFD9' : '1px solid transparent',
          padding: scrolled ? '0.75rem 2rem' : '1.1rem 2rem',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}>

          {/* ── Logo wordmark ── */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              color: '#111111',
              textDecoration: 'none',
              userSelect: 'none',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            MeshWorks
            <sup style={{
              fontSize: '0.45rem',
              verticalAlign: 'super',
              fontWeight: 700,
              letterSpacing: 0,
            }}>®</sup>
          </a>

          {/* ── Center nav links (desktop) ── */}
          <div
            className="nav-center"
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem',
            }}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 400,
                  color: '#333333',
                  letterSpacing: '0',
                  padding: 0,
                  transition: 'color 0.18s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#111111'}
                onMouseLeave={e => e.currentTarget.style.color = '#333333'}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* ── Right side ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexShrink: 0 }}>
            {/* Pill CTA (desktop only) */}
            <button
              onClick={() => scrollTo('contact')}
              className="nav-cta"
              style={{
                fontFamily: 'var(--font-body)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                backgroundColor: '#111111',
                color: '#F5F4F0',
                borderRadius: '9999px',
                border: 'none',
                fontWeight: 500,
                fontSize: '0.82rem',
                letterSpacing: '0',
                cursor: 'pointer',
                padding: '0.52rem 1.1rem',
                transition: 'transform 0.18s ease, opacity 0.18s ease',
                whiteSpace: 'nowrap',
                lineHeight: 1,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.96)'; e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}
            >
              Get Started
              <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>↗</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                flexDirection: 'column',
                gap: '4px',
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: '20px',
                  height: '1.5px',
                  backgroundColor: '#111111',
                  transition: 'transform 0.2s ease, opacity 0.2s ease',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                    : i === 1 ? 'scaleX(0)'
                    : 'translateY(-5.5px) rotate(-45deg)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '52px',
          left: 0,
          right: 0,
          zIndex: 99,
          backgroundColor: '#F5F4F0',
          borderBottom: '1px solid #E0DFD9',
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          {[...navLinks, { label: 'Contact', id: 'contact' }].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#111111',
                letterSpacing: '-0.02em',
                textAlign: 'left',
                padding: 0,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-center { display: none !important; }
          .nav-login { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
