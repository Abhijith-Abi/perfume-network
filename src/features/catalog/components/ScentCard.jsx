import React, { useRef } from 'react'
import { useStore } from '@/features/cart'
import { formatPrice } from '@/lib'

export default function ScentCard(product) {
  const { brand, name, notes, price, size = '100ml', badge, image } = product
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const cardRef = useRef(null)
  const favorite = isFavorite(product.id)

  // 3D tilt on hover — tracks pointer position over the card.
  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  const priceLabel = typeof price === 'number' ? formatPrice(price) : price

  return (
    <div
      ref={cardRef}
      className="scent-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="scent-card__image">
        {badge && <span className="scent-card__badge">{badge}</span>}
        <button
          className={`scent-card__fav${favorite ? ' active' : ''}`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          onClick={() => toggleFavorite(product)}
        >
          <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {image ? (
          <img
            className="scent-card__photo"
            src={image}
            alt={`${brand} ${name}`}
            loading="lazy"
          />
        ) : (
          <span className="scent-card__bottle">{brand?.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="scent-card__info">
        <p className="scent-card__brand">{brand}</p>
        <h3 className="scent-card__name">{name}</h3>
        <p className="scent-card__notes">{notes}</p>
        <div className="scent-card__footer">
          <p className="scent-card__price">
            {priceLabel}
            <span>/{size}</span>
          </p>
          <button
            className="scent-card__add"
            aria-label={`Add ${name} to bag`}
            onClick={() => addToCart(product)}
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
