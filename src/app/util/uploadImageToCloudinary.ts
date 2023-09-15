'use server'
import { c } from "./cloudinary";

export async function uploadImageToCloudinary(data: any) {
  return await c.uploader.upload(data, {
    resource_type: "image",
    folder: "reviewit_products",
  });
}
