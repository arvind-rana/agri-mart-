import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  unit: string
  image: string
  seller: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-gray-500 text-xs mb-3">Seller: {product.seller}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-green-600">${product.price}</span>
            <span className="text-gray-500 text-sm">/{product.unit}</span>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
