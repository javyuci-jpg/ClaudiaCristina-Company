import GalleryClient from "./GalleryClient";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

// 🔥 Crear cliente Supabase en este archivo
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🔥 Obtener imágenes desde Supabase
async function fetchImages() {
  const { data, error } = await supabase.from("gallery").select("*");

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data;
}

export default async function GaleriaPage() {
  const images = await fetchImages();
  return <GalleryClient images={images} />;
}
