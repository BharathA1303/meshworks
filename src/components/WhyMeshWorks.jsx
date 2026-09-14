import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    number: '01',
    title: 'Fast Delivery',
    description: 'We ship MVPs in weeks, not months. Agile development with weekly check-ins keeps you in control and on schedule.',
  },
  {
    number: '02',
    title: 'Transparent Pricing',
    description: 'No hidden costs, no scope creep surprises. You get a fixed quote upfront and we stick to it — or we talk first.',
  },
  {
    number: '03',
    title: 'Modern Stack',
    description: 'We use the same technologies as the best teams in the industry. React, FastAPI, Docker, AWS — built to scale.',
  },
  {
    number: '04',
    title: 'End-to-end Support',
    description: 'From discovery to deployment and beyond. We maintain, monitor, and iterate on what we build — long after launch.',
  },
]

export default function WhyMeshWorks() {
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    gsap.fromTo(headlineRef.current,
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', toggleActions: 'play none none none' }
      }
    )

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.95,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })
  }, [])

  return (
    <section style={{ backgroundColor: '#111111', padding: '7rem 1.5rem', color: '#F5F4F0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <p ref={labelRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#444444',
            marginBottom: '1.2rem',
            fontWeight: 400,
          }}>
            Why MeshWorks
          </p>
          <h2 ref={headlineRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#F5F4F0',
            maxWidth: '600px',
          }}>
            Serious software.<br />
            <span style={{ color: '#555555' }}>Without the enterprise overhead.</span>
          </h2>
        </div>

        {/* Values grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}>
          {values.map((v, i) => (
            <div
              key={v.number}
              ref={el => cardsRef.current[i] = el}
              style={{
                padding: '2.5rem 2rem 2.5rem 0',
                borderLeft: i > 0 ? '1px solid #1e1e1e' : 'none',
                paddingLeft: i > 0 ? '2rem' : '0',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: '#383838',
                fontWeight: 400,
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '1.5rem',
              }}>
                {v.number}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#F5F4F0',
                marginBottom: '0.8rem',
              }}>
                {v.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: '#555555',
                fontSize: '0.875rem',
                lineHeight: 1.8,
              }}>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
