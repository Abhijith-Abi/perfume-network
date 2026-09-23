import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function AdminLoginPage() {
  const { adminLogin, isAdmin, loginError, isLoggingIn, setLoginError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    setLoginError('')
    setLocalError('')
  }, [setLoginError])

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')

    if (!email.trim()) {
      setLocalError('Email is required')
      return
    }
    if (!password) {
      setLocalError('Password is required')
      return
    }

    await adminLogin(email, password)
  }

  const displayError = localError || loginError

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg" />

      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Top accent line */}
          <div className="admin-login-card__accent" />

          {/* Shield icon */}
          <div className="admin-login-card__shield">
            <svg viewBox="0 0 48 48" strokeWidth="1" fill="none" stroke="currentColor">
              <path d="M24 4L6 12v12c0 11.1 7.68 21.48 18 24 10.32-2.52 18-12.9 18-24V12L24 4z" />
              <path d="M18 24l4 4 8-8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="admin-login-card__title">Admin Portal</h1>
          <p className="admin-login-card__subtitle">
            Perfume Network &mdash; Secure Access
          </p>

          <div className="admin-login-card__divider" />

          {displayError && (
            <div className="admin-login-card__error">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{displayError}</span>
            </div>
          )}

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-login-form__group">
              <label className="admin-login-form__label">Admin Email</label>
              <div className="admin-login-form__input-wrap">
                <svg className="admin-login-form__icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
                <input
                  className="admin-login-form__input"
                  type="email"
                  placeholder="admin@perfumenetwork.in"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setLocalError('') }}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="admin-login-form__group">
              <label className="admin-login-form__label">Password</label>
              <div className="admin-login-form__input-wrap">
                <svg className="admin-login-form__icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  className="admin-login-form__input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setLocalError('') }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-login-form__toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
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
            </div>

            <button
              type="submit"
              className={`admin-login-form__submit${isLoggingIn ? ' loading' : ''}`}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="admin-login-form__spinner" />
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          <div className="admin-login-card__footer">
            <Link to="/" className="admin-login-card__back">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Store
            </Link>
          </div>
        </div>

        {/* Credentials hint */}
        <div className="admin-login-hint">
          <p className="admin-login-hint__title">Demo Credentials</p>
          <div className="admin-login-hint__row">
            <span className="admin-login-hint__label">Email</span>
            <code className="admin-login-hint__value">admin@perfumenetwork.in</code>
          </div>
          <div className="admin-login-hint__row">
            <span className="admin-login-hint__label">Password</span>
            <code className="admin-login-hint__value">admin@123</code>
          </div>
        </div>
      </div>
    </div>
  )
}