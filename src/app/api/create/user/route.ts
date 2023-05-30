// Importing necessary modules and packages
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
// import { ObjectId } from 'bson'

// const id = new ObjectId()
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
  metadata: {userInDb: boolean, id: string}
}

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  try {
    // Extracting session claims from the request
    const { sessionClaims } = getAuth(request);

    // Casting the session claims to UserDATA type
    const clerkUserData = sessionClaims as unknown as UserDATA;

    // Logging the user data received
    console.log(
      "create user api just got hit with this user data",
      clerkUserData
    );

    // Checking if the user already exists in the database
    if (!(await userInDb(clerkUserData.userId))) {
      // If the user doesn't exist, create a new user entry in the database using the Clerk user data
      const user = await prisma.user.upsert({
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
      await clerkClient.users.updateUser(clerkUserData.userId, {
        publicMetadata: { userInDb: true, id: user.id },
      });

      // Logging a success message after adding the user to MongoDB
      console.log("user added to mongodb");

      // Returning the response as JSON
      return NextResponse.json({
        success: true,
        status: 200,
        data: user,
      });
    }

    // Logging a message if the user already exists in the database
    console.log("user already in db skipped upsert");
    return NextResponse.json({
      success: true,
      status: 200,

      data: `${clerkUserData.userName} "already in db skipped upsert"`,
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
