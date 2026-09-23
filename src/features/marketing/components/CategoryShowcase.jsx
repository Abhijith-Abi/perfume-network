import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Designer',
    count: '240+ Fragrances',
    path: '/designer',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Middle Eastern',
    count: '180+ Fragrances',
    path: '/middle-eastern',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    name: 'Niche',
    count: '320+ Fragrances',
    path: '/designer',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    name: 'Minis',
    count: '90+ Fragrances',
    path: '/minis',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    name: 'Accessories',
    count: '45+ Items',
    path: '/accessories',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function CategoryShowcase() {
  return (
    <section className="categories">
      <div className="section-header">
        <p className="section-header__eyebrow">Browse By Category</p>
        <h2 className="section-header__title">Shop Our Collections</h2>
      </div>
      <div className="categories__grid">
        {categories.map((cat) => (
          <Link to={cat.path} key={cat.name} className="category-card">
            <div className="category-card__icon">{cat.icon}</div>
            <h3 className="category-card__name">{cat.name}</h3>
            <p className="category-card__count">{cat.count}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}