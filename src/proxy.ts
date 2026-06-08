import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.headers
            .get("cookie")
            ?.match(new RegExp(`${name}=([^;]+)`))?.[1];
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: options.maxAge,
          });
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: "",
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 0,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(request.url);
  const path = url.pathname;

  const isAdminRoute = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  if (isAdminRoute && !isLoginPage && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};