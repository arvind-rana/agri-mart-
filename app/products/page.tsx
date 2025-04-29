import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import ProductGrid from "@/components/product-grid"
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="vegetables" />
                  <label htmlFor="vegetables" className="ml-2 text-sm">
                    Vegetables
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="fruits" />
                  <label htmlFor="fruits" className="ml-2 text-sm">
                    Fruits
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="seeds" />
                  <label htmlFor="seeds" className="ml-2 text-sm">
                    Seeds
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="fertilizers" />
                  <label htmlFor="fertilizers" className="ml-2 text-sm">
                    Fertilizers
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="tools" />
                  <label htmlFor="tools" className="ml-2 text-sm">
                    Tools & Equipment
                  </label>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <Slider defaultValue={[0, 100]} max={100} step={1} className="mb-4" />
              <div className="flex justify-between">
                <span className="text-sm">$0</span>
                <span className="text-sm">$100+</span>
              </div>
            </div>

            {/* Seller Rating */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Seller Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="rating-4" />
                  <label htmlFor="rating-4" className="ml-2 text-sm">
                    4★ & above
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-3" />
                  <label htmlFor="rating-3" className="ml-2 text-sm">
                    3★ & above
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="rating-2" />
                  <label htmlFor="rating-2" className="ml-2 text-sm">
                    2★ & above
                  </label>
                </div>
              </div>
            </div>

            {/* Farming Method */}
            <div>
              <h3 className="font-medium mb-2">Farming Method</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="organic" />
                  <label htmlFor="organic" className="ml-2 text-sm">
                    Organic
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="conventional" />
                  <label htmlFor="conventional" className="ml-2 text-sm">
                    Conventional
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          {/* Mobile Filters */}
          <div className="md:hidden mb-6 flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Showing 24 results</p>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select className="border rounded-md px-2 py-1 text-sm">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid />

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex">
              <Button variant="outline" className="rounded-l-md rounded-r-none">
                Previous
              </Button>
              <Button variant="outline" className="rounded-none bg-green-50 border-green-600 text-green-600">
                1
              </Button>
              <Button variant="outline" className="rounded-none">
                2
              </Button>
              <Button variant="outline" className="rounded-none">
                3
              </Button>
              <Button variant="outline" className="rounded-r-md rounded-l-none">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
