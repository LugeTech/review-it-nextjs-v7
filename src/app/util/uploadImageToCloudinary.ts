"use server";
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

export async function uploadProfilePicToCloudinary(data: any) {
  return await c.uploader.upload(data, {
    resource_type: "image",
    folder: "reviewit_products",
  });
}

// this should be a more perfoemant way bbut it dosen't work on vercel for some reason
// when this service is self hosted we could revisit this
// import { Readable } from 'stream';
//
// export async function uploadBufferImageToCloudinary(buffer: Buffer) {
//   return new Promise((resolve, reject) => {
//     const stream = Readable.from(buffer);
//
//     const uploadStream = c.uploader.upload_stream(
//       {
//         resource_type: "image",
//         folder: "reviewit_products",
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload error:", error);
//           reject(error);
//         } else {
//           console.log("Cloudinary upload success:", result);
//           resolve(result as CloudinaryUploadResult);
//         }
//       }
//     );
//
//     stream.pipe(uploadStream);
//   });
// }
