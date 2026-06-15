"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "../components/SectionTitle";

// Componentes globales
import HeroGallery from "../components/HeroGallery";
import Header from "../components/Header";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FloatingChat from "../components/FloatingChat";

export default function ServiciosPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Todos");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]" role="main">
      <Header />

      <section aria-label="Imagen principal de servicios">
        <HeroGallery
          title="Claudia Cristina"
          subtitle="Elegancia en cada movimiento."
          backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          height="55vh"
        />
      </section>

      <section
        className="w-full py-8 bg-[#E8E1D9]"
        aria-labelledby="titulo-servicios"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 id="titulo-servicios" className="sr-only">
            Servicios de Claudia Cristina Company
          </h1>

          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            <SectionTitle>Nuestros Servicios</SectionTitle>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Danza */}
            <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
              <div className="text-5xl mb-6">💃</div>
              <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
                Danza
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
                Presentaciones de danza contemporánea, piezas coreográficas y
                proyectos escénicos personalizados.
              </p>
            </div>

            {/* Performance */}
            <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
              <div className="text-5xl mb-6">🎭</div>
              <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
                Performance
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
                Intervenciones artísticas, performance experimental y
                colaboraciones creativas para eventos y producciones.
              </p>
            </div>

            {/* Eventos */}
            <div className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition">
              <div className="text-5xl mb-6">📅</div>
              <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
                Eventos
              </h3>
              <p className="text-[#6B6B6B] leading-relaxed font-montserrat">
                Participación en festivales, galas, producciones audiovisuales y
                eventos culturales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
      <FloatingChat />
    </main>
  );
}
