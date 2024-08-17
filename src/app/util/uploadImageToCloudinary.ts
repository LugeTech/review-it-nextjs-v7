'use server'
import { c } from "./cloudinary";

interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}
export async function uploadImageToCloudinary(data: any) {
  return await c.uploader.upload(data, {
    resource_type: "image",
    folder: "reviewit_products",
  });
}

export async function uploadBufferImageToCloudinary(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = c.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "reviewit_products",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      }
    );

    uploadStream.end(buffer);
  });
}
