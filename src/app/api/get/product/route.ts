import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("POST /api/products");
  interface Body {
    id: string;
  }

  const body: Body = await request.json();
  console.log(body);
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: body.id,
      },
      include: {
        business: true,
        reviews: {
          where: {
            isPublic: true,
            isDeleted: false,
          },
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json({
      success: true,
      status: 200,
      data: product,
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
