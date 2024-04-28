import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("update reviews path hit");
  interface Body {
    id: string;
    reviewId: string;
    commentId: string;
  }

  const body: Body = await request.json();
  // console.log(body);
  try {
    const existingReview = await prisma.review.findUnique({
      where: { id: body.reviewId },
    });

    if (!existingReview) {
      console.error(`Document with ID ${body.reviewId} not found.`);
      return NextResponse.json({ message: "Document not found" });
    }

    const updatedReview = await prisma.review.update({
      where: { id: body.reviewId },
      data: {
        comments: {
          connect: { id: body.commentId },
        },
      },
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: updatedReview,
    });
  } catch (error) {
    console.error(`Error appending item: ${error}`);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
