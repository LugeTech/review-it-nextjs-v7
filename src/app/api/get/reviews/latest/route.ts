import { iReview } from "@/app/util/Interfaces";
import { prisma } from "@/app/util/prismaClient";
import { sanitizeDeletedCommentsInReviews } from "@/app/util/sanitizeDeletedComments";
import { NextRequest, NextResponse } from "next/server";
import { cleanReview, cleanReviews, createFilter } from "@/app/store/badWordsFilter";
const filter = createFilter();

export async function POST(request: NextRequest) {
  try {
    let reviews = await prisma.review.findMany({
      where: { isPublic: true },
      include: {
        user: true,
        product: true,
        voteCount: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdDate: "desc",
      },
      take: 6,
    }) as unknown;

    const treatedReviews = sanitizeDeletedCommentsInReviews(reviews as iReview[]);
    reviews = cleanReviews(await filter, treatedReviews);

    return NextResponse.json({
      success: true,
      status: 200,
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
