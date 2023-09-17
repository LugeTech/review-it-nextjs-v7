import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("POST /api/reviews");
  // these variable names aren't good must update
  interface Body {
    isPublic: boolean;
    user: boolean;
    product: boolean;

  }

  const body: Body = await request.json();
  // console.log(body);
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublic: true },
      include: {
        user: body.user,
        product: body.product,
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
