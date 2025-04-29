import asyncHandler from "express-async-handler"
import Review from "../models/review.model.js"
import Product from "../models/product.model.js"

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, title, product } = req.body

  // Check if product exists
  const productExists = await Product.findById(product)
  if (!productExists) {
    res.status(404)
    throw new Error("Product not found")
  }

  // Check if user already reviewed this product
  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    product,
  })

  if (alreadyReviewed) {
    res.status(400)
    throw new Error("Product already reviewed")
  }

  // Create review
  const review = new Review({
    user: req.user._id,
    product,
    rating: Number(rating),
    comment,
    title,
  })

  await review.save()

  // Update product rating
  await updateProductRating(product)

  res.status(201).json({ message: "Review added" })
})

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:id
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.id })
    .populate("user", "name profileImage")
    .sort({ createdAt: -1 })

  res.json(reviews)
})

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const { rating, comment, title } = req.body

  const review = await Review.findById(req.params.id)

  if (review) {
    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to update this review")
    }

    review.rating = Number(rating) || review.rating
    review.comment = comment || review.comment
    review.title = title || review.title

    await review.save()

    // Update product rating
    await updateProductRating(review.product)

    res.json({ message: "Review updated" })
  } else {
    res.status(404)
    throw new Error("Review not found")
  }
})

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (review) {
    // Check if the user is the owner of the review
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to delete this review")
    }

    const productId = review.product

    await review.deleteOne()

    // Update product rating
    await updateProductRating(productId)

    res.json({ message: "Review removed" })
  } else {
    res.status(404)
    throw new Error("Review not found")
  }
})

// Helper function to update product rating
const updateProductRating = async (productId) => {
  const product = await Product.findById(productId)

  if (product) {
    const reviews = await Review.find({ product: productId })

    if (reviews.length === 0) {
      product.rating = 0
      product.numReviews = 0
    } else {
      const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0)
      product.rating = totalRating / reviews.length
      product.numReviews = reviews.length
    }

    await product.save()
  }
}

export { createReview, getProductReviews, updateReview, deleteReview }
