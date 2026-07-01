"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";

interface HeroProps {
  videoSrc?: string;
  posterImage?: string;
  height?: string;
  locale: string; // 👈 añadimos locale como prop
}

export default function Hero({
  videoSrc = "/videos/hero.mp4",
  posterImage = "/images/hero-fallback.jpg",
  height = "90vh",
  locale,
}: HeroProps) {
  const { t } = useTranslation("hero");

  return (
    <section
      className="relative w-full flex items-end justify-center overflow-hidden"
      style={{ height }}
    >
      {/* 🎥 VIDEO DE FONDO */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterImage}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 🔳 CAPA OSCURA */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ✨ CONTENIDO ABAJO */}
      <div className="relative z-10 text-center text-white px-6 pb-16 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide drop-shadow-lg">
          {t("title")}
        </h1>

        <p className="text-lg md:text-2xl mb-6 opacity-90 drop-shadow-md">
          {t("subtitle")}
        </p>

        {/* 🔘 BOTÓN CORREGIDO */}
        <Link href={`/locale/${locale}/cotizar`}>
          <button className="px-8 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition shadow-lg cursor-pointer">
            {t("button")}
          </button>
        </Link>
      </div>
    </section>
  );
}
