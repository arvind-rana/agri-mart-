import mongoose from "mongoose"

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "lb", "piece", "dozen", "box", "bag", "packet"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    farmingMethod: {
      type: String,
      enum: ["organic", "conventional", "hydroponic", "permaculture"],
      default: "conventional",
    },
    harvestDate: {
      type: Date,
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    deliveryOptions: {
      pickup: {
        type: Boolean,
        default: true,
      },
      delivery: {
        type: Boolean,
        default: false,
      },
      shipping: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Add text index for search functionality
productSchema.index({ name: "text", description: "text" })

const Product = mongoose.model("Product", productSchema)

export default Product
