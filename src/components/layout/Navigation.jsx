import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Designer', path: '/designer' },
  { label: 'Middle Eastern', path: '/middle-eastern' },
  { label: 'Minis', path: '/minis' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Weekly Edit', path: '/weekly-edit' },
  { label: 'Contact', path: '/contact' },
]

export default function Navigation() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item) => (
          <li key={item.path} className="nav__item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav__link${isActive ? ' active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}