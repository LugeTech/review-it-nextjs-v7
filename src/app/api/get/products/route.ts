import { prisma } from "@/app/util/prismaClient";
import { iProduct } from "@/app/util/Interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log(request.body);
  // const body: Body = await request.json();
  // console.log(body);
  try {
    const products = await prisma.product.findMany({
    }) as unknown as iProduct[];

    return NextResponse.json({
      success: true,
      status: 200,
      dataLength: products.length,
      data: products,
    });
  } catch (error) {
    let e = error as Error;
    console.log(e.message);
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message.slice(0, 500) + "...",
    });
  }
}
