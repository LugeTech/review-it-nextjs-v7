import { NextResponse } from "next/server";
import Item from "@/app/util/models/Item";
import connectMongoose from "../../util/mongooseConnect";
import mongoose from "mongoose";
import { iItem } from "@/app/util/Interfaces";
import { z } from "zod";

const connect = async () => {
  //checks for a connection
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await connectMongoose();
};

connect();

export async function POST(request: Request) {
  const itemSchema = z.object({
    //zod for verification
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
  });

  try {
    const item: iItem = await request.json();
    itemSchema.parse(item); // if this fails the error from try catch will fire
    const newItem = new Item(item);
    await newItem.save();
    return NextResponse.json({
      success: true,
      status: 200,
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      data: error,
    });
  }
}
