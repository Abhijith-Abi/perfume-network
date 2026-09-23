import React, { useState } from 'react'
import { useAuth } from '@/features/auth'

export default function AdminSettings() {
  const { admin } = useAuth()
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    storeName: 'Perfume Network',
    tagline: 'Fine Fragrance Boutique',
    email: 'support@perfumenetwork.in',
    phone: '+91 98765 43210',
    address: '42 Fragrance Lane, Khan Market, New Delhi — 110003',
    currency: 'INR',
    freeShippingMin: '2999',
    taxRate: '18',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="admin-settings">
      {/* Admin Profile Card */}
      <div className="admin-settings__profile-card">
        <div className="admin-settings__profile-avatar">
          {admin?.name?.[0] || 'A'}
        </div>
        <div className="admin-settings__profile-info">
          <h3>{admin?.name}</h3>
          <p>{admin?.email}</p>
          <span className="admin-settings__profile-role">{admin?.role}</span>
        </div>
      </div>

      <form className="admin-settings__form" onSubmit={handleSave}>
        {/* Store Information */}
        <div className="admin-settings__section">
          <h3 className="admin-settings__section-title">Store Information</h3>
          <div className="admin-settings__grid">
            <div className="admin-settings__field">
              <label>Store Name</label>
              <input name="storeName" value={settings.storeName} onChange={handleChange} />
            </div>
            <div className="admin-settings__field">
              <label>Tagline</label>
              <input name="tagline" value={settings.tagline} onChange={handleChange} />
            </div>
            <div className="admin-settings__field">
              <label>Support Email</label>
              <input name="email" type="email" value={settings.email} onChange={handleChange} />
            </div>
            <div className="admin-settings__field">
              <label>Phone</label>
              <input name="phone" value={settings.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="admin-settings__field" style={{ marginTop: '16px' }}>
            <label>Address</label>
            <textarea name="address" value={settings.address} onChange={handleChange} rows="2" />
          </div>
        </div>

        {/* Commerce Settings */}
        <div className="admin-settings__section">
          <h3 className="admin-settings__section-title">Commerce</h3>
          <div className="admin-settings__grid">
            <div className="admin-settings__field">
              <label>Currency</label>
              <select name="currency" value={settings.currency} onChange={handleChange}>
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div className="admin-settings__field">
              <label>Free Shipping Minimum (₹)</label>
              <input name="freeShippingMin" type="number" value={settings.freeShippingMin} onChange={handleChange} />
            </div>
            <div className="admin-settings__field">
              <label>Tax Rate (%)</label>
              <input name="taxRate" type="number" value={settings.taxRate} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="admin-settings__actions">
          {saved && (
            <span className="admin-settings__saved">
              <svg viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Settings saved successfully
            </span>
          )}
          <button type="submit" className="admin-settings__save-btn">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}