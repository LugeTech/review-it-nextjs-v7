import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("POST /api/reviews");
  interface Body {
    isPublic: boolean;
    user: boolean;
    item: boolean;

  }

  const body: Body = await request.json();
  console.log(body);
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublic: true },
      include: {
        user: body.user,
        item: body.item,
      },
    });
    console.log(reviews)
    return NextResponse.json({
      success: true,
      status: 200,
      dataLength: reviews.length,
      data: reviews,
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
