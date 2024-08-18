
import { NextRequest, NextResponse } from 'next/server';
import { uploadBufferImageToCloudinary, uploadImageToCloudinary } from '@/app/util/uploadImageToCloudinary';

interface CloudinaryUploadResponse {
  link: string;
}

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Use NextRequest's formData()
    const file = formData.get('file') as File | null; // Assuming field name 'file'

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }
    console.log("yes we have a file");

    // Convert the file to a Base64 string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');

    // Prefix the Base64 string with the appropriate data URL scheme
    const dataUrl = `data:${file.type};base64,${base64String}`;

    console.log("we have a buffer about to upload");

    const uploadResult = await uploadImageToCloudinary(dataUrl) as CloudinaryUploadResult;
    console.log(uploadResult);

    return NextResponse.json({ link: uploadResult.secure_url }, { status: 200 });

  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Internal server error during upload to Cloudinary' },
      { status: 500 }
    );
  }
}
