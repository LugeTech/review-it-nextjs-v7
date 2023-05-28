import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export async function POST(request: NextRequest) {
  interface Body {
    isPublic: boolean;
  }
  const body: Body = await request.json();
  console.log(body);
  try {
    const reviews = await prisma.review.findMany({
      where: body,
      include: {
        user: true,
        item: true,
      },
    });
    console.log(reviews);
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
      data: e.message.slice(0, 500) + '...'
    });
  }
}

//const users = await prisma.user.findMany()

// {
//   include: {
//     user: true,
//   },
// })
