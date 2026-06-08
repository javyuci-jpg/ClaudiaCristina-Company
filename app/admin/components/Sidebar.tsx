"use client";

import {
  Home,
  Images,
  Calendar,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Folder,
} from "lucide-react";
import { useState } from "react";

interface Props {

  role: string | null;          // ← AGREGAR ESTO
  nuevasReservas: number;       // ← Y ESTO

}

export default function Sidebar({ role, nuevasReservas }: Props) {
  
  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  

  return (
    <aside
      className={`min-h-screen border-r shadow-sm flex flex-col transition-all duration-300
        ${dark ? "bg-[#1a1a1a] text-white border-gray-800" : "bg-white text-gray-800 border-gray-200"}
        ${open ? "w-64" : "w-20"}
      `}
    >
      {/* BOTÓN COLAPSAR */}
      <button
        onClick={() => setOpen(!open)}
        className={`absolute -right-3 top-6 rounded-full p-1 shadow transition
          ${dark ? "bg-[#1a1a1a] border border-gray-700" : "bg-white border border-gray-300"}
        `}
      >
        {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* AVATAR + NOMBRE */}
      <div className="flex flex-col items-center py-8">
        <img
          src="/avatar.jpg"
          alt="Claudia"
          className={`rounded-full transition-all duration-300 shadow-md
            ${open ? "w-20 h-20 opacity-100" : "w-10 h-10 opacity-0"}
          `}
        />
        {open && (
          <p className="mt-3 font-semibold text-lg">Claudia</p>
        )}
      </div>

      {/* MENÚ */}
      <nav className="flex flex-col gap-2 mt-4 px-3">

        <SidebarItem
          open={open}
          href="/admin"
          label="Dashboard"
          icon={<Home size={20} />}
        />

        <SidebarItem
          open={open}
          href="/admin/galeria"
          label="Galería"
          icon={<Images size={20} />}
        />

        {/* NUEVO: CATEGORÍAS */}
        <SidebarItem
          open={open}
          href="/admin/categorias"
          label="Categorías"
          icon={<Folder size={20} />}
        />

      

        {role === "admin" && (
        <SidebarItem
        open={open}
        href="/admin/categorias"
        label="Categorías"
        icon={<Folder size={20} />}
        />
        )}



        {/* SUBMENÚ: RESERVAS */}
        <div>
          <button
            onClick={() => setOpenSubmenu(!openSubmenu)}
            className={`flex items-center w-full gap-3 px-3 py-2 rounded-md transition
              ${dark ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100"}
              ${open ? "justify-between" : "justify-center"}
            `}
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {open && <span>Reservas</span>}
            </div>

            {open && (
              openSubmenu ? <ChevronUp size={18} /> : <ChevronDown size={18} />
            )}
          </button>

          {/* SUBMENÚ ITEMS */}
          {openSubmenu && open && (
            <div className="ml-10 mt-2 flex flex-col gap-2">
              <a href="/admin/reservas/hoy" className="text-sm hover:underline">
                Hoy
              </a>
              <a href="/admin/reservas/semana" className="text-sm hover:underline">
                Esta semana
              </a>
              <a href="/admin/reservas/todas" className="text-sm hover:underline">
                Todas
              </a>
            </div>
          )}
        </div>

        <SidebarItem
          open={open}
          href="/admin/cotizaciones"
          label="Cotizaciones"
          icon={<FileText size={20} />}
          badge={3} // ejemplo: 3 nuevas cotizaciones
        />

        {/* Logout */}
        <form action="/admin/acciones/logout">
          <button
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-red-600 transition
              ${dark ? "hover:bg-[#2a2a2a]" : "hover:bg-red-50"}
              ${open ? "justify-start" : "justify-center"}
            `}
          >
            <LogOut size={20} />
            {open && <span>Cerrar sesión</span>}
          </button>
        </form>
      </nav>

      {/* DARK MODE TOGGLE */}
      <div className="mt-auto p-4">
        <button
          onClick={() => setDark(!dark)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition
            ${dark ? "bg-[#2a2a2a] text-white" : "bg-gray-100 text-gray-800"}
          `}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
          {open && <span>{dark ? "Modo claro" : "Modo oscuro"}</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({
  open,
  href,
  label,
  icon,
  badge,
}: {
  open: boolean;
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition relative
        hover:bg-gray-100
        ${open ? "justify-start" : "justify-center"}
      `}
    >
      {icon}
      {open && <span>{label}</span>}

      {badge && open && (
        <span className="absolute right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
}