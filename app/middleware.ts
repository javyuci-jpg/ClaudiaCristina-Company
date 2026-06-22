import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // 🔒 Lógica de autenticación para /admin
  if (!session && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (!profile) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

     //Solo admin puede acceder a categorías
    if (
      req.nextUrl.pathname.startsWith("/admin/categorias") &&
      profile.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // 🌍 Redirección de idioma por defecto
 if (req.nextUrl.pathname === "/") {
   //  Orden de prioridad: inglés → francés → español
    return NextResponse.redirect(new URL("/en", req.url));
  }
  return res;
}

export const config = {
 matcher: ["/", "/admin/:path*"], // 👈 añadimos "/" para que se aplique la redirección
};
