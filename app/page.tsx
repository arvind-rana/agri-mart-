import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import ProductGrid from "@/components/product-grid"
import CategorySection from "@/components/category-section"
import HeroSection from "@/components/hero-section"
import FeaturedFarmers from "@/components/featured-farmers"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-6 relative -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for products, seeds, fertilizers..."
              className="w-full pl-10 pr-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <select className="px-4 py-3 border-l border-gray-200 focus:outline-none">
            <option>All Categories</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Seeds</option>
            <option>Fertilizers</option>
          </select>
          <Button className="ml-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-r-lg">Search</Button>
        </div>
      </div>

      {/* Categories */}
      <CategorySection />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
            View All
          </Link>
        </div>
        <ProductGrid />
      </section>

      {/* Featured Farmers */}
      <FeaturedFarmers />

      {/* Why Choose Us */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Agri-Mart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct from Farmers</h3>
              <p className="text-gray-600">
                Buy directly from farmers without middlemen, ensuring better prices for both parties.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                All products are verified for quality and authenticity before being listed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to ensure your agricultural needs are met on time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
