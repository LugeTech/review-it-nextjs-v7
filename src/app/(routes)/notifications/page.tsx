"use client"
import AllNotifications from '@/app/components/notification-components/AllNotifications'
import React from 'react'
import { useAtom } from "jotai";
import { ownerNotificationsAtom } from "@/app/store/store";
import { userNotificationsAtom } from "@/app/store/store";
const NotificationsPage = () => {
  const [ONA] = useAtom(ownerNotificationsAtom);
  const [UNA] = useAtom(userNotificationsAtom);
  return (
    <AllNotifications UNA={UNA} ONA={ONA} />
  )
}
export default NotificationsPage
