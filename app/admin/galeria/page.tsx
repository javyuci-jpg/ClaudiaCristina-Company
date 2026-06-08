import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function Page() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
      },
    }
  );

  // SESIÓN COMPLETA
  const { data: { session } } = await supabase.auth.getSession();

  // IMÁGENES + RELACIÓN CON CATEGORÍAS
  const { data: images } = await supabase
    .from("gallery")
    .select("*, categories(name)")
    .order("order", { ascending: true });

  // TODAS LAS CATEGORÍAS
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <GalleryAdminClient
      session={session}
      images={images ?? []}
      categories={categories ?? []}
    />
  );
}