import { addUserToDb } from "@/app/util/addUserToDb";
import { prisma } from "@/app/util/prismaClient";
import { userInDb } from "@/app/util/userInDb";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  let idFromPublicMetaData: string = "";
  let clerkUserData = null;
  try {
    const { sessionClaims } = getAuth(request);
    const clerkClaimsData = sessionClaims as unknown as UserDATA;
    if (!(await userInDb(clerkClaimsData.userId))) {
      // If the user doesn't exist, create them
      clerkUserData = await addUserToDb(clerkClaimsData);
      if (clerkUserData?.publicMetadata.id !== undefined) {
        idFromPublicMetaData = clerkUserData.publicMetadata.id as string;
      }
    } else {
      clerkUserData = await clerkClient.users.getUser(clerkClaimsData.userId);
      // then add publicMetaData.id to the reviewData object
      if (clerkUserData.publicMetadata.id !== undefined) {
        idFromPublicMetaData = clerkUserData.publicMetadata.id as string;
      } else {
        return NextResponse.json({
          success: false,
          status: 401,
          data: "publicMetadata.id not found",
        });
      }
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: idFromPublicMetaData,
        },
        include: {
          comments: true,
          reviews: true,
          likedReviews: true,
        },
      });
      return NextResponse.json({
        success: true,
        status: 200,
        data: user,
      });
    } catch (error) {
      let e = error as Error;
      return NextResponse.json({
        success: false,
        status: 500,
        data: e.message.slice(0, 500) + "...",
      });
    }
  } catch (error) {
    let e = error as Error;
    return NextResponse.json({
      success: false,
      status: 500,
      data: e.message.slice(0, 500) + "...",
    });
  }
}
