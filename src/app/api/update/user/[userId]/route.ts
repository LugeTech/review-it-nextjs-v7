import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { iUser } from "@/app/util/Interfaces";
import { Prisma } from "@prisma/client";
import { clerkClient } from "@clerk/express";
import { auth } from "@clerk/nextjs/server";

// Helper function to convert iUser partial to Prisma UserUpdateInput
function convertToPrismaUserUpdateInput(
  partialUser: Partial<iUser>,
): Prisma.UserUpdateInput {
  const allowedFields: (keyof iUser)[] = [
    "bio",
    "userName",
    "avatar",
    "email",
    "firstName",
    "lastName",
  ];

  const updateInput: Prisma.UserUpdateInput = {};

  for (const field of allowedFields) {
    if (field in partialUser) {
      switch (field) {
        case "bio":
        case "userName":
        case "avatar":
        // case "email":
        case "firstName":
        case "lastName":
          updateInput[field] = partialUser[field] as string;
          break;
      }
    }
  }

  return updateInput;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;
  const updatedFields = (await request.json()) as Partial<iUser>;

  console.log("update user path hit", updatedFields);
  try {
    // Authenticate the request
    const { userId: clerkUserId } = auth();

    if (!clerkUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update user in your database
    const prismaUpdateInput = convertToPrismaUserUpdateInput(updatedFields);
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: prismaUpdateInput,
    });

    // Prepare data for Clerk update
    const clerkUpdateData: any = {};
    if (updatedFields.firstName)
      clerkUpdateData.firstName = updatedFields.firstName;
    if (updatedFields.lastName)
      clerkUpdateData.lastName = updatedFields.lastName;
    if (updatedFields.userName)
      clerkUpdateData.username = updatedFields.userName;
    // if (updatedFields.avatar) clerkUpdateData.imageUrl = updatedFields.avatar;

    // Update Clerk user data if there are fields to update
    if (Object.keys(clerkUpdateData).length > 0) {
      console.log("clerkUpdateData", clerkUpdateData);
      const res = await clerkClient.users.updateUser(
        clerkUserId,
        clerkUpdateData,
      );
      console.log(res);
    }

    return NextResponse.json({
      success: true,
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
