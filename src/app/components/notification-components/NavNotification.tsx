import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BellIcon } from 'lucide-react'
import { iProductOwnerNotification, iUserNotification } from '@/app/util/Interfaces'
import { useAtom, useSetAtom } from 'jotai'
import { ownerNotificationsAtom, userNotificationsAtom } from '@/app/store/store'
import { Button } from "@/components/ui/button"
import { useAuth } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { getNotifications, getUser } from '@/app/util/serverFunctions'
import LoadingSpinner from '../LoadingSpinner'
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface NotificationsData {
  userNotifications: iUserNotification[];
  ownerNotifications: iProductOwnerNotification[];
};

export default function NotificationDropdown() {
  dayjs.extend(relativeTime)
  const router = useRouter()

  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const setUserNotificationsAtom = useSetAtom(userNotificationsAtom);
  const setOwnerNotificationsAtom = useSetAtom(ownerNotificationsAtom);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", auth.userId],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  }) as any;

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications
  } = useQuery<NotificationsData, Error>({
    queryKey: ["notifications", auth.userId],
    queryFn: async () => await getNotifications(auth.userId || ""),
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (notificationsData) {
      console.log("notifications", notificationsData)
      setUserNotificationsAtom(notificationsData.userNotifications);
      setOwnerNotificationsAtom(notificationsData.ownerNotifications);
    }
  }, [notificationsData, setUserNotificationsAtom, setOwnerNotificationsAtom]);

  // if (isLoadingNotifications) return <LoadingSpinner />;
  if (isErrorNotifications) return <p>{errorNotifications?.toString()}</p>;

  const userCount = notificationsData?.userNotifications.length || 0
  const ownerCount = notificationsData?.ownerNotifications.length || 0
  const totalCount = userCount + ownerCount

  const latestUserNotifications = notificationsData?.userNotifications.slice(0, 3) || []
  const latestOwnerNotifications = notificationsData?.ownerNotifications.slice(0, 3) || []

  const handleClick = () => {
    setIsOpen(false)
  }

  function handleOwnerNotiClick(notification: iProductOwnerNotification): void {
    const path = '/fr';
    const params = new URLSearchParams({
      id: notification.review_id.toString(),
      productid: notification.product_id.toString(),
      // cid: notification.id.toString(),
    });

    router.push(`${path}?${params.toString()}`);
  }

  function handleUserNotiClick(notification: iUserNotification): void {
    const path = '/fr';
    const params = new URLSearchParams({
      id: notification.review_id.toString(),
      productid: notification.product_id!.toString(),
      cid: notification.id.toString(),
    });

    router.push(`${path}?${params.toString()}`);
  }
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BellIcon className="w-6 h-6 text-gray-600" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalCount > 99 ? '99+' : totalCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {userCount > 0 && (
          <>
            <DropdownMenuItem className="font-bold text-lg py-2">User Notifications</DropdownMenuItem>
            {latestUserNotifications.map((notification, index) => (
              <DropdownMenuItem key={`user-${index}`} className="flex flex-col items-start py-2" onClick={() => handleUserNotiClick(notification)}>
                <span className="font-medium pl-2">{notification.content}</span>
                <div className="w-full flex flex-wrap justify-between">
                  <span className="text-sm text-gray-500 pl-2">From: {notification.from_name}</span>
                  <span className="text-xs text-gray-400 pl-2 text-end">{dayjs(notification.created_at).fromNow()}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </>
        )}

        {ownerCount > 0 && (
          <>
            {userCount > 0 && <DropdownMenuSeparator />}
            <DropdownMenuItem className="font-bold text-lg py-2 " >New Product Reviews</DropdownMenuItem>
            {latestOwnerNotifications.map((notification, index) => (
              <DropdownMenuItem key={`owner-${index}`} className="flex flex-col items-start py-2 " onClick={() => handleOwnerNotiClick(notification)}>
                <span className="font-medium pl-2">{notification.review_title}</span>
                <span className="text-xs text-gray-400 pl-2">{notification.from_name} reviewed {notification.product_name}</span>
                <span className="text-xs text-gray-400 pl-2 text-end w-full ">{dayjs(notification.created_at).fromNow()}</span>
              </DropdownMenuItem>
            ))}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          <Link
            href="/notifications"
            className="w-full text-blue-600 hover:text-blue-800"
            onClick={() => {
              handleClick()
              setIsOpen(false)
            }}
          >
            See All Notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}
