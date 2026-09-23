import React from 'react'
import CategoryPage from '../components/CategoryPage'

const filters = ['All', 'Bestsellers', 'New Arrivals']

const matchFilter = (p, filter) => {
  if (filter === 'Bestsellers') return ['Bestseller', 'Popular', 'Iconic'].includes(p.badge)
  if (filter === 'New Arrivals') return p.badge === 'New'
  return true
}

export default function DesignerPage() {
  return (
    <CategoryPage
      category="designer"
      eyebrow="Curated Collection"
      title="Designer Fragrances"
      subtitle="Iconic scents from the world's most prestigious fashion houses — crafted with the finest ingredients and unmatched artistry."
      filters={filters}
      matchFilter={matchFilter}
    />
  )
}
