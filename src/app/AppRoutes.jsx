import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/lib'
import { ScrollToTop } from '@/components/ui'
import PublicLayout from './PublicLayout'

import {
  HomePage,
  WeeklyEditPage,
  SamplingPage,
  ContactPage,
  TrackOrderPage,
} from '@/features/marketing'
import {
  DesignerPage,
  MiddleEasternPage,
  MinisPage,
  AccessoriesPage,
} from '@/features/catalog'
import { LoginPage, RegisterPage, AdminLoginPage } from '@/features/auth'
import { FavoritesPage } from '@/features/favorites'
import { CheckoutPage, CheckoutSuccessPage } from '@/features/checkout'
import {
  AdminLayout,
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminCustomers,
  AdminSettings,
} from '@/features/admin'

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin — standalone, no storefront chrome */}
        <Route path={ROUTES.admin.login} element={<AdminLoginPage />} />
        <Route path={ROUTES.admin.root} element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Storefront — wrapped in the public layout */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.designer} element={<DesignerPage />} />
          <Route path={ROUTES.middleEastern} element={<MiddleEasternPage />} />
          <Route path={ROUTES.minis} element={<MinisPage />} />
          <Route path={ROUTES.sampling} element={<SamplingPage />} />
          <Route path={ROUTES.accessories} element={<AccessoriesPage />} />
          <Route path={ROUTES.trackOrder} element={<TrackOrderPage />} />
          <Route path={ROUTES.weeklyEdit} element={<WeeklyEditPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.favorites} element={<FavoritesPage />} />
          <Route path={ROUTES.checkout} element={<CheckoutPage />} />
          <Route path={ROUTES.checkoutSuccess} element={<CheckoutSuccessPage />} />
        </Route>
      </Routes>
    </>
  )
}
