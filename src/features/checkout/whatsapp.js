import { WHATSAPP_NUMBER, STORE_NAME, formatPrice } from '@/lib'

// Builds a clean, readable WhatsApp order message and returns the wa.me URL.
export function buildWhatsAppOrder({ orderId, cart, customer, subtotal, shipping, total }) {
  const lines = []

  lines.push(`*New Order — ${STORE_NAME}*`)
  lines.push(`Order ID: ${orderId}`)
  lines.push('')
  lines.push('*Items*')

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.brand} ${item.name} (${item.size})`)
    lines.push(
      `   Qty: ${item.qty} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.qty)}`,
    )
  })

  lines.push('')
  lines.push(`Subtotal: ${formatPrice(subtotal)}`)
  lines.push(`Shipping: ${shipping === 0 ? 'Free' : formatPrice(shipping)}`)
  lines.push(`*Total: ${formatPrice(total)}*`)
  lines.push('')
  lines.push('*Customer Details*')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  if (customer.email) lines.push(`Email: ${customer.email}`)
  lines.push('')
  lines.push('*Delivery Address*')
  lines.push(customer.address)
  lines.push(`${customer.city}, ${customer.state} — ${customer.pincode}`)
  if (customer.notes) {
    lines.push('')
    lines.push(`*Notes:* ${customer.notes}`)
  }

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function generateOrderId() {
  const now = new Date()
  const stamp =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `PN-${stamp}-${rand}`
}
