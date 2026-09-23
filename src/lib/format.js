// Shared formatting helpers.

/** Formats a numeric INR amount, e.g. 18500 -> "₹18,500". */
export function formatPrice(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`
}
