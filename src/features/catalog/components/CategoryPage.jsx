import React, { useMemo, useState } from 'react'
import ScentCard from './ScentCard'
import { getProductsByCategory } from '../data/products'

/**
 * Reusable category listing page. Drives its own filter + sort state.
 *
 * @param {object}   props
 * @param {string}   props.category   product category key
 * @param {string}   props.eyebrow    small heading above the title
 * @param {string}   props.title      page title
 * @param {string}   props.subtitle   supporting copy
 * @param {string[]} [props.filters]  optional filter chip labels
 * @param {(product, filter) => boolean} [props.matchFilter] predicate for a filter
 * @param {boolean}  [props.surface]  use the tinted surface background
 */
export default function CategoryPage({
  category,
  eyebrow,
  title,
  subtitle,
  filters,
  matchFilter,
  surface = false,
}) {
  const [activeFilter, setActiveFilter] = useState(filters ? filters[0] : 'All')
  const [sort, setSort] = useState('featured')
  const all = useMemo(() => getProductsByCategory(category), [category])

  const visible = useMemo(() => {
    let list = [...all]
    if (filters && matchFilter && activeFilter !== filters[0]) {
      list = list.filter((p) => matchFilter(p, activeFilter))
    }
    if (sort === 'low') list.sort((a, b) => a.price - b.price)
    if (sort === 'high') list.sort((a, b) => b.price - a.price)
    return list
  }, [all, filters, matchFilter, activeFilter, sort])

  const showControls = Boolean(filters)

  return (
    <>
      <section className="page-hero">
        <p className="page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__subtitle">{subtitle}</p>
        <div className="page-hero__line" />
      </section>

      <section className={`page-content${surface ? ' page-content--surface' : ''}`}>
        {showControls && (
          <div className="filter-bar">
            <div className="filter-bar__tags">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-bar__tag${activeFilter === f ? ' active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="filter-bar__sort">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        )}

        <div className="product-grid">
          {visible.map((product) => (
            <ScentCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  )
}
