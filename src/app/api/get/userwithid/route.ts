import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const userId: string = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comments: true,
        reviews: true,
        likedReviews: true,
      },
    });
    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
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
