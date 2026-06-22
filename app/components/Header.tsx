"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Header({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // ej: /locale/es/biografia
  const segments = pathname.split("/");
  const restOfPath = "/" + segments.slice(3).join("/"); // /biografia, /servicios, etc.

  const { t } = useTranslation("header");

  return (
    <header className="w-full bg-[#F7F3EE] border-b border-[#E8E1D9] sticky top-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-[999]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Link href={`/locale/${locale}`}>
            <img
              src="/logo.png"
              alt="Logo Claudia"
              className="h-12 md:h-20 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-[15px] font-bold font-montserrat text-[#111111]">
          <Link href={`/locale/${locale}`} className="hover:text-[#A4161A] transition">{t("navHome")}</Link>
          <Link href={`/locale/${locale}/biografia`} className="hover:text-[#A4161A] transition">{t("navBiografia")}</Link>
          <Link href={`/locale/${locale}/servicios`} className="hover:text-[#A4161A] transition">{t("navServicios")}</Link>
          <Link href={`/locale/${locale}/galeria`} className="hover:text-[#A4161A] transition">{t("navGaleria")}</Link>
          <Link href={`/locale/${locale}/eventos`} className="hover:text-[#A4161A] transition">{t("navEventos")}</Link>
          <Link href={`/locale/${locale}/colaboraciones`} className="hover:text-[#A4161A] transition">{t("navColaboraciones")}</Link>
          <Link href={`/locale/${locale}/contacto`} className="hover:text-[#A4161A] transition">{t("navContacto")}</Link>
        </nav>

        {/* Idiomas dinámicos */}
        <div className="hidden md:flex gap-3 text-sm font-semibold font-montserrat text-[#111111]">
          <Link href={`/locale/es${restOfPath}`} className={locale === "es" ? "font-bold underline" : ""}>ES</Link>
          <Link href={`/locale/en${restOfPath}`} className={locale === "en" ? "font-bold underline" : ""}>EN</Link>
          <Link href={`/locale/fr${restOfPath}`} className={locale === "fr" ? "font-bold underline" : ""}>FR</Link>
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
        <div className="md:hidden bg-[#E8E1D9] px-6 pb-4 flex flex-col gap-4 text-lg font-bold font-montserrat text-[#111111]">
          <Link href={`/locale/${locale}`} onClick={() => setOpen(false)}>{t("navHome")}</Link>
          <Link href={`/locale/${locale}/biografia`} onClick={() => setOpen(false)}>{t("navBiografia")}</Link>
          <Link href={`/locale/${locale}/servicios`} onClick={() => setOpen(false)}>{t("navServicios")}</Link>
          <Link href={`/locale/${locale}/galeria`} onClick={() => setOpen(false)}>{t("navGaleria")}</Link>
          <Link href={`/locale/${locale}/eventos`} onClick={() => setOpen(false)}>{t("navEventos")}</Link>
          <Link href={`/locale/${locale}/colaboraciones`} onClick={() => setOpen(false)}>{t("navColaboraciones")}</Link>
          <Link href={`/locale/${locale}/contacto`} onClick={() => setOpen(false)}>{t("navContacto")}</Link>

          <div className="flex gap-4 pt-2">
            <Link href={`/locale/es${restOfPath}`} onClick={() => setOpen(false)}>ES</Link>
            <Link href={`/locale/en${restOfPath}`} onClick={() => setOpen(false)}>EN</Link>
            <Link href={`/locale/fr${restOfPath}`} onClick={() => setOpen(false)}>FR</Link>
          </div>
        </div>
      )}
    </header>
  );
}
