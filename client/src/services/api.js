import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
}

// User API
export const userAPI = {
  getUsers: () => api.get("/users"),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  getFarmers: () => api.get("/users/farmers"),
  getFarmerById: (id) => api.get(`/users/farmers/${id}`),
  getFeaturedFarmers: () => api.get("/users/farmers/featured"),
}

// Product API
export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post("/products", productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getTopProducts: () => api.get("/products/top"),
  getFeaturedProducts: () => api.get("/products/featured"),
  getProductsByFarmer: (id, params) => api.get(`/products/farmer/${id}`, { params }),
}

// Category API
export const categoryAPI = {
  getCategories: () => api.get("/categories"),
  getCategoryById: (id) => api.get(`/categories/${id}`),
  createCategory: (categoryData) => api.post("/categories", categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
}

// Order API
export const orderAPI = {
  createOrder: (orderData) => api.post("/orders", orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
  updateOrderToPaid: (id, paymentResult) => api.put(`/orders/${id}/pay`, paymentResult),
  updateOrderToDelivered: (id) => api.put(`/orders/${id}/deliver`),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  getMyOrders: () => api.get("/orders/myorders"),
  getSellerOrders: () => api.get("/orders/seller"),
}

// Review API
export const reviewAPI = {
  createReview: (reviewData) => api.post("/reviews", reviewData),
  getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
}

// Upload API
export const uploadAPI = {
  uploadImage: (formData) => {
    return api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  uploadMultipleImages: (formData) => {
    return api.post("/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
}

export default api
