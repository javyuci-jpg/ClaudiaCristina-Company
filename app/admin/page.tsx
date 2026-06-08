import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
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

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <a
          href="/admin/galeria"
          className="p-6 bg-white rounded-xl shadow border hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Galería</h2>
          <p className="text-gray-600">Administrar imágenes, categorías y orden.</p>
        </a>

        <a
          href="/admin/categorias"
          className="p-6 bg-white rounded-xl shadow border hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Categorías</h2>
          <p className="text-gray-600">Crear, editar y eliminar categorías.</p>
        </a>

        <a
          href="/admin/reservas"
          className="p-6 bg-white rounded-xl shadow border hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Reservas</h2>
          <p className="text-gray-600">Gestión de reservas (futuro módulo).</p>
        </a>

      </div>
    </div>
  );
}