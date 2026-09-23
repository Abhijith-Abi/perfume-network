import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnnouncementBar, Header, Navigation, Footer } from '@/components/layout'
import { CartDrawer } from '@/features/cart'

// Storefront shell: announcement bar, header (with search state), nav, the
// routed page via <Outlet />, footer, and the cart drawer.
export default function PublicLayout() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="app">
      <AnnouncementBar />
      <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
