import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    /* ── Initial states (identical on desktop & mobile) ────────────── */
    gsap.set([line1Ref.current, line2Ref.current], { y: '110%', opacity: 0 })
    gsap.set(subRef.current, { y: 24, opacity: 0 })
    gsap.set(ctaRef.current, { y: 18, opacity: 0 })
    gsap.set(imageRef.current, { opacity: 0, scale: 1.04 })

    const tl = gsap.timeline({ delay: 0.35 })

    /* ── Headline lines — clip reveal from below ───────────────────── */
    tl.to(line1Ref.current, {
      y: '0%', opacity: 1,
      duration: 1.15,
      ease: 'power4.out',
    })
      .to(line2Ref.current, {
        y: '0%', opacity: 1,
        duration: 1.15,
        ease: 'power4.out',
      }, '-=0.8')

      /* ── Subtext reveal ────────────────────────────────────────────── */
      .to(subRef.current, {
        y: 0, opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.65')

      /* ── CTA button reveal ─────────────────────────────────────────── */
      .to(ctaRef.current, {
        y: 0, opacity: 1,
        duration: 0.75,
        ease: 'power3.out',
      }, '-=0.55')

      /* ── Hands — cinematic fade-in + de-scale (identical on mobile & laptop) ── */
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.9,
        ease: 'power2.inOut',
      }, 0.15)

    return () => {
      tl.kill()
    }
  }, [])

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#F5F4F0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1: ORGANIC GREY PATCHES OVERLAY
          Analysed from reference image: heavy mottled grey patches in
          corners, along left/right flanks, and behind mechanical elements
      ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          backgroundImage: [
            /* Top-Left heavy organic grey patch */
            'radial-gradient(ellipse 52% 44% at 6% 10%, rgba(115, 113, 107, 0.32) 0%, rgba(140, 138, 132, 0.18) 45%, transparent 75%)',
            /* Far-Left mid patch (behind robotic arm) */
            'radial-gradient(ellipse 46% 54% at 1% 48%, rgba(105, 103, 97, 0.36) 0%, rgba(135, 133, 127, 0.18) 45%, transparent 80%)',
            /* Top-Right heavy grey patch */
            'radial-gradient(ellipse 48% 38% at 94% 10%, rgba(115, 113, 107, 0.28) 0%, rgba(145, 143, 137, 0.14) 45%, transparent 75%)',
            /* Far-Right mid patch (behind human arm) */
            'radial-gradient(ellipse 46% 50% at 99% 52%, rgba(110, 108, 102, 0.28) 0%, rgba(140, 138, 132, 0.14) 50%, transparent 80%)',
            /* Mid-Left patch (between headline and robotic arm) */
            'radial-gradient(ellipse 34% 28% at 20% 36%, rgba(125, 123, 117, 0.22) 0%, transparent 65%)',
            /* Mid-Right patch (above human arm) */
            'radial-gradient(ellipse 35% 26% at 80% 34%, rgba(125, 123, 117, 0.2) 0%, transparent 65%)',
            /* Upper-Center subtle cloud */
            'radial-gradient(ellipse 38% 22% at 50% 10%, rgba(135, 133, 127, 0.16) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Organic mottled fractal noise blotches (simulating paper wash & xerox ink patches) */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          opacity: 0.28,
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 82%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 82%)',
        }}
      >
        <filter id="hero-organic-patches">
          <feTurbulence type="fractalNoise" baseFrequency="0.007 0.009" numOctaves="4" seed="36" result="turb" />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.22
              0 0 0 0 0.22
              0 0 0 0 0.20
              1.5 0 0 0 -0.42"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-organic-patches)" />
      </svg>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2: HANDS IMAGE
          Extends all the way to bottom: 0 so its natural white
          background flows seamlessly into the bottom trust strip
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={imageRef}
        className="hero-hands"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '44%',
          left: '-4%',
          right: '-4%',
          bottom: 0,
          zIndex: 2,
          mixBlendMode: 'multiply',
        }}
      >
        {/* Top edge — smooth transition into background */}
        <div className="hero-edge-fade hero-top-fade" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '42%',
          background: 'linear-gradient(to bottom, #F5F4F0 0%, rgba(245,244,240,0.5) 45%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Left edge */}
        <div className="hero-edge-fade hero-side-fade" style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, #F5F4F0, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Right edge */}
        <div className="hero-edge-fade hero-side-fade" style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '120px',
          background: 'linear-gradient(to left, #F5F4F0, transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <img
          src="/hands.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 46%',
            display: 'block',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3: HALFTONE STIPPLE & DITHER SCREEN OVERLAY
          z-index 3: sits above background & hands, giving authentic
          editorial halftone dot grid & fine film grain across the whole canvas
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={grainRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          backgroundImage: [
            /* 45-degree halftone dot matrix matching reference image */
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Ccircle cx='3' cy='3' r='0.85' fill='%23111111' opacity='0.16'/%3E%3Ccircle cx='0' cy='0' r='0.5' fill='%23111111' opacity='0.08'/%3E%3Ccircle cx='6' cy='0' r='0.5' fill='%23111111' opacity='0.08'/%3E%3Ccircle cx='0' cy='6' r='0.5' fill='%23111111' opacity='0.08'/%3E%3Ccircle cx='6' cy='6' r='0.5' fill='%23111111' opacity='0.08'/%3E%3C/svg%3E")`,
            /* Fine film grain stipple */
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.09'/%3E%3C/svg%3E")`,
          ].join(', '),
          backgroundRepeat: 'repeat, repeat',
          backgroundSize: '6px 6px, 180px 180px',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4: TEXT CONTENT  —  z-index 4, compact upper placement
          Headline + subtext + Get In Touch button sits high with
          healthy breathing space before the hands reach in
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="hero-text"
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          paddingTop: '5.6rem',   /* comfortable clearance below navbar */
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#111111',
            marginBottom: '0.9rem',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
          }}
        >
          {/* Each line wrapped in overflow:hidden for clip-from-below reveal */}
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
            <span ref={line1Ref} style={{ display: 'block' }}>
              Software Built to Last.
            </span>
          </span>
          <span style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}>
            <span ref={line2Ref} style={{ display: 'block' }}>
              Priced to Start.
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.875rem, 1.6vw, 0.98rem)',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.6,
            maxWidth: '410px',
            margin: '0 auto 1.35rem auto',
          }}
        >
          We build production-grade software for startups and small
          businesses — without the enterprise price tag.
        </p>

        <div ref={ctaRef}>
          <button
            onClick={scrollToContact}
            style={{
              fontFamily: 'var(--font-body)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#111111',
              color: '#F5F4F0',
              borderRadius: '9999px',
              border: 'none',
              fontWeight: 500,
              fontSize: '0.88rem',
              cursor: 'pointer',
              padding: '0.75rem 1.65rem',
              letterSpacing: '0',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(0.96)'; e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1' }}
          >
            Get In Touch <span style={{ fontSize: '0.95rem' }}>↗</span>
          </button>
        </div>
      </div>

      <style>{`
        /* ── Mobile view (< 768px): Full-viewport seamless hero with hands framing the lower screen ── */
        @media (max-width: 768px) {
          #hero {
            min-height: 100svh !important;
            height: 100svh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            position: relative !important;
            overflow: hidden !important;
          }

          /* Hero text shifted down towards the center to cover dead space */
          .hero-text {
            padding-top: clamp(7.2rem, 15svh, 8.8rem) !important;
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
            z-index: 4 !important;
            position: relative !important;
          }

          .hero-text h1 {
            font-size: clamp(1.85rem, 8vw, 2.35rem) !important;
            line-height: 1.14 !important;
            margin-bottom: 0.8rem !important;
          }

          .hero-text p {
            font-size: 0.86rem !important;
            line-height: 1.6 !important;
            max-width: 325px !important;
            margin: 0 auto 1.3rem auto !important;
            color: #555555 !important;
          }

          /* The hands image covers the entire hero canvas seamlessly — ONE combined section */
          .hero-hands {
            position: absolute !important;
            inset: 0 !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 2 !important;
            mix-blend-mode: multiply !important;
            pointer-events: none !important;
          }

          .hero-hands img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center 74% !important;
            mix-blend-mode: multiply !important;
          }

          /* Seamless continuous canvas — hide separate edge fade boxes on mobile */
          .hero-edge-fade {
            display: none !important;
          }
        }

        /* ── Laptop view (> 768px) is strictly preserved as in image 2 ── */
      `}</style>
    </section>
  )
}
