import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { SentDataReviewAndItem } from "@/app/util/Interfaces";

// Initializing Prisma client
const prisma = new PrismaClient();

// Interface representing user data
interface UserDATA {
  avatar?: string;
  azp: string;
  email: string;
  exp: number;
  firstName: string;
  lastName: string;
  fullName: string;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  userId: string;
  userName: string;
}

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  // Get the review data from the request body
  const sentDataReviewAndItem: SentDataReviewAndItem = await request.json();

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;

  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);

    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
    }

    // Check if the item is in the database
    if (sentDataReviewAndItem.item.itemSelected) {
      // If the item is in the database, find it
      const item = await prisma.item.findUnique({
        where: {
          id: sentDataReviewAndItem.item.itemId,
        },
      });

      // If the item is not in the database, return an error
      if (!item) {
        return NextResponse.json({
          success: false,
          status: 500,
          data: "item not found",
        });
      }

      // The item is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndItem.body,
          rating: sentDataReviewAndItem.rating,
          userId: sentDataReviewAndItem.userId,
          title: sentDataReviewAndItem.title,
          itemId: item.id,
          createdDate: sentDataReviewAndItem.createdDate,
          images: sentDataReviewAndItem.images,
          videos: sentDataReviewAndItem.videos,
          links: sentDataReviewAndItem.links,
          createdBy: clerkClaimsData.userName,
        },
      });

      // Return the review data as JSON
      return NextResponse.json({
        success: true,
        status: 200,
        data: review,
      });
    } else {
      // The item is not in the database, so create it
      const item = await prisma.item.create({
        data: {
          name: sentDataReviewAndItem.item.name,
          description: sentDataReviewAndItem.item.description,
          createdDate: sentDataReviewAndItem.item.createdDate,
          images: sentDataReviewAndItem.item.images,
          videos: sentDataReviewAndItem.item.videos,
          links: sentDataReviewAndItem.item.links,
          tags: sentDataReviewAndItem.item.tags,
          openingHrs: sentDataReviewAndItem.item.openingHrs,
          closingHrs: sentDataReviewAndItem.item.closingHrs,
          address: sentDataReviewAndItem.item.address,
          telephone: sentDataReviewAndItem.item.telephone,
          website: sentDataReviewAndItem.item.website,
          createdById: (await clerkUserData.publicMetadata
          .id) as unknown as string,
        },
      });

      // Update the `sentDataReviewAndItem` variable with the new item ID
      sentDataReviewAndItem.itemId = item.id;

      // The item is now in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndItem.body,
          rating: sentDataReviewAndItem.rating,
          userId: sentDataReviewAndItem.userId,
          title: sentDataReviewAndItem.title,
          itemId: sentDataReviewAndItem.itemId,
          createdDate: sentDataReviewAndItem.createdDate,
          images: sentDataReviewAndItem.images,
          videos: sentDataReviewAndItem.videos,
          links: sentDataReviewAndItem.links,
          createdBy: clerkClaimsData.userName,
        },
      });

      // Return the review data as JSON
      return NextResponse.json({
        success: true,
        status: 200,
        data: review,
      });
    }
  } catch (error) {
    let e = error as Error;
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message.slice(0, 500) + "...",
    });
  }
}