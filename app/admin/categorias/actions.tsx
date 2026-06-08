"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

function supabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
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
}

export async function createCategory(name: string, icon: string) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, icon })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categorias");
  return data;
}

export async function updateCategory(id: number, name: string, icon: string) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("categories")
    .update({ name, icon })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categorias");
}

export async function deleteCategory(id: number) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/categorias");
}