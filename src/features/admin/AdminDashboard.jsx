import React from 'react'
import { useAuth } from '@/features/auth'

const stats = [
  { label: 'Total Revenue', value: '₹12,84,500', change: '+12.5%', positive: true,
    icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { label: 'Total Orders', value: '342', change: '+8.2%', positive: true,
    icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg> },
  { label: 'Active Customers', value: '1,287', change: '+3.1%', positive: true,
    icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> },
  { label: 'Products Listed', value: '584', change: '+15', positive: true,
    icon: <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg> },
]

const recentOrders = [
  { id: 'PN-2026-0512', customer: 'Arjun Mehta', product: 'Tom Ford Oud Wood', amount: '₹18,500', status: 'Delivered', statusColor: '#2ecc71' },
  { id: 'PN-2026-0511', customer: 'Priya Sharma', product: 'Baccarat Rouge 540', amount: '₹26,500', status: 'Shipped', statusColor: '#3498db' },
  { id: 'PN-2026-0510', customer: 'Ravi Patel', product: 'Initio Oud for Greatness', amount: '₹22,900', status: 'Processing', statusColor: '#f39c12' },
  { id: 'PN-2026-0509', customer: 'Sneha Kapoor', product: 'Santal 33 Mini', amount: '₹2,600', status: 'Delivered', statusColor: '#2ecc71' },
  { id: 'PN-2026-0508', customer: 'Karan Singh', product: 'Dior Sauvage Elixir', amount: '₹14,800', status: 'Pending', statusColor: '#e67e22' },
]

const topProducts = [
  { name: 'Baccarat Rouge 540', brand: 'MFK', sold: 48, revenue: '₹12,72,000' },
  { name: 'Oud Wood', brand: 'Tom Ford', sold: 36, revenue: '₹6,66,000' },
  { name: 'Oud for Greatness', brand: 'Initio', sold: 31, revenue: '₹7,09,900' },
  { name: 'Sauvage Elixir', brand: 'Dior', sold: 28, revenue: '₹4,14,400' },
  { name: 'Layton', brand: 'Parfums de Marly', sold: 24, revenue: '₹4,03,200' },
]

export default function AdminDashboard() {
  const { admin } = useAuth()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className="admin-dashboard">
      {/* Welcome */}
      <div className="admin-welcome">
        <div>
          <h2 className="admin-welcome__greeting">{getGreeting()}, Admin</h2>
          <p className="admin-welcome__sub">
            Here's what's happening with Perfume Network today.
          </p>
        </div>
        <div className="admin-welcome__date">
          {new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div className="admin-stat-card__icon">{stat.icon}</div>
            <div className="admin-stat-card__info">
              <p className="admin-stat-card__value">{stat.value}</p>
              <p className="admin-stat-card__label">{stat.label}</p>
            </div>
            <span className={`admin-stat-card__change${stat.positive ? ' positive' : ''}`}>
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div className="admin-dashboard__grid">
        {/* Recent Orders */}
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <h3 className="admin-table-card__title">Recent Orders</h3>
            <span className="admin-table-card__action">View All</span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-table__mono">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td className="admin-table__mono">{order.amount}</td>
                    <td>
                      <span
                        className="admin-table__badge"
                        style={{ background: `${order.statusColor}20`, color: order.statusColor }}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-table-card">
          <div className="admin-table-card__header">
            <h3 className="admin-table-card__title">Top Selling Products</h3>
            <span className="admin-table-card__action">This Month</span>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={p.name}>
                    <td className="admin-table__mono">{i + 1}</td>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td className="admin-table__mono">{p.sold}</td>
                    <td className="admin-table__mono">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}