import { NextResponse } from "next/server";
import Service from "@/app/util/models/Service";
import connectMongoose from "../../util/mongooseConnect";
import mongoose from "mongoose";
import { iService } from "@/app/util/Interfaces";
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
  const serviceSchema = z.object({
    //zod for verification
    name: z.string(),
    description: z.string(),
    images: z.array(z.string()),
  });

  try {
    const service = await request.json();
    serviceSchema.parse(service); // if this fails the error from try catch will fire
    const newService = new Service(service);
    await newService.save();
    return NextResponse.json({
      success: true,
      status: 200,
      data: newService,
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
