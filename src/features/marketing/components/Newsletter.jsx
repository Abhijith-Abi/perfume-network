import React, { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <h2 className="newsletter__title">Join the Inner Circle</h2>
        <p className="newsletter__subtitle">
          Be the first to discover new arrivals, exclusive offers, and curated
          fragrance recommendations.
        </p>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            className="newsletter__input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter__submit">Subscribe</button>
        </form>
      </div>
    </section>
  )
}