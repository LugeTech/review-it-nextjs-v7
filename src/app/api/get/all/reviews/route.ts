import { prisma } from "@/app/util/prismaClient";
import { allowedDomains } from "@/lib/allowedDomains";
import { checkReferer } from "@/lib/checkReferrer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const referer = request.headers.get("referer") as string;
  console.log(referer);

  // Check if the referer is present and is one of the allowed domains
  if (!checkReferer(referer, allowedDomains)) {
    return NextResponse.redirect(new URL("/error", request.url));
  }
  // these variable names aren't good must update
  interface Body {
    isPublic: boolean;
    user: boolean;
    product: boolean;
  }

  const body: Body = await request.json();
  // console.log(body);
  try {
    const reviews = await prisma.review.findMany({
      where: { isPublic: true },
      include: {
        user: body.user,
        product: body.product,
      },
    });

    // FIX: modify the deleted comment before sending to the frontend to avoid the frontend from getting the deleted comment
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
      data: e.message.slice(0, 500) + "...",
    });
  }
}
