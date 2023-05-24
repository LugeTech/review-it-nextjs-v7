import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

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
  userID: string;
  userName: string;
}

export async function POST(request: NextRequest) {
  try {
    const { sessionClaims } = getAuth(request);
    const userData = sessionClaims as unknown as UserDATA;

    console.log(sessionClaims);
    // return NextResponse.json({
    //   success: true,
    //   status: 200,
    //   data: sessionClaims,
    // });
    const user = await prisma.user.create({
      data: {
        avatar: userData.avatar,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdDate: new Date(),
      },
    });

    console.log(user);
    return NextResponse.json({
      success: true,
      status: 200,
      data: user,
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
