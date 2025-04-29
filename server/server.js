import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

// Route imports
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import orderRoutes from "./routes/order.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import { errorHandler, notFound } from "./middleware/error.middleware.js"

// Load environment variables
dotenv.config()

// Initialize express
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/upload", uploadRoutes)

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

// Start server
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  })
})
