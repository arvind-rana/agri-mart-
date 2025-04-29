import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"

export default function SellPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Sell Your Products</h1>
        <p className="text-gray-600 mb-8">List your agricultural products for sale on Agri-Mart</p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="e.g. Organic Tomatoes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="seeds">Seeds</SelectItem>
                        <SelectItem value="fertilizers">Fertilizers</SelectItem>
                        <SelectItem value="tools">Tools & Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe your product in detail" rows={4} />
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input id="price" type="number" step="0.01" min="0" className="pl-8" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="g">Gram (g)</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="piece">Piece</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="box">Box</SelectItem>
                        <SelectItem value="bag">Bag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity</Label>
                    <Input id="quantity" type="number" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farming-method">Farming Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="conventional">Conventional</SelectItem>
                        <SelectItem value="hydroponic">Hydroponic</SelectItem>
                        <SelectItem value="permaculture">Permaculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="col-span-full">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your images here</p>
                      <p className="text-gray-500 text-sm mb-4">or</p>
                      <Button variant="outline" type="button">
                        Browse Files
                      </Button>
                      <p className="text-gray-500 text-xs mt-4">
                        Upload up to 5 images (JPEG, PNG, WebP). Max 5MB each.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" id="pickup" className="mt-1" />
                    <div>
                      <Label htmlFor="pickup" className="font-medium">
                        Pickup Available
                      </Label>
                      <p className="text-gray-500 text-sm">Buyers can pick up the product from your location</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" id="delivery" className="mt-1" />
                    <div>
                      <Label htmlFor="delivery" className="font-medium">
                        Delivery Available
                      </Label>
                      <p className="text-gray-500 text-sm">You can deliver the product to the buyer</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" id="shipping" className="mt-1" />
                    <div>
                      <Label htmlFor="shipping" className="font-medium">
                        Shipping Available
                      </Label>
                      <p className="text-gray-500 text-sm">You can ship the product to the buyer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t">
                <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">List Product for Sale</Button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  By listing your product, you agree to our Terms of Service and Seller Guidelines
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
