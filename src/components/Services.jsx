import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 'software-dev',
    number: '01',
    title: 'Software Development',
    description:
      'Full-stack applications built with modern frameworks. From architecture to deployment — scalable, maintainable, and production-ready.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'TypeScript'],
  },
  {
    id: 'web-dev',
    number: '02',
    title: 'Web Development',
    description:
      'Pixel-perfect websites and web apps that perform. We obsess over UX, speed, and responsiveness across all devices.',
    tags: ['Next.js', 'Tailwind', 'Vite', 'GSAP'],
  },
  {
    id: 'automation',
    number: '03',
    title: 'Automation',
    description:
      'Eliminate repetitive work. We build smart automation pipelines — data scraping, workflow automation, AI integrations, and scheduled jobs.',
    tags: ['Python', 'Celery', 'Selenium', 'n8n'],
  },
  {
    id: 'deployment',
    number: '04',
    title: 'Deployment',
    description:
      'Zero-downtime deployments with CI/CD pipelines. Docker, cloud-native infrastructure, and reliable rollouts — every time.',
    tags: ['Docker', 'GitHub Actions', 'Nginx', 'Linux'],
  },
  {
    id: 'hosting',
    number: '05',
    title: 'Hosting',
    description:
      'Managed cloud hosting on AWS and GCP. We handle the infrastructure so you can focus on your product. Affordable, reliable, and scalable.',
    tags: ['AWS EC2', 'AWS S3', 'CloudFront', 'Firebase'],
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Section label
    gsap.fromTo(labelRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%', toggleActions: 'play none none none' }
      }
    )

    // Headline — line by line
    gsap.fromTo(headlineRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', toggleActions: 'play none none none' }
      }
    )

    gsap.fromTo(subRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.9, ease: 'power3.out',
        delay: 0.1,
        scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', toggleActions: 'play none none none' }
      }
    )

    // Service rows — staggered smooth reveal
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.85,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{ backgroundColor: '#F5F4F0', padding: '7rem 1.5rem' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '4rem' }}>
          <p ref={labelRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            marginBottom: '1.2rem',
            fontWeight: 400,
          }}>
            What We Do
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <h2 ref={headlineRef} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: '#111111',
              maxWidth: '520px',
            }}>
              End-to-end tech,<br />one studio.
            </h2>
            <p ref={subRef} style={{
              fontFamily: 'var(--font-body)',
              maxWidth: '320px',
              color: '#888888',
              fontSize: '0.92rem',
              lineHeight: 1.75,
            }}>
              From idea to live product — we cover every layer of the stack so you don't have to manage multiple vendors.
            </p>
          </div>
        </div>

        {/* Services list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={el => cardsRef.current[i] = el}
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr auto',
                alignItems: 'start',
                gap: '2rem',
                padding: '2.2rem 0',
                borderTop: '1px solid #E0DFD9',
                transition: 'background-color 0.3s ease, padding 0.3s ease',
                borderRadius: '6px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ECEAE4'
                e.currentTarget.style.padding = '2.2rem 1.2rem'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.padding = '2.2rem 0'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: '#aaaaaa',
                fontWeight: 400,
                letterSpacing: '0.05em',
                paddingTop: '0.3rem',
              }}>
                {service.number}
              </span>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#111111',
                  marginBottom: '0.6rem',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  color: '#888888',
                  fontSize: '0.88rem',
                  lineHeight: 1.75,
                  maxWidth: '500px',
                }}>
                  {service.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                justifyContent: 'flex-end',
                maxWidth: '200px',
              }}
                className="service-tags"
              >
                {service.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    color: '#888888',
                    border: '1px solid #D5D3CE',
                    borderRadius: '9999px',
                    padding: '0.22rem 0.65rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #E0DFD9' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #services { padding: 4.5rem 1.5rem !important; }
        }
        @media (max-width: 640px) {
          .service-tags { display: none !important; }
        }
      `}</style>
    </section>
  )
}
