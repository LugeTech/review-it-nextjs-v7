

import { addUserToDb } from "@/app/util/addUserToDb";
import { prisma } from "@/app/util/prismaClient";
import { userInDb } from "@/app/util/userInDb";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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
  let reviewData: string = '';
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
        reviewData = clerkUserData.publicMetadata.id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    console.log('this is the reviewData', reviewData);
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: reviewData,
        },
        include: {
          comments: true,
          reviews: true,
        },
      });
      console.log('this is user', user)
      return NextResponse.json({
        success: true,
        status: 200,
        data: user,
      });
    } catch (error) {
      let e = error as Error;
      return NextResponse.json({
        success: false,
        status: 500,
        data: e.message.slice(0, 500) + "...",
      });
    }
  }
  catch (error) {
    let e = error as Error;
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message.slice(0, 500) + "...",
    });
  }
}
