import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const brands = [
  { name: 'React', symbol: '⬡' },
  { name: 'FastAPI', symbol: '⚡' },
  { name: 'PostgreSQL', symbol: '🐘' },
  { name: 'Docker', symbol: '🐳' },
  { name: 'AWS', symbol: '☁' },
  { name: 'Firebase', symbol: '🔥' },
  { name: 'Python', symbol: '🐍' },
  { name: 'Flask', symbol: '⚗' },
]

export default function TrustStrip() {
  const stripRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      stripRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: stripRef.current,
          start: 'top 90%',
        }
      }
    )
  }, [])

  return (
    <section
      ref={stripRef}
      style={{
        backgroundColor: '#F5F4F0',
        padding: '2.5rem 1.5rem 4rem',
        textAlign: 'center',
        borderTop: '1px solid #E0DFD9',
      }}
    >
      <p style={{
        fontSize: '0.78rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#aaaaaa',
        marginBottom: '1.8rem',
        fontWeight: 500,
      }}>
        Built with modern technologies
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem 3rem',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {brands.map((brand) => (
          <div
            key={brand.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#888888',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              transition: 'color 0.2s ease',
              cursor: 'default',
              userSelect: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#111111'}
            onMouseLeave={e => e.currentTarget.style.color = '#888888'}
          >
            <span style={{ fontSize: '1rem', filter: 'grayscale(1)' }}>{brand.symbol}</span>
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
