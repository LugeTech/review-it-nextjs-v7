import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const allUsers = await prisma.reviews.create({
      data: {
        body: "Sunt duis duis anim quis deserunt consectetur ut id minim aliquip ut aute. Ea dolore ut officia labore Lorem aliquip veniam. Occaecat esse cillum ipsum exercitation et amet sint eu dolor. Excepteur exercitation minim qui reprehenderit dolore aute. Nisi dolor aliquip fugiat ullamco eu exercitation nisi ipsum. Velit ipsum sunt ea sint dolor.",
        comments:
          "Deserunt tempor mollit tempor esse veniam. Laboris elit laborum aliquip dolore amet consequat veniam ex reprehenderit nisi. Et ut et ullamco voluptate in adipisicing sunt esse sint laboris.",
        helpfulVotes: 23,
        product: "Some product name",
        rating: 5,
        unhelpfulVotes: 3,
        user: "some user id",
        title: "some title",
        createdDate: new Date(),
      },
    });
    console.log(allUsers);
    return NextResponse.json({
      success: true,
      status: 200,
      data: allUsers,
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
