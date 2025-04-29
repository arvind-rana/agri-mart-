import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Agri-Mart</h3>
            <p className="mb-4">
              Connecting farmers directly with buyers. Buy and sell agricultural products with ease.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-300">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-green-300">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-green-300">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-green-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-green-300">
                  Sell
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=vegetables" className="hover:text-green-300">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link href="/products?category=fruits" className="hover:text-green-300">
                  Fruits
                </Link>
              </li>
              <li>
                <Link href="/products?category=seeds" className="hover:text-green-300">
                  Seeds
                </Link>
              </li>
              <li>
                <Link href="/products?category=fertilizers" className="hover:text-green-300">
                  Fertilizers
                </Link>
              </li>
              <li>
                <Link href="/products?category=tools" className="hover:text-green-300">
                  Tools & Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-green-300 flex-shrink-0" />
                <span>123 Farm Road, Agriville, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-green-300 flex-shrink-0" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-300 flex-shrink-0" />
                <span>info@agri-mart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Agri-Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
