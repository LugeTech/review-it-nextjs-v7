import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageCircle, ThumbsUp, FileText, Search } from "lucide-react"
import { iUser } from "../util/Interfaces"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
interface UserInfoProps {
  user: iUser
}

export default function UserInfo({ user }: UserInfoProps) {
  const { firstName, lastName, avatar, reviews, comments, likedReviews } = user
  const [activeTab, setActiveTab] = useState("reviews")
  const [searchTerm, setSearchTerm] = useState("")
  dayjs.extend(relativeTime)
  const filteredReviews = reviews?.filter((review) =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredComments = comments?.filter((comment) =>
    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLikes = likedReviews?.filter((liked) => {
    const likedReviews = liked.title.toLowerCase().includes(searchTerm.toLowerCase()) && liked.userId !== user.id
    return likedReviews
  })

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-75" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Avatar className="h-32 w-32 sm:h-40 sm:w-40 border-4 border-background">
            <AvatarImage src={avatar || ""} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{`${firstName} ${lastName}`}</h2>
          <p className="text-muted-foreground">@{firstName.toLowerCase()}</p>
        </div>

        <Tabs defaultValue="reviews" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="reviews">
              <FileText className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="likes">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Likes
            </TabsTrigger>
          </TabsList>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <TabsContent value="reviews">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-base">
                {filteredReviews?.map((review) => (
                  <Link key={review.id} href={`/fr?id=${review.id}&productid=${review.productId}`} className="block">
                    <Card>
                      <CardContent className="p-4">
                        <Image src={review.product?.display_image || ""} alt={review.title} width={40} height={40} />
                        <p className="font-medium">{review.title}</p>
                        <div className="flex flex-col">
                          <p className="text-sm text-muted-foreground mt-1">{review.rating}/5 stars</p>
                          <p className="text-sm text-muted-foreground mt-1">{review.comments?.length || "No"} Comments</p>
                          <p className="text-sm text-muted-foreground mt-1">{dayjs(review.createdDate).fromNow()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="comments">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredComments?.map((comment) => (
                  <Link key={comment.id} href={`/fr?id=${comment.review.id}&productid=${comment.review.productId}`} className="block">
                    <Card>
                      <CardContent className="p-4">
                        <p className="line-clamp-3">{comment.body}</p>
                        <div className="flex justify-between">
                          <p className="text-xs font-extralight  mt-1">{dayjs(comment.createdDate).fromNow()}</p>
                          <p className="text-xs font-extralight ">{comment.replies?.length || "No"} Replies</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="likes">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLikes?.map((liked) => (
                  <Link key={liked.id} href={`/fr?id=${liked.id}&productid=${liked.productId}`} className="block">
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-medium">{liked.title}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
