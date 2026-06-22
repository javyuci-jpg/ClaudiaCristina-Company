"use client";

import { useTranslation } from "react-i18next";
import HeroGallery from "../../../components/HeroGallery";
import SectionTitle from "../../../components/SectionTitle";
import CallToAction from "../../../components/CallToAction";
import FloatingChat from "../../../components/FloatingChat";

export default function BiografiaContent({ locale }: { locale: string }) {
  const { t } = useTranslation("biografia");

  return (
    <main className="bg-[#F7F3EE] text-[#111111] font-[Inter]">
      {/* HERO */}
      <HeroGallery
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        backgroundImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
        height="55vh"
      />

      {/* SECCIÓN PRINCIPAL */}
      <section className="w-full py-12 bg-[#E8E1D9]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-[Playfair_Display] font-bold text-[#111111] mb-8 text-center">
            <SectionTitle>{t("heroTitle")}</SectionTitle>
          </h2>
          <p className="text-xl leading-relaxed text-justify text-[#333] whitespace-pre-line">
            {t("content")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <CallToAction />

      <FloatingChat />
    </main>
  );
}
