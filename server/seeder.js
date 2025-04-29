import dotenv from "dotenv"
import User from "./models/user.model.js"
import Product from "./models/product.model.js"
import Category from "./models/category.model.js"
import Order from "./models/order.model.js"
import Review from "./models/review.model.js"
import { users, products, categories } from "./data/seedData.js"
import connectDB from "./config/db.js"

dotenv.config()

// Connect to database
connectDB()

// Import data
const importData = async () => {
  try {
    // Clear all collections
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()
    await Review.deleteMany()

    // Insert seed data
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const farmerUser = createdUsers[1]._id

    const createdCategories = await Category.insertMany(categories)

    const sampleProducts = products.map((product, index) => {
      return {
        ...product,
        user: farmerUser,
        category: createdCategories[index % createdCategories.length]._id,
      }
    })

    await Product.insertMany(sampleProducts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Destroy data
const destroyData = async () => {
  try {
    // Clear all collections
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()
    await Review.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// Run script based on command line argument
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
