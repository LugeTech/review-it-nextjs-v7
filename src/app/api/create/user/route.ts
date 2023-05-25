import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { userInDb } from "@/app/util/userInDb";
// import { ObjectId } from 'bson'

// const id = new ObjectId()
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
    const { sessionClaims } = getAuth(request);
    const clerkUserData = sessionClaims as unknown as UserDATA;
    console.log(
      "create user api just got hit with this user data",
      clerkUserData
    );
    if (!(await userInDb(clerkUserData.userId))) {
      const user = await prisma.user.upsert({
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
      await clerkClient.users.updateUser(clerkUserData.userId, {
        publicMetadata: { userInDb: true, id: user.id },
      });
      console.log("user added to mongodb");
      return NextResponse.json({
        success: true,
        status: 200,
        data: user,
      });
    }

    console.log("user already in db skipped upsert");
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}
