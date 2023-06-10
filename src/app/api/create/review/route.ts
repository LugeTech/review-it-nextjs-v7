// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { SentDataReviewAndItem } from "@/app/util/Interfaces";

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
  metadata: {
    id: string;
    userInDb: boolean;
  };
}

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  console.log("create!!!");
  // Get the review data from the request body
  const sentDataReviewAndItem: SentDataReviewAndItem = await request.json();
  console.log(request);

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;

  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);
    console.log(sessionClaims);

    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    // console.log(clerkClaimsData);

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the sentDataReviewAndItem object
      if (clerkUserData.publicMetadata.id !== undefined) {
        sentDataReviewAndItem.userId = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    // Check if the item is in the database
    if (sentDataReviewAndItem.item.itemSelected) {
      // If the item is in the database, find it
      const item = await prisma.item.findUnique({
        where: {
          id: sentDataReviewAndItem.item.itemId,
        },
      });
      console.log("found the item in the db");

      // If the item is not in the database, return an error
      if (!item) {
        return NextResponse.json({
          success: false,
          status: 500,
          data: "item not found",
        });
      }
      console.log(clerkClaimsData.userId);
      // The item is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndItem.body,
          rating: sentDataReviewAndItem.rating,
          userId: clerkClaimsData.metadata.id,
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

      sentDataReviewAndItem.itemId = item.id;
      sentDataReviewAndItem.userId = clerkUserData.publicMetadata
        .id as unknown as string;

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
    }
  } catch (error) {
    let e = error as Error;
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
