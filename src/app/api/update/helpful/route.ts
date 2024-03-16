

import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("update helpful path hit");
  interface Body {
    userId: string;
    reviewId: string;
  }

  const body: Body = await request.json();
  console.log(body)
  try {
    await prisma.voteCount.update({
      where: {
        reviewId: body.reviewId
      },
      data: {
        helpfulVotes: {
          increment: 1
        }
      }
    });

    await prisma.review.update({
      where: {
        id: body.reviewId,
      },
      data: {
        likedBy: {
          connect: {
            id: body.userId,
          },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        likedReviews: {
          connect: {
            id: body.reviewId,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      status: 201,
      data: "updated helpful vote successfully",
    });

  } catch (error) {
    console.error(`Error appending item: ${error}`);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}

