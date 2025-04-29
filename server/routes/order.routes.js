import express from "express"
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getSellerOrders,
} from "../controllers/order.controller.js"
import { protect, farmer } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").post(protect, createOrder)

router.route("/myorders").get(protect, getMyOrders)

router.route("/seller").get(protect, farmer, getSellerOrders)

router.route("/:id").get(protect, getOrderById)

router.route("/:id/pay").put(protect, updateOrderToPaid)

router.route("/:id/deliver").put(protect, farmer, updateOrderToDelivered)

router.route("/:id/status").put(protect, farmer, updateOrderStatus)

export default router
