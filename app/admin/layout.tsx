import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import AdminShell from "./components/AdminShell";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session?.user?.id)
    .single();

  const { data: nuevas } = await supabase
    .from("reservas")
    .select("*", { count: "exact" })
    .eq("estado", "nueva");

  const nuevasReservas = nuevas?.length ?? 0;

  return (
    <AdminShell role={profile?.role ?? null} nuevasReservas={nuevasReservas}>
      {children}
    </AdminShell>
  );
}
