
import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/app/util/uploadImageToCloudinary';

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

    // Convert the file to a Base64 string
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString('base64');

    // Prefix the Base64 string with the appropriate data URL scheme
    const dataUrl = `data:${file.type};base64,${base64String}`;


    const uploadResult = await uploadImageToCloudinary(dataUrl) as CloudinaryUploadResult;

    return NextResponse.json({ link: uploadResult.secure_url }, { status: 200 });

  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Internal server error during upload to Cloudinary' },
      { status: 500 }
    );
  }
}
