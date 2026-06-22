import GalleryClient from "./GalleryClient";
import { createClient } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  // Hook de traducción
  const t = useTranslations("common");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t("gallery")}</h1>
      <p className="mb-6">{t("galleryDescription")}</p>

      <GalleryClient images={images} />
    </div>
  );
}
