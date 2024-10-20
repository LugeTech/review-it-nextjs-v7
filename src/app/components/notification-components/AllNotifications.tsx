"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Eye, MessageSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  iProductOwnerNotification,
  iUserNotification,
} from "@/app/util/Interfaces";
import { markNotificationAsRead } from "@/app/util/NotificationFunctions";
import { useAtom } from "jotai";
import {
  ownerNotificationsAtom,
  userNotificationsAtom,
} from "@/app/store/store";
import Link from "next/link";

interface NotificationsPageProps {
  ONA: iProductOwnerNotification[];
  UNA: iUserNotification[];
}

export default function NotificationsPage({
  ONA: initialONA,
  UNA: initialUNA,
}: NotificationsPageProps) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"owner" | "user">("owner");

  const [ONA, setONA] = useAtom(ownerNotificationsAtom);
  const [UNA, setUNA] = useAtom(userNotificationsAtom);

  useEffect(() => {
    setONA(initialONA);
    setUNA(initialUNA);
  }, [initialONA, initialUNA, setONA, setUNA]);

  useEffect(() => {
    if (ONA.length === 0 && UNA.length === 0) {
      router.replace("/mybusinesses");
    }
  }, [ONA, UNA, router]);

  const handleMarkAsRead = async (
    notificationId: string,
    notificationType: "owner" | "user",
  ) => {
    try {
      const result = await markNotificationAsRead(
        notificationId,
        notificationType,
      );

      if (notificationType === "owner") {
        setONA((prevNotifications: iProductOwnerNotification[]) => {
          const updatedNotifications = prevNotifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n,
          );
          return updatedNotifications;
        });
      } else {
        setUNA((prevNotifications: iUserNotification[]) => {
          const updatedNotifications = prevNotifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n,
          );
          return updatedNotifications;
        });
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      // alert("Failed to mark notification as read. Please try again.");
    }
  };

  const filteredOwnerNotifications = ONA.filter((notification) => {
    const matchesFilter =
      filter === "all" || (filter === "unread" && !notification.read);
    const matchesSearch =
      notification.review_title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notification.from_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.product_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredUserNotifications = UNA.filter((notification) => {
    const matchesFilter =
      filter === "all" || (filter === "unread" && !notification.read);
    const matchesSearch =
      notification.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.from_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const ownerUnreadCount = ONA.filter((n) => !n.read).length;
  const userUnreadCount = UNA.filter((n) => !n.read).length;
  const totalOwnerCount = ONA.length;
  const totalUserCount = UNA.length;

  if (ONA.length === 0 && UNA.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Notifications Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalOwnerCount + totalUserCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Notifications
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ownerUnreadCount + userUnreadCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                ((totalOwnerCount +
                  totalUserCount -
                  (ownerUnreadCount + userUnreadCount)) /
                  (totalOwnerCount + totalUserCount)) *
                100
              ).toFixed(1)}
              %
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <Tabs
            defaultValue={ONA.length > 0 ? "owner" : "user"}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="user" onClick={() => setActiveTab("user")}>
                  User Notifications
                </TabsTrigger>
                {ONA.length > 0 && (
                  <TabsTrigger
                    value="owner"
                    onClick={() => setActiveTab("owner")}
                  >
                    Owner Notifications
                  </TabsTrigger>
                )}
              </TabsList>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className={`${
                    filter === "all"
                      ? "bg-myTheme-primary text-white hover:bg-custom-active/90"
                      : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  className={`${
                    filter === "unread"
                      ? "bg-myTheme-primary text-white hover:bg-custom-active/90"
                      : ""
                  }`}
                  onClick={() => setFilter("unread")}
                >
                  Unread
                </Button>
                <Input
                  type="search"
                  placeholder="Search notifications..."
                  className="max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {ONA.length > 0 && (
              <TabsContent value="owner" className="space-y-4">
                <ScrollArea className="h-[600px]">
                  {filteredOwnerNotifications.map((notification) => (
                    <OwnerNotificationCard
                      key={notification.id}
                      notification={notification}
                      handleMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </ScrollArea>
              </TabsContent>
            )}
            <TabsContent value="user" className="space-y-4">
              <ScrollArea className="h-[600px]">
                {filteredUserNotifications.map((notification) => (
                  <UserNotificationCard
                    key={notification.id}
                    notification={notification}
                    handleMarkAsRead={handleMarkAsRead}
                  />
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function OwnerNotificationCard({
  notification,
  handleMarkAsRead,
}: {
  notification: iProductOwnerNotification;
  handleMarkAsRead: (
    notificationId: string,
    notificationType: "owner" | "user",
  ) => void;
}) {
  return (
    <Card
      className={`mb-4 ${notification.read ? "bg-myTheme-read" : "bg-myTheme-unread"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              <Link
                href={`/fr?id=${notification.review_id}&productid=${notification.product_id}`}
              >
                {notification.review_title}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              From:{" "}
              <Link href={`/userprofile/${notification.from_id}`}>
                {notification.from_name}
              </Link>{" "}
              | Product:{" "}
              <Link href={`/reviews?id=${notification.product_id}`}>
                {notification.product_name}
              </Link>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {notification.created_at
                ? new Date(notification.created_at).toLocaleString()
                : "Date unknown"}
            </p>
          </div>
          <Badge
            className="bg-black text-white"
            variant={notification.read ? "secondary" : "default"}
          >
            {notification.read ? "Read" : "Unread"}
          </Badge>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          {!notification.read && (
            <Button
              onClick={() => handleMarkAsRead(notification.id, "owner")}
              size="sm"
              variant="outline"
            >
              Mark as Read
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function UserNotificationCard({
  notification,
  handleMarkAsRead,
}: {
  notification: iUserNotification;
  handleMarkAsRead: (
    notificationId: string,
    notificationType: "owner" | "user",
  ) => void;
}) {
  return (
    <Card
      className={`mb-4 ${notification.read ? "bg-myTheme-read" : "bg-myTheme-unread"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              <Link
                href={`/fr?id=${notification.review_id}&productid=${notification.product_id}`}
              >
                {notification.content.length > 120
                  ? `${notification.content.substring(0, 120)}...`
                  : notification.content}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">
              From: {notification.from_name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {notification.created_at
                ? new Date(notification.created_at).toLocaleString()
                : "Date unknown"}
            </p>
          </div>
          <Badge
            className="bg-black text-white"
            variant={notification.read ? "secondary" : "default"}
          >
            {notification.read ? "Read" : "Unread"}
          </Badge>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="outline">
            <Link
              href={`/fr?id=${notification.review_id}&productid=${notification.product_id}`}
              className="flex"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </Button>
          {!notification.read && (
            <Button
              onClick={() => handleMarkAsRead(notification.id, "user")}
              size="sm"
              variant="outline"
            >
              Mark as Read
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
