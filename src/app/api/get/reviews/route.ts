import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
        item: true,
      },
    });
    console.log(reviews);
    return NextResponse.json({
      success: true,
      status: 200,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}

export async function POST(request: NextRequest) {
  interface Body {
    isPublic: boolean;
  }
  const body: Body = await request.json();
  console.log(body);
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isPublic: body.isPublic,
      },
      include: {
        user: true,
        item: true,
      },
    });
    console.log(reviews);
    return NextResponse.json({
      success: true,
      status: 200,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}

//const users = await prisma.user.findMany()

// {
//   include: {
//     user: true,
//   },
// })
