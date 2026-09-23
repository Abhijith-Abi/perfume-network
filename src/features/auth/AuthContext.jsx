import React, { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/lib'

const AuthContext = createContext(null)

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@perfumenetwork.in',
  password: 'admin@123',
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(() => {
    const stored = sessionStorage.getItem('pn_admin')
    return stored ? JSON.parse(stored) : null
  })
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('pn_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // Unified login: routes to admin panel for admin credentials,
  // otherwise signs in as a regular customer (demo — any valid email + 6+ chars).
  const login = useCallback(
    (email, password) => {
      setLoginError('')
      setIsLoggingIn(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          const cleanEmail = email.toLowerCase().trim()

          if (cleanEmail === ADMIN_CREDENTIALS.email) {
            if (password === ADMIN_CREDENTIALS.password) {
              const adminData = {
                email: ADMIN_CREDENTIALS.email,
                name: 'Perfume Network Admin',
                role: 'Super Admin',
                loginTime: new Date().toISOString(),
              }
              setAdmin(adminData)
              sessionStorage.setItem('pn_admin', JSON.stringify(adminData))
              setIsLoggingIn(false)
              navigate(ROUTES.admin.root)
              resolve(true)
            } else {
              setIsLoggingIn(false)
              setLoginError('Invalid admin credentials. Access denied.')
              resolve(false)
            }
            return
          }

          // Regular customer sign-in (demo)
          if (password.length >= 6) {
            const userData = {
              email: cleanEmail,
              name: cleanEmail.split('@')[0],
              loginTime: new Date().toISOString(),
            }
            setUser(userData)
            localStorage.setItem('pn_user', JSON.stringify(userData))
            setIsLoggingIn(false)
            navigate(ROUTES.home)
            resolve(true)
          } else {
            setIsLoggingIn(false)
            setLoginError('Invalid email or password.')
            resolve(false)
          }
        }, 900)
      })
    },
    [navigate],
  )

  const adminLogin = login // backward-compatible alias

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('pn_user')
    navigate(ROUTES.home)
  }, [navigate])

  const adminLogout = useCallback(() => {
    setAdmin(null)
    sessionStorage.removeItem('pn_admin')
    navigate(ROUTES.admin.login)
  }, [navigate])

  const isAdmin = !!admin
  const isUser = !!user

  return (
    <AuthContext.Provider
      value={{
        admin,
        user,
        isAdmin,
        isUser,
        login,
        logout,
        adminLogin,
        adminLogout,
        loginError,
        isLoggingIn,
        setLoginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
