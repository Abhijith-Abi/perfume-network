import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/features/cart'
import { ScentCard, getProductById } from '@/features/catalog'
import { ROUTES } from '@/lib'

export default function FavoritesPage() {
  const { favorites } = useStore()
  const favProducts = favorites.map((f) => getProductById(f.id)).filter(Boolean)

  return (
    <>
      <section className="page-hero">
        <p className="page-hero__eyebrow">Saved For Later</p>
        <h1 className="page-hero__title">Your Favorites</h1>
        <p className="page-hero__subtitle">
          The scents you loved, all in one place. Add them to your bag whenever you&rsquo;re ready.
        </p>
        <div className="page-hero__line" />
      </section>

      <section className="page-content">
        {favProducts.length === 0 ? (
          <div className="checkout--empty" style={{ padding: '40px 0' }}>
            <p className="page-hero__subtitle">You haven&rsquo;t saved any fragrances yet.</p>
            <Link to={ROUTES.designer} className="hero__cta-primary">
              <span>Discover Fragrances</span>
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {favProducts.map((product) => (
              <ScentCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
