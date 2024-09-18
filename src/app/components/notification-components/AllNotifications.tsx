import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageSquare, Check } from "lucide-react"

interface iNotification {
  id: string;
  user_id: string;
  business_id: string;
  review_title: string;
  created_at?: Date;
  from_name: string;
  from_id: string;
  read: boolean;
  product_name: string;
  product_id: string;
}

interface NotificationsPageProps {
  notifications: iNotification[]
}

export default function AllNorifications({ notifications: initialNotifications }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const handleMarkAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleReply = (id: string) => {
    // Implement reply functionality here
    console.log(`Replying to notification ${id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <Accordion type="single" collapsible className="w-full">
              {notifications.map((notification, index) => (
                <AccordionItem value={`item-${index}`} key={notification.id}>
                  <AccordionTrigger className={`p-4 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-4">
                        <div className={`w-2 h-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                        <h3 className="font-semibold text-left">{notification.review_title}</h3>
                      </div>
                      <p className="text-xs text-gray-500">
                        {notification.created_at
                          ? new Date(notification.created_at).toLocaleString()
                          : 'Date unknown'}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-gray-600">
                        From: {notification.from_name} | Product: {notification.product_name}
                      </p>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleReply(notification.id)} size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        {!notification.read && (
                          <Button onClick={() => handleMarkAsRead(notification.id)} variant="outline" size="sm">
                            <Check className="w-4 h-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
