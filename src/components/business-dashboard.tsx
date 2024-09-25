"use client"
import { StarIcon, TrendingUpIcon, TrendingDownIcon, BellIcon, RocketIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { getUser, getNotifications } from "@/app/util/serverFunctions"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import { iProductOwnerNotification, iUser, iUserNotification } from "@/app/util/Interfaces"
import Link from "next/link"
import { FaPlus } from 'react-icons/fa';
import NotificationBell from "@/app/components/notification-components/Notification"
import { ownerNotificationsAtom, userNotificationsAtom } from "@/app/store/store"
import { useSetAtom } from "jotai"
import { useEffect } from "react"

interface NotificationsData {
  userNotifications: iUserNotification[];
  ownerNotifications: iProductOwnerNotification[];
};

export function BusinessDashboardComponent() {
  // const [_, setNotificationsAtom] = useAtom(notificationsAtom)
  const auth = useAuth();
  const setUserNotificationsAtom = useSetAtom(userNotificationsAtom);
  const setOwnerNotificationsAtom = useSetAtom(ownerNotificationsAtom);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any;

  const { data: notificationsData, isLoading: isLoadingNotifications, isError: isErrorNotifications, error: errorNotifications } = useQuery<NotificationsData, Error>({
    queryKey: ["notifications", auth.userId],
    queryFn: async () => await getNotifications(auth.userId || ""),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (notificationsData) {
      setUserNotificationsAtom(notificationsData.userNotifications);
      setOwnerNotificationsAtom(notificationsData.ownerNotifications);
    }
  }, [notificationsData, setUserNotificationsAtom, setOwnerNotificationsAtom]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const user: iUser | undefined = data?.data as iUser;

  // get all a users products from all their businesses
  const products = user.businesses?.flatMap(business => business.products) || [];


  // This might come in handy later, this keeps tha business umbrella
  //   const businessProducts = user.businesses?.map(business => ({
  //   businessId: business.id,
  //   products: business.products
  // })) || [];

  if ((user.businesses?.length || 0) < 1) {
    return (
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-2xl ">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Contribute to Review It</CardTitle>
          </CardHeader>
          <CardContent className="text-start">
            <RocketIcon className="w-24 h-24 mx-auto text-blue-500 mb-6" />
            <p className="text-base md:text-xl mb-4">
              Help local businesses thrive by adding them to our platform. Anyone can contribute!
            </p>
            <ul className="text-base md:text-xl text-start mb-4 list-disc pl-6 space-y-2">
              <li>Support small businesses in your community</li>
              <li>Help customers discover great local services</li>
              <li>Contribute to a transparent review ecosystem</li>
              <li>Empower businesses with valuable customer feedback</li>
              <li>Foster local economic growth through increased visibility</li>
            </ul>
            <Link href="/submit" className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
              Add a Business
            </Link>
          </CardContent>
          <CardFooter className="text-center text-gray-600">
            Join our community effort to boost local businesses and help them reach their full potential!
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
                <Badge className="text-white bg-black" variant="secondary">{product.tags.slice(0, 1).join(", ") || "No Category"}</Badge>
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
                <NotificationBell notifications={notificationsData?.ownerNotifications.filter((notification: iProductOwnerNotification) => notification.product_id === product.id) || []} />
              </div>
              <p className="text-sm text-gray-700 mb-2" />
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Latest review:</span> &quot;{product.reviews?.[0]?.title || "No reviews yet"}&quot;
                <span className="text-gray-600 text-sm ml-2">({product.reviews?.[0]?.createdDate ? new Date(product.reviews?.[0]?.createdDate).toLocaleDateString() : null})</span>
              </p>
              <p className="text-gray-600 text-sm">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
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
