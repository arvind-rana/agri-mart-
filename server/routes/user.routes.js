import express from "express"
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFarmers,
  getFarmerById,
  getFeaturedFarmers,
} from "../controllers/user.controller.js"
import { protect, admin } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(protect, admin, getUsers)

router.route("/farmers").get(getFarmers)

router.route("/farmers/featured").get(getFeaturedFarmers)

router.route("/farmers/:id").get(getFarmerById)

router.route("/:id").get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser)

export default router
