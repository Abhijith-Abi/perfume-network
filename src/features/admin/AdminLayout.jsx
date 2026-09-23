import React, { useState, useEffect } from 'react'
import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth'

const sidebarItems = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    exact: true,
  },
  {
    label: 'Products',
    path: '/admin/products',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    path: '/admin/orders',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    path: '/admin/customers',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: (
      <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/settings': 'Settings',
}

export default function AdminLayout() {
  const { isAdmin, admin, adminLogout } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  const currentPage = pageTitles[location.pathname] || 'Admin'

  return (
    <div className={`admin-panel${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="admin-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar${mobileOpen ? ' mobile-open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__brand">
            <div className="admin-sidebar__logo">
              <svg viewBox="0 0 40 40" strokeWidth="1" fill="none" stroke="currentColor">
                <circle cx="20" cy="20" r="18" />
                <path d="M20 2v36M2 20h36" />
                <circle cx="20" cy="20" r="4" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div className="admin-sidebar__brand-text">
                <span className="admin-sidebar__brand-name">Perfume Network</span>
                <span className="admin-sidebar__brand-role">Admin Panel</span>
              </div>
            )}
          </div>
          <button
            className="admin-sidebar__collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
              {sidebarCollapsed ? (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              ) : (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' active' : ''}`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <span className="admin-sidebar__link-icon">{item.icon}</span>
              {!sidebarCollapsed && (
                <span className="admin-sidebar__link-label">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">
              {admin?.name?.[0] || 'A'}
            </div>
            {!sidebarCollapsed && (
              <div className="admin-sidebar__user-info">
                <span className="admin-sidebar__user-name">{admin?.name}</span>
                <span className="admin-sidebar__user-role">{admin?.role}</span>
              </div>
            )}
          </div>
          <button
            className="admin-sidebar__logout"
            onClick={adminLogout}
            title="Logout"
          >
            <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header__left">
            <button
              className="admin-header__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="admin-header__title">{currentPage}</h1>
              <p className="admin-header__breadcrumb">
                Admin <span>/</span> {currentPage}
              </p>
            </div>
          </div>
          <div className="admin-header__right">
            <button className="admin-header__icon-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="admin-header__badge">3</span>
            </button>
            <NavLink to="/" className="admin-header__store-link">
              <svg viewBox="0 0 24 24" strokeWidth="1.5" fill="none" stroke="currentColor">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              View Store
            </NavLink>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}