import React from 'react'
import ScentCard from './ScentCard'
import { products } from '../data/products'

// Curated highlight selection from the catalogue.
const featuredIds = ['tf-oud-wood', 'initio-oud-greatness', 'mfk-oud-satin', 'dior-sauvage-elixir']
const featured = featuredIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean)

export default function FeaturedScents() {
  return (
    <section className="featured">
      <div className="section-header">
        <p className="section-header__eyebrow">Hand-Picked For You</p>
        <h2 className="section-header__title">Featured Fragrances</h2>
      </div>
      <div className="featured__grid">
        {featured.map((scent) => (
          <ScentCard key={scent.id} {...scent} />
        ))}
      </div>
    </section>
  )
}
