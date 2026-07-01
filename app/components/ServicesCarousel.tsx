"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";
import Link from "next/link";

interface ServicesCarouselProps {
  locale: string; // 👈 añadimos locale como prop
}

export default function ServicesCarousel({ locale }: ServicesCarouselProps) {
  const { t } = useTranslation("servicios");
  const servicios = t("items", { returnObjects: true }) as {
    image: string;
    title: string;
    description: string;
  }[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return; // si está pausado, no rota
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % servicios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [servicios.length, paused]);

  const visibleServices = servicios.slice(currentIndex, currentIndex + 3);
  if (visibleServices.length < 3) {
    visibleServices.push(...servicios.slice(0, 3 - visibleServices.length));
  }

  return (
    <section className="w-full bg-[#E8E1D9] py-12 px-6">
      <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-center mb-10">
        <SectionTitle>{t("sectionTitle")}</SectionTitle>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {visibleServices.map((servicio, index) => (
          <div
            key={index}
            className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] transition transform hover:shadow-lg hover:-translate-y-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-md mb-6">
              <img
                src={servicio.image}
                alt={servicio.title}
                className="w-full h-48 object-cover rounded-md transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
              {servicio.title}
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
              {servicio.description}
            </p>
          </div>
        ))}
      </div>

      {/* 🔘 Botón corregido */}
      <div className="w-full flex justify-center mt-10">
        <Link
          href={`/locale/${locale}/servicios#paquetes`}
          className="inline-block bg-[#A4161A] text-white font-semibold px-8 py-3 rounded-md shadow-md hover:bg-[#7F1013] transition transform hover:scale-105"
        >
          {t("packagesButton")}
        </Link>
      </div>
    </section>
  );
}
