// Importing necessary modules and packages
import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prismaClient";

// Initializing Prisma client
// const prisma = new PrismaClient(); //toDO: import this from the prisma wrapper // did it

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
}

export const addUserToDb = async (clerkUserData: UserDATA) => {
  // If the user doesn't exist, create a new user entry in the database
  try {
    const user = await prisma.user.upsert({
      where: { email: clerkUserData.email },
      update: {},
      create: {
        userName: clerkUserData.userName,
        avatar: clerkUserData.avatar,
        email: clerkUserData.email,
        firstName: clerkUserData.firstName,
        lastName: clerkUserData.lastName || "",
        createdDate: new Date(),
        clerkUserId: clerkUserData.userId,
      },
    });

    // Update the user metadata in the Clerk user object
    const clerkUser = await clerkClient.users.updateUser(clerkUserData.userId, {
      publicMetadata: { userInDb: true, id: user.id }, // this is mongodb id
    });
    return clerkUser;

  } catch (error) {
    console.error("Error in addUserToDb:", error);
    return
  }

  return null;
};
