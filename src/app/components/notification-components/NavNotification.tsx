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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NotificationsData {
  userNotifications: iUserNotification[];
  ownerNotifications: iProductOwnerNotification[];
};

export default function NotificationDropdown() {
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
    // isLoading: isLoadingNotifications, 
    // isError: isErrorNotifications, 
    // error: errorNotifications 
  } = useQuery<NotificationsData, Error>({
    queryKey: ["notifications", auth.userId],
    queryFn: async () => await getNotifications(auth.userId || ""),
    refetchOnWindowFocus: true,
    refetchInterval: 300000, // 30 seconds in milliseconds
  });

  useEffect(() => {
    if (notificationsData) {
      console.log("nav 787787", notificationsData)
      setUserNotificationsAtom(notificationsData.userNotifications);
      setOwnerNotificationsAtom(notificationsData.ownerNotifications);
    }
  }, [notificationsData, setUserNotificationsAtom, setOwnerNotificationsAtom]);

  // if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{error?.toString()}</p>;
  const count = notificationsData?.userNotifications.length || 0
  const latestNotifications = notificationsData?.userNotifications.slice(0, 3) || []

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <BellIcon className="w-6 h-6 text-gray-600" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {latestNotifications.map((notification, index) => (
          <DropdownMenuItem key={index} className="flex flex-col items-start py-2">
            <span className="font-medium">{notification.content}</span>
            <span className="text-sm text-gray-500">{notification.from_name}</span>
          </DropdownMenuItem>
        ))}
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
    </DropdownMenu>
  )
}
