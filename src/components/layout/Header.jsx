import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/features/cart'
import { useAuth } from '@/features/auth'
import { ROUTES } from '@/lib'

export default function Header({ searchOpen, setSearchOpen }) {
  const { cartCount, setCartOpen, favorites } = useStore()
  const { isUser, user, logout } = useAuth()

  // Lock background scroll and allow Escape to close the search overlay.
  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : ''
    const onKey = (e) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    if (searchOpen) window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, setSearchOpen])

  return (
    <>
      <header className="header">
        <div className="header__left">
          {isUser ? (
            <div className="header__account">
              <span className="header__account-name" title={user?.email}>
                Hi, {user?.name}
              </span>
              <button className="header__logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={ROUTES.login} className="header__login">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Login
            </Link>
          )}
        </div>

        <Link to={ROUTES.home} className="header__brand">
          <div className="header__brand-name">Perfume Network</div>
          <div className="header__brand-tagline">Fine Fragrance Boutique</div>
        </Link>

        <div className="header__right">
          <button
            className="header__search-toggle"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link to={ROUTES.favorites} className="header__fav-btn" aria-label="Favorites">
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favorites.length > 0 && (
              <span className="header__cart-count">{favorites.length}</span>
            )}
          </Link>

          <button
            className="header__cart-btn"
            aria-label="Shopping bag"
            onClick={() => setCartOpen(true)}
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
          </button>

          <div className="header__region">
            <span>ENG</span>
            <span style={{ color: 'var(--accent-gold)', fontSize: '0.5rem' }}>|</span>
            <span>IN</span>
          </div>
        </div>
      </header>

      <div className={`search-overlay ${searchOpen ? 'open' : ''}`}>
        <button
          className="search-overlay__close"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
        >
          <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="search-overlay__inner">
          <input
            className="search-overlay__input"
            type="text"
            placeholder="Search fragrances..."
            autoFocus={searchOpen}
          />
          <p className="search-overlay__hint">
            Try searching by brand, note, or fragrance name
          </p>
        </div>
      </div>
    </>
  )
}