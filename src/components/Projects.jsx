import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'credx',
    number: '01',
    name: 'CredX',
    year: '2024',
    category: 'Security · Verification',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
    description:
      'Secure academic document verification platform with encrypted file handling, multi-factor authentication, and role-based access control.',
    featured: true,
  },
  {
    id: 'stockpulse',
    number: '02',
    name: 'StockPulse India',
    year: '2024',
    category: 'Finance · Trading',
    tags: ['React', 'Python', 'FastAPI', 'SQLite'],
    description:
      'Real-time Indian stock market trading platform with live data feeds, watchlists, and a full order book.',
    featured: false,
  },
  {
    id: 'hive',
    number: '03',
    name: 'Hive',
    year: '2024',
    category: 'Education · Real-time',
    tags: ['React', 'Flask', 'Socket.IO', 'Docker'],
    description:
      'Real-time academic portal for students, faculty, and HODs — with live messaging, announcements, and Firebase storage.',
    featured: false,
  },
  {
    id: 'notesdock',
    number: '04',
    name: 'NotesDock',
    year: '2023',
    category: 'Cloud · PWA',
    tags: ['Flask', 'AWS EC2', 'AWS S3'],
    description:
      'Cloud notes platform and PWA with 2,300+ visits and 1,000+ downloads. Offline-ready, fast, and lightweight.',
    featured: false,
  },
  {
    id: 'veribuy',
    number: '05',
    name: 'VeriBuy',
    year: '2024',
    category: 'AI · Consumer',
    tags: ['Flask', 'Gemini API', 'BeautifulSoup'],
    description:
      'AI-powered fake product detection platform. Analyses listings in real time using LLM reasoning and web scraping.',
    featured: false,
  },
]

function ProjectCard({ project, index, cardRef }) {
  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        backgroundColor: '#ECEAE4',
        borderRadius: '16px',
        padding: '2.4rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.4rem',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background-color 0.4s ease, transform 0.4s ease',
        minHeight: project.featured ? '280px' : '260px',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.backgroundColor = '#111111'
        el.style.transform = 'translateY(-4px)'
        el.querySelectorAll('[data-flip="text"]').forEach(n => n.style.color = '#F5F4F0')
        el.querySelectorAll('[data-flip="muted"]').forEach(n => n.style.color = '#666666')
        el.querySelectorAll('[data-flip="tag"]').forEach(n => { n.style.borderColor = '#2a2a2a'; n.style.color = '#777777' })
        el.querySelectorAll('[data-flip="category"]').forEach(n => n.style.color = '#444444')
        el.querySelectorAll('[data-flip="num"]').forEach(n => n.style.color = '#1e1e1e')
        el.querySelectorAll('[data-flip="arrow"]').forEach(n => n.style.opacity = '1')
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.backgroundColor = '#ECEAE4'
        el.style.transform = 'translateY(0)'
        el.querySelectorAll('[data-flip="text"]').forEach(n => n.style.color = '#111111')
        el.querySelectorAll('[data-flip="muted"]').forEach(n => n.style.color = '#888888')
        el.querySelectorAll('[data-flip="tag"]').forEach(n => { n.style.borderColor = '#D0CEC8'; n.style.color = '#888888' })
        el.querySelectorAll('[data-flip="category"]').forEach(n => n.style.color = '#aaaaaa')
        el.querySelectorAll('[data-flip="num"]').forEach(n => n.style.color = '#E0DED8')
        el.querySelectorAll('[data-flip="arrow"]').forEach(n => n.style.opacity = '0')
      }}
    >
      {/* Decorative background number */}
      <span
        data-flip="num"
        style={{
          position: 'absolute',
          bottom: '-0.5rem',
          right: '1.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          fontWeight: 800,
          color: '#E0DED8',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          transition: 'color 0.4s ease',
          letterSpacing: '-0.05em',
        }}
      >
        {project.number}
      </span>

      {/* Top row — category pill + year + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          data-flip="category"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            transition: 'color 0.4s ease',
          }}
        >
          {project.category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span
            data-flip="muted"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: '#888888',
              fontWeight: 400,
              transition: 'color 0.4s ease',
            }}
          >
            {project.year}
          </span>
          <span
            data-flip="arrow"
            style={{
              fontSize: '1rem',
              color: '#F5F4F0',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              lineHeight: 1,
            }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Project name */}
      <h3
        data-flip="text"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: project.featured
            ? 'clamp(1.5rem, 3.5vw, 2.2rem)'
            : 'clamp(1.2rem, 2.5vw, 1.6rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: '#111111',
          lineHeight: 1.1,
          transition: 'color 0.4s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        data-flip="muted"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: '#888888',
          lineHeight: 1.75,
          transition: 'color 0.4s ease',
          position: 'relative',
          zIndex: 1,
          maxWidth: project.featured ? '640px' : '100%',
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', position: 'relative', zIndex: 1 }}>
        {project.tags.map(tag => (
          <span
            key={tag}
            data-flip="tag"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.67rem',
              fontWeight: 500,
              color: '#888888',
              border: '1px solid #D0CEC8',
              borderRadius: '9999px',
              padding: '0.22rem 0.7rem',
              transition: 'border-color 0.4s ease, color 0.4s ease',
              letterSpacing: '0.01em',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const labelRef = useRef(null)
  const headlineRef = useRef(null)
  const featuredRef = useRef(null)
  const cardRefs = useRef([])

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

    // Featured card
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 86%', toggleActions: 'play none none none' }
        }
      )
    }

    // Other cards
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 48 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
        }
      )
    })
  }, [])

  const [featured, ...rest] = projects

  return (
    <section id="work" style={{ backgroundColor: '#F5F4F0', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
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
            Selected Work
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
              fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.06,
              color: '#111111',
            }}>
              Products we've<br />shipped.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              maxWidth: '300px',
              color: '#888888',
              fontSize: '0.9rem',
              lineHeight: 1.75,
            }}>
              Real projects. Production-deployed. Built with the same rigor we bring to every engagement.
            </p>
          </div>
        </div>

        {/* Featured card — full width */}
        <div style={{ marginBottom: '1rem' }}>
          <ProjectCard project={featured} index={0} cardRef={featuredRef} />
        </div>

        {/* 2-column grid for rest — responsive */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
          className="projects-grid"
        >
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              cardRef={el => cardRefs.current[i] = el}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  )
}
