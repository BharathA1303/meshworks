import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We dig into your business, users, and goals. No assumptions — just honest discovery.',
    icon: '◎',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    description: "Before building, we start with architecture design — database schemas, system blueprints, and technical specs so the build is fast, predictable, and rock-solid.",
    icon: '◈',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Iterative development with weekly demos. You stay in the loop. We ship features that work.',
    icon: '◆',
  },
  {
    number: '04',
    title: 'Deploy',
    description: "Production launch with CI/CD, monitoring, and full handoff documentation. We don't disappear after go-live.",
    icon: '◉',
  },
]

export default function Process() {
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const lineRef = useRef(null)
  const stepsRef = useRef([])

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
        opacity: 1, y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', toggleActions: 'play none none none' }
      }
    )

    // Connector line draws from left
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: lineRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    stepsRef.current.forEach((step, i) => {
      if (!step) return
      gsap.fromTo(step,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: i * 0.13,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })
  }, [])

  return (
    <section
      id="process"
      style={{ backgroundColor: '#F5F4F0', padding: '7rem 1.5rem', borderTop: '1px solid #E0DFD9' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '5rem' }}>
          <p ref={labelRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '1.2rem',
            fontWeight: 400,
          }}>
            How We Work
          </p>
          <h2 ref={headlineRef} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#111111',
            marginBottom: '1.2rem',
          }}>
            A process you can<br />actually trust.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)',
            color: '#666666',
            lineHeight: 1.7,
            maxWidth: '560px',
          }}>
            <strong style={{ color: '#111111', fontWeight: 600 }}>Before building, we start with architecture design.</strong>{' '}
            We blueprint system topology, database schemas, and data pipelines before writing a single line of code.
          </p>
        </div>

        {/* Connecting line */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div ref={lineRef} style={{ height: '1px', backgroundColor: '#D0CEC8', transformOrigin: 'left center' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem 2rem',
        }}>
          {steps.map((step, i) => (
            <div key={step.number} ref={el => stepsRef.current[i] = el}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem' }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  color: '#aaaaaa',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                }}>
                  {step.number}
                </span>
                <span style={{ fontSize: '1rem', color: '#111111', lineHeight: 1 }}>{step.icon}</span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                color: '#111111',
                marginBottom: '0.7rem',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: '#888888',
                fontSize: '0.875rem',
                lineHeight: 1.8,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
