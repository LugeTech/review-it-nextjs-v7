import { prisma } from "@/app/util/prismaClient";
import { iProduct } from "@/app/util/Interfaces";
import { NextRequest, NextResponse } from "next/server";

const allowedDomains = [
  "http://localhost:3000",
  "https://reviewit.lugetech.com",
];

export async function POST(request: NextRequest) {
  const referer = request.headers.get("referer");

  // Check if the referer is present and is one of the allowed domains
  if (!referer || !allowedDomains.includes(new URL(referer).origin)) {
    return NextResponse.redirect("https://example.com/error");
  }

  try {
    const products = (await prisma.product.findMany({
      orderBy: {
        createdDate: "desc",
      },
    })) as unknown as iProduct[];

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
