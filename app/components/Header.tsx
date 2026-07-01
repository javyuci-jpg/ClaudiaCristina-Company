"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Header({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split("/");
  const restOfPath = "/" + segments.slice(3).join("/");

  const { t } = useTranslation("header");

  // Idiomas disponibles
  const languages = [
    { code: "es", label: "ES" },
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
  ];

  const currentLang = languages.find(l => l.code === locale);

  // Ref para detectar clic fuera
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <Link href={`/locale/${locale}/faq`} className="hover:text-[#A4161A] transition">{t("navFaq")}</Link>
        </nav>

        {/* Idiomas dinámicos con dropdown */}
        <div ref={dropdownRef} className="hidden md:flex relative text-sm font-semibold font-montserrat text-[#111111]">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="font-bold underline">{currentLang?.label}</span>
            <span className="text-xs">▼</span>
          </button>

          {langOpen && (
            <div
              className="absolute right-0 mt-2 bg-[#F7F3EE] border border-[#E8E1D9] rounded shadow-md flex flex-col animate-slideDown"
            >
              {languages.filter(l => l.code !== locale).map(l => (
                <Link
                  key={l.code}
                  href={`/locale/${l.code}${restOfPath}`}
                  className="px-4 py-2 hover:bg-[#E8E1D9] cursor-pointer"
                  onClick={() => setLangOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
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
          <Link href={`/locale/${locale}/faq`} onClick={() => setOpen(false)}>{t("navFaq")}</Link>

          {/* Idiomas en mobile */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="font-bold underline">{currentLang?.label}</span>
              <span className="text-xs">▼</span>
            </button>
            {langOpen && (
              <div className="flex flex-col bg-[#F7F3EE] border border-[#E8E1D9] rounded shadow-md animate-slideDown">
                {languages.filter(l => l.code !== locale).map(l => (
                  <Link
                    key={l.code}
                    href={`/locale/${l.code}${restOfPath}`}
                    className="px-4 py-2 hover:bg-[#E8E1D9] cursor-pointer"
                    onClick={() => {
                      setLangOpen(false);
                      setOpen(false);
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
