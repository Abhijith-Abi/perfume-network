import React from 'react'
import { Link } from 'react-router-dom'

export default function SamplingPage() {
  return (
    <>
      <section className="page-hero">
        <p className="page-hero__eyebrow">Discover Without Risk</p>
        <h1 className="page-hero__title">Sampling Program</h1>
        <p className="page-hero__subtitle">
          Experience designer and niche fragrances through curated decants &mdash;
          find your signature scent before investing in a full bottle.
        </p>
        <div className="page-hero__line" />
      </section>

      <section className="page-content page-content--surface">
        <div className="sampling-hero">
          <div className="sampling-hero__text">
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
              <p className="section-header__eyebrow">How It Works</p>
              <h2 className="section-header__title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                Three Simple Steps
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: '24px', fontSize: '0.92rem' }}>
              Our sampling program lets you explore hundreds of luxury fragrances in
              convenient 2ml and 5ml decants. Each sample is hand-decanted from
              authentic bottles in a climate-controlled environment.
            </p>
            <Link to="/contact" className="hero__cta-primary" style={{ display: 'inline-flex' }}>
              <span>Get Started</span>
            </Link>
          </div>
          <div className="sampling-hero__visual">
            <div className="sampling-hero__icon">
              <svg viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content">
        <div className="sampling-steps">
          <div className="sampling-step">
            <div className="sampling-step__number">01</div>
            <h3 className="sampling-step__title">Browse &amp; Select</h3>
            <p className="sampling-step__desc">
              Choose from over 500 designer and niche fragrances. Add individual
              samples or curated discovery sets to your cart.
            </p>
          </div>
          <div className="sampling-step">
            <div className="sampling-step__number">02</div>
            <h3 className="sampling-step__title">We Decant</h3>
            <p className="sampling-step__desc">
              Each sample is carefully hand-decanted from authentic full-size bottles
              into premium glass atomizers with secure caps.
            </p>
          </div>
          <div className="sampling-step">
            <div className="sampling-step__number">03</div>
            <h3 className="sampling-step__title">Wear &amp; Decide</h3>
            <p className="sampling-step__desc">
              Test each fragrance over several days. When you find your favourite,
              purchase the full bottle with a sampling credit applied.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}