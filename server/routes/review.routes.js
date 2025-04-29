import express from "express"
import { createReview, getProductReviews, updateReview, deleteReview } from "../controllers/review.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").post(protect, createReview)

router.route("/product/:id").get(getProductReviews)

router.route("/:id").put(protect, updateReview).delete(protect, deleteReview)

export default router
