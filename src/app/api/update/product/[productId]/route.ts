import { prisma } from "@/app/util/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { iProduct } from "@/app/util/Interfaces";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

// Helper function to convert iProduct partial to Prisma ProductUpdateInput
function convertToPrismaProductUpdateInput(
  partialProduct: Partial<iProduct>,
): Prisma.ProductUpdateInput {
  const allowedFields: (keyof iProduct)[] = [
    "address",
    "description",
    "display_image",
    "images",
    "videos",
    "links",
    "name",
    "tags",
    "openingHrs",
    "closingHrs",
    "telephone",
    "website",
    "rating",
    "email",
  ];

  const updateInput: Prisma.ProductUpdateInput = {};

  for (const field of allowedFields) {
    if (field in partialProduct) {
      switch (field) {
        case "address":
        case "description":
        case "display_image":
        case "name":
        case "openingHrs":
        case "closingHrs":
        case "telephone":
        case "email":
          updateInput[field] = partialProduct[field] as string;
          break;
        case "images":
        case "videos":
        case "links":
        case "tags":
        case "website":
          updateInput[field] = partialProduct[field] as string[];
          break;
        case "rating":
          updateInput[field] = partialProduct[field] as number;
          break;
      }
    }
  }

  return updateInput;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } },
) {
  const productId = params.productId;
  const updatedFields = (await request.json()) as Partial<iProduct>;

  console.log("update product path hit", updatedFields);
  try {
    // Authenticate the request
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update product in your database
    const prismaUpdateInput = convertToPrismaProductUpdateInput(updatedFields);
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: prismaUpdateInput,
    });

    return NextResponse.json({
      success: true,
      status: 200,
      data: updatedProduct,
    });
  } catch (error) {
    console.error(`Error updating product: ${error}`);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
