import { NextResponse } from "next/server";
import Product from "@/app/util/models/Product";
import connectMongoose from "../../util/mongooseConnect";
import mongoose from "mongoose";
import { iProduct } from "@/app/util/Interfaces";
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
  const ProductSchema = z.object({
    //zod for verification
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
  });

  try {
    const product = await request.json();
    ProductSchema.parse(product); // if this fails the error from try catch will fire
    const newProduct = new Product(product);
    await newProduct.save();
    return NextResponse.json({
      success: true,
      status: 200,
      data: newProduct,
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
