import React from 'react'
import CategoryPage from '../components/CategoryPage'

const filters = ['All', 'Oud', 'Amber', 'Rose']

const matchFilter = (p, filter) => p.notes.toLowerCase().includes(filter.toLowerCase())

export default function MiddleEasternPage() {
  return (
    <CategoryPage
      category="middle-eastern"
      eyebrow="Timeless Traditions"
      title="Middle Eastern"
      subtitle="Rich, opulent fragrances rooted in centuries of Arabian perfumery — oud, amber, saffron, and rose in their most magnificent forms."
      filters={filters}
      matchFilter={matchFilter}
    />
  )
}
