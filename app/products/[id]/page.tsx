import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const product = {
  id: 1,
  name: "Fresh Organic Tomatoes",
  description:
    "Locally grown organic tomatoes, harvested at peak ripeness for maximum flavor and nutrition. These tomatoes are grown without synthetic pesticides or fertilizers, making them a healthy choice for your family.",
  price: 2.99,
  unit: "kg",
  image: "/placeholder.svg?height=600&width=600",
  seller: {
    name: "Green Valley Farm",
    rating: 4.8,
    location: "California",
    id: 1,
  },
  category: "vegetables",
  stock: 50,
  farming_method: "Organic",
  harvest_date: "2023-04-15",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-green-600 hover:underline">
          ← Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="relative h-96 w-full mb-4 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((img, index) => (
              <div key={index} className="relative h-24 rounded-md overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.seller.rating) ? "fill-current" : "fill-none"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.seller.rating} (120 reviews)</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-4">
              ${product.price} <span className="text-gray-500 text-lg font-normal">/{product.unit}</span>
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Seller</p>
                <p className="font-medium">{product.seller.name}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{product.seller.location}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Farming Method</p>
                <p className="font-medium">{product.farming_method}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">Harvest Date</p>
                <p className="font-medium">{product.harvest_date}</p>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md mr-4">
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">1</span>
                <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">{product.stock}</span> {product.unit}s available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="bg-green-600 hover:bg-green-700 flex-1 py-6">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 flex-1 py-6">
                Buy Now
              </Button>
            </div>

            <div className="flex items-center text-gray-600">
              <Truck className="h-5 w-5 mr-2" />
              <p>Free delivery on orders over $50</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Product Information</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Category</td>
                  <td className="py-2 font-medium">{product.category}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Farming Method</td>
                  <td className="py-2 font-medium">{product.farming_method}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Origin</td>
                  <td className="py-2 font-medium">{product.seller.location}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-gray-600">Harvest Date</td>
                  <td className="py-2 font-medium">{product.harvest_date}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">About the Seller</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt={product.seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{product.seller.name}</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.seller.rating) ? "fill-current" : "fill-none"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">{product.seller.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Green Valley Farm is a family-owned organic farm dedicated to growing the freshest produce using
                sustainable farming practices.
              </p>
              <Link href={`/farmers/${product.seller.id}`}>
                <Button variant="outline" className="w-full">
                  View Seller Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
