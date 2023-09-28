// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iReview } from "@/app/util/Interfaces";

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
  // Get the review data from the request body
  const reviewData: iReview = await request.json();

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);
    //('this is session Claims', sessionClaims);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    //('this is the clerkClaims from session claims', clerkClaimsData);

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);


    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the reviewData object
      if (clerkUserData.publicMetadata.id !== undefined) {
        reviewData.userId = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    // The product is in the database, so create a new review entry
    const review = await prisma.review.create({
      data: {
        body: reviewData.body,
        rating: reviewData.rating,
        userId: reviewData.userId,
        title: reviewData.title,
        productId: reviewData.productId,
        createdDate: reviewData.createdDate,
        images: reviewData.images,
        videos: reviewData.videos,
        links: reviewData.links,
        createdBy: clerkClaimsData.userName,
      },
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: review,
    });

  } catch (error) {
    let e = error as Error;
    console.log(e.message);
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
