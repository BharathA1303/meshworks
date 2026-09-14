import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


export default function Contact() {
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 82%', toggleActions: 'play none none none' }
      }
    )
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success !== false) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Failed to send message. Please check credentials or try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. You can email directly at devbharath2513@gmail.com')
    }
  }

  const inputStyle = {
    width: '100%',
    backgroundColor: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '0.9rem 1.1rem',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    color: '#F5F4F0',
    outline: 'none',
    letterSpacing: '0',
    transition: 'border-color 0.25s ease',
    WebkitAppearance: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: '#444444',
    marginBottom: '0.5rem',
  }

  return (
    <section
      id="contact"
      style={{ backgroundColor: '#111111', padding: '8rem 1.5rem', color: '#F5F4F0' }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'start',
      }}
        className="contact-grid"
      >

        {/* ── Left: headline + contact details ── */}
        <div ref={headingRef}>
          {/* Section label */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#444444',
            marginBottom: '1.2rem',
            fontWeight: 400,
          }}>
            Get In Touch
          </p>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#F5F4F0',
            marginBottom: '1.5rem',
          }}>
            Let's build something{' '}
            <span style={{ color: '#444444' }}>worth shipping.</span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            color: '#555555',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Whether you have a fully-scoped project or just an idea — we're happy to talk.
            Tell us what you're building and we'll get back within 24 hours.
          </p>

          {/* Studio Founder Signature Block */}
          <div className="founder-signature-card" style={{
            borderTop: '1px solid #1f1f1f',
            paddingTop: '2.2rem',
            marginTop: '2.5rem',
          }}>
            {/* Top row: Avatar + Name on left, LinkedIn icon on right (never wraps) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.2rem',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1c1c1c',
                  border: '1px solid #2c2c2c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: '#F5F4F0',
                  flexShrink: 0,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}>
                  BA
                </div>
                <div style={{ minWidth: 0 }}>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#F5F4F0',
                    margin: 0,
                    whiteSpace: 'nowrap',
                  }}>
                    Bharath A
                  </h4>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: '#666666',
                    margin: '0.15rem 0 0 0',
                    lineHeight: 1.3,
                  }}>
                    Founder & Software Developer
                  </p>
                </div>
              </div>

              {/* LinkedIn Icon Action Button */}
              <a
                href="https://www.linkedin.com/in/dev--bharath"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                aria-label="LinkedIn Profile"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#181818',
                  border: '1px solid #282828',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#888888',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#F5F4F0'
                  e.currentTarget.style.color = '#111111'
                  e.currentTarget.style.borderColor = '#F5F4F0'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#181818'
                  e.currentTarget.style.color = '#888888'
                  e.currentTarget.style.borderColor = '#282828'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            {/* Direct contact line: Email & Phone */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#444444',
                  fontWeight: 600,
                  minWidth: '40px',
                }}>
                  Email
                </span>
                <a
                  href="mailto:devbharath2513@gmail.com"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: '#888888',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888888'}
                >
                  devbharath2513@gmail.com <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>↗</span>
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#444444',
                  fontWeight: 600,
                  minWidth: '40px',
                }}>
                  Direct
                </span>
                <a
                  href="tel:+919962060337"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: '#888888',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F5F4F0'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888888'}
                >
                  +91 9962060337 <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div ref={formRef}>
          {status === 'success' ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: '100%',
              padding: '2.5rem 0',
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.2rem',
                fontSize: '1.1rem',
                color: '#F5F4F0',
              }}>
                ✓
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#F5F4F0',
                marginBottom: '0.6rem',
              }}>
                Message received.
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: '#666666',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                maxWidth: '400px',
                marginBottom: '1.8rem',
              }}>
                Thank you! Your project details were sent directly to Bharath. We'll get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{
                  background: 'none',
                  border: '1px solid #333333',
                  borderRadius: '9999px',
                  color: '#888888',
                  padding: '0.55rem 1.2rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F5F4F0'; e.currentTarget.style.borderColor = '#666666' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888888'; e.currentTarget.style.borderColor = '#333333' }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#555555'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#555555'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
              </div>

              <div>
                <label style={labelStyle}>Project details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, timeline, and budget..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={e => e.target.style.borderColor = '#555555'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
              </div>

              {errorMsg && (
                <div style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '6px',
                  color: '#f87171',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-body)',
                }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  fontFamily: 'var(--font-body)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: status === 'submitting' ? '#888888' : '#F5F4F0',
                  color: '#111111',
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  padding: '0.85rem 1.8rem',
                  marginTop: '0.3rem',
                  alignSelf: 'flex-start',
                  transition: 'transform 0.25s ease, background-color 0.25s ease',
                  letterSpacing: '0',
                  opacity: status === 'submitting' ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'scale(0.97)'
                    e.currentTarget.style.backgroundColor = '#ffffff'
                  }
                }}
                onMouseLeave={e => {
                  if (status !== 'submitting') {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.backgroundColor = '#F5F4F0'
                  }
                }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message ↗'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            padding: 5rem 1.25rem !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .founder-signature-card {
            border: 1px solid #222222 !important;
            border-radius: 12px !important;
            padding: 1.2rem !important;
            margin-top: 1.8rem !important;
            background-color: #141414 !important;
          }
        }
      `}</style>
    </section>
  )
}
