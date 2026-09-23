import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useStore } from '@/features/cart'
import { ROUTES, formatPrice } from '@/lib'
import { buildWhatsAppOrder, generateOrderId } from './whatsapp'

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  notes: '',
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, subtotal, shipping, total, clearCart } = useStore()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
      next.phone = 'Enter a valid 10-digit phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email'
    if (!form.address.trim()) next.address = 'Address is required'
    if (!form.city.trim()) next.city = 'City is required'
    if (!form.state.trim()) next.state = 'State is required'
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a valid 6-digit pincode'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cart.length === 0) return
    if (!validate()) return

    const orderId = generateOrderId()
    const order = {
      orderId,
      cart,
      customer: form,
      subtotal,
      shipping,
      total,
      placedAt: new Date().toISOString(),
    }

    // Open WhatsApp with the pre-filled order message.
    const waUrl = buildWhatsAppOrder(order)
    window.open(waUrl, '_blank', 'noopener')

    // Persist last order for the success page, then clear the cart.
    sessionStorage.setItem('pn_last_order', JSON.stringify(order))
    clearCart()
    navigate(ROUTES.checkoutSuccess, { state: { order } })
  }

  if (cart.length === 0) {
    return (
      <section className="checkout checkout--empty">
        <h1 className="page-hero__title">Your bag is empty</h1>
        <p className="page-hero__subtitle">
          Add a few fragrances before heading to checkout.
        </p>
        <Link to={ROUTES.designer} className="hero__cta-primary">
          <span>Browse Fragrances</span>
        </Link>
      </section>
    )
  }

  const field = (name, label, props = {}) => (
    <div className={`form-field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={form[name]} onChange={handleChange} {...props} />
      {errors[name] && <span className="form-field__error">{errors[name]}</span>}
    </div>
  )

  return (
    <section className="checkout">
      <div className="checkout__header">
        <p className="page-hero__eyebrow">Almost There</p>
        <h1 className="checkout__title">Checkout</h1>
      </div>

      <div className="checkout__grid">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <h2 className="checkout__section-title">Contact &amp; Delivery</h2>
          <div className="form-grid">
            {field('name', 'Full Name', { placeholder: 'e.g. Aarav Mehta', autoComplete: 'name' })}
            {field('phone', 'Phone Number', {
              placeholder: '10-digit mobile',
              inputMode: 'tel',
              autoComplete: 'tel',
            })}
          </div>
          {field('email', 'Email (optional)', {
            type: 'email',
            placeholder: 'you@example.com',
            autoComplete: 'email',
          })}
          <div className="form-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              placeholder="House no., street, area / landmark"
            />
            {errors.address && <span className="form-field__error">{errors.address}</span>}
          </div>
          <div className="form-grid form-grid--3">
            {field('city', 'City', { placeholder: 'City' })}
            {field('state', 'State', { placeholder: 'State' })}
            {field('pincode', 'Pincode', {
              placeholder: '6-digit',
              inputMode: 'numeric',
              maxLength: 6,
            })}
          </div>
          <div className="form-field">
            <label htmlFor="notes">Order Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={form.notes}
              onChange={handleChange}
              placeholder="Any special instructions"
            />
          </div>

          <button type="submit" className="checkout__submit">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
            </svg>
            Place Order via WhatsApp
          </button>
          <p className="checkout__hint">
            Your order summary will open in WhatsApp so we can confirm and arrange delivery.
          </p>
        </form>

        <aside className="checkout__summary">
          <h2 className="checkout__section-title">Order Summary</h2>
          <div className="checkout__items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item__image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} loading="lazy" />
                  ) : (
                    <span>{item.brand?.slice(0, 2).toUpperCase()}</span>
                  )}
                  <span className="checkout-item__qty">{item.qty}</span>
                </div>
                <div className="checkout-item__info">
                  <p className="checkout-item__name">{item.name}</p>
                  <p className="checkout-item__meta">{item.brand} · {item.size}</p>
                </div>
                <p className="checkout-item__price">{formatPrice(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
          <div className="checkout__totals">
            <div className="checkout__line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="checkout__line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="checkout__line checkout__line--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
