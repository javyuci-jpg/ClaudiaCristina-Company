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
  if (!name.trim()) throw new Error("El nombre es obligatorio");

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, icon })
    .select()
    .single();

  if (error) throw new Error(`Error creando categoría: ${error.message}`);

  revalidatePath("/admin/categorias");
  return data;
}

export async function updateCategory(id: string, name: string, icon: string) {
  if (!name.trim()) throw new Error("El nombre es obligatorio");

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("categories")
    .update({ name, icon })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error actualizando categoría: ${error.message}`);

  revalidatePath("/admin/categorias");
  return data;
}

export async function deleteCategory(id: string) {
  const supabase = supabaseServer();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Error eliminando categoría: ${error.message}`);

  revalidatePath("/admin/categorias");
  return true;
}
