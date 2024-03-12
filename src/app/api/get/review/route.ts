
import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("POST /api/reviews");
  interface Body {
    id: string;
  }

  const body: Body = await request.json();
  try {
    const reviews = await prisma.review.findUnique({
      where: { isPublic: true, id: body.id },
      include: {
        user: true,
        product: true,
        comments: {
          include: {
            user: true,
          },
        },
      }
    })
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
