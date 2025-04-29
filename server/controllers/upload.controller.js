import asyncHandler from "express-async-handler"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import multer from "multer"

// Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads")

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|webp/
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime type
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb("Error: Images only (jpeg, jpg, png, webp)!")
  }
}

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb)
  },
})

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
  const uploadSingle = upload.single("image")

  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      res.status(400)
      throw new Error(`Multer error: ${err.message}`)
    } else if (err) {
      // An unknown error occurred
      res.status(400)
      throw new Error(err)
    }

    // Everything went fine
    res.json({
      message: "Image uploaded successfully",
      image: `/${req.file.path.replace(/\\/g, "/").split("uploads/")[1]}`,
    })
  })
})

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
const uploadMultipleImages = asyncHandler(async (req, res) => {
  const uploadMultiple = upload.array("images", 5) // Max 5 images

  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      res.status(400)
      throw new Error(`Multer error: ${err.message}`)
    } else if (err) {
      // An unknown error occurred
      res.status(400)
      throw new Error(err)
    }

    // Everything went fine
    const imagePaths = req.files.map((file) => `/${file.path.replace(/\\/g, "/").split("uploads/")[1]}`)

    res.json({
      message: "Images uploaded successfully",
      images: imagePaths,
    })
  })
})

export { uploadImage, uploadMultipleImages }
