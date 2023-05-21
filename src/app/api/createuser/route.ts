import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const user = await prisma.users.create({
      data: {
        avatar: "a link to photo",
        email: "email@gmail.com",
        firstName: "Kyrie",
        lastName: "Musgrave",
        createdDate: new Date(),
      },
    });
    console.log(user);
    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
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
