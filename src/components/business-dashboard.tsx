"use client"

import { StarIcon, TrendingUpIcon, TrendingDownIcon, BellIcon, RocketIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { getUser } from "@/app/util/serverFunctions"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import { iUser } from "@/app/util/Interfaces"
import Link from "next/link"
import { FaPlus } from 'react-icons/fa';

export function BusinessDashboardComponent() {
  const auth = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser;
  console.log(user)

  const products = user.business?.products || []

  if (!user.business) {
    return (
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-2xl ">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Grow With Review It</CardTitle>
          </CardHeader>
          <CardContent className="text-start">
            <RocketIcon className="w-24 h-24 mx-auto text-blue-500 mb-6" />
            <p className="text-xl mb-4">
              Ready to take your business to the next level? Now is the perfect time to start or expand your small business journey!
            </p>
            <ul className="text-xl text-start mb-4 list-disc pl-6 space-y-2">
              <li>Boost your online credibility with verified customer reviews</li>
              <li>Gain valuable insights to improve your products and services</li>
              <li>Increase visibility and attract new customers</li>
              <li>Build trust with potential clients through transparent feedback</li>
              <li>Leverage positive reviews for marketing and brand growth</li>
            </ul>
            <Link href="/submit" className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              Add Your Business
            </Link>
          </CardContent>
          <CardFooter className="text-center text-gray-600">
            Join us today and unlock the full potential of your business with our innovative solutions!
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className=" text-3xl font-bold mb-6 text-center">Your Business Dashboard</h1>

      {/* Add Business Button */}
      <div className="flex justify-center mb-6">
        <Link href="/submit" className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          <FaPlus className="w-4 h-4 mr-2" />
          Add New Business
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold truncate">{product.name}</span>
                <Badge className="text-white bg-black" variant="secondary">{product.tags[0] || "No Category"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center mb-2">
                <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
                <span className="text-gray-600 text-sm ml-2">({product.reviews?.length || 0} reviews)</span>
                {product.rating >= 3 ? (
                  <TrendingUpIcon className="w-4 h-4 text-green-500 ml-2" />
                ) : (
                  <TrendingDownIcon className="w-4 h-4 text-red-500 ml-2" />
                )}
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <BellIcon className="w-4 h-4 mr-1" />
                <span>{0} new notifications</span>
              </div>
              <p className="text-sm text-gray-700 mb-2" />
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Latest review:</span> &quot;{product.reviews?.[0]?.title || "No reviews yet"}&quot;
              </p>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </CardContent>
            <CardFooter>
              <button className="w-full bg-gray-900 text-gray-50 hover:bg-gray-900/90 py-2 rounded-md transition-colors ">
                View Details
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}