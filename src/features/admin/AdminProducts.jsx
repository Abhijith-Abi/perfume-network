import React, { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Oud Wood', brand: 'Tom Ford', category: 'Designer', price: 18500, stock: 24, status: 'Active' },
  { id: 2, name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', category: 'Niche', price: 26500, stock: 18, status: 'Active' },
  { id: 3, name: 'Oud for Greatness', brand: 'Initio', category: 'Middle Eastern', price: 22900, stock: 12, status: 'Active' },
  { id: 4, name: 'Sauvage Elixir', brand: 'Dior', category: 'Designer', price: 14800, stock: 31, status: 'Active' },
  { id: 5, name: 'Layton', brand: 'Parfums de Marly', category: 'Niche', price: 16800, stock: 8, status: 'Low Stock' },
  { id: 6, name: 'Bleu de Chanel', brand: 'Chanel', category: 'Designer', price: 12200, stock: 42, status: 'Active' },
  { id: 7, name: 'Santal 33 (10ml)', brand: 'Le Labo', category: 'Minis', price: 2600, stock: 0, status: 'Out of Stock' },
  { id: 8, name: 'Interlude Man', brand: 'Amouage', category: 'Middle Eastern', price: 24500, stock: 6, status: 'Low Stock' },
  { id: 9, name: 'Eros', brand: 'Versace', category: 'Designer', price: 8900, stock: 55, status: 'Active' },
  { id: 10, name: 'By the Fireplace (10ml)', brand: 'Maison Margiela', category: 'Minis', price: 1900, stock: 20, status: 'Active' },
]

export default function AdminProducts() {
  const [products] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const categories = ['All', ...new Set(initialProducts.map((p) => p.category))]

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter
    return matchSearch && matchCat
  })

  const statusColor = (status) => {
    if (status === 'Active') return '#2ecc71'
    if (status === 'Low Stock') return '#f39c12'
    return '#e74c3c'
  }

  return (
    <div className="admin-products">
      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-toolbar__left">
          <div className="admin-toolbar__search">
            <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="admin-toolbar__search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="admin-toolbar__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`admin-toolbar__filter-btn${categoryFilter === cat ? ' active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <button className="admin-toolbar__add-btn" onClick={() => setShowModal(true)}>
          <svg viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-table__product">
                      <div className="admin-table__product-thumb">
                        {p.name[0]}
                      </div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.brand}</td>
                  <td>{p.category}</td>
                  <td className="admin-table__mono">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="admin-table__mono">{p.stock}</td>
                  <td>
                    <span
                      className="admin-table__badge"
                      style={{ background: `${statusColor(p.status)}20`, color: statusColor(p.status) }}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-table__action-btn" title="Edit">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button className="admin-table__action-btn delete" title="Delete">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="admin-table__empty">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h3>Add New Product</h3>
              <button className="admin-modal__close" onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="admin-modal__body">
              <div className="admin-modal__row">
                <div className="admin-modal__field">
                  <label>Product Name</label>
                  <input type="text" placeholder="e.g. Oud Wood" />
                </div>
                <div className="admin-modal__field">
                  <label>Brand</label>
                  <input type="text" placeholder="e.g. Tom Ford" />
                </div>
              </div>
              <div className="admin-modal__row">
                <div className="admin-modal__field">
                  <label>Category</label>
                  <select defaultValue="">
                    <option value="" disabled>Select category</option>
                    <option>Designer</option>
                    <option>Middle Eastern</option>
                    <option>Niche</option>
                    <option>Minis</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="admin-modal__field">
                  <label>Price (₹)</label>
                  <input type="number" placeholder="0" />
                </div>
              </div>
              <div className="admin-modal__row">
                <div className="admin-modal__field">
                  <label>Stock Quantity</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="admin-modal__field">
                  <label>Status</label>
                  <select defaultValue="Active">
                    <option>Active</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="admin-modal__field">
                <label>Description</label>
                <textarea placeholder="Product description..." rows="3" />
              </div>
            </div>
            <div className="admin-modal__footer">
              <button className="admin-modal__cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="admin-modal__save" onClick={() => setShowModal(false)}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}