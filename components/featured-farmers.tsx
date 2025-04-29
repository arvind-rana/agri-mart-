import Image from "next/image"
import Link from "next/link"

const farmers = [
  {
    id: 1,
    name: "John Smith",
    location: "Green Valley, CA",
    specialty: "Organic Vegetables",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Maria Garcia",
    location: "Sunny Hills, FL",
    specialty: "Tropical Fruits",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Robert Johnson",
    location: "Midwest Farms, IL",
    specialty: "Corn & Grains",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Sarah Williams",
    location: "Apple Orchard, WA",
    specialty: "Apples & Berries",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
  },
]

export default function FeaturedFarmers() {
  return (
    <section className="bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Featured Farmers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {farmers.map((farmer) => (
            <Link
              key={farmer.id}
              href={`/farmers/${farmer.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image src={farmer.image || "/placeholder.svg"} alt={farmer.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{farmer.name}</h3>
                <p className="text-gray-600 text-sm">{farmer.location}</p>
                <p className="text-green-600 text-sm font-medium mt-1">{farmer.specialty}</p>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ${i < Math.floor(farmer.rating) ? "fill-current" : "stroke-current fill-none"}`}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-600 text-sm">{farmer.rating}/5</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
