
import cloudinary from "cloudinary";

cloudinary.v2.config();
export const c = cloudinary.v2;
// console.log(process.env.CLOUDINARY_URL);
// console.log(cloudinary.v2.config());
