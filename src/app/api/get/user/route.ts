

import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  interface Body {
    id: string;

  }

  const body: Body = await request.json();
  console.log(body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
      include: {
        comments: true,
        reviews: true,
      },
    });
    console.log('this is user', user)
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
