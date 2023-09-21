import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('latest reviews git ht');
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublic: true },
      include: {
        user: true,
        product: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdDate: "desc",
      },
    });
    console.log(reviews);
    const lastTwoReviews = reviews.slice(-2);
    return NextResponse.json({
      success: true,
      status: 200,
      data: lastTwoReviews,
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
