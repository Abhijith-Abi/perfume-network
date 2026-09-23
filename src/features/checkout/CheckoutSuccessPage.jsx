import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES, formatPrice } from '@/lib'
import { buildWhatsAppOrder } from './whatsapp'

export default function CheckoutSuccessPage() {
  const location = useLocation()
  const stored = sessionStorage.getItem('pn_last_order')
  const order = location.state?.order || (stored ? JSON.parse(stored) : null)

  if (!order) {
    return (
      <section className="checkout checkout--empty">
        <h1 className="page-hero__title">No recent order</h1>
        <p className="page-hero__subtitle">Looks like there is no order to show yet.</p>
        <Link to={ROUTES.designer} className="hero__cta-primary">
          <span>Start Shopping</span>
        </Link>
      </section>
    )
  }

  const { orderId, cart, customer, subtotal, shipping, total } = order

  return (
    <section className="success">
      <div className="success__card">
        <div className="success__check">
          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="page-hero__eyebrow">Order Placed</p>
        <h1 className="success__title">Thank you, {customer.name.split(' ')[0]}!</h1>
        <p className="success__subtitle">
          Your order <strong>{orderId}</strong> has been sent to us on WhatsApp.
          We&rsquo;ll confirm the details and arrange delivery shortly.
        </p>

        <div className="success__summary">
          <h2 className="success__summary-title">Order Details</h2>
          <div className="success__items">
            {cart.map((item) => (
              <div key={item.id} className="success-item">
                <span className="success-item__name">
                  {item.brand} {item.name}
                  <em> ({item.size})</em>
                </span>
                <span className="success-item__qty">× {item.qty}</span>
                <span className="success-item__price">
                  {formatPrice(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="success__totals">
            <div className="success__line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="success__line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="success__line success__line--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <div className="success__address">
            <h3>Delivering to</h3>
            <p>{customer.name} · {customer.phone}</p>
            <p>{customer.address}</p>
            <p>{customer.city}, {customer.state} — {customer.pincode}</p>
          </div>
        </div>

        <div className="success__actions">
          <a
            className="hero__cta-primary"
            href={buildWhatsAppOrder(order)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resend on WhatsApp</span>
          </a>
          <Link to={ROUTES.home} className="success__link">Back to Home</Link>
        </div>
      </div>
    </section>
  )
}
