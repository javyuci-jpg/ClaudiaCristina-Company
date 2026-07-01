"use client";

import Link from "next/link";

interface Service {
  image: string;
  title: string;
  description: string;
}

interface ServicesProps {
  servicios: Service[];
  locale: string;
}

export default function Services({ servicios, locale }: ServicesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {servicios.map((servicio, index) => (
        <div
          key={index}
          className="bg-[#F7F3EE] p-8 rounded-xl shadow-sm border border-[#E8E1D9] hover:shadow-md transition"
        >
          <div className="overflow-hidden rounded-md mb-6">
            <img
              src={servicio.image}
              alt={servicio.title}
              className="w-full h-48 object-cover rounded-md transform transition-transform duration-700 hover:scale-105"
            />
          </div>
          <h3 className="text-2xl font-[Playfair_Display] font-semibold mb-4 text-[#111111]">
            {servicio.title}
          </h3>
          <p className="text-[#6B6B6B] leading-relaxed font-montserrat mb-6">
            {servicio.description}
          </p>

          {/* 🔘 Botón que lleva a la sección de paquetes */}
          <Link href={`/locale/${locale}/servicios#paquetes`}>

          </Link>
        </div>
      ))}
    </div>
  );
}
