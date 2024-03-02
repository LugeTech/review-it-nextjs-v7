
// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iProduct } from "@/app/util/Interfaces";

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
  const product: iProduct = await request.json();
  product.tags = product.tags.map(tag => tag.trim());

  console.log('this is the product', product);

  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  let userIdFromClerk = null;
  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request as any);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    console.log("this is  clerk claims", clerkClaimsData);

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
      console.log('added user to db');
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      console.log("Clerk user data before create product :", clerkUserData);
      // then add publicMetaData.id to the object
      if (clerkUserData.publicMetadata.id !== undefined) {
        userIdFromClerk = clerkUserData.publicMetadata
          .id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }
    console.log('about to create product')

    try {
      const createdProduct: iProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          display_image: product.display_image,
          createdDate: product.createdDate,
          images: product.images,
          videos: product.videos,
          links: product.links,
          tags: product.tags,
          openingHrs: product.openingHrs,
          closingHrs: product.closingHrs,
          address: product.address,
          telephone: product.telephone,
          website: product.website,
          createdById: (await clerkUserData.publicMetadata
            .id) as unknown as string,
        },
      });
      return NextResponse.json({
        success: true,
        status: 200,
        data: createdProduct,
      });
    } catch (error) {
      console.log('error creating product', error)
    }

  } catch (error) {
    let e = error as Error;
    // Return an error response
    return NextResponse.json({
      success: false,
      status: 500,
      data: e,
    });
  }
}
