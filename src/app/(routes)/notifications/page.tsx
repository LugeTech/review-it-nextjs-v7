"use client"
import AllNotifications from '@/app/components/notification-components/AllNotifications'
import React from 'react'
import { useAtom } from "jotai";
import { ownerNotificationsAtom } from "@/app/store/store";
const NotificationsPage = () => {
  const [notifications] = useAtom(ownerNotificationsAtom);
  console.log('notifications', notifications)
  return (
    <AllNotifications notifications={notifications} />
  )
}
export default NotificationsPage
