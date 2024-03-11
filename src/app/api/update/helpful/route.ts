

import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("update helpful path hit");
  interface Body {
    id: string;
    reviewId: string;
    // commentId: string;
  }

  const body: Body = await request.json();
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

