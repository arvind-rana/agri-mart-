import express from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getFeaturedProducts,
  getProductsByFarmer,
} from "../controllers/product.controller.js"
import { protect, farmer } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protect, farmer, createProduct)

router.route("/top").get(getTopProducts)

router.route("/featured").get(getFeaturedProducts)

router.route("/farmer/:id").get(getProductsByFarmer)

router.route("/:id").get(getProductById).put(protect, farmer, updateProduct).delete(protect, farmer, deleteProduct)

export default router
