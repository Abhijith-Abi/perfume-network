import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from './StoreContext'
import { ROUTES, formatPrice } from '@/lib'

export default function CartDrawer() {
  const navigate = useNavigate()
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQty,
    subtotal,
    shipping,
    total,
  } = useStore()

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  const goToCheckout = () => {
    setCartOpen(false)
    navigate(ROUTES.checkout)
  }

  return (
    <>
      <div
        className={`cart-backdrop${cartOpen ? ' open' : ''}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`cart-drawer${cartOpen ? ' open' : ''}`} aria-hidden={!cartOpen}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Bag ({cart.length})</h2>
          <button
            className="cart-drawer__close"
            onClick={() => setCartOpen(false)}
            aria-label="Close bag"
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer__empty">
            <svg viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p>Your bag is empty</p>
            <button
              className="cart-drawer__continue"
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} loading="lazy" />
                    ) : (
                      <span>{item.brand?.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="cart-item__details">
                    <p className="cart-item__brand">{item.brand}</p>
                    <h3 className="cart-item__name">{item.name}</h3>
                    <p className="cart-item__size">{item.size}</p>
                    <div className="cart-item__row">
                      <div className="cart-item__qty">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="cart-item__price">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-drawer__line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="cart-drawer__line cart-drawer__line--total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="cart-drawer__checkout" onClick={goToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
