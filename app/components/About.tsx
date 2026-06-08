"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [visible, setVisible] = useState(false);

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
    <section
      id="about-section"
      className="w-full py-12 px-6 bg-[#E8E1D9]"
    >
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Imagen optimizada para móvil */}
        <div className="w-full flex justify-center">
          <img
            src="/claudia.jpeg"
            alt="Claudia"
            className="
              w-40 sm:w-48 md:w-72
              rounded-lg 
              shadow-[0_4px_12px_rgba(0,0,0,0.12)] 
              border border-[#d6cfc7]
              object-cover
              transition-transform duration-500 ease-out
              hover:scale-105
            "
          />
        </div>

        {/* Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8">
            Sobre Claudia
          </h2>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed \
          mb-4 md:mb-6">
            Claudia es una artista multidisciplinaria especializada en danza contemporánea y performance.
            Su trabajo combina técnica, emoción y narrativa visual para crear experiencias que conectan profundamente con el público.
          </p>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
            Con una trayectoria en escenarios, producciones audiovisuales y colaboraciones creativas,
            Claudia aporta una presencia escénica única y un estilo propio que transforma cada proyecto.
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="px-8 py-3 bg-[#A4161A] text-white font-semibold rounded-md hover:bg-[#7f1013] transition">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
