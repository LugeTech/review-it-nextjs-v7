
import { iReview } from "@/app/util/Interfaces";
import { prisma } from "@/app/util/prismaClient";
import { sanitizeDeletedCommentsInReview } from "@/app/util/sanitizeDeletedComments";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("POST /api/reviews");
  interface Body {
    id: string;
  }

  const body: Body = await request.json();
  try {
    const review = await prisma.review.findUnique({
      where: { isPublic: true, id: body.id },
      include: {
        user: true,
        product: true,
        comments: {
          include: {
            user: true,
          },
        },
        voteCount: true,
        likedBy: true,
      }
    })

    const treatedReview = sanitizeDeletedCommentsInReview(review as iReview);

    return NextResponse.json({
      success: true,
      status: 200,
      data: treatedReview,
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

