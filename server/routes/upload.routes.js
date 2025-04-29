import express from "express"
import { uploadImage, uploadMultipleImages } from "../controllers/upload.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", protect, uploadImage)
router.post("/multiple", protect, uploadMultipleImages)

export default router
