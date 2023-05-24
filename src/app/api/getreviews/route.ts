import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log('first')
  try {
    const allUsers = await prisma.review.findMany();
    console.log(allUsers);
    return NextResponse.json({
      success: true,
      status: 200,
      data: allUsers,
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
