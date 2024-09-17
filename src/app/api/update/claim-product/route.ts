

// Importing necessary modules and packages
import { prisma } from "@/app/util/prismaClient";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
import { addUserToDb } from "@/app/util/addUserToDb";
import { iBusiness, iProduct, UserDATA } from "@/app/util/Interfaces";
import { createBusinessForNotification } from "@/app/util/NotificationFunctions";

// Exporting the POST function that handles the API request
export async function POST(request: NextRequest) {
  // Get the review data from the request body
  const { product } = await request.json() as { product: iProduct };
  // Initialize a variable to store the Clerk user data
  let clerkUserData = null;
  let userIdFromClerk = null;

  try {
    // Extract the session claims from the request
    const { sessionClaims } = getAuth(request as any);
    // Cast the session claims to the `UserDATA` type
    const clerkClaimsData = sessionClaims as unknown as UserDATA;

    // Check if the user already exists in the database
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
    } else {
      // If the user already exists, retrieve their data from the database
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the object
      if (clerkUserData.publicMetadata.id !== undefined) {
        userIdFromClerk = clerkUserData.publicMetadata
          .id as string;
      }
    }
    const newBusinessOwner = await prisma.business.create({
      data: {
        ownerId: clerkClaimsData.userId,
        subscriptionStatus: "FREE",
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiry to 30 days from now
        products: { connect: [{ id: product.id }] },
        isVerified: true,
        ownerName: clerkClaimsData.fullName
      }
    });

    if (product && product.id && newBusinessOwner.id) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          businessId: newBusinessOwner.id,
          ownerId: newBusinessOwner.ownerId,
          hasOwner: true,
        }
      });
    }

    createBusinessForNotification(newBusinessOwner);

    return NextResponse.json({
      success: true,
      status: 200,
      data: newBusinessOwner,
    });

  } catch (error) {
    let e = error as Error;
    console.log("error", error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: e,
    });
  }
}
