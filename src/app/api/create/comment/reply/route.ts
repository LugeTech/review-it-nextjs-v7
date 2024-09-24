// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iComment, iUserNotification, UserDATA } from "@/app/util/Interfaces";
import { createUserNotification } from "@/app/util/NotificationFunctions";

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  console.log("range")
  // Get the reply data from the request body
  const reply: iComment = await request.json();
  console.log("*****", reply)
  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  let userIdFromClerk = null;

  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request as any);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the object
      if (clerkUserData.publicMetadata.id !== undefined) {
        userIdFromClerk = clerkUserData.publicMetadata.id as string;
      }
    }

    // Check if parentId exists
    if (!reply.parentId) {
      throw new Error("Parent comment ID is required for a reply");
    }

    // Create the reply
    const createdReply = await prisma.comment.create({
      data: {
        body: reply.body,
        createdDate: new Date(),
        reviewId: reply.reviewId,
        userId: userIdFromClerk as string,
        parentId: reply.parentId,
      },
    });

    if (createdReply.parentId !== "") {
      const userNotification: iUserNotification = {
        id: createdReply.id,
        user_id: reply.parentUserId as string,
        content: createdReply.body,
        read: false,
        notification_type: "comment_reply",
        comment_id: createdReply.id,
        review_id: createdReply.reviewId,
        from_id: reply.user.id,
        from_name: reply.user.userName
      }
      console.log("about to send this usernotification package", userNotification)
      createUserNotification(userNotification)
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: createdReply,
    });

  } catch (error) {
    let e = error as Error;
    console.log("oooooo", error)
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
