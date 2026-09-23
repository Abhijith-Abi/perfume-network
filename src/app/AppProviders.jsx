import React from 'react'
import { AuthProvider } from '@/features/auth'
import { StoreProvider } from '@/features/cart'

// Composes all global context providers in one place.
export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <StoreProvider>{children}</StoreProvider>
    </AuthProvider>
  )
}
