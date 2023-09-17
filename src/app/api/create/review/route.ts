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
  const sentDataReviewAndProduct: SentDataReviewAndProduct = await request.json();

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request);
    //('this is session Claims', sessionClaims);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    //('this is the clerkClaims from session claims', clerkClaimsData);

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);

      if (clerkUserData.publicMetadata.id !== undefined) {
        sentDataReviewAndProduct.userId = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found/adding failed",
        });
      }

    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the sentDataReviewAndProduct object
      if (clerkUserData.publicMetadata.id !== undefined) {
        sentDataReviewAndProduct.userId = clerkUserData.publicMetadata
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
    if (sentDataReviewAndProduct.product.productSelected) {
      // If the product is in the database, find it
      const product = await prisma.product.findUnique({
        where: {
          id: sentDataReviewAndProduct.product.productId,
        },
      });

      // If the product is not in the database, return an error
      if (!product) {
        return NextResponse.json({
          success: false,
          status: 500,
          data: "product not found",
        });
      }

      console.log('this is the sentDataReviewAndProduct', sentDataReviewAndProduct);
      // The product is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndProduct.body,
          rating: sentDataReviewAndProduct.rating,
          userId: sentDataReviewAndProduct.userId,
          title: sentDataReviewAndProduct.title,
          productId: product.id,
          createdDate: sentDataReviewAndProduct.createdDate,
          images: sentDataReviewAndProduct.images,
          videos: sentDataReviewAndProduct.videos,
          links: sentDataReviewAndProduct.links,
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
          display_image: sentDataReviewAndProduct.product.display_image,
          name: sentDataReviewAndProduct.product.name,
          description: sentDataReviewAndProduct.product.description,
          createdDate: sentDataReviewAndProduct.product.createdDate,
          images: sentDataReviewAndProduct.product.images,
          videos: sentDataReviewAndProduct.product.videos,
          links: sentDataReviewAndProduct.product.links,
          tags: sentDataReviewAndProduct.product.tags,
          openingHrs: sentDataReviewAndProduct.product.openingHrs,
          closingHrs: sentDataReviewAndProduct.product.closingHrs,
          address: sentDataReviewAndProduct.product.address,
          telephone: sentDataReviewAndProduct.product.telephone,
          website: sentDataReviewAndProduct.product.website,
          createdById: (clerkUserData.publicMetadata
            .id) as unknown as string,
        },
      });

      if (clerkUserData.publicMetadata.id !== undefined) {
        sentDataReviewAndProduct.userId = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not set... maybe have to wait",
        });
      }
      sentDataReviewAndProduct.productId = product.id;
      // sentDataReviewAndProduct.userId = clerkUserData.publicMetadata
      //   .id as unknown as string;
      // console.log('this is the sentDataReviewAndProduct', sentDataReviewAndProduct);
      // The product is in the database, so create a new review entry
      const review = await prisma.review.create({
        data: {
          body: sentDataReviewAndProduct.body,
          rating: sentDataReviewAndProduct.rating,
          userId: sentDataReviewAndProduct.userId,
          title: sentDataReviewAndProduct.title,
          productId: product.id,
          createdDate: sentDataReviewAndProduct.createdDate,
          images: sentDataReviewAndProduct.images,
          videos: sentDataReviewAndProduct.videos,
          links: sentDataReviewAndProduct.links,
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
    console.log('this is where new accounts are failing', e.message);
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message,
    });
  }
}
