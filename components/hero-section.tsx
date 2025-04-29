import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-green-600 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/placeholder.svg?height=800&width=1600')" }}
      ></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh From Farm to Your Doorstep</h1>
          <p className="text-xl mb-8">
            Connect directly with farmers to buy and sell agricultural products. No middlemen, better prices, fresher
            produce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">Shop Now</Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" className="border-white text-white hover:bg-green-700 px-8 py-6 text-lg">
                Sell Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
