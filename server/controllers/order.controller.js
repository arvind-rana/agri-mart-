import asyncHandler from "express-async-handler"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    deliveryMethod,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  }

  // Create order
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    deliveryMethod,
  })

  // Update product stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product)
    if (product) {
      product.countInStock -= item.qty
      await product.save()
    }
  }

  const createdOrder = await order.save()
  res.status(201).json(createdOrder)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({
      path: "orderItems.product",
      select: "name images",
    })
    .populate({
      path: "orderItems.seller",
      select: "name email",
    })

  if (order) {
    // Check if the user is authorized to view this order
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      !order.orderItems.some((item) => item.seller._id.toString() === req.user._id.toString())
    ) {
      res.status(401)
      throw new Error("Not authorized to view this order")
    }

    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Farmer
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    // Check if the user is the seller of any item in the order
    const isSeller = order.orderItems.some((item) => item.seller.toString() === req.user._id.toString())

    if (!isSeller && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to update this order")
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()
    order.status = "delivered"

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Farmer
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body
  const order = await Order.findById(req.params.id)

  if (order) {
    // Check if the user is the seller of any item in the order
    const isSeller = order.orderItems.some((item) => item.seller.toString() === req.user._id.toString())

    if (!isSeller && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized to update this order")
    }

    order.status = status

    if (status === "delivered") {
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
})

// @desc    Get orders for a seller
// @route   GET /api/orders/seller
// @access  Private/Farmer
const getSellerOrders = asyncHandler(async (req, res) => {
  // Find orders where the user is a seller of any item
  const orders = await Order.find({
    "orderItems.seller": req.user._id,
  })
    .populate("user", "name email")
    .sort({ createdAt: -1 })

  res.json(orders)
})

export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getSellerOrders,
}
