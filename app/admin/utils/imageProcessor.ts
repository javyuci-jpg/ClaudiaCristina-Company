import imageCompression from "browser-image-compression";
import pica from "pica";

export async function processImage(file: File, targetWidth = 1200, targetHeight = 1200) {
  // 1. Redimensionar con pica
  const img = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  await pica().resize(img, canvas);

  const blobResized = await pica().toBlob(canvas, "image/jpeg", 0.9);

  // 2. Comprimir con browser-image-compression
  const options = {
    maxSizeMB: 1, // máximo 1 MB
    useWebWorker: true,
  };

  const compressedFile = await imageCompression(new File([blobResized], file.name, { type: "image/jpeg" }), options);

  return compressedFile;
}
