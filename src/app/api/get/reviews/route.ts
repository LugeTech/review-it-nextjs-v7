import { iReview } from "@/app/util/Interfaces";
import { prisma } from "@/app/util/prismaClient";
import { sanitizeDeletedCommentsInReviews } from "@/app/util/sanitizeDeletedComments";
import { NextRequest, NextResponse } from "next/server";
import {
  cleanReview,
  cleanReviews,
  createFilter,
} from "@/app/store/badWordsFilter";
const filter = createFilter();

export async function POST(request: NextRequest) {
  interface Body {
    id: string;
    isPublic: boolean;
    user: boolean;
    product: boolean;
    comments: boolean;
  }

  const body: Body = await request.json();

  try {
    let reviews = (await prisma.review.findMany({
      where: { isPublic: body.isPublic, productId: body.id },
      orderBy: {
        createdDate: "desc",
      },
      include: {
        user: body.user,
        product: body.product,
        comments: {
          include: {
            user: true,
            parent: true,
          },
        },
        voteCount: true,
        likedBy: true,
      },
    })) as iReview[];

    let product = null;

    // If no reviews found, fetch the product details
    // FIX: I would like to only fetch the product if there is no reviews. check if there is a product in an atom on front end
    // if (reviews.length === 0) {
    product = await prisma.product.findUnique({
      where: { id: body.id },
    });
    // }
    let treatedReviews = sanitizeDeletedCommentsInReviews(reviews as iReview[]);
    try {
      treatedReviews = cleanReviews(await filter, treatedReviews);
    } catch (error) {
      console.log("cleaning reviews had an issue", error);
      treatedReviews = treatedReviews;
    }
    reviews = treatedReviews as iReview[];
    return NextResponse.json({
      success: true,
      status: 200,
      data: {
        reviews,
        product,
      },
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
