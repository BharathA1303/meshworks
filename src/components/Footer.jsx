export default function Footer() {
  const scrollTo = (id) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{
      backgroundColor: '#111111',
      borderTop: '1px solid #1a1a1a',
      padding: '2rem 1.5rem',
      color: '#F5F4F0',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Left — wordmark + founder name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <button
            onClick={() => scrollTo('top')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              color: '#F5F4F0',
              textAlign: 'left',
              padding: 0,
              lineHeight: 1,
            }}
          >
            MeshWorks<sup style={{ fontSize: '0.45rem', verticalAlign: 'super', fontWeight: 700 }}>®</sup>
          </button>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: '#383838',
            fontWeight: 400,
            letterSpacing: '0',
          }}>
            Built by Bharath A, Chennai
          </p>
        </div>

        {/* Center — nav links */}
        <div style={{ display: 'flex', gap: '1.8rem', flexWrap: 'wrap' }} className="footer-nav">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Work', id: 'work' },
            { label: 'Process', id: 'process' },
            { label: 'Contact', id: 'contact' },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 400,
                color: '#444444',
                letterSpacing: '0',
                padding: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.target.style.color = '#F5F4F0'}
              onMouseLeave={e => e.target.style.color = '#444444'}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right — LinkedIn + copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://www.linkedin.com/in/dev--bharath"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              color: '#444444',
              textDecoration: 'none',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
            onMouseLeave={e => e.currentTarget.style.color = '#444444'}
          >
            {/* Simple LinkedIn "in" icon */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: '#2e2e2e',
            letterSpacing: '0',
          }}>
            © {new Date().getFullYear()} MeshWorks
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-nav { display: none !important; }
        }
      `}</style>
    </footer>
  )
}
