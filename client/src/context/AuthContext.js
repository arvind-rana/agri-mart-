"use client"

import { createContext, useState, useEffect, useContext } from "react"
import { authAPI } from "@/services/api"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const { data } = await authAPI.getProfile()
          setUser(data)
        }
      } catch (error) {
        localStorage.removeItem("token")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await authAPI.register(userData)
      localStorage.setItem("token", data.token)
      setUser(data)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (credentials) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await authAPI.login(credentials)
      localStorage.setItem("token", data.token)
      setUser(data)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    router.push("/")
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await authAPI.updateProfile(userData)
      setUser(data)
      return data
    } catch (error) {
      setError(error.response?.data?.message || "Update failed")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
        isFarmer: user?.isFarmer || user?.role === "farmer",
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext
