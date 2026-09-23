import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number'
    }
    if (!form.password) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Include uppercase, lowercase, and a number'
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert(`Account created for ${form.firstName} ${form.lastName}! Welcome to Perfume Network.`)
      navigate('/login')
    }, 1500)
  }

  const getPasswordStrength = () => {
    const { password } = form
    if (!password) return { level: 0, label: '', color: '' }
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    if (password.length >= 12) score++
    if (score <= 1) return { level: 1, label: 'Weak', color: '#e74c3c' }
    if (score <= 2) return { level: 2, label: 'Fair', color: '#e67e22' }
    if (score <= 3) return { level: 3, label: 'Good', color: '#f1c40f' }
    return { level: 4, label: 'Strong', color: '#2ecc71' }
  }

  const strength = getPasswordStrength()

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
              Join our community of fragrance enthusiasts. Create an account to unlock
              a world of exclusive benefits and personalised experiences.
            </p>

            <div className="auth-branding__features">
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <span>Wishlist &amp; Favourites</span>
              </div>
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <span>Members-Only Drops</span>
              </div>
              <div className="auth-branding__feature">
                <div className="auth-branding__feature-icon">
                  <svg viewBox="0 0 24 24" strokeWidth="1.2" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <span>Fragrance Concierge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Register Form */}
        <div className="auth-form-panel">
          <div className="auth-form-container auth-form-container--register">
            <div className="auth-form-header">
              <h1 className="auth-form-header__title">Create Account</h1>
              <p className="auth-form-header__subtitle">
                Join Perfume Network and discover your signature scent
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="auth-form__name-row">
                <div className={`auth-form__group${errors.firstName ? ' has-error' : ''}`}>
                  <label className="auth-form__label" htmlFor="reg-firstname">
                    First Name
                  </label>
                  <div className="auth-form__input-wrap">
                    <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="reg-firstname"
                      className="auth-form__input"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                  </div>
                  {errors.firstName && <p className="auth-form__error">{errors.firstName}</p>}
                </div>

                <div className={`auth-form__group${errors.lastName ? ' has-error' : ''}`}>
                  <label className="auth-form__label" htmlFor="reg-lastname">
                    Last Name
                  </label>
                  <div className="auth-form__input-wrap">
                    <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="reg-lastname"
                      className="auth-form__input"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                  </div>
                  {errors.lastName && <p className="auth-form__error">{errors.lastName}</p>}
                </div>
              </div>

              <div className={`auth-form__group${errors.email ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="reg-email">
                  Email Address
                </label>
                <div className="auth-form__input-wrap">
                  <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    id="reg-email"
                    className="auth-form__input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="auth-form__error">{errors.email}</p>}
              </div>

              <div className={`auth-form__group${errors.phone ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="reg-phone">
                  Phone Number
                </label>
                <div className="auth-form__input-wrap">
                  <span className="auth-form__country-code">+91</span>
                  <input
                    id="reg-phone"
                    className="auth-form__input auth-form__input--phone"
                    type="tel"
                    name="phone"
                    placeholder="98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
                {errors.phone && <p className="auth-form__error">{errors.phone}</p>}
              </div>

              <div className={`auth-form__group${errors.password ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="reg-password">
                  Password
                </label>
                <div className="auth-form__input-wrap">
                  <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input
                    id="reg-password"
                    className="auth-form__input"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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
                {form.password && (
                  <div className="auth-form__strength">
                    <div className="auth-form__strength-bars">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="auth-form__strength-bar"
                          style={{
                            background: i <= strength.level ? strength.color : 'var(--border-subtle)',
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="auth-form__strength-label"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>
                  </div>
                )}
                {errors.password && <p className="auth-form__error">{errors.password}</p>}
              </div>

              <div className={`auth-form__group${errors.confirmPassword ? ' has-error' : ''}`}>
                <label className="auth-form__label" htmlFor="reg-confirm-password">
                  Confirm Password
                </label>
                <div className="auth-form__input-wrap">
                  <svg className="auth-form__input-icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                    <path d="M12 15v2" />
                  </svg>
                  <input
                    id="reg-confirm-password"
                    className="auth-form__input"
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-form__toggle-pw"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? (
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
                {errors.confirmPassword && <p className="auth-form__error">{errors.confirmPassword}</p>}
              </div>

              <div className={`auth-form__terms${errors.terms ? ' has-error' : ''}`}>
                <label className="auth-form__checkbox-label">
                  <input
                    type="checkbox"
                    className="auth-form__checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked)
                      if (errors.terms) setErrors((prev) => ({ ...prev, terms: '' }))
                    }}
                  />
                  <span className="auth-form__checkbox-custom" />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="auth-form__inline-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="auth-form__inline-link">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="auth-form__error">{errors.terms}</p>}
              </div>

              <button
                type="submit"
                className={`auth-form__submit${isSubmitting ? ' loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="auth-form__spinner" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-form__divider">
              <span>or sign up with</span>
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
              Already have an account?{' '}
              <Link to="/login" className="auth-form__switch-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}