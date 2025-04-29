"use client"

import { createContext, useState, useEffect, useContext } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product._id === product._id)

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        // Add new item
        return [...prevItems, { product, quantity }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.product._id === productId ? { ...item, quantity } : item)),
    )
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Calculate cart totals
  const cartTotals = () => {
    const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const tax = subtotal * 0.1 // 10% tax
    const shipping = subtotal > 50 ? 0 : 10 // Free shipping over $50
    const total = subtotal + tax + shipping

    return {
      itemsCount,
      subtotal,
      tax,
      shipping,
      total,
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default CartContext
