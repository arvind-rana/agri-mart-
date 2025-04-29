import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password")
  res.json(users)
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.role = req.body.role || user.role
    user.isFarmer = req.body.role === "farmer" || req.body.isFarmer || user.isFarmer
    user.isVerified = req.body.isVerified !== undefined ? req.body.isVerified : user.isVerified

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isFarmer: updatedUser.isFarmer,
      isVerified: updatedUser.isVerified,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.deleteOne()
    res.json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Get all farmers
// @route   GET /api/users/farmers
// @access  Public
const getFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({
    $or: [{ role: "farmer" }, { isFarmer: true }],
  }).select("-password")

  res.json(farmers)
})

// @desc    Get farmer by ID
// @route   GET /api/users/farmers/:id
// @access  Public
const getFarmerById = asyncHandler(async (req, res) => {
  const farmer = await User.findOne({
    _id: req.params.id,
    $or: [{ role: "farmer" }, { isFarmer: true }],
  }).select("-password")

  if (farmer) {
    res.json(farmer)
  } else {
    res.status(404)
    throw new Error("Farmer not found")
  }
})

// @desc    Get featured farmers
// @route   GET /api/users/farmers/featured
// @access  Public
const getFeaturedFarmers = asyncHandler(async (req, res) => {
  const farmers = await User.find({
    $or: [{ role: "farmer" }, { isFarmer: true }],
    isVerified: true,
  })
    .select("-password")
    .limit(4)

  res.json(farmers)
})

export { getUsers, getUserById, updateUser, deleteUser, getFarmers, getFarmerById, getFeaturedFarmers }
