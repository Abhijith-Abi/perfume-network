import React, { useState } from 'react'

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (orderId && email) {
      alert(`Tracking order ${orderId}...`)
    }
  }

  return (
    <>
      <section className="page-hero">
        <p className="page-hero__eyebrow">Order Status</p>
        <h1 className="page-hero__title">Track Your Order</h1>
        <p className="page-hero__subtitle">
          Enter your order number and email address to get real-time updates
          on your shipment.
        </p>
        <div className="page-hero__line" />
      </section>

      <section className="page-content page-content--surface">
        <form className="track-form" onSubmit={handleSubmit}>
          <div className="track-form__group">
            <label className="track-form__label" htmlFor="order-id">Order Number</label>
            <input
              id="order-id"
              className="track-form__input"
              type="text"
              placeholder="e.g. PN-2026-00458"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>
          <div className="track-form__group">
            <label className="track-form__label" htmlFor="order-email">Email Address</label>
            <input
              id="order-email"
              className="track-form__input"
              type="email"
              placeholder="The email used during checkout"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="track-form__submit">
            Track Order
          </button>
        </form>
      </section>

      <section className="page-content">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <p className="section-header__eyebrow">Need Help?</p>
            <h2 className="section-header__title" style={{ fontSize: '1.6rem' }}>Shipping Information</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                2-4 Days
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Metro Cities
              </p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                5-7 Days
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Other Pin Codes
              </p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                ₹2,999+
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Free Shipping
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}