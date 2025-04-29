import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import generateToken from "../utils/generateToken.js"

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body

  // Check if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "buyer",
    phone,
    isFarmer: role === "farmer",
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isFarmer: user.isFarmer,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isFarmer: user.isFarmer,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      profileImage: user.profileImage,
      isFarmer: user.isFarmer,
      farmerDetails: user.farmerDetails,
      isVerified: user.isVerified,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone

    if (req.body.address) {
      user.address = {
        ...user.address,
        ...req.body.address,
      }
    }

    if (req.body.password) {
      user.password = req.body.password
    }

    if (req.body.profileImage) {
      user.profileImage = req.body.profileImage
    }

    if (user.isFarmer && req.body.farmerDetails) {
      user.farmerDetails = {
        ...user.farmerDetails,
        ...req.body.farmerDetails,
      }
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      address: updatedUser.address,
      profileImage: updatedUser.profileImage,
      isFarmer: updatedUser.isFarmer,
      farmerDetails: updatedUser.farmerDetails,
      isVerified: updatedUser.isVerified,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export { registerUser, loginUser, getUserProfile, updateUserProfile }
