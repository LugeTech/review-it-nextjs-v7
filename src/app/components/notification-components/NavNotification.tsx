import { useState } from 'react'
import Link from 'next/link'
import { BellIcon } from 'lucide-react'
import { iUserNotification } from '@/app/util/Interfaces'
import { useAtom } from 'jotai'
import { AllNotificationsAtom, userNotificationsAtom } from '@/app/store/store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


export default function NotificationDropdown() {
  const [notifications] = useAtom(AllNotificationsAtom);
  // const [notiAtoms, setNotiAtoms] = useAtom(userNotificationsAtom)
  const [isOpen, setIsOpen] = useState(false)

  const count = notifications.userNotifications?.length || 0
  const latestNotifications: iUserNotification[] = notifications.userNotifications.slice(0, 3)

  // const handleClick = () => {
  //   console.log("running set atoms")
  //   setNotiAtoms(notiAtoms)
  // }

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
              // handleClick()
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
