// Centralized route paths — single source of truth for navigation targets.
// Use these instead of hardcoding path strings across the app.
export const ROUTES = {
  home: '/',
  designer: '/designer',
  middleEastern: '/middle-eastern',
  minis: '/minis',
  sampling: '/sampling',
  accessories: '/accessories',
  trackOrder: '/track-your-order',
  weeklyEdit: '/weekly-edit',
  contact: '/contact',
  login: '/login',
  register: '/register',
  favorites: '/favorites',
  checkout: '/checkout',
  checkoutSuccess: '/checkout-success',
  admin: {
    root: '/admin',
    login: '/admin/login',
    products: '/admin/products',
    orders: '/admin/orders',
    customers: '/admin/customers',
    settings: '/admin/settings',
  },
}
