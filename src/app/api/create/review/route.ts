import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
const prisma = new PrismaClient();

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
}

export async function POST(request: NextRequest) {
  try {
    let user = null;
    const { sessionClaims } = getAuth(request);
    const clerkUserData = sessionClaims as unknown as UserDATA;
    console.log(
      "create review api just got hit with this user data",
      clerkUserData
    );
    if (!(await userInDb(clerkUserData.userId))) {
      user = await prisma.user.upsert({
        where: { email: clerkUserData.email },
        update: {},
        create: {
          userName: clerkUserData.userName,
          avatar: clerkUserData.avatar,
          email: clerkUserData.email,
          firstName: clerkUserData.firstName,
          lastName: clerkUserData.lastName,
          createdDate: new Date(),
          clerkUserId: clerkUserData.userId,
        },
      });
      const clerkUser = await clerkClient.users.updateUser(
        clerkUserData.userId,
        {
          publicMetadata: { userInDb: true, id: user.id },
        }
      );
      console.log(
        "user added to mongodb, this is the new clerk user info",
        clerkUser
      );
    }

    const clerkUser = await clerkClient.users.getUser(user!.clerkUserId);

    const review = await prisma.review.create({
      data: {
        body: "this is the body 3",
        comments: "this is a comment it is a string for now 3",
        rating: 1,
        title: "this is the title",
        userId: clerkUser.publicMetadata.id as unknown as string,
        createdDate: new Date(),
      },
    });

    console.log("user created!");
    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
      review,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}
