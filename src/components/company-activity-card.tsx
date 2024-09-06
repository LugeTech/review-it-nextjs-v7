"'use client'"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ThumbsUp, MessageCircle, Award, TrendingUp } from "lucide-react"

const activities = [
  { icon: Star, text: "New 5-star review", date: "2 hours ago" },
  { icon: ThumbsUp, text: "Responded to a review", date: "1 day ago" },
  { icon: MessageCircle, text: "New customer inquiry", date: "2 days ago" },
  { icon: Award, text: "Achieved 'Great' TrustScore", date: "1 week ago" },
  { icon: TrendingUp, text: "Profile views up by 20%", date: "2 weeks ago" },
]

export function CompanyActivityCard() {
  return (
    <Card className="w-full md:w-1/2 ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Company Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="bg-gray-900/10 rounded-full p-2 dark:bg-gray-50/10">
                <activity.icon className="h-5 w-5 text-gray-900 dark:text-gray-50" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.text}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
