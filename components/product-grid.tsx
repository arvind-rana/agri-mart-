import ProductCard from "./product-card"

// Sample product data
const products = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    description: "Locally grown organic tomatoes",
    price: 2.99,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Green Valley Farm",
    category: "vegetables",
  },
  {
    id: 2,
    name: "Premium Apple Seeds",
    description: "High-yield apple seeds for planting",
    price: 5.49,
    unit: "packet",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Seed Master",
    category: "seeds",
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    description: "100% organic plant fertilizer",
    price: 12.99,
    unit: "5kg bag",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Nature's Best",
    category: "fertilizers",
  },
  {
    id: 4,
    name: "Fresh Strawberries",
    description: "Sweet and juicy strawberries",
    price: 3.99,
    unit: "box",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Berry Good Farm",
    category: "fruits",
  },
  {
    id: 5,
    name: "Gardening Gloves",
    description: "Durable gardening gloves",
    price: 8.99,
    unit: "pair",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Farm Tools Inc",
    category: "tools",
  },
  {
    id: 6,
    name: "Fresh Carrots",
    description: "Organic carrots freshly harvested",
    price: 1.99,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Root Vegetables Farm",
    category: "vegetables",
  },
  {
    id: 7,
    name: "Mango Saplings",
    description: "Ready to plant mango saplings",
    price: 15.99,
    unit: "each",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Tropical Nursery",
    category: "seeds",
  },
  {
    id: 8,
    name: "Pesticide Sprayer",
    description: "Manual pesticide sprayer",
    price: 24.99,
    unit: "each",
    image: "/placeholder.svg?height=300&width=300",
    seller: "Farm Equipment Co",
    category: "tools",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
