import asyncHandler from "express-async-handler"
import Product from "../models/product.model.js"
import Category from "../models/category.model.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  // Build filter object
  const filter = {}

  // Search by keyword
  if (req.query.keyword) {
    filter.$text = { $search: req.query.keyword }
  }

  // Filter by category
  if (req.query.category) {
    const category = await Category.findOne({ name: req.query.category })
    if (category) {
      filter.category = category._id
    }
  }

  // Filter by farming method
  if (req.query.farmingMethod) {
    filter.farmingMethod = req.query.farmingMethod
  }

  // Filter by price range
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {}
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice)
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice)
  }

  // Filter by seller/farmer
  if (req.query.seller) {
    filter.user = req.query.seller
  }

  // Filter by featured
  if (req.query.featured === "true") {
    filter.isFeatured = true
  }

  // Count total documents
  const count = await Product.countDocuments(filter)

  // Get sort option
  let sortOption = {}
  if (req.query.sort) {
    switch (req.query.sort) {
      case "newest":
        sortOption = { createdAt: -1 }
        break
      case "priceAsc":
        sortOption = { price: 1 }
        break
      case "priceDesc":
        sortOption = { price: -1 }
        break
      case "rating":
        sortOption = { rating: -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }
  } else {
    // Default sort by featured and then newest
    sortOption = { isFeatured: -1, createdAt: -1 }
  }

  // Fetch products
  const products = await Product.find(filter)
    .populate("user", "name profileImage farmerDetails")
    .populate("category", "name")
    .sort(sortOption)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("user", "name profileImage farmerDetails")
    .populate("category", "name")

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    images,
    countInStock,
    unit,
    farmingMethod,
    harvestDate,
    deliveryOptions,
  } = req.body

  // Validate category
  const categoryExists = await Category.findById(category)
  if (!categoryExists) {
    res.status(400)
    throw new Error("Invalid category")
  }

  const product = new Product({
    name,
    user: req.user._id,
    description,
    price,
    category,
    images: images || ["/uploads/default-product.jpg"],
    countInStock,
    unit,
    farmingMethod,
    harvestDate,
    isOrganic: farmingMethod === "organic",
    deliveryOptions: deliveryOptions || {
      pickup: true,
      delivery: false,
      shipping: false,
    },
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    images,
    countInStock,
    unit,
    farmingMethod,
    harvestDate,
    deliveryOptions,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    // Check if the user is the owner of the product
    if (product.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to update this product")
    }

    // Update product fields
    product.name = name || product.name
    product.description = description || product.description
    product.price = price || product.price

    if (category) {
      // Validate category
      const categoryExists = await Category.findById(category)
      if (!categoryExists) {
        res.status(400)
        throw new Error("Invalid category")
      }
      product.category = category
    }

    if (images && images.length > 0) {
      product.images = images
    }

    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock
    product.unit = unit || product.unit

    if (farmingMethod) {
      product.farmingMethod = farmingMethod
      product.isOrganic = farmingMethod === "organic"
    }

    if (harvestDate) {
      product.harvestDate = harvestDate
    }

    if (deliveryOptions) {
      product.deliveryOptions = {
        ...product.deliveryOptions,
        ...deliveryOptions,
      }
    }

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Farmer
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    // Check if the user is the owner of the product
    if (product.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to delete this product")
    }

    await product.deleteOne()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(5)
    .populate("user", "name profileImage")
    .populate("category", "name")

  res.json(products)
})

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate("user", "name profileImage")
    .populate("category", "name")

  res.json(products)
})

// @desc    Get products by farmer
// @route   GET /api/products/farmer/:id
// @access  Public
const getProductsByFarmer = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const count = await Product.countDocuments({ user: req.params.id })

  const products = await Product.find({ user: req.params.id })
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  })
})

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getFeaturedProducts,
  getProductsByFarmer,
}
