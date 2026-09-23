import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function LoginPage() {
  const { login, isAdmin, isUser, loginError, isLoggingIn, setLoginError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [localErrors, setLocalErrors] = useState({})
  const [detectedRole, setDetectedRole] = useState(null)

  useEffect(() => {
    setLoginError('')
    setLocalErrors({})
  }, [setLoginError])

  // Detect role as user types email
  useEffect(() => {
    const trimmed = email.toLowerCase().trim()
    if (trimmed === 'admin@perfumenetwork.in') {
      setDetectedRole('admin')
    } else if (trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setDetectedRole('user')
    } else {
      setDetectedRole(null)
    }
  }, [email])

  // Already logged in as admin → go to admin panel
  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  // Already logged in as regular user → go to home
  if (isUser && !isAdmin) {
    return <Navigate to="/" replace />
  }

  const validate = () => {
    const errors = {}
    if (!email.trim()) {
      errors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors)
      return
    }
    setLocalErrors({})
    await login(email, password)
  }

  const displayError = localErrors.email || localErrors.password || loginError

  return (
    <div className="auth-page">
      <div className="auth-page__bg" />

      <div className="auth-layout">
        {/* Left — Branding Panel */}
        <div className="auth-branding">
          <div className="auth-branding__inner">
            <div className="auth-branding__emblem">
              <svg viewBox="0 0 80 80" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="40" cy="40" r="38" stroke="currentColor" fill="none" />
                <circle cx="40" cy="40" r="28" stroke="currentColor" fill="none" />
                <path d="M40 12 L40 68" stroke="currentColor" />
                <path d="M12 40 L68 40" stroke="currentColor" />
                <circle cx="40" cy="40" r="6" stroke="currentColor" fill="none" />
              </svg>
            </div>

            <h2 className="auth-branding__name">Perfume Network</h2>
            <p className="auth-branding__tagline">Fine Fragrance Boutique</p>

            <div className="auth-branding__divider" />

            <p className="auth-branding__text">
              Access your personal fragrance universe. Track orders, save your
              favourites, and receive bespoke recommendations curated just for you.
            </p>

            <div className="auth-branding__features">
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span>Personalised Profile</span>
              </div>
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <span>Order Tracking</span>
              </div>
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span>Exclusive Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h1 className="auth-form-header__title">Welcome Back</h1>
              <p className="auth-form-header__subtitle">
                Sign in to your account to continue
              </p>
            </div>

            {/* Live role indicator */}
            {detectedRole && (
              <div className={`auth-role-badge auth-role-badge--${detectedRole}`}>
                {detectedRole === 'admin' ? (
                  <>
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Admin Account Detected</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Customer Account</span>
                  </>
                )}
              </div>
            )}

            {/* Error banner */}
            {displayError && (
              <div className="auth-form__banner-error">
                <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{displayError}</span>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className={`auth-form__group${localErrors.email ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="login-email">
                  Email Address
                </label>
                <div className="auth-form__input-wrap">
                  <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="login-email"
                    className="auth-form__input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setLocalErrors((prev) => ({ ...prev, email: '' }))
                      setLoginError('')
                    }}
                    autoComplete="email"
                  />
                </div>
                {localErrors.email && <p className="auth-form__error">{localErrors.email}</p>}
              </div>

              <div className={`auth-form__group${localErrors.password ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="login-password">
                  Password
                </label>
                <div className="auth-form__input-wrap">
                  <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    id="login-password"
                    className="auth-form__input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setLocalErrors((prev) => ({ ...prev, password: '' }))
                      setLoginError('')
                    }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="auth-form__toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {localErrors.password && <p className="auth-form__error">{localErrors.password}</p>}
              </div>

              <div className="auth-form__row">
                <label className="auth-form__checkbox-label">
                  <input
                    type="checkbox"
                    className="auth-form__checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-form__checkbox-custom" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth-form__forgot">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className={`auth-form__submit${isLoggingIn ? ' loading' : ''}`}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="auth-form__spinner" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="auth-form__divider">
              <span>or continue with</span>
            </div>

            <div className="auth-socials">
              <button className="auth-socials__btn" type="button">
                <svg viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="auth-socials__btn" type="button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X
              </button>
              <button className="auth-socials__btn" type="button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </button>
            </div>

            <p className="auth-form__switch">
              Don't have an account?{' '}
              <Link to="/register" className="auth-form__switch-link">
                Create one now
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="auth-demo-hint">
              <p className="auth-demo-hint__title">Demo Credentials</p>
              <div className="auth-demo-hint__grid">
                <div className="auth-demo-hint__card">
                  <div className="auth-demo-hint__card-header">
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Admin</span>
                  </div>
                  <div className="auth-demo-hint__row">
                    <code>admin@perfumenetwork.in</code>
                  </div>
                  <div className="auth-demo-hint__row">
                    <code>admin@123</code>
                  </div>
                  <p className="auth-demo-hint__arrow">Goes to Admin Panel</p>
                </div>
                <div className="auth-demo-hint__card">
                  <div className="auth-demo-hint__card-header">
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Customer</span>
                  </div>
                  <div className="auth-demo-hint__row">
                    <code>any@email.com</code>
                  </div>
                  <div className="auth-demo-hint__row">
                    <code>any 6+ chars</code>
                  </div>
                  <p className="auth-demo-hint__arrow">Goes to Home</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}