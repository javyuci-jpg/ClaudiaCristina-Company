"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileMenuButton from "./MobileMenuButton";
import { logout } from "../acciones/logout";

interface Props {
  role: string | null;
}

export default function AdminHeader({ role }: Props) {
  const router = useRouter();

  return (
   <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">

      {/* IZQUIERDA: LOGO + HAMBURGUESA */}
      <div className="flex items-center gap-4">

        {/* Botón hamburguesa (solo móvil) */}
        <div className="md:hidden">
          {/* MobileMenuButton ahora controla su propio estado */}
          <MobileMenuButton />
        </div>

        {/* Logo */}
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => router.push("/admin")}
        >
          <Image
            src="/logo.png"
            alt="Claudia Logo"
            width={140}
            height={140}
            className="rounded"
          />
        </div>
      </div>

      {/* DERECHA: MENÚ SUPERIOR */}
      <nav className="hidden md:flex items-center gap-6 text-gray-700">

        <a href="/admin" className="hover:text-black transition">
          Dashboard
        </a>

        <a href="/admin/galeria" className="hover:text-black transition">
          Galería
        </a>

        {role === "admin" && (
          <a href="/admin/categorias" className="hover:text-black transition">
            Categorías
          </a>
        )}

        <a href="/admin/reservas" className="hover:text-black transition">
          Reservas
        </a>

        <a href="/admin/cotizaciones" className="hover:text-black transition">
          Cotizaciones
        </a>

        {/* Logout */}
        <form action={logout}>
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Cerrar sesión
          </button>
        </form>
      </nav>
    </header>
  );
}