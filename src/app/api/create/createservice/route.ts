import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const item = await prisma.service.create({
      data: {
        address: "some address nt dueitunt ea sint dolor.",
        description: "Deserunt temporrint esse sint laboris.",
        images: ["an image link"],
        name: "Some product name",
        createdDate: new Date(),
      },
    });
    console.log(item);
    return NextResponse.json({
      success: true,
      status: 200,
      data: item,
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
