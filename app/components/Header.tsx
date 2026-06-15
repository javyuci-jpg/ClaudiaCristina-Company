"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#F7F3EE] border-b border-[#E8E1D9] sticky top-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-[999]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/home">
        <img
        src="/logo.png"
        alt="Logo Claudia"
        className="h-12 md:h-20 w-auto"
/>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-[15px] font-medium font-montserrat text-[#111111]">
          <Link href="/home" className="hover:text-[#A4161A] transition">Inicio</Link>
          <Link href="/biografia" className="hover:text-[#A4161A] transition">Sobre Nosotros</Link>
          <Link href="/servicios" className="hover:text-[#A4161A] transition">Servicios</Link>
          <Link href="/galeria" className="hover:text-[#A4161A] transition">Galería</Link>
          <Link href="/eventos" className="hover:text-[#A4161A] transition">Eventos</Link>
          <Link href="/colaboraciones" className="hover:text-[#A4161A] transition">Colaboraciones</Link>
          <Link href="/contacto" className="hover:text-[#A4161A] transition">Contacto</Link>
        </nav>

        {/* Idiomas */}
        <div className="hidden md:flex gap-3 text-sm font-semibold font-montserrat text-[#111111]">
          <button className="hover:text-[#A4161A]">EN</button>
          <button className="hover:text-[#A4161A]">FR</button>
          <button className="hover:text-[#A4161A]">ES</button>
          
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-[#111111]"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#E8E1D9] px-6 pb-4 flex flex-col gap-4 text-lg font-medium font-montserrat text-[#111111]">
          <Link href="/home" onClick={() => setOpen(false)}>Inicio</Link>
          <Link href="/biografia" onClick={() => setOpen(false)}>Sobre Nosotros</Link>
          <Link href="/servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link href="/galeria" onClick={() => setOpen(false)}>Galería</Link>
          <Link href="/eventos" onClick={() => setOpen(false)}>Eventos</Link>
          <Link href="/colaboraciones" onClick={() => setOpen(false)}>Colaboraciones</Link>
          <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>

          <div className="flex gap-4 pt-2">
           <button>EN</button>
           <button>FR</button>
           <button>ES</button>
            
          </div>
        </div>
      )}
    </header>
  );
}
