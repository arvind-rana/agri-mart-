import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    name: "Vegetables",
    image: "/placeholder.svg?height=200&width=200",
    href: "/products?category=vegetables",
  },
  {
    name: "Fruits",
    image: "/placeholder.svg?height=200&width=200",
    href: "/products?category=fruits",
  },
  {
    name: "Seeds",
    image: "/placeholder.svg?height=200&width=200",
    href: "/products?category=seeds",
  },
  {
    name: "Fertilizers",
    image: "/placeholder.svg?height=200&width=200",
    href: "/products?category=fertilizers",
  },
  {
    name: "Tools",
    image: "/placeholder.svg?height=200&width=200",
    href: "/products?category=tools",
  },
]

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <div className="aspect-square relative">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-4 text-center bg-green-600 text-white">
              <h3 className="font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
