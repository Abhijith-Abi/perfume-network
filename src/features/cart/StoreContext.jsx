import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from '@/lib'

const StoreContext = createContext(null)

const CART_KEY = 'pn_cart'
const FAV_KEY = 'pn_favorites'

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []))
  const [favorites, setFavorites] = useState(() => readStorage(FAV_KEY, []))
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          brand: product.brand,
          name: product.name,
          price: product.price,
          size: product.size,
          image: product.image,
          qty,
        },
      ]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, qty) } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback((product) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, { id: product.id, name: product.name, brand: product.brand }]
    })
  }, [])

  const isFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart],
  )

  const shipping = useMemo(() => {
    if (cart.length === 0) return 0
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  }, [cart.length, subtotal])

  const total = subtotal + shipping

  const value = {
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    subtotal,
    shipping,
    total,
    favorites,
    toggleFavorite,
    isFavorite,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
