"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "../../../components/SectionTitle";

// Componentes globales
import HeroGallery from "../../../components/HeroGallery";
import CallToAction from "../../../components/CallToAction";
import FloatingChat from "../../../components/FloatingChat";

export default function ServiciosPage({ params }: { params: { locale: string } }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { t } = useTranslation("servicios");

  // Servicios individuales
  const servicios = t("items", { returnObjects: true }) as {
    icon: string;
    title: string;
    description: string;
  }[];

  // Paquetes
  const paquetes = t("packages", { returnObjects: true }) as {
    title: string;
    description: string;
    includes: string[];
    perfectFor: string;
    image: string;
  }[];

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]" role="main">

      {/* Hero */}
      <section aria-label={t("heroAlt")}>
        <HeroGallery
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          height="55vh"
        />
      </section>

      {/* Servicios */}
      <section className="w-full py-8 bg-[#E8E1D9]" aria-labelledby="titulo-servicios">
        <div className="max-w-7xl mx-auto px-6">
          <h1 id="titulo-servicios" className="sr-only">
            {t("sectionTitle")}
          </h1>

          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            <SectionTitle>{t("sectionTitle")}</SectionTitle>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {servicios.map((servicio, index) => (
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
        </div>
      </section>

      {/* Paquetes */}
      <section className="w-full py-12 bg-[#E8E1D9]" aria-labelledby="titulo-paquetes">
        <div className="max-w-7xl mx-auto px-6">
          <h2 id="titulo-paquetes" className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            <SectionTitle>{t("packagesTitle")}</SectionTitle>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {paquetes.map((paquete, index) => (
              <div
                key={index}
                className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition"
              >
                {paquete.image && (
                  <img
                    src={paquete.image}
                    alt={paquete.title}
                    className="w-full h-48 object-cover rounded mb-6"
                  />
                )}
                <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
                  {paquete.title}
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed font-montserrat mb-4">
                  {paquete.description}
                </p>
                <ul className="list-disc list-inside text-[#333] font-montserrat mb-4">
                  {paquete.includes.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="italic text-[#444]">{paquete.perfectFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <FloatingChat />
    </main>
  );
}
