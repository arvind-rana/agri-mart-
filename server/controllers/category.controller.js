import asyncHandler from "express-async-handler"
import Category from "../models/category.model.js"

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true })
  res.json(categories)
})

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body

  const categoryExists = await Category.findOne({ name })

  if (categoryExists) {
    res.status(400)
    throw new Error("Category already exists")
  }

  const category = await Category.create({
    name,
    description,
    image: image || "/uploads/default-category.jpg",
  })

  if (category) {
    res.status(201).json(category)
  } else {
    res.status(400)
    throw new Error("Invalid category data")
  }
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, image, isActive } = req.body

  const category = await Category.findById(req.params.id)

  if (category) {
    category.name = name || category.name
    category.description = description || category.description
    category.image = image || category.image

    if (isActive !== undefined) {
      category.isActive = isActive
    }

    const updatedCategory = await category.save()
    res.json(updatedCategory)
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (category) {
    await category.deleteOne()
    res.json({ message: "Category removed" })
  } else {
    res.status(404)
    throw new Error("Category not found")
  }
})

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
