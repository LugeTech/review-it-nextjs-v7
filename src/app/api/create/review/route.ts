// Importing necessary modules and packages
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";

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
  try {
    let user = null;

    // Extracting session claims from the request
    const { sessionClaims } = getAuth(request);

    // Casting the session claims to UserDATA type
    const clerkUserData = sessionClaims as unknown as UserDATA;

    // Logging the user data received
    console.log(
      "create review api just got hit with this user data",
      clerkUserData
    );

    // Checking if the user already exists in the database
    if (!(await userInDb(clerkUserData.userId))) {
      // If the user doesn't exist, create a new user entry in the database
      user = await prisma.user.upsert({
        where: { email: clerkUserData.email },
        update: {},
        create: {
          userName: clerkUserData.userName,
          avatar: clerkUserData.avatar,
          email: clerkUserData.email,
          firstName: clerkUserData.firstName,
          lastName: clerkUserData.lastName,
          createdDate: new Date(),
          clerkUserId: clerkUserData.userId,
        },
      });

      // Update the user metadata in the Clerk user object
      const clerkUser = await clerkClient.users.updateUser(
        clerkUserData.userId,
        {
          publicMetadata: { userInDb: true, id: user.id },
        }
      );

      // Logging the Clerk user information after adding to MongoDB
      console.log(
        "user added to mongodb, this is the new clerk user info",
        clerkUser
      );
    }

    // Retrieve the Clerk user information
    const clerkUser = await clerkClient.users.getUser(user!.clerkUserId);
    console.log(clerkUser);
    // Create a new review entry in the database
    const review = await prisma.review.create({
      data: {
        body: "this is the body 3",
        comments: "this is a comment it is a string for now 3",
        rating: 1,
        title: "this is the title",
        userId: clerkUser.publicMetadata.id as unknown as string,
        createdDate: new Date(),
      },
    });

    // Logging a success message
    console.log("user created!");

    // Returning the response as JSON
    return NextResponse.json({
      success: true,
      status: 200,
      data: review,
    });
  } catch (error) {
    // Handling errors and returning error response
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}
