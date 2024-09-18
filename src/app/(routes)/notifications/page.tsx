"use client"
import AllNotifications from '@/app/components/notification-components/AllNotifications'
import React from 'react'
import { useAtom } from "jotai";
import { notificationsAtom } from "@/app/store/store";
const NotificationsPage = () => {
  const [notifications] = useAtom(notificationsAtom);
  return (
    <AllNotifications notifications={notifications} />
  )
}
export default NotificationsPage
