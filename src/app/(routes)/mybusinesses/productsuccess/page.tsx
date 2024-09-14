"use client"

import { CheckCircleIcon, TagIcon, ClockIcon, PhoneIcon, GlobeIcon, MailIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// Fake product data
const fakeProduct = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  address: "123 Main St, Anytown, USA",
  createdDate: new Date("2024-09-14T12:00:00Z"),
  description: "Experience the future of smart home technology with our revolutionary AI-powered assistant.",
  display_image: "https://example.com/images/smart-home-assistant.jpg",
  images: [
    "https://example.com/images/smart-home-assistant-1.jpg",
    "https://example.com/images/smart-home-assistant-2.jpg",
  ],
  videos: ["https://example.com/videos/product-demo.mp4"],
  links: ["https://example.com/product-page", "https://example.com/user-manual"],
  name: "SmartHome AI Assistant",
  tags: ["Smart Home", "AI", "Voice Control", "Energy Efficient"],
  openingHrs: "09:00",
  closingHrs: "18:00",
  telephone: "+1 (555) 123-4567",
  website: ["https://smarthomeai.com"],
  rating: 5,
  hasOwner: true,
  ownerId: "owner-123",
  reviews: [
    { id: "review-1", title: "Amazing product!", content: "This has changed my life!" },
    { id: "review-2", title: "Highly recommended", content: "Easy to use and very effective." },
  ],
  createdById: "user-456",
  isDeleted: false,
  email: "info@smarthomeai.com",
  businessOwnerId: "business-789",
}

export default function ProductSuccess() {
  // const product = fakeProduct;
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product');

  // Parse the product data from the search params
  const product = productParam ? JSON.parse(decodeURIComponent(productParam)) : null;

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-green-700">Success!</CardTitle>
          <p className="text-xl text-gray-600 mt-2">Your product has been successfully added/updated.</p>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <img src={product.display_image} alt={product.name} className="w-24 h-24 object-cover rounded" />
            </div>
            {/* <div className="flex items-center mb-4"> */}
            {/*   <StarIcon className="w-5 h-5 text-yellow-400 mr-2" /> */}
            {/*   <span className="font-bold text-lg">{product.rating}</span> */}
            {/*   <span className="text-gray-600 text-sm ml-2">({product.reviews.length} reviews)</span> */}
            {/* </div> */}
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag: string, index: number) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  <TagIcon className="w-4 h-4 mr-1 inline-block" />
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <p><ClockIcon className="w-4 h-4 inline-block mr-1" /> {product.openingHrs} - {product.closingHrs}</p>
              <p><PhoneIcon className="w-4 h-4 inline-block mr-1" /> {product.telephone}</p>
              <p><GlobeIcon className="w-4 h-4 inline-block mr-1" /> {product.website[0]}</p>
              <p><MailIcon className="w-4 h-4 inline-block mr-1" /> {product.email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/mybusinesses" className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-md transition-colors duration-300">
            View Product
          </Link>
          <Link href="/mybusinesses" className="bg-gray-200 text-gray-800 hover:bg-gray-300 py-2 px-4 rounded-md transition-colors duration-300">
            Back to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
