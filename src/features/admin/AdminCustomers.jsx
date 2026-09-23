import React, { useState } from 'react'

const allCustomers = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun@email.com', phone: '+91 98765 43210', orders: 8, spent: '₹1,24,500', joined: 'Jan 15, 2026', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 87654 32109', orders: 12, spent: '₹2,48,900', joined: 'Nov 3, 2025', status: 'Active' },
  { id: 3, name: 'Ravi Patel', email: 'ravi@email.com', phone: '+91 76543 21098', orders: 5, spent: '₹72,400', joined: 'Mar 22, 2026', status: 'Active' },
  { id: 4, name: 'Sneha Kapoor', email: 'sneha@email.com', phone: '+91 65432 10987', orders: 3, spent: '₹15,800', joined: 'May 10, 2026', status: 'Active' },
  { id: 5, name: 'Karan Singh', email: 'karan@email.com', phone: '+91 54321 09876', orders: 1, spent: '₹14,800', joined: 'Jul 20, 2026', status: 'New' },
  { id: 6, name: 'Meera Iyer', email: 'meera@email.com', phone: '+91 43210 98765', orders: 15, spent: '₹3,82,000', joined: 'Sep 8, 2025', status: 'VIP' },
  { id: 7, name: 'Vikram Joshi', email: 'vikram@email.com', phone: '+91 32109 87654', orders: 2, spent: '₹17,800', joined: 'Jun 14, 2026', status: 'Inactive' },
  { id: 8, name: 'Ananya Das', email: 'ananya@email.com', phone: '+91 21098 76543', orders: 7, spent: '₹98,600', joined: 'Feb 28, 2026', status: 'Active' },
]

export default function AdminCustomers() {
  const [search, setSearch] = useState('')

  const filtered = allCustomers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const statusColor = (s) => {
    const map = { Active: '#2ecc71', New: '#3498db', VIP: '#c9a84c', Inactive: '#95a5a6' }
    return map[s] || '#999'
  }

  return (
    <div className="admin-customers">
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
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="admin-toolbar__right-info">
          {filtered.length} customer{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="admin-table__customer">
                      <div className="admin-table__customer-avatar">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.phone}</td>
                  <td className="admin-table__mono">{c.orders}</td>
                  <td className="admin-table__mono">{c.spent}</td>
                  <td>{c.joined}</td>
                  <td>
                    <span
                      className="admin-table__badge"
                      style={{ background: `${statusColor(c.status)}20`, color: statusColor(c.status) }}
                    >
                      {c.status}
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
                      <button className="admin-table__action-btn" title="Email">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
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
            <p>No customers found.</p>
          </div>
        )}
      </div>
    </div>
  )
}