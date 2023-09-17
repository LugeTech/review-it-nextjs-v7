
// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iComment, UserDATA } from "@/app/util/Interfaces";



interface data {
  reviewId: string;
  commentId: string;
}

async function updateReview(data: data) {
  //will update the review without checking if it exist for now.
  // the comment function should safe enough.
  // if not i will use this
  // Find the document you want to update by its ID
  // const existingReview = await prisma.review.findUnique({
  //   where: { id: data.reviewId },
  // });
  //
  // if (!existingReview) {
  //   console.error(`Document with ID ${data.reviewId} not found.`);
  //   return NextResponse.json({ message: "Document not found" });
  // }

  // Append the new item to the existing array
  const updatedReview = await prisma.review.update({
    where: { id: data.reviewId },
    data: {
      comments: {
        connect: { id: data.commentId },
      },
    },
  })
  return updatedReview;
}




// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  // Get the review data from the request body
  const comment: iComment = await request.json();

  console.log(comment);

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  let userIdFromClerk = null;
  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);
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
      // then add publicMetaData.id to the object
      if (clerkUserData.publicMetadata.id !== undefined) {
        userIdFromClerk = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }
    console.log('about to create comment')

    const createdComment = await prisma.comments.create({
      data: {
        body: comment.body,
        createdDate: new Date(),
        reviewId: comment.reviewId,
        userId: userIdFromClerk as string,
      },
    });
    await updateReview({
      reviewId: comment.reviewId,
      commentId: createdComment.id
    })

    return NextResponse.json({
      success: true,
      status: 200,
      data: createdComment,
    });

  } catch (error) {
    let e = error as Error;
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e,
    });
  }
}
