import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { avatarTriggerAtom } from "@/app/store/store";
import { useAtom } from "jotai";
import {
  MessageCircle,
  ThumbsUp,
  FileText,
  Search,
  Camera,
  Edit,
  Save,
} from "lucide-react";
import { iUser } from "../util/Interfaces";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  uploadImageToCloudinary,
  uploadProfilePicToCloudinary,
} from "../util/uploadImageToCloudinary";
import { resizeImage } from "../util/clientFunctions";

interface UserInfoProps {
  user: iUser;
  onUpdateUser: (updatedUser: Partial<iUser>) => void;
  initialAvatar: string;
}

export default function UserInfo({
  user,
  onUpdateUser,
  initialAvatar,
}: UserInfoProps) {
  let {
    firstName,
    lastName,
    userName,
    avatar,
    reviews,
    comments,
    likedReviews,
    bio,
  } = user;
  const [activeTab, setActiveTab] = useState("reviews");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedUserName, setEditedUserName] = useState(userName);
  const [editedBio, setEditedBio] = useState(bio || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentAvatar, setCurrentAvatar] = useState(
    initialAvatar || user.avatar || "",
  );
  const [, setAvatarTrigger] = useAtom(avatarTriggerAtom);

  dayjs.extend(relativeTime);

  const filteredReviews = reviews?.filter(
    (review) =>
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) || [],
  );

  const filteredComments = comments?.filter((comment) =>
    comment.body.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLikes = likedReviews?.filter((liked) => {
    const likedReviews =
      liked.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      liked.userId !== user.id;
    return likedReviews;
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a temporary URL for immediate display
      const tempUrl = URL.createObjectURL(file);
      setCurrentAvatar(tempUrl);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const smallFile = await resizeImage(base64String);

        try {
          const res = await uploadProfilePicToCloudinary(smallFile);
          console.log(res);
          const imageUrl = res.secure_url;
          setCurrentAvatar(imageUrl); // Update local state with Cloudinary URL
          onUpdateUser({ avatar: imageUrl });
          setAvatarTrigger(imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          // Keep the temporary URL if upload fails
        } finally {
          // Clean up the temporary URL
          URL.revokeObjectURL(tempUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    onUpdateUser({
      firstName: editedFirstName,
      lastName: editedLastName,
      userName: editedUserName,
      bio: editedBio,
    });
    setIsEditingProfile(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="relative h-32 w-32 sm:h-40 sm:w-40 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Avatar className="h-full w-full border-4 border-background">
                <AvatarImage
                  src={currentAvatar || ""}
                  alt={`${editedFirstName} ${editedLastName}`}
                  className="object-cover"
                />
                <AvatarFallback>{`${editedFirstName[0] || ""}${editedLastName[0] || ""}`}</AvatarFallback>
              </Avatar>
            </div>
            <div
              className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <Camera className="h-4 w-4 text-white" />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-4 sm:pt-6">
        <div className="text-center mb-6">
          {isEditingProfile ? (
            <div className="flex flex-col gap-2">
              <Input
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
                placeholder="First Name"
              />
              <Input
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                placeholder="Last Name"
              />
              <Input
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                placeholder="Username"
              />
              <Textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                placeholder="Write your bio here..."
              />
              <Button
                onClick={handleSaveProfile}
                className="bg-myTheme-primary"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold sm:text-3xl">{`${editedFirstName} ${editedLastName}`}</h2>
              <p className="text-muted-foreground">@{editedUserName}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {editedBio || "No bio yet."}
              </p>
              <Button
                variant="ghost"
                onClick={() => setIsEditingProfile(true)}
                className="mt-2"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>

        <Tabs
          defaultValue="reviews"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="reviews">
              <FileText className="h-4 w-4 mr-2" />
              Reviews{" "}
              <p className="text-gray-400 ml-4 hidden md:flex">
                {filteredReviews?.length}
              </p>
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comments{" "}
              <p className="text-gray-400 ml-4 hidden md:flex">
                {filteredComments?.length}
              </p>
            </TabsTrigger>
            <TabsTrigger value="likes">
              <ThumbsUp className="h-4 w-4 mr-2 " />
              Likes{" "}
              <p className="text-gray-400 ml-4 hidden md:flex">
                {filteredLikes?.length}
              </p>
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
                  <Link
                    key={review.id}
                    href={`/fr?id=${review.id}&productid=${review.productId}`}
                    className="block"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <Image
                          src={review.product?.display_image || ""}
                          alt={review.title}
                          width={40}
                          height={40}
                        />
                        <p className="font-medium">{review.title}</p>
                        <div className="flex flex-col">
                          <p className="text-sm text-muted-foreground mt-1">
                            {review.rating}/5 stars
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {review.comments?.length || "No"} Comments
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {dayjs(review.createdDate).fromNow()}
                          </p>
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
                  <Link
                    key={comment.id}
                    href={`/fr?id=${comment.review.id}&productid=${comment.review.productId}`}
                    className="block"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <p className="line-clamp-3">{comment.body}</p>
                        <div className="flex justify-between">
                          <p className="text-xs font-extralight  mt-1">
                            {dayjs(comment.createdDate).fromNow()}
                          </p>
                          <p className="text-xs font-extralight ">
                            {comment.replies?.length || "No"} Replies
                          </p>
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
                  <Link
                    key={liked.id}
                    href={`/fr?id=${liked.id}&productid=${liked.productId}`}
                    className="block"
                  >
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
  );
}
