// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iReview } from "@/app/util/Interfaces";
import { createReviewNotification } from "@/app/util/NotificationFunctions";

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

export async function POST(request: NextRequest) {
  const reviewData: iReview = await request.json();
  let clerkUserData = null;

  try {
    const { sessionClaims } = getAuth(request as any);
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    if (!(await userInDb(clerkClaimsData.userId))) {
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);

      if (clerkUserData.publicMetadata.id !== undefined) {
        reviewData.userId = clerkUserData.publicMetadata.id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    console.log(reviewData);
    const review = await prisma.$transaction(async (prisma) => {
      const newReview = await prisma.review.create({
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
          voteCount: {
            create: {
              helpfulVotes: 0,
              unhelpfulVotes: 0,
            },
          },
          likedBy: {
            connect: {
              id: reviewData.userId,
            },
          },
        },
      });

      createReviewNotification(reviewData);

      await prisma.user.update({
        where: {
          id: reviewData.userId,
        },
        data: {
          likedReviews: {
            connect: {
              id: newReview.id,
            },
          },
        },
      });
      // NOTE: can add the updated user to the return if needed later

      return newReview;
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: review,
    });
  } catch (error) {
    let e = error as Error;
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
