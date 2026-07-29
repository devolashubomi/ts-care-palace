import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ts-care-palace",
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
            return;
          }

          resolve(result as { secure_url: string });
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Image upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}