"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "./SectionTitle";

export default function ServicesHome({ locale }: { locale: string }) {
  const { t } = useTranslation("servicios");
  const servicios = t("items", { returnObjects: true }) as {
    icon: string;
    title: string;
    description: string;
  }[];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Funciones de navegación
  const next = () => {
    if (currentIndex + 3 < servicios.length) {
      setCurrentIndex(currentIndex + 3);
    } else {
      setCurrentIndex(0); // vuelve al inicio
    }
  };

  const prev = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    } else {
      setCurrentIndex(servicios.length - 3); // va al final
    }
  };

  // Carrusel automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Número de grupos (cada grupo = 3 servicios)
  const totalGroups = Math.ceil(servicios.length / 3);
  const currentGroup = currentIndex / 3;

  return (
    <section className="w-full py-12 bg-[#E8E1D9] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
          <SectionTitle>{t("sectionTitle")}</SectionTitle>
        </h2>

        {/* Carrusel con animación */}
        <div className="relative flex items-center overflow-hidden">
          {/* Flecha izquierda fuera de los recuadros */}
          <button
            onClick={prev}
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-[#A4161A] text-white px-3 py-2 rounded-full shadow hover:bg-[#111111] transition"
          >
            ←
          </button>

          {/* Contenedor animado */}
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{
              transform: `translateX(-${(currentIndex / 3) * 100}%)`,
            }}
          >
            {Array.from({ length: totalGroups }).map((_, groupIndex) => {
              const groupServicios = servicios.slice(groupIndex * 3, groupIndex * 3 + 3);
              return (
                <div
                  key={groupIndex}
                  className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-shrink-0 w-full"
                >
                  {groupServicios.map((servicio, index) => (
                    <div
                      key={index}
                      className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition"
                    >
                      <div className="text-5xl mb-6">{servicio.icon}</div>
                      <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
                        {servicio.title}
                      </h3>
                      <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
                        {servicio.description}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Flecha derecha fuera de los recuadros */}
          <button
            onClick={next}
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-[#A4161A] text-white px-3 py-2 rounded-full shadow hover:bg-[#111111] transition"
          >
            →
          </button>
        </div>

        {/* Indicadores tipo dots */}
        <div className="flex justify-center gap-3 mt-4">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 3)}
              className={`w-3 h-3 rounded-full transition-transform ${
                i === currentGroup
                  ? "bg-[#A4161A] scale-125"
                  : "bg-[#ccc] hover:bg-[#999]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
