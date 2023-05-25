import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  console.log("first");
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: true,
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
