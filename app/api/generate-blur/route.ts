export const runtime = "nodejs"; // 👈 OBLIGATORIO para usar Sharp

import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());

    const blur = await sharp(buffer)
      .resize(20)
      .blur()
      .toBuffer();

    const blurBase64 = `data:image/jpeg;base64,${blur.toString("base64")}`;

    return Response.json({ blurDataURL: blurBase64 });
  } catch (error) {
    console.error("Error generating blur:", error);
    return Response.json({ error: "Failed to generate blur" }, { status: 500 });
  }
}
