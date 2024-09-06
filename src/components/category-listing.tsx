"use client"

import { ChevronRight, ShoppingBag, Briefcase, Car, Home, Heart } from "lucide-react"

const categories = [
  {
    name: "For Sale",
    icon: <ShoppingBag className="w-6 h-6" />,
    subcategories: ["Antiques", "Appliances", "Arts & Crafts", "Auto Parts", "Beauty & Health", "Books", "Electronics", "Furniture", "Toys & Games"]
  },
  {
    name: "Services",
    icon: <Briefcase className="w-6 h-6" />,
    subcategories: ["Automotive", "Beauty", "Computer", "Creative", "Cycle", "Event", "Financial", "Legal", "Lessons"]
  },
  {
    name: "Jobs",
    icon: <ShoppingBag className="w-6 h-6" />,
    subcategories: ["Accounting", "Admin", "Customer Service", "Education", "Engineering", "Healthcare", "Legal", "Manufacturing", "Marketing"]
  },
  {
    name: "Housing",
    icon: <Home className="w-6 h-6" />,
    subcategories: ["Apartments", "Commercial", "Parking & Storage", "Real Estate", "Room Shares", "Vacation Rentals"]
  },
  {
    name: "Community",
    icon: <Heart className="w-6 h-6" />,
    subcategories: ["Activities", "Artists", "Childcare", "Classes", "Events", "General", "Groups", "Local News", "Lost & Found"]
  },
  {
    name: "Vehicles",
    icon: <Car className="w-6 h-6" />,
    subcategories: ["Cars & Trucks", "Motorcycles", "RVs", "Boats", "Auto Parts", "Heavy Equipment"]
  }
]

export default function CategoryListing() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Services, Products & Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {category.icon}
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
            <ul className="p-4 space-y-2">
              {category.subcategories.map((subcategory, subIndex) => (
                <li key={subIndex}>
                  <a href="#" className="text-blue-600 hover:underline flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                    <span>{subcategory}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
