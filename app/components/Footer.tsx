"use client";

import { useTranslation } from "react-i18next";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation("footer"); // namespace "footer"

  return (
    <footer className="w-full bg-[#D6CFC7] pt-8 pb-8">
      {/* Línea dorada superior */}
      <div className="w-full h-px bg-[#C9A227] mb-8"></div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Redes sociales */}
        <div className="flex justify-center gap-10 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl cursor-pointer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl cursor-pointer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            className="text-[#111111] hover:text-[#A4161A] transition text-3xl cursor-pointer"
          >
            <FaTiktok />
          </a>
        </div>

        {/* Derechos reservados */}
        <p className="text-sm text-[#4A4A4A] font-montserrat mb-4">
          © {new Date().getFullYear()} Claudia Cristina Company — {t("rights")}
        </p>

        
      </div>
    </footer>
  );
}
