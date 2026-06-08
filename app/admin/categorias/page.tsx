import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import CategoriesClient from "./CategoriesClient";
import type { Category } from "./types";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  const categories = (data ?? []) as Category[];

  return <CategoriesClient initialCategories={categories} />;
}
