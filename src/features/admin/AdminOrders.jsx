import React, { useState } from 'react'

const allOrders = [
  { id: 'PN-2026-0512', customer: 'Arjun Mehta', email: 'arjun@email.com', product: 'Tom Ford Oud Wood', amount: '₹18,500', status: 'Delivered', date: 'Jul 28, 2026', method: 'UPI' },
  { id: 'PN-2026-0511', customer: 'Priya Sharma', email: 'priya@email.com', product: 'Baccarat Rouge 540', amount: '₹26,500', status: 'Shipped', date: 'Jul 27, 2026', method: 'Credit Card' },
  { id: 'PN-2026-0510', customer: 'Ravi Patel', email: 'ravi@email.com', product: 'Initio Oud for Greatness', amount: '₹22,900', status: 'Processing', date: 'Jul 27, 2026', method: 'Net Banking' },
  { id: 'PN-2026-0509', customer: 'Sneha Kapoor', email: 'sneha@email.com', product: 'Santal 33 Mini', amount: '₹2,600', status: 'Delivered', date: 'Jul 26, 2026', method: 'UPI' },
  { id: 'PN-2026-0508', customer: 'Karan Singh', email: 'karan@email.com', product: 'Dior Sauvage Elixir', amount: '₹14,800', status: 'Pending', date: 'Jul 26, 2026', method: 'COD' },
  { id: 'PN-2026-0507', customer: 'Meera Iyer', email: 'meera@email.com', product: 'Amouage Interlude', amount: '₹24,500', status: 'Delivered', date: 'Jul 25, 2026', method: 'Credit Card' },
  { id: 'PN-2026-0506', customer: 'Vikram Joshi', email: 'vikram@email.com', product: 'Versace Eros', amount: '₹8,900', status: 'Cancelled', date: 'Jul 25, 2026', method: 'UPI' },
  { id: 'PN-2026-0505', customer: 'Ananya Das', email: 'ananya@email.com', product: 'Layton by PDM', amount: '₹16,800', status: 'Shipped', date: 'Jul 24, 2026', method: 'Net Banking' },
]

const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allOrders.filter((o) => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const statusColor = (s) => {
    const map = { Pending: '#e67e22', Processing: '#f39c12', Shipped: '#3498db', Delivered: '#2ecc71', Cancelled: '#e74c3c' }
    return map[s] || '#999'
  }

  return (
    <div className="admin-orders">
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
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="admin-toolbar__filters">
            {statuses.map((s) => (
              <button
                key={s}
                className={`admin-toolbar__filter-btn${statusFilter === s ? ' active' : ''}`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="admin-table__mono">{o.id}</td>
                  <td>
                    <div>
                      <div>{o.customer}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{o.email}</div>
                    </div>
                  </td>
                  <td>{o.product}</td>
                  <td>{o.date}</td>
                  <td className="admin-table__mono">{o.amount}</td>
                  <td>{o.method}</td>
                  <td>
                    <span
                      className="admin-table__badge"
                      style={{ background: `${statusColor(o.status)}20`, color: statusColor(o.status) }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button className="admin-table__action-btn" title="View">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button className="admin-table__action-btn" title="Edit">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
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
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}