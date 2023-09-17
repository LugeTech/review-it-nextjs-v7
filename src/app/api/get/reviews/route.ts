
import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("POST /api/reviews");
  interface Body {
    id: string;
    isPublic: boolean;
    user: boolean;
    product: boolean;
    comments: boolean;
  }

  const body: Body = await request.json();
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublic: body.isPublic, productId: body.id },
      include: {
        user: body.user,
        product: body.product,
        comments: body.comments,
      },
    });
    return NextResponse.json({
      success: true,
      status: 200,
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
