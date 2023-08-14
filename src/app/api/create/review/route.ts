// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { SentDataReviewAndProduct } from "@/app/util/Interfaces";

// Interface representing user data
interface UserDATA {
  avatar?: string;
  azp: string;
  email: string;
  exp: number;
  firstName: string;
  lastName: string;
  fullName: string;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  userId: string;
  userName: string;
  metadata: {
    id: string;
    userInDb: boolean;
  };
}

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  // Get the review data from the request body
  const sentDataReviewAndproduct: SentDataReviewAndProduct = await request.json();

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    // console.log(clerkClaimsData);

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the sentDataReviewAndproduct object
      if (clerkUserData.publicMetadata.id !== undefined) {
        sentDataReviewAndproduct.userId = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    // Check if the product is in the database
    if (sentDataReviewAndproduct.product.productSelected) {
      // If the product is in the database, find it
      const product = await prisma.product.findUnique({
        where: {
          id: sentDataReviewAndproduct.product.productId,
        },
      });
      console.log("found the product in the db");

      // If the product is not in the database, return an error
      if (!product) {
        return NextResponse.json({
          success: false,
          status: 500,
          data: "product not found",
        });
      }
      // The product is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndproduct.body,
          rating: sentDataReviewAndproduct.rating,
          userId: clerkClaimsData.metadata.id,
          title: sentDataReviewAndproduct.title,
          productId: product.id,
          createdDate: sentDataReviewAndproduct.createdDate,
          images: sentDataReviewAndproduct.images,
          videos: sentDataReviewAndproduct.videos,
          links: sentDataReviewAndproduct.links,
          createdBy: clerkClaimsData.userName,
        },
      });

      // Return the review data as JSON
      return NextResponse.json({
        success: true,
        status: 200,
        data: review,
      });
    } else {
      // The product is not in the database, so create it
      const product = await prisma.product.create({
        data: {
          name: sentDataReviewAndproduct.product.name,
          description: sentDataReviewAndproduct.product.description,
          createdDate: sentDataReviewAndproduct.product.createdDate,
          images: sentDataReviewAndproduct.product.images,
          videos: sentDataReviewAndproduct.product.videos,
          links: sentDataReviewAndproduct.product.links,
          tags: sentDataReviewAndproduct.product.tags,
          openingHrs: sentDataReviewAndproduct.product.openingHrs,
          closingHrs: sentDataReviewAndproduct.product.closingHrs,
          address: sentDataReviewAndproduct.product.address,
          telephone: sentDataReviewAndproduct.product.telephone,
          website: sentDataReviewAndproduct.product.website,
          createdById: (await clerkUserData.publicMetadata
            .id) as unknown as string,
        },
      });

      sentDataReviewAndproduct.productId = product.id;
      sentDataReviewAndproduct.userId = clerkUserData.publicMetadata
        .id as unknown as string;

      // The product is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndproduct.body,
          rating: sentDataReviewAndproduct.rating,
          userId: sentDataReviewAndproduct.userId,
          title: sentDataReviewAndproduct.title,
          productId: product.id,
          createdDate: sentDataReviewAndproduct.createdDate,
          images: sentDataReviewAndproduct.images,
          videos: sentDataReviewAndproduct.videos,
          links: sentDataReviewAndproduct.links,
          createdBy: clerkClaimsData.userName,
        },
      });

      // Return the review data as JSON
      return NextResponse.json({
        success: true,
        status: 200,
        data: review,
      });
    }
  } catch (error) {
    let e = error as Error;
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
