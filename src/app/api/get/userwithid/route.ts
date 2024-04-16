import { addUserToDb } from "@/app/util/addUserToDb";
import { prisma } from "@/app/util/prismaClient";
import { userInDb } from "@/app/util/userInDb";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface Body {
  id: string;
}

export async function POST(request: NextRequest) {
  const body = request.body as unknown as Body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
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
