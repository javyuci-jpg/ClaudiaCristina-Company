"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface AboutProps {
  locale: string; // 👈 añadimos locale como prop
}

export default function About({ locale }: AboutProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("about"); // namespace "about"

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("about-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
          setVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about-section" className="w-full py-12 px-6 bg-[#E8E1D9]">
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Imagen */}
        <div className="w-full flex justify-center">
          <img
            src="/claudia.jpeg"
            alt="Claudia"
            className="w-40 sm:w-48 md:w-72 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-[#d6cfc7] object-cover transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>

        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8">
            {t("title")}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
            {t("paragraph")}
          </p>

          <div className="flex justify-center md:justify-start">
            {/* 🔘 BOTÓN CORREGIDO */}
            <Link href={`/locale/${locale}/biografia`}>
              <button className="px-6 py-2 bg-[#A4161A] text-white font-semibold rounded-md hover:bg-[#7f1013] transition cursor-pointer">
                {t("button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
