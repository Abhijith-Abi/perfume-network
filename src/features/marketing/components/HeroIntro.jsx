import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/lib'

export default function HeroIntro() {
  return (
    <section className="hero">
      <div className="hero__bg-pattern" />
      <div className="hero__content">
        <p className="hero__eyebrow">Curated Luxury Fragrances</p>
        <h1 className="hero__title">
          Discover Your<br /><em>Signature Scent</em>
        </h1>
        <div className="hero__divider" />
        <p className="hero__description">
          An exquisite collection of niche, designer, and artisanal perfumes
          from around the world &mdash; each bottle a story waiting to be worn.
        </p>
        <div className="hero__cta-group">
          <Link to={ROUTES.designer} className="hero__cta-primary">
            <span>Explore Collection</span>
          </Link>
        </div>
      </div>
      <div className="hero__scroll-hint">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}