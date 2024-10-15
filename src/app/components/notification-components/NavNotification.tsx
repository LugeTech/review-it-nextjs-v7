import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BellIcon } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import {
  iProductOwnerNotification,
  iUserNotification,
} from "@/app/util/Interfaces";
import {
  ownerNotificationsAtom,
  userNotificationsAtom,
} from "@/app/store/store";
import { getNotifications, getUser } from "@/app/util/serverFunctions";
import LoadingSpinner from "../LoadingSpinner";

dayjs.extend(relativeTime);

interface NotificationsData {
  userNotifications: iUserNotification[];
  ownerNotifications: iProductOwnerNotification[];
}

type NotificationType = iUserNotification | iProductOwnerNotification;

export default function NotificationDropdown() {
  const router = useRouter();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const setUserNotificationsAtom = useSetAtom(userNotificationsAtom);
  const setOwnerNotificationsAtom = useSetAtom(ownerNotificationsAtom);
  const [unReadNotifications, setUnReadNotifications] =
    useState<NotificationsData>();

  // const { data: userData } = useQuery({
  //   queryKey: ["user", auth.userId],
  //   queryFn: getUser,
  //   refetchOnWindowFocus: false,
  // });

  function getUnreadNotifications(
    notifications: NotificationsData,
  ): NotificationsData {
    return {
      userNotifications: notifications.userNotifications.filter(
        (notification) => notification.read === false,
      ),
      ownerNotifications: notifications.ownerNotifications.filter(
        (notification) => notification.read === false,
      ),
    };
  }

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
    error: errorNotifications,
  } = useQuery<NotificationsData, Error>({
    queryKey: ["notifications", auth.userId],
    queryFn: () => getNotifications(auth.userId || ""),
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (notificationsData) {
      setUnReadNotifications(getUnreadNotifications(notificationsData));
      setUserNotificationsAtom(notificationsData.userNotifications);
      setOwnerNotificationsAtom(notificationsData.ownerNotifications);
    }
  }, [notificationsData, setUserNotificationsAtom, setOwnerNotificationsAtom]);

  if (isErrorNotifications)
    return <p className="text-red-500">{errorNotifications?.message}</p>;

  const userCount = unReadNotifications?.userNotifications.length || 0;
  const ownerCount = unReadNotifications?.ownerNotifications.length || 0;
  const totalCount = userCount + ownerCount;

  const latestUserNotifications =
    unReadNotifications?.userNotifications.slice(0, 3) || [];
  const latestOwnerNotifications =
    unReadNotifications?.ownerNotifications.slice(0, 3) || [];

  const handleOwnerNotiClick = (notification: iProductOwnerNotification) => {
    const params = new URLSearchParams({
      id: notification.review_id.toString(),
      productid: notification.product_id.toString(),
    });
    router.push(`/fr?${params.toString()}`);
    setIsOpen(false);
  };

  const handleUserNotiClick = (notification: iUserNotification) => {
    const params = new URLSearchParams({
      id: notification.review_id.toString(),
      productid: notification.product_id!.toString(),
      cid: notification.id.toString(),
    });
    router.push(`/fr?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {totalCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5"
            >
              {totalCount > 99 ? "99+" : totalCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 max-h-[80vh] overflow-y-auto"
      >
        {isLoadingNotifications ? (
          <LoadingSpinner />
        ) : (
          <>
            {renderNotificationSection(
              "User Notifications",
              latestUserNotifications,
              handleUserNotiClick,
            )}
            {userCount > 0 && ownerCount > 0 && <DropdownMenuSeparator />}
            {renderNotificationSection(
              "New Product Reviews",
              latestOwnerNotifications,
              handleOwnerNotiClick,
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/notifications"
                className="w-full text-center text-blue-600 hover:text-blue-800"
              >
                See All Notifications
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function renderNotificationSection(
  title: string,
  notifications: any[],
  onClick: (notification: any) => void,
) {
  if (notifications.length === 0) return null;

  return (
    <>
      <DropdownMenuItem className="font-bold text-lg py-2">
        {title}
      </DropdownMenuItem>
      {notifications.map((notification, index) => (
        <DropdownMenuItem
          key={`${title.toLowerCase()}-${index}`}
          className="flex flex-col items-start py-2 cursor-pointer"
          onClick={() => onClick(notification)}
        >
          <span className="font-medium">
            {notification.content || notification.review_title}
          </span>
          <div className="w-full flex flex-wrap justify-between text-sm text-gray-500">
            <span>{notification.from_name}</span>
            <span className="text-xs text-gray-400">
              {dayjs(notification.created_at).fromNow()}
            </span>
          </div>
        </DropdownMenuItem>
      ))}
    </>
  );
}
